import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import SiteShell from "@/components/chrome/SiteShell";
import Section from "@/components/page/Section";
import Reveal from "@/components/motion/Reveal";
import SafeLink from "@/components/ui/SafeLink";
import AddToCart from "@/components/shop/AddToCart";
import { getSiteSettings } from "@/lib/content";
import { findProduct, formatPrice, products } from "@/content/shop";

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const product = findProduct(slug);
  if (!product) return {};
  return { title: product.title, description: product.tagline };
}

export default async function ProductPage({ params }: Params) {
  const { slug } = await params;
  const product = findProduct(slug);
  if (!product) notFound();

  const settings = await getSiteSettings();
  const others = products.filter((p) => p.slug !== slug && p.inStock).slice(0, 3);

  return (
    <SiteShell settings={settings} headerTone="dark">
      {/* Product pages lead with the product, so they use a compact dark bar
          rather than the full hero the content pages carry. */}
      <div className="bg-ink-900 pb-10 pt-32 md:pb-14 md:pt-44">
        <div className="container-page">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[14px] text-ink-400">
              {[
                { label: "Home", href: "/" },
                { label: "Shop", href: "/shop" },
              ].map((c, i) => (
                <li key={c.href} className="flex items-center gap-2">
                  {i > 0 && <span aria-hidden="true">/</span>}
                  <SafeLink href={c.href} className="transition-colors hover:text-persimmon">
                    {c.label}
                  </SafeLink>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </div>

      <Section tone="paper" id="product">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="relative aspect-square overflow-hidden rounded-3xl bg-bone">
              <Image
                src={product.images[0].src}
                alt={product.images[0].alt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <Reveal>
            <span className="eyebrow text-persimmon">{product.category}</span>
            <h1
              className="mt-4 font-display font-black text-ink-900"
              style={{ fontSize: "var(--text-h2)" }}
            >
              {product.title}
            </h1>
            <p className="mt-2 text-lg text-ink-500">{product.tagline}</p>

            <p className="mt-6 font-display text-3xl font-black text-ink-900">
              {formatPrice(product.priceCents)}
            </p>

            <div className="mt-7 space-y-4 text-lg leading-relaxed text-ink-700">
              {product.description.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>

            <AddToCart product={product} />

            <ul className="mt-10 space-y-2.5 border-t border-ink-100 pt-6 text-[15px] text-ink-600">
              <li>Ships within the United States.</li>
              <li>Payments handled securely by Stripe.</li>
              <li>100% of proceeds support YWCA Central Virginia.</li>
            </ul>
          </Reveal>
        </div>
      </Section>

      {others.length > 0 && (
        <Section eyebrow="More from the shop" title="Also available" tone="bone" id="more">
          <Reveal stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((p) => (
              <SafeLink
                key={p.slug}
                href={`/shop/${p.slug}`}
                className="group flex flex-col overflow-hidden rounded-3xl border border-ink-200/70 bg-paper transition-transform duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1.5"
              >
                <div className="relative aspect-square overflow-hidden bg-bone">
                  <Image
                    src={p.images[0].src}
                    alt={p.images[0].alt}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-lg font-bold text-ink-900">{p.title}</h3>
                  <p className="mt-1 text-[15px] text-ink-500">{formatPrice(p.priceCents)}</p>
                </div>
              </SafeLink>
            ))}
          </Reveal>
        </Section>
      )}
    </SiteShell>
  );
}
