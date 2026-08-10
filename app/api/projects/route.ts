import { NextResponse } from "next/server";
import { getClient, projectsQuery } from "@/lib/sanity";
import { projects as projectsData } from "@/data/content";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const rows = await getClient().fetch(projectsQuery);
    if (Array.isArray(rows) && rows.length > 0) return NextResponse.json(rows);
    return NextResponse.json(projectsData);
  } catch (err) {
    console.error("GET /api/projects failed", err);
    return NextResponse.json(projectsData);
  }
}
