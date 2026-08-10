import { NextResponse } from "next/server";
import { getWriteClient } from "@/lib/sanity";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const EXISTS_QUERY = `*[_type == "subscriber" && email == $email][0]`;

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }
    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "Please provide a valid email" }, { status: 400 });
    }

    const writeClient = getWriteClient();
    const existing = await writeClient.fetch<{ _id: string } | null>(EXISTS_QUERY, { email });

    if (existing) {
      return NextResponse.json({ success: true, already: true }, { status: 200 });
    }

    await writeClient.create({
      _type: "subscriber",
      email,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error("POST /api/subscribe failed", err);
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}
