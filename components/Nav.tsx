import { site } from "@/lib/site";

const links = [
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  return (
    <nav className="nav">
      <div className="wrap nav-inner">
        <a className="nav-brand" href="#top">
          <span className="nav-mark">LL</span>
          <span>{site.name}</span>
        </a>
        <ul className="nav-links">
          {links.map(({ href, label }) => (
            <li key={href}>
              <a href={href}>{label}</a>
            </li>
          ))}
        </ul>
        <div className="nav-aside">
          <span className="nav-avail">Open to remote</span>
          <a href={`mailto:${site.email}`}>Email</a>
        </div>
      </div>
    </nav>
  );
}
