import { useMemo, useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { CATEGORIES, type Category } from '../data/menu';
import { useMenu } from '../context/MenuContext';
import FoodCard from '../components/FoodCard';
import { classNames } from '../lib/utils';

type Filter = 'all' | Category | 'popular' | 'veg';

const filters: { key: Filter; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'Starters', label: 'Starters' },
  { key: 'Main Course', label: 'Main Course' },
  { key: 'Fast Food', label: 'Fast Food' },
  { key: 'Drinks', label: 'Drinks' },
  { key: 'Desserts', label: 'Desserts' },
  { key: 'popular', label: 'Popular' },
  { key: 'veg', label: 'Veg' },
];

export default function MenuPage() {
  const { items } = useMenu();
  const [active, setActive] = useState<Filter>('all');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    let list = items;
    if (active === 'popular') list = list.filter((i) => i.popular);
    else if (active === 'veg') list = list.filter((i) => i.veg);
    else if (active !== 'all') list = list.filter((i) => i.category === active);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (i) =>
          i.name.toLowerCase().includes(q) || i.description.toLowerCase().includes(q),
      );
    }
    return list;
  }, [items, active, query]);

  const grouped = useMemo(() => {
    if (active !== 'all' && active !== 'popular' && active !== 'veg') return null;
    const map: Record<string, typeof items> = {};
    for (const it of filtered) {
      (map[it.category] ||= []).push(it);
    }
    return map;
  }, [filtered, active]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <div className="flex flex-col gap-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-500">
            Digital Menu
          </p>
          <h1 className="mt-2 font-serif text-3xl sm:text-4xl font-bold tracking-tight">
            Explore our dishes
          </h1>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search dishes..."
            className="input pl-10"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 -mx-1 px-1">
          <SlidersHorizontal size={16} className="shrink-0 text-stone-400" />
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActive(f.key)}
              className={classNames(
                'shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-all',
                active === f.key
                  ? 'bg-brand-500 text-white shadow-md shadow-brand-500/30'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200 dark:bg-white/5 dark:text-stone-300 dark:hover:bg-white/10',
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="mt-20 text-center">
          <p className="font-serif text-2xl font-semibold">No dishes found</p>
          <p className="mt-2 text-stone-500">Try a different search or filter.</p>
        </div>
      ) : grouped ? (
        <div className="mt-10 space-y-14">
          {CATEGORIES.filter((c) => grouped[c]?.length).map((cat) => (
            <section key={cat}>
              <div className="mb-5 flex items-baseline justify-between">
                <h2 className="font-serif text-2xl font-semibold">{cat}</h2>
                <span className="text-sm text-stone-500">{grouped[cat].length} items</span>
              </div>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 stagger">
                {grouped[cat].map((it) => (
                  <FoodCard key={it.id} item={it} />
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 stagger">
          {filtered.map((it) => (
            <FoodCard key={it.id} item={it} />
          ))}
        </div>
      )}
    </div>
  );
}
