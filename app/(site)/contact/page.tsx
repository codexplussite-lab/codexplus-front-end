import type { Metadata } from "next";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Contact — Start a Project with CodeXplus",
  description:
    "Get in touch with CodeXplus — tell us about your brand, product or website and we'll come back with a plan. No hand-offs, no dropped balls.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen flex flex-col justify-between bg-[#070913]">
      <Navbar />

      <div id="contact" className="relative pt-24 md:pt-32 pb-8">
        <Contact />
      </div>

      <Footer />
    </main>
  );
}
