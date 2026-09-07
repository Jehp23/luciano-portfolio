import { site } from "@/lib/site";
import { absUrl } from "@/lib/agent/routes";

export function buildOpenApi(): Record<string, unknown> {
  return {
    openapi: "3.1.0",
    info: {
      title: "Luciano Lazarte developer APIs",
      summary: "Public Vercel-hosted APIs for the Luciano Lazarte portfolio.",
      description:
        "Machine-readable access to Luciano Lazarte's GitHub activity proxy and educational portfolio optimizer. No API keys. Not investment advice.",
      version: "1.0.0",
      contact: {
        name: site.name,
        email: site.email,
        url: absUrl("/developers"),
      },
    },
    servers: [{ url: site.url, description: "Production on Vercel" }],
    tags: [
      { name: "github", description: "Public GitHub activity for Jehp23" },
      { name: "optimizer", description: "Educational mean-variance optimizer inputs" },
    ],
    paths: {
      "/api/github": {
        get: {
          tags: ["github"],
          operationId: "getGithubActivity",
          summary: "Luciano Lazarte GitHub activity",
          description: "Public repos, language mix, recent pushes, and featured live demos.",
          responses: {
            "200": {
              description: "Activity payload",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      publicRepos: { type: "integer" },
                      languages: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            name: { type: "string" },
                            pct: { type: "integer" },
                          },
                        },
                      },
                      recentPushes: { type: "array" },
                      featured: { type: "array" },
                      since: { type: "string" },
                    },
                  },
                },
              },
            },
            "503": { description: "GitHub API unavailable" },
          },
        },
      },
      "/api/portfolio/optimize": {
        post: {
          tags: ["optimizer"],
          operationId: "optimizePortfolio",
          summary: "Fetch aligned ARS price series for BYMA / CEDEAR / bond tickers",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["tickers"],
                  properties: {
                    tickers: {
                      type: "array",
                      minItems: 2,
                      maxItems: 10,
                      items: { type: "string" },
                      example: ["GGAL", "YPFD"],
                    },
                  },
                },
              },
            },
          },
          responses: {
            "200": { description: "Aligned close prices" },
            "400": { description: "Invalid body" },
            "422": { description: "Unknown tickers" },
          },
        },
      },
    },
  };
}
