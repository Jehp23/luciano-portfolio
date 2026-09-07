import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { appendVaryAccept, preferredType } from "@/lib/agent/accept";

function skipNegotiation(request: NextRequest): boolean {
  if (request.headers.get("rsc")) return true;
  if (request.headers.get("next-router-prefetch")) return true;
  if (request.headers.get("next-router-segment-prefetch")) return true;

  const path = request.nextUrl.pathname;
  return (
    path.startsWith("/api/") ||
    path.startsWith("/_next/") ||
    path.startsWith("/.well-known/") ||
    path === "/mcp" ||
    path === "/llms.txt" ||
    path === "/sitemap.xml" ||
    path === "/robots.txt" ||
    path === "/openapi.json" ||
    path.startsWith("/opengraph-image") ||
    path.startsWith("/twitter-image")
  );
}

function withAgentLinks(request: NextRequest, response: NextResponse): NextResponse {
  appendVaryAccept(response.headers);
  const path = request.nextUrl.pathname === "/" ? "/" : request.nextUrl.pathname;
  const md = path === "/" ? "/index.md" : `${path}.md`;
  response.headers.append(
    "Link",
    `</llms.txt>; rel="describedby", <${md}>; rel="alternate"; type="text/markdown"`,
  );
  return response;
}

export function proxy(request: NextRequest) {
  if (skipNegotiation(request)) {
    return NextResponse.next();
  }

  const pathname = request.nextUrl.pathname;

  if (pathname.endsWith(".md")) {
    const url = request.nextUrl.clone();
    const stripped = pathname.slice(0, -3);
    url.pathname = `/api/markdown${stripped === "" || stripped === "/" ? "" : stripped}`;
    const rewritten = NextResponse.rewrite(url);
    appendVaryAccept(rewritten.headers);
    return rewritten;
  }

  const acceptHeader = request.headers.get("accept");
  const chosen = preferredType(acceptHeader);

  if (chosen === "text/markdown") {
    const url = request.nextUrl.clone();
    url.pathname = `/api/markdown${pathname === "/" ? "" : pathname}`;
    const rewritten = NextResponse.rewrite(url);
    appendVaryAccept(rewritten.headers);
    return rewritten;
  }

  if (chosen === null && acceptHeader) {
    return new NextResponse("Not Acceptable\n\nAvailable: text/html, text/markdown\n", {
      status: 406,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        Vary: "Accept, Accept-Encoding",
      },
    });
  }

  return withAgentLinks(request, NextResponse.next());
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|_vercel/|favicon.ico).*)"],
};
