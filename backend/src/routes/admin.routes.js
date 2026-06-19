import { Router } from 'express';
import { adminMiddleware } from '../middlewares/admin.middleware.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

export const adminRoutes = Router();

adminRoutes.use(authMiddleware, adminMiddleware);
adminRoutes.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Admin route is available',
  });
});

