"use client";

import { useI18n } from "@/components/LocaleProvider";
import type { Locale } from "@/lib/copy";

function FlagAR() {
  return (
    <svg viewBox="0 0 24 16" aria-hidden="true">
      <rect width="24" height="16" fill="#74ACDF" />
      <rect y="5.33" width="24" height="5.34" fill="#fff" />
      <circle cx="12" cy="8" r="2.15" fill="#F6B40E" />
    </svg>
  );
}

function FlagUS() {
  return (
    <svg viewBox="0 0 24 16" aria-hidden="true">
      <rect width="24" height="16" fill="#BF0A30" />
      <rect y="1.23" width="24" height="1.23" fill="#fff" />
      <rect y="3.69" width="24" height="1.23" fill="#fff" />
      <rect y="6.15" width="24" height="1.23" fill="#fff" />
      <rect y="8.62" width="24" height="1.23" fill="#fff" />
      <rect y="11.08" width="24" height="1.23" fill="#fff" />
      <rect y="13.54" width="24" height="1.23" fill="#fff" />
      <rect width="10.2" height="8.6" fill="#002868" />
    </svg>
  );
}

const OPTIONS: { locale: Locale; Flag: typeof FlagAR; code: string }[] = [
  { locale: "es", Flag: FlagAR, code: "ES" },
  { locale: "en", Flag: FlagUS, code: "EN" },
];

export default function LangSwitch() {
  const { locale, setLocale, t } = useI18n();

  return (
    <div className="lang-switch" role="group" aria-label={t.nav.lang}>
      {OPTIONS.map(({ locale: code, Flag, code: label }) => (
        <button
          key={code}
          type="button"
          className="lang-btn"
          aria-pressed={locale === code}
          aria-label={code === "es" ? t.nav.es : t.nav.en}
          onClick={() => setLocale(code)}
        >
          <Flag />
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
}
