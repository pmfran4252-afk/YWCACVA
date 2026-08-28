"use client";

import { useEffect } from "react";

import { useCart } from "./CartProvider";

/**
 * Empties the cart once Stripe returns the visitor to the success page.
 *
 * Stripe redirects here only after payment succeeds, so this is the right
 * moment to clear. It renders nothing.
 */
export default function ClearCartOnMount() {
  const { clear } = useCart();

  useEffect(() => {
    clear();
  }, [clear]);

  return null;
}
