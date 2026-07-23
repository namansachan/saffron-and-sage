import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { defaultMenu, type MenuItem } from '../data/menu';

interface MenuContextValue {
  items: MenuItem[];
  addItem: (item: Omit<MenuItem, 'id'>) => void;
  updateItem: (id: string, patch: Partial<MenuItem>) => void;
  deleteItem: (id: string) => void;
  resetMenu: () => void;
  getItem: (id: string) => MenuItem | undefined;
}

const MenuContext = createContext<MenuContextValue | undefined>(undefined);

const STORAGE_KEY = 'menuflow:menu';

function loadMenu(): MenuItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as MenuItem[];
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {
    // ignore
  }
  return defaultMenu;
}

function uid() {
  return 'it-' + Math.random().toString(36).slice(2, 9);
}

export function MenuProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<MenuItem[]>(loadMenu);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = useCallback((item: Omit<MenuItem, 'id'>) => {
    setItems((prev) => [{ ...item, id: uid() }, ...prev]);
  }, []);

  const updateItem = useCallback((id: string, patch: Partial<MenuItem>) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, ...patch } : i)));
  }, []);

  const deleteItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const resetMenu = useCallback(() => setItems(defaultMenu), []);

  const getItem = useCallback((id: string) => items.find((i) => i.id === id), [items]);

  const value = useMemo(
    () => ({ items, addItem, updateItem, deleteItem, resetMenu, getItem }),
    [items, addItem, updateItem, deleteItem, resetMenu, getItem],
  );

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
}

export function useMenu() {
  const ctx = useContext(MenuContext);
  if (!ctx) throw new Error('useMenu must be used within MenuProvider');
  return ctx;
}
