import { Router } from 'express';
import { adminMiddleware } from '../../middlewares/admin.middleware.js';
import { clerkAuthMiddleware, requireAuth } from '../../middlewares/clerkAuth.middleware.js';
import { unifiedAuthMiddleware } from '../../middlewares/unifiedAuth.middleware.js';
import { categoryController } from './category.controller.js';

export const categoryRoutes = Router();

// Public routes
categoryRoutes.get('/', categoryController.list);
categoryRoutes.get('/:slug', categoryController.getBySlug);

// Admin routes - Apply Clerk authentication
categoryRoutes.use(clerkAuthMiddleware);
categoryRoutes.use(requireAuth);
categoryRoutes.use(unifiedAuthMiddleware);
categoryRoutes.use(adminMiddleware);

categoryRoutes.get('/admin/all', categoryController.adminList);
categoryRoutes.post('/', categoryController.create);
categoryRoutes.patch('/:categoryId', categoryController.update);
categoryRoutes.delete('/:categoryId', categoryController.remove);

