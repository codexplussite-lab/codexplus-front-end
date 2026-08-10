import { NextResponse } from "next/server";
import { getClient, testimonialsQuery } from "@/lib/sanity";
import { testimonials as testimonialsData } from "@/data/content";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const rows = await getClient().fetch(testimonialsQuery);
    if (Array.isArray(rows) && rows.length > 0) return NextResponse.json(rows);
    return NextResponse.json(testimonialsData);
  } catch (err) {
    console.error("GET /api/testimonials failed", err);
    return NextResponse.json(testimonialsData);
  }
}
