import { Router } from 'express';
import { adminMiddleware } from '../../middlewares/admin.middleware.js';
import { clerkAuthMiddleware, requireAuth } from '../../middlewares/clerkAuth.middleware.js';
import { unifiedAuthMiddleware } from '../../middlewares/unifiedAuth.middleware.js';
import { analyticsController } from './analytics.controller.js';

export const analyticsRoutes = Router();

// Apply Clerk authentication for all routes
analyticsRoutes.use(clerkAuthMiddleware);
analyticsRoutes.use(requireAuth);
analyticsRoutes.use(unifiedAuthMiddleware);
analyticsRoutes.use(adminMiddleware);

analyticsRoutes.get('/dashboard', analyticsController.dashboard);
analyticsRoutes.get('/revenue', analyticsController.revenue);

