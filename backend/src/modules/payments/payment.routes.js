import { Router } from 'express';
import { adminMiddleware } from '../../middlewares/admin.middleware.js';
import { authMiddleware } from '../../middlewares/auth.middleware.js';
import { validate } from '../../middlewares/validate.middleware.js';
import { createSePayQrSchema } from '../../validations/payment.validation.js';
import { paymentController } from './payment.controller.js';

export const paymentRoutes = Router();

paymentRoutes.use(authMiddleware);
paymentRoutes.post('/sepay/qr', validate(createSePayQrSchema), paymentController.createSePayQr);
paymentRoutes.get('/:paymentId', paymentController.getPaymentById);

paymentRoutes.use(adminMiddleware);
paymentRoutes.get('/', paymentController.adminList);

