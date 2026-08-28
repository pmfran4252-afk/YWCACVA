/**
 * Shop catalog.
 *
 * Prices live here in CENTS and are the single source of truth. The checkout
 * route reads them server-side from this module and never trusts a price sent
 * by the browser, so a tampered request cannot buy a $30 shirt for a dollar.
 *
 * Mirrors the `product` Sanity schema, so switching to CMS-managed products
 * needs no component changes.
 */

export type ProductVariant = {
  /** Size or option label, e.g. "M". */
  label: string;
  /** Set when a variant costs more than the base price, e.g. 2XL. */
  priceCents?: number;
  inStock?: boolean;
};

export type Product = {
  title: string;
  slug: string;
  category: "Apparel" | "Ornaments" | "Bookmarks" | "Gifts";
  tagline: string;
  description: string[];
  priceCents: number;
  images: { src: string; alt: string }[];
  variants?: ProductVariant[];
  variantLabel?: string;
  featured?: boolean;
  inStock: boolean;
  order: number;
};

const SIZES: ProductVariant[] = [
  { label: "S" },
  { label: "M" },
  { label: "L" },
  { label: "XL" },
  { label: "2XL", priceCents: 2800 },
];

export const products: Product[] = [
  {
    title: "Breaking Barriers Tee",
    slug: "breaking-barriers-tee",
    category: "Apparel",
    tagline: "Unisex fit, heather persimmon",
    description: [
      "Our Breaking Barriers design on a soft heather tee. The wall comes down; what is on the other side is the point.",
      "Every purchase supports crisis response, shelter, and advocacy across Lynchburg and seven surrounding counties.",
    ],
    priceCents: 2500,
    images: [
      {
        src: "/img/shop/breaking-barriers-tee.jpg",
        alt: "Heather orange unisex t-shirt printed with the Breaking Barriers design",
      },
    ],
    variantLabel: "Size",
    variants: SIZES,
    featured: true,
    inStock: true,
    order: 1,
  },
  {
    title: "Breaking Barriers Fitted Tee",
    slug: "breaking-barriers-fitted-tee",
    category: "Apparel",
    tagline: "Fitted cut, persimmon",
    description: [
      "The Breaking Barriers artwork on a fitted tee in YWCA persimmon, with the Central Virginia wordmark beneath.",
      "Every purchase supports crisis response, shelter, and advocacy across the region.",
    ],
    priceCents: 2500,
    images: [
      {
        src: "/img/shop/breaking-barriers-fitted.jpg",
        alt: "Orange fitted t-shirt printed with the Breaking Barriers design and YWCA Central Virginia wordmark",
      },
    ],
    variantLabel: "Size",
    variants: SIZES,
    featured: true,
    inStock: true,
    order: 2,
  },
];

export const findProduct = (slug: string) =>
  products.find((p) => p.slug === slug);

/** Server-side price resolution. Never derive a price from request input. */
export function resolvePriceCents(slug: string, variantLabel?: string): number | null {
  const product = findProduct(slug);
  if (!product || !product.inStock) return null;

  if (!variantLabel) return product.priceCents;

  const variant = product.variants?.find((v) => v.label === variantLabel);
  if (!variant || variant.inStock === false) return null;

  return variant.priceCents ?? product.priceCents;
}

export const formatPrice = (cents: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    cents / 100,
  );
