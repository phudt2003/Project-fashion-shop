import { Router } from 'express';
import { adminMiddleware } from '../../middlewares/admin.middleware.js';
import { authMiddleware } from '../../middlewares/auth.middleware.js';
import { userController } from './user.controller.js';

export const userRoutes = Router();

userRoutes.use(authMiddleware);
userRoutes.get('/me', userController.getMe);
userRoutes.patch('/me', userController.updateMe);

userRoutes.use(adminMiddleware);
userRoutes.get('/', userController.listUsers);
userRoutes.get('/:userId', userController.getUserById);
userRoutes.patch('/:userId/status', userController.updateUserStatus);

