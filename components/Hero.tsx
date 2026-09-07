"use client";

import Image from "next/image";
import { useI18n } from "@/components/LocaleProvider";

export default function Hero() {
  const { t } = useI18n();

  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="grid-bg" aria-hidden="true" />
      <div className="hero-inner">
        <div className="hero-copy">
          <p className="hero-tag">{t.hero.tag}</p>
          <p className="hero-identity">{t.hero.identity}</p>
          <h1 className="hero-name" id="hero-title">
            {t.hero.title}
          </h1>
          <p className="hero-lead">{t.hero.lead}</p>
          <div className="hero-cta">
            <a className="btn" href="#projects">
              {t.hero.ctaWork}
            </a>
            <a className="text-link" href="#contact">
              {t.hero.ctaContact} <span aria-hidden="true">↗</span>
            </a>
          </div>
          <dl className="hero-meta">
            {t.hero.meta.map(({ label, val }) => (
              <div key={label} className="cell">
                <dt className="label">{label}</dt>
                <dd className="val">{val}</dd>
              </div>
            ))}
          </dl>
        </div>

        <aside className="hero-console" aria-label={t.hero.consoleLabel}>
          <div className="console-head">
            <span>{t.hero.consoleLabel}</span>
            <span className="console-status">{t.hero.consoleStatus}</span>
          </div>
          <div className="hero-portrait">
            <Image
              src="/foto.png"
              alt={t.about.photoAlt}
              fill
              priority
              sizes="(max-width: 840px) 92vw, 38vw"
            />
            <div className="portrait-caption">
              <span>Luciano Lazarte</span>
              <span>{t.hero.portraitRole}</span>
            </div>
          </div>
          <div className="proof-list">
            {t.hero.proof.map(({ value, label }, index) => (
              <div className="proof-item" key={label}>
                <span className="proof-index">0{index + 1}</span>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
          <div className="interface-preview">
            <div className="preview-copy">
              <span>{t.hero.model.label}</span>
              <small>{t.hero.model.note}</small>
            </div>
            <svg viewBox="0 0 210 52" role="img" aria-label={t.hero.model.alt}>
              <path className="preview-grid" d="M0 13H210M0 26H210M0 39H210M42 0V52M84 0V52M126 0V52M168 0V52" />
              <path className="preview-line" d="M2 42C22 43 27 29 45 33C67 38 74 18 93 23C112 28 119 14 139 17C158 20 171 7 208 9" />
              <circle className="preview-node" cx="208" cy="9" r="3" />
            </svg>
          </div>
        </aside>
      </div>
    </section>
  );
}
