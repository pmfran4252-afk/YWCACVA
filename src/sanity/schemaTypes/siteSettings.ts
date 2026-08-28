import { CogIcon } from "@sanity/icons/Cog";
import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  icon: CogIcon,
  groups: [
    { name: "crisis", title: "Crisis & Safety" },
    { name: "org", title: "Organization" },
    { name: "social", title: "Social" },
  ],
  fields: [
    defineField({
      name: "organizationName",
      type: "string",
      group: "org",
      initialValue: "YWCA Central Virginia",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "tagline",
      type: "string",
      group: "org",
      description: "Short line used under the logo in the footer.",
    }),
    defineField({
      name: "mission",
      type: "text",
      rows: 3,
      group: "org",
      description: "Approved mission statement. Use exact wording.",
    }),
    defineField({
      name: "foundedYear",
      type: "number",
      group: "org",
      initialValue: 1912,
    }),

    /* --- Crisis & safety: the highest-stakes content on the site --- */
    defineField({
      name: "hotlines",
      title: "Crisis Hotlines",
      type: "array",
      group: "crisis",
      description:
        "Verify every number with program leadership before publishing. These render on every page.",
      of: [
        defineField({
          name: "hotline",
          type: "object",
          fields: [
            defineField({ name: "label", type: "string", validation: (r) => r.required() }),
            defineField({
              name: "number",
              type: "string",
              description: "Display format, e.g. 888-528-1041",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "isPrimary",
              type: "boolean",
              description: "The primary line shown in the header bar.",
              initialValue: false,
            }),
            defineField({ name: "note", type: "string", description: "e.g. 24/7/365" }),
          ],
          preview: {
            select: { title: "label", subtitle: "number" },
          },
        }),
      ],
    }),
    defineField({
      name: "quickEscapeUrl",
      title: "Quick Escape destination",
      type: "url",
      group: "crisis",
      initialValue: "https://www.google.com/search?q=weather",
      description:
        "Where the Quick Escape button sends the visitor. Should look unremarkable in a browser history.",
    }),
    defineField({
      name: "safetyNote",
      type: "text",
      rows: 3,
      group: "crisis",
      description: "Browser-safety guidance shown on Get Help Now.",
    }),

    /* --- Contact --- */
    defineField({ name: "phone", type: "string", group: "org" }),
    defineField({ name: "email", type: "string", group: "org" }),
    defineField({
      name: "address",
      type: "object",
      group: "org",
      fields: [
        defineField({ name: "street", type: "string" }),
        defineField({ name: "city", type: "string" }),
        defineField({ name: "state", type: "string" }),
        defineField({ name: "zip", type: "string" }),
      ],
    }),
    defineField({
      name: "donateUrl",
      type: "url",
      group: "org",
      description: "Givebutter donation page.",
    }),
    defineField({
      name: "socials",
      type: "array",
      group: "social",
      of: [
        defineField({
          name: "social",
          type: "object",
          fields: [
            defineField({
              name: "platform",
              type: "string",
              options: {
                list: ["Facebook", "Instagram", "LinkedIn", "X", "YouTube"],
              },
            }),
            defineField({ name: "url", type: "url" }),
          ],
          preview: { select: { title: "platform", subtitle: "url" } },
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Site Settings" }),
  },
});
