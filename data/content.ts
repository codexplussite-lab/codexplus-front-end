export const brand = {
  name: "CodeXplus",
  tagline: "Creative Studio",
  email: "hello@codexplus.studio",
  phoneIntl: ["+1 (415) 555-0132", "+31 (0) 20 555 0145"],
  locations: [
    { city: "San Francisco", country: "California, USA", region: "West Coast HQ", phone: "+1 (416) 555-0147", contactType: "phone" },
    { city: "Amsterdam", country: "Netherlands", region: "Europe HQ", phone: "+49 30 555 0186", contactType: "whatsapp" },
  ],
};

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Services", href: "/services" },
  { label: "Team", href: "/team" },
  { label: "Contact", href: "/contact" },
  { label: "Blog", href: "/articles" },
  { label: "About", href: "/#about" },
];

export const socials = [
  { label: "GitHub", href: "https://github.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "Twitter", href: "https://twitter.com" },
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Dribbble", href: "https://dribbble.com" },
];

export const stats = [
  { value: 180, suffix: "+", label: "Projects Completed" },
  { value: 96, suffix: "%", label: "Client Retention" },
  { value: 24, suffix: "", label: "Global Awards" },
  { value: 12, suffix: "+", label: "Years of Craft" },
];

export type Service = {
  id: string;
  index: string;
  title: string;
  description: string;
  points: string[];
  icon: "palette" | "code" | "megaphone" | "lightbulb";
  image?: string;
  imageAlt?: string;
  videoUrl?: string;
  videoFileUrl?: string;
};

export const services: Service[] = [
  {
    id: "branding",
    index: "01",
    title: "Branding & Identity Design",
    description:
      "End-to-end visual identities engineered to be unforgettable — logo systems, typography, art direction and brand guidelines that scale from business card to billboard.",
    points: ["Brand strategy & positioning", "Logo systems & guidelines", "Art direction"],
    icon: "palette",
  },
  {
    id: "web",
    index: "02",
    title: "Website Design & Development",
    description:
      "Blazing-fast, conversion-focused websites built on Next.js and modern full-stack architecture — with headless CMS, animations and pixel-perfect responsive craft.",
    points: ["Next.js & full-stack builds", "Headless CMS integration", "Design systems"],
    icon: "code",
  },
  {
    id: "marketing",
    index: "03",
    title: "Advertising & Marketing Campaigns",
    description:
      "Performance-driven campaigns that turn attention into revenue — from SEO foundations and content strategy to paid media and continuous optimization.",
    points: ["SEO & performance audits", "Campaign creative", "Analytics & CRO"],
    icon: "megaphone",
  },
  {
    id: "consulting",
    index: "04",
    title: "Creative Consulting & Development",
    description:
      "Senior-level thinking on tap. We audit, mentor and co-build alongside your team — turning ambiguous briefs into shipped, measurable product outcomes.",
    points: ["Product & UX consulting", "Tech mentorship", "Design sprints"],
    icon: "lightbulb",
  },
];

export type Project = {
  id: string;
  title: string;
  client: string;
  category: string;
  year: string;
  services: string[];
  summary: string;
  description: string[];
  palette: [string, string, string];
  variant: "blobs" | "rings" | "grid" | "waves" | "prism" | "orbits";
  tall?: boolean;
  liveUrl?: string;
  repoUrl?: string;
  coverImage?: any;
  imageAlt?: string;
  videoUrl?: string;
  videoFileUrl?: string;
  backgroundMedia?: {
    mediaType?: "image" | "video";
    image?: string;
    imageAlt?: string;
    videoUrl?: string;
    videoFileUrl?: string;
  };
};

export const projects: Project[] = [
  // ---------- Web Design ----------
  {
    id: "maison-noor",
    title: "Maison Noor",
    client: "Maison Noor Interiors",
    category: "Web Design",
    year: "2026",
    liveUrl: "https://maisonnoor.example.com",
    services: ["Brand Identity", "Web Design", "Next.js Development"],
    summary: "A serene digital flagship for a high-end interior studio — slow, editorial, sculptural.",
    description: [
      "Maison Noor came to us with a decade of iconic interiors and a website that said nothing about them. We rebuilt their presence around stillness: generous negative space, a bespoke serif system and full-bleed imagery that lets their spaces breathe.",
      "The result is a site that behaves like a gallery — quiet navigation, cinematic scroll reveals and a headless Sanity CMS that lets their team publish new projects in minutes. Edge-rendered pages load in under a second from any region.",
    ],
    palette: ["#0b0f19", "#9a66ff", "#2e3a59"],
    variant: "prism",
    backgroundMedia: {
      mediaType: "image",
      image:
        "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1800&auto=format&fit=crop",
      imageAlt: "Serene minimalist interior of Maison Noor",
    },
  },
  {
    id: "halcyon-estates",
    title: "Halcyon Estates",
    client: "Halcyon Properties",
    category: "Web Design",
    year: "2026",
    liveUrl: "https://halcyonestates.example.com",
    services: ["Web Design", "Art Direction", "Next.js Development"],
    summary: "A cinematic listings platform for luxury real estate that sells before the viewing.",
    description: [
      "Halcyon needed to translate $40M listings into feeling, not just floor plans. We art-directed an immersive, editorial experience — full-bleed architectural photography, subtle parallax and a map-driven search that feels like a private concierge.",
      "We built it on Next.js with edge-rendered listing pages and an ISR pipeline that refreshes new properties in seconds. Average session time tripled and listing inquiries rose 57% in the first quarter.",
    ],
    palette: ["#0b0f19", "#7437ff", "#232746"],
    variant: "waves",
    backgroundMedia: {
      mediaType: "image",
      image:
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1800&auto=format&fit=crop",
      imageAlt: "Modern luxury home at dusk for Halcyon Estates",
    },
  },
  {
    id: "meridian-legal",
    title: "Meridian Legal",
    client: "Meridian & Partners LLP",
    category: "Web Design",
    year: "2025",
    liveUrl: "https://meridianlegal.example.com",
    services: ["Web Design", "Content Strategy", "CMS Integration"],
    summary: "A calm, authoritative digital presence for a global law firm — built for trust at scale.",
    description: [
      "Meridian's practice spans 14 jurisdictions, and their old site made that feel like a maze. We redesigned around clarity: a disciplined editorial grid, a practice-area navigation that explains the firm in one scroll, and typography that reads like print.",
      "A headless CMS gives their marketing team ownership of every page, while edge caching keeps the site instant worldwide. Organic inbound enquiries grew 44% within six months of launch.",
    ],
    palette: ["#0b0f19", "#2e3a59", "#9a66ff"],
    variant: "grid",
    backgroundMedia: {
      mediaType: "image",
      image:
        "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1800&auto=format&fit=crop",
      imageAlt: "Refined office interior for Meridian Legal",
    },
  },
  {
    id: "atlas-ventures",
    title: "Atlas Ventures",
    client: "Atlas Venture Studio",
    category: "Web Design",
    year: "2026",
    liveUrl: "https://atlasventures.example.com",
    services: ["Web Design", "Motion", "WebGL"],
    summary: "A kinetic studio site that turns portfolio into theatre — WebGL, motion and edge speed.",
    description: [
      "Atlas is a venture studio that launches companies, and their site needed to feel like one of their products: fast, kinetic and impossible to ignore. We designed a motion-heavy experience with WebGL accents and a reel that plays like an opening sequence.",
      "Built on Next.js with edge rendering and aggressively optimized media, the site holds a perfect Lighthouse score while streaming full-res film backgrounds. Portfolio engagement doubled in the first month.",
    ],
    palette: ["#0b0f19", "#7437ff", "#9a66ff"],
    variant: "orbits",
    backgroundMedia: {
      mediaType: "video",
      videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      imageAlt: "Atlas Ventures kinetic studio showreel",
    },
  },
  // ---------- E-Commerce ----------
  {
    id: "vanta-commerce",
    title: "Vanta Commerce",
    client: "Vanta Fashion Group",
    category: "E-Commerce",
    year: "2026",
    liveUrl: "https://vanta.example.com",
    services: ["UX Strategy", "Headless Commerce", "Performance"],
    summary: "A 190ms storefront rebuild that lifted conversion by 38% within a single quarter.",
    description: [
      "Vanta's legacy store was drowning in plugins and loading at 4.2 seconds. We stripped it to essentials and rebuilt on a headless Next.js architecture with edge rendering, instant optimistic cart interactions and a product page that behaves like a runway show.",
      "Core Web Vitals went from red to perfect green, and the new storefront converts 38% better. A Sanity-powered merchandising layer lets their team curate drops without touching code.",
    ],
    palette: ["#0b0f19", "#7437ff", "#232746"],
    variant: "grid",
    backgroundMedia: {
      mediaType: "video",
      videoUrl:
        "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
      imageAlt: "Vanta Commerce fashion platform showreel",
    },
  },
  {
    id: "bin-libaas",
    title: "Bin Libaas",
    client: "Bin Libaas Boutique",
    category: "E-Commerce",
    year: "2026",
    liveUrl: "https://binlibaas.example.com",
    services: ["E-Commerce", "UI/UX Design", "Full-Stack Development"],
    summary: "A premium headless storefront for a boutique fashion house — luxe feel, instant loads.",
    description: [
      "Bin Libaas needed a platform that reflected their premium positioning while delivering blazing-fast loads and a frictionless checkout. We paired a headless Shopify backend with a Next.js storefront and a Sanity CMS merchandising layer.",
      "The result: a 45% conversion lift, a bounce rate cut nearly in half, and a design language — silk gradients, editorial type and tactile motion — that carries the brand from lookbook to cart.",
    ],
    palette: ["#0b0f19", "#9a66ff", "#2e3a59"],
    variant: "blobs",
    backgroundMedia: {
      mediaType: "image",
      image:
        "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=1800&auto=format&fit=crop",
      imageAlt: "Curated boutique retail space for Bin Libaas",
    },
  },
  {
    id: "northline-supply",
    title: "Northline Supply",
    client: "Northline Outdoor Co.",
    category: "E-Commerce",
    year: "2025",
    liveUrl: "https://northline.example.com",
    services: ["E-Commerce", "Shopify Plus", "CRO"],
    summary: "A rugged D2C storefront for outdoor gear — engineered for mobile-first field traffic.",
    description: [
      "Northline's customers shop from trailheads, so every millisecond mattered. We rebuilt their storefront on a headless architecture with edge caching, compressed imagery and one-tap checkout for returning customers.",
      "Mobile conversion climbed 52%, and their Shopify Plus backend now syncs inventory across retail and D2C in real time. The design system they gained from the build ships every campaign in days.",
    ],
    palette: ["#0b0f19", "#7437ff", "#232746"],
    variant: "waves",
    backgroundMedia: {
      mediaType: "image",
      image:
        "https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=1800&auto=format&fit=crop",
      imageAlt: "Hikers on a ridgeline for Northline Supply",
    },
  },
  {
    id: "aurelia-beauty",
    title: "Aurelia Beauty",
    client: "Aurelia Cosmetics",
    category: "E-Commerce",
    year: "2025",
    liveUrl: "https://aurelia.example.com",
    services: ["E-Commerce", "Brand Experience", "Subscriptions"],
    summary: "A sensorial beauty storefront with subscription flows that convert 2.4x better.",
    description: [
      "Aurelia's clean-beauty range demanded a storefront as considered as its formulas. We designed a sensorial experience — slow reveals, macro product cinematography and a skin-profile quiz that feeds a personalised subscription flow.",
      "On a headless Next.js stack, page loads dropped below 600ms and subscription sign-ups improved 2.4x. Reorder reminders and smart bundles now drive 40% of revenue.",
    ],
    palette: ["#0b0f19", "#9a66ff", "#7437ff"],
    variant: "prism",
    backgroundMedia: {
      mediaType: "video",
      videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      imageAlt: "Aurelia Beauty sensorial product film",
    },
  },
  // ---------- Product Design ----------
  {
    id: "pulse-analytics",
    title: "Pulse Analytics",
    client: "Pulse Data Systems",
    category: "Product Design",
    year: "2026",
    liveUrl: "https://pulse.example.com",
    services: ["Product Design", "Design System", "Frontend"],
    summary: "A real-time analytics suite with an interface calm enough to live in all day.",
    description: [
      "Pulse needed to make a firehose of data feel approachable. We designed a modular dashboard language — dense but airy, technical but warm — and shipped a 120-component design system in Figma and React.",
      "Onboarding completion jumped 41% after launch. Their team now builds features in days instead of weeks, and the system's accessibility layer passed WCAG 2.2 AA across every surface.",
    ],
    palette: ["#0b0f19", "#7437ff", "#9a66ff"],
    variant: "blobs",
    backgroundMedia: {
      mediaType: "image",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1800&auto=format&fit=crop",
      imageAlt: "Pulse Analytics real-time dashboard",
    },
  },
  {
    id: "flow-focus",
    title: "Flow Focus",
    client: "Flow Focus Inc.",
    category: "Product Design",
    year: "2025",
    liveUrl: "https://flowfocus.example.com",
    services: ["UI/UX Design", "Frontend Engineering", "Accessibility"],
    summary: "A minimalist productivity workspace designed to minimise distraction and protect deep work.",
    description: [
      "Flow Focus asked us to redesign their core web application around one metric: time spent in flow. We ran extensive user testing, mapped cognitive load and rebuilt the interface around restraint — quiet chrome, keyboard-first flows and a theming engine tuned for long sessions.",
      "Daily active usage rose 60% and support tickets about confusion fell by a third. The component library we shipped now powers their roadmap.",
    ],
    palette: ["#0b0f19", "#2e3a59", "#9a66ff"],
    variant: "rings",
    backgroundMedia: {
      mediaType: "image",
      image:
        "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=1800&auto=format&fit=crop",
      imageAlt: "Minimal workspace for Flow Focus",
    },
  },
  {
    id: "lumen-ledger",
    title: "Lumen Ledger",
    client: "Lumen Financial",
    category: "Product Design",
    year: "2026",
    liveUrl: "https://lumenledger.example.com",
    services: ["Product Design", "Fintech UX", "Design System"],
    summary: "A fintech reporting suite where trust is designed in — clarity, precision, calm.",
    description: [
      "Lumen's accounting product stored its depth behind dated UI. We redesigned the reporting suite around clarity: a typographic scale built for dense tables, chart patterns that encode meaning instantly, and empty states that teach.",
      "The redesign lifted feature adoption 34% and cut onboarding time in half. Every state is now covered by a token-driven design system that their engineers ship against without a designer in the room.",
    ],
    palette: ["#0b0f19", "#7437ff", "#232746"],
    variant: "grid",
    backgroundMedia: {
      mediaType: "image",
      image:
        "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1800&auto=format&fit=crop",
      imageAlt: "Financial reports on a desk for Lumen Ledger",
    },
  },
  {
    id: "orbit-crm",
    title: "Orbit CRM",
    client: "Orbit Software",
    category: "Product Design",
    year: "2025",
    liveUrl: "https://orbitcrm.example.com",
    services: ["Product Design", "UX Research", "Motion"],
    summary: "A sales CRM redesigned around momentum — every screen nudges the next best action.",
    description: [
      "Orbit's CRM buried next steps in menus. We redesigned the pipeline around momentum: a narrative timeline view, a next-best-action engine surfaced in context, and motion that guides the eye without slowing it.",
      "Reps saved an average of 4 hours a week, and pipeline velocity increased 28%. The new interface became the flagship their enterprise sales team demos first.",
    ],
    palette: ["#0b0f19", "#9a66ff", "#2e3a59"],
    variant: "orbits",
    backgroundMedia: {
      mediaType: "video",
      videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
      imageAlt: "Orbit CRM product film",
    },
  },
  // ---------- Brand Identity ----------
  {
    id: "northwind-identity",
    title: "Northwind",
    client: "Northwind Apparel",
    category: "Brand Identity",
    year: "2026",
    liveUrl: "https://northwind.example.com",
    services: ["Brand Strategy", "Identity", "Packaging"],
    summary: "A complete rebrand forged in the mountains — type, tone and texture built to endure weather.",
    description: [
      "Northwind had great product and a forgettable logo. We built an identity rooted in topographic lines, weatherproof utility and a bolder shade of alpine orange that owns every shelf it sits on.",
      "The system spans packaging, wayfinding and a full motion kit — and doubled wholesale inquiries in six months. We also delivered a brand playbook that keeps every future campaign on-ridge.",
    ],
    palette: ["#0b0f19", "#7437ff", "#232746"],
    variant: "waves",
    backgroundMedia: {
      mediaType: "image",
      image:
        "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?q=80&w=1800&auto=format&fit=crop",
      imageAlt: "Alpine peaks at dusk for the Northwind rebrand",
    },
  },
  {
    id: "marrow-studio",
    title: "Marrow",
    client: "Marrow Creative",
    category: "Brand Identity",
    year: "2025",
    liveUrl: "https://marrow.example.com",
    services: ["Brand Strategy", "Identity", "Art Direction"],
    summary: "An identity for a creative studio that feels like a loaded palette — bold, warm, unmistakable.",
    description: [
      "Marrow is a multidisciplinary studio that wanted a mark with substance. We built their identity around a marrow-red core, a variable display face and a grid system flexible enough for print, film titles and every touchpoint in between.",
      "The rebrand earned their first D&AD shortlist and immediately raised the calibre of conversations — their average project value is up 65% since launch.",
    ],
    palette: ["#0b0f19", "#9a66ff", "#7437ff"],
    variant: "blobs",
    backgroundMedia: {
      mediaType: "image",
      image:
        "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?q=80&w=1800&auto=format&fit=crop",
      imageAlt: "Brand stationery mockups for Marrow",
    },
  },
  {
    id: "fern-and-co",
    title: "Fern & Co",
    client: "Fern & Co. Living",
    category: "Brand Identity",
    year: "2026",
    liveUrl: "https://fernco.example.com",
    services: ["Brand Strategy", "Identity", "Packaging"],
    summary: "A botanical identity for a sustainable lifestyle brand — quiet, honest, alive.",
    description: [
      "Fern & Co. make plant-based home goods with serious sustainability credentials that their packaging never mentioned. We built an identity around living systems: botanical linework, recycled paper texture and a colour story pulled from a moss garden.",
      "The redesign lifted retail sell-through 31% and earned a plastic-free packaging award. Their new system scales from seed sachets to the flagship storefront.",
    ],
    palette: ["#0b0f19", "#2e3a59", "#9a66ff"],
    variant: "prism",
    backgroundMedia: {
      mediaType: "image",
      image:
        "https://images.unsplash.com/photo-1446071103084-c257b5f70672?q=80&w=1800&auto=format&fit=crop",
      imageAlt: "Botanical greenery for the Fern & Co identity",
    },
  },
  {
    id: "vertex-pay",
    title: "Vertex Pay",
    client: "Vertex Payments",
    category: "Brand Identity",
    year: "2025",
    liveUrl: "https://vertexpay.example.com",
    services: ["Brand Strategy", "Identity", "Motion Identity"],
    summary: "A fintech identity with the confidence of a vault and the warmth of a good accountant.",
    description: [
      "Vertex Pay processes billions of dollars and had the brand presence of a PDF. We designed an identity that balances institutional trust with human warmth — a geometric mark, a precise type system and a motion language that feels like money well handled.",
      "The new brand unified nine product surfaces and their sales deck closes faster; brand recall in their market rose 48% in a post-launch study.",
    ],
    palette: ["#0b0f19", "#7437ff", "#232746"],
    variant: "rings",
    backgroundMedia: {
      mediaType: "video",
      videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
      imageAlt: "Vertex Pay motion identity film",
    },
  },
  // ---------- Web App ----------
  {
    id: "folio-builder",
    title: "Folio Builder",
    client: "Folio Inc.",
    category: "Web App",
    year: "2026",
    liveUrl: "https://folio.example.com",
    services: ["Full-Stack", "No-code Engine", "CMS"],
    summary: "A no-code portfolio engine helping 40k+ creators ship beautiful sites in under an hour.",
    description: [
      "Folio makes it effortless for photographers, designers and writers to publish stunning portfolios without touching code. We built the core editor, block engine and marketplace from the ground up on a serverless Next.js stack.",
      "Fourteen thousand sites launched in the first 90 days, with p95 load times under 800ms. The template marketplace is now their biggest revenue line.",
    ],
    palette: ["#0b0f19", "#2e3a59", "#9a66ff"],
    variant: "orbits",
    backgroundMedia: {
      mediaType: "video",
      videoUrl:
        "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm",
      imageAlt: "Folio Builder creator workspace",
    },
  },
  {
    id: "gigflow",
    title: "GigFlow",
    client: "GigFlow Inc.",
    category: "Web App",
    year: "2025",
    liveUrl: "https://gigflow.example.com",
    services: ["SaaS Architecture", "Full-Stack Development", "UI/UX Design"],
    summary: "A next-generation marketplace connecting top-tier freelance talent with enterprise clients.",
    description: [
      "GigFlow required a robust, scalable architecture to handle real-time messaging, secure payments and complex matching algorithms at enterprise scale.",
      "We engineered a serverless Next.js application with edge-rendered job feeds, live presence and an AI matching layer. The platform sustains thousands of concurrent users with zero downtime and cut time-to-first-match by 60%.",
    ],
    palette: ["#0b0f19", "#7437ff", "#9a66ff"],
    variant: "blobs",
    backgroundMedia: {
      mediaType: "image",
      image:
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1800&auto=format&fit=crop",
      imageAlt: "Collaborative team workspace for GigFlow",
    },
  },
  {
    id: "relay-desk",
    title: "Relay Desk",
    client: "Relay Systems",
    category: "Web App",
    year: "2026",
    liveUrl: "https://relaydesk.example.com",
    services: ["Product Design", "Full-Stack Development", "Real-time Infrastructure"],
    summary: "An internal comms hub that replaced four tools — and made 12k employees calmer.",
    description: [
      "Relay Desk was born from a single problem: teams at this logistics giant lived in four chat and document tools. We designed and built one calm, unified workspace with threaded rooms, shared canvases and reliable presence.",
      "Built on edge-rendered React with a realtime layer tuned for flaky office Wi-Fi, Relay now carries 12,000 employees daily. Internal search time dropped 70%, and the company retired two legacy licenses.",
    ],
    palette: ["#0b0f19", "#9a66ff", "#2e3a59"],
    variant: "grid",
    backgroundMedia: {
      mediaType: "image",
      image:
        "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=1800&auto=format&fit=crop",
      imageAlt: "Modern open-plan office for Relay Desk",
    },
  },
  {
    id: "beacon-crm",
    title: "Beacon CRM",
    client: "Beacon Labs",
    category: "Web App",
    year: "2025",
    liveUrl: "https://beaconcrm.example.com",
    services: ["Full-Stack Development", "Data Visualisation", "AI Features"],
    summary: "A sales intelligence app that turns noisy pipelines into signals — and revenue.",
    description: [
      "Beacon's data layer was rich; its interface was a spreadsheet graveyard. We built a web app that surfaces the signals that matter: deal health scores, forecast confidence and coaching nudges computed from live pipeline data.",
      "On a Next.js front end with streaming analytics, dashboards render in milliseconds even on 100k-row datasets. Teams using Beacon report 23% faster close cycles.",
    ],
    palette: ["#0b0f19", "#7437ff", "#232746"],
    variant: "waves",
    backgroundMedia: {
      mediaType: "video",
      videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
      imageAlt: "Beacon CRM analytics experience",
    },
  },
  // ---------- Mobile App ----------
  {
    id: "aurora-app",
    title: "Aurora Health",
    client: "Aurora Health Inc.",
    category: "Mobile App",
    year: "2026",
    liveUrl: "https://aurora.example.com",
    services: ["UX Research", "App Design", "Motion"],
    summary: "A sleep-and-recovery companion designed to feel as calm as it promises to be.",
    description: [
      "Aurora helps people build better recovery habits. We designed an app experience built around gentleness — soft gradients, breathing micro-interactions and data framed as encouragement, not judgment.",
      "App Store rating sits at 4.9 with a 71% 30-day retention rate. The motion system we shipped — every transition tuned to a calm easing curve — is now their brand signature.",
    ],
    palette: ["#0b0f19", "#9a66ff", "#7437ff"],
    variant: "rings",
    backgroundMedia: {
      mediaType: "image",
      image:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1800&auto=format&fit=crop",
      imageAlt: "Calm night sky for the Aurora Health app",
    },
  },
  {
    id: "nest-finance",
    title: "Nest Finance",
    client: "Nest Financial",
    category: "Mobile App",
    year: "2026",
    liveUrl: "https://nestfinance.example.com",
    services: ["App Design", "Fintech UX", "Design System"],
    summary: "A personal finance app that makes saving feel like progress, not punishment.",
    description: [
      "Nest set out to fix the guilt spiral of budgeting apps. We designed a spending experience that celebrates intent — round-ups, habit nudges and forecasts drawn in warm, digestible charts — across iOS and Android.",
      "The app grew to 300k downloads in its first year with a 4.8-star average. Our cross-platform design system keeps both native teams shipping in lockstep.",
    ],
    palette: ["#0b0f19", "#7437ff", "#2e3a59"],
    variant: "blobs",
    backgroundMedia: {
      mediaType: "image",
      image:
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1800&auto=format&fit=crop",
      imageAlt: "Phone in hand for the Nest Finance app",
    },
  },
  {
    id: "trailmate",
    title: "Trailmate",
    client: "Trailmate Outdoors",
    category: "Mobile App",
    year: "2025",
    liveUrl: "https://trailmate.example.com",
    services: ["App Design", "Offline Architecture", "Navigation UX"],
    summary: "An offline-first hiking companion that guides 90k explorers through real terrain.",
    description: [
      "Trailmate needed to work where cell signal doesn't. We designed a navigation app built offline-first — preloaded topographic tiles, battery-sipping GPS and a UI legible in glare, rain and gloves.",
      "Ninety thousand hikers relied on it last season with zero crash reports above baseline. Route completion nudges grew repeat usage 35% year over year.",
    ],
    palette: ["#0b0f19", "#2e3a59", "#9a66ff"],
    variant: "grid",
    backgroundMedia: {
      mediaType: "image",
      image:
        "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1800&auto=format&fit=crop",
      imageAlt: "Mountain landscape for the Trailmate app",
    },
  },
  {
    id: "dailydo",
    title: "Dailydo",
    client: "Dailydo Labs",
    category: "Mobile App",
    year: "2025",
    liveUrl: "https://dailydo.example.com",
    services: ["App Design", "Gamification", "Motion"],
    summary: "A habit app that turns streaks into stories — 2M sessions a month and climbing.",
    description: [
      "Habit apps die at day twelve, so we designed Dailydo to reward momentum instead of perfection. Streaks are framed as stories, check-ins take two seconds, and the celebration motion is worth the habit itself.",
      "The app now logs 2M sessions a month with a 42% week-four retention — nearly double the category average — and a fully motion-based onboarding that converts at 68%.",
    ],
    palette: ["#0b0f19", "#7437ff", "#9a66ff"],
    variant: "prism",
    backgroundMedia: {
      mediaType: "video",
      videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
      imageAlt: "Dailydo habit streak experience",
    },
  },
];

export const testimonials = [
  {
    quote:
      "CodeX+ didn't just design a website — they rebuilt how our entire company thinks about its brand. Every pixel feels deliberate. It changed the business.",
    name: "Elena Vasquez",
    role: "Founder, Maison Noor",
    initials: "EV",
    accent: "#7437ff",
  },
  {
    quote:
      "The fastest, most considered build we've ever run. Conversion up 38% in one quarter, and the dev experience is genuinely beautiful.",
    name: "Marcus Feld",
    role: "CPO, Vanta Commerce",
    initials: "MF",
    accent: "#9a66ff",
  },
  {
    quote:
      "They translate vision into craft better than any team we've worked with. Our dashboard finally feels premium enough for our clients.",
    name: "Sofia Lindgren",
    role: "VP Product, Pulse Analytics",
    initials: "SL",
    accent: "#232746",
  },
  {
    quote:
      "From strategy to shipping, a single accountable partner. Our rebrand doubled wholesale inquiries in six months. Unreal.",
    name: "Jonas Weber",
    role: "CEO, Northwind",
    initials: "JW",
    accent: "#2e3a59",
  },
  {
    quote:
      "We shipped a full product from zero in four months. The care they put into motion and micro-interaction is what makes it feel expensive.",
    name: "Aisha Bello",
    role: "Head of Design, Folio",
    initials: "AB",
    accent: "#7437ff",
  },
  {
    quote:
      "Design that genuinely calms people down. Our retention numbers prove it. CodeX+ sets the bar for health-tech craft.",
    name: "Tomás Rivera",
    role: "CEO, Aurora Health",
    initials: "TR",
    accent: "#9a66ff",
  },
];

export type Post = {
  id: string;
  title: string;
  slug?: string;
  category: string;
  tags?: string[];
  date: string;
  readTime: string;
  excerpt: string;
  author?: string;
  coverImage?: any;
  coverImageAlt?: string;
  videoUrl?: string;
  content?: any;
  accent: string;
  variant: "blobs" | "rings" | "grid";
};

let _ptKey = 0;
const ptBlock = (
  text: string,
  style: "normal" | "h2" | "h3" | "blockquote" = "normal",
  listItem?: "bullet",
): any => ({
  _key: `pt-${_ptKey++}`,
  _type: "block",
  style,
  listItem,
  level: listItem ? 1 : undefined,
  children: [{ _key: `pts-${_ptKey++}`, _type: "span", marks: [], text }],
});
const ptCode = (language: string, code: string): any => ({
  _key: `ptc-${_ptKey++}`,
  _type: "codeBlock",
  language,
  code,
});

export const posts: Post[] = [
  {
    id: "design-systems-2026",
    title: "Why Design Systems Fail After Year One",
    slug: "why-design-systems-fail-after-year-one",
    category: "Design",
    tags: ["Design Systems", "DesignOps", "Components"],
    date: "Jun 18, 2026",
    readTime: "8 min read",
    excerpt:
      "Most design systems die quietly. Here's the organizational wiring — not the tokens — that keeps them alive.",
    author: "Maya Chen",
    coverImage:
      "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=1800&auto=format&fit=crop",
    coverImageAlt: "Design workspace with a component library on screen",
    accent: "#7437ff",
    variant: "grid",
    content: [
      ptBlock(
        "Every design system we audit was beautiful at launch. The marketing site shipped with a hero section that sparkled, and then, quietly, twelve weeks in, the first shadow override appeared. By month eight, the system was a museum: visited by tourists, maintained by no one.",
      ),
      ptBlock("The failure isn't in the tokens", "h2"),
      ptBlock(
        "Tokens don't rot — ownership does. A design system is a product with internal customers, and like any product it dies when nobody owns its roadmap, its deprecation cycle, or its release notes. The teams that keep systems alive for years all share one thing: a named, accountable owner with real bandwidth.",
      ),
      ptBlock(
        "A design system without an owner is a style guide with good intentions. The one with an owner ships a new version every two weeks, and the product teams actually read the changelog.",
        "blockquote",
      ),
      ptBlock("Wiring over wireframes", "h2"),
      ptBlock("The systems that survive share three pieces of wiring:", "normal"),
      ptBlock("A deprecation policy — old patterns get a sunset date, not an afterlife.", "normal", "bullet"),
      ptBlock("A contribution loop — product engineers can propose, review and merge changes like code.", "normal", "bullet"),
      ptBlock("Usage telemetry — you measure adoption of every component the way you measure conversion.", "normal", "bullet"),
      ptBlock(
        "We stopped designing components we couldn't measure, and our systems started feeling like infrastructure instead of decoration. That's the difference between a toolkit and a museum.",
      ),
    ],
  },
  {
    id: "nextjs-performance",
    title: "The Next.js Performance Checklist We Ship To Every Client",
    slug: "the-next-js-performance-checklist-we-ship-to-every-client",
    category: "Engineering",
    tags: ["Next.js", "Performance", "Edge Rendering"],
    date: "May 02, 2026",
    readTime: "12 min read",
    excerpt:
      "Image pipelines, edge caching, font strategy and the 190ms storefront recipe we apply before launch day.",
    author: "Daniel Okafor",
    coverImage:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1800&auto=format&fit=crop",
    coverImageAlt: "Code editor with syntax highlighted in the dark",
    accent: "#9a66ff",
    variant: "rings",
    content: [
      ptBlock(
        "A storefront we rebuilt in 2025 went from 4.2 seconds to 190 milliseconds time-to-interactive. No magic — just a checklist we now run on every engagement. Here is that checklist, in the order it pays off.",
      ),
      ptBlock("The 190ms recipe", "h2"),
      ptBlock(
        "The single biggest lever is moving static work off the origin. Every page that can be prerendered should be, and every dynamic page should stream. That combination alone accounts for roughly half the gains on any legacy Next.js app.",
      ),
      ptCode(
        "typescript",
        `// next.config.ts — the baseline we ship
export default {
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
}`,
      ),
      ptBlock("Then, in priority order:", "normal"),
      ptBlock("Preload fonts with font-display: swap and inline the critical CSS.", "normal", "bullet"),
      ptBlock("Serve AVIF/WebP from the CDN edge — never the origin server.", "normal", "bullet"),
      ptBlock("Cache API responses at the edge with stale-while-revalidate windows.", "normal", "bullet"),
      ptBlock("Keep the first bundle under 100KB gzipped; code-split everything else.", "normal", "bullet"),
      ptBlock(
        "Measure before and after with the same Lab + Field mix, or you'll be optimizing for a dashboard instead of for people.",
        "blockquote",
      ),
      ptBlock(
        "The last 100 milliseconds cost more than the first 3 seconds, but they're also what separates a fast site from a suspiciously fast site. Users can feel the difference.",
      ),
    ],
  },
  {
    id: "motion-principles",
    title: "Micro-Motion: The 12 Principles of Interfaces That Feel Alive",
    slug: "micro-motion-the-12-principles-of-interfaces-that-feel-alive",
    category: "Motion",
    tags: ["Motion Design", "Easing", "Micro-interactions"],
    date: "Mar 21, 2026",
    readTime: "6 min read",
    excerpt:
      "A tiny easing curve is worth a thousand hero videos. Notes from our design systems on making UI breathe.",
    author: "Maya Chen",
    coverImage:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1800&auto=format&fit=crop",
    coverImageAlt: "Retro computer with glowing screen",
    accent: "#2e3a59",
    variant: "blobs",
    content: [
      ptBlock(
        "Motion is the cheapest way to make software feel expensive — and the fastest way to make it feel cheap. The difference is rarely the animation itself; it's the easing curve, the duration, and whether the motion has a reason to exist.",
      ),
      ptBlock("Easing is a personality", "h2"),
      ptBlock(
        "Ease-in-out is the default of defaults, which is exactly why your UI feels like everyone else's. We keep a tiny library of curves on every project — an assertive one for entrances, a soft one for exits, and a barely-there one for hover states that should whisper.",
      ),
      ptCode(
        "css",
        `:root {
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-soft:     cubic-bezier(0.22, 1, 0.36, 1);
  --ease-whisper:  cubic-bezier(0.4, 0, 0.2, 1);
}`,
      ),
      ptBlock("The twelve principles reduce to four behaviours:", "normal"),
      ptBlock("Entrances assert: 300–400ms, expo-out, always towards the user.", "normal", "bullet"),
      ptBlock("Exits recede: 200–250ms, soft curve, never towards the user.", "normal", "bullet"),
      ptBlock("States whisper: 150ms, subtle, and reversible under the cursor.", "normal", "bullet"),
      ptBlock("Reduced motion is a first-class citizen, not a checkbox.", "normal", "bullet"),
      ptBlock(
        "If you remove the animation and nobody asks where it went, it was decoration. If they ask, it was doing its job.",
        "blockquote",
      ),
      ptBlock(
        "Motion should tell the user where they are and where they're going. Everything else is confetti.",
      ),
    ],
  },
  {
    id: "brand-audit",
    title: "The 20-Question Brand Audit We Run On Every Engagement",
    slug: "the-20-question-brand-audit-we-run-on-every-engagement",
    category: "Strategy",
    tags: ["Brand Strategy", "Positioning", "Research"],
    date: "Feb 09, 2026",
    readTime: "10 min read",
    excerpt:
      "Before a single moodboard, we answer twenty uncomfortable questions. Steal the full audit we run internally.",
    author: "Lena Fischer",
    coverImage:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1800&auto=format&fit=crop",
    coverImageAlt: "Brand design tools arranged on a desk",
    accent: "#232746",
    variant: "blobs",
    content: [
      ptBlock(
        "Every brand engagement starts the same way at our studio: twenty questions, answered in a room with the founders, before a single pixel exists. The audit is uncomfortable by design — if it weren't, it wouldn't be doing its job.",
      ),
      ptBlock("Question one: What does the brand refuse?", "h2"),
      ptBlock(
        "Positioning is more often defined by refusal than aspiration. What you won't do, won't say, and won't be seen next to is what makes you distinctive. Most brands answer this question with a shrug, which is itself an answer.",
      ),
      ptBlock(
        "A brand is a decision repeated. Every time you say yes to something off-brand, you spend a little of what the last rebrand earned.",
        "blockquote",
      ),
      ptBlock("The audit in miniature", "h2"),
      ptBlock("Run it before strategy, before moodboards, before logos:", "normal"),
      ptBlock("If the brand were a person, who would it politely leave the party for?", "normal", "bullet"),
      ptBlock("What would a competitor have to do to make your brand irrelevant?", "normal", "bullet"),
      ptBlock("What's the most expensive word in your vocabulary — and when do you use it?", "normal", "bullet"),
      ptBlock("Who is the smartest person who would hate this brand, and why?", "normal", "bullet"),
      ptBlock(
        "Twenty questions takes ninety minutes and saves months. Every engagement that skipped it later wished it hadn't.",
      ),
    ],
  },
  {
    id: "cms-headless",
    title: "Headless CMS in 2026: Choosing With Your Eyes Open",
    slug: "headless-cms-in-2026-choosing-with-your-eyes-open",
    category: "Engineering",
    tags: ["Headless CMS", "Sanity", "Content Modelling"],
    date: "Jan 27, 2026",
    readTime: "9 min read",
    excerpt:
      "Sanity, Contentful, a custom file system — the trade-offs that actually matter for editorial teams, not demos.",
    author: "Daniel Okafor",
    coverImage:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1800&auto=format&fit=crop",
    coverImageAlt: "Server racks with glowing indicator lights",
    accent: "#7437ff",
    variant: "grid",
    content: [
      ptBlock(
        "Every headless CMS demo looks identical: a beautiful editor, a snappy API, and a confetti of integrations. The differences that actually decide a project live in the boring parts — content modelling freedom, preview workflows, and what happens when the team grows.",
      ),
      ptBlock("The three decisions that matter", "h2"),
      ptBlock("Decision one is data shape. Can you model relationships the way your content actually relates, or do you flatten everything into folders and tags? Decision two is preview. Editors need a preview that runs their real front end, not a mock. Decision three is exit cost — what you keep if you leave.",
      ),
      ptBlock("If your editors can't preview it in one click, your 'headless CMS' is a ticket queue in disguise.", "blockquote"),
      ptCode(
        "json",
        `{
  // A content model that matches editorial reality
  "article": {
    "title": "string",
    "body": "portableText[]",
    "author": "ref(person)",
    "related": "ref(article)[]",
    "preview": "ref(studio)"
  }
}`,
      ),
      ptBlock("The pragmatic checklist:", "normal"),
      ptBlock("Structured content with custom types, not just rich text.", "normal", "bullet"),
      ptBlock("Editor preview wired to your deployed front end.", "normal", "bullet"),
      ptBlock("A migration path for content when you outgrow the tool.", "normal", "bullet"),
      ptBlock(
        "Pick the CMS you'll still be comfortable arguing about in three years. The demo confetti always fades.",
      ),
    ],
  },
  {
    id: "creative-process",
    title: "Imagination Is a Full-Stack Discipline",
    slug: "imagination-is-a-full-stack-discipline",
    category: "Opinion",
    tags: ["Creative Process", "Studio Life", "Full-stack"],
    date: "Jan 04, 2026",
    readTime: "5 min read",
    excerpt:
      "The best ideas live at the seam between strategy, engineering and aesthetics. A manifesto from the studio floor.",
    author: "Arman Naqvi",
    coverImage:
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb?q=80&w=1800&auto=format&fit=crop",
    coverImageAlt: "Creative studio desk with sketches and screens",
    accent: "#9a66ff",
    variant: "rings",
    content: [
      ptBlock(
        "Somewhere along the way, we divided the work into disciplines and told everyone to stay in their lane. Designers sketch, engineers build, strategists think. And then we wonder why the results feel assembled instead of imagined.",
      ),
      ptBlock(
        "The best ideas we've shipped were never born fully formed in a Figma file. They came out of an engineer asking why a loading state had to exist, a strategist arguing with a developer about a 200-millisecond difference, a designer who could read the code their mockups implied.",
      ),
      ptBlock(
        "Imagination is a full-stack discipline. It doesn't care about your job title — it cares about what you're willing to build with your own hands.",
        "blockquote",
      ),
      ptBlock("How we keep the seam open", "h2"),
      ptBlock("Everyone on the team can ship, and everyone can critique a brand.", "normal", "bullet"),
      ptBlock("Design reviews include the people who will build the thing — in the first week, not the fourth.", "normal", "bullet"),
      ptBlock("The fastest prototype wins, regardless of who made it.", "normal", "bullet"),
      ptBlock(
        "When we stopped protecting disciplines and started protecting the idea, the work got faster, sharper and more fun. The seam is where the signal lives.",
      ),
    ],
  },
];

export const clients = [
  "NORDIC MOUNTS",
  "LUMEN LABS",
  "FERN & CO",
  "VERTEX PAY",
  "ORBIT TRAVEL",
  "HALCYON",
  "MARROW",
  "PAPER PLANE",
];

export type Owner = {
  id: string;
  name: string;
  role: string;
  bio: string;
  description: string[];
  image: string;
  imageAlt: string;
};

export const owner: Owner = {
  id: "owner-codex",
  name: "Arman Naqvi",
  role: "Founder & Creative Director",
  bio: "Independent designer and full-stack engineer building brands, products and websites that move the world.",
  description: [
    "Arman founded CodeXplus with a simple conviction: imagination is a full-stack discipline. For over a decade he has led teams at the seam between strategy, engineering and aesthetics — shipping identities, storefronts and SaaS platforms for clients on three continents.",
    "He believes the best work happens when a single accountable partner owns the whole arc — from first whiteboard sketch to final deploy. That's the operating model CodeXplus is built on, and it's why every engagement ships faster and sharper than the industry norm.",
  ],
  image: "",
  imageAlt: "Arman Naqvi, Founder & Creative Director of CodeXplus",
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  photo: string;
  photoAlt: string;
};

export const team: TeamMember[] = [
  {
    id: "team-maya",
    name: "Maya Chen",
    role: "Design Lead",
    bio: "Motion systems, brand worlds and interfaces that feel inevitable.",
    photo: "",
    photoAlt: "Maya Chen, Design Lead at CodeXplus",
  },
  {
    id: "team-daniel",
    name: "Daniel Okafor",
    role: "Senior Engineer",
    bio: "Next.js, headless CMS and performance budgets he refuses to miss.",
    photo: "",
    photoAlt: "Daniel Okafor, Senior Engineer at CodeXplus",
  },
  {
    id: "team-lena",
    name: "Lena Fischer",
    role: "Brand Strategist",
    bio: "Positioning, naming and the kind of research that survives contact.",
    photo: "",
    photoAlt: "Lena Fischer, Brand Strategist at CodeXplus",
  },
  {
    id: "team-omar",
    name: "Omar Haddad",
    role: "Product Designer",
    bio: "Dense but airy interfaces, tuned to the pixel and the millisecond.",
    photo: "",
    photoAlt: "Omar Haddad, Product Designer at CodeXplus",
  },
];
