"use client";

import Link from "next/link";
import { useI18n } from "@/components/LocaleProvider";
import { site } from "@/lib/site";

export default function Footer() {
  const { t } = useI18n();

  return (
    <footer>
      <div className="footer-inner">
        <span>
          © 2026 {site.name} · {site.location}
        </span>
        <span>
          {site.legalName} · {t.footer.updated} {site.updated}
        </span>
        <nav className="footer-links" aria-label="About, contact, privacy">
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/developers">Developers</Link>
          <a href="/llms.txt">llms.txt</a>
        </nav>
      </div>
    </footer>
  );
}
