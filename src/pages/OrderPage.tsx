import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Hash, FileText, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../lib/utils';

export default function OrderPage() {
  const { items, total, orderInfo, setOrderInfo, clear } = useCart();
  const navigate = useNavigate();
  const [name, setName] = useState(orderInfo.customerName);
  const [table, setTable] = useState(orderInfo.tableNumber);
  const [notes, setNotes] = useState(orderInfo.notes || '');
  const [confirmed, setConfirmed] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; table?: string }>({});

  if (items.length === 0 && !confirmed) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <h1 className="font-serif text-3xl font-bold">No items to order</h1>
        <p className="mt-2 text-stone-500">Add dishes to your cart first.</p>
        <button onClick={() => navigate('/menu')} className="btn-primary mt-7">
          Browse Menu
        </button>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: typeof errors = {};
    if (!name.trim()) errs.name = 'Please enter your name';
    if (!table.trim()) errs.table = 'Please enter your table number';
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setOrderInfo({ customerName: name.trim(), tableNumber: table.trim(), notes: notes.trim() });
    setConfirmed(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (confirmed) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 sm:py-20">
        <div className="card p-8 text-center animate-scaleIn">
          <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-green-500/10 text-green-500">
            <CheckCircle2 size={40} />
          </span>
          <h1 className="mt-6 font-serif text-3xl font-bold">Order Confirmed!</h1>
          <p className="mt-2 text-stone-600 dark:text-stone-400">
            Thank you, <span className="font-semibold">{orderInfo.customerName}</span>. Your order for
            table <span className="font-semibold">#{orderInfo.tableNumber}</span> has been placed.
          </p>

          <div className="mt-6 rounded-2xl bg-stone-100 dark:bg-white/5 p-5 text-left">
            <h3 className="font-semibold mb-3">Order Summary</h3>
            <ul className="space-y-2 text-sm">
              {items.map(({ item, quantity }) => (
                <li key={item.id} className="flex justify-between">
                  <span>{quantity} × {item.name}</span>
                  <span className="font-medium">{formatPrice(item.price * quantity)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-3 pt-3 border-t border-stone-200 dark:border-white/10 flex justify-between font-semibold">
              <span>Total</span>
              <span className="text-brand-600 dark:text-brand-400">{formatPrice(total)}</span>
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={() => navigate('/payment')} className="btn-primary">
              Proceed to Payment <ArrowRight size={16} />
            </button>
            <button
              onClick={() => {
                clear();
                navigate('/menu');
              }}
              className="btn-ghost"
            >
              Back to Menu
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight">Order Details</h1>
      <p className="mt-1 text-stone-500">Just a few details to serve you better.</p>

      <form onSubmit={handleSubmit} className="mt-8 card p-6 sm:p-8 space-y-5">
        <div>
          <label className="block text-sm font-medium mb-1.5">Customer Name</label>
          <div className="relative">
            <User size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Aarav Sharma"
              className="input pl-10"
            />
          </div>
          {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">Table Number</label>
          <div className="relative">
            <Hash size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              value={table}
              onChange={(e) => setTable(e.target.value)}
              placeholder="e.g. 12"
              className="input pl-10"
            />
          </div>
          {errors.table && <p className="mt-1 text-xs text-red-500">{errors.table}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">Special Instructions (optional)</label>
          <div className="relative">
            <FileText size={18} className="absolute left-3.5 top-3.5 text-stone-400" />
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="Allergies, spice level, etc."
              className="input pl-10 pt-3 resize-none"
            />
          </div>
        </div>

        <div className="rounded-2xl bg-stone-100 dark:bg-white/5 p-4">
          <div className="flex justify-between text-sm">
            <span className="text-stone-500">Items in order</span>
            <span className="font-medium">{items.length}</span>
          </div>
          <div className="mt-2 flex justify-between">
            <span className="font-semibold">Total payable</span>
            <span className="font-bold text-brand-600 dark:text-brand-400">{formatPrice(total)}</span>
          </div>
        </div>

        <button type="submit" className="btn-primary w-full">
          Confirm Order <ArrowRight size={16} />
        </button>
      </form>
    </div>
  );
}
