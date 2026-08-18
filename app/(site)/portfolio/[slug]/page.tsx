import { getProjectBySlug } from "@/lib/data";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import AbstractVisual from "@/components/AbstractVisual";
import MediaAsset from "@/components/MediaAsset";
import { ArrowUpRight } from "lucide-react";

export const revalidate = 60;

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="relative min-h-screen bg-[#0b0f19] pt-32 pb-24 overflow-hidden">
      {/* Hero background matching project variant */}
      <div className="absolute inset-0 top-0 h-[60vh] opacity-50 z-0 mask-image:linear-gradient(to_bottom,black,transparent)">
        <AbstractVisual palette={project.palette} variant={project.variant as any} />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-5 md:px-8 mt-12">
        <div className="flex flex-col gap-4 mb-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs uppercase tracking-[0.15em] text-white backdrop-blur">
              {project.category}
            </span>
            <span className="text-sm text-white/50">{project.year}</span>
          </div>
          <h1 className="text-white font-display text-[clamp(2.5rem,6vw,5rem)] font-medium leading-[1.1] tracking-[-0.02em]">
            {project.title}
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mt-4">
            {project.summary}
          </p>
        </div>

        <div className="flex flex-wrap gap-4 mb-16">
          {project.liveUrl && (
            <a 
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-accent-gradient px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:shadow-[0_0_30px_rgba(116,55,255,0.4)]"
            >
              View Live Project
              <ArrowUpRight className="size-4" />
            </a>
          )}
        </div>

        {project.videoUrl || project.videoFileUrl || project.coverImage ? (
          <div className="relative mb-16 aspect-[16/9] overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-[0_0_60px_rgba(116,55,255,0.15)] backdrop-blur">
            <MediaAsset
              image={project.coverImage}
              video={project.videoUrl || project.videoFileUrl}
              alt={project.imageAlt || project.title}
              priority
              controls
            />
          </div>
        ) : null}

        <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-12">
          {/* Main Content */}
          <div className="glass-dark rounded-3xl p-8 md:p-12 prose prose-invert prose-lg max-w-none 
            prose-headings:font-display prose-headings:font-medium prose-a:text-accent hover:prose-a:text-white prose-a:transition-colors">
            {project.content ? (
              <PortableText value={project.content} />
            ) : (
              project.description?.map((p, i) => <p key={i}>{p}</p>)
            )}
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-8">
            {project.client && (
              <div className="glass-dark rounded-2xl p-6">
                <h3 className="text-xs uppercase tracking-[0.15em] text-white/50 mb-2">Client</h3>
                <p className="text-lg font-medium text-white">{project.client}</p>
              </div>
            )}
            
            {project.services && project.services.length > 0 && (
              <div className="glass-dark rounded-2xl p-6">
                <h3 className="text-xs uppercase tracking-[0.15em] text-white/50 mb-4">Services</h3>
                <ul className="flex flex-col gap-2">
                  {(project.services ?? []).map((s) => (
                    <li key={s} className="text-white/80">{s}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
