"use client";

import { useEffect, useRef } from "react";

const PHRASES = [
  "Desarrollo software con foco en fintech e IA aplicada.",
  "Trabajo en el mercado de capitales desde adentro.",
  "Python, TypeScript y criterio técnico sobre cada decisión.",
];

const META = [
  { label: "ROL", val: "Desarrollador · Fintech & IA" },
  { label: "FOCO", val: "Fintech · Data Science · IA" },
  { label: "STACK", val: "Python · TypeScript · FastAPI" },
  { label: "UBICACIÓN", val: "Salta, Argentina" },
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
      <div className="hero-inner">
        <div className="hero-tag">SALTA · ARGENTINA  //  DISPONIBLE PARA NUEVAS OPORTUNIDADES</div>
        <h1 className="hero-name glitch" data-text="LUCIANO LAZARTE">
          LUCIANO LAZARTE
        </h1>
        <p className="hero-lead">
          Desarrollador con foco en fintech e inteligencia artificial aplicada. Trabajo en el mercado de capitales desde adentro.
        </p>
        <div className="hero-sub">
          &gt; <span ref={typedRef} />
          <span className="cursor" />
        </div>
        <div className="hero-cta">
          <a className="btn" href="#projects">VER PROYECTOS</a>
          <a className="btn alt" href="#contact">CONTACTARME</a>
        </div>
        <div className="hero-meta">
          {META.map(({ label, val }) => (
            <div key={label} className="cell">
              <span className="label">{label}</span>
              <span className="val">{val}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
