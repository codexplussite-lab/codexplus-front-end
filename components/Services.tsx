import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import { getServices } from "@/lib/data";
import type { Service } from "@/data/content";

export default async function Services() {
  const rows = await getServices();
  const services = rows as unknown as Service[];

  return (
    <section
      id="services"
      className="relative border-y border-line bg-panel/50 py-24 md:py-36"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          kicker="What we do"
          title={
            <>
              Services engineered
              <br />
              for <span className="text-outline-accent">impact.</span>
            </>
          }
          description="Four tightly-argued disciplines, one accountable team. Strategy through shipping — no hand-offs, no dropped balls."
        />

        <div className="grid gap-5 md:grid-cols-2 lg:gap-6">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
