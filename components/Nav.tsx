"use client";

import LangSwitch from "@/components/LangSwitch";
import { useI18n } from "@/components/LocaleProvider";

export default function Nav() {
  const { t } = useI18n();
  const links = [
    { href: "#projects", label: t.nav.work },
    { href: "#optimizer-cta", label: t.nav.lab },
    { href: "#about", label: t.nav.about },
    { href: "#contact", label: t.nav.contact },
  ];

  return (
    <nav className="main-nav" aria-label={t.nav.primary}>
      <div className="main-nav-inner">
        <a className="logo" href="#top" aria-label="Luciano Lazarte — Home">
          <span className="logo-mark" aria-hidden="true">LL</span>
          <span className="logo-name">Luciano Lazarte</span>
        </a>

        <ul className="nav-links">
          {links.map(({ href, label }) => (
            <li key={href}>
              <a href={href}>{label}</a>
            </li>
          ))}
        </ul>
        <div className="nav-end">
          <span className="remote-status">
            <span className="status-dot" aria-hidden="true" />
            {t.nav.remote}
          </span>
          <LangSwitch />
          <details className="nav-menu-mobile">
            <summary>{t.nav.menu}</summary>
            <ul>
              {links.map(({ href, label }) => (
                <li key={href}>
                  <a href={href}>{label}</a>
                </li>
              ))}
            </ul>
          </details>
        </div>
      </div>
    </nav>
  );
}
