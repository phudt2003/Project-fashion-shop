import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

export function Header() {
  const cartItems = useSelector((state) => state.cart?.items || []);
  const cartCount = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);
  const { pathname, search } = useLocation();
  const currentPath = pathname + search;

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

  const getLinkClass = (targetPath) => {
    // Exact match for paths with query params, prefix match for normal category/order paths
    const isActive = targetPath.includes('?') 
      ? currentPath.startsWith(targetPath)
      : pathname.startsWith(targetPath);

    return `font-label-uppercase text-label-uppercase transition-colors duration-300 ${
      isActive 
        ? 'text-primary font-bold' 
        : 'text-on-surface-variant hover:text-primary'
    }`;
  };

  return (
    <header className="fixed top-0 w-full z-50 glass-nav shadow-sm transition-all duration-300 py-4">
      <nav className="flex justify-between items-center px-grid-gutter max-w-container-max mx-auto w-full grid grid-cols-3">
        <div className="flex justify-start">
          <Link to="/" className="font-display text-headline-md tracking-widest text-primary">
            STITCH
          </Link>
        </div>
        
        <div className="hidden md:flex items-center justify-center gap-element-gap-lg">
          <Link
            to="/categories/do-be-trai"
            className={getLinkClass('/categories/do-be-trai')}
          >
            Bé trai
          </Link>
          <Link
            to="/categories/do-be-gai"
            className={getLinkClass('/categories/do-be-gai')}
          >
            Bé gái
          </Link>

          <Link 
            to="/categories/footwear" 
            className={getLinkClass('/categories/footwear')}
          >
            Giày dép
          </Link>
          <Link 
            to="/products?sale=true" 
            className={getLinkClass('/products?sale=true')}
          >
            Khuyến mãi
          </Link>
          <Link 
            to="/orders" 
            className={getLinkClass('/orders')}
          >
            Đơn hàng
          </Link>
        </div>

        <div className="flex justify-end items-center gap-element-gap-md">
          <Link 
            to="/profile" 
            className="text-on-surface-variant hover:text-primary transition-opacity flex items-center"
          >
            <span className="material-symbols-outlined">person</span>
          </Link>
          <Link 
            to="/cart" 
            className="text-on-surface-variant hover:text-primary transition-opacity relative flex items-center"
          >
            <span className="material-symbols-outlined">shopping_bag</span>
            <span className="absolute -top-1 -right-1 bg-primary text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
