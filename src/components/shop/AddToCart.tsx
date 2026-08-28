"use client";

import { useState } from "react";

import { formatPrice, type Product } from "@/content/shop";
import { useCart } from "./CartProvider";

export default function AddToCart({ product }: { product: Product }) {
  const { add } = useCart();
  const [variant, setVariant] = useState(product.variants?.[0]?.label);

  const selected = product.variants?.find((v) => v.label === variant);
  const priceCents = selected?.priceCents ?? product.priceCents;

  return (
    <div>
      {product.variants && product.variants.length > 0 && (
        <fieldset className="mt-8">
          <legend className="text-[15px] font-semibold text-ink-900">
            {product.variantLabel ?? "Options"}
          </legend>
          <div className="mt-3 flex flex-wrap gap-2.5">
            {product.variants.map((v) => {
              const active = v.label === variant;
              const out = v.inStock === false;
              return (
                <button
                  key={v.label}
                  type="button"
                  disabled={out}
                  onClick={() => setVariant(v.label)}
                  aria-pressed={active}
                  className={`h-12 min-w-14 rounded-xl border px-4 font-semibold transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-35 ${
                    active
                      ? "border-persimmon bg-persimmon text-white"
                      : "border-ink-200 text-ink-900 hover:border-persimmon"
                  }`}
                >
                  {v.label}
                </button>
              );
            })}
          </div>
          {selected?.priceCents && selected.priceCents !== product.priceCents && (
            <p className="mt-3 text-[14px] text-ink-500">
              {selected.label} is {formatPrice(selected.priceCents)}.
            </p>
          )}
        </fieldset>
      )}

      <button
        type="button"
        disabled={!product.inStock}
        onClick={() =>
          add({
            slug: product.slug,
            title: product.title,
            variant,
            quantity: 1,
            priceCents,
            image: product.images[0]?.src,
          })
        }
        className="mt-8 flex h-14 w-full items-center justify-center rounded-full bg-persimmon px-8 font-bold text-white transition-colors hover:bg-persimmon-600 disabled:opacity-50 sm:w-auto"
      >
        {product.inStock
          ? `Add to cart · ${formatPrice(priceCents)}`
          : "Sold out"}
      </button>
    </div>
  );
}
