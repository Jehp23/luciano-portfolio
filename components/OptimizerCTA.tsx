"use client";

import { useEffect, useState } from "react";
import PortfolioOptimizer from "@/components/PortfolioOptimizer";
import { useI18n } from "@/components/LocaleProvider";

export default function OptimizerCTA() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <section className="block lab-section" id="optimizer-cta" aria-labelledby="lab-title">
        <div className="opt-cta-inner">
          <div className="opt-cta-copy">
            <div className="opt-cta-label">{t.optimizerCta.label}</div>
            <h2 className="opt-cta-title" id="lab-title">{t.optimizerCta.title}</h2>
            <p className="opt-cta-desc">{t.optimizerCta.desc}</p>
            <ul className="lab-points">
              {t.optimizerCta.points.map((point) => <li key={point}>{point}</li>)}
            </ul>
            <button
              className="btn"
              type="button"
              aria-haspopup="dialog"
              onClick={() => setOpen(true)}
            >
              {t.optimizerCta.button}
            </button>
          </div>

          <div className="lab-preview" aria-label={t.optimizerCta.previewAlt}>
            <div className="lab-preview-head">
              <span>{t.optimizerCta.previewLabel}</span>
              <span>{t.optimizerCta.previewMode}</span>
            </div>
            <div className="lab-chart" aria-hidden="true">
              <svg viewBox="0 0 520 260" preserveAspectRatio="none">
                <path className="lab-chart-grid" d="M0 52H520M0 104H520M0 156H520M0 208H520M104 0V260M208 0V260M312 0V260M416 0V260" />
                <path className="lab-chart-area" d="M8 234C82 216 95 181 152 184C225 189 241 122 303 129C366 136 394 79 512 34V260H8Z" />
                <path className="lab-chart-line" d="M8 234C82 216 95 181 152 184C225 189 241 122 303 129C366 136 394 79 512 34" />
                <circle className="lab-chart-point lab-chart-point--one" cx="152" cy="184" r="7" />
                <circle className="lab-chart-point lab-chart-point--two" cx="303" cy="129" r="7" />
                <circle className="lab-chart-point lab-chart-point--three" cx="512" cy="34" r="8" />
              </svg>
              <span className="axis axis-y">RETURN</span>
              <span className="axis axis-x">RISK →</span>
            </div>
            <div className="lab-preview-foot">
              {t.optimizerCta.previewStats.map(({ label, value }) => (
                <div key={label}>
                  <span>{label}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {open && (
        <div className="opt-overlay" onClick={() => setOpen(false)}>
          <div
            className="opt-modal-inner"
            role="dialog"
            aria-modal="true"
            aria-label={t.opt.title}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
              <button
                className="opt-modal-close"
                type="button"
                aria-label={t.optimizerCta.close}
                onClick={() => setOpen(false)}
              >
                ✕
              </button>
            </div>
            <PortfolioOptimizer />
          </div>
        </div>
      )}
    </>
  );
}
