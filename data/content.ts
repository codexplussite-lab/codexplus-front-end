export function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

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
  disciplines: string[];
  summary: string;
  description: string[];
  palette: [string, string, string];
  variant: "blobs" | "rings" | "grid" | "waves" | "prism" | "orbits";
  tall?: boolean;
  liveUrl?: string;
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
  // ------------------------------------------------------------
  // Web Design (4)
  // ------------------------------------------------------------
  {
    id: "maison-noor",
    title: "Maison Noor",
    client: "Interior Design Studio",
    category: "Web Design",
    year: "2026",
    disciplines: ["Brand Identity", "Web Design", "Next.js Development"],
    summary: "A serene digital flagship for a high-end interior studio — slow, editorial, sculptural.",
    description: [
      "Maison Noor came to us with a decade of iconic interiors and a website that said nothing about them. We rebuilt their presence around stillness: generous negative space, a bespoke serif system and full-bleed imagery that lets their spaces breathe.",
      "The result is a site that behaves like a gallery — quiet navigation, cinematic scroll reveals and a CMS that lets their team publish new projects in minutes.",
    ],
    palette: ["#0b0f19", "#9a66ff", "#2e3a59"],
    variant: "prism",
    tall: true,
    liveUrl: "https://demo.maisonnoor.com",
    backgroundMedia: {
      mediaType: "image",
      image:
        "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1800&auto=format&fit=crop",
      imageAlt: "Serene minimalist interior of Maison Noor",
    },
  },
  {
    id: "atelier-lumiere",
    title: "Atelier Lumière",
    client: "Lumière Lighting",
    category: "Web Design",
    year: "2026",
    disciplines: ["Art Direction", "Web Design", "Editorial CMS", "Motion"],
    summary: "An online gallery for sculptural lighting — dark, warm and impossibly tactile.",
    description: [
      "Lumière builds hand-finished lamps that deserve more than a product grid. We designed a site that reads like a showroom at dusk: deep shadows, warm amber gradients and photography that glows on screen.",
      "Every collection page is a scrollable still-life, and a deliberately slow motion layer gives each fixture a moment in the light. Traffic to the studio's showroom doubled within three months of launch.",
    ],
    palette: ["#1a120b", "#e8a04c", "#4a3b2f"],
    variant: "rings",
    tall: true,
    liveUrl: "https://demo.atelierlumiere.com",
    backgroundMedia: {
      mediaType: "image",
      image:
        "https://images.unsplash.com/photo-1567016432779-094069958ea5?q=80&w=1800&auto=format&fit=crop",
      imageAlt: "Warm lamplight in an intimate interior",
    },
  },
  {
    id: "haven-oak",
    title: "Haven & Oak",
    client: "Haven & Oak Hotels",
    category: "Web Design",
    year: "2025",
    disciplines: ["Brand Direction", "Web Design", "Booking Experience", "Content Strategy"],
    summary: "A slow, story-first booking site for a collection of countryside retreats.",
    description: [
      "Haven & Oak runs seven small retreats across the country, each with its own character and terrain. We built one digital home that celebrates each property as a chapter — long-form storytelling, seasonal photography and a booking flow that never feels like a funnel.",
      "Direct bookings now outpace third-party channels for the first time in the group's history, and the site was awarded a Site of the Day within a week of launch.",
    ],
    palette: ["#101a12", "#7fb069", "#2c3f31"],
    variant: "waves",
    liveUrl: "https://demo.havenandoak.com",
    backgroundMedia: {
      mediaType: "image",
      image:
        "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1800&auto=format&fit=crop",
      imageAlt: "Countryside hotel exterior at golden hour",
    },
  },
  {
    id: "studio-meridian",
    title: "Studio Meridian",
    client: "Meridian Architecture",
    category: "Web Design",
    year: "2024",
    disciplines: ["Web Design", "Immersive Interaction", "WebGL / 3D", "Case Study System"],
    summary: "A portfolio for an architecture practice where every project renders like a walkthrough.",
    description: [
      "Meridian's buildings are precise, geometric and light-driven. Their old site was a PDF list. We designed a portfolio where each project opens as a case study with layered imagery, material swatches and a WebGL viewer that lets visitors orbit key structures.",
      "The site now doubles as a pitch tool — partners share project pages instead of decks, and Meridian won two major commissions directly through the work presented here.",
    ],
    palette: ["#10141f", "#8fa3c4", "#2c3850"],
    variant: "blobs",
    liveUrl: "https://demo.studiomeridian.com",
    backgroundMedia: {
      mediaType: "image",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1800&auto=format&fit=crop",
      imageAlt: "Modern residential architecture by Studio Meridian",
    },
  },

  // ------------------------------------------------------------
  // E-Commerce (4)
  // ------------------------------------------------------------
  {
    id: "vanta-commerce",
    title: "Vanta Commerce",
    client: "D2C Fashion Platform",
    category: "E-Commerce",
    year: "2025",
    disciplines: ["UX Strategy", "Shopify / Next.js", "Performance"],
    summary: "A 190ms storefront rebuild that lifted conversion by 38% within a single quarter.",
    description: [
      "Vanta's legacy store was drowning in plugins and loading at 4.2 seconds. We stripped it to essentials and rebuilt on a headless Next.js architecture with edge rendering and instant optimistic cart interactions.",
      "Core Web Vitals went from red to perfect green, and every product page now behaves like a runway show.",
    ],
    palette: ["#0b0f19", "#7437ff", "#232746"],
    variant: "grid",
    liveUrl: "https://demo.vantacommerce.com",
    backgroundMedia: {
      mediaType: "video",
      videoUrl:
        "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
      imageAlt: "Vanta Commerce fashion platform showreel",
    },
  },
  {
    id: "bin-libaas-ecommerce",
    title: "Bin Libaas",
    client: "Bin Libaas Boutique",
    category: "E-Commerce",
    year: "2026",
    disciplines: ["E-Commerce Strategy", "Shopify / Next.js", "UI/UX Design", "Performance"],
    summary: "A headless storefront for a premium boutique — runway-fast, editorial-rich and conversion-focused.",
    description: [
      "Bin Libaas needed a platform that reflected their premium tailoring while delivering blazing-fast load times and a seamless checkout experience.",
      "We rebuilt their storefront headlessly on Next.js with Sanity CMS, editorial product storytelling and a one-page checkout. Conversion rose 45% and bounce rates dropped by more than half within the first quarter.",
    ],
    palette: ["#1e293b", "#0f172a", "#3b82f6"],
    variant: "prism",
    tall: true,
    liveUrl: "https://demo.binlibaas.com",
    backgroundMedia: {
      mediaType: "image",
      image:
        "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=1800&auto=format&fit=crop",
      imageAlt: "Rack of tailored garments at Bin Libaas boutique",
    },
  },
  {
    id: "terra-market",
    title: "Terra Market",
    client: "Terra Organic Grocers",
    category: "E-Commerce",
    year: "2025",
    disciplines: ["E-Commerce", "Art Direction", "Subscriptions", "Checkout Design"],
    summary: "A weekly-basket grocery brand with a subscription flow that feels like a farmers' market.",
    description: [
      "Terra sells weekly organic baskets, but their old store made subscribing feel like filing taxes. We redesigned the entire journey as a tasting menu — seasonal produce photography, a playful basket-builder and one-tap week-skipping.",
      "Subscriber retention climbed to 82% at six months, and average basket value grew 27% as customers discovered produce they'd never considered.",
    ],
    palette: ["#0f1f17", "#4ade80", "#1e3a2f"],
    variant: "blobs",
    tall: true,
    liveUrl: "https://demo.terramarket.com",
    backgroundMedia: {
      mediaType: "image",
      image:
        "https://images.unsplash.com/photo-1543168256-418811576931?q=80&w=1800&auto=format&fit=crop",
      imageAlt: "Fresh organic vegetables in a market basket",
    },
  },
  {
    id: "velora-jewelry",
    title: "Velora",
    client: "Velora Fine Jewelry",
    category: "E-Commerce",
    year: "2024",
    disciplines: ["E-Commerce", "Luxury Positioning", "Photography Direction", "Personalisation"],
    summary: "A fine-jewelry atelier storefront built around a 'virtual try-on' concierge journey.",
    description: [
      "Selling high-ticket jewelry online demands confidence. Velora's store now pairs cinematic macro photography with a virtual try-on studio, bespoke concierge chat and a checkout that handles stones, sizes and engraving without friction.",
      "Average order value rose 60%, and the atelier's international clientele grew into markets their physical stores had never reached.",
    ],
    palette: ["#161014", "#e8c17a", "#4a3040"],
    variant: "orbits",
    liveUrl: "https://demo.velora.com",
    backgroundMedia: {
      mediaType: "image",
      image:
        "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1800&auto=format&fit=crop",
      imageAlt: "Fine jewelry ring lit against dark silk",
    },
  },

  // ------------------------------------------------------------
  // Product Design (4)
  // ------------------------------------------------------------
  {
    id: "pulse-analytics",
    title: "Pulse Analytics",
    client: "SaaS Platform",
    category: "Product Design",
    year: "2025",
    disciplines: ["Product Design", "Design System", "Frontend"],
    summary: "A real-time analytics suite with an interface calm enough to live in all day.",
    description: [
      "Pulse needed to make a firehose of data feel approachable. We designed a modular dashboard language — dense but airy, technical but warm — and shipped a 120-component design system in Figma and React.",
      "Onboarding completion jumped 41% after launch. Their team now builds features in days instead of weeks.",
    ],
    palette: ["#0b0f19", "#7437ff", "#9a66ff"],
    variant: "blobs",
    liveUrl: "https://demo.pulseanalytics.com",
    backgroundMedia: {
      mediaType: "image",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1800&auto=format&fit=crop",
      imageAlt: "Pulse Analytics real-time dashboard",
    },
  },
  {
    id: "flow-focus-workspace",
    title: "Flow Focus",
    client: "Flow Focus",
    category: "Product Design",
    year: "2024",
    disciplines: ["Product Design", "UX Research", "Frontend Engineering", "Accessibility"],
    summary: "A minimalist productivity workspace designed to minimize distractions and enhance deep work.",
    description: [
      "The Flow Focus team approached us to redesign their core workspace application, focusing heavily on accessibility and cognitive load reduction.",
      "Through extensive user testing and iterative design, we delivered a streamlined interface that users love, increasing daily active usage by over 60%.",
    ],
    palette: ["#064e3b", "#022c22", "#10b981"],
    variant: "rings",
    tall: true,
    liveUrl: "https://demo.flowfocus.com",
    backgroundMedia: {
      mediaType: "image",
      image:
        "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=1800&auto=format&fit=crop",
      imageAlt: "Clean, focused workspace interface on a laptop",
    },
  },
  {
    id: "kite-finance",
    title: "Kite Finance",
    client: "Kite Inc.",
    category: "Product Design",
    year: "2026",
    disciplines: ["Product Design", "Data Visualisation", "Design System", "Fintech"],
    summary: "A personal finance product that makes budgets feel like a game, not an audit.",
    description: [
      "Kite set out to prove that money management can be delightful. We designed the core product: playful spending categories, animated goal rings and a 'kite' metaphor that makes monthly cash flow intuitively visual.",
      "The result is a fintech product with consumer-app polish — 4.8 stars across stores, and 3x the industry's 90-day retention for a budgeting app.",
    ],
    palette: ["#0c1a2e", "#38bdf8", "#1e3a5f"],
    variant: "prism",
    tall: true,
    liveUrl: "https://demo.kitefinance.com",
    backgroundMedia: {
      mediaType: "image",
      image:
        "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1800&auto=format&fit=crop",
      imageAlt: "Finance dashboard with charts on a laptop",
    },
  },
  {
    id: "mosaic-studio",
    title: "Mosaic Studio",
    client: "Mosaic Labs",
    category: "Product Design",
    year: "2025",
    disciplines: ["Product Strategy", "Interface Design", "Collaboration Tools", "Motion"],
    summary: "A whiteboard-meets-workspace product designed to keep distributed teams in flow.",
    description: [
      "Mosaic wanted the energy of a studio whiteboard for remote teams — without the chaos. We designed a canvas workspace with guided structure: sticky notes that snap to grids, voting that feels physical, and meeting modes that quiet the room automatically.",
      "Teams onboard in minutes rather than afternoons, and session retention is 74% week-over-week — proof that structure can feel creative.",
    ],
    palette: ["#1a1030", "#a78bfa", "#3b2a5f"],
    variant: "grid",
    liveUrl: "https://demo.mosaicstudio.com",
    backgroundMedia: {
      mediaType: "image",
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1800&auto=format&fit=crop",
      imageAlt: "Distributed team collaborating around a table",
    },
  },

  // ------------------------------------------------------------
  // Brand Identity (4)
  // ------------------------------------------------------------
  {
    id: "northwind-identity",
    title: "Northwind",
    client: "Outdoor Apparel Brand",
    category: "Brand Identity",
    year: "2024",
    disciplines: ["Brand Strategy", "Identity", "Packaging"],
    summary: "A complete rebrand forged in the mountains — type, tone and texture built to endure weather.",
    description: [
      "Northwind had great product and a forgettable logo. We built an identity rooted in topographic lines, weatherproof utility and a bolder shade of alpine orange that owns every shelf it sits on.",
      "The system spans packaging, wayfinding and a full motion kit — and doubled wholesale inquiries in six months.",
    ],
    palette: ["#0b0f19", "#7437ff", "#232746"],
    variant: "waves",
    tall: true,
    liveUrl: "https://demo.northwind.co",
    backgroundMedia: {
      mediaType: "image",
      image:
        "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?q=80&w=1800&auto=format&fit=crop",
      imageAlt: "Alpine peaks at dusk for the Northwind rebrand",
    },
  },
  {
    id: "fern-co-identity",
    title: "Fern & Co.",
    client: "Fern & Co. Skincare",
    category: "Brand Identity",
    year: "2026",
    disciplines: ["Brand Strategy", "Identity System", "Packaging", "Editorial Design"],
    summary: "A skincare rebrand rooted in botanicals — clean, alive and impossible to ignore on shelf.",
    description: [
      "Fern & Co. was selling science in plain white bottles. We gave them a living identity — pressed-leaf textures, an editorial type system and a color story pulled from their own greenhouse.",
      "The rebrand rolled out across packaging, social and a new 'botanical index' label system. Retail sell-through doubled, and the brand's Instagram following tripled in four months.",
    ],
    palette: ["#0c1912", "#6ee7b7", "#223c2e"],
    variant: "blobs",
    liveUrl: "https://demo.fernandco.com",
    backgroundMedia: {
      mediaType: "image",
      image:
        "https://images.unsplash.com/photo-1556228578-8c89e6adf883?q=80&w=1800&auto=format&fit=crop",
      imageAlt: "Botanical skincare products in soft natural light",
    },
  },
  {
    id: "halcyon-hotels",
    title: "Halcyon Hotels",
    client: "Halcyon Group",
    category: "Brand Identity",
    year: "2025",
    disciplines: ["Brand Strategy", "Visual Identity", "Guest Experience", "Guidelines"],
    summary: "A five-star identity system that moves from business card to infinity pool without breaking.",
    description: [
      "Halcyon's twelve properties each had their own personality and their own logo. We unified them under one system — a single mark that flexes across eleven colorways, one type family, and a photographic language of light and water.",
      "The guidelines became the backbone of their guest experience: from amenity kits to pool towels to the mobile check-in app, every touchpoint now speaks Halcyon.",
    ],
    palette: ["#0f141c", "#93c5fd", "#243246"],
    variant: "orbits",
    liveUrl: "https://demo.halcyonhotels.com",
    backgroundMedia: {
      mediaType: "image",
      image:
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1800&auto=format&fit=crop",
      imageAlt: "Resort infinity pool at dusk for Halcyon Hotels",
    },
  },
  {
    id: "polar-coffee",
    title: "Polar Coffee",
    client: "Polar Roasters",
    category: "Brand Identity",
    year: "2024",
    disciplines: ["Naming", "Identity", "Packaging", "Environmental Design"],
    summary: "A third-wave coffee identity built on frost, fire and four decades of roasting craft.",
    description: [
      "Polar has roasted since 1984 but looked like every new café on the block. We built an identity around the roast itself — a frost-and-fire duotone, a flame-shaped logomark and bag architecture that sorts beans by altitude and profile.",
      "The redesign landed Polar in specialty retail chains across the Nordics, with direct-to-consumer sales up 130% in the launch quarter.",
    ],
    palette: ["#191206", "#d4a373", "#3d2c1a"],
    variant: "rings",
    tall: true,
    liveUrl: "https://demo.polarcoffee.com",
    backgroundMedia: {
      mediaType: "image",
      image:
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1800&auto=format&fit=crop",
      imageAlt: "Pour-over coffee with warm morning light",
    },
  },

  // ------------------------------------------------------------
  // Web App (4)
  // ------------------------------------------------------------
  {
    id: "folio-builder",
    title: "Folio Builder",
    client: "Creator Platform",
    category: "Web App",
    year: "2024",
    disciplines: ["Full-Stack", "No-code Engine", "CMS"],
    summary: "A no-code portfolio engine helping 40k+ creators ship beautiful sites in under an hour.",
    description: [
      "Folio makes it effortless for photographers, designers and writers to publish stunning portfolios without touching code. We built the core editor, block engine and marketplace from the ground up.",
      "Fourteen thousand sites launched in the first 90 days. The template marketplace is now their biggest revenue line.",
    ],
    palette: ["#0b0f19", "#2e3a59", "#9a66ff"],
    variant: "orbits",
    liveUrl: "https://demo.foliobuilder.com",
    backgroundMedia: {
      mediaType: "video",
      videoUrl:
        "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm",
      imageAlt: "Folio Builder creator workspace",
    },
  },
  {
    id: "gigflow-freelance-platform",
    title: "GigFlow",
    client: "GigFlow Inc",
    category: "Web App",
    year: "2025",
    disciplines: ["SaaS Architecture", "Full-Stack Development", "UI/UX Design", "Payments"],
    summary: "A next-generation marketplace connecting top-tier freelance talent with enterprise clients.",
    description: [
      "GigFlow required a robust, scalable architecture to handle real-time messaging, secure payments and complex matching algorithms.",
      "We engineered a scalable Next.js application with a serverless backend, facilitating thousands of concurrent users with zero downtime.",
    ],
    palette: ["#4c1d95", "#2e1065", "#8b5cf6"],
    variant: "blobs",
    tall: true,
    liveUrl: "https://demo.gigflow.com",
    backgroundMedia: {
      mediaType: "image",
      image:
        "https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1800&auto=format&fit=crop",
      imageAlt: "Freelance team collaborating in a bright studio",
    },
  },
  {
    id: "nimbus-hr",
    title: "Nimbus HR",
    client: "Nimbus Systems",
    category: "Web App",
    year: "2026",
    disciplines: ["Product Design", "HR Platform", "Design System", "API Integration"],
    summary: "An HR suite that replaced 14 tools — onboarding to payroll in one calm dashboard.",
    description: [
      "Nimbus's clients were juggling a dozen HR tools that never talked to each other. We designed and built the replacement: a single dashboard covering onboarding, time-off, performance and payroll with role-aware views for every team.",
      "The platform now serves 2,300 companies, and the average onboarding process dropped from 11 days to 4.",
    ],
    palette: ["#0b1220", "#5b8def", "#1c2b45"],
    variant: "grid",
    tall: true,
    liveUrl: "https://demo.nimbushr.com",
    backgroundMedia: {
      mediaType: "image",
      image:
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1800&auto=format&fit=crop",
      imageAlt: "Modern office space for the Nimbus HR platform",
    },
  },
  {
    id: "ledger-line",
    title: "Ledger Line",
    client: "Ledger Line",
    category: "Web App",
    year: "2025",
    disciplines: ["Full-Stack", "Fintech UX", "Realtime Data", "Security"],
    summary: "Real-time accounting for growing teams — every number reconciled the second it lands.",
    description: [
      "Ledger Line's customers were doing month-end in two weeks. We rebuilt the core web app around live reconciliation: bank feeds, invoicing and expense tracking all update instantly in a single ledger view.",
      "Month-end closes now take 48 hours, and the app's NPS rose 34 points after the redesign.",
    ],
    palette: ["#101820", "#2dd4bf", "#1e3a3a"],
    variant: "prism",
    liveUrl: "https://demo.ledgerline.com",
    backgroundMedia: {
      mediaType: "image",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1800&auto=format&fit=crop",
      imageAlt: "Laptop showing financial charts and graphs",
    },
  },

  // ------------------------------------------------------------
  // Mobile App (4)
  // ------------------------------------------------------------
  {
    id: "aurora-app",
    title: "Aurora Health",
    client: "Consumer Health App",
    category: "Mobile App",
    year: "2023",
    disciplines: ["UX Research", "App Design", "Motion"],
    summary: "A sleep-and-recovery companion designed to feel as calm as it promises to be.",
    description: [
      "Aurora helps people build better recovery habits. We designed an app experience built around gentleness — soft gradients, breathing micro-interactions and data framed as encouragement, not judgment.",
      "App Store rating sits at 4.9 with a 71% 30-day retention rate.",
    ],
    palette: ["#0b0f19", "#9a66ff", "#7437ff"],
    variant: "rings",
    liveUrl: "https://demo.aurorahealth.app",
    backgroundMedia: {
      mediaType: "image",
      image:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1800&auto=format&fit=crop",
      imageAlt: "Calm night sky for the Aurora Health app",
    },
  },
  {
    id: "fit-loop-app",
    title: "FitLoop",
    client: "FitLoop Health",
    category: "Mobile App",
    year: "2026",
    disciplines: ["App Design", "Wearables", "Motion", "UX Research"],
    summary: "A training companion that closes the loop between gym, sleep and streak.",
    description: [
      "FitLoop syncs wearables, gym sessions and recovery into one honest daily score. We designed an app that motivates without guilt — animated loops, streak mechanics and a 'rest day' language that makes recovery part of the win.",
      "Retention at 90 days is 2.3x the fitness-app average, and the app was featured as App of the Day in 40 countries.",
    ],
    palette: ["#1a0f0f", "#f87171", "#3a2020"],
    variant: "blobs",
    tall: true,
    liveUrl: "https://demo.fitloop.app",
    backgroundMedia: {
      mediaType: "image",
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1800&auto=format&fit=crop",
      imageAlt: "Athlete mid-workout with resistance bands",
    },
  },
  {
    id: "spicebox-app",
    title: "Spicebox",
    client: "Spicebox Kitchen",
    category: "Mobile App",
    year: "2025",
    disciplines: ["App Design", "Recipe System", "Content Design", "Offline-first"],
    summary: "A meal-planning app that turns pantry leftovers into weeknight recipes.",
    description: [
      "Spicebox asked: what if the recipe starts with what's already in your kitchen? We designed an offline-first app that inventories your pantry and suggests recipes by what you have — with a voice mode for hands covered in flour.",
      "The app averages 9 weekly sessions per user, and its 'use it up' challenge became the most-shared feature on social media in the brand's history.",
    ],
    palette: ["#1d1206", "#fbbf24", "#4a3010"],
    variant: "grid",
    tall: true,
    liveUrl: "https://demo.spicebox.app",
    backgroundMedia: {
      mediaType: "image",
      image:
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1800&auto=format&fit=crop",
      imageAlt: "Vibrant healthy bowl prepared from pantry staples",
    },
  },
  {
    id: "wander-app",
    title: "Wander",
    client: "Wander Travel",
    category: "Mobile App",
    year: "2024",
    disciplines: ["App Design", "Maps & Geo", "Motion", "Personalisation"],
    summary: "A travel companion that plans itineraries from a single conversation.",
    description: [
      "Wander turns a short prompt — 'five days, coastal, no museums' — into a complete itinerary with flights, stays and a live map. We designed the conversational interface, the map layer and the calm, confident visual system.",
      "Over a million itineraries were planned in the first year, and Wander's store rating holds at 4.8.",
    ],
    palette: ["#0d1b2a", "#7dd3fc", "#1b3a52"],
    variant: "waves",
    liveUrl: "https://demo.wander.app",
    backgroundMedia: {
      mediaType: "image",
      image:
        "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?q=80&w=1800&auto=format&fit=crop",
      imageAlt: "Turquoise coastline seen from above",
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
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  accent: string;
  variant: "blobs" | "rings" | "grid";
};

export const posts: Post[] = [
  {
    id: "design-systems-2026",
    title: "Why Design Systems Fail After Year One",
    category: "Design",
    date: "Jun 18, 2026",
    readTime: "8 min read",
    excerpt:
      "Most design systems die quietly. Here's the organizational wiring — not the tokens — that keeps them alive.",
    accent: "#7437ff",
    variant: "grid",
  },
  {
    id: "nextjs-performance",
    title: "The Next.js Performance Checklist We Ship To Every Client",
    category: "Engineering",
    date: "May 02, 2026",
    readTime: "12 min read",
    excerpt:
      "Image pipelines, edge caching, font strategy and the 190ms storefront recipe we apply before launch day.",
    accent: "#9a66ff",
    variant: "rings",
  },
  {
    id: "motion-principles",
    title: "Micro-Motion: The 12 Principles of Interfaces That Feel Alive",
    category: "Motion",
    date: "Mar 21, 2026",
    readTime: "6 min read",
    excerpt:
      "A tiny easing curve is worth a thousand hero videos. Notes from our design systems on making UI breathe.",
    accent: "#2e3a59",
    variant: "blobs",
  },
  {
    id: "brand-audit",
    title: "The 20-Question Brand Audit We Run On Every Engagement",
    category: "Strategy",
    date: "Feb 09, 2026",
    readTime: "10 min read",
    excerpt:
      "Before a single moodboard, we answer twenty uncomfortable questions. Steal the full audit we run internally.",
    accent: "#232746",
    variant: "blobs",
  },
  {
    id: "cms-headless",
    title: "Headless CMS in 2026: Choosing With Your Eyes Open",
    category: "Engineering",
    date: "Jan 27, 2026",
    readTime: "9 min read",
    excerpt:
      "Sanity, Contentful, a custom file system — the trade-offs that actually matter for editorial teams, not demos.",
    accent: "#7437ff",
    variant: "grid",
  },
  {
    id: "creative-process",
    title: "Imagination Is a Full-Stack Discipline",
    category: "Opinion",
    date: "Jan 04, 2026",
    readTime: "5 min read",
    excerpt:
      "The best ideas live at the seam between strategy, engineering and aesthetics. A manifesto from the studio floor.",
    accent: "#9a66ff",
    variant: "rings",
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
