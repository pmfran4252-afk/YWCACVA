import type { StructureResolver } from "sanity/structure";
import { BookIcon } from "@sanity/icons/Book";
import { CalendarIcon } from "@sanity/icons/Calendar";
import { CogIcon } from "@sanity/icons/Cog";
import { CommentIcon } from "@sanity/icons/Comment";
import { DocumentTextIcon } from "@sanity/icons/DocumentText";
import { HeartIcon } from "@sanity/icons/Heart";
import { HelpCircleIcon } from "@sanity/icons/HelpCircle";
import { HomeIcon } from "@sanity/icons/Home";
import { StarIcon } from "@sanity/icons/Star";
import { RocketIcon } from "@sanity/icons/Rocket";
import { TrendUpwardIcon } from "@sanity/icons/TrendUpward";
import { UsersIcon } from "@sanity/icons/Users";

/** Singletons are pinned to the top; everything else is a normal collection. */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("YWCA Central Virginia")
    .items([
      S.listItem()
        .title("Site Settings")
        .icon(CogIcon)
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
      S.listItem()
        .title("Home Page")
        .icon(HomeIcon)
        .child(S.document().schemaType("homePage").documentId("homePage")),
      S.listItem()
        .title("Monthly Spotlight")
        .icon(StarIcon)
        .child(
          S.document().schemaType("monthlySpotlight").documentId("monthlySpotlight"),
        ),
      S.divider(),
      S.documentTypeListItem("program").title("Programs").icon(HeartIcon),
      S.documentTypeListItem("pathway").title("Support Pathways").icon(RocketIcon),
      S.documentTypeListItem("supportGroup").title("Support Groups").icon(UsersIcon),
      S.divider(),
      S.documentTypeListItem("impactStat").title("Impact Statistics").icon(TrendUpwardIcon),
      S.documentTypeListItem("story").title("Stories of Hope").icon(CommentIcon),
      S.documentTypeListItem("newsPost").title("News & Stories").icon(DocumentTextIcon),
      S.divider(),
      S.documentTypeListItem("learnArticle").title("Learn Articles").icon(BookIcon),
      S.documentTypeListItem("faq").title("FAQs").icon(HelpCircleIcon),
      S.divider(),
      S.documentTypeListItem("person").title("People").icon(UsersIcon),
      S.documentTypeListItem("timelineEvent").title("Timeline").icon(CalendarIcon),
    ]);
