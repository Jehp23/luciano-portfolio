import { handleMcpPost, mcpCorsHeaders } from "@/lib/agent/mcp";

export function OPTIONS() {
  return new Response(null, { status: 204, headers: mcpCorsHeaders() });
}

export function GET() {
  return new Response("Method Not Allowed. POST JSON-RPC to this endpoint (Streamable HTTP).\n", {
    status: 405,
    headers: {
      ...mcpCorsHeaders(),
      Allow: "POST, OPTIONS",
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}

export function POST(request: Request) {
  return handleMcpPost(request);
}
