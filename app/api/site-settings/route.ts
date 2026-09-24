import { NextResponse } from "next/server";
import { getSiteSettings } from "@/lib/data";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const settings = await getSiteSettings();
    return NextResponse.json(settings, {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
  } catch (err) {
    console.error("GET /api/site-settings failed", err);
    return NextResponse.json({}, { status: 500 });
  }
}
