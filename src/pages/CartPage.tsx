import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../lib/utils';

export default function CartPage() {
  const { items, subtotal, tax, serviceCharge, total, addItem, decrease, removeItem, count } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-stone-100 dark:bg-white/5 text-brand-500">
          <ShoppingBag size={32} />
        </span>
        <h1 className="mt-6 font-serif text-3xl font-bold">Your cart is empty</h1>
        <p className="mt-2 text-stone-500">Add some delicious dishes to get started.</p>
        <Link to="/menu" className="btn-primary mt-7">
          Browse Menu <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight">Your Cart</h1>
      <p className="mt-1 text-stone-500">{count} item{count > 1 ? 's' : ''} in your cart</p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
        {/* Items */}
        <div className="space-y-3">
          {items.map(({ item, quantity }) => (
            <div key={item.id} className="card p-3 sm:p-4 flex gap-4 items-center animate-fadeIn">
              <img
                src={item.image}
                alt={item.name}
                className="h-20 w-20 rounded-xl object-cover shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="font-serif text-base font-semibold truncate">{item.name}</h3>
                    <p className="text-xs text-stone-500 truncate">{item.category}</p>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="grid h-8 w-8 place-items-center rounded-full text-stone-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10"
                    aria-label="Remove"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="mt-2 flex items-center justify-between gap-2">
                  <div className="inline-flex items-center rounded-full bg-stone-100 dark:bg-white/5 ring-1 ring-stone-200 dark:ring-white/10">
                    <button
                      onClick={() => decrease(item.id)}
                      className="grid h-8 w-8 place-items-center rounded-full hover:bg-stone-200 dark:hover:bg-white/10"
                      aria-label="Decrease"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-8 text-center text-sm font-semibold">{quantity}</span>
                    <button
                      onClick={() => addItem(item)}
                      className="grid h-8 w-8 place-items-center rounded-full hover:bg-stone-200 dark:hover:bg-white/10"
                      aria-label="Increase"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <span className="font-semibold text-brand-600 dark:text-brand-400">
                    {formatPrice(item.price * quantity)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <aside className="card p-6 h-fit lg:sticky lg:top-20">
          <h2 className="font-serif text-xl font-semibold">Order Summary</h2>
          <dl className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-stone-500">Subtotal</dt>
              <dd className="font-medium">{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-stone-500">Taxes (5%)</dt>
              <dd className="font-medium">{formatPrice(tax)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-stone-500">Service charge (2%)</dt>
              <dd className="font-medium">{formatPrice(serviceCharge)}</dd>
            </div>
            <div className="border-t border-stone-200/70 dark:border-white/10 pt-3 flex justify-between text-base">
              <dt className="font-semibold">Total</dt>
              <dd className="font-bold text-brand-600 dark:text-brand-400">{formatPrice(total)}</dd>
            </div>
          </dl>
          <button onClick={() => navigate('/order')} className="btn-primary mt-6 w-full">
            Proceed to Order <ArrowRight size={16} />
          </button>
          <Link to="/menu" className="btn-ghost mt-3 w-full">Continue Shopping</Link>
        </aside>
      </div>
    </div>
  );
}
