import React from "react";
import CardNav, { CardNavItem } from "@/components/CardNav";
import { defaultCardNavItems } from "@/data/content";
import { getSiteSettings } from "@/lib/data";

export interface NavbarProps {
  initialLogo?: string;
  initialLogoAlt?: string;
  initialSiteName?: string;
  initialItems?: CardNavItem[];
}

export default async function Navbar({
  initialLogo,
  initialLogoAlt,
  initialSiteName,
  initialItems,
}: NavbarProps = {}) {
  let logo = initialLogo;
  let logoAlt = initialLogoAlt;
  let siteName = initialSiteName;
  let items = initialItems;

  try {
    const settings = await getSiteSettings();
    if (!logo && settings.siteLogo) logo = settings.siteLogo;
    if (!logoAlt) logoAlt = settings.logoAlt || settings.siteName || "Logo";
    if (!siteName) siteName = settings.siteName || "CodeXplus";
    if (!items && Array.isArray(settings.cardNavItems) && settings.cardNavItems.length > 0) {
      items = settings.cardNavItems;
    }
  } catch {
    /* fallback to defaults */
  }

  return (
    <CardNav
      logo={logo}
      logoAlt={logoAlt || "Logo"}
      siteName={siteName || "CodeXplus"}
      items={items && items.length > 0 ? items : defaultCardNavItems}
      baseColor="#fff"
      menuColor="#000"
      buttonBgColor="#7437ff"
      buttonTextColor="#fff"
      ease="power3.out"
    />
  );
}
