import type { SchemaTypeDefinition } from "sanity";

import { cta, figure, richText } from "./objects";
import { siteSettings } from "./siteSettings";
import { program } from "./program";
import { homePage, impactStat, pathway } from "./homePage";
import { monthlySpotlight } from "./spotlight";
import {
  faq,
  learnArticle,
  newsPost,
  person,
  story,
  supportGroup,
  timelineEvent,
} from "./content";

export const schemaTypes: SchemaTypeDefinition[] = [
  // objects
  richText,
  figure,
  cta,
  // singletons
  siteSettings,
  homePage,
  monthlySpotlight,
  // collections
  program,
  pathway,
  impactStat,
  story,
  newsPost,
  person,
  timelineEvent,
  learnArticle,
  supportGroup,
  faq,
];

export const schema = { types: schemaTypes };
