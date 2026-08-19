import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { ArrowLeft, ArrowUpRight, CalendarDays, Clock3, Layers } from "lucide-react";
import AbstractVisual from "@/components/AbstractVisual";
import Footer from "@/components/Footer";
import MediaAsset from "@/components/MediaAsset";
import Navbar from "@/components/Navbar";
import { team } from "@/data/content";
import { getPostBySlug } from "@/lib/data";
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

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0b0f19]">
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

      <div className="relative z-10 mx-auto max-w-5xl px-5 pt-28 md:px-8 md:pt-32">
        <Link
          href="/articles"
          className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-faint transition-colors hover:text-accent"
        >
          <ArrowLeft className="size-3.5" />
          All articles
        </Link>

        {/* Header */}
        <header className="mt-10 max-w-3xl">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-[11px] uppercase tracking-[0.16em] text-accent backdrop-blur">
              {post.category}
            </span>
            <span className="inline-flex items-center gap-1.5 text-sm text-white/50">
              <CalendarDays className="size-3.5" />
              {post.date}
            </span>
            <span className="inline-flex items-center gap-1.5 text-sm text-white/50">
              <Clock3 className="size-3.5" />
              {post.readTime}
            </span>
          </div>
          <h1 className="mt-6 font-display text-4xl font-medium leading-[1.08] tracking-tight text-white md:text-6xl">
            {post.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/65">
            {post.excerpt}
          </p>

          <div className="mt-8 flex items-center gap-4 border-t border-white/10 pt-6">
            <span className="grid size-12 place-items-center rounded-2xl border border-white/15 bg-gradient-to-br from-accent to-[#9a66ff] font-display text-sm font-semibold text-white shadow-[0_0_24px_rgba(116,55,255,0.35)]">
              {initialsOf(authorName)}
            </span>
            <div>
              <p className="text-sm font-medium text-white">{authorName}</p>
              <p className="text-xs text-white/50">{authorRole}</p>
            </div>
          </div>
        </header>

        {/* Featured hero media */}
        <div className="mt-12">
          {heroVideo || heroImage ? (
            <div className="relative aspect-[16/9] overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-[0_0_80px_rgba(116,55,255,0.18)] backdrop-blur">
              <MediaAsset
                image={heroImage}
                video={heroVideo}
                alt={post.coverImageAlt || post.title}
                priority
                controls={Boolean(heroVideo)}
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-[#0b0f19]/60 via-transparent to-transparent"
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

        {/* Bento meta row */}
        <div className="mt-6 grid gap-5 sm:grid-cols-3">
          <div className="rounded-2xl border border-line bg-white/[0.03] p-5 backdrop-blur">
            <Layers className="size-4 text-accent" />
            <p className="mt-3 text-[11px] uppercase tracking-[0.18em] text-faint">
              Discipline
            </p>
            <p className="mt-1.5 text-sm font-medium text-ink">{post.category}</p>
          </div>
          <div className="rounded-2xl border border-line bg-white/[0.03] p-5 backdrop-blur">
            <CalendarDays className="size-4 text-accent" />
            <p className="mt-3 text-[11px] uppercase tracking-[0.18em] text-faint">
              Published
            </p>
            <p className="mt-1.5 text-sm font-medium text-ink">{post.date}</p>
          </div>
          <div className="rounded-2xl border border-line bg-white/[0.03] p-5 backdrop-blur">
            <Clock3 className="size-4 text-accent" />
            <p className="mt-3 text-[11px] uppercase tracking-[0.18em] text-faint">
              Reading time
            </p>
            <p className="mt-1.5 text-sm font-medium text-ink">{post.readTime}</p>
          </div>
        </div>

        {/* Article body */}
        <article className="mt-14">
          {post.content ? (
            <PortableText value={post.content} components={components} />
          ) : (
            <div className="rounded-3xl border border-line bg-white/[0.02] p-10 text-center">
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

          <div className="mt-16 flex flex-wrap items-center justify-between gap-5 rounded-2xl border border-line bg-white/[0.03] px-6 py-5 backdrop-blur">
            <p className="text-sm text-muted">
              Written by{" "}
              <span className="font-medium text-ink">{authorName}</span> ·{" "}
              {post.readTime} read
            </p>
            <Link
              href="/articles"
              className="inline-flex items-center gap-2 rounded-xl bg-accent-gradient px-5 py-2.5 text-sm font-semibold text-white transition-shadow hover:shadow-[0_0_30px_rgba(116,55,255,0.45)]"
            >
              Read next article
              <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </article>
      </div>

      <Footer />
    </main>
  );
}