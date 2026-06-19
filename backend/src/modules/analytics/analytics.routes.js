import { Router } from 'express';
import { adminMiddleware } from '../../middlewares/admin.middleware.js';
import { authMiddleware } from '../../middlewares/auth.middleware.js';
import { analyticsController } from './analytics.controller.js';

export const analyticsRoutes = Router();

analyticsRoutes.use(authMiddleware, adminMiddleware);
analyticsRoutes.get('/dashboard', analyticsController.dashboard);
analyticsRoutes.get('/revenue', analyticsController.revenue);

