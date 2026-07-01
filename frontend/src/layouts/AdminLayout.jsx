import { NavLink, Outlet } from 'react-router-dom';
import { UserButton, useUser } from '@clerk/react';
import { useState } from 'react';

const navLinks = [
  { label: 'Dashboard', path: '/admin', icon: 'dashboard' },
  { label: 'Products', path: '/admin/products', icon: 'inventory_2' },
  { label: 'Orders', path: '/admin/orders', icon: 'shopping_cart' },
  { label: 'Customers', path: '/admin/users', icon: 'group' },
  { label: 'Categories', path: '/admin/categories', icon: 'category' },
  { label: 'Promotions', path: '/admin/coupons', icon: 'sell' },
  { label: 'Reviews', path: '/admin/reviews', icon: 'rate_review' },
  { label: 'Reports', path: '/admin/analytics', icon: 'analytics' },
];

export function AdminLayout() {
  const { user } = useUser();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const fullName = user?.fullName || `${user?.firstName || ''} ${user?.lastName || ''}`.trim() || 'Admin User';

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans overflow-x-hidden">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[65] md:hidden transition-opacity duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Side Navigation Shell */}
      <aside className={`fixed left-0 top-0 z-[60] flex h-screen w-[280px] flex-col border-r border-slate-100 bg-white py-6 shadow-sm transition-transform duration-300 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0`}>
        <div className="mb-8 px-6">
          <h1 className="font-display text-xl font-bold text-sky-500 tracking-tight">KidsFashion Admin</h1>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-0.5">Management Portal</p>
        </div>
        
        <nav className="flex-1 space-y-1 overflow-y-auto pr-3 pl-0 custom-scrollbar">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end
              onClick={() => setIsSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 py-3 pl-6 pr-4 transition-all border-l-4 ${
                  isActive
                    ? 'bg-sky-50 border-sky-500 font-bold text-sky-600 rounded-r-xl'
                    : 'border-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-800 hover:pl-7'
                }`
              }
            >
              <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: 'FILL 1' }}>
                {link.icon}
              </span>
              <span className="text-sm font-semibold">{link.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content Canvas */}
      <main className="min-h-screen transition-all duration-300 md:ml-[280px] ml-0 flex flex-col">
        {/* Top Bar Shell */}
        <header className="sticky top-0 z-50 flex h-16 w-full items-center justify-between bg-white border-b border-slate-100 px-6 shadow-sm">
          <div className="flex items-center gap-4 flex-1">
            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden text-slate-500 hover:text-sky-500 transition-colors flex items-center justify-center p-1"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              aria-label="Toggle sidebar"
            >
              <span className="material-symbols-outlined text-[24px]">menu</span>
            </button>
            
            <div className="flex flex-1 items-center rounded-xl bg-slate-50 border border-slate-100 px-4 py-2 max-w-md focus-within:border-sky-500 focus-within:ring-2 focus-within:ring-sky-500/10 transition-all">
              <span className="material-symbols-outlined text-slate-400 text-[20px]">search</span>
              <input
                className="ml-2 w-full border-none bg-transparent text-xs text-slate-800 placeholder:text-slate-400 outline-none focus:ring-0"
                placeholder="Tìm kiếm đơn hàng, sản phẩm..."
                type="text"
              />
            </div>
          </div>
          
          {/* Góc phải Header */}
          <div className="flex items-center gap-4">
            <button className="relative cursor-pointer rounded-full p-2 text-slate-500 transition-all hover:bg-slate-50 hover:text-sky-500 flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">notifications</span>
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full border-2 border-white bg-sky-500"></span>
            </button>
            
            {/* Khối User Profile */}
            <div className="flex items-center gap-3 pl-3 border-l border-slate-100 h-8">
              <div className="hidden sm:block text-right">
                <span className="block text-sm text-slate-800 font-bold leading-none mb-0.5">
                  {fullName}
                </span>
                <span className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider leading-none">
                  Admin
                </span>
              </div>
              
              <UserButton 
                afterSignOutUrl="/" 
                appearance={{ 
                  elements: { 
                    avatarBox: "h-9 w-9 rounded-xl border border-slate-100 shadow-sm" 
                  } 
                }} 
              />
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-6 md:p-8 flex-1">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
