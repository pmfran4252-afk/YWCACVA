"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";

export type CartLine = {
  slug: string;
  title: string;
  variant?: string;
  quantity: number;
  /** Display only. The checkout route re-reads price server-side. */
  priceCents: number;
  image?: string;
};

const STORAGE_KEY = "ywca-cart";
const MAX_QTY = 20;

/* ---------------------------------------------------------------------------
   The cart lives in localStorage, which is an external store, so it is read
   through useSyncExternalStore rather than copied into state inside an effect.
   That keeps the server snapshot empty (no hydration mismatch), avoids the
   cascading render a setState-in-effect would cause, and means any component
   can read the cart without threading props through the tree.
   ------------------------------------------------------------------------ */

const EMPTY: CartLine[] = [];

let snapshot: CartLine[] = EMPTY;
let loaded = false;
const listeners = new Set<() => void>();

function readStorage(): CartLine[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as CartLine[]) : EMPTY;
  } catch {
    // Private mode, blocked storage, or a corrupted value: start empty rather
    // than take the page down.
    return EMPTY;
  }
}

function writeStorage(lines: CartLine[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  } catch {
    // Storage full or blocked. The cart still works for this session.
  }
}

function emit() {
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  // Keep other tabs in step.
  const onStorage = (e: StorageEvent) => {
    if (e.key !== STORAGE_KEY) return;
    snapshot = readStorage();
    emit();
  };
  window.addEventListener("storage", onStorage);

  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function getSnapshot(): CartLine[] {
  if (!loaded) {
    snapshot = readStorage();
    loaded = true;
  }
  return snapshot;
}

const getServerSnapshot = (): CartLine[] => EMPTY;

function update(next: CartLine[]) {
  snapshot = next;
  loaded = true;
  writeStorage(next);
  emit();
}

const sameLine = (a: CartLine, slug: string, variant?: string) =>
  a.slug === slug && (a.variant ?? "") === (variant ?? "");

/* ------------------------------------------------------------------------ */

type CartState = {
  lines: CartLine[];
  add: (line: CartLine) => void;
  remove: (slug: string, variant?: string) => void;
  setQuantity: (slug: string, variant: string | undefined, qty: number) => void;
  clear: () => void;
  count: number;
  subtotalCents: number;
  open: boolean;
  setOpen: (v: boolean) => void;
};

const CartContext = createContext<CartState | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const lines = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [open, setOpen] = useState(false);

  const add = useCallback((line: CartLine) => {
    const current = getSnapshot();
    const existing = current.find((l) => sameLine(l, line.slug, line.variant));

    update(
      existing
        ? current.map((l) =>
            sameLine(l, line.slug, line.variant)
              ? { ...l, quantity: Math.min(MAX_QTY, l.quantity + line.quantity) }
              : l,
          )
        : [...current, line],
    );
    setOpen(true);
  }, []);

  const remove = useCallback((slug: string, variant?: string) => {
    update(getSnapshot().filter((l) => !sameLine(l, slug, variant)));
  }, []);

  const setQuantity = useCallback(
    (slug: string, variant: string | undefined, qty: number) => {
      const current = getSnapshot();
      update(
        qty <= 0
          ? current.filter((l) => !sameLine(l, slug, variant))
          : current.map((l) =>
              sameLine(l, slug, variant)
                ? { ...l, quantity: Math.min(MAX_QTY, qty) }
                : l,
            ),
      );
    },
    [],
  );

  const clear = useCallback(() => update(EMPTY), []);

  const value = useMemo<CartState>(() => {
    const count = lines.reduce((n, l) => n + l.quantity, 0);
    const subtotalCents = lines.reduce((n, l) => n + l.priceCents * l.quantity, 0);
    return { lines, add, remove, setQuantity, clear, count, subtotalCents, open, setOpen };
  }, [lines, add, remove, setQuantity, clear, open]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
