"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useI18n } from "@/components/LocaleProvider";

type GithubCopy = {
  today: string;
  yesterday: string;
  days: (n: number) => string;
  weeks: (n: number) => string;
  months: (n: number) => string;
};

interface GitHubData {
  publicRepos: number;
  languages: { name: string; pct: number }[];
  recentPushes: { repo: string; date: string; message: string }[];
  featured: { name: string; url: string }[];
  since: string;
}

const LANG_COLORS: Record<string, string> = {
  TypeScript: "#4ab8ff",
  Python: "#3DD68C",
  JavaScript: "#FFB000",
  "Jupyter Notebook": "#ff3d9a",
};

function timeAgo(dateStr: string, gh: GithubCopy): string {
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 86400000);
  if (diff === 0) return gh.today;
  if (diff === 1) return gh.yesterday;
  if (diff < 7) return gh.days(diff);
  if (diff < 30) return gh.weeks(Math.floor(diff / 7));
  return gh.months(Math.floor(diff / 30));
}

export default function GitHubActivity() {
  const { t } = useI18n();
  const [data, setData] = useState<GitHubData | null>(null);

  useEffect(() => {
    fetch("/api/github")
      .then((r) => r.json())
      .then(setData)
      .catch(() => {});
  }, []);

  return (
    <section className="block github-section" id="github" aria-labelledby="github-title">
      <h2 className="section-h" id="github-title">
        {t.github.title} <span className="badge">{t.github.badge}</span>
      </h2>

      <div className="gh-grid">
        <div className="gh-heatmap-wrap">
          <div className="gh-heatmap-label">{t.github.contributions}</div>
          <div className="gh-heatmap-img">
            <Image
              src="https://ghchart.rshah.org/3DD68C/Jehp23"
              alt={t.github.chartAlt}
              width={720}
              height={112}
              unoptimized
              style={{ width: "100%", height: "auto", filter: "brightness(0.9)" }}
            />
          </div>
          {data && (
            <div className="gh-heatmap-meta">
              <span>{t.github.repos(data.publicRepos)}</span>
              <span>·</span>
              <span>{t.github.since(data.since)}</span>
            </div>
          )}
        </div>

        <div className="gh-right">
          <div className="gh-card">
            <div className="gh-card-label">{t.github.languages}</div>
            {(data?.languages ?? [{ name: "—", pct: 0 }]).slice(0, 4).map(({ name, pct }) => (
              <div key={name} className="gh-lang-row">
                <span
                  className="gh-lang-dot"
                  style={{ background: LANG_COLORS[name] ?? "var(--dim)" }}
                />
                <span className="gh-lang-name">{name}</span>
                <div className="gh-lang-bar-wrap">
                  <div
                    className="gh-lang-bar-fill"
                    style={{
                      width: `${pct}%`,
                      background: LANG_COLORS[name] ?? "var(--dim)",
                    }}
                  />
                </div>
                <span className="gh-lang-pct">{pct}%</span>
              </div>
            ))}
          </div>

          <div className="gh-card">
            <div className="gh-card-label">{t.github.recent}</div>
            {(data?.recentPushes ?? Array(3).fill(null)).slice(0, 3).map((p, i) =>
              p ? (
                <div key={i} className="gh-push-row">
                  <span className="gh-push-dot" />
                  <div className="gh-push-info">
                    <span className="gh-push-repo">{p.repo}</span>
                    <span className="gh-push-msg">{p.message}</span>
                  </div>
                  <span className="gh-push-date">{timeAgo(p.date, t.github)}</span>
                </div>
              ) : (
                <div key={i} className="gh-push-row gh-skeleton">
                  <span className="gh-push-dot" />
                  <div className="gh-push-info">
                    <span className="gh-push-repo">···</span>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
