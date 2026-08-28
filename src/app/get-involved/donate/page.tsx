import type { Metadata } from "next";

import SiteShell from "@/components/chrome/SiteShell";
import PageHero from "@/components/page/PageHero";
import Section from "@/components/page/Section";
import Accordion from "@/components/page/Accordion";
import GivebutterWidget from "@/components/page/GivebutterWidget";
import Reveal from "@/components/motion/Reveal";
import Button from "@/components/ui/Button";
import { getSiteSettings } from "@/lib/content";
import { givingLevels } from "@/content/pages";

export const metadata: Metadata = {
  title: "Donate",
  description:
    "Support survivors across Central Virginia. Every gift funds crisis response, shelter, advocacy, and housing.",
};

export default async function DonatePage() {
  const settings = await getSiteSettings();

  return (
    <SiteShell settings={settings} headerTone="dark">
      <PageHero
        eyebrow="Donate"
        title="Every gift stays in Central Virginia."
        lead="Your donation funds the hotline, the shelters, the advocate who sits beside a survivor in court, and the rooms that let a woman start again."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Get Involved", href: "/get-involved" },
        ]}
        primaryCta={{ label: "Give Once", href: "#donate" }}
        secondaryCta={{ label: "Give Monthly", href: "#donate" }}
        glyph="gift"
      />

      {/* Givebutter hosts the whole payment flow, so nothing sensitive is
          handled here. Copy on the left, form on the right. */}
      <Section tone="paper" id="donate">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="eyebrow text-persimmon">Give now</p>
            <h2
              className="mt-4 font-display font-black text-ink-900"
              style={{ fontSize: "var(--text-h2)" }}
            >
              Donate to YWCA Central Virginia
            </h2>

            <p className="mt-6 max-w-[58ch] text-lg leading-relaxed text-ink-700">
              YWCA needs your help to continue the important work of eliminating
              racism and empowering women right here in Central Virginia. Your
              investment will help support YWCA programs that promote peace,
              justice, freedom and dignity for over 2 million women, girls, and
              their families.
            </p>

            <p className="mt-7 font-display text-lg font-bold text-ink-900">
              Your generosity enables YWCA Central Virginia to:
            </p>

            <ul className="mt-5 space-y-3.5">
              {[
                "provide safe shelter and support to survivors of domestic violence",
                "provide support to survivors of sexual assault",
                "provide a safe, monitored environment for supervised visitation",
                "provide safe and affordable housing for women",
                "provide education on racial justice",
                "advocate for human rights",
              ].map((item) => (
                <li
                  key={item}
                  className="flex gap-4 text-lg leading-relaxed text-ink-700"
                >
                  <span className="mt-2.5 size-2 shrink-0 rounded-full bg-persimmon" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal>
            <GivebutterWidget
              widgetId="gMEwNg"
              fallbackUrl="https://givebutter.com/ywcacva"
            />
          </Reveal>
        </div>
      </Section>

      <Section
        eyebrow="Your impact"
        title="What a gift covers"
        lead="Indicative figures based on the true cost of delivering these services."
        tone="ink"
        id="impact"
      >
        <Reveal stagger staggerAmount={0.06} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {givingLevels.map((g) => (
            <div
              key={g.amount}
              className="group rounded-2xl border border-white/12 bg-white/[0.04] p-7 transition-[border-color,background-color,transform] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:border-persimmon hover:bg-white/[0.07]"
            >
              <p className="font-display text-3xl font-black tabular-nums text-persimmon">
                {g.amount}
              </p>
              <p className="mt-3 text-[16px] leading-relaxed text-ink-300">
                {g.impact}
              </p>
            </div>
          ))}
        </Reveal>

        <Reveal className="mt-12">
          {/* Both scroll to the Givebutter form above; the frequency toggle
              lives at the top of the widget itself. */}
          <div className="flex flex-wrap gap-3">
            <Button href="#donate" variant="primary" size="lg">
              Give once
            </Button>
            <Button href="#donate" variant="outlineLight" size="lg">
              Give monthly
            </Button>
          </div>
          <p className="mt-5 max-w-[62ch] text-[14px] leading-relaxed text-ink-400">
            Online giving is processed securely by Givebutter. You can also post
            a cheque, or call us to give by phone.
          </p>
        </Reveal>
      </Section>

      <Section eyebrow="Other ways to give" title="Questions donors ask" tone="bone" id="faq">
        <Reveal>
          <Accordion
            items={[
              {
                title: "Can I give by cheque?",
                body: `Yes. Cheques can be posted to ${settings.address.street}, ${settings.address.city}, ${settings.address.state} ${settings.address.zip}. Contact us if you would like an acknowledgement for tax purposes.`,
              },
              {
                title: "Can I give in memory or in honour of someone?",
                body: "Yes. Get in touch and we will make sure the gift is recorded correctly and, where you would like, that the family is notified.",
              },
              {
                title: "Do you accept stock or legacy gifts?",
                body: "Yes. Contact our Development team to discuss appreciated securities, donor-advised funds, or leaving a gift in your will.",
              },
              {
                title: "Is my donation tax deductible?",
                body: "YWCA Central Virginia is a registered nonprofit. Contact us for our tax identification details and a receipt for your records.",
              },
              {
                title: "Can my company match my gift?",
                body: "Many employers match charitable donations. Ask your HR team, and we will provide whatever documentation they need.",
              },
            ]}
          />
        </Reveal>

        <Reveal className="mt-10">
          <Button href="/contact/general" variant="primary">
            Talk to our Development team
          </Button>
        </Reveal>
      </Section>
    </SiteShell>
  );
}
