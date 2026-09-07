import type { Metadata } from "next";
import Link from "next/link";
import SiteChrome from "@/components/SiteChrome";

export const metadata: Metadata = {
  title: { absolute: "404 · Luciano Lazarte" },
  description: "This path does not exist on Luciano Lazarte's site.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <SiteChrome>
      <main className="site-main legal-page">
        <section className="block" aria-labelledby="nf-title">
          <h1 className="section-h" id="nf-title">
            404 <span className="badge">{"// NOT FOUND"}</span>
          </h1>
          <div className="legal-prose">
            <p>This path does not exist. HTTP 404. Next places to look:</p>
            <ul>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/llms.txt">llms.txt</Link>
              </li>
              <li>
                <Link href="/sitemap.xml">Sitemap</Link>
              </li>
              <li>
                <Link href="/developers">Developer resources</Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
              <li>
                <Link href="/privacy">Privacy</Link>
              </li>
            </ul>
          </div>
        </section>
      </main>
    </SiteChrome>
  );
}
