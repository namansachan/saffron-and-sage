import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Lock, Eye, EyeOff, UtensilsCrossed } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as { from?: string })?.from || '/admin';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!password) {
      setError('Please enter the admin password');
      return;
    }

    const success = login(password);
    if (success) {
      navigate(from, { replace: true });
    } else {
      setError('Incorrect password');
      setPassword('');
    }
  };

  return (
    <div className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-stone-50 px-4 dark:bg-stone-950">
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-brand-300/30 blur-3xl animate-floaty dark:bg-brand-600/20" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-brand-400/20 blur-3xl animate-floaty dark:bg-brand-700/20" />

      <div className="relative w-full max-w-sm animate-fadeIn">
        <div className="rounded-2xl border border-stone-200/70 bg-white/80 p-8 shadow-xl shadow-stone-900/5 backdrop-blur-md dark:border-white/10 dark:bg-stone-900/70">
          <Link to="/" className="flex items-center justify-center gap-2.5">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-500 text-white shadow-lg shadow-brand-500/30">
              <UtensilsCrossed size={20} />
            </span>
          </Link>

          <h1 className="mt-4 text-center font-serif text-2xl font-bold tracking-tight text-stone-900 dark:text-white">
            Admin Access
          </h1>
          <p className="mt-1 text-center text-sm text-stone-500 dark:text-stone-400">
            Enter the admin password to continue.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-3">
            <div className="relative">
              <Lock
                size={18}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
              />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                placeholder="Password"
                autoFocus
                className="w-full rounded-xl border border-stone-200 bg-stone-50 py-2.5 pl-10 pr-10 text-sm text-stone-900 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30 dark:border-white/10 dark:bg-stone-800/60 dark:text-white dark:placeholder:text-stone-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-300"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {error && (
              <p className="text-center text-sm text-red-500 animate-fadeIn">{error}</p>
            )}

            <button type="submit" className="btn-primary w-full">
              Login
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-stone-500 dark:text-stone-400">
            <Link to="/" className="font-medium text-brand-500 hover:text-brand-600">
              &larr; Back to Home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}