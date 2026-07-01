import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/layout/Footer';

export function CustomerLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-surface-bright text-on-background">
      <Header />
      <main className={`${pathname === '/' || pathname === '/categories/so-sinh' || pathname === '/khuyen-mai' || pathname === '/products' || pathname.startsWith('/categories/') ? 'pt-0' : 'pt-[72px] md:pt-[100px]'} flex-grow`}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

