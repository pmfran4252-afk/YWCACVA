import Image from "next/image";

import SafeLink from "@/components/ui/SafeLink";

import Reveal from "@/components/motion/Reveal";
import type { NewsPost } from "@/content/types";

const CATEGORY_LABEL: Record<NewsPost["category"], string> = {
  "press-release": "Press Release",
  "impact-story": "Impact Story",
  blog: "Update",
  event: "Event",
};

const fmt = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

export default function NewsRow({
  posts,
  tone = "light",
}: {
  posts: NewsPost[];
  tone?: "light" | "bone";
}) {
  return (
    <section
      className={`py-20 md:py-28 ${tone === "bone" ? "bg-bone" : "bg-paper"}`}
      aria-labelledby="news-heading"
    >
      <div className="container-page">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow text-persimmon">What&rsquo;s happening</p>
            <h2
              id="news-heading"
              className="mt-4 font-display font-black text-ink-900"
              style={{ fontSize: "var(--text-h2)" }}
            >
              Upcoming events &amp; news
            </h2>
          </div>
          <SafeLink
            href="/news"
            className="group inline-flex items-center gap-2 text-[15px] font-semibold text-ink-900"
          >
            View all
            <span className="grid size-8 place-items-center rounded-full border border-ink-200 transition-all duration-400 ease-[var(--ease-out-expo)] group-hover:border-persimmon group-hover:bg-persimmon group-hover:text-white">
              <svg
                viewBox="0 0 16 16"
                fill="none"
                className="size-3.5"
                aria-hidden="true"
              >
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </SafeLink>
        </Reveal>

        {/* Scroll-snap rail on mobile, grid from md up */}
        <Reveal
          stagger
          className="hide-scrollbar mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-2 md:overflow-visible lg:grid-cols-4"
        >
          {posts.map((post) => (
            <SafeLink
              key={post.slug}
              href={`/news/${post.slug}`}
              className="group flex w-[78vw] shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-ink-100 bg-paper transition-[transform,box-shadow,border-color] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1.5 hover:border-transparent hover:shadow-[var(--shadow-lift)] sm:w-[62vw] md:w-auto"
            >
              {post.image && (
                <div className="relative aspect-[16/10] shrink-0 overflow-hidden bg-ink-100">
                  {/* Decorative: the headline immediately below is the link
                      text, so announcing the picture too would just repeat it. */}
                  <Image
                    src={post.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 78vw"
                    className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.06]"
                  />
                </div>
              )}

              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-2.5">
                  <span className="eyebrow rounded-full bg-persimmon-100 px-2.5 py-1 text-[10px] text-persimmon-700">
                    {CATEGORY_LABEL[post.category]}
                  </span>
                  <span className="text-[13px] text-ink-400">
                    {fmt(post.eventDate ?? post.publishedAt)}
                  </span>
                </div>

                <h3 className="mt-5 font-display text-lg font-bold leading-snug text-ink-900 transition-colors duration-300 group-hover:text-persimmon">
                  {post.title}
                </h3>
                <p className="mt-2.5 line-clamp-3 flex-1 text-[15px] leading-relaxed text-ink-500">
                  {post.excerpt}
                </p>

                {post.location && (
                  <p className="mt-4 flex items-center gap-1.5 text-[13px] text-ink-500">
                    <svg
                      viewBox="0 0 16 16"
                      fill="none"
                      className="size-3.5 text-persimmon"
                      aria-hidden="true"
                    >
                      <path
                        d="M8 14s5-4.2 5-8A5 5 0 0 0 3 6c0 3.8 5 8 5 8Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                      <circle cx="8" cy="6" r="1.6" fill="currentColor" />
                    </svg>
                    {post.location}
                  </p>
                )}

                <span className="mt-5 flex items-center gap-1.5 text-[14px] font-semibold text-ink-900">
                  Learn more
                  <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    className="size-3.5 transition-transform duration-400 ease-[var(--ease-out-expo)] group-hover:translate-x-1"
                    aria-hidden="true"
                  >
                    <path
                      d="M3 8h10M9 4l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
            </SafeLink>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
