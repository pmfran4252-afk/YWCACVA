import SiteShell from "@/components/chrome/SiteShell";
import PageHero from "@/components/page/PageHero";
import Section from "@/components/page/Section";
import LinkCards from "@/components/page/LinkCards";
import { getSiteSettings } from "@/lib/content";

/**
 * A real not-found boundary, not just a nicety: without one, Next falls back
 * to a hard browser navigation for unmatched routes, which pushes a history
 * entry and breaks the single-entry guarantee Quick Exit depends on.
 */
export default async function NotFound() {
  const settings = await getSiteSettings();

  return (
    <SiteShell settings={settings} headerTone="dark">
      <PageHero
        eyebrow="Page not found"
        title="That page isn't here."
        lead="The link may be out of date, or the page may have moved. Here is where most people are heading."
        crumbs={[{ label: "Home", href: "/" }]}
        primaryCta={{ label: "Get Help Now", href: "/get-help-now" }}
        secondaryCta={{ label: "Back to home", href: "/" }}
        glyph="route"
      />

      <Section tone="paper" id="popular">
        <LinkCards
          columns={3}
          cards={[
            {
              title: "Get help now",
              description: "24/7 hotlines and immediate support options.",
              href: "/get-help-now",
              icon: "phone",
            },
            {
              title: "Programs & services",
              description: "Everything YWCA Central Virginia provides.",
              href: "/programs",
              icon: "shield",
            },
            {
              title: "Learn",
              description: "Understanding abuse, warning signs, and safety planning.",
              href: "/learn",
              icon: "book",
            },
            {
              title: "Support groups",
              description: "Confidential groups for survivors and their families.",
              href: "/support-groups",
              icon: "users",
            },
            {
              title: "Get involved",
              description: "Donate, volunteer, or partner with us.",
              href: "/get-involved",
              icon: "heart",
            },
            {
              title: "Contact",
              description: "Reach the right team.",
              href: "/contact",
              icon: "mail",
            },
          ]}
        />
      </Section>
    </SiteShell>
  );
}
