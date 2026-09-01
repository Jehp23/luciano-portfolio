import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Work from "@/components/Work";
import Experience from "@/components/Experience";
import Profile from "@/components/Profile";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import RevealObserver from "@/components/RevealObserver";

export default function Home() {
  return (
    <div className="site">
      <div className="page-glow" aria-hidden="true" />
      <div className="page-grid" aria-hidden="true" />
      <a className="skip-link" href="#work">
        Skip to selected work
      </a>
      <Nav />
      <main>
        <Hero />
        <Work />
        <Experience />
        <Profile />
        <Contact />
      </main>
      <Footer />
      <RevealObserver />
    </div>
  );
}
