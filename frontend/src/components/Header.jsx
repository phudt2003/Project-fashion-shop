import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Show, UserButton, useUser } from '@clerk/react';
import { useAuth } from '../hooks/useAuth';
import { USER_ROLES } from '../config/constants';

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

    return `font-label-uppercase text-label-uppercase transition-colors duration-300 ${
      isActive 
        ? 'text-primary font-bold' 
        : 'text-on-surface-variant hover:text-primary'
    }`;
  };

  // Don't show header on admin pages
  if (pathname.startsWith('/admin')) {
    return null;
  }

  const navLinks = [
    { label: 'Bé trai', path: '/categories/do-be-trai' },
    { label: 'Bé gái', path: '/categories/do-be-gai' },
    { label: 'Giày dép', path: '/categories/footwear' },
    { label: 'Khuyến mãi', path: '/products?sale=true' },
    { label: 'Đơn hàng', path: '/orders' },
  ];

  return (
    <header className="fixed top-0 w-full z-50 glass-nav shadow-sm transition-all duration-300 py-4">
      <nav className="flex justify-between items-center px-grid-gutter max-w-container-max mx-auto w-full">
        {/* Brand Logo */}
        <div className="flex justify-start">
          <Link to="/" className="font-display text-headline-md tracking-widest text-primary">
            STITCH
          </Link>
        </div>
        
        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center justify-center gap-element-gap-lg">
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
        <div className="flex justify-end items-center gap-element-gap-md">
          {/* Cart Icon - Hide for admin users */}
          {userRole !== USER_ROLES.ADMIN && (
            <Link 
              to="/cart" 
              className="text-on-surface-variant hover:text-primary transition-opacity relative flex items-center mr-1"
              title="Giỏ hàng"
            >
              <span className="material-symbols-outlined">shopping_bag</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
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
                    <UserButton.Link label="Admin Dashboard" href="/admin" />
                  )}
                  <UserButton.Link label="Manage Account" href="/profile" />
                </UserButton.MenuItems>
              </UserButton>
            </div>
          </Show>

          <Show when="signed-out">
            <Link 
              to="/login" 
              className="text-on-surface-variant hover:text-primary transition-opacity flex items-center ml-1"
              title="Đăng nhập"
            >
              <span className="material-symbols-outlined">person</span>
            </Link>
          </Show>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-on-surface-variant hover:text-primary ml-2"
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
        <div className="md:hidden absolute top-full left-0 right-0 bg-surface-bright border-t border-border-subtle shadow-lg py-4 px-4">
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
