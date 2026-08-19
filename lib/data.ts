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
} from "@/lib/sanity";
import {
  brand,
  clients as clientsData,
  navLinks,
  owner as ownerData,
  posts as postsData,
  projects as projectsData,
  services as servicesData,
  slugify,
  socials,
  stats,
  team as teamData,
  testimonials as testimonialsData,
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
  disciplines: string[];
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
  date: string;
  readTime: string;
  excerpt: string;
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
  tagline?: string;
  email?: string;
  phoneIntl?: string[];
  locations?: { city: string; country: string; region: string; address?: string; phone?: string; contactType?: string }[];
  navLinks?: { label: string; href: string }[];
  usefulLinks?: { label: string; href: string }[];
  socials?: { label: string; href: string }[];
  stats?: { value: number; suffix: string; label: string }[];
  clients?: string[];
  highlights?: string[];
};

export type HomeRow = {
  heroTitle?: string;
  heroSubtitle?: string;
  ctaLabel?: string;
  ctaUrl?: string;
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
    if (data && (data.siteName || data.email || data.clients)) return data;
  } catch (err) {
    warn(err);
  }
  return {
    siteName: brand.name,
    email: brand.email,
    phoneIntl: brand.phoneIntl,
    locations: brand.locations,
    navLinks,
    socials,
    stats,
    clients: clientsData,
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
    if (data) return data;
  } catch (err) {
    warn(err);
  }
  return null;
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
  const localProject = projectsData.find((p) => slugify(p.title) === slug);
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
  const localPost = postsData.find(p => p.title.toLowerCase().replace(/\s+/g, '-') === slug);
  if (localPost) {
    return { ...localPost, id: localPost.title, sortOrder: 0, slug };
  }
  return null;
}
