import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

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

export function ProtectedRoute() {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return <Loading />;
  }

  if (!isSignedIn) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
