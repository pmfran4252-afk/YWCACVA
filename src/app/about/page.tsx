import type { Metadata } from "next";

import SiteShell from "@/components/chrome/SiteShell";
import PageHero from "@/components/page/PageHero";
import Section from "@/components/page/Section";
import Prose from "@/components/page/Prose";
import LinkCards from "@/components/page/LinkCards";
import Reveal from "@/components/motion/Reveal";
import { getSiteSettings } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "YWCA Central Virginia is a nonprofit serving women, children, and families across Lynchburg and seven surrounding counties. Founded 1912.",
};

export default async function AboutPage() {
  const settings = await getSiteSettings();

  return (
    <SiteShell settings={settings} headerTone="dark">
      <PageHero
        eyebrow="About us"
        title="Rooted in community. Committed to change."
        lead="YWCA Central Virginia is a trusted community leader dedicated to empowering women, eliminating racism, and promoting peace, justice, freedom, and dignity for all."
        crumbs={[{ label: "Home", href: "/" }]}
        primaryCta={{ label: "Our mission & history", href: "/about/mission-history" }}
        secondaryCta={{ label: "Contact us", href: "/contact" }}
        glyph="users"
      />

      <Section tone="paper" id="overview" figure="strength" figureSide="right">
        <Reveal>
          <Prose>
            <p>
              YWCA Central Virginia is a nonprofit organization serving women,
              children, and families across Lynchburg and seven surrounding
              counties, an area of more than 400,000 residents.
            </p>
            <p>
              As part of the broader YWCA movement, one of the nation&rsquo;s
              oldest and largest women&rsquo;s organizations, we focus on some of
              the region&rsquo;s most pressing challenges: domestic violence,
              sexual assault, housing insecurity, and racial injustice.
            </p>
            <h2>What we provide</h2>
            <ul>
              <li>24/7 crisis intervention and shelter for survivors of domestic violence.</li>
              <li>Sexual assault response services, advocacy, and support.</li>
              <li>Affordable housing and residential programs for women facing economic hardship.</li>
              <li>Racial and social justice education and community engagement.</li>
            </ul>
            <p>
              By combining direct services with advocacy and education, YWCA
              Central Virginia acts as both a safety net and a catalyst for
              long-term change, helping individuals move from crisis to
              stability while working to transform the systems that shape equity
              and opportunity in this region.
            </p>
          </Prose>
        </Reveal>
      </Section>

      <Section eyebrow="More about us" title="Explore" tone="bone" id="subpages">
        <LinkCards
          columns={3}
          cards={[
            {
              title: "Mission & History",
              description:
                "A legacy of service since 1912, and the mission that guides the work today.",
              href: "/about/mission-history",
              icon: "book",
            },
            {
              title: "Leadership",
              description:
                "The team responsible for delivering our programs across the region.",
              href: "/about/leadership",
              icon: "users",
            },
            {
              title: "Board of Directors",
              description:
                "Governance and stewardship keeping the organization accountable and mission-focused.",
              href: "/about/board-of-directors",
              icon: "shield",
            },
          ]}
        />
      </Section>
    </SiteShell>
  );
}
