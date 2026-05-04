const ITEMS = [
  {
    yr: "2026 · Actual",
    role: "AI Developer · PonchoCapital",
    desc: "Desarrollo de las plataformas web del broker con usuarios reales en producción. Construyo interfaces, integro APIs financieras y dirijo el proceso con IA para mantener velocidad sin sacrificar calidad de código.",
    tags: ["Next.js", "TypeScript", "React", "Prod"],
  },
  {
    yr: "2025 · Actual",
    role: "Proyectos propios · Fintech, AI & Data Science",
    desc: "INK (AI risk analyzer para Avalanche), QuantLab (plataforma de research financiero con backtest y opciones BYMA), Laboratory (inferencia estadística sobre retornos reales) y análisis de riesgo crediticio con AUC 0.942.",
    tags: ["Python", "FastAPI", "Next.js", "LLM", "ML"],
  },
  {
    yr: "2025",
    role: "Curso de Data Analytics",
    desc: "Análisis exploratorio, visualización y narrativa con datos. Datasets reales, dashboards en Power BI y métricas accionables aplicadas a análisis de portfolio y mercado.",
    tags: ["SQL", "Power BI", "Python", "Plotly"],
  },
  {
    yr: "2024",
    role: "Curso de Data Science",
    desc: "Fundamentos de ML, estadística aplicada, manejo de datos y modelado predictivo. Aplicado a series temporales de mercados argentinos — base real para usar IA con criterio.",
    tags: ["Python", "scikit-learn", "Pandas", "ML"],
  },
  {
    yr: "2023 · Actual",
    role: "Ingeniería Informática · UTN / Universidad",
    desc: "Formación universitaria en fundamentos: estructuras de datos, algoritmos, sistemas operativos, arquitectura de software y redes.",
    tags: ["CS", "Algoritmos", "Sistemas", "Arquitectura"],
  },
  {
    yr: "Trayectoria",
    role: "Inversor activo · Merval y Cedears",
    desc: "Opero en mercados locales e internacionales. Las finanzas no son solo números — son comportamiento, riesgo y producto. Esa lente es la que aplico cuando construyo herramientas para traders.",
    tags: ["Merval", "Cedears", "Análisis técnico", "Fundamentals"],
  },
];

export default function Timeline() {
  return (
    <section className="block" id="timeline">
      <div className="section-h">
        EXPERIENCIA & FORMACIÓN <span className="badge">{"// TRAYECTORIA"}</span>
      </div>
      <div className="timeline">
        {ITEMS.map(({ yr, role, desc, tags }) => (
          <div key={yr} className="tl-item reveal">
            <div className="yr">{yr}</div>
            <div className="role">{role}</div>
            <div className="desc">{desc}</div>
            {tags && (
              <div className="tl-tags">
                {tags.map((t) => <span key={t}>{t}</span>)}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
