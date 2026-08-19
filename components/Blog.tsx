import Link from "next/link";
import { ArrowRight } from "lucide-react";
import AbstractVisual from "@/components/AbstractVisual";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { getPosts } from "@/lib/data";
import type { Post } from "@/data/content";

export default async function Blog() {
  const rows = await getPosts();
  const posts = rows as unknown as Post[];

  const postSlug = (post: Post) =>
    post.slug ?? post.title.toLowerCase().replace(/\s+/g, "-");

  return (
    <section id="blog" className="relative py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            kicker="Journal"
            title={
              <>
                Insights &
                <br />
                <span className="text-outline-accent">field notes.</span>
              </>
            }
            className="mb-0"
          />
          <Reveal delay={0.2}>
            <Link
              href="/articles"
              className="group inline-flex items-center gap-2.5 rounded-full border border-line bg-elevated px-6 py-3 text-sm font-medium text-ink transition-all duration-300 hover:border-accent/60 hover:text-accent"
            >
              All articles
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-3 lg:gap-6">
          {posts.slice(0, 3).map((post, i) => (
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
                    <span className="absolute left-3 top-3 rounded-full border border-white/20 bg-black/45 px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-white/85 backdrop-blur sm:left-4 sm:top-4 sm:px-3.5 sm:py-1.5 sm:text-[11px] sm:tracking-[0.16em]">
                      {post.category}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-4 sm:p-6 md:p-7">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] text-faint sm:text-xs">
                      <time dateTime={post.date}>{post.date}</time>
                      <span className="size-1 rounded-full bg-faint" />
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="mt-2.5 font-display text-[1.05rem] font-medium leading-snug tracking-tight text-ink transition-colors duration-300 group-hover:text-accent sm:mt-3 sm:text-xl md:text-[1.35rem]">
                      {post.title}
                    </h3>
                    <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-muted sm:mt-3 sm:text-sm">
                      {post.excerpt}
                    </p>
                    <span className="mt-auto inline-flex items-center gap-2 pt-4 text-[10px] font-medium uppercase tracking-[0.2em] text-faint transition-colors duration-300 group-hover:text-accent sm:pt-6 sm:text-xs">
                      Read article
                      <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </article>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
