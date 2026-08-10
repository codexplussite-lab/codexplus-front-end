import type { Metadata } from "next";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Contact — Start a Project with CodeXplus",
  description:
    "Get in touch with CodeXplus — tell us about your brand, product or website and we'll come back with a plan. No hand-offs, no dropped balls.",
};

export default function ContactPage() {
  return (
    <main>
      <Navbar />

      <section className="relative border-b border-line bg-panel/40 py-32 md:py-44">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading
            kicker="Get in touch"
            title={
              <>
                Start a project,
                <br />
                <span className="text-outline-accent">or just say hello.</span>
              </>
            }
            description="Tell us what you're building and we'll come back with a plan and a timeline. Every message lands in the inbox of the person who will actually do the work."
          />
        </div>
      </section>

      <div className="relative border-y border-line bg-panel/50">
        <Contact />
      </div>

      <Footer />
    </main>
  );
}
