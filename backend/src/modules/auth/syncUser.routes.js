import { Router } from 'express';
import { clerkAuthMiddleware, requireAuth } from '../../middlewares/clerkAuth.middleware.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { ApiResponse } from '../../utils/ApiResponse.js';
import { User } from '../users/user.model.js';
import { ROLES } from '../../constants/roles.js';
import { createClerkClient } from '@clerk/backend';
import { env } from '../../config/env.js';

export const syncUserRoutes = Router();

/**
 * POST /api/v1/auth/sync-user
 * 
 * Khi user đăng nhập/đăng ký qua Clerk, frontend gọi endpoint này
 * để đảm bảo user được lưu vào MongoDB.
 * 
 * Đây là cơ chế backup cho webhook — đảm bảo user luôn tồn tại
 * trong DB ngay cả khi webhook bị lỗi hoặc chưa được cấu hình.
 */
syncUserRoutes.post(
  '/sync-user',
  clerkAuthMiddleware,
  requireAuth,
  asyncHandler(async (req, res) => {
    const clerkUserId = req.auth.userId;

    // Kiểm tra user đã tồn tại trong MongoDB chưa
    let user = await User.findOne({ clerkId: clerkUserId });

    if (user) {
      console.log(`ℹ️  Sync: User already exists in MongoDB (Clerk ID: ${clerkUserId})`);
      return res.json(new ApiResponse(user, 'User already synced'));
    }

    // User chưa tồn tại → lấy thông tin từ Clerk API và tạo mới
    let clerkUser;
    try {
      const clerk = createClerkClient({ secretKey: env.clerkSecretKey });
      clerkUser = await clerk.users.getUser(clerkUserId);
    } catch (err) {
      console.error('❌ Failed to fetch user from Clerk API:', err.message);
      // Fallback: dùng thông tin từ request body nếu frontend gửi kèm
      clerkUser = req.body;
    }

    const email =
      clerkUser?.emailAddresses?.[0]?.emailAddress ||
      clerkUser?.email_addresses?.[0]?.email_address ||
      clerkUser?.email;

    if (!email) {
      return res.status(400).json(
        new ApiResponse(null, 'Cannot sync user: no email found'),
      );
    }

    // Kiểm tra trùng email
    const existingByEmail = await User.findOne({ email });
    if (existingByEmail) {
      // Link Clerk ID vào user đã tồn tại
      existingByEmail.clerkId = clerkUserId;
      existingByEmail.firstName = clerkUser.firstName || clerkUser.first_name || existingByEmail.firstName;
      existingByEmail.lastName = clerkUser.lastName || clerkUser.last_name || existingByEmail.lastName;
      existingByEmail.avatar = clerkUser.imageUrl || clerkUser.image_url || existingByEmail.avatar;
      await existingByEmail.save();

      console.log(`✅ Sync: Linked existing user ${email} to Clerk ID ${clerkUserId}`);
      return res.json(new ApiResponse(existingByEmail, 'User linked to Clerk'));
    }

    // Tạo user mới trong MongoDB
    const firstName = clerkUser.firstName || clerkUser.first_name || '';
    const lastName = clerkUser.lastName || clerkUser.last_name || '';

    user = await User.create({
      clerkId: clerkUserId,
      email,
      firstName,
      lastName,
      name: `${firstName} ${lastName}`.trim() || email.split('@')[0],
      avatar: clerkUser.imageUrl || clerkUser.image_url || '',
      role: clerkUser.publicMetadata?.role || clerkUser.public_metadata?.role || ROLES.USER,
      isActive: true,
    });

    console.log(`✅ Sync: Created new user ${email} (Clerk ID: ${clerkUserId})`);
    return res.status(201).json(new ApiResponse(user, 'User synced successfully'));
  }),
);
