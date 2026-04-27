const PROJECTS = [
  {
    rarity: "legendary",
    tag: "FLAGSHIP · ACTUAL",
    title: "PonchoCapital · Broker Platform",
    desc: "Colaboro activamente en el desarrollo de las plataformas web del broker. Construcción de interfaces, integraciones y flujos críticos de un producto financiero en producción para clientes reales del mercado de capitales.",
    stack: ["Next.js", "TypeScript", "React", "Node.js"],
    stats: [{ s: "ROL", v: "AI DEVELOPER" }, { s: "ESTADO", v: "EN PROD" }],
  },
  {
    rarity: "epic",
    tag: "AI DEVELOPMENT",
    title: "AI-Augmented Workflow",
    desc: "Metodología propia de desarrollo asistido por IA: dirección de modelos con prompts técnicos precisos, revisión crítica del output y arquitectura definida por mí. AI Developer, no vibecoder — la IA ejecuta, yo decido.",
    stack: ["Claude", "GPT", "Cursor", "Prompt Engineering"],
    stats: [{ s: "ENFOQUE", v: "CRITERIO" }, { s: "FILOSOFÍA", v: "DIRIGIR > GENERAR" }],
  },
  {
    rarity: "rare",
    tag: "DATA SCIENCE",
    title: "Proyectos de Data Science",
    desc: "Trabajos prácticos del curso de Data Science: análisis exploratorio, modelos predictivos y procesamiento de datasets reales. Foco en entender qué hace cada modelo y por qué — no solo en correrlo.",
    stack: ["Python", "Pandas", "scikit-learn", "Jupyter"],
    stats: [{ s: "ÁREA", v: "ML · STATS" }, { s: "TIPO", v: "ACADÉMICO" }],
  },
  {
    rarity: "rare",
    tag: "DATA ANALYTICS",
    title: "Proyectos de Data Analytics",
    desc: "Análisis de datos orientados al negocio: dashboards, KPIs y visualizaciones que cuentan una historia. Aplicación directa de lo aprendido al análisis del mercado y mis decisiones de inversión.",
    stack: ["SQL", "Power BI", "Excel", "Python"],
    stats: [{ s: "ENFOQUE", v: "DECISIONES" }, { s: "OUTPUT", v: "DASHBOARDS" }],
  },
  {
    rarity: "common",
    tag: "INTERESES",
    title: "Mercado de Capitales · Práctica Personal",
    desc: "Inversor activo. Sigo el mercado, analizo activos y opero. Esa práctica me da algo que la mayoría de los developers no tiene: entender desde adentro al usuario para el que construyo software financiero.",
    stack: ["Análisis técnico", "Fundamentals", "Macro"],
    stats: [{ s: "TIPO", v: "INVERSOR" }, { s: "DESDE", v: "PRÁCTICA" }],
  },
  {
    rarity: "common",
    tag: "FORMACIÓN",
    title: "Ingeniería Informática · En curso",
    desc: "Estructuras de datos, algoritmos, arquitectura de software, sistemas. Los fundamentos que separan a un ingeniero de un tutorial de YouTube. Sin esto, la IA es una herramienta peligrosa.",
    stack: ["CS Fundamentals", "Algoritmos", "Arquitectura"],
    stats: [{ s: "ESTADO", v: "EN CURSO" }, { s: "FOCO", v: "FUNDAMENTOS" }],
  },
];

export default function Projects() {
  return (
    <section className="block" id="projects">
      <div className="section-h">
        PROYECTOS & FOCO{" "}
        <span className="badge">// QUÉ HAGO Y EN QUÉ TRABAJO</span>
      </div>
      <div className="cards">
        {PROJECTS.map(({ rarity, tag, title, desc, stack, stats }) => (
          <div key={title} className={`card ${rarity} reveal`}>
            <span className="rarity">{tag}</span>
            <h3>{title}</h3>
            <p>{desc}</p>
            <div className="stack">
              {stack.map((s) => <span key={s}>{s}</span>)}
            </div>
            <div className="stats-row">
              {stats.map(({ s, v }) => (
                <span key={s}><span className="s">{s}</span> <span className="v">{v}</span></span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
