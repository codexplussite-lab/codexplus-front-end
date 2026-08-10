import Contact from "@/components/Contact";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import { getServices } from "@/lib/data";
import type { Service } from "@/data/content";

export default async function ServicesPage() {
  const rows = await getServices();
  const services = rows as unknown as Service[];

  return (
    <main>
      <Navbar />
      <section className="relative border-b border-line bg-panel/40 py-32 md:py-44">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading
            kicker="Our services"
            title={
              <>
                Everything we do,
                <br />
                <span className="text-outline-accent">in one place.</span>
              </>
            }
            description="From brand strategy to shipped product — four disciplines, one accountable team. No hand-offs, no dropped balls."
          />
        </div>
      </section>

      <section className="relative border-y border-line bg-panel/50 py-24 md:py-36">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid gap-5 md:grid-cols-2 lg:gap-6">
            {services.map((service, i) => (
              <ServiceCard key={service.id} service={service} index={i} />
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
      <Contact />
      <Footer />
    </main>
  );
}
