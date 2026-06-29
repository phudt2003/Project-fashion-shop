import { Router } from 'express';
import { clerkAuthMiddleware, requireAuth } from '../../middlewares/clerkAuth.middleware.js';
import { unifiedAuthMiddleware } from '../../middlewares/unifiedAuth.middleware.js';
import { cartController } from './cart.controller.js';

export const cartRoutes = Router();

// Apply Clerk authentication for all routes
cartRoutes.use(clerkAuthMiddleware);
cartRoutes.use(requireAuth);
cartRoutes.use(unifiedAuthMiddleware);

cartRoutes.get('/me', cartController.getCart);
cartRoutes.post('/items', cartController.addItem);
cartRoutes.patch('/items/:itemId', cartController.updateItem);
cartRoutes.delete('/items/:itemId', cartController.removeItem);

