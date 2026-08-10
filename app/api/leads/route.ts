import { NextResponse } from "next/server";
import { getWriteClient } from "@/lib/sanity";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    const name = typeof body?.name === "string" ? body.name.trim() : "";
    const email = typeof body?.email === "string" ? body.email.trim() : "";
    const message = typeof body?.message === "string" ? body.message.trim() : "";

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email and message are required" }, { status: 400 });
    }
    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "Please provide a valid email" }, { status: 400 });
    }

    await getWriteClient().create({
      _type: "lead",
      name,
      email,
      message,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error("POST /api/leads failed", err);
    return NextResponse.json({ error: "Failed to submit the form" }, { status: 500 });
  }
}
