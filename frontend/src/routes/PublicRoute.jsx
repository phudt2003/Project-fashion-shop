import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export function PublicRoute() {
  const { isAuthenticated, isLoaded } = useAuth();

  if (!isLoaded) {
    return null;
  }

  return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />;
}
