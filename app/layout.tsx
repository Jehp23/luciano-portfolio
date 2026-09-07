import type { Metadata } from "next";
import { JetBrains_Mono, Manrope, VT323 } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import JsonLd from "@/components/JsonLd";
import { site } from "@/lib/site";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const vt323 = VT323({
  variable: "--font-vt323",
  subsets: ["latin"],
  weight: "400",
});

const description =
  "Full Stack Developer. React, TypeScript, NestJS, GraphQL. Producto fintech. Salta, Argentina. Abierto a roles full-remote.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Luciano Lazarte · Full Stack Developer",
    template: "%s · Luciano Lazarte",
  },
  description,
  authors: [{ name: site.legalName, url: site.url }],
  creator: site.legalName,
  keywords: [
    "Luciano Lazarte",
    "Luciano Tadeo Lazarte",
    "Full Stack Developer",
    "fintech",
    "Poncho Capital",
    "Salta",
    "Vercel",
  ],
  alternates: {
    canonical: "/",
    types: {
      "text/markdown": "/index.md",
    },
  },
  openGraph: {
    title: "Luciano Lazarte · Full Stack Developer",
    description,
    type: "website",
    url: site.url,
    siteName: "Luciano Lazarte",
    locale: "es_AR",
    alternateLocale: ["en_US"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Luciano Lazarte · Full Stack Developer",
    description,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      className={`${manrope.variable} ${jetbrainsMono.variable} ${vt323.variable}`}
    >
      <body>
        <JsonLd />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
