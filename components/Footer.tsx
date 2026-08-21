"use client";

import { useEffect, useState } from "react";
import { ArrowRight, ArrowUp, Dribbble, Github, Twitter, MessageSquare, Phone } from "lucide-react";
import Link from "next/link";

const fallbackNavCol = [
  { label: "Home", href: "/", active: true },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Services", href: "/services" },
  { label: "Team", href: "/team" },
  { label: "Contact", href: "/contact" },
  { label: "Blog", href: "/articles" },
];

const fallbackUsefulLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms and conditions", href: "#" },
  { label: "Cookie Policy", href: "#" },
  { label: "Careers", href: "#" },
];

const fallbackSocials = [
  { label: "Behance", href: "https://behance.net" },
  { label: "Dribbble", href: "https://dribbble.com" },
  { label: "Twitter", href: "https://twitter.com" },
  { label: "GitHub", href: "https://github.com" },
];

type FooterLink = { label: string; href: string };

function BehanceIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 576 512"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M232 237.2c31.8-15.2 48.4-38.2 48.4-74 0-70.6-52.6-87.8-113.3-87.8H0v354.4h171.8c64.4 0 124.9-30.9 124.9-102.9 0-44.5-21.1-77.4-64.7-89.7zM77.9 135.9H151c28.1 0 53.4 7.9 53.4 40.5 0 30.1-19.7 42.2-47.5 42.2h-79zm93.6 257.9H77.9V288h93.7c28.4 0 51.9 12.9 51.9 51.1 0 38.1-20.3 54.7-52 54.7zm257.2-231c-113.9 0-144.2 105.3-144.2 203.4 0 100.7 41.2 194.9 144.2 194.9 93.3 0 149.2-75.7 149.2-169.4h-75.4c0 41.4-25.4 93.3-73.4 93.3-53.8 0-67.1-56.7-67.1-116.6 0-60.6 12.8-116.6 67.1-116.6 47.3 0 73.4 48.7 73.4 91.4h76.1c.1-96.1-41.2-180.4-147.3-180.4zm37 106.8h117.4v30.6H460.7v-30.6z" />
    </svg>
  );
}

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const [siteName, setSiteName] = useState("CodeXplus");
  const [navCol, setNavCol] = useState(fallbackNavCol);
  const [usefulLinks, setUsefulLinks] = useState(fallbackUsefulLinks);
  const [socials, setSocials] = useState(fallbackSocials);
  const [locations, setLocations] = useState<any[]>([]);

  useEffect(() => {
    let active = true;
    fetch("/api/site-settings")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load site settings");
        return res.json();
      })
      .then(
        (data: {
          siteName?: string;
          navLinks?: FooterLink[];
          usefulLinks?: FooterLink[];
          socials?: FooterLink[];
          locations?: any[];
        }) => {
          if (!active) return;
          if (data.siteName) setSiteName(data.siteName);
          if (Array.isArray(data.navLinks) && data.navLinks.length > 0) {
            setNavCol(
              data.navLinks.map((link, i) => ({ ...link, active: i === 0 })),
            );
          }
          if (Array.isArray(data.usefulLinks) && data.usefulLinks.length > 0) {
            setUsefulLinks(data.usefulLinks);
          }
          if (Array.isArray(data.socials) && data.socials.length > 0) {
            setSocials(data.socials);
          }
          if (Array.isArray(data.locations) && data.locations.length > 0) {
            setLocations(data.locations);
          }
        },
      )
      .catch(() => {
        /* fall back to static content */
      });
    return () => {
      active = false;
    };
  }, []);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim() || status === "loading") return;
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong");
      setStatus("success");
      setEmail("");
      window.setTimeout(() => setStatus("idle"), 4000);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-[#0b0f19] to-[#070a12] px-8 pb-12 pt-24 text-white md:px-20">
      <Link
        href="/"
        aria-label="Homepage"
        className="absolute bottom-16 left-6 hidden items-center md:flex"
      >
        <span className="rotate-180 text-[10px] font-medium uppercase tracking-[0.25em] text-white/50 transition-colors duration-300 hover:text-accent [writing-mode:vertical-rl]">
          Homepage
        </span>
      </Link>

      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 md:flex-row">
        <div className="space-y-9">
          <Link
            href="/"
            className="inline-block text-5xl font-bold tracking-tight"
          >
            {siteName}<span className="text-accent">.</span>
          </Link>
          <div className="space-y-4">
            <p className="text-[12px] font-normal uppercase tracking-wider text-white/50">
              Subscribe our newsletter:
            </p>
            <form onSubmit={submit} className="relative flex max-w-sm items-center">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ENTER OUR EMAIL"
                aria-label="Email address"
                className="h-[56px] w-full rounded-full border border-white/15 bg-white/10 px-6 py-4 pr-12 text-xs tracking-wider text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-accent/60"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                disabled={status === "loading"}
                className="absolute right-1.5 flex size-10 items-center justify-center rounded-xl bg-accent-gradient text-white transition-opacity duration-300 hover:opacity-95 disabled:opacity-60"
              >
                <ArrowRight className="size-4" />
              </button>
            </form>
            {status === "success" && (
              <p className="mt-2 pl-2 text-xs text-accent">
                Thanks — you&apos;re on the list!
              </p>
            )}
            {status === "error" && (
              <p className="mt-2 pl-2 text-xs text-red-400">{error}</p>
            )}
          </div>
        </div>

        <nav aria-label="Footer navigation" className="space-y-5">
          <ul className="space-y-4 text-3xl font-medium">
            {navCol.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className={
                    link.active
                      ? "text-accent"
                      : "text-white transition-colors hover:text-accent"
                  }
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-5 pt-1.5">
          <ul className="space-y-4 text-lg text-white/70">
            {usefulLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="transition-colors hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {locations.length > 0 ? (
          locations.map((loc) => (
            <div key={loc.city} className="space-y-4 pt-1.5">
              <h4 className="text-lg font-bold uppercase tracking-wider text-white">
                {loc.country}
              </h4>
              <p className="text-sm leading-relaxed text-white/60">
                {loc.address}
                <br />
                {loc.city}
              </p>
              {loc.phone && (
                <div className="pt-2">
                  {loc.contactType === "whatsapp" ? (
                    <a
                      href={`https://wa.me/${loc.phone.replace(/[^+\d]/g, "")}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 transition-colors duration-300 hover:text-purple-400"
                    >
                      <MessageSquare className="size-4" />
                      {loc.phone}
                    </a>
                  ) : (
                    <a
                      href={`tel:${loc.phone.replace(/[^+\d]/g, "")}`}
                      className="inline-flex items-center gap-2 transition-colors duration-300 hover:text-purple-400"
                    >
                      <Phone className="size-4" />
                      {loc.phone}
                    </a>
                  )}
                </div>
              )}
            </div>
          ))
        ) : (
          <>
            <div className="space-y-4 pt-1.5">
              <h4 className="text-lg font-bold uppercase tracking-wider text-white">
                Canada
              </h4>
              <p className="text-sm leading-relaxed text-white/60">
                71 South Los Carneros Road,
                <br />
                California
              </p>
              <div className="pt-2">
                <a
                  href="tel:+14165550147"
                  className="inline-flex items-center gap-2 transition-colors duration-300 hover:text-purple-400"
                >
                  <Phone className="size-4" />
                  +1 (416) 555-0147
                </a>
              </div>
            </div>

            <div className="space-y-4 pt-1.5">
              <h4 className="text-lg font-bold uppercase tracking-wider text-white">
                Germany
              </h4>
              <p className="text-sm leading-relaxed text-white/60">
                Leehove 40, 2678 MC De Lier,
                <br />
                Netherlands
              </p>
              <div className="pt-2">
                <a
                  href="https://wa.me/49305550186"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 transition-colors duration-300 hover:text-purple-400"
                >
                  <MessageSquare className="size-4" />
                  +49 30 555 0186
                </a>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="mx-auto mt-16 flex max-w-7xl flex-col items-start justify-between gap-8 border-t border-white/10 pt-16 text-xs text-white/50 md:flex-row md:items-center">
        <div className="flex items-center gap-4 text-sm text-white">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              aria-label={s.label}
              className="transition-colors hover:text-accent"
            >
              {s.label === "Behance" ? (
                <BehanceIcon className="size-6" />
              ) : s.label === "Dribbble" ? (
                <Dribbble className="size-6" />
              ) : s.label === "Twitter" ? (
                <Twitter className="size-6" />
              ) : (
                <Github className="size-6" />
              )}
            </a>
          ))}
        </div>
        <div className="text-[14px] tracking-wide text-white/50">
          © Copyright {new Date().getFullYear()} - CodeXplus. All Rights
          Reserved.Develop by{" "}
          <a
            className="text-gradient"
            href="https://techmiresolutions.com/"
            target="_blank"
            rel="noreferrer"
          >
            ARMAN NAQVI
          </a>
        </div>
      </div>

      <div className="absolute bottom-12 right-6 hidden items-center gap-3 md:flex">
        <span className="text-[12px] font-medium uppercase tracking-[0.25em] text-white [writing-mode:vertical-rl]">
          Back to top
        </span>
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="flex size-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition-colors duration-300 hover:bg-accent-gradient hover:text-white"
        >
          <ArrowUp className="size-4" />
        </button>
      </div>
    </footer>
  );
}
