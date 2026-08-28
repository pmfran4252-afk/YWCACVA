import Image from "next/image";

import Reveal from "@/components/motion/Reveal";
import Button from "@/components/ui/Button";
import type { HomePage, SiteSettings } from "@/content/types";

export default function MissionV3({
  home,
  settings,
}: {
  home: HomePage;
  settings: SiteSettings;
}) {
  return (
    <section className="bg-ink-900 py-20 text-white md:py-28" aria-labelledby="mission-v3">
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
        <Reveal className="lg:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
            <Image
              src="/img/women-talking.jpg"
              alt="Two women in conversation at YWCA Central Virginia"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-900/70 to-transparent" />
          </div>
        </Reveal>

        <Reveal className="lg:col-span-7">
          <p className="eyebrow text-persimmon">Who we are</p>
          <h2
            id="mission-v3"
            className="mt-4 font-display font-black"
            style={{ fontSize: "var(--text-h2)" }}
          >
            {home.missionHeadline}
          </h2>

          <p className="mt-6 max-w-[60ch] text-lg leading-relaxed text-ink-300">
            {home.missionBody}
          </p>

          <blockquote className="mt-9 border-l-2 border-persimmon pl-6">
            <p className="max-w-[52ch] font-display text-lg font-bold leading-snug md:text-xl">
              &ldquo;{settings.mission}&rdquo;
            </p>
          </blockquote>

          <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-white/12 pt-8 sm:grid-cols-4">
            {[
              { v: `${new Date().getFullYear() - settings.foundedYear}`, l: "years of service" },
              { v: "8", l: "counties served" },
              { v: "400k+", l: "residents in our area" },
              { v: "24/7", l: "crisis response" },
            ].map((s) => (
              <div key={s.l}>
                <dt className="sr-only">{s.l}</dt>
                <dd>
                  <span className="block font-display text-3xl font-black tabular-nums leading-none">
                    {s.v}
                  </span>
                  <span className="mt-2 block text-[13px] leading-snug text-ink-400">
                    {s.l}
                  </span>
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-10 flex flex-wrap gap-3">
            <Button href="/about" variant="primary">
              About YWCA Central Virginia
            </Button>
            <Button href="/about/mission-history" variant="outlineLight">
              Our history since 1912
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
