import type { Metadata } from "next";
import { JetBrains_Mono, Manrope, VT323 } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
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

export const metadata: Metadata = {
  title: "Luciano Lazarte · Full Stack Developer",
  description:
    "Full Stack Developer. React, TypeScript, NestJS, GraphQL. Producto fintech. Salta, Argentina. Abierto a roles full-remote.",
  openGraph: {
    title: "Luciano Lazarte · Full Stack Developer",
    description:
      "Full Stack Developer. React, TypeScript, NestJS, GraphQL. Producto fintech. Salta, Argentina. Abierto a roles full-remote.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      className={`${manrope.variable} ${jetbrainsMono.variable} ${vt323.variable}`}
    >
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
