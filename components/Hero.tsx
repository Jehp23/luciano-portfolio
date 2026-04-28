"use client";

import { useEffect, useRef } from "react";

const PHRASES = [
  "Builder enfocado en fintech, sistemas e IA aplicada.",
  "Diseño productos reales con mentalidad de negocio.",
  "Automatización, herramientas financieras y ejecución con criterio.",
];

const META = [
  { label: "ROL", val: "Fintech Builder" },
  { label: "FOCO", val: "Producto · Sistemas · IA" },
  { label: "DOMINIO", val: "Fintech · Herramientas Financieras" },
  { label: "STACK", val: "Python · TypeScript · Automatización" },
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
        <div className="hero-tag">SALTA · ARGENTINA  //  AVAILABLE FOR NEW OPPORTUNITIES</div>
        <h1 className="hero-name glitch" data-text="FINTECH BUILDER">
          FINTECH BUILDER
        </h1>
        <p className="hero-lead">
          Diseño y construyo sistemas y productos con foco en fintech, automatización e IA aplicada.
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
