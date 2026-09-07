import type { Metadata } from "next";
import SiteChrome from "@/components/SiteChrome";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy · Luciano Lazarte",
  description:
    "Privacy policy for lucianolazarte.vercel.app: Vercel Analytics, locale storage, GitHub proxy, and the educational portfolio optimizer.",
  alternates: { canonical: "/privacy", types: { "text/markdown": "/privacy.md" } },
  openGraph: {
    title: "Privacy · Luciano Lazarte",
    type: "website",
    url: `${site.url}/privacy`,
  },
};

export default function PrivacyPage() {
  return (
    <SiteChrome>
      <main className="site-main legal-page">
        <section className="block" aria-labelledby="privacy-title">
          <h1 className="section-h" id="privacy-title">
            Privacidad <span className="badge">{"// PRIVACY"}</span>
          </h1>
          <div className="legal-prose">
            <p>
              Esta política cubre {site.url}, el sitio profesional de {site.legalName},
              alojado en Vercel. No es una app de consumidores y no hay cuentas de usuario.
            </p>
            <h2>Qué se recolecta</h2>
            <p>
              Vercel Analytics registra métricas agregadas de tráfico (páginas, referrers,
              país). El idioma (es/en) se guarda en localStorage del navegador y no sale del
              dispositivo. La sección de actividad pide repos y eventos públicos de GitHub
              ({site.githubUser}) vía /api/github: es actividad pública de Luciano, no datos
              del visitante. Si enviás tickers a /api/portfolio/optimize, esos tickers viajan
              a este sitio y a data912.com para precios públicos argentinos. No uses campos
              de tickers para datos personales. El resultado es educativo, no un consejo de
              inversión.
            </p>
            <h2>Qué no hace este sitio</h2>
            <p>
              No vende información personal. No corre redes de anuncios. No pide pagos ni
              teléfono. El contacto ocurre solo si escribís a {site.email} o por LinkedIn.
              Las peticiones a /mcp, /.well-known/mcp y las variantes Accept: text/markdown
              quedan en los logs HTTP de Vercel; no se setean cookies extra de tracking.
            </p>
            <h2>Retención y opciones</h2>
            <p>
              Analytics sigue la retención de Vercel Analytics. Los mails que envíes viven
              en la bandeja de {site.name} hasta que los borre. Podés bloquear el script de
              Analytics, borrar localStorage para resetear el idioma, o escribir a{" "}
              {site.email} para preguntar por un mensaje que hayas mandado.
            </p>
            <p>
              Operador: {site.legalName} · {site.location} · {site.email} · {site.url}
            </p>
          </div>
        </section>
      </main>
    </SiteChrome>
  );
}
