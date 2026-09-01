import { experience } from "@/lib/site";

export default function Experience() {
  return (
    <section className="section" id="experience">
      <div className="wrap">
        <div className="section-head">
          <h2>Experience</h2>
        </div>
        {experience.map((job) => (
          <article key={job.company} className={job.lead ? "job" : "job secondary"}>
            <header className="job-head">
              <div>
                <h3 className="job-role">
                  {job.role}
                  <span className="job-company"> · {job.company}</span>
                </h3>
              </div>
              <div className="job-meta">
                <span className="job-dates">{job.dates}</span>
                <span className="job-place">{job.place}</span>
              </div>
            </header>
            <ul className="job-list">
              {job.bullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
