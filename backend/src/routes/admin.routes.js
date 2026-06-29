import { Router } from 'express';
import { adminMiddleware } from '../middlewares/admin.middleware.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { clerkAuthMiddleware, requireAuth } from '../middlewares/clerkAuth.middleware.js';
import { unifiedAuthMiddleware } from '../middlewares/unifiedAuth.middleware.js';

export const adminRoutes = Router();

// Apply Clerk authentication middleware
adminRoutes.use(clerkAuthMiddleware);

// Require authentication
adminRoutes.use(requireAuth);

// Get user info from database (MongoDB)
adminRoutes.use(unifiedAuthMiddleware);

// Apply admin middleware (supports both Clerk and JWT)
adminRoutes.use(adminMiddleware);

adminRoutes.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Admin route is available',
  });
});

