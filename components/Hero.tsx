import { site } from "@/lib/site";

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-mesh" aria-hidden="true">
        <span className="orb orb-develop" />
        <span className="orb orb-preview" />
      </div>
      <div className="wrap hero-inner">
        <h1 className="hero-name">
          <span>Luciano</span>
          <span>Lazarte</span>
        </h1>
        <p className="hero-role">{site.headline}</p>
        <p className="hero-stack">
          {site.stackLine} · {site.domain}
        </p>
        <p className="hero-lead">
          Building a retail investing product so people with no prior finance
          experience can invest. Web flows end to end — React and TypeScript on
          the frontend, NestJS and GraphQL on the backend.
        </p>
        <div className="hero-cta">
          <a className="btn" href="#work">
            Selected work
          </a>
          <a className="btn btn-ghost" href="#contact">
            Get in touch
          </a>
        </div>
      </div>
    </section>
  );
}
