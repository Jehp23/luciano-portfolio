import { site } from "@/lib/site";

export type IndexablePath = "/" | "/about" | "/contact" | "/privacy" | "/developers";

export const INDEXABLE_PATHS: readonly IndexablePath[] = [
  "/",
  "/about",
  "/contact",
  "/privacy",
  "/developers",
];

export const MACHINE_PATHS = [
  "/llms.txt",
  "/sitemap.xml",
  "/robots.txt",
  "/openapi.json",
  "/mcp",
  "/.well-known/mcp",
  "/.well-known/mcp/server-card.json",
  "/api/github",
] as const;

export function absUrl(path: string): string {
  if (path.startsWith("http")) return path;
  const suffix = path === "/" ? "" : path;
  return `${site.url}${suffix}`;
}

export function normalizePath(pathname: string): string {
  let path = pathname.split("?")[0] ?? "/";
  if (path.length > 1 && path.endsWith("/")) path = path.slice(0, -1);
  if (path.endsWith(".md")) {
    path = path.slice(0, -3);
    if (path === "" || path === "/index") path = "/";
  }
  return path || "/";
}

export function isIndexablePath(path: string): path is IndexablePath {
  return (INDEXABLE_PATHS as readonly string[]).includes(path);
}
