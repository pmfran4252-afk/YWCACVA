import type { Metadata } from "next";

import SiteShell from "@/components/chrome/SiteShell";
import HeroV3 from "@/components/home/v3/HeroV3";
import ProgramsStack from "@/components/home/v3/ProgramsStack";
import ImpactTicker from "@/components/home/v3/ImpactTicker";
import StoriesCarousel from "@/components/home/v3/StoriesCarousel";
import MissionV3 from "@/components/home/v3/MissionV3";
import HelpCallout from "@/components/home/shared/HelpCallout";
import NewsRow from "@/components/home/shared/NewsRow";
import CtaBand from "@/components/home/shared/CtaBand";
import { getHomeData } from "@/lib/content";

export const metadata: Metadata = {
  title: "Concept 3: The Path",
};

/**
 * CONCEPT 3, "The Path"
 * Utility first. The support router IS the hero, programs arrive as a pinned
 * stack, and impact runs as a live ticker. Built for the visitor who arrived
 * needing something, not browsing.
 */
export default async function V3Page() {
  const { settings, home, programs, pathways, stats, stories, news } =
    await getHomeData();

  return (
    <SiteShell settings={settings} headerTone="dark">
      <HeroV3 home={home} pathways={pathways} settings={settings} />
      <ProgramsStack home={home} programs={programs} />
      <ImpactTicker home={home} stats={stats} />
      <MissionV3 home={home} settings={settings} />
      <StoriesCarousel headline={home.storiesHeadline} stories={stories} />
      <HelpCallout settings={settings} />
      <NewsRow posts={news} tone="bone" />
      <CtaBand home={home} tone="ink" />
    </SiteShell>
  );
}
