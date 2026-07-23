import { useMemo, useState } from 'react';
import { Plus, Pencil, Trash2, Search, LayoutDashboard, UtensilsCrossed, RotateCcw, Star, X } from 'lucide-react';
import { CATEGORIES, type Category, type MenuItem } from '../data/menu';
import { useMenu } from '../context/MenuContext';
import Modal from '../components/Modal';
import { formatPrice, classNames } from '../lib/utils';

const emptyForm: Omit<MenuItem, 'id'> = {
  name: '',
  description: '',
  price: 0,
  rating: 4.5,
  image: '',
  category: 'Starters',
  veg: false,
  popular: false,
};

export default function AdminPanel() {
  const { items, addItem, updateItem, deleteItem, resetMenu } = useMenu();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<'all' | Category>('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<MenuItem | null>(null);
  const [form, setForm] = useState<Omit<MenuItem, 'id'>>(emptyForm);

  const filtered = useMemo(() => {
    let list = items;
    if (filter !== 'all') list = list.filter((i) => i.category === filter);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((i) => i.name.toLowerCase().includes(q));
    }
    return list;
  }, [items, filter, query]);

  const stats = useMemo(() => {
    const total = items.length;
    const popular = items.filter((i) => i.popular).length;
    const avg = total ? items.reduce((s, i) => s + i.rating, 0) / total : 0;
    const byCat = CATEGORIES.map((c) => ({
      c,
      count: items.filter((i) => i.category === c).length,
    }));
    return { total, popular, avg, byCat };
  }, [items]);

  const openAdd = () => {
    setEditing(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (item: MenuItem) => {
    setEditing(item);
    const { id: _id, ...rest } = item;
    void _id;
    setForm(rest);
    setModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || form.price <= 0) return;
    if (editing) updateItem(editing.id, form);
    else addItem(form);
    setModalOpen(false);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-500">
            Admin Panel
          </p>
          <h1 className="mt-2 font-serif text-3xl sm:text-4xl font-bold tracking-tight">
            Dashboard
          </h1>
        </div>
        <div className="flex gap-2">
          <button onClick={resetMenu} className="btn-ghost" title="Reset to default menu">
            <RotateCcw size={16} /> Reset
          </button>
          <button onClick={openAdd} className="btn-primary">
            <Plus size={16} /> Add Item
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={UtensilsCrossed} label="Total Items" value={stats.total} />
        <StatCard icon={Star} label="Popular Items" value={stats.popular} />
        <StatCard icon={LayoutDashboard} label="Avg. Rating" value={stats.avg.toFixed(2)} />
        <div className="card p-5">
          <p className="text-xs uppercase tracking-wide text-stone-500">By Category</p>
          <div className="mt-3 space-y-2">
            {stats.byCat.map(({ c, count }) => (
              <div key={c} className="flex items-center justify-between text-sm">
                <span className="text-stone-600 dark:text-stone-400">{c}</span>
                <span className="font-semibold">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="mt-10 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[220px]">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search items..."
            className="input pl-10"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <FilterChip active={filter === 'all'} onClick={() => setFilter('all')}>All</FilterChip>
          {CATEGORIES.map((c) => (
            <FilterChip key={c} active={filter === c} onClick={() => setFilter(c)}>{c}</FilterChip>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="mt-6 card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-stone-100/70 dark:bg-white/5 text-left text-xs uppercase tracking-wide text-stone-500">
              <tr>
                <th className="px-4 py-3 font-semibold">Item</th>
                <th className="px-4 py-3 font-semibold">Category</th>
                <th className="px-4 py-3 font-semibold">Price</th>
                <th className="px-4 py-3 font-semibold">Rating</th>
                <th className="px-4 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200/70 dark:divide-white/10">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-stone-50 dark:hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={item.image} alt={item.name} className="h-11 w-11 rounded-lg object-cover" />
                      <div className="min-w-0">
                        <p className="font-medium truncate flex items-center gap-1.5">
                          {item.name}
                          {item.popular && <span className="chip bg-brand-500/10 text-brand-600 text-[10px]">Popular</span>}
                          {item.veg && <span className="h-2.5 w-2.5 rounded-full bg-green-500" />}
                        </p>
                        <p className="text-xs text-stone-500 truncate max-w-[260px]">{item.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-stone-600 dark:text-stone-400">{item.category}</td>
                  <td className="px-4 py-3 font-semibold">{formatPrice(item.price)}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1">
                      <Star size={14} className="fill-amber-400 text-amber-400" />
                      {item.rating.toFixed(1)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1">
                      <button
                        onClick={() => openEdit(item)}
                        className="grid h-9 w-9 place-items-center rounded-lg text-stone-500 hover:bg-brand-500/10 hover:text-brand-500"
                        aria-label="Edit"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => deleteItem(item.id)}
                        className="grid h-9 w-9 place-items-center rounded-lg text-stone-500 hover:bg-red-500/10 hover:text-red-500"
                        aria-label="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-12 text-center text-stone-500">No items found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? 'Edit Item' : 'Add New Item'}
        maxWidth="max-w-xl"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1.5">Name</label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="input"
              placeholder="Dish name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={2}
              className="input resize-none"
              placeholder="Short description"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Price (₹)</label>
              <input
                type="number"
                min={0}
                value={form.price}
                onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                className="input"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Rating</label>
              <input
                type="number"
                min={0}
                max={5}
                step={0.1}
                value={form.rating}
                onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
                className="input"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Image URL</label>
            <input
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              className="input"
              placeholder="https://..."
            />
            {form.image && (
              <img src={form.image} alt="" className="mt-2 h-24 w-24 rounded-lg object-cover" />
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Category</label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value as Category })}
              className="input"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 text-sm font-medium cursor-pointer">
              <input
                type="checkbox"
                checked={!!form.veg}
                onChange={(e) => setForm({ ...form, veg: e.target.checked })}
                className="h-4 w-4 rounded accent-green-500"
              />
              Vegetarian
            </label>
            <label className="flex items-center gap-2 text-sm font-medium cursor-pointer">
              <input
                type="checkbox"
                checked={!!form.popular}
                onChange={(e) => setForm({ ...form, popular: e.target.checked })}
                className="h-4 w-4 rounded accent-brand-500"
              />
              Mark as Popular
            </label>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="submit" className="btn-primary flex-1">
              {editing ? 'Save Changes' : 'Add Item'}
            </button>
            <button type="button" onClick={() => setModalOpen(false)} className="btn-ghost">
              <X size={16} /> Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

function StatCard({ icon: Icon, label, value }: { icon: typeof Plus; label: string; value: number | string }) {
  return (
    <div className="card p-5">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-wide text-stone-500">{label}</p>
        <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-500/10 text-brand-500">
          <Icon size={18} />
        </span>
      </div>
      <p className="mt-2 font-serif text-3xl font-bold">{value}</p>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={classNames(
        'shrink-0 rounded-full px-3.5 py-1.5 text-sm font-medium transition-all',
        active
          ? 'bg-brand-500 text-white'
          : 'bg-stone-100 text-stone-700 hover:bg-stone-200 dark:bg-white/5 dark:text-stone-300 dark:hover:bg-white/10',
      )}
    >
      {children}
    </button>
  );
}
