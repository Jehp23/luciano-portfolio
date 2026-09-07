import { buildMcpManifest, mcpDiscoveryHeaders } from "@/lib/agent/mcp";

export function GET() {
  return Response.json(buildMcpManifest(), { headers: mcpDiscoveryHeaders() });
}
