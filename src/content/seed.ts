/* ============================================================================
   SEEDED CONTENT, YWCA Central Virginia
   ----------------------------------------------------------------------------
   Sourced from the approved content workbook (YWCA Website.xlsx), the brand
   book, and the redesign brief. Shapes match the Sanity schema exactly.

   ⚠ VERIFY BEFORE LAUNCH, the workbook flags these as unconfirmed:
     • every hotline and phone number ("Verify every number and instruction")
     • the street address ("Confirm public location details")
     • the Givebutter donation URL ("Insert final Givebutter link")
   Impact numbers below are the verified 2025 figures from the workbook.
   ========================================================================== */

import type {
  HomePage,
  ImpactStat,
  LearnArticle,
  NavItem,
  NewsPost,
  MonthlySpotlight,
  Pathway,
  Person,
  Program,
  SiteSettings,
  Story,
  TimelineEvent,
} from "./types";

export const siteSettings: SiteSettings = {
  organizationName: "YWCA Central Virginia",
  tagline: "Eliminating racism. Empowering women.",
  mission:
    "YWCA Central Virginia is dedicated to eliminating racism, empowering women, and promoting peace, justice, freedom, and dignity for all.",
  foundedYear: 1912,
  hotlines: [
    {
      label: "Domestic Violence Hotline",
      number: "888-528-1041",
      isPrimary: true,
      note: "24/7/365",
    },
    {
      label: "Sexual Assault Hotline",
      number: "888-947-7273",
      note: "24/7/365",
    },
  ],
  quickEscapeUrl: "https://www.google.com/search?q=weather+forecast",
  safetyNote:
    "If you are worried someone may see what you are looking at, use a device they cannot access and close this page when you need to. Pressing Escape twice, or using the Quick Exit button, will leave this site immediately.",
  phone: "(434) 528-1041",
  email: "info@ywcacva.org",
  address: {
    street: "626 Church Street",
    city: "Lynchburg",
    state: "VA",
    zip: "24504",
  },
  donateUrl: "/get-involved/donate",
  socials: [
    { platform: "Facebook", url: "https://www.facebook.com/ywcacva" },
    { platform: "Instagram", url: "https://www.instagram.com/ywcacva" },
    { platform: "LinkedIn", url: "https://www.linkedin.com/company/ywcacva" },
  ],
};

/* -------------------------------------------------------------------------- */

export const navigation: NavItem[] = [
  {
    label: "About",
    href: "/about",
    children: [
      { label: "Mission & History", href: "/about/mission-history", description: "A legacy of service since 1912" },
      { label: "Leadership", href: "/about/leadership", description: "The team advancing our mission" },
      { label: "Board of Directors", href: "/about/board-of-directors", description: "Governance and stewardship" },
    ],
  },
  {
    label: "Learn",
    href: "/learn",
    children: [
      { label: "What Is Abuse?", href: "/learn/what-is-abuse" },
      { label: "What Is Sexual Assault?", href: "/learn/what-is-sexual-assault" },
      { label: "Warning Signs", href: "/learn/warning-signs" },
      { label: "Safety Planning", href: "/learn/safety-planning" },
      { label: "How to Help Someone", href: "/learn/how-to-help" },
      { label: "Healthy Relationships", href: "/learn/healthy-relationships" },
    ],
  },
  {
    label: "Programs",
    href: "/programs",
    children: [
      { label: "Domestic Violence Prevention", href: "/programs/domestic-violence-prevention", description: "24/7 hotline, shelter, advocacy" },
      { label: "Sexual Assault Response", href: "/programs/sexual-assault-response", description: "Hospital accompaniment and support" },
      { label: "Court Advocacy", href: "/programs/court-advocacy", description: "Protective orders and safety planning" },
      { label: "Housing", href: "/programs/housing", description: "Safe, affordable housing since 1912" },
      { label: "Visitation", href: "/programs/visitation", description: "Federally accredited visitation center" },
      { label: "Church Street Bridal", href: "/programs/church-bridal", description: "Every dress funds our shelters" },
    ],
  },
  { label: "Support Groups", href: "/support-groups" },
  {
    label: "Get Involved",
    href: "/get-involved",
    children: [
      { label: "Donate", href: "/get-involved/donate" },
      { label: "Volunteer", href: "/get-involved/volunteer" },
    ],
  },
  { label: "News", href: "/news" },
  { label: "Contact", href: "/contact" },
  // Last in the list so the mobile menu shows it after Contact. The desktop
  // bar pulls it out and renders it as a bag icon beside Donate instead.
  { label: "Shop", href: "/shop" },
];

/* -------------------------------------------------------------------------- */

export const homePage: HomePage = {
  heroEyebrow: "Serving Central Virginia since 1912",
  heroHeadline: "Opening windows changes more than one life.",
  heroSubhead: "This is where possibility begins.",
  primaryCta: { label: "Get Help Now", href: "/get-help-now" },
  secondaryCta: { label: "Get Involved", href: "/get-involved" },
  missionHeadline: "Rooted in community. Committed to change.",
  missionBody:
    "YWCA Central Virginia is a nonprofit serving women, children, and families across Lynchburg and seven surrounding counties, an area of more than 400,000 residents. For over a century we have been both a safety net and a catalyst for change, helping people move from crisis to stability while working to transform the systems that shape equity and opportunity in this region.",
  finderHeadline: "Find the right support for you",
  finderBody:
    "Choose what best matches your situation and we will guide you to the right resources. If you are in immediate danger, call 911.",
  programsHeadline: "Services YWCA provides",
  impactHeadline: "Our impact in the community",
  storiesHeadline: "Stories of hope",
  ctaHeadline: "What kind of community do you want to build?",
  ctaBody:
    "When you partner with YWCA, we stand together to address sexual assault, homelessness, human dignity, equity, racism, and domestic violence right where we live.",
};

/* --------------------------------------------------------------------------
   Monthly spotlight, the second hero. Editors swap this each month from the
   Studio; setting `active: false` removes the section entirely.
   -------------------------------------------------------------------------- */

export const monthlySpotlight: MonthlySpotlight = {
  active: true,
  monthLabel: "This month at YWCA",
  eyebrow: "Rising Together, October 19 to 23, 2026",
  title: "Week Without Violence",
  body:
    "Centering young voices to end gender-based violence. Every October, YWCA joins World YWCA and communities around the world for a week of action. Across Central Virginia that means schools, campuses, and neighbors showing up together. Join us.",
  // Teal and gold are the campaign's own colors and both sit in the brand
  // book's chart palette, so this reads as YWCA rather than as a bolt-on.
  accent: "teal",
  icon: "chat",
  primaryCta: { label: "Join us", href: "/get-involved" },
  secondaryCta: { label: "See all events", href: "/news" },
  stats: [
    { value: "5", label: "days of action" },
    { value: "8", label: "counties taking part" },
    { value: "#WWV26", label: "join the conversation" },
  ],
};

/* -------------------------------------------------------------------------- */

export const pathways: Pathway[] = [
  {
    label: "I'm not safe where I am.",
    description: "Immediate safety, shelter, and a 24/7 advocate.",
    urgency: "immediate",
    destination: { label: "Get help now", href: "/get-help-now" },
    order: 1,
  },
  {
    label: "Something happened to me.",
    description: "Confidential support after assault or abuse, whenever you're ready.",
    urgency: "support",
    destination: { label: "Sexual Assault Response", href: "/programs/sexual-assault-response" },
    order: 2,
  },
  {
    label: "I need somewhere to live.",
    description: "Safe, affordable, long-term housing for women.",
    urgency: "support",
    destination: { label: "Housing", href: "/programs/housing" },
    order: 3,
  },
  {
    label: "I have to go to court.",
    description: "Protective orders, safety plans, and an advocate beside you.",
    urgency: "support",
    destination: { label: "Court Advocacy", href: "/programs/court-advocacy" },
    order: 4,
  },
  {
    label: "I'm worried about someone else.",
    description: "How to recognize the signs and start the conversation.",
    urgency: "info",
    destination: { label: "How to help someone", href: "/learn/how-to-help" },
    order: 5,
  },
  {
    label: "I want to help.",
    description: "Give, volunteer, or partner with us.",
    urgency: "help",
    destination: { label: "Get involved", href: "/get-involved" },
    order: 6,
  },
];

/* -------------------------------------------------------------------------- */

export const impactStats: ImpactStat[] = [
  { value: 6341, icon: "phone", label: "Hotline calls answered", context: "in 2025", order: 1 },
  { value: 11680, icon: "home", label: "Nights of affordable housing provided", context: "to women rebuilding", order: 2 },
  { value: 4282, icon: "shield", label: "Nights of shelter for women and children", context: "escaping domestic violence", order: 3 },
  { value: 1710, icon: "route", label: "Safety plans created with survivors", context: "domestic violence and sexual assault", order: 4 },
  { value: 337, icon: "scales", label: "Protective orders obtained", context: "across the region's courts", order: 5 },
  { value: 4, prefix: "$", suffix: "M+", icon: "dress", label: "Raised through Church Street Bridal", context: "funding our shelters since 2004", order: 6 },
];

/* -------------------------------------------------------------------------- */

export const programs: Program[] = [
  {
    title: "Domestic Violence Prevention Program",
    slug: "domestic-violence-prevention",
    shortName: "DVPP",
    category: "Survivor Services",
    summary:
      "Confidential support, advocacy, and a professionally staffed hotline answered every hour of every day, plus two certified shelters for women and children leaving violence.",
    whatWeDo: [
      "Operate a professionally staffed 24/7/365 hotline for those experiencing domestic violence and sexual assault.",
      "Operate two VSDVAA-certified shelters: Sadler House (24 beds, Lynchburg) and Frannie's House (8 beds, Campbell County).",
      "Deliver training to police, healthcare professionals, courts, and community partners.",
      "Provide safe housing, case management, transportation, and wrap-around services.",
      "Provide community outreach across the City of Lynchburg and surrounding counties.",
    ],
    servesWho: "Survivors of domestic violence, families, referral partners, community members",
    impactHighlights: [
      { value: "6,341", label: "hotline calls answered in 2025" },
      { value: "4,282", label: "nights of shelter provided" },
      { value: "5,693", label: "hours of support and case management" },
      { value: "50", label: "officers and court professionals trained" },
    ],
    accent: "persimmon",
    icon: "call",
    featuredOnHome: true,
    order: 1,
    primaryCta: { label: "Get Help Now", href: "/get-help-now" },
  },
  {
    title: "Sexual Assault Response Program",
    slug: "sexual-assault-response",
    shortName: "SARP",
    category: "Survivor Services",
    summary:
      "An advocate at the hospital, in the courtroom, and for as long as it takes, partnering with forensic nurses at Centra Lynchburg General and the Child Advocacy Centers.",
    whatWeDo: [
      "Partner with police and forensic nurses at Centra Lynchburg General to support survivors during forensic exams.",
      "Support survivors throughout the process, appearing in court and providing continuing support services.",
      "Collaborate with the Child Advocacy Centers of Lynchburg and Bedford to support child survivors.",
      "Offer support groups, counseling, and guidance on court advocacy and medical care.",
    ],
    servesWho: "Survivors of sexual assault, hospitals, referral partners, volunteers",
    impactHighlights: [
      { value: "261", label: "forensic examinations attended" },
      { value: "394", label: "adults and children served" },
      { value: "1,697", label: "hours of survivor support provided" },
      { value: "90%", label: "of survivors received court advocacy" },
    ],
    accent: "cyan",
    icon: "health",
    featuredOnHome: true,
    order: 2,
    primaryCta: { label: "Get Help Now", href: "/get-help-now" },
  },
  {
    title: "Court Advocacy",
    slug: "court-advocacy",
    category: "Advocacy Services",
    summary:
      "Nobody should walk into a courtroom alone. Advocates help survivors navigate protective orders, court proceedings, and safety planning.",
    whatWeDo: [
      "Inform and liaise with community partners on protective orders and court proceedings.",
      "Create safety plans to prepare for emergencies.",
      "Work closely with the State's Attorney, Child Protective Services, local police, and Witness Protective Services across Lynchburg and the counties of Appomattox, Amherst, Campbell, and Nelson.",
    ],
    servesWho: "Survivors, clients, families, referral partners",
    impactHighlights: [
      { value: "337", label: "protective orders obtained" },
      { value: "1,710", label: "safety plans created" },
    ],
    accent: "gold",
    icon: "chat",
    featuredOnHome: true,
    order: 3,
    primaryCta: { label: "Contact Us", href: "/contact/general" },
  },
  {
    title: "Housing",
    slug: "housing",
    category: "Housing Services",
    summary:
      "Safe, low-cost, long-term housing for women, offered without interruption since 1912. Thirty-five furnished rooms in downtown Lynchburg.",
    whatWeDo: [
      "Provide safe, low-cost, long-term housing for women since 1912.",
      "Offer an affordable path to a new start for survivors of domestic violence.",
      "Maintain 35 fully furnished rooms with community kitchen and laundry.",
      "Operate Carolyn's Closet, providing clothing for residents and families at our shelters.",
    ],
    servesWho: "Women seeking stable, affordable housing",
    eligibility: [
      "Proof of verifiable income",
      "Able to live in community living",
      "Drug free and smoke free",
      "No pets",
      "Single women",
      "Independent and mobile",
    ],
    impactHighlights: [
      { value: "11,680", label: "nights of affordable housing provided" },
      { value: "35", label: "furnished rooms" },
      { value: "$350", label: "small room, per month" },
    ],
    accent: "teal",
    icon: "nights",
    featuredOnHome: true,
    order: 4,
    primaryCta: { label: "Contact Us", href: "/contact/general" },
  },
  {
    title: "Visitation",
    slug: "visitation",
    category: "Family Services",
    summary:
      "One of only two federally accredited visitation centers in Virginia, and the only one within a three-hour radius: a safe, child-focused place for families.",
    whatWeDo: [
      "Operate one of only two federally accredited visitation centers in Virginia.",
      "Offer court-mandated, safe, child-focused environments for family visitation.",
      "Ensure non-custodial parents can spend time with their children in a safe, monitored setting.",
    ],
    servesWho: "Families, caregivers, children, court and agency partners",
    impactHighlights: [
      { value: "64", label: "families supported" },
      { value: "523", label: "monitored visitation sessions" },
      { value: "27", label: "safe family exchanges facilitated" },
    ],
    accent: "mahogany",
    icon: "direction",
    featuredOnHome: true,
    order: 5,
    primaryCta: { label: "Contact Us", href: "/contact/general" },
  },
  {
    title: "Church Street Bridal",
    slug: "church-bridal",
    category: "Community / Fundraising",
    summary:
      "A full-service bridal boutique where every dress sold funds our shelters. Over $4 million raised for women and children in crisis since 2004.",
    whatWeDo: [
      "Sell new bridal apparel donated by top designers at greatly reduced prices.",
      "Provide prom and wedding party apparel at greatly reduced prices.",
      "Provide tuxedo rental.",
      "Direct 100% of proceeds to supporting women and children in crisis.",
    ],
    servesWho: "Brides, donors, volunteers, community members",
    impactHighlights: [
      { value: "$4M+", label: "raised to fund YWCA shelters" },
      { value: "100%", label: "of proceeds support women in crisis" },
      { value: "2004", label: "serving brides since" },
    ],
    accent: "ink",
    icon: "dress",
    featuredOnHome: true,
    order: 6,
    primaryCta: { label: "Learn More", href: "/programs/church-bridal" },
  },
];

/* -------------------------------------------------------------------------- */

export const stories: Story[] = [
  {
    quote:
      "I called at two in the morning because I did not know who else to call. Someone answered, and she stayed on the line with me until it was light out.",
    attribution: "Danielle",
    portrait: "one",
    locality: "Lynchburg",
    coordinates: { lat: 37.414, lng: -79.1428 },
    order: 1,
  },
  {
    quote:
      "The advocate sat next to me in the courtroom. I did not have to explain anything twice. For the first time in a year I felt like somebody was on my side.",
    attribution: "Renee",
    portrait: "two",
    locality: "Amherst County",
    coordinates: { lat: 37.5846, lng: -79.0508 },
    order: 2,
  },
  {
    quote:
      "I had a room, a key, and a door that locked. People do not understand what that is worth until they have gone without it.",
    attribution: "Marisol",
    portrait: "three",
    locality: "Campbell County",
    coordinates: { lat: 37.2432, lng: -79.0989 },
    order: 3,
  },
  {
    quote:
      "My kids got to see their dad in a place where everyone was safe. Nobody had to be afraid on either side of that door.",
    attribution: "Keisha",
    portrait: "four",
    locality: "Bedford County",
    coordinates: { lat: 37.3400, lng: -79.4300 },
    order: 4,
  },
  {
    quote:
      "I bought my dress there and found out where the money went. I have volunteered every season since.",
    attribution: "Anne",
    portrait: "five",
    locality: "Forest",
    coordinates: { lat: 37.3626, lng: -79.2872 },
    order: 5,
  },
];

/* -------------------------------------------------------------------------- */

export const newsPosts: NewsPost[] = [
  {
    title: "Annual Walk for Justice returns to downtown Lynchburg",
    slug: "annual-walk-for-justice",
    image: "/news/annual-walk-for-justice.webp",
    category: "event",
    publishedAt: "2026-08-04",
    eventDate: "2026-09-19",
    location: "Riverfront Park, Lynchburg",
    excerpt:
      "Join us for our annual fundraising walk supporting local programs and racial justice initiatives across Central Virginia.",
    featured: true,
  },
  {
    title: "New housing initiative expands affordable rooms downtown",
    slug: "new-housing-initiative",
    image: "/news/new-housing-initiative.webp",
    category: "press-release",
    publishedAt: "2026-07-22",
    excerpt:
      "YWCA Central Virginia announces a partnership to expand affordable housing for women in the heart of Lynchburg.",
  },
  {
    title: "Financial empowerment seminar series begins this fall",
    slug: "financial-empowerment-seminar",
    image: "/news/financial-empowerment-seminar.webp",
    category: "event",
    publishedAt: "2026-07-10",
    eventDate: "2026-10-02",
    location: "626 Church Street",
    excerpt:
      "A free workshop series designed to help women take control of their financial future, from budgeting to first-time homeownership.",
  },
  {
    title: "Fifty officers complete high-risk domestic violence training",
    slug: "dvhrt-training-milestone",
    image: "/news/dvhrt-training-milestone.webp",
    category: "impact-story",
    publishedAt: "2026-06-18",
    excerpt:
      "Our Domestic Violence High Risk Team trained fifty law enforcement and court professionals to recognize the warning signs that precede the most dangerous cases.",
  },
  {
    title: "Church Street Bridal crosses $4 million raised for shelters",
    slug: "bridal-four-million",
    image: "/news/bridal-four-million.webp",
    category: "impact-story",
    publishedAt: "2026-05-30",
    excerpt:
      "Two decades of donated gowns have funded thousands of nights of safety for women and children across the region.",
  },
];

/* -------------------------------------------------------------------------- */

export const leadership: Person[] = [
  { name: "Dr. Nancy Hubbard", role: "Chief Executive Officer", group: "leadership", order: 1 },
  { name: "Kim Torres", role: "Chief Financial Officer", group: "leadership", order: 2 },
  { name: "Linda Ellis-Williams", role: "Victim Services & Manager of SARP", group: "leadership", order: 3 },
  { name: "Joan Foster", role: "Director of Development", group: "leadership", order: 4 },
  { name: "Keisha Reeves", role: "Human Resources Manager", group: "leadership", order: 5 },
  { name: "Nora Rodriguez Alicea", role: "Program Staff", group: "leadership", order: 6 },
  { name: "Amy McIvor", role: "Urban Shelter Associate Manager", group: "leadership", order: 7 },
  { name: "Brenda Dunning", role: "YWCA Visitation Center Coordinator", group: "leadership", order: 8 },
  { name: "Elizabeth Bentov", role: "Marketing & Communications Manager", group: "leadership", order: 9 },
];

export const board: Person[] = [
  { name: "Dr. Beth Savage", role: "President", group: "board", officerRole: "President", order: 1 },
  { name: "Kaydan Ferguson", role: "Vice President", group: "board", officerRole: "Vice President", order: 2 },
  { name: "Samantha Citty", role: "Treasurer", group: "board", officerRole: "Treasurer", order: 3 },
  { name: "Natasha Spinner", role: "Secretary", group: "board", officerRole: "Secretary", order: 4 },
  { name: "Ashley Beesley", role: "Director", group: "board", order: 5 },
  { name: "Amy Hall", role: "Director", group: "board", order: 6 },
  { name: "Alexis Scott", role: "Director", group: "board", order: 7 },
  { name: "Kristina Ochieng", role: "Director", group: "board", order: 8 },
  { name: "Dr. Nichole Sanders", role: "Director", group: "board", order: 9 },
  { name: "Crystal Strange", role: "Director", group: "board", order: 10 },
  { name: "Kendra Warrick", role: "Director", group: "board", order: 11 },
  { name: "Danielle Whitted", role: "Director", group: "board", order: 12 },
];

/* -------------------------------------------------------------------------- */

export const timeline: TimelineEvent[] = [
  { dateLabel: "1858", sortYear: 1858, event: "The first U.S. YWCA chapter forms in New York City." },
  { dateLabel: "1906", sortYear: 1906, event: "The Young Women's Christian Association of the United States is formed as a national organization." },
  { dateLabel: "May 1912", sortYear: 1912, event: "Miss Anna D. Casler, Field Secretary of the South Atlantic, leads a meeting in Lynchburg to discuss creating a local YWCA." },
  { dateLabel: "1912", sortYear: 1912.5, event: "About 300 members are pledged. The Lynchburg YWCA organizes on November 23 and affiliates on December 4. Emma W. Ivey becomes the first elected president.", isMilestone: true },
  { dateLabel: "1918", sortYear: 1918, event: "Black women in Lynchburg form the Blue Triangle Club to create a safe place for women and girls of color." },
  { dateLabel: "May 11, 1919", sortYear: 1919, event: "The Church Street YWCA building opens with a dedication ceremony: a boarding home with gymnasium, swimming pool, cafeteria, and dormitory space for 66 residents.", isMilestone: true },
  { dateLabel: "1920", sortYear: 1920, event: "The Blue Triangle Club becomes the Phyllis Wheatley YWCA Branch." },
  { dateLabel: "1923", sortYear: 1923, event: "The Lynchburg YWCA purchases Camp Ruthers in Forest, Virginia." },
  { dateLabel: "1946", sortYear: 1946, event: "The national YWCA adopts its Interracial Charter, explicitly calling for action against racial injustice.", isMilestone: true },
  { dateLabel: "1958", sortYear: 1958, event: "The national board votes to intensify desegregation efforts across the organization." },
  { dateLabel: "1970", sortYear: 1970, event: "YWCA USA adopts “One Imperative,” focusing on the elimination of racism.", isMilestone: true },
  { dateLabel: "1978", sortYear: 1978, event: "The Church Street branch and Phyllis Wheatley branch merge to form YWCA Central Virginia.", isMilestone: true },
  { dateLabel: "2009", sortYear: 2009, event: "The national mission becomes “eliminating racism, empowering women, and promoting peace, justice, freedom, and dignity for all.”" },
  { dateLabel: "Today", sortYear: 2026, event: "YWCA Central Virginia serves women, children, and families across Lynchburg and seven surrounding counties.", isMilestone: true },
];

/* -------------------------------------------------------------------------- */

export const learnArticles: LearnArticle[] = [
  { title: "What Is Abuse?", slug: "what-is-abuse", summary: "Abuse takes many forms: physical, emotional, verbal, financial, digital, sexual, and psychological. Understanding them is the first step.", order: 1 },
  { title: "What Is Sexual Assault?", slug: "what-is-sexual-assault", summary: "A plain-language explanation of sexual assault, consent, and the options every survivor has.", order: 2 },
  { title: "What Is Rape?", slug: "what-is-rape", summary: "Clear information about rape, and what to do if you need help right now.", contentWarning: true, order: 3 },
  { title: "Warning Signs of Abuse", slug: "warning-signs", summary: "The patterns that tend to appear before violence escalates, and what to do if you recognize them.", order: 4 },
  { title: "Safety Planning", slug: "safety-planning", summary: "A safety plan is a practical, personal set of steps to help you stay safer, whether you stay or leave.", order: 5 },
  { title: "How to Help Someone", slug: "how-to-help", summary: "What to say, what not to say, and how to stay in someone's life while they decide what's next.", order: 6 },
  { title: "How to Talk to Your Child", slug: "how-to-talk-to-child", summary: "Don't be afraid to start the conversation. Red flags, green flags, and age-appropriate language.", order: 7 },
  { title: "Myths and Facts", slug: "myths-and-facts", summary: "The most common misconceptions about abuse and assault, and what is actually true.", order: 8 },
  { title: "Healthy Relationships", slug: "healthy-relationships", summary: "What respect, trust, and safety actually look like day to day.", order: 9 },
];
