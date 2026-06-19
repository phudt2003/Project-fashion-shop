import { Router } from 'express';
import { authMiddleware } from '../../middlewares/auth.middleware.js';
import { wishlistController } from './wishlist.controller.js';

export const wishlistRoutes = Router();

wishlistRoutes.use(authMiddleware);
wishlistRoutes.get('/me', wishlistController.getWishlist);
wishlistRoutes.post('/items', wishlistController.addItem);
wishlistRoutes.delete('/items/:productId', wishlistController.removeItem);

