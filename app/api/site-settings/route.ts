import { NextResponse } from "next/server";
import { getSiteSettings } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const settings = await getSiteSettings();
    return NextResponse.json(settings);
  } catch (err) {
    console.error("GET /api/site-settings failed", err);
    return NextResponse.json({});
  }
}
