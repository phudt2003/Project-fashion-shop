import { Router } from 'express';
import { authMiddleware } from '../../middlewares/auth.middleware.js';
import { cartController } from './cart.controller.js';

export const cartRoutes = Router();

cartRoutes.use(authMiddleware);
cartRoutes.get('/me', cartController.getCart);
cartRoutes.post('/items', cartController.addItem);
cartRoutes.patch('/items/:itemId', cartController.updateItem);
cartRoutes.delete('/items/:itemId', cartController.removeItem);

