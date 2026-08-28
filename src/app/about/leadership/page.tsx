import type { Metadata } from "next";

import SiteShell from "@/components/chrome/SiteShell";
import PageHero from "@/components/page/PageHero";
import Section from "@/components/page/Section";
import PeopleGrid from "@/components/page/PeopleGrid";
import { getPeople, getSiteSettings } from "@/lib/content";

export const metadata: Metadata = {
  title: "Leadership",
  description:
    "The team leading YWCA Central Virginia's programs and services across the region.",
};

export default async function LeadershipPage() {
  const [settings, people] = await Promise.all([
    getSiteSettings(),
    getPeople("leadership"),
  ]);

  return (
    <SiteShell settings={settings} headerTone="dark">
      <PageHero
        eyebrow="Leadership"
        title="Guided by purpose-driven leadership."
        lead="YWCA Central Virginia is led by a dedicated team of professionals and community advocates. Through strategic vision, governance, and collaboration, leadership keeps every program focused on creating meaningful impact."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
        ]}
        primaryCta={{ label: "Contact us", href: "/contact" }}
        glyph="users"
      />

      <Section eyebrow="Executive leadership" title="The team" tone="paper" id="team">
        <PeopleGrid people={people} />
        <p className="mt-10 max-w-[62ch] text-[15px] leading-relaxed text-ink-500">
          Full biographies and approved photographs are being finalised and will
          be added here.
        </p>
      </Section>
    </SiteShell>
  );
}
