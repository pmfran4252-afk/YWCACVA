import type { Metadata } from "next";

import SiteShell from "@/components/chrome/SiteShell";
import PageHero from "@/components/page/PageHero";
import Section from "@/components/page/Section";
import HistoryTimeline from "@/components/page/HistoryTimeline";
import Prose from "@/components/page/Prose";
import Reveal from "@/components/motion/Reveal";
import Button from "@/components/ui/Button";
import { getSiteSettings, getTimeline } from "@/lib/content";

export const metadata: Metadata = {
  title: "Mission & History",
  description:
    "A legacy of service since 1912. The mission, history, and continuing work of YWCA Central Virginia.",
};

export default async function MissionHistoryPage() {
  const [settings, timeline] = await Promise.all([getSiteSettings(), getTimeline()]);

  return (
    <SiteShell settings={settings} headerTone="dark">
      <PageHero
        eyebrow="Mission & history"
        title="A legacy of service. A mission for equity."
        lead="Founded in 1912 by a group of determined women who believed in creating opportunities and support systems for other women, despite considerable skepticism at the time about whether such an organization could succeed."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
        ]}
        primaryCta={{ label: "Support our mission", href: "/get-involved/donate" }}
        glyph="clock"
      />

      {/* --- Mission statement --- */}
      <section className="bg-persimmon py-20 text-white md:py-28" aria-label="Mission statement">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow text-white/75">Our mission</p>
            <blockquote className="mt-6 max-w-[26ch] font-display font-black leading-[1.02] tracking-[-0.03em]"
              style={{ fontSize: "var(--text-h1)" }}
            >
              {settings.mission}
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* --- Timeline: pinned horizontal on desktop, vertical on mobile --- */}
      <HistoryTimeline events={timeline} />

      {/* --- Today --- */}
      <Section
        eyebrow="Today"
        title="How the mission continues"
        tone="bone"
        id="today"
        figure="community"
        figureSide="right"
        figureMobile="below"
      >
        <Reveal>
          <Prose>
            <p>
              Today, YWCA Central Virginia brings its mission to life through a
              network of programs supporting women, children, and families at
              every stage of need, from 24/7 crisis hotlines and emergency
              shelter to affordable housing and long-term stability programs.
            </p>
            <p>
              Alongside direct services, YWCA advances racial and social justice
              through community education, advocacy, and engagement, keeping a
              historic mission relevant to the region as it is now.
            </p>
          </Prose>

          <div className="mt-10 flex flex-wrap gap-3">
            <Button href="/programs" variant="primary" size="lg">
              View programs
            </Button>
            <Button href="/get-involved" variant="outline" size="lg">
              Get involved
            </Button>
          </div>
        </Reveal>
      </Section>
    </SiteShell>
  );
}
