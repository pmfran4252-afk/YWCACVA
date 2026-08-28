import type { Metadata } from "next";
import SafeLink from "@/components/ui/SafeLink";

import Logo from "@/components/ui/Logo";

export const metadata: Metadata = {
  title: "Home page concepts",
  robots: { index: false, follow: false },
};

const CONCEPTS = [
  {
    href: "/v1",
    n: "01",
    name: "Breaking Barriers",
    tagline: "Campaign energy",
    body: "Full-bleed persimmon hero, a bento program grid in the whole brand palette, oversized counters on black, and the Stories map across the service area. The loudest and most recognizable of the three.",
    best: "Awareness campaigns, October DV Awareness Month, social-led traffic.",
    swatches: ["bg-persimmon", "bg-ink", "bg-cyan-brand", "bg-gold"],
    accent: "bg-persimmon",
  },
  {
    href: "/v2",
    n: "02",
    name: "Opening Windows",
    tagline: "Warm editorial",
    body: "Asymmetric split hero on a warm ground, a ruled editorial index instead of cards, a pinned horizontal programs rail, and stacking story cards. The quietest and most dignified.",
    best: "Major donors, grantmakers, board and partner audiences.",
    swatches: ["bg-bone-dark", "bg-persimmon", "bg-mahogany", "bg-ink"],
    accent: "bg-mahogany",
  },
  {
    href: "/v3",
    n: "03",
    name: "The Path",
    tagline: "Utility first",
    body: "The support router is the hero, with six plain-language doors above the fold. Programs arrive as a pinned stack, impact runs as a live ticker, stories as a draggable deck.",
    best: "Survivors arriving mid-crisis, referral partners, mobile search traffic.",
    swatches: ["bg-ink-900", "bg-persimmon", "bg-cyan-brand", "bg-white"],
    accent: "bg-ink-900",
  },
];

export default function ConceptIndex() {
  return (
    <main className="min-h-dvh bg-bone">
      <div className="container-page py-16 md:py-24">
        <header className="max-w-3xl">
          <Logo />
          <p className="eyebrow mt-10 text-persimmon">Home page, three directions</p>
          <h1
            className="mt-4 font-display font-black text-ink-900"
            style={{ fontSize: "var(--text-h1)" }}
          >
            Three directions. Concept 3 was selected.
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-ink-600">
            Kept for reference. <strong className="font-semibold text-ink-900">The Path</strong> is
            the selected direction and now lives at the site root; the other two
            remain browsable so the comparison is not lost.
          </p>
        </header>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {CONCEPTS.map((c) => (
            <SafeLink
              key={c.href}
              href={c.href}
              className="group flex flex-col justify-between rounded-3xl border border-ink-200/70 bg-paper p-8 transition-[transform,box-shadow,border-color] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1.5 hover:border-transparent hover:shadow-[var(--shadow-lift)]"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-display text-[13px] font-black tabular-nums text-ink-300">
                    {c.n}
                  </span>
                  <span className="flex gap-1">
                    {c.swatches.map((s, i) => (
                      <span
                        key={i}
                        className={`size-4 rounded-full ring-1 ring-inset ring-black/10 ${s}`}
                      />
                    ))}
                  </span>
                </div>

                <h2 className="mt-6 font-display text-2xl font-black text-ink-900">
                  {c.name}
                </h2>
                <p className="mt-1 text-[15px] font-semibold text-persimmon">
                  {c.tagline}
                </p>

                <p className="mt-5 text-[15px] leading-relaxed text-ink-600">
                  {c.body}
                </p>

                <p className="mt-5 border-t border-ink-100 pt-5 text-[14px] leading-relaxed text-ink-500">
                  <span className="font-semibold text-ink-900">Strongest for: </span>
                  {c.best}
                </p>
              </div>

              <span className="mt-8 inline-flex items-center gap-2.5 text-[15px] font-semibold text-ink-900">
                View concept
                <span
                  className={`grid size-9 place-items-center rounded-full text-white transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1 ${c.accent}`}
                >
                  <svg viewBox="0 0 16 16" fill="none" className="size-4" aria-hidden="true">
                    <path d="M4 12L12 4M12 4H5.5M12 4v6.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </span>
            </SafeLink>
          ))}
        </div>

        <section className="mt-16 rounded-3xl border border-ink-200/70 bg-paper p-8 md:p-10">
          <h2 className="font-display text-xl font-black text-ink-900">
            Shared across all three
          </h2>
          <ul className="mt-6 grid gap-x-10 gap-y-4 text-[15px] leading-relaxed text-ink-600 md:grid-cols-2">
            {[
              "Quick Exit on every page (button plus double-Escape), and a tap-to-call crisis line docked within thumb reach on mobile.",
              "Brand-book palette and type: Persimmon #FA4616, Pantone 172 C, with Source Sans 3 for text.",
              "Sanity Studio at /studio, with schemas covering every page in the content workbook.",
              "GSAP throughout: ScrollSmoother, pinning, SplitText headlines, counters, all disabled under prefers-reduced-motion.",
              "Mobile-first layouts; nothing depends on hover to be usable.",
              "No survivor photographs, no precise locations. First names only.",
            ].map((t) => (
              <li key={t} className="flex gap-3">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-persimmon" />
                {t}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
