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
      "Proyectos donde IA y finanzas convergen",
      "Equipos donde los fundamentos importen",
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
              Soy estudiante de <strong>Ingeniería Informática</strong> y desarrollador enfocado en
              fintech e <strong>inteligencia artificial aplicada</strong>. Invierto en el mercado de
              capitales desde hace algunos años — eso me da contexto real sobre qué problemas vale
              la pena resolver con software.
            </p>
            <p>
              Actualmente trabajo en <strong>PonchoCapital</strong>, donde colaboro en el desarrollo
              de las plataformas web del broker. Combino esa experiencia con formación en
              <strong> Data Science y Data Analytics</strong> para construir herramientas que conectan
              análisis de datos con decisiones financieras concretas.
            </p>
            <p>
              Uso <strong>IA como herramienta de desarrollo</strong>, con criterio técnico sobre cada
              decisión de arquitectura y modelo. Los proyectos que muestro acá los construí y los uso yo mismo.
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
              <p className="about-photo-note">Luciano Lazarte · Salta, Argentina</p>
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
