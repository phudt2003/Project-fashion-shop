import { Router } from 'express';
import { adminMiddleware } from '../../middlewares/admin.middleware.js';
import { clerkAuthMiddleware, requireAuth } from '../../middlewares/clerkAuth.middleware.js';
import { unifiedAuthMiddleware } from '../../middlewares/unifiedAuth.middleware.js';
import { validate } from '../../middlewares/validate.middleware.js';
import { couponCreateSchema } from '../../validations/coupon.validation.js';
import { couponController } from './coupon.controller.js';

export const couponRoutes = Router();

// Apply Clerk authentication for all routes
couponRoutes.use(clerkAuthMiddleware);
couponRoutes.use(requireAuth);
couponRoutes.use(unifiedAuthMiddleware);

couponRoutes.post('/validate', couponController.validateCode);

// Admin routes
couponRoutes.use(adminMiddleware);
couponRoutes.get('/', couponController.list);
couponRoutes.post('/', validate(couponCreateSchema), couponController.create);
couponRoutes.patch('/:couponId', couponController.update);
couponRoutes.delete('/:couponId', couponController.remove);

