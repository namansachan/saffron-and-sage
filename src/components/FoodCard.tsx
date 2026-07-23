import { Star, Plus, Check } from 'lucide-react';
import { useState } from 'react';
import type { MenuItem } from '../data/menu';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../lib/utils';

export default function FoodCard({ item }: { item: MenuItem }) {
  const { addItem, items } = useCart();
  const [added, setAdded] = useState(false);
  const inCart = items.some((c) => c.item.id === item.id);

  const handleAdd = () => {
    addItem(item);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
  <article className="card group overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        {item.popular && (
          <span className="absolute left-3 top-3 chip bg-brand-500 text-white shadow">
            Popular
          </span>
        )}
        {item.veg && (
          <span className="absolute right-3 top-3 grid h-7 w-7 place-items-center rounded-md bg-white/90 ring-1 ring-green-500">
            <span className="h-3 w-3 rounded-full bg-green-500" />
          </span>
        )}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur">
          <Star size={12} className="fill-amber-400 text-amber-400" />
          {item.rating.toFixed(1)}
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-serif text-lg font-semibold leading-tight">{item.name}</h3>
          <span className="whitespace-nowrap font-semibold text-brand-600 dark:text-brand-400">
            {formatPrice(item.price)}
          </span>
        </div>
        <p className="mt-1.5 text-sm text-stone-600 dark:text-stone-400 line-clamp-2">
          {item.description}
        </p>

        <button
          onClick={handleAdd}
          className={
            'mt-4 w-full rounded-full px-4 py-2.5 text-sm font-semibold transition-all active:scale-95 ' +
            (added || inCart
              ? 'bg-green-500 text-white'
              : 'bg-stone-900 text-white hover:bg-brand-500 dark:bg-white dark:text-stone-900 dark:hover:bg-brand-500 dark:hover:text-white')
          }
        >
          {added ? (
            <span className="inline-flex items-center gap-1.5"><Check size={16} /> Added</span>
          ) : (
            <span className="inline-flex items-center gap-1.5"><Plus size={16} /> Add to Cart</span>
          )}
        </button>
      </div>
    </article>
  );
}
