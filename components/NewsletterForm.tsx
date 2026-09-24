"use client";

import React, { useState } from "react";
import { ArrowRight } from "lucide-react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim() || status === "loading") return;
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong");
      setStatus("success");
      setEmail("");
      window.setTimeout(() => setStatus("idle"), 4000);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-[12px] font-normal uppercase tracking-wider text-white/50">
        Subscribe our newsletter:
      </p>
      <form onSubmit={submit} className="relative flex max-w-sm items-center">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ENTER OUR EMAIL"
          aria-label="Email address"
          className="h-[56px] w-full rounded-full border border-white/15 bg-white/10 px-6 py-4 pr-12 text-xs tracking-wider text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-accent/60"
        />
        <button
          type="submit"
          aria-label="Subscribe"
          disabled={status === "loading"}
          className="absolute right-1.5 flex size-10 items-center justify-center rounded-xl bg-accent-gradient text-white transition-opacity duration-300 hover:opacity-95 disabled:opacity-60"
        >
          <ArrowRight className="size-4" />
        </button>
      </form>
      {status === "success" && (
        <p className="mt-2 pl-2 text-xs text-accent">
          Thanks — you&apos;re on the list!
        </p>
      )}
      {status === "error" && (
        <p className="mt-2 pl-2 text-xs text-red-400">{error}</p>
      )}
    </div>
  );
}
