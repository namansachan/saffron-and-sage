import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { CartItem, MenuItem, OrderInfo } from '../data/menu';

interface CartContextValue {
  items: CartItem[];
  orderInfo: OrderInfo;
  count: number;
  subtotal: number;
  tax: number;
  serviceCharge: number;
  total: number;
  addItem: (item: MenuItem) => void;
  removeItem: (id: string) => void;
  decrease: (id: string) => void;
  setQuantity: (id: string, qty: number) => void;
  clear: () => void;
  setOrderInfo: (info: OrderInfo) => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

const STORAGE_KEY = 'menuflow:cart';
const ORDER_KEY = 'menuflow:order';

const TAX_RATE = 0.05;
const SERVICE_RATE = 0.02;

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw) as CartItem[];
    } catch {
      // ignore
    }
    return [];
  });

  const [orderInfo, setOrderInfoState] = useState<OrderInfo>(() => {
    try {
      const raw = localStorage.getItem(ORDER_KEY);
      if (raw) return JSON.parse(raw) as OrderInfo;
    } catch {
      // ignore
    }
    return { customerName: '', tableNumber: '', notes: '' };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem(ORDER_KEY, JSON.stringify(orderInfo));
  }, [orderInfo]);

  const addItem = useCallback((item: MenuItem) => {
    setItems((prev) => {
      const existing = prev.find((c) => c.item.id === item.id);
      if (existing) {
        return prev.map((c) =>
          c.item.id === item.id ? { ...c, quantity: c.quantity + 1 } : c,
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
  }, []);

  const decrease = useCallback((id: string) => {
    setItems((prev) =>
      prev
        .map((c) => (c.item.id === id ? { ...c, quantity: c.quantity - 1 } : c))
        .filter((c) => c.quantity > 0),
    );
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((c) => c.item.id !== id));
  }, []);

  const setQuantity = useCallback((id: string, qty: number) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((c) => c.item.id !== id)
        : prev.map((c) => (c.item.id === id ? { ...c, quantity: qty } : c)),
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const setOrderInfo = useCallback((info: OrderInfo) => setOrderInfoState(info), []);

  const count = useMemo(() => items.reduce((s, c) => s + c.quantity, 0), [items]);
  const subtotal = useMemo(
    () => items.reduce((s, c) => s + c.item.price * c.quantity, 0),
    [items],
  );
  const tax = useMemo(() => Math.round(subtotal * TAX_RATE), [subtotal]);
  const serviceCharge = useMemo(() => Math.round(subtotal * SERVICE_RATE), [subtotal]);
  const total = subtotal + tax + serviceCharge;

  const value: CartContextValue = {
    items,
    orderInfo,
    count,
    subtotal,
    tax,
    serviceCharge,
    total,
    addItem,
    removeItem,
    decrease,
    setQuantity,
    clear,
    setOrderInfo,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
