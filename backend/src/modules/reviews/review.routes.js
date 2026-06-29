import { Router } from 'express';
import { adminMiddleware } from '../../middlewares/admin.middleware.js';
import { clerkAuthMiddleware, requireAuth } from '../../middlewares/clerkAuth.middleware.js';
import { unifiedAuthMiddleware } from '../../middlewares/unifiedAuth.middleware.js';
import { reviewController } from './review.controller.js';

export const reviewRoutes = Router();

// Public route
reviewRoutes.get('/products/:productId', reviewController.listByProduct);

// Apply Clerk authentication for protected routes
reviewRoutes.use(clerkAuthMiddleware);
reviewRoutes.use(requireAuth);
reviewRoutes.use(unifiedAuthMiddleware);

reviewRoutes.post('/', reviewController.create);
reviewRoutes.use(adminMiddleware);
reviewRoutes.delete('/:reviewId', reviewController.remove);

