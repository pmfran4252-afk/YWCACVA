import type { Metadata } from "next";

import SiteShell from "@/components/chrome/SiteShell";
import PageHero from "@/components/page/PageHero";
import Section from "@/components/page/Section";
import PeopleGrid from "@/components/page/PeopleGrid";
import { getPeople, getSiteSettings } from "@/lib/content";

export const metadata: Metadata = {
  title: "Board of Directors",
  description:
    "Governance and stewardship at YWCA Central Virginia: the board that keeps the organization accountable and mission-focused.",
};

export default async function BoardPage() {
  const [settings, board] = await Promise.all([
    getSiteSettings(),
    getPeople("board"),
  ]);

  const officers = board.filter((p) => p.officerRole);
  const directors = board.filter((p) => !p.officerRole);

  return (
    <SiteShell settings={settings} headerTone="dark">
      <PageHero
        eyebrow="Governance"
        title="Leading with integrity and stewardship."
        lead="Our Board of Directors provides thoughtful governance, keeping the organization accountable, sustainable, and mission-focused, safeguarding the YWCA's legacy while guiding its continued impact."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
        ]}
        primaryCta={{ label: "Contact us", href: "/contact" }}
        glyph="shield"
      />

      <Section eyebrow="Officers" title="Board officers" tone="paper" id="officers">
        <PeopleGrid people={officers} />
      </Section>

      <Section eyebrow="Directors" title="Board members" tone="bone" id="directors">
        <PeopleGrid people={directors} />
      </Section>
    </SiteShell>
  );
}
