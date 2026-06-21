import { useEffect } from 'react';
import { useUser } from '@clerk/react';
import { setTokenGetter } from '../lib/axiosClient';

export function useAuth() {
  const { isSignedIn, user, isLoaded, getToken } = useUser();

  useEffect(() => {
    if (isSignedIn && getToken) {
      setTokenGetter(() => getToken());
      return () => setTokenGetter(null);
    }

    setTokenGetter(null);
    return undefined;
  }, [getToken, isSignedIn]);

  // Map public metadata role to retain compatibility with existing AdminRoute checks
  const role = user?.publicMetadata?.role || 'customer';
  const userWithRole = user ? { ...user, role } : null;

  return {
    isSignedIn,
    isAuthenticated: isSignedIn, // Backward compatibility for existing routes/hooks
    user: userWithRole,
    isLoaded,
  };
}
