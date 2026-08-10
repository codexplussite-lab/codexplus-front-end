import { getSiteSettings } from "@/lib/data";

export default async function LogoMarquee() {
  const settings = await getSiteSettings();
  const clients = settings.clients ?? [];

  if (clients.length === 0) return null;

  const row = [...clients, ...clients];

  return (
    <section aria-label="Trusted by" className="border-y border-line bg-panel/40 py-8">
      <div className="marquee-row marquee-mask overflow-hidden">
        <div className="animate-marquee marquee-track flex w-max items-center gap-14 pr-14">
          {row.map((name, i) => (
            <div key={`${name}-${i}`} className="flex items-center gap-14">
              <span className="whitespace-nowrap font-display text-sm font-medium tracking-[0.3em] text-faint transition-colors duration-300 hover:text-ink">
                {name}
              </span>
              <span className="size-1.5 rounded-full bg-accent/40" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
