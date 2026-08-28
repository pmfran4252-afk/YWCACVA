import Counter from "@/components/motion/Counter";
import Reveal from "@/components/motion/Reveal";
import Button from "@/components/ui/Button";
import type { HomePage, ImpactStat } from "@/content/types";

/**
 * Impact as an editorial ledger, a ruled list rather than a card grid.
 * Quieter than Concept 1 and it lets the numbers carry the weight.
 */
export default function ImpactV2({
  home,
  stats,
}: {
  home: HomePage;
  stats: ImpactStat[];
}) {
  return (
    <section className="bg-paper py-20 md:py-28" aria-labelledby="impact-v2">
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <p className="eyebrow text-persimmon">Verified 2025 figures</p>
            <h2
              id="impact-v2"
              className="mt-4 font-display font-black text-ink-900"
              style={{ fontSize: "var(--text-h2)" }}
            >
              {home.impactHeadline}
            </h2>
            <p className="mt-5 max-w-[38ch] text-lg leading-relaxed text-ink-600">
              Every number here is a person who called, walked in, or was
              referred to us, and found something on the other side.
            </p>
            <div className="mt-8">
              <Button href="/get-involved/donate" variant="primary">
                Support this work
              </Button>
            </div>
          </div>
        </Reveal>

        <Reveal stagger staggerAmount={0.07} className="lg:col-span-8">
          {stats.map((s) => (
            <div
              key={s.label}
              className="group grid grid-cols-[auto_1fr] items-baseline gap-x-6 gap-y-1 border-b border-ink-100 py-7 transition-colors duration-500 hover:border-persimmon md:gap-x-10 md:py-9"
            >
              <Counter
                value={s.value}
                prefix={s.prefix}
                suffix={s.suffix}
                className="font-display text-4xl font-black tabular-nums leading-none tracking-[-0.04em] text-ink-900 transition-colors duration-500 group-hover:text-persimmon md:text-6xl"
              />
              <div>
                <p className="font-display text-lg font-bold leading-snug text-ink-900 md:text-xl">
                  {s.label}
                </p>
                {s.context && (
                  <p className="mt-1 text-[15px] text-ink-500">{s.context}</p>
                )}
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
