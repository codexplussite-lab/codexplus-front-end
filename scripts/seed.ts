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

  const customProjects = [
    {
      id: "bin-libaas-ecommerce",
      title: "Bin Libaas Boutique Platform",
      slug: "bin-libaas-ecommerce",
      category: "E-Commerce",
      client: "Bin Libaas",
      year: "2026",
      services: ["E-Commerce", "UI/UX Design", "Full-Stack Web Development"],
      summary: "A modern, high-conversion headless e-commerce storefront tailored for a premium boutique brand.",
      description: [
        "Bin Libaas needed a platform that reflected their premium brand while delivering blazing fast load times and a seamless checkout experience.",
        "We built a headless Shopify storefront using Next.js and Sanity CMS, increasing conversion rates by 45% and reducing bounce rates significantly."
      ],
      palette: ["#1e293b", "#0f172a", "#3b82f6"],
      variant: "grid",
      tall: true,
      liveUrl: "https://demo.binlibaas.com",
      coverImage: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2070&auto=format&fit=crop",
    },
    {
      id: "gigflow-freelance-platform",
      title: "GigFlow Freelance Platform",
      slug: "gigflow-freelance-platform",
      category: "Web App",
      client: "GigFlow Inc",
      year: "2025",
      services: ["SaaS Architecture", "Full-Stack Development", "UI/UX Design"],
      summary: "A next-generation marketplace connecting top-tier freelance talent with enterprise clients.",
      description: [
        "GigFlow required a robust, scalable architecture to handle real-time messaging, secure payments, and complex matching algorithms.",
        "We engineered a scalable Next.js application with a serverless backend, facilitating thousands of concurrent users with zero downtime."
      ],
      palette: ["#4c1d95", "#2e1065", "#8b5cf6"],
      variant: "blobs",
      tall: false,
      liveUrl: "https://demo.gigflow.com",
      coverImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop",
    },
    {
      id: "flow-focus-workspace",
      title: "Flow Focus Workspace",
      slug: "flow-focus-workspace",
      category: "Product Design",
      client: "Flow Focus",
      year: "2024",
      services: ["UI/UX Design", "Frontend Engineering"],
      summary: "A minimalist productivity workspace application designed to minimize distractions and enhance deep work.",
      description: [
        "The Flow Focus team approached us to redesign their core web application, focusing heavily on accessibility and cognitive load reduction.",
        "Through extensive user testing and iterative design, we delivered a streamlined interface that users love, increasing daily active usage by over 60%."
      ],
      palette: ["#064e3b", "#022c22", "#10b981"],
      variant: "rings",
      tall: false,
      liveUrl: "https://demo.flowfocus.com",
      coverImage: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=2070&auto=format&fit=crop",
    }
  ];

  customProjects.forEach((p, i) => {
    ops.push(
      client.createOrReplace({
        _id: `project-${p.id}`,
        _type: "project",
        title: p.title,
        slug: { _type: "slug", current: p.slug },
        liveUrl: p.liveUrl,
        client: p.client,
        category: p.category,
        year: p.year,
        services: p.services,
        summary: p.summary,
        description: p.description,
        palette: p.palette,
        variant: p.variant,
        tall: p.tall,
        sortOrder: projectData.length + i,
        // Include dummy image URL, could be updated in schema later as 'coverImage'
        coverImage: p.coverImage,
      }),
    );
  });

  postData.forEach((p, i) => {
    ops.push(
      client.createOrReplace({
        _id: `post-${p.id}`,
        _type: "post",
        title: p.title,
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

  console.log(
    `Seeded ${serviceData.length} services, ${projectData.length} projects, ${postData.length} posts, ${testimonialData.length} testimonials, owner, team, and siteSettings into Sanity.`,
  );

  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
