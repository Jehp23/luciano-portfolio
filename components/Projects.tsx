"use client";

import { useI18n } from "@/components/LocaleProvider";

type Project = {
  id: string;
  rarity: string;
  tag: string;
  title: string;
  desc: string;
  stack: readonly string[];
  stats: readonly { s: string; v: string }[];
  links: readonly { label: string; href: string }[];
};

function ProjectLinks({ links }: { links: Project["links"] }) {
  if (links.length === 0) return null;

  return (
    <div className="card-links">
      {links.map(({ label, href }, index) => (
        <a
          className={index === 0 ? "project-link project-link--primary" : "project-link"}
          key={`${label}-${href}`}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {label} <span aria-hidden="true">↗</span>
        </a>
      ))}
    </div>
  );
}

function ProjectData({ project }: { project: Project }) {
  return (
    <>
      <div className="stack" aria-label="Technology stack">
        {project.stack.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
      <dl className="stats-row">
        {project.stats.map(({ s, v }) => (
          <div key={s}>
            <dt className="s">{s}</dt>
            <dd className="v">{v}</dd>
          </div>
        ))}
      </dl>
    </>
  );
}

function CaseStudy({ project, index, flagship = false }: { project: Project; index: string; flagship?: boolean }) {
  return (
    <article
      className={`case-study reveal${flagship ? " case-study--flagship" : ""}`}
      data-rarity={project.rarity}
    >
      <div className="case-index" aria-hidden="true">{index}</div>
      <div className="case-body">
        <p className="project-tag">{project.tag}</p>
        <h3>{project.title}</h3>
        <p className="project-desc">{project.desc}</p>
        <ProjectLinks links={project.links} />
      </div>
      <div className="case-evidence">
        <ProjectData project={project} />
      </div>
    </article>
  );
}

function CompactProject({ project }: { project: Project }) {
  return (
    <article className="compact-project reveal" data-rarity={project.rarity}>
      <p className="project-tag">{project.tag}</p>
      <h3>{project.title}</h3>
      <p className="project-desc">{project.desc}</p>
      <ProjectData project={project} />
      <ProjectLinks links={project.links} />
    </article>
  );
}

function ArchiveProject({ project }: { project: Project }) {
  return (
    <article className="archive-project" data-rarity={project.rarity}>
      <div className="archive-copy">
        <p className="project-tag">{project.tag}</p>
        <h3>{project.title}</h3>
        <p className="project-desc">{project.desc}</p>
      </div>
      <div className="archive-meta">
        <ProjectData project={project} />
        <ProjectLinks links={project.links} />
      </div>
    </article>
  );
}

export default function Projects() {
  const { t } = useI18n();
  const getProject = (id: string) => t.projects.items.find((item) => item.id === id);
  const poncho = getProject("poncho");
  const estacionaSalta = getProject("estacionasalta");
  const selected = [getProject("ink"), getProject("quantlab")].filter(
    (project): project is NonNullable<typeof project> => Boolean(project),
  );
  const archive = [getProject("cello"), getProject("credit")].filter(
    (project): project is NonNullable<typeof project> => Boolean(project),
  );

  return (
    <section className="block projects-section" id="projects" aria-labelledby="projects-title">
      <div className="section-intro">
        <h2 className="section-h" id="projects-title">
          {t.projects.title} <span className="badge">{t.projects.badge}</span>
        </h2>
        <p>{t.projects.intro}</p>
      </div>

      <div className="case-studies" aria-label={t.projects.caseLabel}>
        {poncho && <CaseStudy project={poncho} index="01" flagship />}
        {estacionaSalta && <CaseStudy project={estacionaSalta} index="02" />}
      </div>

      <div className="project-group-head">
        <span>{t.projects.selectedLabel}</span>
        <span aria-hidden="true">02</span>
      </div>
      <div className="compact-projects">
        {selected.map((project) => <CompactProject project={project} key={project.id} />)}
      </div>

      <div className="project-group-head project-group-head--archive">
        <span>{t.projects.archiveLabel}</span>
        <span aria-hidden="true">02</span>
      </div>
      <div className="archive-projects">
        {archive.map((project) => <ArchiveProject project={project} key={project.id} />)}
      </div>
    </section>
  );
}
