import Link from "next/link";
import { ArrowRight } from "lucide-react";
import MediaAsset from "@/components/MediaAsset";
import Reveal from "@/components/Reveal";
import { owner } from "@/data/content";

export default function PortfolioHero() {
  const firstName = owner.name.split(" ")[0];
  const initials = owner.name
    .split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <section className="relative overflow-hidden border-b border-line bg-base">
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-36">
        <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-12">
          {/* Portrait */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto w-full max-w-sm">
              {/* Subtle dotted background accents */}
              <div
                aria-hidden
                className="absolute -left-10 -top-10 size-44 rounded-3xl bg-dots opacity-60"
              />
              <div
                aria-hidden
                className="absolute -bottom-10 -right-10 size-56 rounded-full bg-dots opacity-40"
              />
              <div
                aria-hidden
                className="absolute -right-8 top-1/3 size-40 rounded-full bg-accent/15 blur-3xl"
              />

              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-line bg-panel shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)]">
                {owner.image ? (
                  <MediaAsset
                    image={owner.image}
                    alt={owner.imageAlt}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <>
                    <div aria-hidden className="absolute inset-0 bg-grid opacity-30" />
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-base via-transparent to-transparent"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 grid place-items-center"
                    >
                      <span className="font-display text-8xl font-medium text-outline">
                        {initials}
                      </span>
                    </div>
                  </>
                )}

                <div className="absolute inset-x-0 bottom-0 border-t border-line bg-base/60 p-5 backdrop-blur">
                  <p className="font-display text-lg font-medium text-ink">
                    {owner.name}
                  </p>
                  <p className="mt-0.5 text-xs uppercase tracking-[0.18em] text-faint">
                    {owner.role}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Intro */}
          <div className="lg:col-span-7">
            <Reveal>
              <span className="inline-flex items-center gap-2.5 rounded-full border border-line bg-panel/70 px-4 py-1.5 text-xs text-muted backdrop-blur">
                <span className="size-2 animate-pulse-glow rounded-full bg-accent" />
                Open to new projects
              </span>
            </Reveal>
            <Reveal delay={0.06}>
              <h1 className="mt-6 font-display text-4xl font-medium leading-[1.06] tracking-tight md:text-6xl">
                Hi, I&apos;m {firstName} —
                <br />
                Frontend &amp; Full-Stack{" "}
                <span className="text-outline-accent">Developer.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted">
                {owner.bio}
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <div className="mt-10 flex flex-wrap gap-3.5">
                <Link
                  href="/#contact"
                  data-hover
                  className="inline-flex h-12 items-center gap-2.5 rounded-xl bg-ink px-7 text-sm font-semibold text-[#0b0f19] transition-all duration-300 hover:bg-white hover:shadow-[0_0_30px_rgba(238,241,251,0.25)]"
                >
                  Contact me
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
                <Link
                  href="#work"
                  data-hover
                  className="inline-flex h-12 items-center gap-2.5 rounded-xl border border-ink/25 px-7 text-sm font-semibold text-ink transition-all duration-300 hover:border-ink/60 hover:bg-ink/5"
                >
                  Check my work
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}