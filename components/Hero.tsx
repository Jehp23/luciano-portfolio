"use client";

import { useEffect, useRef } from "react";

const PHRASES = [
  "AI Developer · Data Analyst · Estudiante de Ing. Informática",
  "Construyendo el broker de PonchoCapital desde adentro.",
  "Apasionado por los mercados de capitales y el desarrollo con IA.",
];

const META = [
  { label: "ROL", val: "AI Developer" },
  { label: "FORMACIÓN", val: "Ing. Informática" },
  { label: "FOCO", val: "Fintech · Mercado de Capitales" },
  { label: "STACK", val: "Python · TypeScript · IA" },
  { label: "DISPONIBILIDAD", val: "Abierto a oportunidades" },
];

export default function Hero() {
  const typedRef = useRef<HTMLSpanElement>(null);
  const stateRef = useRef({ pi: 0, ci: 0, deleting: false });

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    function typeLoop() {
      const s = stateRef.current;
      const cur = PHRASES[s.pi];
      const el = typedRef.current;
      if (!el) return;

      if (!s.deleting) {
        el.textContent = cur.slice(0, ++s.ci);
        if (s.ci === cur.length) {
          s.deleting = true;
          timeoutId = setTimeout(typeLoop, 1700);
          return;
        }
      } else {
        el.textContent = cur.slice(0, --s.ci);
        if (s.ci === 0) {
          s.deleting = false;
          s.pi = (s.pi + 1) % PHRASES.length;
        }
      }
      timeoutId = setTimeout(typeLoop, s.deleting ? 28 : 55);
    }

    typeLoop();
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <section className="hero">
      <div className="grid-bg" />
      <div className="hero-tag">SALTA · ARGENTINA  //  AVAILABLE FOR NEW OPPORTUNITIES</div>
      <h1 className="hero-name glitch" data-text="LUCIANO LAZARTE">LUCIANO LAZARTE</h1>
      <div className="hero-sub">
        &gt; <span ref={typedRef} />
        <span className="cursor" />
      </div>
      <div className="hero-cta">
        <a className="btn" href="#projects">VER PROYECTOS</a>
        <a className="btn alt" href="#contact">CONTACTO</a>
      </div>
      <div className="hero-meta">
        {META.map(({ label, val }) => (
          <div key={label} className="cell">
            <span className="label">{label}</span>
            <span className="val">{val}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
