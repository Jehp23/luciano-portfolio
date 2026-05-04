import CRT from "@/components/CRT";
import Ticker from "@/components/Ticker";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Stats from "@/components/Stats";
import GitHubActivity from "@/components/GitHubActivity";
import OptimizerCTA from "@/components/OptimizerCTA";
import Projects from "@/components/Projects";
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
        <GitHubActivity />
        <Projects />
        <Timeline />
        <Contact />
        <OptimizerCTA />
      </main>
      <Footer />
      <KonamiEgg />
      <RevealObserver />
    </>
  );
}
