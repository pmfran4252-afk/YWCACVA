import { sanityFetch } from "@/sanity/lib/client";
import * as seed from "@/content/seed";
import type {
  HomePage,
  MonthlySpotlight,
  ImpactStat,
  NewsPost,
  Pathway,
  Person,
  Program,
  SiteSettings,
  Story,
  TimelineEvent,
} from "@/content/types";

/* GROQ projections mirror the seed shapes field-for-field, so components
   never learn which source the data came from. */

const IMAGE = `"image": image.asset->url`;

export const getSiteSettings = () =>
  sanityFetch<SiteSettings>(
    `*[_type == "siteSettings"][0]{
      organizationName, tagline, mission, foundedYear,
      hotlines[]{label, number, isPrimary, note},
      quickEscapeUrl, safetyNote, phone, email,
      address{street, city, state, zip},
      donateUrl, socials[]{platform, url}
    }`,
    seed.siteSettings,
    {},
    ["siteSettings"],
  );

export const getHomePage = () =>
  sanityFetch<HomePage>(
    `*[_type == "homePage"][0]{
      heroEyebrow, heroHeadline, heroSubhead,
      primaryCta, secondaryCta,
      missionHeadline, missionBody,
      finderHeadline, finderBody,
      programsHeadline, impactHeadline, storiesHeadline,
      ctaHeadline, ctaBody
    }`,
    seed.homePage,
    {},
    ["homePage"],
  );

export const getMonthlySpotlight = () =>
  sanityFetch<MonthlySpotlight | null>(
    `*[_type == "monthlySpotlight"][0]{
      active, monthLabel, eyebrow, title, body, accent, icon,
      primaryCta, secondaryCta, stats[]{value, label}
    }`,
    seed.monthlySpotlight,
    {},
    ["monthlySpotlight"],
  );

export const getPrograms = () =>
  sanityFetch<Program[]>(
    `*[_type == "program"] | order(order asc){
      title, "slug": slug.current, shortName, category, summary,
      whatWeDo, servesWho,
      impactHighlights[]{value, label},
      eligibility, accent, icon, featuredOnHome, order,
      ${IMAGE},
      primaryCta
    }`,
    seed.programs,
    {},
    ["program"],
  );

export const getPathways = () =>
  sanityFetch<Pathway[]>(
    `*[_type == "pathway"] | order(order asc){
      label, description, urgency, destination, order
    }`,
    seed.pathways,
    {},
    ["pathway"],
  );

export const getImpactStats = () =>
  sanityFetch<ImpactStat[]>(
    `*[_type == "impactStat"] | order(order asc){
      value, prefix, suffix, label, context, icon, order
    }`,
    seed.impactStats,
    {},
    ["impactStat"],
  );

export const getStories = () =>
  sanityFetch<Story[]>(
    `*[_type == "story"] | order(order asc){
      quote, attribution, portrait, locality, coordinates{lat, lng}, order
    }`,
    seed.stories,
    {},
    ["story"],
  );

export const getNews = (limit = 6) =>
  sanityFetch<NewsPost[]>(
    `*[_type == "newsPost"] | order(publishedAt desc)[0...$limit]{
      title, "slug": slug.current, category, publishedAt, eventDate,
      location, excerpt, featured, ${IMAGE}
    }`,
    seed.newsPosts.slice(0, limit),
    { limit },
    ["newsPost"],
  );

export const getPeople = (group: "leadership" | "board") =>
  sanityFetch<Person[]>(
    `*[_type == "person" && group == $group] | order(order asc){
      name, role, group, officerRole, order
    }`,
    group === "leadership" ? seed.leadership : seed.board,
    { group },
    ["person"],
  );

export const getTimeline = () =>
  sanityFetch<TimelineEvent[]>(
    `*[_type == "timelineEvent"] | order(sortYear asc){
      dateLabel, sortYear, event, isMilestone
    }`,
    seed.timeline,
    {},
    ["timelineEvent"],
  );

/** Navigation is structural, not editorial, it stays in code. */
export const navigation = seed.navigation;

/** All data a home page variant needs, in one round trip. */
export async function getHomeData() {
  const [settings, home, spotlight, programs, pathways, stats, stories, news] =
    await Promise.all([
      getSiteSettings(),
      getHomePage(),
      getMonthlySpotlight(),
      getPrograms(),
      getPathways(),
      getImpactStats(),
      getStories(),
      getNews(4),
    ]);

  return {
    settings,
    home,
    spotlight,
    programs: programs.filter((p) => p.featuredOnHome),
    pathways,
    stats,
    stories,
    news,
  };
}

export type HomeData = Awaited<ReturnType<typeof getHomeData>>;
