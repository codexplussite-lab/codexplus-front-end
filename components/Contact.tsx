"use client";

import { useEffect, useRef, useState } from "react";
import {
  Check,
  Globe,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Play,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import { brand } from "@/data/content";
import {
  LEAD_CONTEXT_EVENT,
  leadContextMessage,
  type LeadContext,
} from "@/lib/leadContext";

type Status = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const [contactEmail, setContactEmail] = useState(brand.email);
  const [contactPhone, setContactPhone] = useState(brand.phoneIntl[0]);
  const [locations, setLocations] = useState(brand.locations);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const applyLeadContext = (context: LeadContext) => {
    const prefix = `${leadContextMessage(context)}\n\n`;
    setMessage((prev) => (prev.trim() ? prev : prefix));
    window.setTimeout(() => {
      textareaRef.current?.focus({ preventScroll: true });
    }, 500);
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
        /* fallback */
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
    };
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
        body: JSON.stringify({ name, email, phone, message }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong");
      setStatus("success");
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  const primaryLocation = locations[0];
  const telHref = `tel:${contactPhone.replace(/[^+\d]/g, "")}`;
  const addressString = primaryLocation
    ? `123 Anywhere St., ${primaryLocation.city}, ${primaryLocation.country}`
    : "123 Anywhere St., Any City, ST 12345";

  return (
    <section id="contact" className="relative scroll-mt-20 overflow-hidden py-16 md:py-24 text-white">
      {/* Exact Atmospheric Backdrop with soft grayscale/silver diffused radial flares */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* Soft upper-left ambient cloud */}
        <div className="absolute -top-32 -left-32 h-[550px] w-[550px] rounded-full bg-white/[0.04] blur-[140px]" />
        {/* Center-right large luminous orb matching the right-side glow in the reference image */}
        <div className="absolute top-1/2 -right-24 h-[650px] w-[650px] -translate-y-1/2 rounded-full bg-white/[0.07] blur-[150px]" />
        {/* Subtle bottom-right flare */}
        <div className="absolute -bottom-20 right-10 h-[450px] w-[450px] rounded-full bg-slate-300/[0.05] blur-[130px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-20 items-start">
          
          {/* Left Column: Heading, Description, Line Divider, Contact List */}
          <div className="lg:col-span-5 flex flex-col justify-between pt-1">
            <div>
              <Reveal>
                <h1 className="text-4xl md:text-5xl lg:text-[54px] font-normal tracking-wide text-white font-sans">
                  Contact Us
                </h1>
              </Reveal>

              <Reveal delay={0.08}>
                <p className="mt-8 text-sm md:text-[15px] leading-relaxed text-slate-300 font-normal max-w-sm">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </Reveal>

              {/* Exact clean silver/gray horizontal divider bar */}
              <Reveal delay={0.12}>
                <div className="mt-10 h-[1.5px] w-20 bg-slate-400/60" />
              </Reveal>
            </div>

            {/* Contact Details List with circular frosted icons */}
            <Reveal delay={0.16}>
              <div className="mt-14 space-y-4 text-sm text-slate-300 font-normal">
                {/* Phone */}
                <a
                  href={telHref}
                  className="flex items-center gap-3.5 transition-colors duration-200 hover:text-white group"
                >
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-white/[0.12] text-white backdrop-blur-sm transition-transform duration-200 group-hover:scale-105">
                    <Phone className="size-3.5" />
                  </span>
                  <span className="tracking-wide">{contactPhone || "+123-456-7890"}</span>
                </a>

                {/* Email */}
                <a
                  href={`mailto:${contactEmail}`}
                  className="flex items-center gap-3.5 transition-colors duration-200 hover:text-white group"
                >
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-white/[0.12] text-white backdrop-blur-sm transition-transform duration-200 group-hover:scale-105">
                    <Mail className="size-3.5" />
                  </span>
                  <span className="tracking-wide">{contactEmail || "hello@reallygreatsite.com"}</span>
                </a>

                {/* Website */}
                <a
                  href="https://reallygreatsite.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3.5 transition-colors duration-200 hover:text-white group"
                >
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-white/[0.12] text-white backdrop-blur-sm transition-transform duration-200 group-hover:scale-105">
                    <Globe className="size-3.5" />
                  </span>
                  <span className="tracking-wide">www.reallygreatsite.com</span>
                </a>

                {/* Location */}
                <div className="flex items-center gap-3.5">
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-white/[0.12] text-white backdrop-blur-sm">
                    <MapPin className="size-3.5" />
                  </span>
                  <span className="tracking-wide text-slate-300">
                    {addressString}
                  </span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Form matching exact design */}
          <div className="lg:col-span-7">
            <Reveal delay={0.14}>
              <form onSubmit={submit} className="space-y-6">
                {/* Name */}
                <div>
                  <label
                    htmlFor="contact-name"
                    className="mb-2 block text-sm font-normal text-white"
                  >
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Francisco Andrade"
                    className="w-full rounded-sm border-t border-l border-r border-white/5 border-b border-b-white/40 bg-white/[0.12] px-4 py-3.5 text-sm text-white placeholder:text-slate-400 placeholder:italic backdrop-blur-md transition-all duration-200 focus:border-b-white focus:bg-white/[0.18] focus:outline-none shadow-sm"
                  />
                </div>

                {/* Email & Phone Number Side by Side */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="mb-2 block text-sm font-normal text-white"
                    >
                      Email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="hello@reallygreatsite.com"
                      className="w-full rounded-sm border-t border-l border-r border-white/5 border-b border-b-white/40 bg-white/[0.12] px-4 py-3.5 text-sm text-white placeholder:text-slate-400 placeholder:italic backdrop-blur-md transition-all duration-200 focus:border-b-white focus:bg-white/[0.18] focus:outline-none shadow-sm"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-phone"
                      className="mb-2 block text-sm font-normal text-white"
                    >
                      Phone Number
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="123-456-7890"
                      className="w-full rounded-sm border-t border-l border-r border-white/5 border-b border-b-white/40 bg-white/[0.12] px-4 py-3.5 text-sm text-white placeholder:text-slate-400 placeholder:italic backdrop-blur-md transition-all duration-200 focus:border-b-white focus:bg-white/[0.18] focus:outline-none shadow-sm"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="contact-message"
                    className="mb-2 block text-sm font-normal text-white"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    ref={textareaRef}
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Hi..."
                    className="w-full resize-none rounded-sm border-t border-l border-r border-white/5 border-b border-b-white/40 bg-white/[0.12] px-4 py-3.5 text-sm text-white placeholder:text-slate-400 placeholder:italic backdrop-blur-md transition-all duration-200 focus:border-b-white focus:bg-white/[0.18] focus:outline-none shadow-sm"
                  />
                </div>

                {/* Submit Button (Exact match: Black rectangle with white text 'SUBMIT' and solid right play triangle) */}
                <div className="flex flex-col items-end gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="inline-flex items-center justify-center gap-2.5 rounded-sm bg-[#090b10] px-9 py-3.5 text-xs font-semibold tracking-wider text-white uppercase transition-all duration-200 hover:bg-[#151922] hover:shadow-lg disabled:opacity-60 border border-white/20"
                  >
                    {status === "loading" ? (
                      <>
                        <span>SUBMITTING</span>
                        <Loader2 className="size-3 animate-spin text-white" />
                      </>
                    ) : status === "success" ? (
                      <>
                        <span>SENT</span>
                        <Check className="size-3 text-emerald-400" />
                      </>
                    ) : (
                      <>
                        <span>SUBMIT</span>
                        <Play className="size-2.5 fill-white text-white translate-y-[0.5px]" />
                      </>
                    )}
                  </button>

                  {status === "success" && (
                    <p className="text-xs text-emerald-400">
                      Thank you! Your message has been sent successfully.
                    </p>
                  )}
                  {status === "error" && (
                    <p className="text-xs text-red-400">{error}</p>
                  )}
                </div>
              </form>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
}