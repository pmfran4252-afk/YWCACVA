import type { Metadata } from "next";

import SiteShell from "@/components/chrome/SiteShell";
import PageHero from "@/components/page/PageHero";
import Section from "@/components/page/Section";
import LinkCards from "@/components/page/LinkCards";
import SupportReminder from "@/components/page/SupportReminder";
import { getSiteSettings } from "@/lib/content";
import { learnArticles } from "@/content/seed";
import { learnMedia } from "@/content/media";

export const metadata: Metadata = {
  title: "Learn",
  description:
    "Understanding abuse, sexual assault, warning signs, safety planning, and how to help someone. Clear information from YWCA Central Virginia.",
};

export default async function LearnPage() {
  const settings = await getSiteSettings();

  return (
    <SiteShell settings={settings} headerTone="dark">
      <PageHero
        eyebrow="Learn"
        title="Understanding abuse. Recognizing the signs. Finding support."
        lead="These pages help you understand abuse, sexual assault, and rape, and what the warning signs look like. Whether you are looking for yourself or for someone else, everything here is written to be read plainly."
        crumbs={[{ label: "Home", href: "/" }]}
        primaryCta={{ label: "Get Help Now", href: "/get-help-now" }}
        glyph="book"
      />

      <Section
        eyebrow="Topics"
        title="Where would you like to start?"
        tone="paper"
        id="topics"
      >
        <LinkCards
          columns={3}
          cards={learnArticles.map((a) => ({
            title: a.title,
            description: a.summary,
            href: `/learn/${a.slug}`,
            meta: a.contentWarning ? "Sensitive content" : undefined,
            icon: learnMedia(a.slug).icon,
          }))}
        />
      </Section>

      <SupportReminder settings={settings} tone="bone" />
    </SiteShell>
  );
}
