import { NextResponse } from "next/server";
import { getClient, postsQuery } from "@/lib/sanity";
import { posts as postsData } from "@/data/content";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const rows = await getClient().fetch(postsQuery);
    if (Array.isArray(rows) && rows.length > 0) return NextResponse.json(rows);
    return NextResponse.json(postsData);
  } catch (err) {
    console.error("GET /api/posts failed", err);
    return NextResponse.json(postsData);
  }
}
