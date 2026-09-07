import CRT from "@/components/CRT";
import Ticker from "@/components/Ticker";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import KonamiEgg from "@/components/KonamiEgg";
import RevealObserver from "@/components/RevealObserver";
import { LocaleProvider } from "@/components/LocaleProvider";

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <LocaleProvider>
      <CRT />
      <Ticker />
      <Nav />
      {children}
      <Footer />
      <KonamiEgg />
      <RevealObserver />
    </LocaleProvider>
  );
}
