import { config } from "dotenv";
import { createClient } from "@sanity/client";
import {
  posts as postData,
  projects as projectData,
  services as serviceData,
  testimonials as testimonialData,
} from "../data/content";

config();
config({ path: ".env.local", override: true });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !token) {
  throw new Error(
    "NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_TOKEN are missing. Add them to .env.local",
  );
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-01-01",
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

  await Promise.all(ops);

  console.log(
    `Seeded ${serviceData.length} services, ${projectData.length} projects, ${postData.length} posts, ${testimonialData.length} testimonials into Sanity.`,
  );

  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
