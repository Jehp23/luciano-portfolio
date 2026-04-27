export default function About() {
  return (
    <section className="block" id="about">
      <div className="section-h">
        SOBRE MÍ <span className="badge">// PERFIL</span>
      </div>
      <div className="about-wrap">
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
        <div className="about-side">
          <div className="about-card">
            <div className="ac-label">FOCO ACTUAL</div>
            <ul>
              <li>Plataformas web del broker en PonchoCapital</li>
              <li>Desarrollo asistido por IA con criterio técnico</li>
              <li>Análisis de datos y mercados financieros</li>
            </ul>
          </div>
          <div className="about-card">
            <div className="ac-label">BUSCANDO</div>
            <ul>
              <li>Roles en fintech / mercado de capitales</li>
              <li>Proyectos donde IA + finanzas convergen</li>
              <li>Equipos serios que valoren fundamentos</li>
            </ul>
          </div>
          <div className="about-card">
            <div className="ac-label">FORMACIÓN</div>
            <ul>
              <li>Ingeniería Informática · en curso</li>
              <li>Curso de Data Science</li>
              <li>Curso de Data Analytics</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
