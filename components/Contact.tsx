"use client";

import { useI18n } from "@/components/LocaleProvider";
import { site } from "@/lib/site";

export default function Contact() {
  const { t } = useI18n();

  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <div className="contact-inner">
        <p className="contact-eyebrow">{t.contact.eyebrow}</p>
        <h2 id="contact-title">{t.contact.title}</h2>
        <p className="desc">{t.contact.body}</p>
        <div className="ctas">
          <a className="btn" href={`mailto:${site.email}`}>
            EMAIL
          </a>
          <a className="btn alt" href={site.github} target="_blank" rel="noopener noreferrer">
            GITHUB
          </a>
          <a className="btn" href={site.linkedin} target="_blank" rel="noopener noreferrer">
            LINKEDIN
          </a>
        </div>
        <div className="contact-status">
          <span aria-hidden="true" />
          {t.contact.blink}
        </div>
      </div>
    </section>
  );
}
