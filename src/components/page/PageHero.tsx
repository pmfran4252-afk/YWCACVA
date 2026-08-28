import SafeLink from "@/components/ui/SafeLink";
import Button from "@/components/ui/Button";
import SplitHeadline from "@/components/motion/SplitHeadline";
import Reveal from "@/components/motion/Reveal";
import HeroGlyph from "./HeroGlyph";
import type { LineIconName } from "@/components/ui/LineIcons";
import type { Cta } from "@/content/types";

type Crumb = { label: string; href: string };

type Props = {
  eyebrow?: string;
  title: string;
  lead?: string;
  crumbs?: Crumb[];
  primaryCta?: Cta;
  secondaryCta?: Cta;
  /** Content warning shown above the heading on sensitive Learn pages. */
  notice?: string;
  /** Oversized line mark behind the hero. Desktop only. */
  glyph?: LineIconName;
};

/**
 * The page header for every inner route, carrying Concept 3's dark register.
 * Kept to one component so heading levels, breadcrumb semantics and the
 * spacing under the fixed chrome stay identical site-wide.
 */
export default function PageHero({
  eyebrow,
  title,
  lead,
  crumbs,
  primaryCta,
  secondaryCta,
  notice,
  glyph,
}: Props) {
  return (
    <section className="relative overflow-hidden bg-ink-900 pb-16 pt-32 text-white md:pb-20 md:pt-56">
      {glyph && <HeroGlyph name={glyph} side="right" />}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 size-[34rem] rounded-full bg-persimmon/18 blur-[120px]"
      />

      <div className="container-page relative">
        {crumbs && crumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-7">
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[14px] text-ink-400">
              {crumbs.map((c, i) => (
                <li key={c.href} className="flex items-center gap-2">
                  {i > 0 && <span aria-hidden="true">/</span>}
                  <SafeLink
                    href={c.href}
                    className="transition-colors hover:text-persimmon"
                  >
                    {c.label}
                  </SafeLink>
                </li>
              ))}
            </ol>
          </nav>
        )}

        {notice && (
          <p className="mb-7 max-w-[62ch] rounded-2xl border border-gold/40 bg-gold/10 px-5 py-4 text-[15px] leading-relaxed text-gold">
            {notice}
          </p>
        )}

        {eyebrow && (
          <Reveal>
            <p className="eyebrow text-persimmon">{eyebrow}</p>
          </Reveal>
        )}

        <SplitHeadline
          as="h1"
          trigger="load"
          className="mt-5 max-w-[20ch] font-display font-black leading-[0.98] tracking-[-0.03em]"
          style={{ fontSize: "var(--text-h1)" }}
        >
          {title}
        </SplitHeadline>

        {lead && (
          <Reveal delay={0.25}>
            <p className="mt-7 max-w-[58ch] text-lg leading-relaxed text-ink-300 md:text-xl">
              {lead}
            </p>
          </Reveal>
        )}

        {(primaryCta || secondaryCta) && (
          <Reveal delay={0.35}>
            <div className="mt-10 flex flex-wrap gap-3">
              {primaryCta && (
                <Button href={primaryCta.href} variant="primary" size="lg">
                  {primaryCta.label}
                </Button>
              )}
              {secondaryCta && (
                <Button href={secondaryCta.href} variant="outlineLight" size="lg">
                  {secondaryCta.label}
                </Button>
              )}
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
