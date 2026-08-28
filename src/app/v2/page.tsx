import type { Metadata } from "next";

import SiteShell from "@/components/chrome/SiteShell";
import HeroV2 from "@/components/home/v2/HeroV2";
import FinderV2 from "@/components/home/v2/FinderV2";
import ProgramsV2 from "@/components/home/v2/ProgramsV2";
import ImpactV2 from "@/components/home/v2/ImpactV2";
import StoriesStack from "@/components/home/v2/StoriesStack";
import NewsList from "@/components/home/v2/NewsList";
import MissionSnapshot from "@/components/home/shared/MissionSnapshot";
import HelpCallout from "@/components/home/shared/HelpCallout";
import CtaBand from "@/components/home/shared/CtaBand";
import { getHomeData } from "@/lib/content";

export const metadata: Metadata = {
  title: "Concept 2: Opening Windows",
};

/**
 * CONCEPT 2, "Opening Windows"
 * Warm editorial. Split hero, ruled type, a pinned horizontal programs rail
 * and stacking story cards. The quietest and most donor-facing of the three.
 */
export default async function V2Page() {
  const { settings, home, programs, pathways, stats, stories, news } =
    await getHomeData();

  return (
    <SiteShell settings={settings} headerTone="light">
      <HeroV2 home={home} settings={settings} />
      <FinderV2 home={home} pathways={pathways} />
      <ProgramsV2 home={home} programs={programs} />
      <MissionSnapshot home={home} settings={settings} />
      <ImpactV2 home={home} stats={stats} />
      <StoriesStack headline={home.storiesHeadline} stories={stories} />
      <HelpCallout settings={settings} />
      <NewsList posts={news} />
      <CtaBand home={home} tone="mahogany" />
    </SiteShell>
  );
}
