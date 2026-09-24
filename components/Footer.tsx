import React from "react";
import Link from "next/link";
import { Dribbble, Github, Twitter, MessageSquare, Phone } from "lucide-react";
import NewsletterForm from "@/components/NewsletterForm";
import BackToTop from "@/components/BackToTop";
import { getSiteSettings } from "@/lib/data";
import { brand } from "@/data/content";

const fallbackNavCol = [
  { label: "Home", href: "/", active: true },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Services", href: "/services" },
  { label: "Team", href: "/team" },
  { label: "Contact", href: "/contact" },
  { label: "Blog", href: "/articles" },
];

const fallbackUsefulLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms and conditions", href: "/terms-and-conditions" },
  { label: "Cookie Policy", href: "/cookie-policy" },
  { label: "Careers", href: "/careers" },
];

const fallbackSocials = [
  { label: "Behance", href: "https://behance.net" },
  { label: "Dribbble", href: "https://dribbble.com" },
  { label: "Twitter", href: "https://twitter.com" },
  { label: "GitHub", href: "https://github.com" },
];

type FooterLink = { label: string; href: string; active?: boolean };

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

export default async function Footer() {
  const settings = await getSiteSettings();

  const siteName = settings.siteName || brand.name;
  const siteLogo = settings.siteLogo;
  const logoAlt = settings.logoAlt || siteName;
  const copyrightText = settings.copyrightText || "All Rights Reserved.";
  const navCol: FooterLink[] = (settings.navLinks && settings.navLinks.length > 0)
    ? settings.navLinks.map((link, i) => ({ ...link, active: i === 0 }))
    : fallbackNavCol;
  const usefulLinks: FooterLink[] = (settings.usefulLinks && settings.usefulLinks.length > 0)
    ? settings.usefulLinks
    : fallbackUsefulLinks;
  const socials: FooterLink[] = (settings.socials && settings.socials.length > 0)
    ? settings.socials
    : fallbackSocials;
  const locations: Array<{
    city?: string;
    country?: string;
    region?: string;
    address?: string;
    phone?: string;
    contactType?: string;
  }> = (settings.locations && settings.locations.length > 0)
    ? settings.locations
    : brand.locations;

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
            {siteLogo ? (
              <img
                src={siteLogo}
                alt={logoAlt}
                className="h-10 max-h-12 max-w-[220px] object-contain drop-shadow-sm"
              />
            ) : (
              <span>
                {siteName}
                <span className="text-accent">.</span>
              </span>
            )}
          </Link>
          <NewsletterForm />
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

        <div className="flex flex-col gap-8 pt-1.5">
          {locations.map((loc, i) => (
            <div key={loc.city || i} className="space-y-4">
              <h4 className="text-lg font-bold uppercase tracking-wider text-white">
                {loc.country}
              </h4>
              <p className="text-sm leading-relaxed text-white/60">
                {loc.address && (
                  <>
                    {loc.address}
                    <br />
                  </>
                )}
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
          ))}
        </div>

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
          © Copyright {new Date().getFullYear()} - {siteName}. {copyrightText} Develop by{" "}
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

      <BackToTop />
    </footer>
  );
}
