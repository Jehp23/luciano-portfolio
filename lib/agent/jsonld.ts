import { site, siteSameAs } from "@/lib/site";

const personId = `${site.url}/#person`;
const orgId = `${site.url}/#organization`;

export function buildJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: site.name,
        legalName: site.legalName,
        url: site.url,
        email: site.email,
        jobTitle: site.jobTitle,
        description:
          "Full Stack Developer. React, TypeScript, NestJS, GraphQL. Fintech product at Poncho Capital. Salta, Argentina. Open to full-remote roles.",
        image: `${site.url}/opengraph-image`,
        sameAs: [...siteSameAs],
        worksFor: { "@id": orgId },
        address: {
          "@type": "PostalAddress",
          addressLocality: site.address.locality,
          addressRegion: site.address.region,
          addressCountry: site.address.country,
        },
        nationality: "AR",
      },
      {
        "@type": "Organization",
        "@id": orgId,
        name: site.name,
        legalName: site.legalName,
        url: site.url,
        email: site.email,
        description:
          "Professional practice of Luciano Lazarte, Full Stack Developer building fintech products. Personal site hosted on Vercel.",
        sameAs: [...siteSameAs],
        founder: { "@id": personId },
        address: {
          "@type": "PostalAddress",
          addressLocality: site.address.locality,
          addressRegion: site.address.region,
          addressCountry: site.address.country,
        },
        contactPoint: {
          "@type": "ContactPoint",
          email: site.email,
          contactType: "professional",
          availableLanguage: ["Spanish", "English"],
          url: `${site.url}/contact`,
        },
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        name: "Luciano Lazarte",
        url: site.url,
        inLanguage: ["es", "en"],
        publisher: { "@id": orgId },
        about: { "@id": personId },
      },
    ],
  };
}
