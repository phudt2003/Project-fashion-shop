import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { USER_ROLES } from '../config/constants';

function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface-bright text-on-surface">
      <div className="flex flex-col items-center gap-4">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-300 border-t-primary" />
        <p className="text-sm font-medium">Đang tải...</p>
      </div>
    </div>
  );
}

export function PublicRoute() {
  const { isAuthenticated, isLoaded, user } = useAuth();

  if (!isLoaded) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return <Outlet />;
  }

  // Role-based redirect after login
  if (user?.role === USER_ROLES.ADMIN) {
    return <Navigate to="/admin" replace />;
  }

  return <Navigate to="/" replace />;
}
