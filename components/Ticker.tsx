"use client";

import { useI18n } from "@/components/LocaleProvider";

export default function Ticker() {
  const { t } = useI18n();

  return (
    <aside className="ticker" aria-label={t.ticker.label}>
      <div className="ticker-label">{t.ticker.label}</div>
      <div className="ticker-viewport">
        <div className="ticker-track">
          {t.ticker.items.map(({ label, value }) => (
            <span className="ticker-item" key={label}>
              <span className="sym">{label}</span>
              <span>{value}</span>
            </span>
          ))}
        </div>
      </div>
    </aside>
  );
}
