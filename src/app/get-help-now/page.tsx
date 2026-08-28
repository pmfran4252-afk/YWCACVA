import type { Metadata } from "next";

import SafeLink from "@/components/ui/SafeLink";

import SiteShell from "@/components/chrome/SiteShell";
import PageHero from "@/components/page/PageHero";
import Section from "@/components/page/Section";
import Steps from "@/components/page/Steps";
import LinkCards from "@/components/page/LinkCards";
import Reveal from "@/components/motion/Reveal";
import HeroGlyph from "@/components/page/HeroGlyph";
import { AlertLine } from "@/components/ui/LineIcons";
import { getPrograms, getSiteSettings } from "@/lib/content";
import { helpSteps } from "@/content/pages";
import { programMedia } from "@/content/media";

export const metadata: Metadata = {
  title: "Get Help Now",
  description:
    "24/7 crisis hotlines, emergency shelter, and advocacy for survivors of domestic violence and sexual assault across Central Virginia.",
};

const digits = (n: string) => n.replace(/[^\d]/g, "");

/**
 * The most important page on the site. The content plan marks every section
 * here Critical, so the numbers come before any explanation, the language
 * assumes nothing about what the visitor has decided, and the browser-safety
 * note is honest about what a website can and cannot hide.
 */
export default async function GetHelpNowPage() {
  const [settings, programs] = await Promise.all([getSiteSettings(), getPrograms()]);

  return (
    <SiteShell settings={settings} headerTone="dark">
      <PageHero
        eyebrow="Answered 24 hours a day, every day"
        title="Help is available right now."
        lead="You can call to ask a question, to talk through options, or because you are not sure what to do next. You do not have to know what you want to happen. If you are in immediate danger, call 911."
        crumbs={[{ label: "Home", href: "/" }]}
        glyph="phone"
      />

      {/* --- Hotlines, above everything else --- */}
      <section className="bg-ink-900 pb-16 md:pb-24" aria-label="Crisis hotlines">
        <div className="container-page">
          <Reveal stagger className="grid gap-4 md:grid-cols-2">
            {settings.hotlines.map((h) => (
              <a
                key={h.number}
                href={`tel:${digits(h.number)}`}
                className="group flex items-center justify-between gap-6 rounded-3xl bg-persimmon p-8 text-white transition-transform duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1 md:p-10"
              >
                <span>
                  <span className="block text-[13px] font-semibold uppercase tracking-[0.14em] text-white/85">
                    {h.label}
                  </span>
                  <span className="mt-3 block font-display text-3xl font-black tabular-nums leading-none md:text-5xl">
                    {h.number}
                  </span>
                  {h.note && (
                    <span className="mt-3 block text-[15px] text-white/85">
                      {h.note}
                    </span>
                  )}
                </span>

                <span className="grid size-14 shrink-0 place-items-center rounded-full bg-white/20 transition-colors duration-400 group-hover:bg-white group-hover:text-persimmon md:size-16">
                  <svg viewBox="0 0 24 24" fill="none" className="size-7" aria-hidden="true">
                    <path
                      d="M6.5 3h3l1.5 4-2 1.5a12 12 0 0 0 6.5 6.5l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4.5 5.2 2 2 0 0 1 6.5 3Z"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </a>
            ))}
          </Reveal>

          <Reveal>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <EmergencyCard
                title="Call 911"
                body="If you or someone else is in immediate danger."
                href="tel:911"
              />
              <EmergencyCard
                title="Text or call 988"
                body="Suicide and Crisis Lifeline, available 24/7."
                href="tel:988"
              />
              <EmergencyCard
                title="Non-urgent questions"
                body="Send a message and we will reply to a safe contact method."
                href="/contact/general"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* --- What happens when you reach out --- */}
      <Section
        eyebrow="What to expect"
        title="What happens when you contact us"
        lead="No part of this commits you to anything. You set the pace."
        tone="paper"
        id="what-happens"
      >
        <Steps steps={helpSteps} />
      </Section>

      {/* --- Route to the right program --- */}
      <Section
        eyebrow="Where to go next"
        title="Support by situation"
        tone="bone"
        id="programs"
      >
        <LinkCards
          columns={3}
          cards={programs.map((p) => ({
            title: p.title,
            description: p.summary,
            href: `/programs/${p.slug}`,
            meta: p.shortName,
            icon: programMedia(p.slug).icon,
          }))}
        />
      </Section>

      {/* --- Browsing safety: deliberately plain about the limits --- */}
      <Section tone="ink" id="safety">
        {/* Large faded lock, drawn in as the section is reached. */}
        <HeroGlyph name="lock" side="right" reveal="scroll" />

        <Reveal>
          <div className="max-w-[68ch]">
            <p className="eyebrow flex items-center gap-2.5 text-gold">
              <AlertLine className="size-5" />
              Staying safe online
            </p>
            <h2
              id="safety-heading"
              className="mt-4 flex items-start gap-4 font-display font-black"
              style={{ fontSize: "var(--text-h2)" }}
            >
              <AlertLine className="mt-1 size-10 shrink-0 text-gold md:size-12" />
              <span>If someone might see what you are looking at</span>
            </h2>

            <div className="mt-7 space-y-5 text-lg leading-relaxed text-ink-300">
              <p>
                The <strong className="font-semibold text-white">Quick Exit</strong>{" "}
                button leaves this site immediately, and pressing{" "}
                <kbd className="rounded bg-white/10 px-2 py-0.5 text-[15px]">Esc</kbd>{" "}
                twice does the same. Once you have left, the Back button will not
                bring you back here.
              </p>
              <p>
                What no website can do is erase your browser&rsquo;s own history,
                its saved passwords, or its address-bar suggestions. If someone
                has access to your device, the safest option is to use a
                different one: a library computer, or a phone they do not have
                access to.
              </p>
              <p>
                Private or incognito browsing keeps a session out of your history
                on most devices, but it does not hide activity from monitoring
                software installed on the device itself.
              </p>
            </div>

            <p className="mt-8 rounded-2xl border border-white/12 bg-white/[0.04] px-6 py-5 text-[15px] leading-relaxed text-ink-300">
              {settings.safetyNote}
            </p>
          </div>
        </Reveal>
      </Section>
    </SiteShell>
  );
}

function EmergencyCard({
  title,
  body,
  href,
}: {
  title: string;
  body: string;
  href: string;
}) {
  // tel: links must stay plain anchors; internal routes go through SafeLink
  // so they keep the single-history-entry guarantee.
  const Tag = href.startsWith("tel:") ? "a" : SafeLink;

  return (
    <Tag
      href={href}
      className="group flex items-start justify-between gap-4 rounded-2xl border border-white/12 bg-white/[0.03] p-6 transition-colors duration-400 hover:border-persimmon hover:bg-white/[0.06]"
    >
      <span>
        <span className="block font-display text-lg font-bold text-white">
          {title}
        </span>
        <span className="mt-1.5 block text-[15px] leading-relaxed text-ink-400">
          {body}
        </span>
      </span>
      <span className="grid size-9 shrink-0 place-items-center rounded-full border border-white/20 text-white transition-all duration-400 group-hover:border-persimmon group-hover:bg-persimmon">
        <svg viewBox="0 0 16 16" fill="none" className="size-3.5" aria-hidden="true">
          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </Tag>
  );
}
