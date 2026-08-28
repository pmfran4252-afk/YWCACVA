import Image from "next/image";

import Reveal from "@/components/motion/Reveal";
import Button from "@/components/ui/Button";
import type { HomePage, SiteSettings } from "@/content/types";

/**
 * Mission Snapshot, section 2 of the approved home page structure. Answers
 * "who are these people?" for a donor or partner in about eight seconds.
 */
export default function MissionSnapshot({
  home,
  settings,
}: {
  home: HomePage;
  settings: SiteSettings;
}) {
  return (
    <section className="bg-paper py-20 md:py-28" aria-labelledby="mission-heading">
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-7">
          <p className="eyebrow text-persimmon">Who we are</p>
          <h2
            id="mission-heading"
            className="mt-4 font-display font-black text-ink-900"
            style={{ fontSize: "var(--text-h2)" }}
          >
            {home.missionHeadline}
          </h2>

          <p className="mt-6 max-w-[62ch] text-lg leading-relaxed text-ink-600">
            {home.missionBody}
          </p>

          <blockquote className="mt-9 border-l-2 border-persimmon pl-6">
            <p className="font-display text-lg font-bold leading-snug text-ink-900 md:text-xl">
              &ldquo;{settings.mission}&rdquo;
            </p>
          </blockquote>

          <div className="mt-9 flex flex-wrap gap-3">
            <Button href="/about" variant="outline">
              Learn more about us
            </Button>
            <Button href="/about/mission-history" variant="ghost" bare>
              Our history since 1912
            </Button>
          </div>
        </Reveal>

        <Reveal className="lg:col-span-5">
          <figure className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
              <Image
                src="/img/women-talking.jpg"
                alt="Two women in conversation at YWCA Central Virginia"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>

            {/* Founded badge */}
            <div className="absolute -bottom-5 -left-4 flex items-center gap-4 rounded-2xl bg-persimmon px-6 py-5 text-white shadow-[var(--shadow-lift)] md:-left-8">
              <p className="font-display text-4xl font-black leading-none">
                {new Date().getFullYear() - settings.foundedYear}
              </p>
              <p className="w-[9rem] text-[13px] leading-snug text-white/85">
                years serving Central Virginia
              </p>
            </div>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
