import { Outlet } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';

export function CustomerLayout() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

