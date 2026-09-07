import { buildMcpServerCard, mcpDiscoveryHeaders } from "@/lib/agent/mcp";

export function GET() {
  return Response.json(buildMcpServerCard(), { headers: mcpDiscoveryHeaders() });
}
