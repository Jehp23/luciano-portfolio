import { buildOpenApi } from "@/lib/agent/openapi";

export function GET() {
  return Response.json(buildOpenApi(), {
    headers: {
      "Cache-Control": "public, max-age=3600",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
