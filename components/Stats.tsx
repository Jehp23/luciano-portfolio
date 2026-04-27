"use client";

import { useEffect, useRef } from "react";

const KPIS = [
  { icon: "◆ ROL", count: null, label: "AI DEVELOPER", sub: "PonchoCapital · Broker", prefix: "", suffix: "", staticVal: "ACTIVO" },
  { icon: "▣ FORMACIÓN", count: null, label: "INGENIERÍA INFORMÁTICA", sub: "fundamentos sólidos en curso", prefix: "", suffix: "", staticVal: "EN CURSO" },
  { icon: "↗ CURSOS", count: null, label: "ESPECIALIZACIONES", sub: "Data Science + Data Analytics", prefix: "", suffix: "", staticVal: "02" },
  { icon: "$ DOMINIO", count: null, label: "MERCADO DE CAPITALES", sub: "inversor activo", prefix: "", suffix: "", staticVal: "PRÁCTICA REAL" },
  { icon: "{ } AI", count: null, label: "DESARROLLO ASISTIDO POR IA", sub: "criterio técnico, no caja negra", prefix: "", suffix: "", staticVal: "DEVELOPER" },
  { icon: "★ FOCO", count: null, label: "FINTECH · MERCADOS", sub: "intersección IA + finanzas", prefix: "", suffix: "", staticVal: "100%" },
];

const SKILLS = [
  { name: "TypeScript · React · Next.js", lvl: 85 },
  { name: "Python · Pandas · NumPy", lvl: 82 },
  { name: "Desarrollo asistido por IA", lvl: 90 },
  { name: "SQL · Análisis de datos", lvl: 80 },
  { name: "Data Science · ML básico", lvl: 72 },
  { name: "Data Analytics · Visualización", lvl: 78 },
  { name: "Mercado de capitales · Inversión", lvl: 85 },
  { name: "Fundamentos de CS · Algoritmos", lvl: 75 },
];

function animateCount(el: HTMLElement, target: number, dur = 1400) {
  const start = performance.now();
  function step(t: number) {
    const p = Math.min(1, (t - start) / dur);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.floor(target * eased).toLocaleString();
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

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

          section.querySelectorAll<HTMLElement>(".reveal").forEach((el) => {
            el.classList.add("in");
            el.querySelectorAll<HTMLElement>("[data-count]").forEach((counter) => {
              animateCount(counter, Number(counter.dataset.count));
            });
          });

          section.querySelectorAll<HTMLElement>("[data-fill]").forEach((bar) => {
            requestAnimationFrame(() => { bar.style.width = bar.dataset.fill + "%"; });
          });
        });
      },
      { threshold: 0.1 }
    );
    obs.observe(section);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="block" id="stats" ref={sectionRef}>
      <div className="section-h">
        CAPACIDADES <span className="badge">// MÉTRICAS · STACK</span>
      </div>

      <div className="kpi-grid">
        {KPIS.map(({ icon, count, label, sub, prefix, suffix, staticVal }) => (
          <div key={label} className="kpi reveal">
            <div className="icon">{icon}</div>
            <div className="num">
              {prefix}
              {staticVal ?? (
                <span data-count={count ?? 0}>0</span>
              )}
              {suffix}
            </div>
            <div className="lbl">{label}</div>
            <div className="sub">{sub}</div>
          </div>
        ))}
      </div>

      <div className="skills reveal">
        {SKILLS.map(({ name, lvl }) => (
          <div key={name} className="skill">
            <div className="skill-h">
              <span className="name">{name}</span>
              <span className="lvl">{lvl}</span>
            </div>
            <div className="skill-bar">
              <div className="bar-fill" data-fill={lvl} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
