import type { Metadata } from "next";
import { notFound } from "next/navigation";

import SiteShell from "@/components/chrome/SiteShell";
import PageHero from "@/components/page/PageHero";
import Section from "@/components/page/Section";
import Prose from "@/components/page/Prose";
import LinkCards from "@/components/page/LinkCards";
import Reveal from "@/components/motion/Reveal";
import { getNews, getSiteSettings } from "@/lib/content";

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const posts = await getNews(50);
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const posts = await getNews(50);
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default async function NewsPostPage({ params }: Params) {
  const { slug } = await params;
  const [settings, posts] = await Promise.all([getSiteSettings(), getNews(50)]);
  const post = posts.find((p) => p.slug === slug);

  if (!post) notFound();

  const date = new Date(post.eventDate ?? post.publishedAt);
  const others = posts.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <SiteShell settings={settings} headerTone="dark">
      <PageHero
        eyebrow={date.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
        title={post.title}
        lead={post.excerpt}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "News", href: "/news" },
        ]}
      />

      <Section tone="paper" id="article">
        <Reveal>
          <Prose>
            {post.location && (
              <p>
                <strong>Location:</strong> {post.location}
              </p>
            )}
            <p>
              Full article content is managed in the CMS. Editors can add the
              body copy for this post in Sanity Studio under News &amp; Stories.
            </p>
          </Prose>
        </Reveal>
      </Section>

      <Section eyebrow="More" title="Recent updates" tone="bone" id="more">
        <LinkCards
          columns={3}
          cards={others.map((p) => ({
            title: p.title,
            description: p.excerpt,
            href: `/news/${p.slug}`,
          }))}
        />
      </Section>
    </SiteShell>
  );
}
