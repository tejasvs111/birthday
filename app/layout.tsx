import type { Metadata, Viewport } from "next";
import "./globals.css";
import Backdrop from "@/components/Backdrop";
import MusicToggle from "@/components/MusicToggle";
import { SITE_DESCRIPTION, SITE_TITLE } from "@/config/site";

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    type: "website",
  },
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#2a0715",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500;1,600&family=Jost:wght@400;500;600&display=swap"
        />
      </head>
      <body className="font-body antialiased">
        <Backdrop />
        <div className="relative z-10">{children}</div>
        <MusicToggle />
      </body>
    </html>
  );
}
