import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QrCode, Smartphone, ShieldCheck, CheckCircle2, Loader2, Copy } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { restaurantInfo } from '../data/menu';
import { formatPrice } from '../lib/utils';

type Method = 'upi' | 'qr';

export default function PaymentPage() {
  const { total, orderInfo, clear } = useCart();
  const navigate = useNavigate();
  const [method, setMethod] = useState<Method>('upi');
  const [status, setStatus] = useState<'idle' | 'processing' | 'success'>('idle');
  const [copied, setCopied] = useState(false);

  const upiId = 'saffronandsage@upi';
  const upiLink = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(restaurantInfo.name)}&am=${(total / 100).toFixed(2)}&cu=INR`;

  if (total === 0 && status !== 'success') {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <h1 className="font-serif text-3xl font-bold">Nothing to pay for</h1>
        <p className="mt-2 text-stone-500">Your cart is empty.</p>
        <button onClick={() => navigate('/menu')} className="btn-primary mt-7">Browse Menu</button>
      </div>
    );
  }

  const handlePay = () => {
    setStatus('processing');
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => {
        clear();
      }, 400);
    }, 2200);
  };

  const copyUpi = () => {
    navigator.clipboard?.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  if (status === 'success') {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 sm:py-24 text-center">
        <div className="card p-10 animate-scaleIn">
          <span className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-green-500/10 text-green-500">
            <CheckCircle2 size={48} />
          </span>
          <h1 className="mt-6 font-serif text-3xl font-bold">Payment Successful</h1>
          <p className="mt-2 text-stone-600 dark:text-stone-400">
            Your payment of <span className="font-semibold">{formatPrice(total)}</span> was received.
          </p>
          <p className="mt-1 text-sm text-stone-500">
            Order for {orderInfo.customerName || 'Guest'} · Table #{orderInfo.tableNumber || '—'}
          </p>
          <div className="mt-6 rounded-2xl bg-stone-100 dark:bg-white/5 p-5 text-left text-sm">
            <p className="font-medium">What happens next?</p>
            <ul className="mt-2 space-y-1.5 text-stone-600 dark:text-stone-400 list-disc list-inside">
              <li>Your order is now being prepared by our kitchen.</li>
              <li>Estimated serving time: 15–20 minutes.</li>
              <li>A server will bring your meal to your table.</li>
            </ul>
          </div>
          <button onClick={() => navigate('/')} className="btn-primary mt-7">
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight">Payment</h1>
      <p className="mt-1 text-stone-500">Choose a payment method to complete your order.</p>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">
        {/* Methods */}
        <div className="space-y-4">
          <button
            onClick={() => setMethod('upi')}
            className={`w-full card p-5 flex items-center gap-4 text-left transition-all ${
              method === 'upi' ? 'ring-2 ring-brand-500' : 'hover:ring-1 hover:ring-brand-300'
            }`}
          >
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-500/10 text-brand-500">
              <Smartphone size={22} />
            </span>
            <div className="flex-1">
              <h3 className="font-semibold">UPI Payment</h3>
              <p className="text-sm text-stone-500">Pay instantly via any UPI app.</p>
            </div>
            <span className={`h-5 w-5 rounded-full border-2 ${method === 'upi' ? 'border-brand-500 bg-brand-500' : 'border-stone-300'}`} />
          </button>

          <button
            onClick={() => setMethod('qr')}
            className={`w-full card p-5 flex items-center gap-4 text-left transition-all ${
              method === 'qr' ? 'ring-2 ring-brand-500' : 'hover:ring-1 hover:ring-brand-300'
            }`}
          >
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-500/10 text-brand-500">
              <QrCode size={22} />
            </span>
            <div className="flex-1">
              <h3 className="font-semibold">Scan QR Code</h3>
              <p className="text-sm text-stone-500">Scan with your camera or UPI app.</p>
            </div>
            <span className={`h-5 w-5 rounded-full border-2 ${method === 'qr' ? 'border-brand-500 bg-brand-500' : 'border-stone-300'}`} />
          </button>

          {method === 'upi' && (
            <div className="card p-5 animate-fadeIn">
              <h3 className="font-semibold">Pay using UPI ID</h3>
              <div className="mt-3 flex items-center gap-2 rounded-xl bg-stone-100 dark:bg-white/5 p-3">
                <code className="flex-1 font-mono text-sm">{upiId}</code>
                <button onClick={copyUpi} className="grid h-8 w-8 place-items-center rounded-lg hover:bg-stone-200 dark:hover:bg-white/10 text-stone-500" aria-label="Copy">
                  {copied ? <CheckCircle2 size={16} className="text-green-500" /> : <Copy size={16} />}
                </button>
              </div>
              <a href={upiLink} className="btn-primary mt-4 w-full">
                Open UPI App
              </a>
            </div>
          )}

          {method === 'qr' && (
            <div className="card p-6 flex flex-col items-center animate-fadeIn">
              <div className="relative grid h-56 w-56 place-items-center rounded-2xl bg-white p-4 ring-1 ring-stone-200">
                <QRPlaceholder />
                <span className="absolute inset-0 grid place-items-center pointer-events-none">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-500 text-white font-serif font-bold text-lg shadow-lg">
                    S&S
                  </span>
                </span>
              </div>
              <p className="mt-4 text-sm text-stone-500">Scan with any UPI-enabled app to pay {formatPrice(total)}</p>
            </div>
          )}
        </div>

        {/* Summary */}
        <aside className="card p-6 h-fit lg:sticky lg:top-20">
          <h2 className="font-serif text-xl font-semibold">Payment Summary</h2>
          <dl className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-stone-500">Customer</dt>
              <dd className="font-medium">{orderInfo.customerName || '—'}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-stone-500">Table</dt>
              <dd className="font-medium">#{orderInfo.tableNumber || '—'}</dd>
            </div>
            <div className="flex justify-between border-t border-stone-200/70 dark:border-white/10 pt-3 text-base">
              <dt className="font-semibold">Total</dt>
              <dd className="font-bold text-brand-600 dark:text-brand-400">{formatPrice(total)}</dd>
            </div>
          </dl>
          <button
            onClick={handlePay}
            disabled={status === 'processing'}
            className="btn-primary mt-6 w-full"
          >
            {status === 'processing' ? (
              <><Loader2 size={16} className="animate-spin" /> Processing...</>
            ) : (
              <><ShieldCheck size={16} /> Pay {formatPrice(total)}</>
            )}
          </button>
          <p className="mt-3 text-center text-xs text-stone-400">
            Secured payment · Powered by MenuFlow
          </p>
        </aside>
      </div>
    </div>
  );
}

// Lightweight decorative QR placeholder (no external deps)
function QRPlaceholder() {
  const cells = Array.from({ length: 144 }, (_, i) => {
    const row = Math.floor(i / 12);
    const col = i % 12;
    // corners
    const isCorner =
      (row < 3 && col < 3) || (row < 3 && col > 8) || (row > 8 && col < 3);
    const cornerOn =
      (row === 0 || row === 2 || col === 0 || col === 2 || (row === 1 && col === 1)) ||
      (row === 0 || row === 2 || col === 9 || col === 11 || (row === 1 && col === 10)) ||
      (row === 8 || row === 10 || col === 0 || col === 2 || (row === 9 && col === 1));
    if (isCorner) return cornerOn;
    return (i * 7) % 3 === 0;
  });
  return (
    <div className="grid grid-cols-12 gap-0.5 h-full w-full">
      {cells.map((on, i) => (
        <div key={i} className={`aspect-square rounded-[1px] ${on ? 'bg-stone-900' : 'bg-transparent'}`} />
      ))}
    </div>
  );
}
