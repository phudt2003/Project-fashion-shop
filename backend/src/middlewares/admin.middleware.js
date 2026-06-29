import { ROLES } from '../constants/roles.js';
import { ApiError } from '../utils/ApiError.js';

/**
 * Admin Middleware - Checks if user has admin role
 * Supports both Clerk metadata and custom JWT role system
 */
export function adminMiddleware(req, res, next) {
  // 1. Ưu tiên kiểm tra role từ database MongoDB (req.user từ unifiedAuthMiddleware)
  if (req.user) {
    if (req.user.role !== ROLES.ADMIN) {
      return next(new ApiError(403, 'Admin permission is required'));
    }
    return next();
  }

  // 2. Dự phòng: Kiểm tra qua Clerk Session Claims
  if (req.auth) {
    const clerkRole = req.auth?.sessionClaims?.metadata?.role;
    if (clerkRole !== ROLES.ADMIN) {
      return next(new ApiError(403, 'Admin permission is required'));
    }
    return next();
  }

  return next(new ApiError(403, 'Admin permission is required'));
}

