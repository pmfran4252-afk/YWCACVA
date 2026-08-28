import { createClient, type SanityClient } from "next-sanity";

import { apiVersion, dataset, projectId, sanityEnabled } from "../env";

export const client: SanityClient | null = sanityEnabled
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
      perspective: "published",
      stega: false,
    })
  : null;

/**
 * Runs a GROQ query when Sanity is configured, otherwise resolves to the
 * provided fallback. Any transport/permission failure also falls back rather
 * than taking the page down, for this site, a stale hotline number rendering
 * is far better than a 500 on the page someone is using to find help.
 */
export async function sanityFetch<T>(
  query: string,
  fallback: T,
  params: Record<string, unknown> = {},
  tags: string[] = [],
): Promise<T> {
  if (!client) return fallback;
  try {
    const result = await client.fetch<T>(query, params, {
      next: { revalidate: 60, tags },
    });
    if (result === null || result === undefined) return fallback;
    if (Array.isArray(result) && result.length === 0) return fallback;
    return result;
  } catch (error) {
    console.error("[sanity] query failed, using seeded content:", error);
    return fallback;
  }
}
