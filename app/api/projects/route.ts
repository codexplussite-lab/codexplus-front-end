import { NextResponse } from "next/server";
import { getClient, projectsQuery } from "@/lib/sanity";
import { projects as staticProjects, type Project } from "@/data/content";

export const dynamic = "force-dynamic";

const DEFAULT_PALETTE: [string, string, string] = ["#0b0f19", "#7437ff", "#9a66ff"];

function normalizeProject(row: any, fallback?: Project): Project {
  return {
    id: row.id ?? fallback?.id ?? `project-${row.title ?? Math.random().toString(36).slice(2)}`,
    title: row.title ?? fallback?.title ?? "Untitled Project",
    client: row.client ?? fallback?.client ?? "CodeXplus Studio",
    category: row.category ?? fallback?.category ?? "Web Design",
    year: row.year ?? fallback?.year ?? "2026",
    services:
      Array.isArray(row.services) && row.services.length > 0
        ? row.services
        : (fallback?.services ?? []),
    summary: row.summary ?? fallback?.summary ?? "",
    description:
      Array.isArray(row.description) && row.description.length > 0
        ? row.description
        : (fallback?.description ?? []),
    palette:
      Array.isArray(row.palette) && row.palette.length === 3
        ? (row.palette as [string, string, string])
        : (fallback?.palette ?? DEFAULT_PALETTE),
    variant: row.variant ?? fallback?.variant ?? "blobs",
    tall: Boolean(row.tall),
    liveUrl: row.liveUrl ?? fallback?.liveUrl,
    coverImage: row.coverImage ?? fallback?.coverImage,
    imageAlt: row.imageAlt ?? fallback?.imageAlt,
    videoUrl: row.videoUrl ?? fallback?.videoUrl,
    videoFileUrl: row.videoFileUrl ?? fallback?.videoFileUrl,
    backgroundMedia: row.backgroundMedia ?? fallback?.backgroundMedia,
  };
}

export async function GET() {
  let rows: any[] = [];
  try {
    const data = await getClient().fetch(projectsQuery);
    if (Array.isArray(data)) rows = data;
  } catch (err) {
    console.error("GET /api/projects failed", err);
  }

  if (rows.length === 0) return NextResponse.json(staticProjects);

  const merged = staticProjects.map((fallback) => {
    const match = rows.find(
      (r) =>
        r.id === `project-${fallback.id}` ||
        (r.title ?? "") === fallback.title ||
        (r.slug ?? "") === fallback.id,
    );
    return normalizeProject(match ?? fallback, fallback);
  });

  const knownTitles = new Set(staticProjects.map((p) => p.title));
  rows
    .filter((r) => r.title && !knownTitles.has(r.title))
    .forEach((extra) => merged.push(normalizeProject(extra)));

  return NextResponse.json(merged);
}