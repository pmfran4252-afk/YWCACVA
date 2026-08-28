import type { Metadata } from "next";

import SiteShell from "@/components/chrome/SiteShell";
import HeroV1 from "@/components/home/v1/HeroV1";
import FinderV1 from "@/components/home/v1/FinderV1";
import ProgramsV1 from "@/components/home/v1/ProgramsV1";
import ImpactV1 from "@/components/home/v1/ImpactV1";
import MissionSnapshot from "@/components/home/shared/MissionSnapshot";
import HelpCallout from "@/components/home/shared/HelpCallout";
import StoriesMap from "@/components/home/shared/StoriesMap";
import NewsRow from "@/components/home/shared/NewsRow";
import CtaBand from "@/components/home/shared/CtaBand";
import { getHomeData } from "@/lib/content";

export const metadata: Metadata = {
  title: "Concept 1: Breaking Barriers",
};

/**
 * CONCEPT 1, "Breaking Barriers"
 * Campaign energy. Full-bleed persimmon hero, bento program grid in the full
 * brand palette, oversized counters on black. The loudest of the three.
 */
export default async function V1Page() {
  const { settings, home, programs, pathways, stats, stories, news } =
    await getHomeData();

  return (
    <SiteShell settings={settings} headerTone="overlay">
      <HeroV1 home={home} />
      <FinderV1 home={home} pathways={pathways} />
      <MissionSnapshot home={home} settings={settings} />
      <ProgramsV1 home={home} programs={programs} />
      <ImpactV1 home={home} stats={stats} />
      <HelpCallout settings={settings} />
      <StoriesMap headline={home.storiesHeadline} stories={stories} />
      <NewsRow posts={news} />
      <CtaBand home={home} tone="persimmon" />
    </SiteShell>
  );
}
