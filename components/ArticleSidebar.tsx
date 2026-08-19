"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Facebook,
  Instagram,
  Link2,
  Linkedin,
  Twitter,
} from "lucide-react";
import AbstractVisual from "@/components/AbstractVisual";
import { cn } from "@/lib/utils";

type RelatedPost = {
  id: string;
  title: string;
  slug?: string;
  date: string;
  accent: string;
  variant: string;
};

type ArticleSidebarProps = {
  post: { title: string; category: string; tags?: string[] };
  relatedPosts: RelatedPost[];
  sharePath: string;
};

const relatedSlug = (post: RelatedPost) =>
  post.slug ?? post.title.toLowerCase().replace(/\s+/g, "-");

export default function ArticleSidebar({
  post,
  relatedPosts,
  sharePath,
}: ArticleSidebarProps) {
  const [copied, setCopied] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const pageUrl = () =>
    typeof window !== "undefined" ? window.location.origin + sharePath : sharePath;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(pageUrl());
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

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

  const card = "rounded-3xl border border-line bg-panel/70 p-6 backdrop-blur-xl";
  const heading = "text-[11px] font-medium uppercase tracking-[0.28em] text-accent";

  return (
    <div className="space-y-8">
      {/* Share on social media */}
      <section className={card}>
        <h2 className={heading}>Share this article</h2>
        <div className="mt-5 flex items-center gap-2.5">
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on Instagram"
            data-hover
            className="grid size-10 place-items-center rounded-full border border-line bg-elevated/80 text-faint transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/60 hover:bg-accent/15 hover:text-accent"
          >
            <Instagram className="size-4" />
          </a>
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
              post.title
            )}&url=${encodeURIComponent(pageUrl())}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on X / Twitter"
            data-hover
            className="grid size-10 place-items-center rounded-full border border-line bg-elevated/80 text-faint transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/60 hover:bg-accent/15 hover:text-accent"
          >
            <Twitter className="size-4" />
          </a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl())}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on Facebook"
            data-hover
            className="grid size-10 place-items-center rounded-full border border-line bg-elevated/80 text-faint transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/60 hover:bg-accent/15 hover:text-accent"
          >
            <Facebook className="size-4" />
          </a>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl())}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on LinkedIn"
            data-hover
            className="grid size-10 place-items-center rounded-full border border-line bg-elevated/80 text-faint transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/60 hover:bg-accent/15 hover:text-accent"
          >
            <Linkedin className="size-4" />
          </a>
          <button
            type="button"
            onClick={handleCopy}
            aria-label="Copy link"
            data-hover
            className={cn(
              "grid size-10 place-items-center rounded-full border transition-all duration-300",
              copied
                ? "border-accent/60 bg-accent/15 text-accent"
                : "border-line bg-elevated/80 text-faint hover:-translate-y-0.5 hover:border-accent/60 hover:bg-accent/15 hover:text-accent"
            )}
          >
            {copied ? <Check className="size-4" /> : <Link2 className="size-4" />}
          </button>
        </div>
      </section>

      {/* Tags & categories */}
      <section className={card}>
        <h2 className={heading}>Tags &amp; categories</h2>
        <div className="mt-5 flex flex-wrap gap-2">
          <Link
            href="/articles"
            className="rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-[11px] uppercase tracking-[0.14em] text-accent transition-colors duration-300 hover:bg-accent hover:text-white"
          >
            {post.category}
          </Link>
          {(post.tags ?? []).map((tag) => (
            <Link
              key={tag}
              href="/articles"
              className="rounded-full border border-line bg-elevated/70 px-4 py-1.5 text-[11px] uppercase tracking-[0.14em] text-muted transition-colors duration-300 hover:border-accent/40 hover:text-accent"
            >
              {tag}
            </Link>
          ))}
        </div>
      </section>

      {/* Related blogs */}
      {relatedPosts.length > 0 && (
        <section className={card}>
          <h2 className={heading}>Related reads</h2>
          <div className="mt-5 space-y-5">
            {relatedPosts.map((related) => (
              <Link
                key={related.id}
                href={`/blog/${relatedSlug(related)}`}
                className="group flex items-center gap-4"
              >
                <div className="relative aspect-square w-20 shrink-0 overflow-hidden rounded-2xl border border-line">
                  <AbstractVisual
                    palette={[related.accent, "#0b0f19", "#232746"]}
                    variant={related.variant as any}
                    className="transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="min-w-0">
                  <time
                    dateTime={related.date}
                    className="text-[10px] uppercase tracking-[0.16em] text-faint"
                  >
                    {related.date}
                  </time>
                  <h3 className="mt-1.5 line-clamp-2 text-sm font-medium leading-snug text-ink transition-colors duration-300 group-hover:text-accent">
                    {related.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Newsletter */}
      <section className={card}>
        <h2 className={heading}>Join our newsletter</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Field notes on design, engineering and strategy. One thoughtful email at
          a time — no spam.
        </p>
        <form onSubmit={submit} className="mt-5">
          <div className="flex items-center gap-2">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@studio.com"
              aria-label="Email address"
              className="h-12 min-w-0 flex-1 rounded-xl border border-line bg-elevated/80 px-4 text-sm text-ink placeholder:text-faint focus:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/30"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="h-12 shrink-0 rounded-xl bg-accent-gradient px-5 text-sm font-semibold text-white transition-shadow duration-300 hover:shadow-[0_0_24px_rgba(116,55,255,0.45)] disabled:opacity-60"
            >
              {status === "loading" ? "Sending…" : "Subscribe"}
            </button>
          </div>
          {status === "success" && (
            <p className="mt-3 text-xs text-accent">Thanks — you&apos;re on the list!</p>
          )}
          {status === "error" && <p className="mt-3 text-xs text-red-400">{error}</p>}
        </form>
      </section>
    </div>
  );
}