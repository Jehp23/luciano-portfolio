const ITEMS = [
  {
    yr: "2026 · Actual",
    role: "AI Developer · PonchoCapital",
    desc: "Desarrollo de las plataformas web del broker. Foco en construir las interfaces y flujos del producto, integrando IA en el proceso de desarrollo para iterar más rápido sin perder calidad de código.",
  },
  {
    yr: "2025",
    role: "Curso de Data Analytics",
    desc: "Análisis exploratorio, visualización y narrativa con datos. Trabajo con datasets reales, dashboards y métricas accionables para decisiones de negocio.",
  },
  {
    yr: "2024",
    role: "Curso de Data Science",
    desc: "Fundamentos de ML, estadística aplicada, manejo de datos y modelado predictivo. Base sólida para aplicar IA con criterio — no como caja negra.",
  },
  {
    yr: "En curso",
    role: "Ingeniería Informática",
    desc: "Formación universitaria en fundamentos: estructuras de datos, algoritmos, sistemas, arquitectura de software. Las bases que separan a un developer de un vibecoder.",
  },
  {
    yr: "Trayectoria",
    role: "Inversor activo · Mercado de capitales",
    desc: "Sigo y opero en mercados desde que descubrí que las finanzas no son solo números — son comportamiento, riesgo y producto. Esa lente es la que aplico cuando construyo herramientas para traders.",
  },
];

export default function Timeline() {
  return (
    <section className="block">
      <div className="section-h">
        EXPERIENCIA & FORMACIÓN <span className="badge">// TRAYECTORIA</span>
      </div>
      <div className="timeline">
        {ITEMS.map(({ yr, role, desc }) => (
          <div key={yr} className="tl-item reveal">
            <div className="yr">{yr}</div>
            <div className="role">{role}</div>
            <div className="desc">{desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
