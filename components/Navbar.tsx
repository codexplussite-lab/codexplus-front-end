"use client";

import React from "react";
import CardNav, { CardNavItem } from "@/components/CardNav";

export default function Navbar() {
  const items: CardNavItem[] = [
    {
      label: "About",
      bgColor: "#1B1722",
      textColor: "#fff",
      links: [
        { label: "Company", ariaLabel: "About Company", href: "/#about" },
        { label: "Services", ariaLabel: "Our Services", href: "/services" },
        { label: "Careers", ariaLabel: "About Careers", href: "/careers" }
      ]
    },
    {
      label: "Projects", 
      bgColor: "#2F293A",
      textColor: "#fff",
      links: [
        { label: "Featured Work", ariaLabel: "Featured Projects", href: "/portfolio" },
        { label: "Tech Stack", ariaLabel: "Skills & Tech Stack", href: "/#skills" },
        { label: "Case Studies", ariaLabel: "Project Case Studies", href: "/portfolio" }
      ]
    },
    {
      label: "Contact",
      bgColor: "#1B1722", 
      textColor: "#fff",
      links: [
        { label: "Get In Touch", ariaLabel: "Contact Form", href: "/contact" },
        { label: "Email", ariaLabel: "Email us", href: "mailto:hello@codexplus.studio" },
        { label: "LinkedIn", ariaLabel: "LinkedIn", href: "https://linkedin.com" },
        { label: "GitHub", ariaLabel: "GitHub", href: "https://github.com" }
      ]
    }
  ];

  return (
    <CardNav
      items={items}
      baseColor="#fff"
      menuColor="#000"
      buttonBgColor="#7437ff"
      buttonTextColor="#fff"
      ease="power3.out"
    />
  );
}
