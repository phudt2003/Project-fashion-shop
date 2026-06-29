import { Router } from 'express';
import { adminMiddleware } from '../../middlewares/admin.middleware.js';
import { clerkAuthMiddleware, requireAuth } from '../../middlewares/clerkAuth.middleware.js';
import { unifiedAuthMiddleware } from '../../middlewares/unifiedAuth.middleware.js';
import { validate } from '../../middlewares/validate.middleware.js';
import { orderCreateSchema } from '../../validations/order.validation.js';
import { orderController } from './order.controller.js';

export const orderRoutes = Router();

// Apply Clerk authentication for all routes
orderRoutes.use(clerkAuthMiddleware);
orderRoutes.use(requireAuth);
orderRoutes.use(unifiedAuthMiddleware);

// Customer routes
orderRoutes.post('/', validate(orderCreateSchema), orderController.create);
orderRoutes.get('/me', orderController.listMine);
orderRoutes.get('/:orderId', orderController.getById);
orderRoutes.patch('/:orderId/cancel', orderController.cancel);

// Admin routes
orderRoutes.use(adminMiddleware);
orderRoutes.get('/', orderController.adminList);
orderRoutes.patch('/:orderId/status', orderController.updateStatus);

