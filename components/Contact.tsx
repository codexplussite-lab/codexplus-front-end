"use client";

import { useEffect, useState } from "react";
import { Check, Loader2, Send } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { brand } from "@/data/content";

type Status = "idle" | "loading" | "success" | "error";

const inputClass =
  "w-full rounded-2xl border border-line bg-elevated px-5 py-4 text-sm text-ink placeholder:text-faint transition-colors duration-300 focus:border-accent/60 focus:outline-none";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [contactEmail, setContactEmail] = useState(brand.email);
  const [locations, setLocations] = useState(brand.locations);

  useEffect(() => {
    let active = true;
    fetch("/api/site-settings")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load site settings");
        return res.json();
      })
      .then((data: { email?: string; locations?: typeof brand.locations }) => {
        if (!active) return;
        if (data.email) setContactEmail(data.email);
        if (Array.isArray(data.locations) && data.locations.length > 0) {
          setLocations(data.locations);
        }
      })
      .catch(() => {
        /* fall back to static content */
      });
    return () => {
      active = false;
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

  return (
    <section id="contact" className="relative py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              kicker="Contact"
              title={
                <>
                  Let&apos;s build
                  <br />
                  something <span className="text-gradient">great.</span>
                </>
              }
              description="Tell us about your project, timeline and budget. We reply within 24 hours — usually faster."
              className="mb-0"
            />

            <Reveal delay={0.15}>
              <div className="mt-10 space-y-4">
                <a
                  href={`mailto:${contactEmail}`}
                  className="group flex items-center gap-4 rounded-2xl border border-line bg-panel p-5 transition-colors duration-300 hover:border-accent/50"
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-accent text-white">
                    <Send className="size-5" />
                  </span>
                  <span>
                    <span className="block text-xs uppercase tracking-[0.2em] text-faint">
                      Email us
                    </span>
                    <span className="block text-sm font-medium text-ink group-hover:text-accent">
                      {contactEmail}
                    </span>
                  </span>
                </a>
                {locations.map((loc) => (
                  <div
                    key={loc.city}
                    className="flex items-center gap-4 rounded-2xl border border-line bg-panel p-5"
                  >
                    <span className="grid size-11 shrink-0 place-items-center rounded-full border border-line bg-elevated text-ink">
                      {loc.region === "West Coast HQ" ? "US" : "EU"}
                    </span>
                    <span>
                      <span className="block text-xs uppercase tracking-[0.2em] text-faint">
                        {loc.region}
                      </span>
                      <span className="block text-sm font-medium text-ink">
                        {loc.city}, {loc.country}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <div className="gradient-border rounded-3xl border border-line bg-panel p-6 md:p-8">
              <form onSubmit={submit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="mb-2 block text-xs uppercase tracking-[0.2em] text-faint">
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
                  <label htmlFor="email" className="mb-2 block text-xs uppercase tracking-[0.2em] text-faint">
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

                <div>
                  <label htmlFor="message" className="mb-2 block text-xs uppercase tracking-[0.2em] text-faint">
                    Project details
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="We need a website, a brand, a product..."
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-accent-gradient px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:shadow-[0_0_44px_rgba(116,55,255,0.45)] disabled:opacity-60"
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
                      Send message
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
    </section>
  );
}
