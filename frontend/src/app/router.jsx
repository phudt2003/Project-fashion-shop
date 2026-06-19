import { createBrowserRouter } from 'react-router-dom';
import { AdminLayout } from '../layouts/AdminLayout';
import { AuthLayout } from '../layouts/AuthLayout';
import { CustomerLayout } from '../layouts/CustomerLayout';
import { AdminRoute } from '../routes/AdminRoute';
import { ProtectedRoute } from '../routes/ProtectedRoute';
import { PublicRoute } from '../routes/PublicRoute';
import { ForgotPasswordPage } from '../features/auth/pages/ForgotPasswordPage';
import { LoginPage } from '../features/auth/pages/LoginPage';
import { RegisterPage } from '../features/auth/pages/RegisterPage';
import { ResetPasswordPage } from '../features/auth/pages/ResetPasswordPage';
import { CartPage } from '../features/cart/pages/CartPage';
import { CategoryPage } from '../features/categories/pages/CategoryPage';
import { CheckoutPage } from '../features/orders/pages/CheckoutPage';
import { OrderDetailPage } from '../features/orders/pages/OrderDetailPage';
import { OrderHistoryPage } from '../features/orders/pages/OrderHistoryPage';
import { PaymentFailedPage } from '../features/payments/pages/PaymentFailedPage';
import { PaymentPage } from '../features/payments/pages/PaymentPage';
import { PaymentSuccessPage } from '../features/payments/pages/PaymentSuccessPage';
import { ProductDetailPage } from '../features/products/pages/ProductDetailPage';
import { ProductListPage } from '../features/products/pages/ProductListPage';
import { SearchPage } from '../features/products/pages/SearchPage';
import { ProfilePage } from '../features/profile/pages/ProfilePage';
import { WishlistPage } from '../features/wishlist/pages/WishlistPage';
import { AdminAnalyticsPage } from '../features/admin/analytics/AdminAnalyticsPage';
import { AdminBrandsPage } from '../features/admin/brands/AdminBrandsPage';
import { AdminCategoriesPage } from '../features/admin/categories/AdminCategoriesPage';
import { AdminCouponsPage } from '../features/admin/coupons/AdminCouponsPage';
import { AdminDashboardPage } from '../features/admin/dashboard/AdminDashboardPage';
import { AdminOrdersPage } from '../features/admin/orders/AdminOrdersPage';
import { AdminPaymentsPage } from '../features/admin/payments/AdminPaymentsPage';
import { AdminProductsPage } from '../features/admin/products/AdminProductsPage';
import { AdminUsersPage } from '../features/admin/users/AdminUsersPage';
import { HomePage } from '../pages/HomePage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { UnauthorizedPage } from '../pages/UnauthorizedPage';

export const router = createBrowserRouter([
  {
    element: <CustomerLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/products', element: <ProductListPage /> },
      { path: '/products/:slug', element: <ProductDetailPage /> },
      { path: '/categories/:slug', element: <CategoryPage /> },
      { path: '/search', element: <SearchPage /> },
      { path: '/unauthorized', element: <UnauthorizedPage /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: '/profile', element: <ProfilePage /> },
          { path: '/cart', element: <CartPage /> },
          { path: '/wishlist', element: <WishlistPage /> },
          { path: '/checkout', element: <CheckoutPage /> },
          { path: '/payment/:orderId', element: <PaymentPage /> },
          { path: '/payment/success', element: <PaymentSuccessPage /> },
          { path: '/payment/failed', element: <PaymentFailedPage /> },
          { path: '/orders', element: <OrderHistoryPage /> },
          { path: '/orders/:orderId', element: <OrderDetailPage /> },
        ],
      },
    ],
  },
  {
    element: <PublicRoute />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          { path: '/login', element: <LoginPage /> },
          { path: '/register', element: <RegisterPage /> },
          { path: '/forgot-password', element: <ForgotPasswordPage /> },
          { path: '/reset-password/:token', element: <ResetPasswordPage /> },
        ],
      },
    ],
  },
  {
    element: <AdminRoute />,
    children: [
      {
        path: '/admin',
        element: <AdminLayout />,
        children: [
          { index: true, element: <AdminDashboardPage /> },
          { path: 'products', element: <AdminProductsPage /> },
          { path: 'categories', element: <AdminCategoriesPage /> },
          { path: 'brands', element: <AdminBrandsPage /> },
          { path: 'orders', element: <AdminOrdersPage /> },
          { path: 'users', element: <AdminUsersPage /> },
          { path: 'coupons', element: <AdminCouponsPage /> },
          { path: 'payments', element: <AdminPaymentsPage /> },
          { path: 'analytics', element: <AdminAnalyticsPage /> },
        ],
      },
    ],
  },
  { path: '*', element: <NotFoundPage /> },
]);

