import SiteShell from "@/components/chrome/SiteShell";
import HeroV3 from "@/components/home/v3/HeroV3";
import MonthlySpotlight from "@/components/home/v3/MonthlySpotlight";
import ProgramsStack from "@/components/home/v3/ProgramsStack";
import ImpactTicker from "@/components/home/v3/ImpactTicker";
import StoriesCarousel from "@/components/home/v3/StoriesCarousel";
import MissionV3 from "@/components/home/v3/MissionV3";
import HelpCallout from "@/components/home/shared/HelpCallout";
import NewsRow from "@/components/home/shared/NewsRow";
import CtaBand from "@/components/home/shared/CtaBand";
import { getHomeData } from "@/lib/content";

/**
 * Home, built on Concept 3, "The Path".
 *
 * The support router leads, because a large share of this site's traffic
 * arrives needing something specific rather than browsing. Mission and story
 * follow, once the person who came for help has already left for it.
 */
export default async function HomePage() {
  const { settings, home, spotlight, programs, pathways, stats, stories, news } =
    await getHomeData();

  return (
    <SiteShell settings={settings} headerTone="dark">
      <HeroV3 home={home} pathways={pathways} settings={settings} />
      {spotlight?.active && <MonthlySpotlight spotlight={spotlight} />}
      <ProgramsStack home={home} programs={programs} />
      <NewsRow posts={news} tone="bone" />
      <ImpactTicker home={home} stats={stats} />
      <MissionV3 home={home} settings={settings} />
      <StoriesCarousel headline={home.storiesHeadline} stories={stories} />
      <HelpCallout settings={settings} />
      <CtaBand home={home} tone="ink" />
    </SiteShell>
  );
}
