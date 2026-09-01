import { education, languages, skills } from "@/lib/site";

export default function Profile() {
  return (
    <section className="section" id="profile">
      <div className="wrap">
        <div className="section-head">
          <h2>Education & skills</h2>
        </div>
        <div className="profile-grid" data-reveal>
          <div className="profile-block">
            <h3>Education</h3>
            {education.map((item) => (
              <div key={item.org} className="edu">
                <p className="edu-title">
                  {item.title} · {item.org}
                </p>
                <p className="edu-org">{item.dates}</p>
                {item.note ? <p className="edu-note">{item.note}</p> : null}
              </div>
            ))}
          </div>
          <div>
            <div className="profile-block">
              <h3>Languages & frameworks</h3>
              <div className="skill-row">
                {skills.map((skill) => (
                  <span key={skill} className="chip">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="profile-block">
              <h3>Languages</h3>
              <div className="lang-row">
                {languages.map((lang) => (
                  <span key={lang.name} className="chip">
                    {lang.name} ({lang.level})
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
