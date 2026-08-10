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
} from "@/data/content";

export type ServiceRow = {
  id: string;
  index: string;
  title: string;
  description: string;
  points: string[];
  icon: string;
  sortOrder: number;
};

export type ProjectRow = {
  id: string;
  title: string;
  client: string;
  category: string;
  year: string;
  services: string[];
  summary: string;
  description: string[];
  palette: [string, string, string];
  variant: string;
  tall: boolean;
  sortOrder: number;
};

export type PostRow = {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
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
  locations?: { city: string; country: string; region: string }[];
  navLinks?: { label: string; href: string }[];
  usefulLinks?: { label: string; href: string }[];
  socials?: { label: string; href: string }[];
  stats?: { value: number; suffix: string; label: string }[];
  clients?: string[];
  highlights?: string[];
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
