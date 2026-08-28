import type { Metadata } from "next";

import SiteShell from "@/components/chrome/SiteShell";
import PageHero from "@/components/page/PageHero";
import Section from "@/components/page/Section";
import LinkCards from "@/components/page/LinkCards";
import Steps from "@/components/page/Steps";
import { getSiteSettings } from "@/lib/content";
import { volunteerRoles } from "@/content/pages";

export const metadata: Metadata = {
  title: "Volunteer",
  description:
    "Volunteer with YWCA Central Virginia: hospital advocacy, shelter support, Church Street Bridal, and community events.",
};

export default async function VolunteerPage() {
  const settings = await getSiteSettings();

  return (
    <SiteShell settings={settings} headerTone="dark">
      <PageHero
        eyebrow="Volunteer"
        title="Show up for someone on the worst night of their life."
        lead="Volunteers sit with survivors during forensic exams, keep our shelters running, help brides find a dress that funds those shelters, and carry this work into the community."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Get Involved", href: "/get-involved" },
        ]}
        primaryCta={{ label: "Register interest", href: "/contact/general" }}
        glyph="users"
      />

      <Section eyebrow="Roles" title="Where volunteers are needed" tone="paper" id="roles">
        <LinkCards
          columns={2}
          cards={volunteerRoles.map((r, i) => ({
            title: r.title,
            description: r.description,
            href: "/contact/general",
            meta: r.meta,
            icon: (["heart", "home", "gift", "users"] as const)[i % 4],
          }))}
        />
      </Section>

      <Section
        eyebrow="What to expect"
        title="How volunteering starts"
        lead="Training is provided for every role, and nothing puts you in front of a survivor before you are ready."
        tone="bone"
        id="process"
      >
        <Steps
          steps={[
            {
              icon: "mail" as const,
              title: "Register interest",
              body: "Tell us what draws you and roughly how much time you have. There is no minimum commitment to inquire.",
              href: "/contact/general",
              linkLabel: "Register interest",
            },
            {
              icon: "chat" as const,
              title: "Conversation",
              body: "We talk through the roles, what each involves, and what support you would have.",
            },
            {
              icon: "book" as const,
              title: "Training",
              body: "Role-specific training, including trauma-informed practice and confidentiality. SARP advocates receive additional preparation.",
            },
            {
              icon: "spark" as const,
              title: "Get started",
              body: "You are scheduled into shifts or an on-call rota that fits around your life, with a staff contact throughout.",
            },
          ]}
        />
      </Section>
    </SiteShell>
  );
}
