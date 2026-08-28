"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import SafeLink from "@/components/ui/SafeLink";
import { formatPrice } from "@/content/shop";
import { gsap, useGSAP } from "@/lib/gsap";
import { useCart } from "./CartProvider";

/**
 * Slide-over cart. Sits outside the smooth-scroll wrapper via the layout, so
 * its fixed positioning is not broken by a transformed ancestor.
 */
export default function CartDrawer() {
  const { lines, open, setOpen, setQuantity, remove, subtotalCents, count } = useCart();
  const panel = useRef<HTMLDivElement>(null);
  const scrim = useRef<HTMLDivElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      // Single Escape closes the cart; the double-Escape site exit still works.
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  useGSAP(
    () => {
      gsap.to(scrim.current, { autoAlpha: open ? 1 : 0, duration: 0.3 });
      gsap.to(panel.current, {
        xPercent: open ? 0 : 100,
        duration: 0.45,
        ease: "power3.out",
      });
    },
    { dependencies: [open] },
  );

  async function checkout() {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lines: lines.map((l) => ({
            slug: l.slug,
            variant: l.variant,
            quantity: l.quantity,
          })),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Checkout failed.");
      window.location.href = data.url;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Checkout failed.");
      setBusy(false);
    }
  }

  return (
    <>
      <div
        ref={scrim}
        onClick={() => setOpen(false)}
        aria-hidden="true"
        className="invisible fixed inset-0 z-100 bg-ink-900/60 opacity-0 backdrop-blur-sm"
      />

      <aside
        ref={panel}
        aria-label="Cart"
        aria-hidden={!open}
        className="fixed inset-y-0 right-0 z-100 flex w-full max-w-md translate-x-full flex-col bg-paper shadow-[var(--shadow-lift)]"
      >
        <header className="flex items-center justify-between border-b border-ink-100 px-6 py-5">
          <h2 className="font-display text-xl font-black text-ink-900">
            Your cart{count > 0 ? ` (${count})` : ""}
          </h2>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close cart"
            className="grid size-10 place-items-center rounded-full text-ink-900 transition-colors hover:bg-ink-050"
          >
            <svg viewBox="0 0 24 24" fill="none" className="size-5" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {lines.length === 0 ? (
            <p className="py-10 text-center text-ink-500">
              Nothing here yet.{" "}
              <SafeLink
                href="/shop"
                onClick={() => setOpen(false)}
                className="font-semibold text-ink-900 underline decoration-persimmon decoration-2 underline-offset-4"
              >
                Browse the shop
              </SafeLink>
              .
            </p>
          ) : (
            <ul className="space-y-5">
              {lines.map((l) => (
                <li key={`${l.slug}-${l.variant ?? ""}`} className="flex gap-4">
                  {l.image && (
                    <div className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-bone">
                      <Image src={l.image} alt="" fill sizes="80px" className="object-cover" />
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="font-display font-bold text-ink-900">{l.title}</p>
                    {l.variant && (
                      <p className="text-[14px] text-ink-500">Size {l.variant}</p>
                    )}
                    <p className="mt-1 text-[15px] font-semibold text-ink-900">
                      {formatPrice(l.priceCents)}
                    </p>

                    <div className="mt-2.5 flex items-center gap-3">
                      <div className="flex items-center rounded-full border border-ink-200">
                        {[-1, 1].map((delta) => (
                          <button
                            key={delta}
                            type="button"
                            onClick={() => setQuantity(l.slug, l.variant, l.quantity + delta)}
                            aria-label={delta < 0 ? "Decrease quantity" : "Increase quantity"}
                            className="grid size-8 place-items-center text-ink-700 transition-colors hover:text-persimmon"
                          >
                            {delta < 0 ? "-" : "+"}
                          </button>
                        ))}
                        <span className="sr-only">Quantity</span>
                      </div>
                      <span className="text-[15px] tabular-nums text-ink-700">
                        {l.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => remove(l.slug, l.variant)}
                        className="ml-auto text-[14px] text-ink-500 underline underline-offset-4 transition-colors hover:text-persimmon"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {lines.length > 0 && (
          <footer className="border-t border-ink-100 px-6 py-5">
            <div className="flex items-baseline justify-between">
              <span className="text-[15px] text-ink-600">Subtotal</span>
              <span className="font-display text-xl font-black text-ink-900">
                {formatPrice(subtotalCents)}
              </span>
            </div>
            <p className="mt-1 text-[13px] text-ink-500">
              Shipping calculated at checkout. 100% of proceeds support YWCA
              Central Virginia.
            </p>

            {error && (
              <p role="alert" className="mt-4 rounded-xl bg-persimmon-050 px-4 py-3 text-[14px] leading-relaxed text-persimmon-700">
                {error}
              </p>
            )}

            <button
              type="button"
              onClick={checkout}
              disabled={busy}
              className="mt-4 flex h-14 w-full items-center justify-center rounded-full bg-persimmon font-bold text-white transition-colors hover:bg-persimmon-600 disabled:opacity-60"
            >
              {busy ? "Starting checkout..." : "Checkout"}
            </button>
            <p className="mt-3 text-center text-[13px] text-ink-500">
              Payments handled securely by Stripe.
            </p>
          </footer>
        )}
      </aside>
    </>
  );
}
