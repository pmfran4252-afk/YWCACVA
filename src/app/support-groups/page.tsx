import type { Metadata } from "next";

import SiteShell from "@/components/chrome/SiteShell";
import PageHero from "@/components/page/PageHero";
import Section from "@/components/page/Section";
import Accordion from "@/components/page/Accordion";
import LinkCards from "@/components/page/LinkCards";
import SupportReminder from "@/components/page/SupportReminder";
import Reveal from "@/components/motion/Reveal";
import Button from "@/components/ui/Button";
import { getPrograms, getSiteSettings } from "@/lib/content";
import { supportGroups } from "@/content/pages";
import { programMedia } from "@/content/media";

export const metadata: Metadata = {
  title: "Support Groups",
  description:
    "Confidential support groups for survivors of domestic violence and sexual assault, and for the people supporting them.",
};

export default async function SupportGroupsPage() {
  const [settings, programs] = await Promise.all([getSiteSettings(), getPrograms()]);

  return (
    <SiteShell settings={settings} headerTone="dark">
      <PageHero
        eyebrow="Support groups"
        title="Being in a room with people who understand."
        lead="Groups are confidential and facilitated by our advocates. You are not required to speak, to have reported anything, or to have made any decisions about your situation."
        crumbs={[{ label: "Home", href: "/" }]}
        primaryCta={{ label: "Ask about joining", href: "/contact/general" }}
        glyph="chat"
      />

      <Section
        eyebrow="Available groups"
        title="Find a group"
        lead="Meeting times and locations are shared privately once you get in touch. We do not publish them, for the safety of everyone attending."
        tone="paper"
        id="directory"
      >
        <Reveal>
          <Accordion
            items={supportGroups.map((g) => ({
              title: g.name,
              body: [g.description, `Who it's for: ${g.audience}`, `Meets: ${g.cadence}. ${g.howToJoin}`],
              cta: g.cta,
            }))}
          />
        </Reveal>
      </Section>

      <Section
        eyebrow="How to join"
        title="Getting started"
        tone="bone"
        id="join"
        narrow
        figure="counseling"
        figureSide="right"
      >
        <Reveal>
          <ol className="space-y-6">
            {[
              "Contact us by phone or through the form and say you are interested in a group.",
              "A facilitator will talk with you first, to find the group that fits and answer any questions.",
              "You will be given the meeting details privately, and you can attend without committing to anything ongoing.",
            ].map((step, i) => (
              <li key={step} className="flex gap-5">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-persimmon font-display text-sm font-black text-white">
                  {i + 1}
                </span>
                <p className="max-w-[60ch] pt-1 text-lg leading-relaxed text-ink-700">
                  {step}
                </p>
              </li>
            ))}
          </ol>

          <div className="mt-10 flex flex-wrap gap-3">
            <Button href="/contact/general" variant="primary" size="lg">
              Ask about a group
            </Button>
          </div>
        </Reveal>
      </Section>

      <SupportReminder settings={settings} tone="paper" />

      <Section eyebrow="Related" title="Other services" tone="bone" id="related">
        <LinkCards
          columns={3}
          cards={programs.slice(0, 3).map((p) => ({
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
