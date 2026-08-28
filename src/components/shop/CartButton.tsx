"use client";

import { useCart } from "./CartProvider";

/** Floating cart control. Only appears once something is in the cart. */
export default function CartButton() {
  const { count, setOpen } = useCart();

  if (count === 0) return null;

  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      aria-label={`Open cart, ${count} item${count === 1 ? "" : "s"}`}
      className="fixed bottom-24 right-4 z-95 flex h-12 items-center gap-2.5 rounded-full bg-persimmon px-5 font-bold text-white shadow-[var(--shadow-lift)] transition-colors hover:bg-persimmon-600 md:bottom-24 md:right-8 md:h-14"
    >
      <svg viewBox="0 0 24 24" fill="none" className="size-5" aria-hidden="true">
        <path
          d="M4 6h2l2.2 9.4A2 2 0 0 0 10.1 17h6.6a2 2 0 0 0 2-1.5L20.5 9H6.4"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="10.5" cy="20" r="1.3" fill="currentColor" />
        <circle cx="17" cy="20" r="1.3" fill="currentColor" />
      </svg>
      <span className="tabular-nums">{count}</span>
    </button>
  );
}
