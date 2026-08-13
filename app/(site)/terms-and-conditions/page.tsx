import { getPage } from "@/lib/data";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";

export const revalidate = 60;

export default async function TermsAndConditionsPage() {
  const page = await getPage("terms-and-conditions");
  if (!page) {
    notFound();
  }

  return (
    <main className="bg-slate-950">
      <Navbar />
      
      <PageHero
        pageTagline="Legal"
        titlePrefix="Terms &"
        glowingWord="Conditions."
        description={`Last updated ${page.lastUpdated ? new Date(page.lastUpdated).toLocaleDateString() : 'recently'}. Please read these terms carefully.`}
        primaryCtaText="Contact Legal"
        primaryCtaLink="/contact"
      />

      <div className="relative z-10 mx-auto max-w-4xl px-5 md:px-8 py-24">
        <div className="glass-dark rounded-3xl p-8 md:p-12 prose prose-invert prose-lg max-w-none 
          prose-headings:font-display prose-headings:font-medium prose-a:text-accent hover:prose-a:text-white prose-a:transition-colors">
          {page.content ? (
            <PortableText value={page.content} />
          ) : (
            <p>Policy content is currently being updated.</p>
          )}
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
