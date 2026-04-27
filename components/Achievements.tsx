const ITEMS = [
  { medal: "01", variant: "", title: "AI Developer en producción", desc: "Construyendo PonchoCapital · plataforma viva con usuarios reales" },
  { medal: "02", variant: "g", title: "Curso de Data Science completo", desc: "ML, estadística aplicada y modelado predictivo" },
  { medal: "03", variant: "c", title: "Curso de Data Analytics completo", desc: "Análisis, visualización y narrativa con datos reales" },
  { medal: "04", variant: "m", title: "Ingeniería Informática · en curso", desc: "Fundamentos de CS, algoritmos y arquitectura" },
  { medal: "05", variant: "", title: "Inversor activo en mercado de capitales", desc: "Práctica real que informa cada decisión de producto" },
  { medal: "06", variant: "g", title: "AI Developer · no vibecoder", desc: "Dirijo a la IA con criterio técnico, no la sigo a ciegas" },
];

export default function Achievements() {
  return (
    <section className="block" id="achievements">
      <div className="section-h">
        DIFERENCIALES <span className="badge">{"// LO QUE ME DEFINE"}</span>
      </div>
      <div className="achievements">
        {ITEMS.map(({ medal, variant, title, desc }) => (
          <div key={medal} className="ach reveal">
            <div className={`medal ${variant}`}>{medal}</div>
            <div className="info">
              <div className="t">{title}</div>
              <div className="d">{desc}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
