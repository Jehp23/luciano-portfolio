const PROJECTS = [
  {
    rarity: "legendary",
    tag: "FLAGSHIP · PRODUCCIÓN",
    title: "PonchoCapital · Broker Platform",
    desc: "Colaboro activamente en el desarrollo de las plataformas web del broker. Construcción de interfaces, integraciones y flujos críticos de un producto financiero en producción para clientes reales del mercado de capitales argentino.",
    stack: ["Next.js", "TypeScript", "React", "Node.js"],
    stats: [{ s: "ROL", v: "AI DEVELOPER" }, { s: "ESTADO", v: "EN PROD" }],
    links: [{ label: "Sitio", href: "https://ponchocapital.com" }],
  },
  {
    rarity: "epic",
    tag: "AI · BLOCKCHAIN · FINTECH",
    title: "INK · Smart Contract Risk Intelligence",
    desc: "Analizador de riesgo de smart contracts en Avalanche C-Chain. Ingresás una dirección, el sistema puntúa el contrato del 0 al 100 con un motor determinístico propio y genera una explicación en lenguaje natural usando Llama 3.3 70B. Sin wallet, bilingüe, con caché en MongoDB.",
    stack: ["Next.js", "Node.js", "Groq (Llama 3.3 70B)", "Avalanche", "MongoDB"],
    stats: [{ s: "TIPO", v: "LIVE PRODUCT" }, { s: "IA", v: "LLAMA 3.3 70B" }],
    links: [
      { label: "Demo", href: "https://ink-three-iota.vercel.app" },
      { label: "GitHub", href: "https://github.com/Jehp23/ink-risk-intelligence" },
    ],
  },
  {
    rarity: "epic",
    tag: "FINTECH · PLATAFORMA",
    title: "QuantLab · Analyst Platform",
    desc: "Plataforma de research financiero con FastAPI backend y Next.js frontend. Incluye backtesting con rebalanceo vs SPY, optimización de portfolio, simulación Monte Carlo, opciones del mercado argentino (BYMA) con Greeks via data912, y autenticación con workspaces.",
    stack: ["FastAPI", "Python", "Next.js", "TypeScript", "BYMA API"],
    stats: [{ s: "MÓDULOS", v: "8 ROUTERS" }, { s: "MERCADO", v: "ARG + GLOBAL" }],
    links: [
      { label: "Backend", href: "https://github.com/Jehp23/quantlab-back" },
      { label: "Frontend", href: "https://github.com/Jehp23/quantlab-front" },
    ],
  },
  {
    rarity: "rare",
    tag: "ESTADÍSTICA · FINANZAS · WEB APP",
    title: "Laboratory · Inferencia Estadística Financiera",
    desc: "SPA para análisis estadístico de retornos financieros reales. Dado un ticker y período, calcula retornos logarítmicos, ejecuta un t-test (H₀: μ = 0) y determina si la tendencia del activo es estadísticamente significativa o ruido aleatorio. Backend FastAPI + frontend React/jStat.",
    stack: ["FastAPI", "React", "Vite", "jStat", "yfinance"],
    stats: [{ s: "TEST", v: "T-TEST · H₀: μ=0" }, { s: "DATOS", v: "TIEMPO REAL" }],
    links: [
      { label: "GitHub", href: "https://github.com/Jehp23/Inferencia-Estadistica-Aplicada-a-las-Finanzas" },
    ],
  },
  {
    rarity: "rare",
    tag: "DATA SCIENCE · ML",
    title: "Riesgo Crediticio · ML Ensemble",
    desc: "Predicción de incumplimiento de préstamos con flujo completo: EDA → preprocesamiento (SMOTE, PCA) → ensemble de XGBoost, Random Forest, Gradient Boosting y Voting Classifier. AUC final: 0.942. Incluye presentación ejecutiva con hallazgos accionables.",
    stack: ["Python", "XGBoost", "scikit-learn", "SMOTE", "Pandas"],
    stats: [{ s: "AUC", v: "0.942" }, { s: "MODELOS", v: "4 + ENSEMBLE" }],
    links: [
      { label: "GitHub", href: "https://github.com/Jehp23/riesgo-crediticio" },
      { label: "Colab", href: "https://colab.research.google.com/drive/1WIw72Euw3c0BeaBlAUmm82ilSMDb-EGT?usp=sharing" },
    ],
  },
  {
    rarity: "common",
    tag: "DATA ANALYTICS · POWER BI",
    title: "Coffee Quality · Dashboard Analítico",
    desc: "Análisis de calidad del café con datos del Coffee Quality Institute. Dashboard interactivo en Power BI con insights sobre variables sensoriales, origen, defectos y correlaciones con el puntaje total. Incluye informe ejecutivo con recomendaciones para la industria.",
    stack: ["Power BI", "SQL", "Python", "DAX"],
    stats: [{ s: "TOOL", v: "POWER BI" }, { s: "DATASET", v: "CQI REAL" }],
    links: [
      { label: "GitHub", href: "https://github.com/Jehp23/data-analytics-coffee-quality" },
    ],
  },
];

export default function Projects() {
  return (
    <section className="block" id="projects">
      <div className="section-h">
        PROYECTOS & FOCO{" "}
        <span className="badge">{"// QUÉ HAGO Y EN QUÉ TRABAJO"}</span>
      </div>
      <div className="cards">
        {PROJECTS.map(({ rarity, tag, title, desc, stack, stats, links }) => (
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
            {links.length > 0 && (
              <div className="card-links">
                {links.map(({ label, href }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer">{label}</a>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
