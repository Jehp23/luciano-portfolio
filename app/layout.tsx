import type { Metadata } from "next";
import { JetBrains_Mono, VT323 } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
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
  title: "Luciano Lazarte · Desarrollador Fintech & IA",
  description:
    "Portfolio de Luciano Lazarte — desarrollador con foco en fintech e inteligencia artificial aplicada. AI Developer en PonchoCapital. Salta, Argentina.",
  openGraph: {
    title: "Luciano Lazarte · Desarrollador Fintech & IA",
    description: "Desarrollador con foco en fintech e IA aplicada. AI Developer en PonchoCapital. Salta, Argentina.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${jetbrainsMono.variable} ${vt323.variable}`}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
