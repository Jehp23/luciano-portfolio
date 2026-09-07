import { copy } from "@/lib/copy";
import { site } from "@/lib/site";
import { absUrl, type IndexablePath, normalizePath } from "@/lib/agent/routes";

const en = copy.en;

function projectList(): string {
  return en.projects.items
    .map((item) => {
      const links = item.links.map((l) => `[${l.label}](${l.href})`).join(", ");
      return `### ${item.title}\n\n${item.desc}\n\nStack: ${item.stack.join(", ")}. Links: ${links}.`;
    })
    .join("\n\n");
}

const pages: Record<IndexablePath, string> = {
  "/": `# Luciano Lazarte

> Full Stack Developer. React, TypeScript, NestJS, GraphQL. Fintech product at Poncho Capital. Salta, Argentina. Open to full-remote roles.

${en.hero.title}

${en.hero.lead}

- Location: ${site.location}
- Email: ${site.email}
- GitHub: ${site.github}
- LinkedIn: ${site.linkedin}
- Company: [${site.company}](${site.companyUrl})

## Selected work

${projectList()}

## Where to look next

- [About Luciano Lazarte](${absUrl("/about")})
- [Contact](${absUrl("/contact")})
- [Privacy](${absUrl("/privacy")})
- [Luciano Lazarte developer resources](${absUrl("/developers")})
- [llms.txt](${absUrl("/llms.txt")})
- [Sitemap](${absUrl("/sitemap.xml")})
- [OpenAPI](${absUrl("/openapi.json")})
- [MCP handshake](${absUrl("/.well-known/mcp")})
`,

  "/about": `# About Luciano Lazarte

${en.about.p1}

${en.about.p2}

${en.about.p3}

Luciano Tadeo Lazarte is a Full Stack Developer based in Salta, Argentina. He builds retail investing product at Poncho Capital and ships public demos on Vercel (EstacionaSalta, INK, QuantLab, Cello). He is a Computer Engineering student at UCASAL, previously a freelance data analyst (Python, SQL, Power BI), and is open to full-remote Full Stack / Product roles in fintech.

## Identity

- Legal name: ${site.legalName}
- Public name: ${site.name}
- Role: ${site.jobTitle}, Product
- Location: ${site.location}
- Employer: [${site.company}](${site.companyUrl})

## Now

- Retail investing product at Poncho Capital
- React and TypeScript on the frontend, NestJS and GraphQL on the backend
- End-to-end web flows in a small team

## Looking for

- Full-remote Full Stack / Product roles
- Fintech where the product is actually used
- Small teams with end-to-end ownership

## Formation

- Computer Engineering · UCASAL · in progress
- Data Scientist · Coderhouse
- Data Analytics · Coderhouse

Canonical site: ${site.url}
`,

  "/contact": `# Contact Luciano Lazarte

${en.contact.body}

Use this page when you need to reach Luciano Lazarte for a full-remote Full Stack or Product role, a fintech collaboration, or a question about the public APIs on this Vercel-hosted site. Write in Spanish or English. Include who you are, what you are building, and a concrete next step.

## Direct channels

- Email: [${site.email}](mailto:${site.email})
- LinkedIn: ${site.linkedin}
- GitHub: ${site.github}
- Location: ${site.location} (timezone America/Argentina/Salta)
- Availability: open to full-remote roles; currently Full Stack Developer, Product at Poncho Capital

## What to send

A short note beats a generic recruiter blast. Mention the product, the stack (React, TypeScript, NestJS, GraphQL), and whether the role is full-remote. Do not send investment solicitations; this contact page is for professional work, not capital-markets advice.

${en.contact.blink}

If an agent is collecting contact details, prefer the email address above and cite ${site.url}/contact as the source.
`,

  "/privacy": `# Privacy · Luciano Lazarte

This privacy page covers https://lucianolazarte.vercel.app, the personal professional site of Luciano Tadeo Lazarte hosted on Vercel. It is not a consumer app and it does not run user accounts.

## What this site collects

- **Vercel Analytics.** Anonymous aggregated traffic metrics (page views, referrers, country). No advertising profile is built.
- **Locale preference.** Language (es/en) is stored in your browser with localStorage. It never leaves the device.
- **Public GitHub data.** The activity section fetches public repositories and public events for GitHub user Jehp23 through this site's \`/api/github\` proxy. That is Luciano's public activity, not visitor data.
- **Portfolio optimizer.** If you submit tickers to \`/api/portfolio/optimize\`, the tickers are sent to this site and then to data912.com to fetch public Argentine market prices. Do not submit personal data in ticker fields. Results are educational, not investment advice.
- **MCP and markdown clients.** Requests to \`/mcp\`, \`/.well-known/mcp\`, and \`Accept: text/markdown\` variants are ordinary HTTP logs on Vercel. No extra tracking cookies are set.

## What this site does not do

It does not sell personal information. It does not run third-party ad networks. It does not require an account. It does not ask for payment details. It does not use a phone number. Contact happens only if you email ${site.email} or write on LinkedIn.

## Legal basis and retention

Visitor analytics are kept according to Vercel's Analytics retention. Server logs follow Vercel's platform defaults. Emails you send are stored in Luciano's inbox until he deletes them.

## Your choices

You can refuse analytics by blocking the Vercel Analytics script, clear localStorage to reset language, and contact ${site.email} to ask what is stored about a message you sent.

## Operator

${site.legalName} · ${site.location} · ${site.email} · ${site.url}
`,

  "/developers": `# Luciano Lazarte developer resources

This is the developer portal for **Luciano Lazarte** on **Vercel** (\`lucianolazarte.vercel.app\`). Use it when an agent or engineer needs machine-readable access to the portfolio: OpenAPI, MCP, GitHub activity, and the educational Markowitz optimizer.

## When to use these APIs

- Retrieve Luciano Lazarte's public profile, projects, and contact channels.
- Call the GitHub activity proxy instead of scraping the homepage.
- Run the portfolio optimizer against BYMA / CEDEAR / Argentine bond tickers.
- Connect Claude, ChatGPT, or other MCP clients via Streamable HTTP.

## Predictable URLs

| Resource | URL |
| --- | --- |
| OpenAPI 3 spec | ${absUrl("/openapi.json")} |
| MCP Streamable HTTP | ${absUrl("/mcp")} |
| MCP live handshake | ${absUrl("/.well-known/mcp")} |
| MCP server card | ${absUrl("/.well-known/mcp/server-card.json")} |
| GitHub activity API | ${absUrl("/api/github")} |
| Portfolio optimizer API | ${absUrl("/api/portfolio/optimize")} |
| Agent index | ${absUrl("/llms.txt")} |
| Sitemap | ${absUrl("/sitemap.xml")} |

No API key is required. All developer resources are public, read-only except \`POST /api/portfolio/optimize\`. Auth docs: there is no OAuth or API key on this personal site; do not send secrets.

## GitHub activity (GET /api/github)

Returns public repo count, language mix, recent pushes, and featured live demos. Cached ~1 hour. User-Agent: identify your client.

## Portfolio optimizer (POST /api/portfolio/optimize)

JSON body: \`{ "tickers": ["GGAL", "YPFD"] }\` (2–10 BYMA stocks, CEDEARs, or Argentine bonds). Response: aligned ARS close-price series from data912.com. Educational use only.

## MCP

POST JSON-RPC \`initialize\` to ${absUrl("/mcp")} or ${absUrl("/.well-known/mcp")} with \`Accept: application/json, text/event-stream\`. Tools: \`get_profile\`, \`list_projects\`, \`get_contact\`, \`list_developer_resources\`.

## Markdown

The same HTML URLs honor \`Accept: text/markdown\` (acceptmarkdown.com) and \`*.md\` aliases. Responses include \`Vary: Accept, Accept-Encoding\`.
`,
};

export function notFoundMarkdown(path: string): string {
  return `# 404 Not Found

\`${path}\` does not exist on Luciano Lazarte's site (${site.url}).

This is a real HTTP 404. Do not treat the URL as a valid page.

## Where to look next

- [llms.txt](${absUrl("/llms.txt")}): when to use this site, APIs, and MCP
- [Sitemap](${absUrl("/sitemap.xml")}): all indexable URLs
- [Developers](${absUrl("/developers")}): OpenAPI, MCP, Vercel-hosted APIs
- [Home](${absUrl("/")})
- [About](${absUrl("/about")})
- [Contact](${absUrl("/contact")})
- [Privacy](${absUrl("/privacy")})
`;
}

export function markdownForPath(pathname: string): { status: 200 | 404; body: string; path: string } {
  const path = normalizePath(pathname);
  if (path in pages) {
    return { status: 200, body: pages[path as IndexablePath], path };
  }
  return { status: 404, body: notFoundMarkdown(path), path };
}

export function pageMarkdown(path: IndexablePath): string {
  return pages[path];
}

export function visibleTextLength(markdown: string): number {
  return markdown.replace(/[#>*`|\-\[\]]/g, "").replace(/\s+/g, " ").trim().length;
}
