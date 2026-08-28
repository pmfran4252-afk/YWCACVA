import type { Metadata } from "next";
import { notFound } from "next/navigation";

import SiteShell from "@/components/chrome/SiteShell";
import PageHero from "@/components/page/PageHero";
import Section from "@/components/page/Section";
import LinkCards from "@/components/page/LinkCards";
import SupportReminder from "@/components/page/SupportReminder";
import Prose from "@/components/page/Prose";
import Reveal from "@/components/motion/Reveal";
import { getPrograms, getSiteSettings } from "@/lib/content";
import { learnArticles } from "@/content/seed";
import { learnBodies } from "@/content/pages";
import { learnMedia, programMedia } from "@/content/media";

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return learnArticles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const article = learnArticles.find((a) => a.slug === slug);
  if (!article) return {};
  return { title: article.title, description: article.summary };
}

export default async function LearnArticlePage({ params }: Params) {
  const { slug } = await params;
  const article = learnArticles.find((a) => a.slug === slug);
  const body = learnBodies.find((b) => b.slug === slug);

  if (!article) notFound();

  const [settings, programs] = await Promise.all([getSiteSettings(), getPrograms()]);

  const related = programs.filter((p) =>
    (body?.relatedPrograms ?? []).includes(p.slug),
  );

  const others = learnArticles.filter((a) => a.slug !== slug).slice(0, 3);
  const media = learnMedia(slug);

  return (
    <SiteShell settings={settings} headerTone="dark">
      <PageHero
        eyebrow="Learn"
        title={article.title}
        lead={body?.intro ?? article.summary}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Learn", href: "/learn" },
        ]}
        notice={
          article.contentWarning
            ? "This page describes sexual violence directly. If that is more than you want to read right now, you can call an advocate instead. The number is at the top of every page."
            : undefined
        }
        primaryCta={{ label: "Get Help Now", href: "/get-help-now" }}
        glyph={media.glyph}
      />

      {/* Prose caps its measure near 68 characters, so the right of the
          section is free for the figure without crowding the copy. */}
      {body && (
        <Section
          tone="paper"
          id="article"
          figure={media.figure}
          figureSide="right"
          figureMobile="below"
        >
          <Reveal>
            <Prose>
              {body.sections.map((section) => (
                <section key={section.heading}>
                  <h2>{section.heading}</h2>
                  {section.paragraphs?.map((p) => <p key={p}>{p}</p>)}
                  {section.list && (
                    <ul>
                      {section.list.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </Prose>
          </Reveal>
        </Section>
      )}

      <SupportReminder settings={settings} tone="bone" />

      {related.length > 0 && (
        <Section
          eyebrow="How YWCA can help"
          title="Services connected to this"
          tone="paper"
          id="related-programs"
        >
          <LinkCards
            columns={3}
            cards={related.map((p) => ({
              title: p.title,
              description: p.summary,
              href: `/programs/${p.slug}`,
              meta: p.shortName,
              icon: programMedia(p.slug).icon,
            }))}
          />
        </Section>
      )}

      <Section eyebrow="Keep reading" title="Other topics" tone="bone" id="more">
        <LinkCards
          columns={3}
          cards={others.map((a) => ({
            title: a.title,
            description: a.summary,
            href: `/learn/${a.slug}`,
            icon: learnMedia(a.slug).icon,
          }))}
        />
      </Section>
    </SiteShell>
  );
}
