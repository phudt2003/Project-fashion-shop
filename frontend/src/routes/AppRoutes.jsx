import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { CustomerLayout } from '../layouts/CustomerLayout';
import { AuthLayout } from '../layouts/AuthLayout';
import { HomePage } from '../pages/HomePage';
import { ProductListPage } from '../features/products/pages/ProductListPage';
import { ProductDetailPage } from '../features/products/pages/ProductDetailPage';
import { CategoryPage } from '../features/categories/pages/CategoryPage';
import { SearchPage } from '../features/products/pages/SearchPage';
import { UnauthorizedPage } from '../pages/UnauthorizedPage';
import { NotFoundPage } from '../pages/NotFoundPage';

// Clerk Pages
import { LoginPage } from '../pages/Login';
import { RegisterPage } from '../pages/Register';
import { ProfilePage } from '../pages/Profile';
import { ForgotPasswordPage } from '../features/auth/pages/ForgotPasswordPage';
import { ResetPasswordPage } from '../features/auth/pages/ResetPasswordPage';

// Route Guards
import { ProtectedRoute } from '../components/ProtectedRoute';
import { PublicRoute } from './PublicRoute';
import { AdminRoute } from './AdminRoute';

// Protected Feature Pages
import { CartPage } from '../features/cart/pages/CartPage';
import { WishlistPage } from '../features/wishlist/pages/WishlistPage';
import { CheckoutPage } from '../features/orders/pages/CheckoutPage';
import { PaymentPage } from '../features/payments/pages/PaymentPage';
import { PaymentSuccessPage } from '../features/payments/pages/PaymentSuccessPage';
import { PaymentFailedPage } from '../features/payments/pages/PaymentFailedPage';
import { OrderHistoryPage } from '../features/orders/pages/OrderHistoryPage';
import { OrderDetailPage } from '../features/orders/pages/OrderDetailPage';

// Admin Layout & Pages
import { AdminLayout } from '../layouts/AdminLayout';
import { AdminDashboardPage } from '../features/admin/dashboard/AdminDashboardPage';
import { AdminProductsPage } from '../features/admin/products/AdminProductsPage';
import { AdminCategoriesPage } from '../features/admin/categories/AdminCategoriesPage';
import { AdminBrandsPage } from '../features/admin/brands/AdminBrandsPage';
import { AdminOrdersPage } from '../features/admin/orders/AdminOrdersPage';
import { AdminUsersPage } from '../features/admin/users/AdminUsersPage';
import { AdminCouponsPage } from '../features/admin/coupons/AdminCouponsPage';
import { AdminPaymentsPage } from '../features/admin/payments/AdminPaymentsPage';
import { AdminAnalyticsPage } from '../features/admin/analytics/AdminAnalyticsPage';

export function AppRoutes() {
  return (
    <Routes>
      {/* Customer / Shop Routes */}
      <Route element={<CustomerLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductListPage />} />
        <Route path="/products/:slug" element={<ProductDetailPage />} />
        <Route path="/categories/:slug" element={<CategoryPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        
        {/* Protected Customer Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/payment/:orderId" element={<PaymentPage />} />
          <Route path="/payment/success" element={<PaymentSuccessPage />} />
          <Route path="/payment/failed" element={<PaymentFailedPage />} />
          <Route path="/orders" element={<OrderHistoryPage />} />
          <Route path="/orders/:orderId" element={<OrderDetailPage />} />
          {/* Also protect /dashboard as requested */}
          <Route path="/dashboard" element={<Navigate to="/admin" replace />} />
        </Route>
      </Route>

      {/* Guest / Public-Only Auth Routes */}
      <Route element={<PublicRoute />}>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
        </Route>
      </Route>

      {/* Admin Protected Routes */}
      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="products" element={<AdminProductsPage />} />
          <Route path="categories" element={<AdminCategoriesPage />} />
          <Route path="brands" element={<AdminBrandsPage />} />
          <Route path="orders" element={<AdminOrdersPage />} />
          <Route path="users" element={<AdminUsersPage />} />
          <Route path="coupons" element={<AdminCouponsPage />} />
          <Route path="payments" element={<AdminPaymentsPage />} />
          <Route path="analytics" element={<AdminAnalyticsPage />} />
        </Route>
      </Route>

      {/* Fallback Not Found Route */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRoutes;
