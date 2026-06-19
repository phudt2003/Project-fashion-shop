import { Router } from 'express';
import { adminMiddleware } from '../../middlewares/admin.middleware.js';
import { authMiddleware } from '../../middlewares/auth.middleware.js';
import { brandController } from './brand.controller.js';

export const brandRoutes = Router();

brandRoutes.get('/', brandController.list);
brandRoutes.get('/:slug', brandController.getBySlug);

brandRoutes.use(authMiddleware, adminMiddleware);
brandRoutes.get('/admin/all', brandController.adminList);
brandRoutes.post('/', brandController.create);
brandRoutes.patch('/:brandId', brandController.update);
brandRoutes.delete('/:brandId', brandController.remove);

