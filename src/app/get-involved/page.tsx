import type { Metadata } from "next";

import SiteShell from "@/components/chrome/SiteShell";
import PageHero from "@/components/page/PageHero";
import Section from "@/components/page/Section";
import LinkCards from "@/components/page/LinkCards";
import Reveal from "@/components/motion/Reveal";
import Counter from "@/components/motion/Counter";
import { getImpactStats, getSiteSettings } from "@/lib/content";
import { wishlist } from "@/content/pages";

export const metadata: Metadata = {
  title: "Get Involved",
  description:
    "Donate, volunteer, or partner with YWCA Central Virginia to support survivors across Lynchburg and seven surrounding counties.",
};

export default async function GetInvolvedPage() {
  const [settings, stats] = await Promise.all([getSiteSettings(), getImpactStats()]);

  return (
    <SiteShell settings={settings} headerTone="dark">
      <PageHero
        eyebrow="Get involved"
        title="This work runs on people who decided to do something."
        lead="Every shelter night, every court accompaniment, every hotline call answered at three in the morning is funded and staffed by this community."
        crumbs={[{ label: "Home", href: "/" }]}
        primaryCta={{ label: "Donate", href: "/get-involved/donate" }}
        secondaryCta={{ label: "Volunteer", href: "/get-involved/volunteer" }}
        glyph="handshake"
      />

      <Section
        eyebrow="Ways to help"
        title="Choose how you show up"
        tone="paper"
        id="ways"
        figure="community-meal"
        figureSide="right"
      >
        <LinkCards
          columns={4}
          cards={[
            {
              title: "Donate",
              description: "One-off or monthly. Every dollar stays in Central Virginia.",
              href: "/get-involved/donate",
              icon: "heart",
            },
            {
              title: "Volunteer",
              description: "Hospital advocacy, shelter support, the bridal boutique, and events.",
              href: "/get-involved/volunteer",
              icon: "handshake",
            },
            {
              title: "Give items",
              description: "Food, hygiene, bedding, and clothing for our shelters and residents.",
              href: "#wishlist",
              icon: "gift",
            },
            {
              title: "Partner with us",
              description: "Corporate partnerships, sponsorship, and workplace training.",
              href: "/contact/general",
              icon: "users",
            },
          ]}
        />
      </Section>

      <Section
        eyebrow="Why it matters"
        title="What your support paid for last year"
        tone="ink"
        id="impact"
      >
        <Reveal stagger className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {stats.slice(0, 3).map((s) => (
            <div key={s.label} className="border-t border-white/15 pt-6">
              <Counter
                value={s.value}
                prefix={s.prefix}
                suffix={s.suffix}
                className="block font-display text-5xl font-black tabular-nums leading-none tracking-[-0.04em] text-white"
              />
              <p className="mt-4 max-w-[24ch] font-display text-lg font-bold leading-snug text-white">
                {s.label}
              </p>
              {s.context && <p className="mt-1.5 text-[15px] text-ink-400">{s.context}</p>}
            </div>
          ))}
        </Reveal>
      </Section>

      <Section
        eyebrow="Wishlist"
        title="Items our shelters and residents need"
        lead="Donations of goods go directly to Sadler House, Frannie's House, our downtown residence, and Carolyn's Closet."
        tone="bone"
        id="wishlist"
      >
        <Reveal stagger staggerAmount={0.05} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {wishlist.map((item) => (
            <div
              key={item}
              className="flex items-center gap-3.5 rounded-2xl border border-ink-200/70 bg-paper px-6 py-5"
            >
              <span className="size-2 shrink-0 rounded-full bg-persimmon" />
              <span className="text-[16px] text-ink-700">{item}</span>
            </div>
          ))}
        </Reveal>
        <p className="mt-8 max-w-[62ch] text-[15px] leading-relaxed text-ink-500">
          Please contact us before dropping off larger donations so we can make
          sure there is somewhere to put them.
        </p>
      </Section>
    </SiteShell>
  );
}
