import { Link, NavLink } from 'react-router-dom';
import { Moon, Sun, ShoppingCart, UtensilsCrossed, Menu as MenuIcon, X } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { classNames } from '../lib/utils';

const links = [
  { to: '/', label: 'Home' },
  { to: '/menu', label: 'Menu' },
  { to: '/restaurant', label: 'About' },
  { to: '/admin', label: 'Admin' },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { count } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-stone-50/80 dark:bg-stone-950/80 border-b border-stone-200/70 dark:border-white/10">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2.5 group">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-500 text-white shadow-lg shadow-brand-500/30 transition-transform group-hover:scale-105">
            <UtensilsCrossed size={18} />
          </span>
          <span className="font-serif text-xl font-bold tracking-tight">
            Menu<span className="text-brand-500">Flow</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                classNames(
                  'rounded-full px-4 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-brand-500/10 text-brand-600 dark:text-brand-400'
                    : 'text-stone-600 hover:text-stone-900 dark:text-stone-300 dark:hover:text-white',
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="grid h-10 w-10 place-items-center rounded-full text-stone-600 hover:bg-stone-200/70 dark:text-stone-300 dark:hover:bg-white/10 transition-colors"
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          <Link
            to="/cart"
            className="relative grid h-10 w-10 place-items-center rounded-full text-stone-600 hover:bg-stone-200/70 dark:text-stone-300 dark:hover:bg-white/10 transition-colors"
            aria-label="Cart"
          >
            <ShoppingCart size={18} />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-brand-500 px-1 text-[10px] font-bold text-white animate-scaleIn">
                {count}
              </span>
            )}
          </Link>

          <button
            onClick={() => setOpen((p) => !p)}
            className="md:hidden grid h-10 w-10 place-items-center rounded-full text-stone-600 hover:bg-stone-200/70 dark:text-stone-300 dark:hover:bg-white/10"
            aria-label="Menu"
          >
            {open ? <X size={18} /> : <MenuIcon size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-stone-200/70 dark:border-white/10 bg-stone-50 dark:bg-stone-950 animate-fadeIn">
          <div className="flex flex-col p-4 gap-1">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  classNames(
                    'rounded-xl px-4 py-3 text-sm font-medium',
                    isActive
                      ? 'bg-brand-500/10 text-brand-600 dark:text-brand-400'
                      : 'text-stone-700 dark:text-stone-200 hover:bg-stone-200/60 dark:hover:bg-white/5',
                  )
                }
              >
                {l.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
