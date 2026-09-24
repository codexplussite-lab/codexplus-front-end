"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { Sun, Moon, Menu, X } from "lucide-react";

export interface CardNavLink {
  label: string;
  ariaLabel?: string;
  href?: string;
}

export interface CardNavItem {
  label: string;
  bgColor?: string;
  textColor?: string;
  links: CardNavLink[];
}

export interface CardNavProps {
  logo?: string | React.ReactNode;
  logoAlt?: string;
  siteName?: string;
  items: CardNavItem[];
  baseColor?: string;
  menuColor?: string;
  buttonBgColor?: string;
  buttonTextColor?: string;
  ease?: string;
}

export default function CardNav({
  logo,
  logoAlt = "Logo",
  siteName = "CodeXplus",
  items,
  baseColor = "#fff",
  menuColor = "#000",
  buttonBgColor = "#111",
  buttonTextColor = "#fff",
  ease = "power3.out",
}: CardNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const navRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "dark" | "light" | null;
    if (savedTheme === "light" || (!savedTheme && window.matchMedia("(prefers-color-scheme: light)").matches)) {
      setTheme("light");
      document.documentElement.classList.add("light");
    } else {
      setTheme("dark");
      document.documentElement.classList.remove("light");
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    if (nextTheme === "light") {
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
    }
  };

  useEffect(() => {
    if (!cardsContainerRef.current) return;

    if (isOpen) {
      gsap.to(cardsContainerRef.current, {
        height: "auto",
        opacity: 1,
        duration: 0.5,
        ease: ease,
      });
      gsap.fromTo(
        ".card-nav-item",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.08, ease: ease }
      );
    } else {
      gsap.to(cardsContainerRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.35,
        ease: "power2.in",
      });
    }
  }, [isOpen, ease]);

  return (
    <header className="fixed top-4 inset-x-0 z-[100] mx-auto max-w-6xl px-4">
      <div
        ref={navRef}
        className="relative flex items-center justify-between rounded-full border border-white/20 bg-transparent px-6 py-3 backdrop-blur-md shadow-lg transition-all duration-300"
        style={{
          backgroundColor: theme === "light" ? "rgba(255, 255, 255, 0.25)" : "rgba(0, 0, 0, 0.25)",
        }}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          {typeof logo === "string" && logo ? (
            <img src={logo} alt={logoAlt} className="h-8 max-h-8 max-w-[160px] object-contain" />
          ) : logo ? (
            logo
          ) : (
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-accent to-purple-500 text-white font-bold text-lg shadow-md shadow-accent/30">
                <span className="font-display">{(siteName || "C").charAt(0).toUpperCase()}</span>
              </div>
              <span className={`font-display text-xl font-bold tracking-tight ${theme === "light" ? "text-slate-900" : "text-white"}`}>
                {siteName}
              </span>
            </div>
          )}
        </Link>

        {/* Desktop Quick Nav Links */}
        <nav className="hidden md:flex items-center gap-1">
          {items.map((item, idx) => (
            <div
              key={item.label}
              className="relative group"
              onMouseEnter={() => setActiveCard(idx)}
              onMouseLeave={() => setActiveCard(null)}
            >
              <button
                type="button"
                className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                  theme === "light"
                    ? "text-slate-700 hover:bg-slate-200/60 hover:text-slate-900"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                {item.label}
              </button>

              {/* Card Dropdown Menu */}
              {activeCard === idx && item.links && item.links.length > 0 && (
                <div
                  className="absolute top-full left-0 mt-2 min-w-[200px] overflow-hidden rounded-2xl p-3 shadow-2xl border border-white/15 backdrop-blur-2xl transition-all duration-300 z-50"
                  style={{
                    backgroundColor: item.bgColor || (theme === "light" ? "#ffffff" : "#1B1722"),
                    color: item.textColor || "#ffffff",
                  }}
                >
                  <p className="text-[11px] font-bold uppercase tracking-wider opacity-60 mb-2 px-3">
                    {item.label}
                  </p>
                  <div className="flex flex-col gap-1">
                    {item.links.map((link) => (
                      <Link
                        key={link.label}
                        href={link.href || "#"}
                        aria-label={link.ariaLabel || link.label}
                        className="rounded-xl px-3 py-2 text-sm font-medium transition-colors hover:bg-white/15 block"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Header Right Actions */}
        <div className="flex items-center gap-3">
          {/* Light/Dark Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className={`grid size-10 place-items-center rounded-full border backdrop-blur transition-all duration-300 hover:scale-105 active:scale-95 ${
              theme === "light"
                ? "border-slate-300 bg-slate-100 text-slate-800 hover:bg-slate-200"
                : "border-white/20 bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            {theme === "dark" ? (
              <Sun className="size-4 text-amber-300" />
            ) : (
              <Moon className="size-4 text-indigo-600" />
            )}
          </button>

          {/* Toggle Menu Button */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 hover:scale-105 active:scale-95 shadow-md"
            style={{
              backgroundColor: buttonBgColor,
              color: buttonTextColor,
            }}
          >
            {isOpen ? <X className="size-4" /> : <Menu className="size-4" />}
            <span className="hidden sm:inline">{isOpen ? "Close" : "Menu"}</span>
          </button>
        </div>
      </div>

      {/* Expandable Cards Menu Container */}
      <div
        ref={cardsContainerRef}
        className="mt-3 overflow-hidden rounded-3xl opacity-0 h-0 transition-all shadow-2xl"
      >
        <div className="grid gap-3 p-4 sm:grid-cols-3 bg-black/80 backdrop-blur-2xl border border-white/15 rounded-3xl">
          {items.map((item) => (
            <div
              key={item.label}
              className="card-nav-item flex flex-col justify-between rounded-2xl p-5 border border-white/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
              style={{
                backgroundColor: item.bgColor || "#1B1722",
                color: item.textColor || "#ffffff",
              }}
            >
              <div>
                <h3 className="font-display text-xl font-bold tracking-tight mb-4 border-b border-white/10 pb-2">
                  {item.label}
                </h3>
                <div className="flex flex-col gap-2">
                  {item.links.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href || "#"}
                      onClick={() => setIsOpen(false)}
                      aria-label={link.ariaLabel || link.label}
                      className="inline-flex items-center justify-between rounded-xl bg-white/5 px-3.5 py-2.5 text-sm font-medium transition-colors hover:bg-white/20"
                    >
                      <span>{link.label}</span>
                      <span className="text-xs opacity-60">→</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}
