import { unstable_noStore as noStore } from "next/cache";
import {
  getClient,
  ownerQuery,
  postsQuery,
  projectsQuery,
  servicesQuery,
  siteSettingsQuery,
  teamQuery,
  testimonialsQuery,
  homeQuery,
  pageQuery,
  jobsQuery,
  projectBySlugQuery,
  postBySlugQuery,
  skillsQuery,
} from "@/lib/sanity";
import {
  brand,
  clients as clientsData,
  navLinks,
  owner as ownerData,
  posts as postsData,
  projects as projectsData,
  services as servicesData,
  socials,
  stats,
  team as teamData,
  testimonials as testimonialsData,
  skillCategories as skillCategoriesData,
  defaultCardNavItems,
  type CardNavItemData,
  type SkillCategory,
} from "@/data/content";

export type ServiceRow = {
  id: string;
  index: string;
  title: string;
  description: string;
  points: string[];
  icon: string;
  image?: string;
  imageAlt?: string;
  videoUrl?: string;
  videoFileUrl?: string;
  sortOrder: number;
};

export type ProjectRow = {
  id: string;
  title: string;
  slug?: string;
  client: string;
  category: string;
  year: string;
  services: string[];
  summary: string;
  description: string[];
  content?: any;
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
  palette: [string, string, string];
  variant: string;
  tall: boolean;
  sortOrder: number;
};

export type PostRow = {
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
  variant: string;
  sortOrder: number;
};

export type TestimonialRow = {
  id: string;
  quote: string;
  name: string;
  role: string;
  initials: string;
  accent: string;
  sortOrder: number;
};

export type OwnerRow = {
  id: string;
  name: string;
  role: string;
  bio: string;
  description: string[];
  image: string;
  imageAlt: string;
};

export type TeamMemberRow = {
  id: string;
  name: string;
  role: string;
  bio: string;
  photo: string;
  photoAlt: string;
  sortOrder: number;
};

export type SiteSettings = {
  siteName?: string;
  siteLogo?: string;
  logoAlt?: string;
  favicon?: string;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  ogImage?: string;
  tagline?: string;
  email?: string;
  phoneIntl?: string[];
  locations?: { city: string; country: string; region: string; address?: string; phone?: string; contactType?: string }[];
  navLinks?: { label: string; href: string }[];
  cardNavItems?: CardNavItemData[];
  usefulLinks?: { label: string; href: string }[];
  socials?: { label: string; href: string }[];
  stats?: { value: number; suffix: string; label: string }[];
  clients?: string[];
  highlights?: string[];
  aboutKicker?: string;
  aboutTitle?: string;
  aboutDescription?: string[];
  aboutBadge1Number?: string;
  aboutBadge1Label?: string;
  aboutBadge2Number?: string;
  aboutBadge2Label?: string;
  ctaTagline?: string;
  ctaHeading?: string;
  ctaDescription?: string;
  ctaBookingNotice?: string;
  ctaSecondaryLabel?: string;
  ctaSecondaryUrl?: string;
  contactFeatures?: string[];
  copyrightText?: string;
};

export type HomeRow = {
  heroTitle?: string;
  heroSubtitle?: string;
  ctaLabel?: string;
  ctaUrl?: string;
  secondaryCtaLabel?: string;
  secondaryCtaUrl?: string;
  scrollLabel?: string;
  servicesKicker?: string;
  servicesTitle?: string;
  servicesDescription?: string;
  skillsKicker?: string;
  skillsTitle?: string;
  skillsDescription?: string;
  portfolioKicker?: string;
  portfolioTitle?: string;
  testimonialsKicker?: string;
  testimonialsTitle?: string;
  blogKicker?: string;
  blogTitle?: string;
};

export type SkillCategoryRow = {
  id: string;
  title: string;
  icon: string;
  skills: string[];
  sortOrder: number;
};

export type PageRow = {
  id: string;
  title: string;
  slug: string;
  lastUpdated?: string;
  heading?: string;
  subheading?: string;
  content?: any;
};

export type JobRow = {
  id: string;
  title: string;
  slug: string;
  department?: string;
  location?: string;
  requirements?: any;
  applyUrl?: string;
  sortOrder: number;
};

const warn = (err: unknown) =>
  console.warn("Sanity unavailable — falling back to local content.", err);

export async function getServices(): Promise<ServiceRow[]> {
  noStore();
  try {
    const rows = await getClient().fetch<ServiceRow[]>(servicesQuery);
    if (rows && rows.length > 0) return rows;
  } catch (err) {
    warn(err);
  }
  return servicesData.map((s, i) => ({ ...s, sortOrder: i }));
}

export async function getProjects(): Promise<ProjectRow[]> {
  noStore();
  try {
    const rows = await getClient().fetch<ProjectRow[]>(projectsQuery);
    if (rows && rows.length > 0) return rows;
  } catch (err) {
    warn(err);
  }
  return projectsData.map((p, i) => ({ ...p, tall: p.tall ?? false, sortOrder: i }));
}

export async function getPosts(): Promise<PostRow[]> {
  noStore();
  try {
    const rows = await getClient().fetch<PostRow[]>(postsQuery);
    if (rows && rows.length > 0) return rows;
  } catch (err) {
    warn(err);
  }
  return postsData.map((p, i) => ({ ...p, sortOrder: i }));
}

export async function getTestimonials(): Promise<TestimonialRow[]> {
  noStore();
  try {
    const rows = await getClient().fetch<TestimonialRow[]>(testimonialsQuery);
    if (rows && rows.length > 0) return rows;
  } catch (err) {
    warn(err);
  }
  return testimonialsData.map((t, i) => ({ id: `testimonial-${i + 1}`, ...t, sortOrder: i }));
}

export async function getSiteSettings(): Promise<SiteSettings> {
  noStore();
  try {
    const data = await getClient().fetch<SiteSettings>(siteSettingsQuery);
    if (data && (data.siteName || data.email || data.clients || data.siteLogo)) return data;
  } catch (err) {
    warn(err);
  }
  return {
    siteName: brand.name,
    tagline: brand.tagline,
    email: brand.email,
    phoneIntl: brand.phoneIntl,
    locations: brand.locations,
    navLinks,
    cardNavItems: defaultCardNavItems,
    socials,
    stats,
    clients: clientsData,
    aboutKicker: "About the studio",
    aboutTitle: "Where imagination meets engineering.",
    aboutDescription: [
      "At our design studio, we're passionate about transforming raw ideas into reality. Every project starts with curiosity and ends with something people genuinely love to use.",
      "From first sketch to final deploy, we grow together with our clients — pairing clean, thoughtful engineering with visual direction that refuses to blend in.",
    ],
    aboutBadge1Number: "12+",
    aboutBadge1Label: "Years of craft",
    aboutBadge2Number: "40k+",
    aboutBadge2Label: "creators shipped",
    ctaTagline: "Let's build something",
    ctaHeading: "Have an idea worth building?",
    ctaDescription:
      "Tell us where you want to go. We'll bring the strategy, the craft and the code. Response within 24 hours.",
    ctaBookingNotice: `Currently booking Q3 ${new Date().getFullYear()} projects`,
    ctaSecondaryLabel: "See the work",
    ctaSecondaryUrl: "#portfolio",
    contactFeatures: [
      "Personalized assistance",
      "Timely response",
      "Comprehensive support",
    ],
    copyrightText: "All rights reserved.",
  };
}

export async function getOwner(): Promise<OwnerRow> {
  noStore();
  try {
    const data = await getClient().fetch<OwnerRow>(ownerQuery);
    if (data && data.name) return data;
  } catch (err) {
    warn(err);
  }
  return { ...ownerData, id: ownerData.id };
}

export async function getTeam(): Promise<TeamMemberRow[]> {
  noStore();
  try {
    const rows = await getClient().fetch<TeamMemberRow[]>(teamQuery);
    if (rows && rows.length > 0) return rows;
  } catch (err) {
    warn(err);
  }
  return teamData.map((t, i) => ({ ...t, sortOrder: i }));
}

export async function getHome(): Promise<HomeRow | null> {
  noStore();
  try {
    const data = await getClient().fetch<HomeRow>(homeQuery);
    if (data && (data.heroTitle || data.heroSubtitle)) return data;
  } catch (err) {
    warn(err);
  }
  return {
    heroTitle: "Crafting Digital Excellence",
    heroSubtitle: `${brand.name} is a high-end digital agency & engineering studio. We build conversion-driven web products, modern brand identities, and immersive digital experiences.`,
    ctaLabel: "View Selected Work",
    ctaUrl: "#portfolio",
    secondaryCtaLabel: "Get In Touch",
    secondaryCtaUrl: "#contact",
    scrollLabel: "Scroll Down",
    servicesKicker: "What we do",
    servicesTitle: "Services engineered for impact.",
    servicesDescription:
      "Four tightly-argued disciplines, one accountable team. Strategy through shipping — no hand-offs, no dropped balls.",
    skillsKicker: "Skills & Stack",
    skillsTitle: "Engineered with precision & modern technology.",
    skillsDescription:
      "A curated tech stack focused on high performance, seamless user experience, and scalable code standards.",
    portfolioKicker: "Selected work",
    portfolioTitle: "Crafted for scale.",
    testimonialsKicker: "Customer voices",
    testimonialsTitle: "Trusted by teams worldwide.",
    blogKicker: "Journal",
    blogTitle: "Insights & field notes.",
  };
}

export async function getSkills(): Promise<SkillCategoryRow[]> {
  noStore();
  try {
    const rows = await getClient().fetch<SkillCategoryRow[]>(skillsQuery);
    if (rows && rows.length > 0) return rows;
  } catch (err) {
    warn(err);
  }
  return skillCategoriesData;
}

export async function getPage(slug: string): Promise<PageRow | null> {
  noStore();
  try {
    const data = await getClient().fetch<PageRow>(pageQuery, { slug });
    if (data) return data;
  } catch (err) {
    warn(err);
  }
  return null;
}

export async function getJobs(): Promise<JobRow[]> {
  noStore();
  try {
    const rows = await getClient().fetch<JobRow[]>(jobsQuery);
    if (rows && rows.length > 0) return rows;
  } catch (err) {
    warn(err);
  }
  return [];
}

export async function getProjectBySlug(slug: string): Promise<ProjectRow | null> {
  noStore();
  try {
    const data = await getClient().fetch<ProjectRow>(projectBySlugQuery, { slug });
    if (data) return data;
  } catch (err) {
    warn(err);
  }
  // fallback to local if not found in sanity
  const localProject = projectsData.find(p => p.title.toLowerCase().replace(/\s+/g, '-') === slug);
  if (localProject) {
    return { ...localProject, id: localProject.title, tall: localProject.tall ?? false, sortOrder: 0, slug };
  }
  return null;
}

export async function getPostBySlug(slug: string): Promise<PostRow | null> {
  noStore();
  try {
    const data = await getClient().fetch<PostRow>(postBySlugQuery, { slug });
    if (data) return data;
  } catch (err) {
    warn(err);
  }
  const slugified = (value: string) =>
    value.toLowerCase().replace(/\s+/g, "-");
  const localPost = postsData.find(
    (p) =>
      p.slug === slug ||
      p.id === slug ||
      slugified(p.title) === slug,
  );
  if (localPost) {
    return {
      ...localPost,
      id: localPost.title,
      slug: localPost.slug ?? slugified(localPost.title),
      sortOrder: 0,
    };
  }
  return null;
}
