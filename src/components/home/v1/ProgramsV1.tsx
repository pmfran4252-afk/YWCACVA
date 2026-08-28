import SafeLink from "@/components/ui/SafeLink";

import Reveal from "@/components/motion/Reveal";
import type { Accent, HomePage, Program } from "@/content/types";

const ACCENT: Record<Accent, { bg: string; text: string; sub: string; chip: string }> = {
  persimmon: { bg: "bg-persimmon", text: "text-white", sub: "text-white/85", chip: "bg-white/20 text-white" },
  ink:       { bg: "bg-ink",       text: "text-white", sub: "text-white/75", chip: "bg-white/15 text-white" },
  cyan:      { bg: "bg-cyan-brand", text: "text-ink-900", sub: "text-ink-800/80", chip: "bg-ink/10 text-ink-900" },
  gold:      { bg: "bg-gold",      text: "text-ink-900", sub: "text-ink-800/80", chip: "bg-ink/10 text-ink-900" },
  teal:      { bg: "bg-teal",      text: "text-white", sub: "text-white/85", chip: "bg-white/20 text-white" },
  mahogany:  { bg: "bg-mahogany",  text: "text-white", sub: "text-white/80", chip: "bg-white/15 text-white" },
};

/** Bento spans, largest first, the two flagship programs get the weight. */
const SPAN = [
  "lg:col-span-5 lg:row-span-2",
  "lg:col-span-7",
  "lg:col-span-4",
  "lg:col-span-3",
  "lg:col-span-5",
  "lg:col-span-7",
];

export default function ProgramsV1({
  home,
  programs,
}: {
  home: HomePage;
  programs: Program[];
}) {
  return (
    <section className="bg-paper py-20 md:py-28" aria-labelledby="programs-heading">
      <div className="container-page">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <p className="eyebrow text-persimmon">Our programs</p>
            <h2
              id="programs-heading"
              className="mt-4 font-display font-black text-ink-900"
              style={{ fontSize: "var(--text-h2)" }}
            >
              {home.programsHeadline}
            </h2>
          </div>
          <SafeLink
            href="/programs"
            className="group inline-flex items-center gap-2 text-[15px] font-semibold text-ink-900"
          >
            View all programs
            <span className="grid size-8 place-items-center rounded-full border border-ink-200 transition-all duration-400 ease-[var(--ease-out-expo)] group-hover:border-persimmon group-hover:bg-persimmon group-hover:text-white">
              <svg viewBox="0 0 16 16" fill="none" className="size-3.5" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </SafeLink>
        </Reveal>

        <Reveal
          stagger
          staggerAmount={0.07}
          className="mt-12 grid auto-rows-[minmax(13rem,auto)] gap-3 sm:grid-cols-2 lg:grid-cols-12"
        >
          {programs.map((p, i) => {
            const a = ACCENT[p.accent];
            const stat = p.impactHighlights[0];

            return (
              <SafeLink
                key={p.slug}
                href={`/programs/${p.slug}`}
                className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl p-7 transition-transform duration-600 ease-[var(--ease-out-expo)] hover:-translate-y-1.5 md:p-8 ${a.bg} ${a.text} ${SPAN[i] ?? "lg:col-span-4"}`}
              >
                {/* Light sweep on hover */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-x-10 -top-40 h-56 rotate-12 bg-white/10 opacity-0 blur-2xl transition-all duration-900 ease-[var(--ease-out-expo)] group-hover:top-full group-hover:opacity-100"
                />

                <div className="relative">
                  {p.shortName && (
                    <span className={`eyebrow inline-flex rounded-full px-2.5 py-1 text-[10px] ${a.chip}`}>
                      {p.shortName}
                    </span>
                  )}
                  <h3
                    className={`font-display font-black leading-[0.95] ${p.shortName ? "mt-4" : ""} ${i === 0 ? "text-4xl md:text-5xl" : "text-2xl md:text-3xl"}`}
                  >
                    {p.title}
                  </h3>
                  <p className={`mt-3 max-w-[46ch] text-[15px] leading-relaxed ${a.sub}`}>
                    {p.summary}
                  </p>
                </div>

                <div className="relative mt-8 flex items-end justify-between gap-4">
                  {stat && (
                    <p className="leading-none">
                      <span className="block font-display text-3xl font-black tabular-nums md:text-4xl">
                        {stat.value}
                      </span>
                      <span className={`mt-2 block max-w-[22ch] text-[12px] leading-snug ${a.sub}`}>
                        {stat.label}
                      </span>
                    </p>
                  )}
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white/15 transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:bg-white group-hover:text-ink-900">
                    <svg viewBox="0 0 16 16" fill="none" className="size-4" aria-hidden="true">
                      <path d="M4 12L12 4M12 4H5.5M12 4v6.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </SafeLink>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
