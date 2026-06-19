import { Router } from 'express';
import { validate } from '../../middlewares/validate.middleware.js';
import {
  forgotPasswordSchema,
  loginSchema,
  refreshTokenSchema,
  registerSchema,
  resetPasswordSchema,
} from '../../validations/auth.validation.js';
import { authController } from './auth.controller.js';

export const authRoutes = Router();

authRoutes.post('/register', validate(registerSchema), authController.register);
authRoutes.post('/login', validate(loginSchema), authController.login);
authRoutes.post('/refresh-token', validate(refreshTokenSchema), authController.refreshToken);
authRoutes.post('/logout', validate(refreshTokenSchema), authController.logout);
authRoutes.post('/forgot-password', validate(forgotPasswordSchema), authController.forgotPassword);
authRoutes.post('/reset-password/:token', validate(resetPasswordSchema), authController.resetPassword);

