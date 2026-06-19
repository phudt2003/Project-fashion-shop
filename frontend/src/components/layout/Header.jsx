import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header className="border-b bg-white">
      <div className="page-container flex items-center justify-between py-4">
        <Link to="/" className="text-lg font-semibold">Fashion Shop</Link>
        <nav className="flex gap-4 text-sm">
          <Link to="/products">Products</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/profile">Profile</Link>
        </nav>
      </div>
    </header>
  );
}

