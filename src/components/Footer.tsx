import { Link } from 'react-router-dom';
import { UtensilsCrossed, Instagram, Facebook, Twitter } from 'lucide-react';
import { restaurantInfo } from '../data/menu';

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-stone-200/70 dark:border-white/10 bg-stone-100/60 dark:bg-stone-900/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-500 text-white">
                <UtensilsCrossed size={18} />
              </span>
              <span className="font-serif text-xl font-bold">
                Menu<span className="text-brand-500">Flow</span>
              </span>
            </Link>
            <p className="mt-4 max-w-md text-sm text-stone-600 dark:text-stone-400">
              {restaurantInfo.description}
            </p>
            <div className="mt-5 flex gap-3">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <span
                  key={i}
                  className="grid h-9 w-9 place-items-center rounded-full bg-white ring-1 ring-stone-200 text-stone-600 hover:text-brand-500 hover:ring-brand-500 transition-colors dark:bg-white/5 dark:ring-white/10 dark:text-stone-300"
                >
                  <Icon size={16} />
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold tracking-wide uppercase text-stone-500 dark:text-stone-400">
              Explore
            </h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link to="/menu" className="hover:text-brand-500">Menu</Link></li>
              <li><Link to="/restaurant" className="hover:text-brand-500">About Us</Link></li>
              <li><Link to="/cart" className="hover:text-brand-500">Cart</Link></li>
              <li><Link to="/admin" className="hover:text-brand-500">Admin Panel</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold tracking-wide uppercase text-stone-500 dark:text-stone-400">
              Visit Us
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-stone-600 dark:text-stone-400">
              <li>{restaurantInfo.address}</li>
              <li>{restaurantInfo.phone}</li>
              <li>{restaurantInfo.email}</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-stone-200/70 dark:border-white/10 pt-6 text-xs text-stone-500 sm:flex-row">
          <p>© {new Date().getFullYear()} MenuFlow. Crafted with care.</p>
          <p>Powered by fresh ingredients & modern web.</p>
        </div>
      </div>
    </footer>
  );
}
