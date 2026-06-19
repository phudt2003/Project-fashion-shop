import { Link } from 'react-router-dom';

export function LoginPage() {
  return (
    <div>
      <h1 className="mb-4 text-xl font-semibold">Login</h1>
      <Link className="text-sm text-slate-600" to="/forgot-password">Forgot password?</Link>
    </div>
  );
}

