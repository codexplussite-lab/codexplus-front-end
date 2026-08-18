import { getPage } from "@/lib/data";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";

export const revalidate = 60; // ISR revalidation

export default async function AboutPage() {
  const page = await getPage("about");
  if (!page) {
    notFound();
  }

  return (
    <main className="bg-slate-950">
      <Navbar />
      
      <PageHero
        pageTagline="Our Story"
        titlePrefix="About"
        glowingWord={page.title}
        description={page.subheading || "Learn more about us."}
        primaryCtaText="Contact Us"
        primaryCtaLink="/contact"
      />

      <div className="relative z-10 mx-auto max-w-4xl px-5 md:px-8 py-24">
        {page.content && (
          <div className="glass-dark rounded-3xl p-8 md:p-12 prose prose-invert prose-lg max-w-none 
            prose-headings:font-display prose-headings:font-medium prose-a:text-accent hover:prose-a:text-white prose-a:transition-colors">
            <PortableText value={page.content} />
          </div>
        )}
      </div>
      
      <Footer />
    </main>
  );
}
