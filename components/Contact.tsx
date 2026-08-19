"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Check,
  Facebook,
  Instagram,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Send,
  Twitter,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import { brand } from "@/data/content";
import {
  LEAD_CONTEXT_EVENT,
  leadContextMessage,
  type LeadContext,
} from "@/lib/leadContext";
import { cn } from "@/lib/utils";

type Status = "idle" | "loading" | "success" | "error";

const inputClass =
  "w-full rounded-2xl border border-line bg-elevated px-5 py-4 text-sm text-ink placeholder:text-faint transition-colors duration-300 focus:border-accent/60 focus:outline-none";

const features = [
  "Personalized assistance",
  "Timely response",
  "Comprehensive support",
];

const socials = [
  { label: "X / Twitter", icon: Twitter, href: "https://twitter.com" },
  { label: "Facebook", icon: Facebook, href: "https://www.facebook.com/" },
  { label: "Instagram", icon: Instagram, href: "https://www.instagram.com/" },
];

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [flash, setFlash] = useState(false);
  const [contactEmail, setContactEmail] = useState(brand.email);
  const [contactPhone, setContactPhone] = useState(brand.phoneIntl[0]);
  const [locations, setLocations] = useState(brand.locations);
  const formRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const flashTimer = useRef<number | null>(null);

  const applyLeadContext = (context: LeadContext) => {
    const prefix = `${leadContextMessage(context)}\n\n`;
    setMessage((prev) => (prev.trim() ? prev : prefix));
    setFlash(true);
    if (flashTimer.current) window.clearTimeout(flashTimer.current);
    flashTimer.current = window.setTimeout(() => setFlash(false), 2400);
    window.setTimeout(() => {
      textareaRef.current?.focus({ preventScroll: true });
    }, 700);
  };

  useEffect(() => {
    let active = true;
    fetch("/api/site-settings")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load site settings");
        return res.json();
      })
      .then(
        (data: {
          email?: string;
          phoneIntl?: string[];
          locations?: typeof brand.locations;
        }) => {
          if (!active) return;
          if (data.email) setContactEmail(data.email);
          if (Array.isArray(data.phoneIntl) && data.phoneIntl.length > 0) {
            setContactPhone(data.phoneIntl[0]);
          }
          if (Array.isArray(data.locations) && data.locations.length > 0) {
            setLocations(data.locations);
          }
        }
      )
      .catch(() => {
        /* fall back to static content */
      });

    const onLeadContext = (e: Event) => {
      applyLeadContext((e as CustomEvent<LeadContext>).detail);
    };
    window.addEventListener(LEAD_CONTEXT_EVENT, onLeadContext);

    const params = new URLSearchParams(window.location.search);
    const fromUrl = params.get("contact");
    if (fromUrl) {
      applyLeadContext({ title: fromUrl });
      const contact = document.getElementById("contact");
      if (contact) contact.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    return () => {
      active = false;
      window.removeEventListener(LEAD_CONTEXT_EVENT, onLeadContext);
      if (flashTimer.current) window.clearTimeout(flashTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong");
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  const primaryLocation = locations[0];
  const telHref = `tel:${contactPhone.replace(/[^+\d]/g, "")}`;

  return (
    <section id="contact" className="relative scroll-mt-20 overflow-hidden py-24 md:scroll-mt-24 md:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 z-0 h-[420px] w-[720px] -translate-x-1/2 rounded-full opacity-10 blur-[140px]"
        style={{
          background:
            "radial-gradient(closest-side, #7437ff 0%, #9a66ff 45%, transparent 100%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left column */}
          <div className="lg:col-span-5">
            <Reveal>
              <span className="inline-flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.28em] text-accent">
                <span className="inline-block h-px w-8 bg-accent" />
                Contact
              </span>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-5 font-display text-5xl font-medium leading-[1.02] tracking-tight md:text-6xl">
                Reach out
                <ArrowUpRight className="ml-3 inline-block size-10 text-accent md:size-12" />
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-6 max-w-md text-[1rem] leading-relaxed text-muted md:text-lg">
                Have a question or need assistance? Reach out to our dedicated
                support team — we&apos;ll get back to you within 24 hours.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <ul className="mt-9 space-y-3.5">
                {features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-ink/90">
                    <span className="grid size-6 shrink-0 place-items-center rounded-full bg-accent/15">
                      <Check className="size-3.5 text-accent" />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.26}>
              <div className="mt-10 flex items-center gap-4">
                <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-faint">
                  Follow us
                </span>
                <span className="h-px w-10 bg-line" />
                <div className="flex items-center gap-2.5">
                  {socials.map(({ label, icon: Icon, href }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      data-hover
                      className="grid size-10 place-items-center rounded-full border border-line bg-elevated/80 text-faint transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/60 hover:bg-accent/15 hover:text-accent"
                    >
                      <Icon className="size-4" />
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right column — form card */}
          <div className="lg:col-span-7">
            <Reveal delay={0.18}>
              <div
                ref={formRef}
                className={cn(
                  "gradient-border rounded-3xl border border-line bg-panel/70 p-6 backdrop-blur-xl transition-shadow duration-500 md:p-9",
                  flash && "shadow-[0_0_70px_rgba(116,55,255,0.4)] ring-1 ring-accent/70"
                )}
              >
                <form onSubmit={submit} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="name"
                        className="mb-2 block text-xs uppercase tracking-[0.2em] text-faint"
                      >
                        Your name
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Jane Cooper"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="mb-2 block text-xs uppercase tracking-[0.2em] text-faint"
                      >
                        Email address
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="jane@company.com"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="mb-2 block text-xs uppercase tracking-[0.2em] text-faint"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      ref={textareaRef}
                      required
                      rows={6}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell us how we can help..."
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="inline-flex h-13 w-full items-center justify-center gap-2.5 rounded-xl bg-ink px-8 py-4 text-sm font-semibold text-[#0b0f19] transition-all duration-300 hover:bg-white hover:shadow-[0_0_30px_rgba(238,241,251,0.25)] disabled:opacity-60"
                  >
                    {status === "loading" ? (
                      <>
                        Sending...
                        <Loader2 className="size-4 animate-spin" />
                      </>
                    ) : status === "success" ? (
                      <>
                        Message sent
                        <Check className="size-4" />
                      </>
                    ) : (
                      <>
                        Submit
                        <Send className="size-4" />
                      </>
                    )}
                  </button>

                  {status === "success" && (
                    <p className="text-center text-sm text-accent">
                      Thanks — we&apos;ll get back to you within 24 hours.
                    </p>
                  )}
                  {status === "error" && (
                    <p className="text-center text-sm text-red-400">{error}</p>
                  )}
                </form>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Bottom info cards row */}
        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3 lg:mt-16">
          <Reveal delay={0.05}>
            <a
              href={`mailto:${contactEmail}`}
              data-hover
              className="group flex items-center gap-4 rounded-3xl border border-line bg-panel/70 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-[0_16px_40px_-16px_rgba(116,55,255,0.35)]"
            >
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl border border-line bg-elevated/80 text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                <Mail className="size-5" />
              </span>
              <span className="min-w-0">
                <span className="block text-[11px] uppercase tracking-[0.2em] text-faint">
                  Email us
                </span>
                <span className="mt-1 block truncate text-sm font-medium text-ink">
                  {contactEmail}
                </span>
              </span>
            </a>
          </Reveal>

          <Reveal delay={0.12}>
            <a
              href={telHref}
              data-hover
              className="group flex items-center gap-4 rounded-3xl border border-line bg-panel/70 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-[0_16px_40px_-16px_rgba(116,55,255,0.35)]"
            >
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl border border-line bg-elevated/80 text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                <Phone className="size-5" />
              </span>
              <span className="min-w-0">
                <span className="block text-[11px] uppercase tracking-[0.2em] text-faint">
                  Call us
                </span>
                <span className="mt-1 block truncate text-sm font-medium text-ink">
                  {contactPhone}
                </span>
              </span>
            </a>
          </Reveal>

          <Reveal delay={0.19}>
            <div className="flex items-center gap-4 rounded-3xl border border-line bg-panel/70 p-6 backdrop-blur-xl">
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl border border-line bg-elevated/80 text-accent">
                <MapPin className="size-5" />
              </span>
              <span className="min-w-0">
                <span className="block text-[11px] uppercase tracking-[0.2em] text-faint">
                  Our location
                </span>
                <span className="mt-1 block text-sm font-medium text-ink">
                  {primaryLocation
                    ? `${primaryLocation.city}, ${primaryLocation.country}`
                    : "Worldwide"}
                </span>
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}