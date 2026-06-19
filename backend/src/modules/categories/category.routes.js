import { Router } from 'express';
import { adminMiddleware } from '../../middlewares/admin.middleware.js';
import { authMiddleware } from '../../middlewares/auth.middleware.js';
import { categoryController } from './category.controller.js';

export const categoryRoutes = Router();

categoryRoutes.get('/', categoryController.list);
categoryRoutes.get('/:slug', categoryController.getBySlug);

categoryRoutes.use(authMiddleware, adminMiddleware);
categoryRoutes.get('/admin/all', categoryController.adminList);
categoryRoutes.post('/', categoryController.create);
categoryRoutes.patch('/:categoryId', categoryController.update);
categoryRoutes.delete('/:categoryId', categoryController.remove);

