import { BookIcon } from "@sanity/icons/Book";
import { CalendarIcon } from "@sanity/icons/Calendar";
import { CommentIcon } from "@sanity/icons/Comment";
import { DocumentTextIcon } from "@sanity/icons/DocumentText";
import { HelpCircleIcon } from "@sanity/icons/HelpCircle";
import { UserIcon } from "@sanity/icons/User";
import { UsersIcon } from "@sanity/icons/Users";
import { defineArrayMember, defineField, defineType } from "sanity";

/* ---------------------------------------------------------------
   Stories of Hope, survivor testimony. Privacy is a hard constraint:
   first name or initial only, and location is a broad locality.
   --------------------------------------------------------------- */
export const story = defineType({
  name: "story",
  title: "Story of Hope",
  type: "document",
  icon: CommentIcon,
  fields: [
    defineField({
      name: "quote",
      type: "text",
      rows: 4,
      validation: (r) => r.required().max(400),
    }),
    defineField({
      name: "attribution",
      type: "string",
      description: "First name or initial only. Never a full name.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "locality",
      type: "string",
      description: "Broad area only (e.g. “Amherst County”). Never an address.",
    }),
    defineField({
      name: "coordinates",
      type: "object",
      description: "Approximate map placement for the Stories map. Keep it imprecise.",
      fields: [
        defineField({ name: "lat", type: "number" }),
        defineField({ name: "lng", type: "number" }),
      ],
    }),
    defineField({ name: "relatedProgram", type: "reference", to: [{ type: "program" }] }),
    defineField({ name: "order", type: "number" }),
  ],
  preview: { select: { title: "attribution", subtitle: "quote" } },
});

/* --------------------------------------------------------------- */
export const newsPost = defineType({
  name: "newsPost",
  title: "News & Story",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "category",
      type: "string",
      options: {
        list: [
          { title: "Press Release", value: "press-release" },
          { title: "Impact Story", value: "impact-story" },
          { title: "Blog / Update", value: "blog" },
          { title: "Event", value: "event" },
        ],
      },
      initialValue: "blog",
    }),
    defineField({ name: "publishedAt", type: "datetime", validation: (r) => r.required() }),
    defineField({ name: "eventDate", type: "datetime", description: "For events only." }),
    defineField({ name: "location", type: "string", description: "For events only." }),
    defineField({ name: "excerpt", type: "text", rows: 3, validation: (r) => r.max(280) }),
    defineField({ name: "image", type: "figure" }),
    defineField({ name: "body", type: "richText" }),
    defineField({ name: "featured", type: "boolean", initialValue: false }),
  ],
  orderings: [
    { name: "newest", title: "Newest first", by: [{ field: "publishedAt", direction: "desc" }] },
  ],
  preview: { select: { title: "title", subtitle: "category", media: "image" } },
});

/* --------------------------------------------------------------- */
export const person = defineType({
  name: "person",
  title: "Person",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "role", type: "string" }),
    defineField({
      name: "group",
      type: "string",
      options: {
        list: [
          { title: "Leadership", value: "leadership" },
          { title: "Board of Directors", value: "board" },
        ],
      },
      initialValue: "leadership",
    }),
    defineField({
      name: "officerRole",
      type: "string",
      description: "Board officers only: President, Vice President, Treasurer, Secretary.",
    }),
    defineField({ name: "bio", type: "text", rows: 4 }),
    defineField({ name: "photo", type: "figure" }),
    defineField({ name: "order", type: "number" }),
  ],
  preview: { select: { title: "name", subtitle: "role", media: "photo" } },
});

/* --------------------------------------------------------------- */
export const timelineEvent = defineType({
  name: "timelineEvent",
  title: "Timeline Milestone",
  type: "document",
  icon: CalendarIcon,
  fields: [
    defineField({
      name: "dateLabel",
      type: "string",
      description: "As displayed, e.g. “May 1912” or “1978”.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "sortYear",
      type: "number",
      description: "Numeric year used for ordering.",
      validation: (r) => r.required(),
    }),
    defineField({ name: "event", type: "text", rows: 3, validation: (r) => r.required() }),
    defineField({
      name: "isMilestone",
      type: "boolean",
      description: "Highlight this as a major turning point.",
      initialValue: false,
    }),
    defineField({ name: "image", type: "figure" }),
  ],
  orderings: [
    { name: "chronological", title: "Chronological", by: [{ field: "sortYear", direction: "asc" }] },
  ],
  preview: { select: { title: "dateLabel", subtitle: "event" } },
});

/* --------------------------------------------------------------- */
export const learnArticle = defineType({
  name: "learnArticle",
  title: "Learn Article",
  type: "document",
  icon: BookIcon,
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({ name: "summary", type: "text", rows: 3, validation: (r) => r.max(280) }),
    defineField({
      name: "contentWarning",
      type: "boolean",
      description: "Show a content notice above the article.",
      initialValue: false,
    }),
    defineField({ name: "body", type: "richText" }),
    defineField({
      name: "relatedPrograms",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "program" }] })],
    }),
    defineField({ name: "order", type: "number" }),
  ],
  preview: { select: { title: "title", subtitle: "summary" } },
});

/* --------------------------------------------------------------- */
export const supportGroup = defineType({
  name: "supportGroup",
  title: "Support Group",
  type: "document",
  icon: UsersIcon,
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "description", type: "text", rows: 3 }),
    defineField({ name: "audience", type: "string", description: "Who the group is for." }),
    defineField({
      name: "cadence",
      type: "string",
      description: "General cadence only (e.g. “Weekly”). Never publish exact times or locations.",
    }),
    defineField({ name: "howToJoin", type: "text", rows: 3 }),
    defineField({ name: "order", type: "number" }),
  ],
  preview: { select: { title: "name", subtitle: "audience" } },
});

/* --------------------------------------------------------------- */
export const faq = defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
  icon: HelpCircleIcon,
  fields: [
    defineField({ name: "question", type: "string", validation: (r) => r.required() }),
    defineField({ name: "answer", type: "richText" }),
    defineField({
      name: "topic",
      type: "string",
      options: { list: ["Getting Help", "Programs", "Housing", "Volunteering", "Giving", "General"] },
      initialValue: "General",
    }),
    defineField({ name: "order", type: "number" }),
  ],
  preview: { select: { title: "question", subtitle: "topic" } },
});
