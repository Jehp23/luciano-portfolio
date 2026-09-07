"use client";

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
      </div>
    </footer>
  );
}
