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
};

export const projects: Project[] = [
  {
    id: "maison-noor",
    title: "Maison Noor",
    client: "Interior Design Studio",
    category: "Web Design",
    year: "2026",
    services: ["Brand Identity", "Web Design", "Next.js Development"],
    summary: "A serene digital flagship for a high-end interior studio — slow, editorial, sculptural.",
    description: [
      "Maison Noor came to us with a decade of iconic interiors and a website that said nothing about them. We rebuilt their presence around stillness: generous negative space, a bespoke serif system and full-bleed imagery that lets their spaces breathe.",
      "The result is a site that behaves like a gallery — quiet navigation, cinematic scroll reveals and a CMS that lets their team publish new projects in minutes.",
    ],
    palette: ["#0b0f19", "#9a66ff", "#2e3a59"],
    variant: "prism",
    tall: true,
  },
  {
    id: "vanta-commerce",
    title: "Vanta Commerce",
    client: "D2C Fashion Platform",
    category: "E-Commerce",
    year: "2025",
    services: ["UX Strategy", "Shopify / Next.js", "Performance"],
    summary: "A 190ms storefront rebuild that lifted conversion by 38% within a single quarter.",
    description: [
      "Vanta's legacy store was drowning in plugins and loading at 4.2 seconds. We stripped it to essentials and rebuilt on a headless Next.js architecture with edge rendering and instant optimistic cart interactions.",
      "Core Web Vitals went from red to perfect green, and every product page now behaves like a runway show.",
    ],
    palette: ["#0b0f19", "#7437ff", "#232746"],
    variant: "grid",
  },
  {
    id: "pulse-analytics",
    title: "Pulse Analytics",
    client: "SaaS Platform",
    category: "Product Design",
    year: "2025",
    services: ["Product Design", "Design System", "Frontend"],
    summary: "A real-time analytics suite with an interface calm enough to live in all day.",
    description: [
      "Pulse needed to make a firehose of data feel approachable. We designed a modular dashboard language — dense but airy, technical but warm — and shipped a 120-component design system in Figma and React.",
      "Onboarding completion jumped 41% after launch. Their team now builds features in days instead of weeks.",
    ],
    palette: ["#0b0f19", "#7437ff", "#9a66ff"],
    variant: "blobs",
  },
  {
    id: "northwind-identity",
    title: "Northwind",
    client: "Outdoor Apparel Brand",
    category: "Brand Identity",
    year: "2024",
    services: ["Brand Strategy", "Identity", "Packaging"],
    summary: "A complete rebrand forged in the mountains — type, tone and texture built to endure weather.",
    description: [
      "Northwind had great product and a forgettable logo. We built an identity rooted in topographic lines, weatherproof utility and a bolder shade of alpine orange that owns every shelf it sits on.",
      "The system spans packaging, wayfinding and a full motion kit — and doubled wholesale inquiries in six months.",
    ],
    palette: ["#0b0f19", "#7437ff", "#232746"],
    variant: "waves",
    tall: true,
  },
  {
    id: "folio-builder",
    title: "Folio Builder",
    client: "Creator Platform",
    category: "Web App",
    year: "2024",
    services: ["Full-Stack", "No-code Engine", "CMS"],
    summary: "A no-code portfolio engine helping 40k+ creators ship beautiful sites in under an hour.",
    description: [
      "Folio makes it effortless for photographers, designers and writers to publish stunning portfolios without touching code. We built the core editor, block engine and marketplace from the ground up.",
      "Fourteen thousand sites launched in the first 90 days. The template marketplace is now their biggest revenue line.",
    ],
    palette: ["#0b0f19", "#2e3a59", "#9a66ff"],
    variant: "orbits",
  },
  {
    id: "aurora-app",
    title: "Aurora Health",
    client: "Consumer Health App",
    category: "Mobile App",
    year: "2023",
    services: ["UX Research", "App Design", "Motion"],
    summary: "A sleep-and-recovery companion designed to feel as calm as it promises to be.",
    description: [
      "Aurora helps people build better recovery habits. We designed an app experience built around gentleness — soft gradients, breathing micro-interactions and data framed as encouragement, not judgment.",
      "App Store rating sits at 4.9 with a 71% 30-day retention rate.",
    ],
    palette: ["#0b0f19", "#9a66ff", "#7437ff"],
    variant: "rings",
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
