import type { Metadata } from "next";

import SiteShell from "@/components/chrome/SiteShell";
import PageHero from "@/components/page/PageHero";
import Section from "@/components/page/Section";
import SupportReminder from "@/components/page/SupportReminder";
import Reveal from "@/components/motion/Reveal";
import SafeLink from "@/components/ui/SafeLink";
import Button from "@/components/ui/Button";
import { getPrograms, getSiteSettings } from "@/lib/content";
import type { Accent } from "@/content/types";
import { programMedia } from "@/content/media";
import { LineIcon } from "@/components/ui/LineIcons";

export const metadata: Metadata = {
  title: "Programs & Services",
  description:
    "The services YWCA Central Virginia provides: domestic violence prevention, sexual assault response, court advocacy, housing, visitation, and Church Street Bridal.",
};

const ACCENT: Record<Accent, string> = {
  persimmon: "bg-persimmon text-white",
  ink: "bg-ink-800 text-white",
  cyan: "bg-cyan-brand text-ink-900",
  gold: "bg-gold text-ink-900",
  teal: "bg-teal text-white",
  mahogany: "bg-mahogany text-white",
};

export default async function ProgramsPage() {
  const [settings, programs] = await Promise.all([getSiteSettings(), getPrograms()]);

  return (
    <SiteShell settings={settings} headerTone="dark">
      <PageHero
        eyebrow="Programs & services"
        title="Safety, stability, advocacy, and a way forward."
        lead="Every service below is provided by YWCA Central Virginia across Lynchburg and seven surrounding counties. If you are not sure which fits, an advocate will help you work it out."
        crumbs={[{ label: "Home", href: "/" }]}
        primaryCta={{ label: "Get Help Now", href: "/get-help-now" }}
        secondaryCta={{ label: "Talk to someone", href: "/contact/general" }}
        glyph="shield"
      />

      <Section tone="paper" id="directory">
        <Reveal stagger staggerAmount={0.07} className="grid gap-5 lg:grid-cols-2">
          {programs.map((p, i) => (
            <SafeLink
              key={p.slug}
              href={`/programs/${p.slug}`}
              // `relative` matters: without a positioned ancestor the hover
              // sweep below anchors to the page and its negative inset widens
              // the document on narrow screens.
              className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl p-8 transition-transform duration-600 ease-[var(--ease-out-expo)] hover:-translate-y-1.5 md:p-10 ${ACCENT[p.accent]}`}
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -inset-x-10 -top-40 h-56 rotate-12 bg-white/10 opacity-0 blur-2xl transition-all duration-900 group-hover:opacity-100"
              />

              <div>
                <div className="flex items-center gap-3">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-white/15 transition-colors duration-400 group-hover:bg-white/25">
                    <LineIcon name={programMedia(p.slug).icon} className="size-6" />
                  </span>
                  <span className="font-display text-[13px] font-black tabular-nums opacity-60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {p.shortName && (
                    <span className="eyebrow rounded-full bg-white/15 px-2.5 py-1 text-[10px]">
                      {p.shortName}
                    </span>
                  )}
                </div>

                <h2 className="mt-5 font-display text-2xl font-black leading-tight md:text-3xl">
                  {p.title}
                </h2>
                <p className="mt-4 max-w-[50ch] text-[15px] leading-relaxed opacity-85 md:text-base">
                  {p.summary}
                </p>
              </div>

              <div className="mt-8 flex items-end justify-between gap-4 border-t border-current/15 pt-6">
                <dl className="flex flex-wrap gap-x-8 gap-y-3">
                  {p.impactHighlights.slice(0, 2).map((h) => (
                    <div key={h.label}>
                      <dt className="sr-only">{h.label}</dt>
                      <dd>
                        <span className="block font-display text-2xl font-black tabular-nums leading-none">
                          {h.value}
                        </span>
                        <span className="mt-1.5 block max-w-[18ch] text-[12px] leading-snug opacity-80">
                          {h.label}
                        </span>
                      </dd>
                    </div>
                  ))}
                </dl>
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-white/15 transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:bg-white group-hover:text-ink-900">
                  <svg viewBox="0 0 16 16" fill="none" className="size-4" aria-hidden="true">
                    <path d="M4 12L12 4M12 4H5.5M12 4v6.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
            </SafeLink>
          ))}
        </Reveal>
      </Section>

      <Section
        eyebrow="Not sure where to start?"
        title="We will help you find the right service."
        lead="Referral partners are welcome to call the same number. If a service you need is not one we provide, we will point you to who does."
        tone="bone"
        id="choosing"
        narrow
        figure="lynchburg"
        figureSide="right"
        figureAlign="center"
        figureFade
        figureMobile="below"
      >
        <Reveal>
          <div className="flex flex-wrap gap-3">
            <Button href="/contact/general" variant="primary" size="lg">
              Contact us
            </Button>
            <Button href="/support-groups" variant="outline" size="lg">
              Find a support group
            </Button>
          </div>
        </Reveal>
      </Section>

      <SupportReminder settings={settings} tone="paper" />
    </SiteShell>
  );
}
