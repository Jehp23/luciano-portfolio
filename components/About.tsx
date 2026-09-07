"use client";

import { useI18n } from "@/components/LocaleProvider";
import { site } from "@/lib/site";

export default function About() {
  const { t } = useI18n();

  return (
    <section className="block about-section" id="about" aria-labelledby="about-title">
      <h2 className="section-h" id="about-title">
        {t.about.title} <span className="badge">{t.about.badge}</span>
      </h2>

      <div className="about-layout">
        <div className="about-editorial">
          <div className="about-statement">
            <span className="about-identity">{t.about.identity}</span>
            <p>{t.about.p1}</p>
            <span className="about-signature">{site.name} · {site.location}</span>
          </div>
          <div className="about-detail">
            <p>{t.about.p2}</p>
            <p>{t.about.p3}</p>
          </div>
        </div>

        <div className="about-cards-grid">
          {t.about.cards.map(({ label, items }) => (
            <div key={label} className="about-card">
              <div className="ac-label">{label}</div>
              <ul>
                {items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
