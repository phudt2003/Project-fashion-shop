import { Navigate, Outlet } from 'react-router-dom';
import { USER_ROLES } from '../config/constants';
import { useAuth } from '../hooks/useAuth';

export function AdminRoute() {
  const { isAuthenticated, isLoaded, user } = useAuth();

  if (!isLoaded) {
    return null;
  }

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (user?.role !== USER_ROLES.ADMIN) return <Navigate to="/unauthorized" replace />;

  return <Outlet />;
}
