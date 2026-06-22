import { NavLink, Outlet } from 'react-router-dom';

const navLinks = [
  { label: 'Dashboard', path: '/admin', icon: 'dashboard' },
  { label: 'Products', path: '/admin/products', icon: 'inventory_2' },
  { label: 'Orders', path: '/admin/orders', icon: 'shopping_cart' },
  { label: 'Customers', path: '/admin/users', icon: 'group' },
  { label: 'Categories', path: '/admin/categories', icon: 'category' },
  { label: 'Promotions', path: '/admin/coupons', icon: 'sell' },
  { label: 'Reports', path: '/admin/analytics', icon: 'analytics' },
  { label: 'Settings', path: '/admin/settings', icon: 'settings' },
];

export function AdminLayout() {
  const currentDate = new Date().toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  return (
    <div className="min-h-screen bg-background text-on-surface font-body-md overflow-x-hidden">
      {/* Side Navigation Shell */}
      <aside className="fixed left-0 top-0 z-[60] flex h-screen w-sidebar_width flex-col border-r border-outline-variant bg-surface-container-lowest py-container_padding shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
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

        <div className="border-t border-outline-variant px-6 pt-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary-fixed font-bold text-on-secondary-fixed">
              <span className="flex h-full w-full items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-xs">
                AD
              </span>
            </div>
            <div className="overflow-hidden">
              <p className="font-body-md truncate font-bold">Admin User</p>
              <p className="label-caps truncate text-on-surface-variant">ADMINISTRATOR</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Canvas */}
      <main className="ml-sidebar_width min-h-screen">
        {/* Top Bar Shell */}
        <header className="sticky top-0 z-50 flex h-row_height w-full items-center justify-between bg-surface px-container_padding transition-all">
          <div className="flex w-96 items-center rounded-full bg-surface-container-low px-4 py-2">
            <span className="material-symbols-outlined text-outline">search</span>
            <input
              className="ml-2 w-full border-none bg-transparent text-body-sm focus:ring-0"
              placeholder="Tìm kiếm đơn hàng, sản phẩm..."
              type="text"
            />
          </div>
          <div className="flex items-center gap-6">
            <button className="relative cursor-pointer rounded-full p-2 text-on-surface-variant transition-all hover:bg-surface-container-high">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full border-2 border-surface bg-primary"></span>
            </button>
            <div className="flex cursor-pointer items-center gap-2 group">
              <span className="title-sm font-title-sm text-primary group-hover:text-primary-container">
                Admin User
              </span>
              <span className="material-symbols-outlined text-outline">expand_more</span>
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

