import { ROLES } from '../constants/roles.js';
import { ApiError } from '../utils/ApiError.js';

/**
 * Admin Middleware - Checks if user has admin role
 * Supports both Clerk metadata and custom JWT role system
 */
export function adminMiddleware(req, res, next) {
  // Check for Clerk authentication (req.auth from Clerk middleware)
  if (req.auth) {
    const clerkRole = req.auth?.sessionClaims?.metadata?.role;
    if (clerkRole !== ROLES.ADMIN) {
      return next(new ApiError(403, 'Admin permission is required'));
    }
    return next();
  }

  // Fallback to custom JWT system (req.user from auth.middleware.js)
  if (req.user?.role !== ROLES.ADMIN) {
    return next(new ApiError(403, 'Admin permission is required'));
  }

  return next();
}

