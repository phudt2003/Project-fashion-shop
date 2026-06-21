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
      <main className="pt-[72px] flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

