import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Show, UserButton, useUser } from '@clerk/react';
import { useAuth } from '../hooks/useAuth';
import { USER_ROLES } from '../config/constants';
import { LayoutDashboard, UserCog } from 'lucide-react';

export function Header() {
  const cartItems = useSelector((state) => state.cart?.items || []);
  const cartCount = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);
  const { pathname, search } = useLocation();
  const currentPath = pathname + search;
  const { user, isLoaded } = useUser();
  const { user: userWithRole } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Get user role from useAuth hook (MongoDB sync)
  const userRole = userWithRole?.role || 'user';

  // Navbar interaction on scroll
  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector('header');
      if (header) {
        if (window.scrollY > 50) {
          header.classList.add('py-2');
          header.classList.remove('py-4');
        } else {
          header.classList.remove('py-2');
          header.classList.add('py-4');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const getLinkClass = (targetPath) => {
    const isActive = targetPath.includes('?') 
      ? currentPath.startsWith(targetPath)
      : pathname.startsWith(targetPath);

    return `font-body text-sm font-extrabold transition-colors duration-300 ${
      isActive 
        ? 'text-primary' 
        : 'text-[var(--color-text-secondary)] hover:text-primary'
    }`;
  };

  // Don't show header on admin pages
  if (pathname.startsWith('/admin')) {
    return null;
  }

  const navLinks = [
    { label: 'Bé trai', path: '/categories/do-be-trai' },
    { label: 'Bé gái', path: '/categories/do-be-gai' },
    { label: 'Sơ sinh', path: '/categories/so-sinh' },
    { label: 'Giày dép', path: '/categories/giay-dep' },
    { label: 'Khuyến mãi', path: '/khuyen-mai' },
    { label: 'Đơn hàng', path: '/don-hang' },
  ];

  return (
    <header className="fixed top-0 z-50 w-full glass-nav shadow-soft transition-all duration-300 py-4">
      <nav className="flex justify-between items-center px-4 md:px-6 max-w-7xl mx-auto w-full">
        {/* Brand Logo */}
        <div className="flex justify-start">
          <Link to="/" className="font-display text-[var(--text-xl)] font-extrabold text-primary">
            KỶ NGUYÊN KID
          </Link>
        </div>
        
        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center justify-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={getLinkClass(link.path)}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Auth & Cart controls */}
        <div className="flex justify-end items-center gap-4">
          {/* Cart Icon - Hide for admin users */}
          {userRole !== USER_ROLES.ADMIN && (
            <Link 
              to="/cart" 
              className="relative mr-1 flex h-11 w-11 items-center justify-center rounded-full bg-white text-[var(--color-text-secondary)] shadow-soft transition-all hover:-translate-y-0.5 hover:text-primary"
              title="Giỏ hàng"
            >
              <span className="material-symbols-outlined">shopping_bag</span>
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-[10px] font-extrabold text-[var(--badge-sale-text)]">
                  {cartCount}
                </span>
              )}
            </Link>
          )}

          {/* User Account / Avatar */}
          <Show when="signed-in">
            <div className="flex items-center ml-1">
              <UserButton afterSignOutUrl="/">
                <UserButton.MenuItems>
                  {userRole === USER_ROLES.ADMIN && (
                    <UserButton.Link label="Admin Dashboard" href="/admin" labelIcon={<LayoutDashboard size={16} />} />
                  )}
                  <UserButton.Link label="Manage Account" href="/profile" labelIcon={<UserCog size={16} />} />
                </UserButton.MenuItems>
              </UserButton>
            </div>
          </Show>

          <Show when="signed-out">
            <Link 
              to="/login" 
              className="ml-1 flex h-11 w-11 items-center justify-center rounded-full bg-white text-[var(--color-text-secondary)] shadow-soft transition-all hover:-translate-y-0.5 hover:text-primary"
              title="Đăng nhập"
            >
              <span className="material-symbols-outlined">person</span>
            </Link>
          </Show>

          {/* Mobile Menu Button */}
          <button
            className="ml-2 flex h-11 w-11 items-center justify-center rounded-full bg-white text-[var(--color-text-secondary)] shadow-soft hover:text-primary md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined">
              {isMobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute left-4 right-4 top-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white px-4 py-4 shadow-card md:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={getLinkClass(link.path)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;


