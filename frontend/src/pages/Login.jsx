import React from 'react';
import { SignIn } from '@clerk/react';
import { useAuth } from '../hooks/useAuth';
import { USER_ROLES } from '../config/constants';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function LoginPage() {
  const { user, isLoaded } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && user) {
      // Role-based redirect after successful login
      if (user.role === USER_ROLES.ADMIN) {
        navigate('/admin', { replace: true });
      } else {
        navigate('/', { replace: true });
      }
    }
  }, [isLoaded, user, navigate]);

  return (
    <section className="min-h-screen flex items-center justify-center bg-surface-bright py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full flex flex-col items-center justify-center">
        <SignIn 
          fallbackRedirectUrl="/"
          redirectUrl="/"
        />
      </div>
    </section>
  );
}

export default LoginPage;
