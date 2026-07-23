import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import type { ReactNode } from 'react';

export default function Modal({
  open,
  onClose,
  title,
  children,
  maxWidth = 'max-w-lg',
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  maxWidth?: string;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fadeIn"
        onClick={onClose}
      />
      <div
        className={`relative w-full ${maxWidth} animate-scaleIn rounded-t-3xl sm:rounded-2xl bg-white dark:bg-stone-900 shadow-2xl ring-1 ring-stone-200 dark:ring-white/10 max-h-[92vh] overflow-y-auto`}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-stone-200/70 dark:border-white/10 bg-white/90 dark:bg-stone-900/90 backdrop-blur px-5 py-4">
          <h3 className="font-serif text-lg font-semibold">{title}</h3>
          <button
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-full text-stone-500 hover:bg-stone-100 dark:hover:bg-white/10"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>,
    document.body,
  );
}
