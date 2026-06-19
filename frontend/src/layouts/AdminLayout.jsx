import { NavLink, Outlet } from 'react-router-dom';

const links = [
  ['Dashboard', '/admin'],
  ['Products', '/admin/products'],
  ['Categories', '/admin/categories'],
  ['Brands', '/admin/brands'],
  ['Orders', '/admin/orders'],
  ['Users', '/admin/users'],
  ['Coupons', '/admin/coupons'],
  ['Payments', '/admin/payments'],
  ['Analytics', '/admin/analytics'],
];

export function AdminLayout() {
  return (
    <div className="grid min-h-screen grid-cols-[240px_1fr] bg-slate-100">
      <aside className="border-r bg-white p-4">
        <h1 className="mb-6 text-lg font-semibold">Admin</h1>
        <nav className="space-y-1">
          {links.map(([label, to]) => (
            <NavLink key={to} to={to} end className="block rounded-md px-3 py-2 text-sm hover:bg-slate-100">
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}

