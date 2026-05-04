import { NextResponse } from "next/server";

const USER = "Jehp23";
const HEADERS = {
  "User-Agent": "luciano-portfolio",
  Accept: "application/vnd.github.v3+json",
};

// Repos to highlight with live demos
const FEATURED: Record<string, string> = {
  "luciano-portfolio":  "https://lucianolazarte.vercel.app",
  "quantlab-front":     "https://quantlab2.vercel.app",
  "ink-frontend":       "https://inkrisk.vercel.app",
  "ink-risk-intelligence": "https://inkrisk.vercel.app",
};

export async function GET() {
  try {
    const [reposRes, eventsRes] = await Promise.all([
      fetch(`https://api.github.com/users/${USER}/repos?sort=updated&per_page=30`, {
        headers: HEADERS,
        next: { revalidate: 3600 },
      }),
      fetch(`https://api.github.com/users/${USER}/events/public?per_page=30`, {
        headers: HEADERS,
        next: { revalidate: 900 },
      }),
    ]);

    const repos: Record<string, unknown>[] = reposRes.ok ? await reposRes.json() : [];
    const events: Record<string, unknown>[] = eventsRes.ok ? await eventsRes.json() : [];

    // Language breakdown by repo count
    const langCount: Record<string, number> = {};
    for (const r of repos) {
      const lang = r.language as string | null;
      if (lang) langCount[lang] = (langCount[lang] ?? 0) + 1;
    }
    const totalLangRepos = Object.values(langCount).reduce((a, b) => a + b, 0);
    const languages = Object.entries(langCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 4)
      .map(([name, count]) => ({ name, pct: Math.round((count / totalLangRepos) * 100) }));

    // Recent pushes (deduplicated by repo)
    const seen = new Set<string>();
    const recentPushes: { repo: string; date: string; message: string }[] = [];
    for (const e of events) {
      if (e.type !== "PushEvent") continue;
      const repoName = (e.repo as Record<string, string>).name?.replace(`${USER}/`, "");
      if (seen.has(repoName)) continue;
      seen.add(repoName);
      const payload = e.payload as Record<string, unknown>;
      const commits = payload.commits as { message: string }[] | undefined;
      const message = commits?.[commits.length - 1]?.message?.split("\n")[0] ?? "push";
      const date = e.created_at as string;
      recentPushes.push({ repo: repoName, date: date.slice(0, 10), message });
      if (recentPushes.length >= 5) break;
    }

    // Featured repos with live demos
    const featured = repos
      .filter((r) => FEATURED[r.name as string])
      .map((r) => ({ name: r.name as string, url: FEATURED[r.name as string] }));

    return NextResponse.json({
      publicRepos: repos.length,
      languages,
      recentPushes,
      featured,
      since: "2023",
    });
  } catch {
    return NextResponse.json({ error: "GitHub API unavailable" }, { status: 503 });
  }
}
