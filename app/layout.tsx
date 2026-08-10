import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { getClient, siteSettingsQuery } from "@/lib/sanity";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

type SiteSettingsMeta = {
  siteName?: string;
  siteLogo?: string;
  logoAlt?: string;
  favicon?: string;
};

export async function generateMetadata(): Promise<Metadata> {
  let favicon: string | undefined;

  try {
    const settings = await getClient().fetch<SiteSettingsMeta>(siteSettingsQuery);
    favicon = settings?.favicon;
  } catch {
    /* Sanity unavailable — fall back to defaults. */
  }

  return {
    title: "CodeXplus — Creative Studio & Digital Design Agency",
    description:
      "CodeXplus is a creative studio crafting brand identities, websites and full-stack digital products that move the world. Design. Engineering. Imagination.",
    keywords: [
      "creative agency",
      "design studio",
      "Next.js development",
      "brand identity",
      "UI UX design",
      "portfolio",
    ],
    openGraph: {
      title: "CodeXplus — Creative Studio & Digital Design Agency",
      description:
        "We design & build digital experiences that move the world. Branding, websites and full-stack products.",
      type: "website",
    },
    icons: favicon
      ? {
          icon: favicon,
          shortcut: favicon,
          apple: favicon,
        }
      : undefined,
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${spaceGrotesk.variable} relative bg-base font-sans text-ink antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
