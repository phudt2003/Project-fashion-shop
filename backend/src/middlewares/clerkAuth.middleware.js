import { clerkMiddleware } from '@clerk/express';
import { env } from '../config/env.js';

/**
 * Clerk Authentication Middleware
 * This middleware validates JWT tokens from Clerk and attaches user info to req.auth
 */
export const clerkAuthMiddleware = clerkMiddleware({
  secretKey: env.clerkSecretKey,
  publishableKey: env.clerkPublishableKey,
});

/**
 * Require Authentication Middleware
 * Ensures the user is authenticated before proceeding
 */
export const requireAuth = (req, res, next) => {
  if (!req.auth?.userId) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required'
    });
  }
  next();
};
