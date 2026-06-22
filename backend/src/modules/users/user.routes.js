import { Router } from 'express';
import { adminMiddleware } from '../../middlewares/admin.middleware.js';
import { authMiddleware } from '../../middlewares/auth.middleware.js';
import { clerkAuthMiddleware, requireAuth } from '../../middlewares/clerkAuth.middleware.js';
import { unifiedAuthMiddleware } from '../../middlewares/unifiedAuth.middleware.js';
import { userController } from './user.controller.js';

export const userRoutes = Router();

// Apply Clerk authentication middleware for Clerk users
userRoutes.use(clerkAuthMiddleware);

// Require authentication (either Clerk or JWT)
userRoutes.use(requireAuth);

// Use unified auth middleware to get user from either Clerk or JWT
userRoutes.use(unifiedAuthMiddleware);

userRoutes.get('/me', userController.getMe);
userRoutes.patch('/me', userController.updateMe);

userRoutes.use(adminMiddleware);
userRoutes.get('/', userController.listUsers);
userRoutes.get('/:userId', userController.getUserById);
userRoutes.patch('/:userId/status', userController.updateUserStatus);

