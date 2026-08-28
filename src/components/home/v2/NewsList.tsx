import SafeLink from "@/components/ui/SafeLink";

import Reveal from "@/components/motion/Reveal";
import type { NewsPost } from "@/content/types";

const CATEGORY_LABEL: Record<NewsPost["category"], string> = {
  "press-release": "Press Release",
  "impact-story": "Impact Story",
  blog: "Update",
  event: "Event",
};

export default function NewsList({ posts }: { posts: NewsPost[] }) {
  return (
    <section className="bg-paper py-20 md:py-28" aria-labelledby="news-v2">
      <div className="container-page">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow text-persimmon">What&rsquo;s happening</p>
            <h2
              id="news-v2"
              className="mt-4 font-display font-black text-ink-900"
              style={{ fontSize: "var(--text-h2)" }}
            >
              Upcoming events &amp; news
            </h2>
          </div>
          <SafeLink
            href="/news"
            className="group inline-flex items-center gap-2 pb-1 text-[15px] font-semibold text-ink-900"
          >
            View all
            <span className="grid size-8 place-items-center rounded-full border border-ink-200 transition-all duration-400 ease-[var(--ease-out-expo)] group-hover:border-persimmon group-hover:bg-persimmon group-hover:text-white">
              <svg viewBox="0 0 16 16" fill="none" className="size-3.5" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </SafeLink>
        </Reveal>

        <Reveal stagger staggerAmount={0.06} className="mt-12">
          {posts.map((post) => {
            const date = new Date(post.eventDate ?? post.publishedAt);
            return (
              <SafeLink
                key={post.slug}
                href={`/news/${post.slug}`}
                className="group grid gap-x-8 gap-y-2 border-t border-ink-100 py-7 transition-colors duration-400 last:border-b hover:bg-bone md:grid-cols-[7rem_1fr_auto] md:items-baseline md:py-8"
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
                  <h3 className="mt-2 max-w-[40ch] font-display text-xl font-bold leading-snug text-ink-900 md:text-2xl">
                    {post.title}
                  </h3>
                  <p className="mt-2 max-w-[62ch] text-[15px] leading-relaxed text-ink-500">
                    {post.excerpt}
                  </p>
                  {post.location && (
                    <p className="mt-3 text-[13px] text-ink-400">{post.location}</p>
                  )}
                </div>

                <span className="grid size-10 shrink-0 place-items-center rounded-full border border-ink-200 text-ink-900 transition-all duration-400 ease-[var(--ease-out-expo)] group-hover:border-persimmon group-hover:bg-persimmon group-hover:text-white">
                  <svg viewBox="0 0 16 16" fill="none" className="size-4" aria-hidden="true">
                    <path d="M4 12L12 4M12 4H5.5M12 4v6.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </SafeLink>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
