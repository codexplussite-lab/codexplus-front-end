import { NextResponse } from "next/server";
import { getSkills } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const skills = await getSkills();
    return NextResponse.json(skills);
  } catch (err) {
    console.error("GET /api/skills failed", err);
    return NextResponse.json([]);
  }
}
