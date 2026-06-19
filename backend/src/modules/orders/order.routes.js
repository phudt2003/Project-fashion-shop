import { Router } from 'express';
import { adminMiddleware } from '../../middlewares/admin.middleware.js';
import { authMiddleware } from '../../middlewares/auth.middleware.js';
import { validate } from '../../middlewares/validate.middleware.js';
import { orderCreateSchema } from '../../validations/order.validation.js';
import { orderController } from './order.controller.js';

export const orderRoutes = Router();

orderRoutes.use(authMiddleware);
orderRoutes.post('/', validate(orderCreateSchema), orderController.create);
orderRoutes.get('/me', orderController.listMine);
orderRoutes.get('/:orderId', orderController.getById);
orderRoutes.patch('/:orderId/cancel', orderController.cancel);

orderRoutes.use(adminMiddleware);
orderRoutes.get('/', orderController.adminList);
orderRoutes.patch('/:orderId/status', orderController.updateStatus);

