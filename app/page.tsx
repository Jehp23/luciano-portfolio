import CRT from "@/components/CRT";
import Ticker from "@/components/Ticker";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Stats from "@/components/Stats";
import Projects from "@/components/Projects";
import Achievements from "@/components/Achievements";
import Timeline from "@/components/Timeline";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import KonamiEgg from "@/components/KonamiEgg";
import RevealObserver from "@/components/RevealObserver";

export default function Home() {
  return (
    <>
      <CRT />
      <Ticker />
      <Nav />
      <main className="site-main">
        <Hero />
        <About />
        <Stats />
        <Projects />
        <Achievements />
        <Timeline />
        <Contact />
      </main>
      <Footer />
      <KonamiEgg />
      <RevealObserver />
    </>
  );
}
