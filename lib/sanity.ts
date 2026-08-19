import { createClient, type SanityClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

function requireEnv(value: string | undefined, name: string): string {
  if (!value) {
    throw new Error(
      `Missing required environment variable "${name}". ` +
        `Copy .env.local.example to .env.local and set it, then restart the dev server.`,
    );
  }
  return value;
}

export const projectId = requireEnv(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  "NEXT_PUBLIC_SANITY_PROJECT_ID",
);
export const dataset = requireEnv(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  "NEXT_PUBLIC_SANITY_DATASET",
);
export const apiVersion = requireEnv(
  process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  "NEXT_PUBLIC_SANITY_API_VERSION",
);

let _client: SanityClient | undefined;
let _writeClient: SanityClient | undefined;

const builder = imageUrlBuilder({ projectId, dataset });

export function urlForImage(source: any) {
  return builder.image(source);
}

export function getClient(): SanityClient {
  if (!_client) {
    _client = createClient({ projectId, dataset, apiVersion, useCdn: false });
  }
  return _client;
}

export function getWriteClient(): SanityClient {
  const token = process.env.SANITY_API_TOKEN;
  if (!token) {
    throw new Error(
      'Missing required environment variable "SANITY_API_TOKEN". ' +
        "Add it to .env.local, then restart the dev server.",
    );
  }
  if (!_writeClient) {
    _writeClient = createClient({
      projectId,
      dataset,
      apiVersion,
      token,
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
  "image": image.asset->url,
  "imageAlt": image.alt,
  videoUrl,
  "videoFileUrl": videoFile.asset->url,
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
  disciplines,
  summary,
  description,
  coverImage,
  "imageAlt": coverImage.alt,
  liveUrl,
  videoUrl,
  "videoFileUrl": videoFile.asset->url,
  "backgroundMedia": backgroundMedia {
    mediaType,
    "image": image.asset->url,
    "imageAlt": image.alt,
    videoUrl,
    "videoFileUrl": videoFile.asset->url
  },
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
  disciplines,
  summary,
  description,
  content,
  coverImage,
  "imageAlt": coverImage.alt,
  videoUrl,
  "videoFileUrl": videoFile.asset->url,
  "backgroundMedia": backgroundMedia {
    mediaType,
    "image": image.asset->url,
    "imageAlt": image.alt,
    videoUrl,
    "videoFileUrl": videoFile.asset->url
  },
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
