import Image from "next/image";

const INFO_CARDS = [
  {
    label: "FOCO ACTUAL",
    items: [
      "Plataformas web del broker en PonchoCapital",
      "Desarrollo asistido por IA con criterio técnico",
      "Análisis de datos y mercados financieros",
    ],
  },
  {
    label: "BUSCANDO",
    items: [
      "Roles en fintech / mercado de capitales",
      "Proyectos donde IA + finanzas convergen",
      "Equipos serios que valoren fundamentos",
    ],
  },
  {
    label: "FORMACIÓN",
    items: [
      "Ingeniería Informática · en curso",
      "Curso de Data Science",
      "Curso de Data Analytics",
    ],
  },
];

export default function About() {
  return (
    <section className="block" id="about">
      <div className="section-h">
        SOBRE MÍ <span className="badge">{"// PERFIL"}</span>
      </div>

      <div className="about-layout">
        <div className="about-top">
          <div className="about-text">
            <p>
              Soy estudiante de <strong>Ingeniería Informática</strong> y desarrollador con foco en
              <strong> inteligencia artificial</strong> aplicada a productos financieros. Me apasionan
              los mercados de capitales: invierto, sigo el mercado y lo entiendo desde adentro — eso
              cambia cómo construyo software para finanzas.
            </p>
            <p>
              Actualmente trabajo en <strong>PonchoCapital</strong>, donde colaboro en la construcción
              de las plataformas web del broker. Combino mi formación en ingeniería con cursos
              especializados en <strong>Data Science y Data Analytics</strong> para resolver problemas
              que la mayoría de los developers no llega a entender — porque no hablan el lenguaje del
              trading.
            </p>
            <p>
              Me defino como <strong>AI Developer, no vibecoder</strong>: dirijo a la IA con criterio
              técnico, entiendo lo que ejecuta y por qué. La IA es la herramienta; las decisiones de
              arquitectura, modelo y producto son mías.
            </p>
          </div>

          <aside className="about-aside">
            <div className="about-photo-card">
              <div className="ac-label">IDENTIDAD</div>
              <div className="about-photo-frame">
                <Image
                  src="/foto.png"
                  alt="Foto de Luciano Lazarte"
                  width={220}
                  height={220}
                  className="about-photo"
                  priority
                />
              </div>
              <p className="about-photo-note">Presencia sutil, perfil claro, foco intacto.</p>
            </div>
          </aside>
        </div>

        <div className="about-cards-grid">
          {INFO_CARDS.map(({ label, items }) => (
            <div key={label} className="about-card">
              <div className="ac-label">{label}</div>
              <ul>
                {items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
