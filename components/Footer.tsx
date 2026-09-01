import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-inner">
        <span>
          © 2026 {site.name} · {site.location}
        </span>
        <span>{site.legalName}</span>
      </div>
    </footer>
  );
}
