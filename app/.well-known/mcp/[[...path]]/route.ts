import {
  buildMcpManifest,
  buildMcpServerCard,
  handleMcpPost,
  mcpCorsHeaders,
  mcpDiscoveryHeaders,
} from "@/lib/agent/mcp";

type Ctx = { params: Promise<{ path?: string[] }> };

export function OPTIONS() {
  return new Response(null, { status: 204, headers: mcpCorsHeaders() });
}

export async function GET(_req: Request, ctx: Ctx) {
  const { path = [] } = await ctx.params;
  const key = path.join("/");

  if (key === "" || key === "manifest.json") {
    return Response.json(buildMcpManifest(), { headers: mcpDiscoveryHeaders() });
  }

  if (key === "server-card.json") {
    return Response.json(buildMcpServerCard(), { headers: mcpDiscoveryHeaders() });
  }

  return Response.json({ error: "Not found" }, { status: 404, headers: mcpDiscoveryHeaders() });
}

export async function POST(request: Request, ctx: Ctx) {
  const { path = [] } = await ctx.params;
  const key = path.join("/");
  if (key === "") {
    return handleMcpPost(request);
  }
  return new Response("Method Not Allowed", { status: 405, headers: mcpCorsHeaders() });
}
