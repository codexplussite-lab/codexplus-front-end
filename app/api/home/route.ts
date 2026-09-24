import { NextResponse } from "next/server";
import { getHome } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const home = await getHome();
    return NextResponse.json(home ?? {});
  } catch (err) {
    console.error("GET /api/home failed", err);
    return NextResponse.json({});
  }
}
