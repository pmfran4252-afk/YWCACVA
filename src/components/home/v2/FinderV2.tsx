import SafeLink from "@/components/ui/SafeLink";

import Reveal from "@/components/motion/Reveal";
import type { HomePage, Pathway } from "@/content/types";

const DOT: Record<Pathway["urgency"], string> = {
  immediate: "bg-persimmon",
  support: "bg-ink",
  info: "bg-cyan-brand",
  help: "bg-gold",
};

/**
 * The same routing logic as Concept 1, set as a quiet editorial index instead
 * of a card grid, the row itself is the target, so it stays comfortable on a
 * phone without shrinking anything to a tap-hostile size.
 */
export default function FinderV2({
  home,
  pathways,
}: {
  home: HomePage;
  pathways: Pathway[];
}) {
  return (
    <section className="bg-paper py-20 md:py-28" aria-labelledby="finder-v2">
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-4">
          <p className="eyebrow text-persimmon">Start here</p>
          <h2
            id="finder-v2"
            className="mt-4 font-display font-black text-ink-900"
            style={{ fontSize: "var(--text-h2)" }}
          >
            {home.finderHeadline}
          </h2>
          <p className="mt-5 max-w-[38ch] text-lg leading-relaxed text-ink-600">
            {home.finderBody}
          </p>
        </Reveal>

        <Reveal stagger staggerAmount={0.06} className="lg:col-span-8">
          {pathways.map((p, i) => (
            <SafeLink
              key={p.label}
              href={p.destination.href}
              className="group grid grid-cols-[auto_1fr_auto] items-center gap-5 border-t border-ink-100 py-6 transition-colors duration-400 last:border-b hover:bg-persimmon-050 md:gap-8 md:py-7"
            >
              <span className="flex items-center gap-4 pl-1 md:pl-3">
                <span className={`size-2 rounded-full ${DOT[p.urgency]}`} />
                <span className="hidden font-display text-[13px] font-black tabular-nums text-ink-300 sm:block">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </span>

              <span>
                <span className="block font-display text-xl font-bold leading-snug text-ink-900 transition-colors duration-300 group-hover:text-persimmon md:text-2xl">
                  {p.label}
                </span>
                <span className="mt-1 block text-[15px] leading-relaxed text-ink-500">
                  {p.description}
                </span>
              </span>

              <span className="grid size-10 shrink-0 place-items-center rounded-full border border-ink-200 text-ink-900 transition-all duration-400 ease-[var(--ease-out-expo)] group-hover:border-persimmon group-hover:bg-persimmon group-hover:text-white md:mr-2">
                <svg viewBox="0 0 16 16" fill="none" className="size-4" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </SafeLink>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
