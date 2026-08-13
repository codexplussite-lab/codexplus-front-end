import { getPostBySlug } from "@/lib/data";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import AbstractVisual from "@/components/AbstractVisual";

export const revalidate = 60;

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="relative min-h-screen bg-[#0b0f19] pt-32 pb-24 overflow-hidden">
      {/* Background Visual matching post variant */}
      <div className="absolute inset-0 opacity-20 z-0 mask-image:linear-gradient(to_bottom,black,transparent)">
        <AbstractVisual palette={["#0b0f19", post.accent, "#2e3a59"]} variant={post.variant as any} />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-5 md:px-8">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.15em] text-white backdrop-blur">
              {post.category}
            </span>
            <span className="text-sm text-white/50">{post.date}</span>
            <span className="text-sm text-white/50">&middot; {post.readTime}</span>
          </div>
          <h1 className="text-white font-display text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-6 leading-[1.1]">
            {post.title}
          </h1>
          <p className="text-xl text-white/70">
            {post.excerpt}
          </p>
        </div>

        <div className="glass-dark rounded-3xl p-8 md:p-12 prose prose-invert prose-lg max-w-none 
          prose-headings:font-display prose-headings:font-medium prose-a:text-accent hover:prose-a:text-white prose-a:transition-colors">
          {post.content ? (
            <PortableText value={post.content} />
          ) : (
            <p>Content coming soon.</p>
          )}
        </div>
      </div>
    </main>
  );
}
