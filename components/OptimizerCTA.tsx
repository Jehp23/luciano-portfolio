"use client";

import { useEffect, useState } from "react";
import PortfolioOptimizer from "@/components/PortfolioOptimizer";

export default function OptimizerCTA() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <section className="block" id="optimizer-cta">
        <div className="opt-cta-inner">
          <div className="opt-cta-label">HERRAMIENTA INTERACTIVA</div>
          <h2 className="opt-cta-title">¿Querés optimizar tu cartera?</h2>
          <p className="opt-cta-desc">
            Ingresá tus activos con el peso actual, visualizá tu composición y calculamos
            la distribución óptima usando la teoría de Markowitz con Monte Carlo.
          </p>
          <button className="btn" onClick={() => setOpen(true)}>
            OPTIMIZAR CARTERA →
          </button>
        </div>
      </section>

      {open && (
        <div className="opt-overlay" onClick={() => setOpen(false)}>
          <div className="opt-modal-inner" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
              <button className="opt-modal-close" onClick={() => setOpen(false)}>✕</button>
            </div>
            <PortfolioOptimizer />
          </div>
        </div>
      )}
    </>
  );
}
