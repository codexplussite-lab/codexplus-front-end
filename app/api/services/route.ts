import { NextResponse } from "next/server";
import { getClient, servicesQuery } from "@/lib/sanity";
import { services as servicesData } from "@/data/content";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const rows = await getClient().fetch(servicesQuery);
    if (Array.isArray(rows) && rows.length > 0) return NextResponse.json(rows);
    return NextResponse.json(servicesData);
  } catch (err) {
    console.error("GET /api/services failed", err);
    return NextResponse.json(servicesData);
  }
}
