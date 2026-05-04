"use client";

import { useEffect, useRef } from "react";

const KPIS = [
  {
    value: "01",
    label: "ROL ACTUAL",
    sub: "AI Developer · PonchoCapital",
    detail: "Producto financiero en producción con usuarios reales",
  },
  {
    value: "06",
    label: "PROYECTOS PÚBLICOS",
    sub: "GitHub · repos activos",
    detail: "INK, QuantLab, Laboratory, riesgo crediticio y más",
  },
  {
    value: "02",
    label: "ESPECIALIZACIONES",
    sub: "Data Science + Data Analytics",
    detail: "Aplicadas a finanzas y mercados argentinos",
  },
  {
    value: "0.942",
    label: "AUC · MEJOR MODELO",
    sub: "Riesgo crediticio · XGBoost ensemble",
    detail: "Validado con datos reales, no con datasets de Kaggle",
  },
  {
    value: "3",
    label: "STACKS DOMINADOS",
    sub: "Python · TypeScript · SQL",
    detail: "Backend, frontend y análisis en un mismo perfil",
  },
  {
    value: "∞",
    label: "MERCADO DE CAPITALES",
    sub: "Inversor activo · Merval y Cedears",
    detail: "Contexto real de dominio aplicado al software que construyo",
  },
];

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null);
  const observed = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting || observed.current) return;
          observed.current = true;
          section.querySelectorAll<HTMLElement>(".kpi").forEach((el, i) => {
            setTimeout(() => el.classList.add("in"), i * 80);
          });
        });
      },
      { threshold: 0.15 }
    );
    obs.observe(section);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="block" id="stats" ref={sectionRef}>
      <div className="section-h">
        EN NÚMEROS <span className="badge">{"// HECHOS CONCRETOS"}</span>
      </div>
      <div className="kpi-grid">
        {KPIS.map(({ value, label, sub, detail }) => (
          <div key={label} className="kpi">
            <div className="num">{value}</div>
            <div className="lbl">{label}</div>
            <div className="sub">{sub}</div>
            <div className="kpi-detail">{detail}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
