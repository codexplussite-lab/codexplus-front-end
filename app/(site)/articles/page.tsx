import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import AbstractVisual from "@/components/AbstractVisual";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { getPosts } from "@/lib/data";
import type { Post } from "@/data/content";

export const metadata: Metadata = {
  title: "All Articles — Insights & Field Notes | CodeXplus",
  description:
    "Every article from the CodeXplus studio — design, engineering, motion, strategy and opinion from the people doing the work.",
};

export default async function ArticlesPage() {
  const rows = await getPosts();
  const posts = rows as unknown as Post[];

  const postSlug = (post: Post) =>
    post.slug ?? post.title.toLowerCase().replace(/\s+/g, "-");

  return (
    <main>
      <Navbar />

      <PageHero
        pageTagline="Journal"
        titlePrefix="All articles, every"
        glowingWord="field note."
        description="Every insight, checklist and manifesto from the studio floor — design, engineering, motion and strategy. Fresh thinking, no fluff."
        primaryCtaText="Read Latest"
        primaryCtaLink="#articles"
      />

      <section id="articles" className="relative border-y border-line bg-panel/50 py-24 md:py-36">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          {posts.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {posts.map((post, i) => (
                <Reveal key={post.id} delay={(i % 3) * 0.1} className="h-full">
                  <Link
                    href={`/blog/${postSlug(post)}`}
                    aria-label={`Read article: ${post.title}`}
                    className="block h-full"
                  >
                    <article
                      data-hover
                      className="gradient-border group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-panel transition-all duration-500 hover:-translate-y-1.5"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <AbstractVisual
                          palette={[post.accent, "#0b0f19", "#232746"]}
                          variant={post.variant}
                          className="transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/45 px-3.5 py-1.5 text-[11px] uppercase tracking-[0.16em] text-white/85 backdrop-blur">
                          {post.category}
                        </span>
                      </div>

                      <div className="flex flex-1 flex-col p-6 md:p-7">
                        <div className="flex items-center gap-3 text-xs text-faint">
                          <time dateTime={post.date}>{post.date}</time>
                          <span className="size-1 rounded-full bg-faint" />
                          <span>{post.readTime}</span>
                        </div>
                        <h3 className="mt-3 font-display text-xl font-medium leading-snug tracking-tight text-ink transition-colors duration-300 group-hover:text-accent md:text-[1.35rem]">
                          {post.title}
                        </h3>
                        <p className="mt-3 text-sm leading-relaxed text-muted">
                          {post.excerpt}
                        </p>
                        <span className="mt-auto inline-flex items-center gap-2 pt-6 text-xs font-medium uppercase tracking-[0.2em] text-faint transition-colors duration-300 group-hover:text-accent">
                          Read article
                          <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                        </span>
                      </div>
                    </article>
                  </Link>
                </Reveal>
              ))}
            </div>
          ) : (
            <p className="py-24 text-center text-muted">
              No articles published yet. Check back soon.
            </p>
          )}
        </div>
      </section>

      <CTABanner />
      <Footer />
    </main>
  );
}
