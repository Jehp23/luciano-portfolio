import type { Metadata } from "next";
import SiteChrome from "@/components/SiteChrome";
import About from "@/components/About";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Luciano Lazarte",
  description:
    "About Luciano Tadeo Lazarte, Full Stack Developer in Salta, Argentina. Fintech product at Poncho Capital. React, TypeScript, NestJS, GraphQL.",
  alternates: { canonical: "/about", types: { "text/markdown": "/about.md" } },
  openGraph: {
    title: "About Luciano Lazarte",
    description: "Full Stack Developer, Product. Poncho Capital. Salta, Argentina.",
    type: "profile",
    url: `${site.url}/about`,
  },
};

export default function AboutPage() {
  return (
    <SiteChrome>
      <main className="site-main legal-page">
        <About />
        <section className="block legal-extra" aria-labelledby="about-nap">
          <h2 className="section-h" id="about-nap">
            NAP <span className="badge">{"// IDENTITY"}</span>
          </h2>
          <div className="legal-prose">
            <p>
              {site.legalName} ({site.name}) · {site.jobTitle} · {site.location}.
              Employer: {site.company}. Canonical site: {site.url}. Email: {site.email}.
              GitHub: {site.github}. LinkedIn: {site.linkedin}.
            </p>
            <p>
              This /about page exists so people and agents can verify who Luciano Lazarte
              is without relying only on the homepage scroll. Same facts as the profile
              section: Computer Engineering at UCASAL, previously freelance data analysis,
              currently shipping retail investing product at Poncho Capital, open to
              full-remote Full Stack / Product roles.
            </p>
          </div>
        </section>
      </main>
    </SiteChrome>
  );
}
