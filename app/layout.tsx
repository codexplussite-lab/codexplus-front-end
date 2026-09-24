import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { getSiteSettings } from "@/lib/data";

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

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  const siteName = settings.siteName || "CodeXplus";
  const tagline = settings.tagline || "Creative Studio & Digital Design Agency";
  const title = settings.metaTitle || `${siteName} — ${tagline}`;
  const description =
    settings.metaDescription ||
    `${siteName} is a creative studio crafting brand identities, websites and full-stack digital products that move the world. Design. Engineering. Imagination.`;

  const keywords =
    Array.isArray(settings.keywords) && settings.keywords.length > 0
      ? settings.keywords
      : [
          "creative agency",
          "design studio",
          "Next.js development",
          "brand identity",
          "UI UX design",
          "portfolio",
        ];

  const favicon = settings.favicon;
  const ogImage = settings.ogImage;

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      type: "website",
      images: ogImage ? [{ url: ogImage }] : undefined,
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
