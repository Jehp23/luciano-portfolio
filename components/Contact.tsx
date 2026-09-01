import { site } from "@/lib/site";

export default function Contact() {
  return (
    <section className="section" id="contact">
      <div className="wrap">
        <div className="section-head">
          <h2>Contact</h2>
        </div>
        <p className="contact-copy">
          Open to full-remote roles. Fintech product — React, TypeScript,
          NestJS, GraphQL.
        </p>
        <a className="contact-email" href={`mailto:${site.email}`}>
          {site.email}
        </a>
        <div className="contact-links">
          <a href={site.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
            <span className="arrow" aria-hidden="true">
              {" "}
              ↗
            </span>
          </a>
          <a href={site.github} target="_blank" rel="noopener noreferrer">
            GitHub
            <span className="arrow" aria-hidden="true">
              {" "}
              ↗
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
