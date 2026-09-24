"use client";

import React, { useEffect, useState } from "react";
import CardNav, { CardNavItem } from "@/components/CardNav";
import { defaultCardNavItems } from "@/data/content";

export default function Navbar() {
  const [logo, setLogo] = useState<string | undefined>();
  const [logoAlt, setLogoAlt] = useState<string>("Logo");
  const [siteName, setSiteName] = useState<string>("CodeXplus");
  const [items, setItems] = useState<CardNavItem[]>(defaultCardNavItems);

  useEffect(() => {
    let active = true;
    fetch("/api/site-settings")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load settings");
        return res.json();
      })
      .then((data) => {
        if (!active) return;
        if (data.siteLogo) setLogo(data.siteLogo);
        if (data.logoAlt) setLogoAlt(data.logoAlt);
        if (data.siteName) setSiteName(data.siteName);
        if (Array.isArray(data.cardNavItems) && data.cardNavItems.length > 0) {
          setItems(data.cardNavItems);
        }
      })
      .catch(() => {
        /* fallback to default */
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <CardNav
      logo={logo}
      logoAlt={logoAlt}
      siteName={siteName}
      items={items}
      baseColor="#fff"
      menuColor="#000"
      buttonBgColor="#7437ff"
      buttonTextColor="#fff"
      ease="power3.out"
    />
  );
}
