const ITEMS = [
  { medal: "01", variant: "", title: "Producto vivo en el mercado de capitales", desc: "Código mío corriendo en PonchoCapital con usuarios reales — no un side project, una plataforma de broker activa" },
  { medal: "02", variant: "g", title: "Motor de scoring determinístico para IA", desc: "INK evalúa smart contracts sin LLM para el scoring — la IA solo explica. Criterio técnico primero, generación después" },
  { medal: "03", variant: "c", title: "AUC 0.942 en riesgo crediticio", desc: "Ensemble de 4 modelos ML con SMOTE, PCA y validación real — métrica verificable, no inventada" },
  { medal: "04", variant: "m", title: "Plataforma financiera con 8 módulos", desc: "QuantLab: backtest vs SPY, Monte Carlo, opciones BYMA con Greeks, optimización de portfolio — arquitectura real, no CRUD" },
  { medal: "05", variant: "", title: "Estadística aplicada a decisiones reales", desc: "Laboratory ejecuta t-tests sobre retornos logarítmicos de activos reales para validar si una tendencia es significativa o ruido" },
  { medal: "06", variant: "g", title: "Inversor activo que construye sus propias herramientas", desc: "Opero en Merval y Cedears — las herramientas que construyo son las que uso yo mismo para tomar decisiones" },
  { medal: "07", variant: "c", title: "Stack completo: Python + TypeScript", desc: "Muevo de FastAPI + Python para análisis a Next.js + TypeScript para producto — sin depender de un solo lenguaje" },
  { medal: "08", variant: "m", title: "Fundamentos sobre frameworks", desc: "Ingeniería Informática en curso: estructuras de datos, algoritmos, sistemas operativos — lo que hace que la IA no me engañe" },
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
