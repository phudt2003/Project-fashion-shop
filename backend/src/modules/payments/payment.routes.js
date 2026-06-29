import { Router } from 'express';
import { adminMiddleware } from '../../middlewares/admin.middleware.js';
import { clerkAuthMiddleware, requireAuth } from '../../middlewares/clerkAuth.middleware.js';
import { unifiedAuthMiddleware } from '../../middlewares/unifiedAuth.middleware.js';
import { validate } from '../../middlewares/validate.middleware.js';
import { createSePayQrSchema } from '../../validations/payment.validation.js';
import { paymentController } from './payment.controller.js';

export const paymentRoutes = Router();

// Apply Clerk authentication for all routes
paymentRoutes.use(clerkAuthMiddleware);
paymentRoutes.use(requireAuth);
paymentRoutes.use(unifiedAuthMiddleware);

paymentRoutes.post('/sepay/qr', validate(createSePayQrSchema), paymentController.createSePayQr);
paymentRoutes.get('/:paymentId', paymentController.getPaymentById);

// Admin routes
paymentRoutes.use(adminMiddleware);
paymentRoutes.get('/', paymentController.adminList);

