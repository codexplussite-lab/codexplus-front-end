import { createClient, type SanityClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";

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

const builder = createImageUrlBuilder({ projectId, dataset });

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
  services,
  summary,
  description,
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
  tags,
  date,
  readTime,
  excerpt,
  author,
  "coverImage": coverImage.asset->url,
  "coverImageAlt": coverImage.alt,
  videoUrl,
  accent,
  variant,
  sortOrder
}
`;

export const testimonialsQuery = `
*[_type == "testimonial"] | order(sortOrder asc) {
  "id": _id,
  _id,
  name,
  date,
  role,
  review,
  quote,
  rating,
  clientImage,
  "imageUrl": clientImage.asset->url,
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
  metaTitle,
  metaDescription,
  keywords,
  "ogImage": ogImage.asset->url,
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
  cardNavItems[]{
    label,
    bgColor,
    textColor,
    links[]{
      label,
      href,
      ariaLabel
    }
  },
  usefulLinks,
  socials,
  stats,
  clients,
  highlights,
  aboutKicker,
  aboutTitle,
  aboutDescription,
  aboutBadge1Number,
  aboutBadge1Label,
  aboutBadge2Number,
  aboutBadge2Label,
  ctaTagline,
  ctaHeading,
  ctaDescription,
  ctaBookingNotice,
  ctaSecondaryLabel,
  ctaSecondaryUrl,
  contactFeatures,
  copyrightText
}
`;

export const homeQuery = `
*[_type == "home"][0] {
  heroTitle,
  heroSubtitle,
  ctaLabel,
  ctaUrl,
  secondaryCtaLabel,
  secondaryCtaUrl,
  scrollLabel,
  servicesKicker,
  servicesTitle,
  servicesDescription,
  skillsKicker,
  skillsTitle,
  skillsDescription,
  portfolioKicker,
  portfolioTitle,
  testimonialsKicker,
  testimonialsTitle,
  blogKicker,
  blogTitle
}
`;

export const skillsQuery = `
*[_type == "skillCategory"] | order(sortOrder asc) {
  "id": _id,
  title,
  icon,
  skills,
  sortOrder
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
  tags,
  date,
  readTime,
  excerpt,
  author,
  "coverImage": coverImage.asset->url,
  "coverImageAlt": coverImage.alt,
  videoUrl,
  content,
  accent,
  variant
}
`;
