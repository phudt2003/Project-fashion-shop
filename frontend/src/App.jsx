import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes/AppRoutes';
import { useAuth } from './hooks/useAuth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { USER_ROLES } from './config/constants';

/**
 * Component riêng để gọi useAuth() — đảm bảo sync user vào MongoDB
 * ngay khi app load, bất kể user đang ở trang nào.
 * Đồng thời handle role-based redirect.
 */
function AuthSync() {
  const { user, isLoaded, isSignedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      // Role-based redirect for authenticated users
      if (user.role === USER_ROLES.ADMIN) {
        // If admin and not on admin page, redirect to admin
        const currentPath = window.location.pathname;
        if (!currentPath.startsWith('/admin')) {
          navigate('/admin', { replace: true });
        }
      } else {
        // If regular user and on admin page, redirect to home
        const currentPath = window.location.pathname;
        if (currentPath.startsWith('/admin')) {
          navigate('/', { replace: true });
        }
      }
    }
  }, [isLoaded, isSignedIn, user, navigate]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <AuthSync />
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
