import type { Metadata } from "next";
import { notFound } from "next/navigation";

import SiteShell from "@/components/chrome/SiteShell";
import PageHero from "@/components/page/PageHero";
import Section from "@/components/page/Section";
import Steps from "@/components/page/Steps";
import LinkCards from "@/components/page/LinkCards";
import SupportReminder from "@/components/page/SupportReminder";
import Reveal from "@/components/motion/Reveal";
import Counter from "@/components/motion/Counter";
import { getPrograms, getSiteSettings } from "@/lib/content";
import { helpSteps } from "@/content/pages";
import { programMedia } from "@/content/media";

/* Params are async in Next 16, synchronous access was removed. */
type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const programs = await getPrograms();
  return programs.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const programs = await getPrograms();
  const program = programs.find((p) => p.slug === slug);
  if (!program) return {};

  return {
    title: program.title,
    description: program.summary,
  };
}

/** Splits "4,282" or "$4M+" into a number we can count and its trimmings. */
function parseStat(value: string) {
  const numeric = Number(value.replace(/[^0-9.]/g, ""));
  if (!Number.isFinite(numeric) || numeric === 0) return null;
  const [prefix] = value.match(/^[^0-9]*/) ?? [""];
  const [suffix] = value.match(/[^0-9.,]*$/) ?? [""];
  return { numeric, prefix, suffix };
}

export default async function ProgramPage({ params }: Params) {
  const { slug } = await params;
  const [settings, programs] = await Promise.all([getSiteSettings(), getPrograms()]);
  const program = programs.find((p) => p.slug === slug);

  if (!program) notFound();

  const related = programs.filter((p) => p.slug !== slug).slice(0, 3);
  const media = programMedia(slug);

  return (
    <SiteShell settings={settings} headerTone="dark">
      <PageHero
        eyebrow={program.category}
        title={program.title}
        lead={program.summary}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Programs", href: "/programs" },
        ]}
        primaryCta={program.primaryCta}
        /* The crisis programs already lead with Get Help Now, so adding the
           standing secondary would print the same button twice. */
        secondaryCta={
          program.primaryCta?.href === "/get-help-now"
            ? undefined
            : { label: "Get Help Now", href: "/get-help-now" }
        }
        glyph={media.glyph}
      />

      {/* --- Impact figures --- */}
      {program.impactHighlights.length > 0 && (
        <section className="bg-ink-900 pb-16 md:pb-24" aria-label="Program impact">
          <div className="container-page">
            <Reveal stagger className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              {program.impactHighlights.map((h) => {
                const parsed = parseStat(h.value);
                return (
                  <div key={h.label} className="border-t border-white/15 pt-6">
                    {parsed ? (
                      <Counter
                        value={parsed.numeric}
                        prefix={parsed.prefix}
                        suffix={parsed.suffix}
                        className="block font-display text-4xl font-black tabular-nums leading-none tracking-[-0.03em] text-white md:text-5xl"
                      />
                    ) : (
                      <span className="block font-display text-4xl font-black leading-none text-white md:text-5xl">
                        {h.value}
                      </span>
                    )}
                    <p className="mt-4 max-w-[22ch] text-[15px] leading-snug text-ink-300">
                      {h.label}
                    </p>
                  </div>
                );
              })}
            </Reveal>
          </div>
        </section>
      )}

      {/* --- What we do --- */}
      <Section
        eyebrow="What we do"
        title="How this program works"
        tone="paper"
        id="what-we-do"
        figure={media.figure}
        figureSide="right"
        figureMobile="below"
      >
        {/* Both the list and the eligibility card stay in the left seven
            columns. The card used to sit on the right, where it covered the
            hand-drawn figure completely. */}
        <div className="lg:grid lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <ul className="space-y-5">
                {program.whatWeDo.map((item) => (
                  <li key={item} className="flex gap-4 text-lg leading-relaxed text-ink-700">
                    <span className="mt-2.5 size-2 shrink-0 rounded-full bg-persimmon" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>

            {(program.servesWho ||
              (program.eligibility && program.eligibility.length > 0)) && (
              <Reveal>
                <div className="mt-12 rounded-3xl bg-bone p-8">
                  {program.servesWho && (
                    <>
                      <h3 className="eyebrow text-persimmon">Who it serves</h3>
                      <p className="mt-3 text-[15px] leading-relaxed text-ink-700">
                        {program.servesWho}
                      </p>
                    </>
                  )}

                  {program.eligibility && program.eligibility.length > 0 && (
                    <>
                      <h3 className="eyebrow mt-8 text-persimmon">Requirements</h3>
                      <ul className="mt-3 space-y-2.5">
                        {program.eligibility.map((e) => (
                          <li
                            key={e}
                            className="flex gap-3 text-[15px] leading-relaxed text-ink-700"
                          >
                            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-ink-300" />
                            {e}
                          </li>
                        ))}
                      </ul>
                      <p className="mt-6 text-[13px] leading-relaxed text-ink-500">
                        Requirements are confirmed by program staff. Contact us to
                        check whether this fits your situation.
                      </p>
                    </>
                  )}
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </Section>

      {/* --- Access --- */}
      <Section
        eyebrow="How to access services"
        title="Reaching us"
        lead="You do not need a referral, and you do not need to have made any decisions."
        tone="bone"
        id="access"
      >
        <Steps steps={helpSteps} />
      </Section>

      <SupportReminder settings={settings} tone="paper" />

      {/* --- Related --- */}
      <Section eyebrow="Related" title="Other services" tone="paper" id="related">
        <LinkCards
          columns={3}
          cards={related.map((p) => ({
            title: p.title,
            description: p.summary,
            href: `/programs/${p.slug}`,
            meta: p.shortName,
            icon: programMedia(p.slug).icon,
          }))}
        />
      </Section>
    </SiteShell>
  );
}
