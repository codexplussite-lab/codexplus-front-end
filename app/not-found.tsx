import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "404 — Page Not Found | CodeXplus",
};

export default function NotFound() {
  return (
    <main className="relative flex min-h-dvh items-center justify-center overflow-hidden px-6">
      <div aria-hidden className="animated-bg">
        <div className="blob blob-1 blob-purple" />
        <div className="blob blob-2 blob-blue" />
        <div className="blob blob-3 blob-pink" />
      </div>

      <div className="relative z-10 max-w-2xl text-center">
        <p className="font-display text-[clamp(6rem,20vw,13rem)] font-bold leading-none tracking-tight">
          <span className="text-outline-accent">4</span>
          <span className="text-gradient">0</span>
          <span className="text-outline-accent">4</span>
        </p>

        <h1 className="mt-6 font-display text-3xl font-medium tracking-tight text-ink md:text-5xl">
          404 — Page Not Found
        </h1>

        <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-muted">
          The page you&apos;re looking for has been moved, deleted, or never
          existed. Let&apos;s get you back on track.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="group inline-flex items-center gap-2.5 rounded-xl bg-accent-gradient px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:shadow-[0_0_44px_rgba(116,55,255,0.5)]"
          >
            <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
            Back to homepage
          </Link>
          <Link
            href="#work"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-8 py-4 text-sm font-medium text-white backdrop-blur transition-colors duration-300 hover:border-white/40 hover:bg-white/15"
          >
            Explore our work
            <ArrowUpRight className="size-4 text-accent" />
          </Link>
        </div>
      </div>
    </main>
  );
}
