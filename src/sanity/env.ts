export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-10-01";

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";

/**
 * The site ships with a complete, typed content seed so it renders correctly
 * before a Sanity project exists. The moment NEXT_PUBLIC_SANITY_PROJECT_ID is
 * set, every query switches to live CMS content with no code changes.
 */
export const sanityEnabled = Boolean(projectId);

export const studioUrl = "/studio";
