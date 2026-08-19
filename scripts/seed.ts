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
  slugify,
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

const CATEGORY_ORDER = [
  "Web Design",
  "E-Commerce",
  "Product Design",
  "Brand Identity",
  "Web App",
  "Mobile App",
];

async function uploadImage(url: string, label: string) {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.warn(
        `Could not fetch image for ${label} (HTTP ${res.status}): ${url}`,
      );
      return null;
    }
    const buffer = Buffer.from(await res.arrayBuffer());
    const asset = await client.assets.upload("image", buffer, {
      contentType: res.headers.get("content-type") || "image/jpeg",
      filename: `${label}.jpg`,
    });
    return asset._id;
  } catch (err) {
    console.warn(`Could not upload image for ${label}:`, err);
    return null;
  }
}

function imageRef(assetId: string | null) {
  if (!assetId) return undefined;
  return { _type: "image", asset: { _type: "reference", _ref: assetId } };
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

  // ----------------------------------------------------
  // PROJECTS — 24 documents (4 per category), images uploaded as Sanity assets
  // ----------------------------------------------------
  const projectOps: Promise<unknown>[] = [];
  for (let i = 0; i < projectData.length; i++) {
    const p = projectData[i];
    const bg = p.backgroundMedia;
    const imageUrl = typeof bg?.image === "string" ? bg.image : undefined;
    const coverImageUrl =
      typeof p.coverImage === "string" ? p.coverImage : imageUrl;

    const imageAssetId = imageUrl ? await uploadImage(imageUrl, p.id) : null;
    const coverAssetId =
      coverImageUrl && coverImageUrl !== imageUrl
        ? await uploadImage(coverImageUrl, `${p.id}-cover`)
        : imageAssetId;

    projectOps.push(
      client.createOrReplace({
        _id: `project-${p.id}`,
        _type: "project",
        title: p.title,
        slug: { _type: "slug", current: slugify(p.title) },
        client: p.client,
        category: p.category,
        year: p.year,
        disciplines: p.disciplines,
        summary: p.summary,
        description: p.description,
        liveUrl: p.liveUrl,
        palette: p.palette,
        variant: p.variant,
        tall: p.tall ?? false,
        sortOrder: i,
        ...(coverAssetId && { coverImage: imageRef(coverAssetId) }),
        ...(bg?.videoUrl && { videoUrl: bg.videoUrl }),
        backgroundMedia: {
          _type: "mediaAsset",
          mediaType: bg?.mediaType ?? "image",
          ...(imageAssetId && { image: imageRef(imageAssetId) }),
          ...(bg?.videoUrl && { videoUrl: bg.videoUrl }),
        },
      }),
    );
  }
  console.log(`Uploading images and seeding ${projectData.length} projects…`);
  await Promise.all(projectOps);

  // ----------------------------------------------------
  // ADD REQUESTED DEMO SERVICES
  // ----------------------------------------------------

  const customServices = [
    {
      id: "full-stack-web-development",
      index: "05",
      title: "Full-Stack Web Development",
      description: "End-to-end web engineering focusing on performance, scalability, and seamless user experiences. We build robust architectures using modern frameworks.",
      points: ["React & Next.js", "Node.js & Express", "Database Design", "API Development"],
      icon: "code",
    },
    {
      id: "ui-ux-brand-design",
      index: "06",
      title: "UI/UX & Digital Brand Design",
      description: "Crafting digital identities and user interfaces that resonate. We prioritize intuitive flows, accessibility, and pixel-perfect visual design.",
      points: ["Wireframing", "Prototyping", "Brand Identity", "Design Systems"],
      icon: "palette",
    },
    {
      id: "headless-cms-ecommerce",
      index: "07",
      title: "Headless CMS & E-Commerce",
      description: "Future-proof content and commerce architectures. We decouple your frontend from the backend to deliver blazing-fast, omnichannel experiences.",
      points: ["Sanity CMS", "Shopify Plus", "Content Modeling", "Omnichannel Delivery"],
      icon: "lightbulb",
    },
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

  const counts = CATEGORY_ORDER.map((cat) => {
    const n = projectData.filter((p) => p.category === cat).length;
    return `${cat}: ${n}`;
  }).join(", ");

  console.log(
    `Seeded ${serviceData.length + customServices.length} services, ${projectData.length} projects (${counts}), ${postData.length} posts, ${testimonialData.length} testimonials, owner, team, and siteSettings into Sanity.`,
  );

  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});