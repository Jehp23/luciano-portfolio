"use client";

import { useI18n } from "@/components/LocaleProvider";

export default function Stats() {
  const { t } = useI18n();

  return (
    <section className="block proof-rail-section" id="stats" aria-labelledby="stats-title">
      <h2 className="section-h" id="stats-title">
        {t.stats.title} <span className="badge">{t.stats.badge}</span>
      </h2>
      <div className="kpi-grid">
        {t.stats.items.map(({ value, label, sub, detail }, i) => (
          <article key={i} className="kpi">
            <div className="num">{value}</div>
            <div className="lbl">{label}</div>
            <div className="sub">{sub}</div>
            <div className="kpi-detail">{detail}</div>
          </article>
        ))}
      </div>
    </section>
  );
}
