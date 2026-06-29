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
    <div className="min-h-screen bg-background text-on-surface font-body-md overflow-x-hidden">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-primary/25 z-[65] md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Side Navigation Shell */}
      <aside className={`fixed left-0 top-0 z-[60] flex h-screen flex-col border-r border-outline-variant bg-surface-container-lowest py-container_padding shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-transform duration-300 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0 md:w-sidebar_width w-72`}>
        <div className="mb-8 px-6">
          <h1 className="font-headline-md text-headline-md font-bold text-primary">KidsFashion Admin</h1>
          <p className="font-body-sm text-on-surface-variant">Management Portal</p>
        </div>
        
        <nav className="flex-1 space-y-1 overflow-y-auto px-4 custom-scrollbar">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end
              onClick={() => setIsSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 transition-colors ${
                  isActive
                    ? 'bg-surface-container-low font-bold text-primary'
                    : 'text-on-surface-variant hover:bg-surface-container-low active:scale-95'
                }`
              }
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: 'FILL 1' }}>
                {link.icon}
              </span>
              <span className="font-body-md">{link.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* ĐÃ XÓA KHỐI ADMIN LỖI Ở GÓC DƯỚI NÀY */}
      </aside>

      {/* Main Content Canvas */}
      <main className={`min-h-screen transition-all duration-300 ${isSidebarOpen ? 'md:ml-sidebar_width ml-0' : 'md:ml-sidebar_width ml-0'}`}>
        {/* Top Bar Shell */}
        <header className="sticky top-0 z-50 flex h-row_height w-full items-center justify-between bg-surface px-container_padding transition-all">
          <div className="flex items-center gap-4 flex-1">
            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden text-on-surface-variant hover:text-primary"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              aria-label="Toggle sidebar"
            >
              <span className="material-symbols-outlined">menu</span>
            </button>
            
            <div className="flex flex-1 items-center rounded-full bg-surface-container-low px-4 py-2 max-w-md">
              <span className="material-symbols-outlined text-outline">search</span>
              <input
                className="ml-2 w-full border-none bg-transparent text-body-sm focus:ring-0"
                placeholder="Tìm kiếm đơn hàng, sản phẩm..."
                type="text"
              />
            </div>
          </div>
          
          {/* Góc phải Header: Đã dồn toàn bộ cụm thông báo và nút Clerk UserButton */}
          <div className="flex items-center gap-4">
            <button className="relative cursor-pointer rounded-full p-2 text-on-surface-variant transition-all hover:bg-surface-container-high">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full border-2 border-surface bg-primary"></span>
            </button>
            
            {/* Khối User Profile điều khiển bằng Clerk */}
            <div className="flex items-center gap-3 pl-3 border-l border-outline-variant">
              <div className="hidden sm:block text-right">
                <span className="block title-sm font-title-sm text-primary font-semibold leading-none mb-1">
                  {fullName}
                </span>
                <span className="block text-[11px] text-on-surface-variant leading-none">
                  Administrator
                </span>
              </div>
              
              {/* Nút bấm Avatar của Clerk, khi nhấn vào tự hiện bảng thông tin & nút Đăng xuất */}
              <UserButton 
                afterSignOutUrl="/" 
                appearance={{ 
                  elements: { 
                    avatarBox: "h-9 w-9 rounded-xl border border-primary/10 shadow-sm" 
                  } 
                }} 
              />
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-container_padding">
          <Outlet />
        </div>
      </main>

      {/* Floating Action Button */}
      <button className="fixed bottom-8 right-8 z-[70] flex h-14 w-14 items-center justify-center rounded-full bg-primary text-on-primary shadow-lg shadow-primary/40 transition-all hover:scale-110 active:scale-95 group">
        <span className="material-symbols-outlined text-[28px] transition-transform duration-300 group-hover:rotate-90">
          add
        </span>
      </button>
    </div>
  );
}
