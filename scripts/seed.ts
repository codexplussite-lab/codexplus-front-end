import { config } from "dotenv";
import { createClient } from "@sanity/client";
import {
  brand,
  clients as clientsData,
  navLinks,
  owner as ownerData,
  posts as postData,
  projects as projectData,
  services as serviceData,
  socials,
  stats,
  team as teamData,
  testimonials as testimonialData,
} from "../data/content";

config();
config({ path: ".env.local", override: true });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION;
const token = process.env.SANITY_API_TOKEN;

if (!projectId) {
  throw new Error(
    "NEXT_PUBLIC_SANITY_PROJECT_ID is missing. Add it to .env.local — see .env.local.example",
  );
}
if (!dataset) {
  throw new Error(
    "NEXT_PUBLIC_SANITY_DATASET is missing. Add it to .env.local — see .env.local.example",
  );
}
if (!apiVersion) {
  throw new Error(
    "NEXT_PUBLIC_SANITY_API_VERSION is missing. Add it to .env.local — see .env.local.example",
  );
}
if (!token) {
  throw new Error(
    "SANITY_API_TOKEN is missing. Add it to .env.local — see .env.local.example",
  );
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function main() {
  const ops: Promise<unknown>[] = [];

  serviceData.forEach((s, i) => {
    ops.push(
      client.createOrReplace({
        _id: `service-${s.id}`,
        _type: "service",
        index: s.index,
        title: s.title,
        description: s.description,
        points: s.points,
        icon: s.icon,
        sortOrder: i,
      }),
    );
  });

  projectData.forEach((p, i) => {
    const media = p.backgroundMedia;
    const isImage = media?.mediaType !== "video";
    const imageUrl = isImage ? media?.image : undefined;
    ops.push(
      client.createOrReplace({
        _id: `project-${p.id}`,
        _type: "project",
        title: p.title,
        slug: { _type: "slug", current: slugify(p.title) },
        client: p.client,
        category: p.category,
        year: p.year,
        services: p.services,
        summary: p.summary,
        description: p.description,
        palette: p.palette,
        variant: p.variant,
        tall: p.tall ?? false,
        liveUrl: p.liveUrl,
        coverImage: imageUrl
          ? { _type: "image", _sanityAsset: `image@${imageUrl}` }
          : undefined,
        backgroundMedia: media
          ? isImage && imageUrl
            ? {
                mediaType: "image",
                image: { _type: "image", _sanityAsset: `image@${imageUrl}` },
              }
            : { mediaType: "video", videoUrl: media.videoUrl }
          : undefined,
        sortOrder: i,
      }),
    );
  });

  // ----------------------------------------------------
  // ADD REQUESTED DEMO DATA
  // ----------------------------------------------------

  const customServices = [
    {
      id: "full-stack-web-development",
      index: "01",
      title: "Full-Stack Web Development",
      description: "End-to-end web engineering focusing on performance, scalability, and seamless user experiences. We build robust architectures using modern frameworks.",
      points: ["React & Next.js", "Node.js & Express", "Database Design", "API Development"],
      icon: "code",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop", // added as per request
    },
    {
      id: "ui-ux-brand-design",
      index: "02",
      title: "UI/UX & Digital Brand Design",
      description: "Crafting digital identities and user interfaces that resonate. We prioritize intuitive flows, accessibility, and pixel-perfect visual design.",
      points: ["Wireframing", "Prototyping", "Brand Identity", "Design Systems"],
      icon: "palette",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop",
    },
    {
      id: "headless-cms-ecommerce",
      index: "03",
      title: "Headless CMS & E-Commerce",
      description: "Future-proof content and commerce architectures. We decouple your frontend from the backend to deliver blazing-fast, omnichannel experiences.",
      points: ["Sanity CMS", "Shopify Plus", "Content Modeling", "Omnichannel Delivery"],
      icon: "lightbulb",
      image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?q=80&w=2000&auto=format&fit=crop",
    }
  ];

  customServices.forEach((s, i) => {
    ops.push(
      client.createOrReplace({
        _id: `service-${s.id}`,
        _type: "service",
        index: s.index,
        title: s.title,
        description: s.description,
        points: s.points,
        icon: s.icon,
        sortOrder: serviceData.length + i,
        // Using imageUrl in case the schema gets updated, though it's not currently mapped
        imageUrl: s.image,
      }),
    );
  });

  postData.forEach((p, i) => {
    ops.push(
      client.createOrReplace({
        _id: `post-${p.id}`,
        _type: "post",
        title: p.title,
        slug: { _type: "slug", current: slugify(p.title) },
        category: p.category,
        date: p.date,
        readTime: p.readTime,
        excerpt: p.excerpt,
        author: p.author,
        coverImage: p.coverImage
          ? { _type: "image", _sanityAsset: `image@${p.coverImage}` }
          : undefined,
        videoUrl: p.videoUrl,
        content: p.content,
        accent: p.accent,
        variant: p.variant,
        sortOrder: i,
      }),
    );
  });

  testimonialData.forEach((t, i) => {
    ops.push(
      client.createOrReplace({
        _id: `testimonial-${slugify(t.name)}`,
        _type: "testimonial",
        quote: t.quote,
        name: t.name,
        role: t.role,
        initials: t.initials,
        accent: t.accent,
        sortOrder: i,
      }),
    );
  });

  ops.push(
    client.createOrReplace({
      _id: "siteSettings",
      _type: "siteSettings",
      name: brand.name,
      tagline: brand.tagline,
      email: brand.email,
      phoneIntl: brand.phoneIntl,
      locations: brand.locations,
      navLinks,
      socials,
      stats,
      clients: clientsData,
    }),
  );

  ops.push(
    client.createOrReplace({
      _id: "owner",
      _type: "owner",
      name: ownerData.name,
      role: ownerData.role,
      bio: ownerData.bio,
      description: ownerData.description,
    }),
  );

  teamData.forEach((t, i) => {
    ops.push(
      client.createOrReplace({
        _id: `team-${slugify(t.name)}`,
        _type: "teamMember",
        name: t.name,
        role: t.role,
        bio: t.bio,
        sortOrder: i,
      }),
    );
  });

  await Promise.all(ops);

  console.log(
    `Seeded ${serviceData.length} services, ${projectData.length} projects, ${postData.length} posts, ${testimonialData.length} testimonials, owner, team, and siteSettings into Sanity.`,
  );

  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
