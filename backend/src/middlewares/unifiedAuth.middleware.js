import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { User } from '../modules/users/user.model.js';

/**
 * Unified Authentication Middleware
 * Supports both JWT tokens and Clerk authentication
 */
export const unifiedAuthMiddleware = asyncHandler(async (req, res, next) => {
  // Check for Clerk authentication first (req.auth from clerkAuthMiddleware)
  if (req.auth?.userId) {
    const user = await User.findOne({ clerkId: req.auth.userId });
    if (!user || !user.isActive) {
      throw new ApiError(401, 'User not found or inactive');
    }
    req.user = user;
    return next();
  }

  // Fallback to JWT authentication
  const header = req.headers.authorization;
  const token = header?.startsWith('Bearer ') ? header.split(' ')[1] : null;

  if (!token) {
    throw new ApiError(401, 'Authentication token is required');
  }

  const payload = jwt.verify(token, env.jwtAccessSecret);
  const user = await User.findById(payload.sub).select('-password');

  if (!user || !user.isActive) {
    throw new ApiError(401, 'Invalid authentication token');
  }

  req.user = user;
  next();
});
