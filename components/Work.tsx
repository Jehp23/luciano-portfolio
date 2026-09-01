import type { CSSProperties } from "react";
import SpotlightCard from "@/components/SpotlightCard";
import { work } from "@/lib/site";

export default function Work() {
  return (
    <section className="section" id="work">
      <div className="wrap">
        <div className="section-head">
          <h2>Selected work</h2>
        </div>
        <div className="work-grid">
          {work.map((project, index) => (
            <SpotlightCard
              key={project.name}
              className="card"
              style={{ "--reveal-delay": `${index * 70}ms` } as CSSProperties}
            >
              <div className="card-top">
                <h3 className="card-name">{project.name}</h3>
                {project.tag ? <span className="card-tag">{project.tag}</span> : null}
              </div>
              <p className="card-desc">{project.description}</p>
              <div className="card-links">
                <a
                  className="ext"
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {project.host}
                  <span className="arrow" aria-hidden="true">
                    ↗
                  </span>
                </a>
                {"video" in project && project.video ? (
                  <a
                    className="ext"
                    href={project.video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {project.video.label}
                    <span className="arrow" aria-hidden="true">
                      ↗
                    </span>
                  </a>
                ) : null}
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}
