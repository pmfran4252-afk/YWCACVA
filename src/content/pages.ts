/* ============================================================================
   INNER PAGE CONTENT
   ----------------------------------------------------------------------------
   Section structure follows the approved content workbook. Where the workbook
   specified a section but no approved copy ("list warning signs", "define
   abuse"), the text below is written in standard, trauma-informed,
   non-clinical language so there is something concrete to review.

   ⚠ EVERY DEFINITION AND SAFETY INSTRUCTION IN THE LEARN SECTION REQUIRES
     PROGRAM-LEAD SIGN-OFF BEFORE PUBLISHING. The workbook flags these
     specifically: "Program staff should approve all definitions", "Needs
     careful review before publishing", "Needs program and legal accuracy
     review". Treat this as a draft for staff to edit in the CMS, not as
     published YWCA positions.
   ========================================================================== */

export type Faq = { question: string; answer: string };

export type LearnBody = {
  slug: string;
  intro: string;
  sections: { heading: string; paragraphs?: string[]; list?: string[] }[];
  relatedPrograms: string[];
};

/* -------------------------------------------------------------------------- */

export const learnBodies: LearnBody[] = [
  {
    slug: "what-is-abuse",
    intro:
      "Abuse is a pattern of behavior used to gain and keep power and control over another person. It is not only physical, and it does not have to leave a mark to be serious.",
    sections: [
      {
        heading: "Forms abuse can take",
        list: [
          "Physical: hitting, restraining, blocking an exit, or any use of force.",
          "Emotional and psychological: belittling, threats, blame, isolation from friends and family.",
          "Verbal: shouting, name-calling, constant criticism.",
          "Financial: controlling money, running up debt in your name, preventing you from working.",
          "Digital: monitoring your phone or location, demanding passwords, tracking who you speak to.",
          "Sexual: any sexual contact you did not freely agree to, including within a relationship.",
        ],
      },
      {
        heading: "Domestic and intimate partner abuse",
        paragraphs: [
          "Domestic violence is abuse between people who live together or share a household. Intimate partner abuse is abuse by a current or former partner, whether or not you live together.",
          "Both can happen in any relationship regardless of age, income, marital status, gender, or how long you have been together.",
        ],
      },
      {
        heading: "Patterns and impacts",
        paragraphs: [
          "Abuse usually escalates over time and often follows a cycle: tension, an incident, then a calmer period that can make the situation feel survivable or recoverable.",
          "The effects reach beyond the moment: sleep, health, work, finances, and the wellbeing of children in the home are all commonly affected. None of it is a sign of weakness, and none of it is your fault.",
        ],
      },
    ],
    relatedPrograms: ["domestic-violence-prevention", "court-advocacy", "housing"],
  },
  {
    slug: "what-is-sexual-assault",
    intro:
      "Sexual assault is any sexual contact or behavior that happens without your freely given consent. It is never the fault of the person it happened to.",
    sections: [
      {
        heading: "What it can include",
        list: [
          "Unwanted touching of any kind.",
          "Being pressured, threatened, or coerced into sexual contact.",
          "Sexual contact when you were asleep, unconscious, or unable to consent.",
          "Sexual contact within a marriage or relationship that you did not agree to.",
        ],
      },
      {
        heading: "About consent",
        paragraphs: [
          "Consent is a clear, freely given yes. It can be withdrawn at any point, and a yes to one thing is not a yes to anything else.",
          "Consent cannot be given by someone who is asleep, unconscious, incapacitated, or under threat. Silence is not consent, and neither is a previous relationship.",
        ],
      },
      {
        heading: "You have options",
        paragraphs: [
          "You do not have to report to law enforcement to get support, and you do not have to decide anything today. Our advocates can talk through what is available: medical care, a forensic exam, reporting, or simply someone to talk to, and support whatever you choose.",
        ],
      },
    ],
    relatedPrograms: ["sexual-assault-response", "court-advocacy"],
  },
  {
    slug: "what-is-rape",
    intro:
      "This page contains direct information about rape. If reading it feels like too much right now, that is a reasonable response. You can call an advocate instead, at any hour.",
    sections: [
      {
        heading: "What rape means",
        paragraphs: [
          "Rape is non-consensual penetration obtained by force, threat, or when a person is unable to consent. Virginia law defines the offence specifically; an advocate can explain how it applies to your situation without you having to make any decision.",
          "It is committed by strangers, acquaintances, partners and spouses alike. Most survivors know the person who assaulted them.",
        ],
      },
      {
        heading: "If you need help now",
        list: [
          "If you are in immediate danger, call 911.",
          "Consider medical care. A hospital can treat injuries and address health concerns whether or not you report.",
          "A forensic exam is available at Centra Lynchburg General, and one of our advocates can be with you for it.",
          "Preserving evidence keeps options open, but a decision not to is equally valid.",
          "Call our 24/7 line to talk it through with someone before deciding anything.",
        ],
      },
    ],
    relatedPrograms: ["sexual-assault-response", "court-advocacy"],
  },
  {
    slug: "warning-signs",
    intro:
      "Abuse rarely starts with violence. It usually starts with behavior that can be mistaken for intensity, protectiveness, or love.",
    sections: [
      {
        heading: "Signs worth paying attention to",
        list: [
          "They check your phone, messages, or location, or want your passwords.",
          "You have become distant from friends and family, and it did not feel like your choice.",
          "You change what you say or do to avoid setting them off.",
          "They control money, transport, or whether you can work.",
          "They blame you for their anger, or say you provoked it.",
          "Threats toward you, themselves, children, or pets.",
          "Jealousy and accusations framed as caring about you.",
        ],
      },
      {
        heading: "If this sounds familiar",
        paragraphs: [
          "Recognizing a pattern does not commit you to anything. You can call and talk it through with an advocate without giving your name, and without any obligation to act.",
          "If you are planning to leave, a safety plan matters. The period around leaving carries the highest risk. We can help you build one.",
        ],
      },
    ],
    relatedPrograms: ["domestic-violence-prevention", "court-advocacy"],
  },
  {
    slug: "safety-planning",
    intro:
      "A safety plan is a practical set of steps for staying safer, whether you are staying, preparing to leave, or have already left.",
    sections: [
      {
        heading: "What a plan usually covers",
        list: [
          "Somewhere to go, and how you would get there at short notice.",
          "A bag kept somewhere safe with ID, medication, and essentials for you and any children.",
          "Copies of important documents held by someone you trust.",
          "A code word for friends, family, or children that means call for help.",
          "Which rooms to avoid during an argument: kitchens, bathrooms, and anywhere with only one exit.",
          "How to use a phone or computer the other person cannot access.",
        ],
      },
      {
        heading: "Building one with an advocate",
        paragraphs: [
          "Our advocates build safety plans with survivors every day, 1,710 of them last year alone. A plan is tailored to your situation, and having one costs you nothing and commits you to nothing.",
        ],
      },
    ],
    relatedPrograms: ["domestic-violence-prevention", "court-advocacy", "housing"],
  },
  {
    slug: "how-to-help",
    intro:
      "If you are worried about someone, the most useful thing you can offer is to stay in their life without conditions.",
    sections: [
      {
        heading: "What helps",
        list: [
          "Believe them, and say so plainly.",
          "Say the abuse is not their fault.",
          "Ask what they need rather than telling them what to do.",
          "Keep inviting them, even when they cannot come.",
          "Offer something concrete: a ride, childcare, somewhere to keep a bag.",
          "Learn the local options so you can share them if asked.",
        ],
      },
      {
        heading: "What tends not to help",
        list: [
          "Ultimatums, or making your support conditional on them leaving.",
          "Criticizing the person who is hurting them. It often closes the conversation.",
          "Acting on their behalf without asking. It can raise the risk to them.",
          "Pressing for details they have not offered.",
        ],
      },
      {
        heading: "Look after yourself too",
        paragraphs: [
          "Supporting someone through this is heavy. You can call our line for guidance on how to help, even when the person you are worried about is not ready to call for themselves.",
        ],
      },
    ],
    relatedPrograms: ["domestic-violence-prevention", "sexual-assault-response"],
  },
  {
    slug: "how-to-talk-to-child",
    intro:
      "These conversations are easier when they start early, stay ordinary, and happen more than once.",
    sections: [
      {
        heading: "Starting the conversation",
        list: [
          "Use plain, correct words for bodies from the beginning.",
          "Teach that no one should ask them to keep secrets about touching.",
          "Talk about red flags and green flags in friendships, not only in romance.",
          "Make it clear they will not be in trouble for telling you something.",
          "Return to it as they grow. One talk is not enough.",
        ],
      },
      {
        heading: "Red flags and green flags",
        paragraphs: [
          "Green flags: a friend who respects a no, who is glad when they spend time with other people, who apologises and changes.",
          "Red flags: someone who makes them prove loyalty, who gets angry when they say no, who wants them all to themselves.",
        ],
      },
    ],
    relatedPrograms: ["sexual-assault-response"],
  },
  {
    slug: "myths-and-facts",
    intro:
      "Common beliefs about abuse and assault get in the way of people asking for help. Here is what is actually true.",
    sections: [
      {
        heading: "Myths and facts",
        list: [
          "Myth: if it were really that bad, they would leave. Fact: leaving is the most dangerous period, and it takes most survivors several attempts.",
          "Myth: abuse means physical violence. Fact: financial, emotional and digital control are abuse, and often come first.",
          "Myth: it only happens in certain kinds of families. Fact: it happens across every income, background, and neighborhood in this region.",
          "Myth: most assaults are committed by strangers. Fact: most survivors know the person who assaulted them.",
          "Myth: reporting is the only way to get help. Fact: our services do not require a police report.",
        ],
      },
    ],
    relatedPrograms: ["domestic-violence-prevention", "sexual-assault-response"],
  },
  {
    slug: "healthy-relationships",
    intro:
      "It is easier to recognize what is wrong when you have a clear picture of what respect actually looks like day to day.",
    sections: [
      {
        heading: "What healthy looks like",
        list: [
          "You can disagree without it becoming frightening.",
          "You both keep your own friendships, interests and money.",
          "A no is accepted the first time.",
          "Apologies come with changed behavior, not just words.",
          "You feel more like yourself in the relationship, not less.",
        ],
      },
      {
        heading: "Repair, not perfection",
        paragraphs: [
          "Every relationship has conflict. The difference is what happens afterward: whether there is accountability and repair, or blame and a return to the same pattern.",
        ],
      },
    ],
    relatedPrograms: ["domestic-violence-prevention"],
  },
];

/* -------------------------------------------------------------------------- */

export const supportGroups = [
  {
    name: "Domestic Violence Survivors Group",
    audience: "Adults who have experienced domestic violence",
    description:
      "A confidential group for survivors at any stage: still in the relationship, recently out, or years on.",
    cadence: "Weekly",
    howToJoin: "Contact us to talk with a facilitator before your first session.",
    cta: { label: "How to join a group", href: "#join" },
  },
  {
    name: "Sexual Assault Survivors Group",
    audience: "Adult survivors of sexual assault",
    description:
      "A supportive space facilitated by SARP advocates, with no requirement to have reported or to share anything you would rather not.",
    cadence: "Weekly",
    howToJoin: "Contact SARP to be matched with the right group.",
    cta: { label: "About SARP advocates", href: "/programs/sexual-assault-response" },
  },
  {
    name: "Support for Families and Friends",
    audience: "People supporting someone they care about",
    description:
      "For anyone holding the weight of someone else's situation and unsure how to help without making it worse.",
    cadence: "Monthly",
    howToJoin: "Contact us for the next available session.",
    cta: { label: "How to join a group", href: "#join" },
  },
];

/* -------------------------------------------------------------------------- */

export const faqs: Faq[] = [
  {
    question: "Do I have to give my name when I call?",
    answer:
      "No. You can call the hotline without identifying yourself, and you can ask questions without agreeing to anything.",
  },
  {
    question: "Do I have to report to the police to get help?",
    answer:
      "No. Our services do not require a police report. Advocates will explain your options and support whichever you choose.",
  },
  {
    question: "Is there a cost for your services?",
    answer:
      "Crisis services, advocacy, shelter and support groups are provided at no cost. Our affordable housing program charges rent, listed on the Housing page.",
  },
  {
    question: "Can I bring my children to the shelter?",
    answer:
      "Yes. Our shelters accommodate women and children together. Call the hotline and an advocate will talk through what is available.",
  },
  {
    question: "What if I am not sure my situation counts?",
    answer:
      "Call anyway. You do not need to have decided what to name it, and you do not need to be in crisis to talk to someone.",
  },
];

/* -------------------------------------------------------------------------- */

export const helpSteps = [
  {
    icon: "phone" as const,
    title: "Call or reach out",
    body: "Our hotline is answered by a trained advocate every hour of every day. You can also use the contact form for non-urgent questions.",
    href: "/get-help-now",
    linkLabel: "Get help now",
  },
  {
    icon: "chat" as const,
    title: "Talk it through",
    body: "An advocate listens and explains what is available. Nothing is decided for you, and nothing has to happen because you called.",
    href: "/contact/general",
    linkLabel: "Contact us",
  },
  {
    icon: "route" as const,
    title: "Make a plan together",
    body: "That might be a safety plan, a shelter place, a court advocate, or a housing application, whatever fits your situation.",
    href: "/programs",
    linkLabel: "View programs",
  },
  {
    icon: "heart" as const,
    title: "Keep the support",
    body: "Advocacy does not end after the first call. Many of the people we work with stay in touch for months or years.",
    href: "/support-groups",
    linkLabel: "View support groups",
  },
];

export const volunteerRoles = [
  {
    title: "SARP hospital advocate",
    description:
      "Accompany survivors during forensic exams at Centra Lynchburg General. Training and on-call scheduling provided.",
    meta: "Training required",
  },
  {
    title: "Shelter support",
    description:
      "Help with day-to-day operations at Sadler House and Frannie's House, from meals to donations sorting.",
    meta: "Flexible hours",
  },
  {
    title: "Church Street Bridal",
    description:
      "Help brides find a dress in the boutique whose proceeds fund both our shelters.",
    meta: "Weekend shifts",
  },
  {
    title: "Events and outreach",
    description:
      "Support awareness events across Lynchburg and the surrounding counties throughout the year.",
    meta: "Seasonal",
  },
];

export const givingLevels = [
  { amount: "$25", impact: "Covers a night of safe shelter for one person." },
  { amount: "$50", impact: "Supports an advocate through a hospital accompaniment." },
  { amount: "$100", impact: "Funds a week of case management for a family." },
  { amount: "$250", impact: "Helps a survivor secure a protective order." },
  { amount: "$500", impact: "Sustains a month of 24/7 hotline coverage." },
];

export const wishlist = [
  "Non-perishable food",
  "Cleaning supplies",
  "Hygiene and personal care items",
  "New bedding and towels",
  "Children's clothing",
  "Gift cards for groceries and fuel",
];
