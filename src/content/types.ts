/** Shapes mirror the Sanity schema exactly, so switching the data source
 *  from the seed to the CMS requires no component changes. */

export type Accent =
  | "persimmon"
  | "ink"
  | "cyan"
  | "gold"
  | "teal"
  | "mahogany";

export type Cta = { label: string; href: string };

/** Keys for the line icon set. Re-exported from the component so the icon
 *  registry stays the single source of truth. */
import type { LineIconName } from "@/components/ui/LineIcons";
export type { LineIconName };

/** Keys for the YWCA-supplied icon set (src/components/ui/BrandIcons.tsx). */
export type BrandIconName =
  | "call"
  | "chat"
  | "direction"
  | "health"
  | "nights"
  | "time"
  | "dress";

export type Hotline = {
  label: string;
  number: string;
  isPrimary?: boolean;
  note?: string;
};

export type SiteSettings = {
  organizationName: string;
  tagline: string;
  mission: string;
  foundedYear: number;
  hotlines: Hotline[];
  quickEscapeUrl: string;
  safetyNote: string;
  phone: string;
  email: string;
  address: { street: string; city: string; state: string; zip: string };
  donateUrl: string;
  socials: { platform: string; url: string }[];
};

export type ImpactHighlight = { value: string; label: string };

export type Program = {
  title: string;
  slug: string;
  shortName?: string;
  category: string;
  summary: string;
  whatWeDo: string[];
  servesWho?: string;
  impactHighlights: ImpactHighlight[];
  eligibility?: string[];
  accent: Accent;
  icon?: BrandIconName;
  featuredOnHome: boolean;
  order: number;
  image?: string;
  primaryCta?: Cta;
};

export type Pathway = {
  label: string;
  description: string;
  urgency: "immediate" | "support" | "info" | "help";
  destination: Cta;
  order: number;
};

export type ImpactStat = {
  value: number;
  icon?: LineIconName;
  prefix?: string;
  suffix?: string;
  label: string;
  context?: string;
  order: number;
};

export type Story = {
  quote: string;
  attribution: string;
  /** Which illustrated stand-in portrait to show. */
  portrait?: "one" | "two" | "three" | "four" | "five";
  locality?: string;
  coordinates?: { lat: number; lng: number };
  order: number;
};

export type NewsPost = {
  title: string;
  slug: string;
  category: "press-release" | "impact-story" | "blog" | "event";
  publishedAt: string;
  eventDate?: string;
  location?: string;
  excerpt: string;
  image?: string;
  featured?: boolean;
};

export type Person = {
  name: string;
  role: string;
  group: "leadership" | "board";
  officerRole?: string;
  order: number;
};

export type TimelineEvent = {
  dateLabel: string;
  sortYear: number;
  event: string;
  isMilestone?: boolean;
};

export type LearnArticle = {
  title: string;
  slug: string;
  summary: string;
  contentWarning?: boolean;
  order: number;
};

export type HomePage = {
  heroEyebrow: string;
  heroHeadline: string;
  heroSubhead: string;
  primaryCta: Cta;
  secondaryCta: Cta;
  missionHeadline: string;
  missionBody: string;
  finderHeadline: string;
  finderBody: string;
  programsHeadline: string;
  impactHeadline: string;
  storiesHeadline: string;
  ctaHeadline: string;
  ctaBody: string;
};

/** The second hero, whatever YWCA is running this month. */
export type MonthlySpotlight = {
  active: boolean;
  monthLabel: string;
  eyebrow: string;
  title: string;
  body: string;
  accent: Accent;
  icon?: BrandIconName;
  primaryCta?: Cta;
  secondaryCta?: Cta;
  stats?: { value: string; label: string }[];
};

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string; description?: string }[];
};
