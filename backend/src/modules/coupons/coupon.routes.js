import { Router } from 'express';
import { adminMiddleware } from '../../middlewares/admin.middleware.js';
import { authMiddleware } from '../../middlewares/auth.middleware.js';
import { validate } from '../../middlewares/validate.middleware.js';
import { couponCreateSchema } from '../../validations/coupon.validation.js';
import { couponController } from './coupon.controller.js';

export const couponRoutes = Router();

couponRoutes.post('/validate', authMiddleware, couponController.validateCode);
couponRoutes.use(authMiddleware, adminMiddleware);
couponRoutes.get('/', couponController.list);
couponRoutes.post('/', validate(couponCreateSchema), couponController.create);
couponRoutes.patch('/:couponId', couponController.update);
couponRoutes.delete('/:couponId', couponController.remove);

