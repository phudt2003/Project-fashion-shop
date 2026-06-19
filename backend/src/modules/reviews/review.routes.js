import { Router } from 'express';
import { adminMiddleware } from '../../middlewares/admin.middleware.js';
import { authMiddleware } from '../../middlewares/auth.middleware.js';
import { reviewController } from './review.controller.js';

export const reviewRoutes = Router();

reviewRoutes.get('/products/:productId', reviewController.listByProduct);
reviewRoutes.post('/', authMiddleware, reviewController.create);
reviewRoutes.delete('/:reviewId', authMiddleware, adminMiddleware, reviewController.remove);

