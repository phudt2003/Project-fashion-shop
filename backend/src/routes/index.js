import { Router } from 'express';
import { analyticsRoutes } from '../modules/analytics/analytics.routes.js';
import { authRoutes } from '../modules/auth/auth.routes.js';
import { syncUserRoutes } from '../modules/auth/syncUser.routes.js';
import { brandRoutes } from '../modules/brands/brand.routes.js';
import { cartRoutes } from '../modules/carts/cart.routes.js';
import { categoryRoutes } from '../modules/categories/category.routes.js';
import { couponRoutes } from '../modules/coupons/coupon.routes.js';
import { orderRoutes } from '../modules/orders/order.routes.js';
import { paymentRoutes } from '../modules/payments/payment.routes.js';
import { webhookRoutes } from '../modules/payments/webhook.routes.js';
import { productRoutes } from '../modules/products/product.routes.js';
import { reviewRoutes } from '../modules/reviews/review.routes.js';
import { userRoutes } from '../modules/users/user.routes.js';
import { wishlistRoutes } from '../modules/wishlists/wishlist.routes.js';

import { adminRoutes } from './admin.routes.js';

export const router = Router();

router.use('/auth', authRoutes);
router.use('/auth', syncUserRoutes);
router.use('/users', userRoutes);
router.use('/products', productRoutes);
router.use('/categories', categoryRoutes);
router.use('/brands', brandRoutes);
router.use('/carts', cartRoutes);
router.use('/wishlists', wishlistRoutes);
router.use('/orders', orderRoutes);
router.use('/reviews', reviewRoutes);
router.use('/coupons', couponRoutes);
router.use('/payments', paymentRoutes);
router.use('/analytics', analyticsRoutes);
router.use('/webhooks', webhookRoutes);

router.use('/admin', adminRoutes);

