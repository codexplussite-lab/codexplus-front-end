import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { ArrowLeft, ArrowUpRight, CalendarDays, Clock3 } from "lucide-react";
import AbstractVisual from "@/components/AbstractVisual";
import ArticleActions from "@/components/ArticleActions";
import ArticleSidebar from "@/components/ArticleSidebar";
import Footer from "@/components/Footer";
import MediaAsset from "@/components/MediaAsset";
import Navbar from "@/components/Navbar";
import { team } from "@/data/content";
import type { Post } from "@/data/content";
import { getPostBySlug, getPosts } from "@/lib/data";
import { urlForImage } from "@/lib/sanity";

export const revalidate = 60;

type Params = Promise<{ slug: string }>;

const codeLanguages: Record<string, string> = {
  javascript: "JavaScript",
  typescript: "TypeScript",
  tsx: "TSX",
  jsx: "JSX",
  css: "CSS",
  html: "HTML",
  bash: "Shell",
  json: "JSON",
  sql: "SQL",
  graphql: "GraphQL",
  plaintext: "Text",
};

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="mt-14 mb-6 font-display text-2xl font-medium tracking-tight text-ink md:text-3xl">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-10 mb-4 font-display text-xl font-medium tracking-tight text-ink md:text-2xl">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="mt-8 mb-3 font-display text-lg font-medium tracking-tight text-ink">
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="relative my-10 rounded-2xl border border-accent/25 bg-accent/5 px-6 py-6 md:px-8">
        <span className="pointer-events-none absolute left-0 top-0 h-full w-1 rounded-full bg-accent-gradient" />
        <p className="font-display text-lg font-medium leading-relaxed text-ink md:text-xl">
          {children}
        </p>
      </blockquote>
    ),
    normal: ({ children }) => (
      <p className="mb-6 text-[1.02rem] leading-[1.85] text-muted">{children}</p>
    ),
  },
  marks: {
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target={value?.href?.startsWith("http") ? "_blank" : undefined}
        rel="noopener noreferrer"
        className="font-medium text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:decoration-accent"
      >
        {children}
      </a>
    ),
    strong: ({ children }) => (
      <strong className="font-semibold text-ink">{children}</strong>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="my-6 space-y-3">{children}</ul>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="relative pl-6 text-[1.02rem] leading-relaxed text-muted">
        <span className="absolute left-0 top-[0.7em] size-1.5 rounded-full bg-accent-gradient" />
        {children}
      </li>
    ),
  },
  types: {
    image: ({ value }) => {
      let src: string | undefined;
      try {
        src = urlForImage(value).width(1600).url();
      } catch {
        src = undefined;
      }
      if (!src) return null;
      return (
        <figure className="my-10">
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-line">
            <Image
              src={src}
              alt={value?.alt ?? ""}
              fill
              sizes="(max-width: 768px) 100vw, 800px"
              className="object-cover"
            />
          </div>
          {value?.caption && (
            <figcaption className="mt-3 text-center text-sm text-faint">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
    codeBlock: ({ value }) => (
      <div className="my-10 overflow-hidden rounded-2xl border border-line bg-[#0d1220]">
        <div className="flex items-center justify-between border-b border-line px-5 py-3">
          <span className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-full bg-accent/60" />
            <span className="size-2.5 rounded-full bg-accent/30" />
            <span className="size-2.5 rounded-full bg-white/15" />
          </span>
          <span className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-accent">
            {codeLanguages[value?.language] ?? value?.language ?? "Code"}
          </span>
        </div>
        <pre className="overflow-x-auto p-5 font-mono text-[13.5px] leading-relaxed text-white/80">
          <code>{value?.code}</code>
        </pre>
      </div>
    ),
  },
};

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Article Not Found — CodeXplus" };
  return {
    title: `${post.title} — CodeXplus Journal`,
    description: post.excerpt,
  };
}

function initialsOf(name: string) {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

const slugify = (value: { id: string; title: string; slug?: string }) =>
  value.slug ?? value.title.toLowerCase().replace(/\s+/g, "-");

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const authorName = post.author || "CodeXplus Studio";
  const authorRole =
    team.find((member) => member.name === post.author)?.role ?? "CodeXplus Studio";
  const heroVideo = post.videoUrl;
  const heroImage = post.coverImage;

  const rows = await getPosts();
  const allPosts = rows as unknown as Post[];
  const others = allPosts.filter((p) => p.id !== post.id);
  const relatedPosts = [
    ...others.filter((p) => p.category === post.category),
    ...others.filter((p) => p.category !== post.category),
  ].slice(0, 3);

  const sharePath = `/blog/${slugify(post)}`;

  return (
    <main className="relative min-h-screen overflow-hidden bg-base">
      <Navbar />

      {/* Ambient gradient glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 z-0 h-[480px] w-[720px] -translate-x-1/2 rounded-full opacity-25 blur-[140px]"
        style={{
          background:
            "radial-gradient(closest-side, #7437ff 0%, #9a66ff 45%, transparent 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-[45%] -right-40 z-0 h-[380px] w-[380px] rounded-full opacity-15 blur-[120px]"
        style={{
          background:
            "radial-gradient(closest-side, #7437ff 0%, transparent 100%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-5 pt-28 md:px-8 md:pt-32">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Left content column */}
          <div className="lg:col-span-8">
            <Link
              href="/articles"
              className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-faint transition-colors hover:text-accent"
            >
              <ArrowLeft className="size-3.5" />
              All articles
            </Link>

            {/* Header */}
            <header className="mt-10 max-w-3xl">
              <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
                <span className="rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-[11px] uppercase tracking-[0.16em] text-accent backdrop-blur">
                  {post.category}
                </span>
                <span className="inline-flex items-center gap-1.5 text-sm text-muted">
                  <CalendarDays className="size-3.5" />
                  {post.date}
                </span>
                <span className="inline-flex items-center gap-1.5 text-sm text-muted">
                  <Clock3 className="size-3.5" />
                  {post.readTime}
                </span>
              </div>
              <h1 className="mt-6 font-display text-4xl font-medium leading-[1.08] tracking-tight text-ink md:text-6xl">
                {post.title}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
                {post.excerpt}
              </p>

              <div className="mt-8 flex items-center gap-4 border-t border-line pt-6">
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl border border-line bg-accent-gradient font-display text-sm font-semibold text-white shadow-[0_0_24px_rgba(116,55,255,0.35)]">
                  {initialsOf(authorName)}
                </span>
                <div>
                  <p className="text-sm font-medium text-ink">{authorName}</p>
                  <p className="text-xs text-faint">{authorRole}</p>
                </div>
                <div className="ml-auto">
                  <ArticleActions />
                </div>
              </div>
            </header>

            {/* Featured hero media */}
            <div className="mt-12">
              {heroVideo || heroImage ? (
                <div className="relative aspect-[16/9] overflow-hidden rounded-3xl border border-line bg-panel/40 shadow-[0_0_80px_rgba(116,55,255,0.18)] backdrop-blur">
                  <MediaAsset
                    image={heroImage}
                    video={heroVideo}
                    alt={post.coverImageAlt || post.title}
                    priority
                    controls={Boolean(heroVideo)}
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-base/60 via-transparent to-transparent"
                  />
                </div>
              ) : (
                <div className="relative aspect-[16/9] overflow-hidden rounded-3xl border border-line">
                  <AbstractVisual
                    palette={[post.accent, "#0b0f19", "#232746"]}
                    variant={post.variant as any}
                  />
                </div>
              )}
            </div>

            {/* Article body */}
            <article className="mt-14">
              {post.content ? (
                <PortableText value={post.content} components={components} />
              ) : (
                <div className="rounded-3xl border border-line bg-panel/40 p-10 text-center">
                  <p className="text-muted">
                    The full story is being polished in the studio. Check back soon.
                  </p>
                  <Link
                    href="/articles"
                    className="mt-6 inline-flex items-center gap-2 rounded-xl bg-accent-gradient px-6 py-3 text-sm font-semibold text-white transition-shadow hover:shadow-[0_0_30px_rgba(116,55,255,0.45)]"
                  >
                    Browse all articles
                    <ArrowUpRight className="size-4" />
                  </Link>
                </div>
              )}
            </article>

            {/* Author card */}
            <div className="mt-14 flex items-center gap-5 rounded-3xl border border-line bg-panel/70 p-6 backdrop-blur-xl md:p-8">
              <span className="grid size-14 shrink-0 place-items-center rounded-2xl border border-line bg-accent-gradient font-display text-sm font-semibold text-white shadow-[0_0_24px_rgba(116,55,255,0.35)]">
                {initialsOf(authorName)}
              </span>
              <div className="min-w-0">
                <p className="text-[11px] uppercase tracking-[0.18em] text-faint">
                  Written by
                </p>
                <p className="mt-1 font-display text-lg font-medium text-ink">
                  {authorName}
                </p>
                <p className="mt-0.5 text-sm text-muted">{authorRole}</p>
              </div>
            </div>
          </div>

          {/* Right sidebar column */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <ArticleSidebar
                post={post}
                relatedPosts={relatedPosts}
                sharePath={sharePath}
              />
            </div>
          </aside>
        </div>
      </div>

      <Footer />
    </main>
  );
}