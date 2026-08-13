import { createClient, type SanityClient } from "@sanity/client";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-01-01";

let _client: SanityClient | undefined;
let _writeClient: SanityClient | undefined;

export function getClient(): SanityClient {
  if (!projectId) {
    console.warn(
      "⚠️ NEXT_PUBLIC_SANITY_PROJECT_ID is missing. Add your Sanity project id to .env.local — see .env.local.example",
    );
  }
  if (!_client) {
    _client = createClient({ projectId: projectId || "missing", dataset, apiVersion, useCdn: false });
  }
  return _client;
}

export function getWriteClient(): SanityClient {
  if (!projectId || !process.env.SANITY_API_TOKEN) {
    console.warn(
      "⚠️ NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_TOKEN are required. Add them to .env.local — see .env.local.example",
    );
  }
  if (!_writeClient) {
    _writeClient = createClient({
      projectId: projectId || "missing",
      dataset,
      apiVersion,
      token: process.env.SANITY_API_TOKEN,
      useCdn: false,
    });
  }
  return _writeClient;
}

export const servicesQuery = `
*[_type == "service"] | order(sortOrder asc) {
  "id": _id,
  index,
  title,
  description,
  points,
  icon,
  sortOrder
}
`;

export const projectsQuery = `
*[_type == "project"] | order(sortOrder asc) {
  "id": _id,
  title,
  "slug": slug.current,
  client,
  category,
  year,
  services,
  summary,
  description,
  palette,
  variant,
  tall,
  sortOrder
}
`;

export const postsQuery = `
*[_type == "post"] | order(sortOrder asc) {
  "id": _id,
  title,
  "slug": slug.current,
  category,
  date,
  readTime,
  excerpt,
  accent,
  variant,
  sortOrder
}
`;

export const testimonialsQuery = `
*[_type == "testimonial"] | order(sortOrder asc) {
  "id": _id,
  quote,
  name,
  role,
  initials,
  accent,
  sortOrder
}
`;

export const ownerQuery = `
*[_type == "owner"][0] {
  "id": _id,
  name,
  role,
  bio,
  description,
  "image": image.asset->url,
  "imageAlt": image.alt
}
`;

export const teamQuery = `
*[_type == "teamMember"] | order(sortOrder asc) {
  "id": _id,
  name,
  role,
  bio,
  "photo": photo.asset->url,
  "photoAlt": photo.alt,
  sortOrder
}
`;

export const siteSettingsQuery = `
*[_type == "siteSettings"][0] {
  "siteName": name,
  "siteLogo": logo.asset->url,
  "logoAlt": logo.alt,
  "favicon": favicon.asset->url,
  tagline,
  email,
  phoneIntl,
  locations[]{
    city,
    country,
    region,
    address,
    phone,
    contactType
  },
  navLinks,
  usefulLinks,
  socials,
  stats,
  clients,
  highlights
}
`;

export const homeQuery = `
*[_type == "home"][0] {
  heroTitle,
  heroSubtitle,
  ctaLabel,
  ctaUrl
}
`;

export const pageQuery = `
*[_type == "page" && slug.current == $slug][0] {
  "id": _id,
  title,
  "slug": slug.current,
  lastUpdated,
  heading,
  subheading,
  content
}
`;

export const jobsQuery = `
*[_type == "job"] | order(sortOrder asc) {
  "id": _id,
  title,
  "slug": slug.current,
  department,
  location,
  requirements,
  applyUrl,
  sortOrder
}
`;

export const projectBySlugQuery = `
*[_type == "project" && slug.current == $slug][0] {
  "id": _id,
  title,
  "slug": slug.current,
  client,
  category,
  year,
  services,
  summary,
  description,
  content,
  liveUrl,
  palette,
  variant,
  tall
}
`;

export const postBySlugQuery = `
*[_type == "post" && slug.current == $slug][0] {
  "id": _id,
  title,
  "slug": slug.current,
  category,
  date,
  readTime,
  excerpt,
  content,
  accent,
  variant
}
`;
