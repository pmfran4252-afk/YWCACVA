import { defineArrayMember, defineField, defineType } from "sanity";

/** Portable Text configured for the tone this site needs: no decorative
 *  clutter, but real semantic headings and callouts. */
export const richText = defineType({
  name: "richText",
  title: "Rich Text",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "Heading", value: "h2" },
        { title: "Subheading", value: "h3" },
        { title: "Quote", value: "blockquote" },
      ],
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Numbered", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Bold", value: "strong" },
          { title: "Italic", value: "em" },
        ],
        annotations: [
          defineArrayMember({
            name: "link",
            type: "object",
            title: "Link",
            fields: [
              defineField({ name: "href", type: "string", validation: (r) => r.required() }),
              defineField({ name: "newTab", type: "boolean", initialValue: false }),
            ],
          }),
        ],
      },
    }),
    defineArrayMember({ type: "figure" }),
    defineArrayMember({
      type: "object",
      name: "callout",
      title: "Callout",
      fields: [
        defineField({ name: "text", type: "text", rows: 3 }),
        defineField({
          name: "tone",
          type: "string",
          options: { list: ["support", "safety", "info"] },
          initialValue: "support",
        }),
        defineField({ name: "cta", type: "cta" }),
      ],
      preview: { select: { title: "text", subtitle: "tone" } },
    }),
  ],
});

export const figure = defineType({
  name: "figure",
  title: "Image",
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      type: "string",
      title: "Alt text",
      description: "Describe the image for screen readers. Required unless purely decorative.",
    }),
    defineField({ name: "caption", type: "string" }),
  ],
});

/** The YWCA-supplied icon set, offered as a picklist wherever a mark is used. */
export const BRAND_ICON_OPTIONS = [
  { title: "Phone / hotline", value: "call" },
  { title: "Chat / advocacy", value: "chat" },
  { title: "Two-way arrows / exchange", value: "direction" },
  { title: "Medical cross / health", value: "health" },
  { title: "Moon / nights", value: "nights" },
  { title: "Clock / around the clock", value: "time" },
  { title: "Dress / bridal", value: "dress" },
];

export const cta = defineType({
  name: "cta",
  title: "Call to action",
  type: "object",
  fields: [
    defineField({ name: "label", type: "string" }),
    defineField({ name: "href", type: "string", description: "Internal path (/programs) or full URL." }),
  ],
  preview: { select: { title: "label", subtitle: "href" } },
});
