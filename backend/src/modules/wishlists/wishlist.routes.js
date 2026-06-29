import { Router } from 'express';
import { clerkAuthMiddleware, requireAuth } from '../../middlewares/clerkAuth.middleware.js';
import { unifiedAuthMiddleware } from '../../middlewares/unifiedAuth.middleware.js';
import { wishlistController } from './wishlist.controller.js';

export const wishlistRoutes = Router();

// Apply Clerk authentication for all routes
wishlistRoutes.use(clerkAuthMiddleware);
wishlistRoutes.use(requireAuth);
wishlistRoutes.use(unifiedAuthMiddleware);

wishlistRoutes.get('/me', wishlistController.getWishlist);
wishlistRoutes.post('/items', wishlistController.addItem);
wishlistRoutes.delete('/items/:productId', wishlistController.removeItem);

