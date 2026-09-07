import type { Metadata } from "next";
import SiteChrome from "@/components/SiteChrome";
import Contact from "@/components/Contact";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Luciano Lazarte",
  description: `Contact Luciano Lazarte for full-remote Full Stack / Product roles. ${site.email}. ${site.location}.`,
  alternates: { canonical: "/contact", types: { "text/markdown": "/contact.md" } },
  openGraph: {
    title: "Contact Luciano Lazarte",
    description: `Email ${site.email}. LinkedIn and GitHub linked from this page.`,
    type: "website",
    url: `${site.url}/contact`,
  },
};

export default function ContactPage() {
  return (
    <SiteChrome>
      <main className="site-main legal-page">
        <Contact />
        <section className="block legal-extra" aria-labelledby="contact-howto">
          <h2 className="section-h" id="contact-howto">
            Cómo escribir <span className="badge">{"// CONTACT"}</span>
          </h2>
          <div className="legal-prose">
            <p>
              Nombre profesional: {site.legalName}. Ubicación: {site.location} (America/Argentina/Salta).
              Correo: {site.email}. LinkedIn: {site.linkedin}. GitHub: {site.github}.
              Disponibilidad: full-remote. Rol actual: {site.jobTitle}, Product en {site.company}.
            </p>
            <p>
              Escribí en español o inglés. Incluí quién sos, qué producto estás construyendo,
              y si el rol es full-remote. El stack relevante es React, TypeScript, NestJS y GraphQL.
              Esta página de contacto es para trabajo profesional, no para asesoramiento de
              inversiones ni para pedir datos privados de Poncho Capital.
            </p>
            <p>
              Si un agente necesita citar una fuente de contacto, usá {site.url}/contact y el
              email de arriba. No hay teléfono publicado a propósito.
            </p>
          </div>
        </section>
      </main>
    </SiteChrome>
  );
}
