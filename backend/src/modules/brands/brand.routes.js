import { Router } from 'express';
import { adminMiddleware } from '../../middlewares/admin.middleware.js';
import { clerkAuthMiddleware, requireAuth } from '../../middlewares/clerkAuth.middleware.js';
import { unifiedAuthMiddleware } from '../../middlewares/unifiedAuth.middleware.js';
import { brandController } from './brand.controller.js';

export const brandRoutes = Router();

// Public routes
brandRoutes.get('/', brandController.list);
brandRoutes.get('/:slug', brandController.getBySlug);

// Admin routes - Apply Clerk authentication
brandRoutes.use(clerkAuthMiddleware);
brandRoutes.use(requireAuth);
brandRoutes.use(unifiedAuthMiddleware);
brandRoutes.use(adminMiddleware);

brandRoutes.get('/admin/all', brandController.adminList);
brandRoutes.post('/', brandController.create);
brandRoutes.patch('/:brandId', brandController.update);
brandRoutes.delete('/:brandId', brandController.remove);

