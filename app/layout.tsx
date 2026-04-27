import type { Metadata } from "next";
import { JetBrains_Mono, VT323 } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const vt323 = VT323({
  variable: "--font-vt323",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Luciano Lazarte · Quant Developer / Data Engineer",
  description:
    "Portfolio de Luciano Lazarte — Quant Developer, Data Engineer y Product Builder especializado en fintech y mercados financieros.",
  openGraph: {
    title: "Luciano Lazarte · Quant Developer",
    description: "Finanzas + datos + producto. Basado en Salta, Argentina.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${jetbrainsMono.variable} ${vt323.variable}`}>
      <body>{children}</body>
    </html>
  );
}
