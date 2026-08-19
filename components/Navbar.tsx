"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Mail, MapPin, Phone, MessageSquare } from "lucide-react";
import Link from "next/link";
import Polyhedron from "@/components/Polyhedron";
import { brand, projects } from "@/data/content";
import { getClient, siteSettingsQuery } from "@/lib/sanity";
import { cn } from "@/lib/utils";

type SiteSettings = {
  siteName?: string;
  siteLogo?: string;
  logoAlt?: string;
  email?: string;
  phoneIntl?: string[];
  locations?: { city: string; country: string; region: string; phone?: string; contactType?: string }[];
  socials?: { label: string; href: string }[];
};

const menuLinks = [
  { label: "Home", href: "/", active: true },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Services", href: "/services" },
  { label: "Team", href: "/team" },
  { label: "Contact", href: "/contact" },
  { label: "Blog", href: "/articles" },
];

const usefulLinks = [
  { label: "About the studio", href: "/#about" },
  { label: "Insights", href: "/articles" },
  { label: "Careers", href: "#" },
  { label: "Privacy policy", href: "#" },
  { label: "Press kit", href: "#" },
];

const offices = [
  {
    city: "Canada office",
    lines: ["123 King St. West, Suite 400", "Toronto, ON M5V 3M5"],
    phone: "+1 (416) 555-0147",
    contactType: "phone",
  },
  {
    city: "Germany office",
    lines: ["Friedrichstraße 68, 10117", "Berlin, Germany"],
    phone: "+49 30 555 0186",
    contactType: "whatsapp",
  },
];

const fallbackSocials = [
  { label: "GitHub", href: "https://github.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "Twitter", href: "https://twitter.com" },
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Dribbble", href: "https://dribbble.com" },
];

function officesFromSettings(settings: SiteSettings | null) {
  if (!settings) return offices;
  const { locations } = settings;
  if (!Array.isArray(locations) || locations.length === 0) return offices;
  return locations.map((loc, i) => ({
    city: `${loc.city} office`,
    lines: [loc.country, loc.region].filter(Boolean),
    phone: loc.phone || settings.phoneIntl?.[i] || "",
    contactType: loc.contactType || "phone",
  }));
}

function InfoBlock({
  title,
  children,
  delay,
}: {
  title: string;
  children: React.ReactNode;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ delay, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <h4 className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-faint">
        <span className="h-px w-6 bg-accent" />
        {title}
      </h4>
      <div className="mt-5">{children}</div>
    </motion.div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  const onDark = !scrolled && !open;
  const siteName = settings?.siteName || brand.name;
  const siteLogo = settings?.siteLogo;
  const dynamicOffices = officesFromSettings(settings);
  const dynamicSocials =
    Array.isArray(settings?.socials) && settings.socials.length > 0
      ? settings.socials
      : fallbackSocials;

  useEffect(() => {
    let active = true;
    getClient()
      .fetch<SiteSettings>(siteSettingsQuery)
      .then((data) => {
        if (active && data) setSettings(data);
      })
      .catch(() => {
        /* fall back to static logo */
      });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[80] transition-all duration-500",
          !open && scrolled
            ? "border-b border-line-soft bg-base/80 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <Polyhedron
            className="absolute -right-24 -top-36 hidden h-72 w-72 rotate-12 opacity-60 md:block"
            stroke="rgba(245,242,255,0.07)"
            vertexFill="rgba(245,242,255,0.12)"
          />
          <Polyhedron
            className="absolute -left-16 top-1/2 hidden h-40 w-40 -translate-y-1/2 -rotate-45 opacity-50 lg:block"
            stroke="rgba(245,242,255,0.06)"
            vertexFill="rgba(245,242,255,0.1)"
          />
        </div>

        <div className="flex w-full items-center justify-between px-10 py-4 md:px-10 md:py-5 lg:px-14">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="group flex items-center transition-colors duration-500"
            aria-label={`Home — ${siteName}`}
          >
            {siteLogo ? (
              <img
                src={siteLogo}
                alt={settings?.logoAlt ?? `${siteName} logo`}
                className="h-8 w-auto object-contain sm:h-10 md:h-12"
              />
            ) : (
              <span
                className={cn(
                  "font-display text-lg font-medium tracking-tight transition-colors duration-500 sm:text-2xl",
                  onDark
                    ? "text-white group-hover:text-accent"
                    : "text-ink group-hover:text-accent"
                )}
              >
                {siteName}
              </span>
            )}
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className={cn(
              "relative z-[85] grid size-9 place-items-center rounded-full border backdrop-blur transition-all duration-500 hover:border-accent/60 sm:size-12",
              onDark
                ? "border-white/20 bg-white/10 text-white hover:border-white/40"
                : "border-line bg-elevated/60 text-ink"
            )}
          >
            <span
              className={cn(
                "absolute h-[2px] w-4 rounded-full transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:w-6",
                onDark ? "bg-white" : "bg-ink",
                open ? "translate-y-0 rotate-45" : "-translate-y-1.5 sm:-translate-y-2"
              )}
            />
            <span
              className={cn(
                "absolute h-[2px] w-4 rounded-full transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:w-6",
                onDark ? "bg-white" : "bg-ink",
                open && "scale-x-0 opacity-0"
              )}
            />
            <span
              className={cn(
                "absolute h-[2px] w-4 rounded-full transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:w-6",
                onDark ? "bg-white" : "bg-ink",
                open ? "translate-y-0 -rotate-45" : "translate-y-1.5 sm:translate-y-2"
              )}
            />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[70] overflow-y-auto bg-base"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 overflow-hidden"
            >
              <Polyhedron
                className="absolute -right-40 top-1/3 hidden h-[560px] w-[560px] -translate-y-1/2 opacity-70 lg:block"
                stroke="rgba(245,242,255,0.05)"
                vertexFill="rgba(245,242,255,0.08)"
              />
              <Polyhedron
                className="absolute -bottom-44 -left-32 h-[420px] w-[420px] rotate-45 opacity-60"
                stroke="rgba(245,242,255,0.05)"
                vertexFill="rgba(245,242,255,0.08)"
              />
            </div>

            <div className="mx-auto max-w-7xl px-5 pb-14 pt-28 md:px-8 md:pt-36">
              <div className="grid gap-14 lg:grid-cols-[1.35fr_1fr] lg:gap-20">
                <nav aria-label="Primary menu">
                  <ul className="flex flex-col">
                    {menuLinks.map((link, i) => (
                      <motion.li
                        key={link.label}
                        initial={{ opacity: 0, y: 32 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 16 }}
                        transition={{
                          delay: 0.15 + i * 0.07,
                          duration: 0.6,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      >
                        <Link
                          href={link.href}
                          onClick={() => setOpen(false)}
                          className="group flex items-center gap-4 border-b border-line-soft py-4 md:gap-7 md:py-6"
                        >
                          <span className="font-sans text-xs text-faint md:text-sm">
                            0{i + 1}
                          </span>
                          <span
                            className={cn(
                              "font-display text-5xl font-medium tracking-tight transition-colors duration-300 md:text-7xl",
                              link.active
                                ? "text-accent"
                                : "text-ink group-hover:text-accent"
                            )}
                          >
                            {link.label}
                          </span>
                          <ArrowUpRight
                            className={cn(
                              "size-6 text-accent transition-all duration-300 md:size-8",
                              link.active
                                ? "opacity-100"
                                : "opacity-0 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100"
                            )}
                          />
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </nav>

                <aside className="grid content-start gap-10 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 xl:gap-8">
                  <InfoBlock title="Projects" delay={0.4}>
                    <ul className="space-y-3">
                      {projects.slice(0, 4).map((p) => (
                        <li key={p.id}>
                          <Link
                            href="/#work"
                            onClick={() => setOpen(false)}
                            className="group inline-flex items-center gap-2 text-sm text-ink/90 transition-colors hover:text-accent"
                          >
                            <span className="h-px w-0 bg-accent transition-all duration-300 group-hover:w-3" />
                            {p.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </InfoBlock>

                  <InfoBlock title="Useful links" delay={0.48}>
                    <ul className="space-y-3">
                      {usefulLinks.map((link) => (
                        <li key={link.label}>
                          {link.href.startsWith("/") ? (
                            <Link
                              href={link.href}
                              onClick={() => setOpen(false)}
                              className="group inline-flex items-center gap-2 text-sm text-ink/90 transition-colors hover:text-accent"
                            >
                              <span className="h-px w-0 bg-accent transition-all duration-300 group-hover:w-3" />
                              {link.label}
                            </Link>
                          ) : (
                            <a
                              href={link.href}
                              className="group inline-flex items-center gap-2 text-sm text-ink/90 transition-colors hover:text-accent"
                            >
                              <span className="h-px w-0 bg-accent transition-all duration-300 group-hover:w-3" />
                              {link.label}
                            </a>
                          )}
                        </li>
                      ))}
                    </ul>
                  </InfoBlock>

                  <div className="grid gap-10 sm:col-span-2 lg:col-span-1 sm:grid-cols-2 xl:col-span-2">
                    {dynamicOffices.map((office, i) => (
                      <InfoBlock key={office.city} title={office.city} delay={0.56 + i * 0.06}>
                        <ul className="space-y-2.5">
                          <li className="flex items-start gap-3 text-sm text-muted">
                            <MapPin className="mt-0.5 size-4 shrink-0 text-accent" />
                            <span>
                              {office.lines.map((line) => (
                                <span key={line} className="block leading-relaxed">
                                  {line}
                                </span>
                              ))}
                            </span>
                          </li>
                          {office.phone ? (
                            <li className="flex items-center gap-3 text-sm text-muted">
                              {office.contactType === "whatsapp" ? (
                                <>
                                  <MessageSquare className="size-4 shrink-0 text-accent" />
                                  <a
                                    href={`https://wa.me/${office.phone.replace(/[^+\d]/g, "")}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="transition-colors hover:text-ink"
                                  >
                                    {office.phone}
                                  </a>
                                </>
                              ) : (
                                <>
                                  <Phone className="size-4 shrink-0 text-accent" />
                                  <a
                                    href={`tel:${office.phone.replace(/[^+\d]/g, "")}`}
                                    className="transition-colors hover:text-ink"
                                  >
                                    {office.phone}
                                  </a>
                                </>
                              )}
                            </li>
                          ) : null}
                        </ul>
                      </InfoBlock>
                    ))}
                  </div>
                </aside>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="mt-16 flex flex-wrap items-center justify-between gap-5 border-t border-line pt-7"
              >
                <a
                  href={`mailto:${settings?.email ?? brand.email}`}
                  className="inline-flex items-center gap-2.5 text-sm text-muted transition-colors hover:text-ink"
                >
                  <Mail className="size-4 text-accent" />
                  {settings?.email ?? brand.email}
                </a>
                <div className="flex flex-wrap gap-x-5 gap-y-2">
                  {dynamicSocials.slice(0, 4).map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-muted transition-colors hover:text-accent"
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
