import type { Metadata } from "next";
import { Sparkles } from "lucide-react";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Contact — Start a Project with CodeXplus",
  description:
    "Get in touch with CodeXplus — tell us about your brand, product or website and we'll come back with a plan. No hand-offs, no dropped balls.",
};

export default function ContactPage() {
  return (
    <main>
      <Navbar />

      <PageHero
        pageTagline="Get in touch"
        titlePrefix="Start a project,"
        glowingWord="or just say hello."
        description="Tell us what you're building and we'll come back with a plan and a timeline. Every message lands in the inbox of the person who will actually do the work."
        primaryCtaText="Start Discovery"
        primaryCtaLink="#contact"
      />

      <div id="contact" className="relative border-y border-line bg-panel/50">
        <Contact />
      </div>

      <Footer />
    </main>
  );
}
