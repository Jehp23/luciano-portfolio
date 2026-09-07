import type { Metadata } from "next";
import SiteChrome from "@/components/SiteChrome";
import { site } from "@/lib/site";
import { absUrl } from "@/lib/agent/routes";

export const metadata: Metadata = {
  title: "Luciano Lazarte developer resources",
  description:
    "Developer portal for Luciano Lazarte on Vercel: OpenAPI spec, MCP server, GitHub activity API, and portfolio optimizer.",
  alternates: { canonical: "/developers", types: { "text/markdown": "/developers.md" } },
  openGraph: {
    title: "Luciano Lazarte developer resources",
    description: "OpenAPI, MCP, and public APIs on lucianolazarte.vercel.app.",
    type: "website",
    url: `${site.url}/developers`,
  },
};

const resources = [
  { name: "OpenAPI spec", href: "/openapi.json", note: "GitHub activity + optimizer" },
  { name: "MCP Streamable HTTP", href: "/mcp", note: "JSON-RPC tools" },
  { name: "MCP live handshake", href: "/.well-known/mcp", note: "SEP-1960 + initialize POST" },
  { name: "MCP server card", href: "/.well-known/mcp/server-card.json", note: "SEP-1649" },
  { name: "GitHub activity API", href: "/api/github", note: "GET, public, no auth" },
  { name: "Portfolio optimizer API", href: "/api/portfolio/optimize", note: "POST tickers" },
  { name: "llms.txt", href: "/llms.txt", note: "When to use this site" },
  { name: "Sitemap", href: "/sitemap.xml", note: "Indexable URLs" },
];

export default function DevelopersPage() {
  return (
    <SiteChrome>
      <main className="site-main legal-page">
        <section className="block" aria-labelledby="dev-title">
          <h1 className="section-h" id="dev-title">
            Luciano Lazarte developer resources
            <span className="badge">{"// VERCEL APIS"}</span>
          </h1>
          <div className="legal-prose">
            <p>
              Portal de desarrolladores de <strong>Luciano Lazarte</strong> en{" "}
              <strong>Vercel</strong> ({site.url}). Usalo cuando un agente o un ingeniero
              necesita acceso machine-readable al portfolio: OpenAPI, MCP, actividad de
              GitHub y el optimizer educativo de Markowitz.
            </p>
            <h2>When to use</h2>
            <p>
              Pedí perfil, proyectos públicos y contacto de Luciano Lazarte. Llamá al proxy
              de GitHub en vez de scrapear el HTML. Corré el optimizer con tickers BYMA /
              CEDEAR / bonos. Conectá Claude, ChatGPT u otros clientes MCP por Streamable
              HTTP. No hay API keys ni OAuth: no envíes secretos.
            </p>
            <ul className="dev-links">
              {resources.map((r) => (
                <li key={r.href}>
                  <a href={r.href}>{r.name}</a>
                  <span> {r.note}</span>
                  <code> {absUrl(r.href)}</code>
                </li>
              ))}
            </ul>
            <h2>Auth</h2>
            <p>
              Recursos públicos. GET /api/github no requiere autenticación. POST
              /api/portfolio/optimize acepta JSON con 2–10 tickers. El handshake MCP es
              POST initialize a /mcp o /.well-known/mcp con Accept:
              application/json, text/event-stream.
            </p>
          </div>
        </section>
      </main>
    </SiteChrome>
  );
}
