"use client";

import { useI18n } from "@/components/LocaleProvider";

export default function Timeline() {
  const { t } = useI18n();

  return (
    <section className="block timeline-section" id="timeline" aria-labelledby="timeline-title">
      <h2 className="section-h" id="timeline-title">
        {t.timeline.title} <span className="badge">{t.timeline.badge}</span>
      </h2>
      <div className="timeline">
        {t.timeline.items.map(({ id, yr, role, desc, tags }) => (
          <article key={id} className="tl-item reveal">
            <div className="yr">{yr}</div>
            <h3 className="role">{role}</h3>
            <p className="desc">{desc}</p>
            <div className="tl-tags">
              {tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
