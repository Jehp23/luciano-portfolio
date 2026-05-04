"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface GitHubData {
  publicRepos: number;
  languages: { name: string; pct: number }[];
  recentPushes: { repo: string; date: string; message: string }[];
  featured: { name: string; url: string }[];
  since: string;
}

const LANG_COLORS: Record<string, string> = {
  TypeScript:       "#4ab8ff",
  Python:           "#3DD68C",
  JavaScript:       "#FFB000",
  "Jupyter Notebook": "#ff3d9a",
};

function timeAgo(dateStr: string): string {
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 86400000);
  if (diff === 0) return "hoy";
  if (diff === 1) return "ayer";
  if (diff < 7)  return `hace ${diff}d`;
  if (diff < 30) return `hace ${Math.floor(diff / 7)}sem`;
  return `hace ${Math.floor(diff / 30)}m`;
}

export default function GitHubActivity() {
  const [data, setData] = useState<GitHubData | null>(null);

  useEffect(() => {
    fetch("/api/github")
      .then((r) => r.json())
      .then(setData)
      .catch(() => {});
  }, []);

  return (
    <section className="block" id="github">
      <div className="section-h">
        ACTIVIDAD <span className="badge">{"// GITHUB · JEHP23"}</span>
      </div>

      <div className="gh-grid">
        {/* Contribution heatmap */}
        <div className="gh-heatmap-wrap">
          <div className="gh-heatmap-label">CONTRIBUCIONES · ÚLTIMOS 12 MESES</div>
          <div className="gh-heatmap-img">
            <Image
              src="https://ghchart.rshah.org/3DD68C/Jehp23"
              alt="GitHub contribution chart"
              width={720}
              height={112}
              unoptimized
              style={{ width: "100%", height: "auto", filter: "brightness(0.9)" }}
            />
          </div>
          {data && (
            <div className="gh-heatmap-meta">
              <span>{data.publicRepos} repos públicos</span>
              <span>·</span>
              <span>activo desde {data.since}</span>
            </div>
          )}
        </div>

        {/* Right column */}
        <div className="gh-right">
          {/* Languages */}
          <div className="gh-card">
            <div className="gh-card-label">LENGUAJES</div>
            {(data?.languages ?? [{ name: "—", pct: 0 }]).map(({ name, pct }) => (
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

          {/* Recent pushes */}
          <div className="gh-card">
            <div className="gh-card-label">ACTIVIDAD RECIENTE</div>
            {(data?.recentPushes ?? Array(4).fill(null)).map((p, i) =>
              p ? (
                <div key={i} className="gh-push-row">
                  <span className="gh-push-dot" />
                  <div className="gh-push-info">
                    <span className="gh-push-repo">{p.repo}</span>
                    <span className="gh-push-msg">{p.message}</span>
                  </div>
                  <span className="gh-push-date">{timeAgo(p.date)}</span>
                </div>
              ) : (
                <div key={i} className="gh-push-row gh-skeleton">
                  <span className="gh-push-dot" />
                  <div className="gh-push-info">
                    <span className="gh-push-repo">···</span>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
