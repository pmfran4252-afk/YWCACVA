import type { Metadata } from "next";

import SiteShell from "@/components/chrome/SiteShell";
import PageHero from "@/components/page/PageHero";
import Section from "@/components/page/Section";
import Reveal from "@/components/motion/Reveal";
import SafeLink from "@/components/ui/SafeLink";
import { getNews, getSiteSettings } from "@/lib/content";
import type { NewsPost } from "@/content/types";

export const metadata: Metadata = {
  title: "News & Stories",
  description:
    "Press releases, impact stories, events, and updates from YWCA Central Virginia.",
};

const CATEGORY_LABEL: Record<NewsPost["category"], string> = {
  "press-release": "Press Release",
  "impact-story": "Impact Story",
  blog: "Update",
  event: "Event",
};

export default async function NewsPage() {
  const [settings, posts] = await Promise.all([getSiteSettings(), getNews(24)]);

  return (
    <SiteShell settings={settings} headerTone="dark">
      <PageHero
        eyebrow="News & stories"
        title="What's happening at YWCA Central Virginia."
        lead="Events, announcements, and stories about the work happening across Lynchburg and the surrounding counties."
        crumbs={[{ label: "Home", href: "/" }]}
        glyph="calendar"
      />

      <Section tone="paper" id="listing">
        <Reveal stagger staggerAmount={0.05}>
          {posts.map((post) => {
            const date = new Date(post.eventDate ?? post.publishedAt);
            return (
              <SafeLink
                key={post.slug}
                href={`/news/${post.slug}`}
                className="group grid gap-x-8 gap-y-2 border-t border-ink-100 py-8 transition-colors duration-400 last:border-b hover:bg-bone md:grid-cols-[8rem_1fr_auto] md:items-baseline"
              >
                <time
                  dateTime={date.toISOString()}
                  className="flex items-baseline gap-2 font-display text-ink-400 md:block"
                >
                  <span className="block text-3xl font-black leading-none tabular-nums text-ink-900 transition-colors duration-400 group-hover:text-persimmon">
                    {date.getDate()}
                  </span>
                  <span className="text-[13px] font-semibold uppercase tracking-[0.1em]">
                    {date.toLocaleDateString("en-US", { month: "short" })}{" "}
                    {date.getFullYear()}
                  </span>
                </time>

                <div>
                  <span className="eyebrow text-persimmon">
                    {CATEGORY_LABEL[post.category]}
                  </span>
                  <h2 className="mt-2 max-w-[44ch] font-display text-xl font-bold leading-snug text-ink-900 md:text-2xl">
                    {post.title}
                  </h2>
                  <p className="mt-2 max-w-[64ch] text-[16px] leading-relaxed text-ink-500">
                    {post.excerpt}
                  </p>
                  {post.location && (
                    <p className="mt-3 text-[14px] text-ink-400">{post.location}</p>
                  )}
                </div>

                <span className="grid size-11 shrink-0 place-items-center rounded-full border border-ink-200 text-ink-900 transition-all duration-400 ease-[var(--ease-out-expo)] group-hover:border-persimmon group-hover:bg-persimmon group-hover:text-white">
                  <svg viewBox="0 0 16 16" fill="none" className="size-4" aria-hidden="true">
                    <path d="M4 12L12 4M12 4H5.5M12 4v6.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </SafeLink>
            );
          })}
        </Reveal>
      </Section>
    </SiteShell>
  );
}
