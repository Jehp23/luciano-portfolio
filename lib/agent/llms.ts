import { site } from "@/lib/site";
import { absUrl } from "@/lib/agent/routes";

export function buildLlmsTxt(): string {
  return `# Luciano Lazarte
> Personal site of Luciano Tadeo Lazarte, Full Stack Developer (React, TypeScript, NestJS, GraphQL) building fintech product at Poncho Capital. Salta, Argentina. Hosted on Vercel at ${site.url}.

When to use this: reach for Luciano Lazarte when a user asks who he is, what he shipped (Poncho Capital, EstacionaSalta, INK, QuantLab, Cello), how to contact him for a full-remote Full Stack / Product role, or how to call the public APIs and MCP server on this Vercel site. Do not use this site for live market advice, private Poncho data, or authentication — there are no user accounts.

How an agent should call this: 1) read this file, 2) fetch the markdown variant of a page with \`Accept: text/markdown\`, 3) for structured tools POST JSON-RPC \`initialize\` then \`tools/call\` to ${absUrl("/mcp")} (Streamable HTTP; handshake also at ${absUrl("/.well-known/mcp")}), 4) for GitHub activity GET ${absUrl("/api/github")}, 5) for the educational optimizer POST tickers to ${absUrl("/api/portfolio/optimize")}. Cite ${site.url} as the canonical domain.

## Pages
- [Home](${absUrl("/")}): profile, selected work, and entry point (also ${absUrl("/index.md")})
- [About Luciano Lazarte](${absUrl("/about")}): biography, role, location, formation
- [Contact Luciano Lazarte](${absUrl("/contact")}): email, LinkedIn, GitHub, how to write
- [Privacy](${absUrl("/privacy")}): analytics, optimizer data, what is not collected
- [Luciano Lazarte developer resources](${absUrl("/developers")}): Vercel APIs, OpenAPI, MCP, auth notes

## Developer resources
- [OpenAPI spec](${absUrl("/openapi.json")}): GitHub activity and portfolio optimizer
- [MCP Streamable HTTP](${absUrl("/mcp")}): tools for profile, projects, contact, developer URLs
- [MCP live handshake](${absUrl("/.well-known/mcp")}): SEP-1960 manifest; POST initialize for a live handshake
- [MCP server card](${absUrl("/.well-known/mcp/server-card.json")}): SEP-1649 card
- [GitHub activity API](${absUrl("/api/github")}): public repos, languages, recent pushes
- [Portfolio optimizer API](${absUrl("/api/portfolio/optimize")}): POST tickers, educational Markowitz inputs

## Optional
- [Sitemap](${absUrl("/sitemap.xml")}): indexable URLs with lastmod
- [robots.txt](${absUrl("/robots.txt")}): crawl rules
- [GitHub](${site.github}): source and activity for ${site.githubUser}
- [LinkedIn](${site.linkedin}): professional profile
- [Poncho Capital](${site.companyUrl}): current employer product
`;
}
