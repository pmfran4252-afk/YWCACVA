import type { Metadata } from "next";
import Image from "next/image";

import SiteShell from "@/components/chrome/SiteShell";
import PageHero from "@/components/page/PageHero";
import Section from "@/components/page/Section";
import Reveal from "@/components/motion/Reveal";
import SafeLink from "@/components/ui/SafeLink";
import { getSiteSettings } from "@/lib/content";
import { formatPrice, products } from "@/content/shop";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Breaking Barriers apparel and YWCA Central Virginia merchandise. Every purchase supports crisis response, shelter, and advocacy.",
};

export default async function ShopPage() {
  const settings = await getSiteSettings();
  const inStock = products.filter((p) => p.inStock).sort((a, b) => a.order - b.order);

  return (
    <SiteShell settings={settings} headerTone="dark">
      <PageHero
        eyebrow="Shop"
        title="Wear it. Fund it."
        lead="Breaking Barriers apparel and YWCA merchandise. Every purchase goes straight back into crisis response, shelter, and advocacy across Central Virginia."
        crumbs={[{ label: "Home", href: "/" }]}
        glyph="gift"
      />

      <Section tone="paper" id="products">
        <Reveal stagger staggerAmount={0.08} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {inStock.map((p) => (
            <SafeLink
              key={p.slug}
              href={`/shop/${p.slug}`}
              className="group flex flex-col overflow-hidden rounded-3xl border border-ink-200/70 bg-paper transition-[transform,box-shadow,border-color] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1.5 hover:border-transparent hover:shadow-[var(--shadow-lift)]"
            >
              <div className="relative aspect-square overflow-hidden bg-bone">
                <Image
                  src={p.images[0].src}
                  alt={p.images[0].alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
                />
              </div>

              <div className="flex flex-1 flex-col p-6">
                <span className="eyebrow text-persimmon">{p.category}</span>
                <h2 className="mt-3 font-display text-xl font-bold text-ink-900 transition-colors duration-300 group-hover:text-persimmon">
                  {p.title}
                </h2>
                <p className="mt-1.5 flex-1 text-[15px] text-ink-500">{p.tagline}</p>
                <p className="mt-5 font-display text-lg font-black text-ink-900">
                  {formatPrice(p.priceCents)}
                </p>
              </div>
            </SafeLink>
          ))}
        </Reveal>

        <Reveal className="mt-14">
          <p className="max-w-[62ch] rounded-2xl bg-bone px-6 py-5 text-[15px] leading-relaxed text-ink-600">
            More is on the way, including ornaments, bookmarks, and gifts. If
            you are looking for something specific or want to order in bulk for
            an event,{" "}
            <SafeLink
              href="/contact/general"
              className="font-semibold text-ink-900 underline decoration-persimmon decoration-2 underline-offset-4"
            >
              get in touch
            </SafeLink>
            .
          </p>
        </Reveal>
      </Section>
    </SiteShell>
  );
}
