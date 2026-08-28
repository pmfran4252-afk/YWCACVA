import type { Metadata } from "next";

import SiteShell from "@/components/chrome/SiteShell";
import PageHero from "@/components/page/PageHero";
import Section from "@/components/page/Section";
import LinkCards from "@/components/page/LinkCards";
import ClearCartOnMount from "@/components/shop/ClearCartOnMount";
import { getSiteSettings } from "@/lib/content";

export const metadata: Metadata = {
  title: "Thank you",
  robots: { index: false, follow: false },
};

export default async function SuccessPage() {
  const settings = await getSiteSettings();

  return (
    <SiteShell settings={settings} headerTone="dark">
      <ClearCartOnMount />

      <PageHero
        eyebrow="Order confirmed"
        title="Thank you. That goes straight back into this community."
        lead="A receipt is on its way to the email you used at checkout. We will send tracking as soon as your order ships."
        crumbs={[{ label: "Home", href: "/" }, { label: "Shop", href: "/shop" }]}
        primaryCta={{ label: "Back to the shop", href: "/shop" }}
        glyph="heart"
      />

      <Section eyebrow="While you are here" title="Other ways to help" tone="paper" id="next">
        <LinkCards
          columns={3}
          cards={[
            {
              title: "Donate",
              description: "One-time or monthly giving, processed by Givebutter.",
              href: "/get-involved/donate",
              icon: "heart",
            },
            {
              title: "Volunteer",
              description: "Hospital advocacy, shelter support, events, and the bridal boutique.",
              href: "/get-involved/volunteer",
              icon: "handshake",
            },
            {
              title: "Share our work",
              description: "Read the latest from across Lynchburg and the surrounding counties.",
              href: "/news",
              icon: "calendar",
            },
          ]}
        />
      </Section>
    </SiteShell>
  );
}
