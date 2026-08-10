import Cursor from "@/components/Cursor";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Cursor />
      <div aria-hidden className="grain" />
      {children}
    </>
  );
}
