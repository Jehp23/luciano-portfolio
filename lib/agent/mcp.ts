import { copy } from "@/lib/copy";
import { site } from "@/lib/site";
import { absUrl } from "@/lib/agent/routes";

export const MCP_PROTOCOL_VERSION = "2025-06-18";
export const MCP_SERVER_NAME = "luciano-lazarte";
export const MCP_SERVER_VERSION = "1.0.0";

const tools = [
  {
    name: "get_profile",
    description:
      "Return Luciano Lazarte's identity, role, location, employer, and canonical URLs.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
  },
  {
    name: "list_projects",
    description: "List selected public products with descriptions, stack, and demo links.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
  },
  {
    name: "get_contact",
    description: "Return professional contact channels for Luciano Lazarte.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
  },
  {
    name: "list_developer_resources",
    description:
      "Return OpenAPI, MCP, GitHub API, optimizer, llms.txt, and Vercel-hosted developer URLs.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
  },
] as const;

export function mcpDiscoveryHeaders(): HeadersInit {
  return {
    "Content-Type": "application/json; charset=utf-8",
    "X-Content-Type-Options": "nosniff",
    "Cache-Control": "max-age=3600",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers":
      "Content-Type, Accept, MCP-Protocol-Version, Mcp-Session-Id, Last-Event-ID",
  };
}

export function mcpCorsHeaders(): HeadersInit {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers":
      "Content-Type, Accept, MCP-Protocol-Version, Mcp-Session-Id, Last-Event-ID",
    "Access-Control-Expose-Headers": "Mcp-Session-Id, MCP-Protocol-Version",
  };
}

export function isValidOrigin(origin: string | null): boolean {
  if (!origin) return true;
  try {
    const url = new URL(origin);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export function buildMcpManifest(): Record<string, unknown> {
  return {
    mcp_version: "1.0",
    server_version: MCP_SERVER_VERSION,
    protocolVersion: MCP_PROTOCOL_VERSION,
    endpoints: {
      streamable_http: absUrl("/mcp"),
    },
    capabilities: {
      tools: true,
      resources: false,
      prompts: false,
      sampling: false,
      roots: false,
    },
    authentication: {
      required: false,
      methods: [],
    },
    security: {
      tls_required: true,
      security_contact: `mailto:${site.email}`,
    },
    rate_limits: {
      requests_per_minute: 60,
    },
    registration: { dynamic: false },
    documentation: absUrl("/developers"),
    name: MCP_SERVER_NAME,
    description:
      "Public MCP server for Luciano Lazarte: profile, projects, contact, and developer resource URLs.",
  };
}

export function buildMcpServerCard(): Record<string, unknown> {
  return {
    $schema: "https://static.modelcontextprotocol.io/schemas/mcp-server-card/v1.json",
    version: "1.0",
    protocolVersion: MCP_PROTOCOL_VERSION,
    serverInfo: {
      name: MCP_SERVER_NAME,
      title: "Luciano Lazarte MCP Server",
      version: MCP_SERVER_VERSION,
    },
    description:
      "First-party MCP server for Luciano Lazarte on Vercel. Profile, selected work, contact, and developer resource discovery.",
    homepage: absUrl("/developers"),
    transport: {
      type: "streamable-http",
      endpoint: absUrl("/mcp"),
    },
    capabilities: {
      tools: { listChanged: false },
    },
    authentication: {
      required: false,
      schemes: [],
    },
    tools: tools.map(({ name, description }) => ({ name, description })),
  };
}

type JsonRpc = {
  jsonrpc?: string;
  id?: string | number | null;
  method?: string;
  params?: Record<string, unknown>;
  result?: unknown;
  error?: unknown;
};

function rpcResult(id: JsonRpc["id"], result: unknown) {
  return { jsonrpc: "2.0", id: id ?? null, result };
}

function rpcError(id: JsonRpc["id"], code: number, message: string) {
  return { jsonrpc: "2.0", id: id ?? null, error: { code, message } };
}

function textResult(text: string) {
  return { content: [{ type: "text", text }] };
}

function callTool(name: string): unknown {
  switch (name) {
    case "get_profile":
      return textResult(
        JSON.stringify(
          {
            name: site.name,
            legalName: site.legalName,
            jobTitle: site.jobTitle,
            location: site.location,
            company: site.company,
            url: site.url,
            email: site.email,
            github: site.github,
            linkedin: site.linkedin,
          },
          null,
          2,
        ),
      );
    case "list_projects":
      return textResult(
        JSON.stringify(
          copy.en.projects.items.map((p) => ({
            title: p.title,
            description: p.desc,
            stack: p.stack,
            links: p.links,
          })),
          null,
          2,
        ),
      );
    case "get_contact":
      return textResult(
        JSON.stringify(
          {
            email: site.email,
            linkedin: site.linkedin,
            github: site.github,
            page: absUrl("/contact"),
          },
          null,
          2,
        ),
      );
    case "list_developer_resources":
      return textResult(
        JSON.stringify(
          {
            developers: absUrl("/developers"),
            openapi: absUrl("/openapi.json"),
            mcp: absUrl("/mcp"),
            handshake: absUrl("/.well-known/mcp"),
            githubApi: absUrl("/api/github"),
            optimizer: absUrl("/api/portfolio/optimize"),
            llms: absUrl("/llms.txt"),
          },
          null,
          2,
        ),
      );
    default:
      return null;
  }
}

export function dispatchMcpMessage(message: JsonRpc): { status: number; body: unknown | null } {
  if (message.jsonrpc !== "2.0") {
    return { status: 400, body: rpcError(message.id, -32600, "Invalid Request") };
  }

  const isNotification = message.id === undefined && typeof message.method === "string";
  if (isNotification) {
    return { status: 202, body: null };
  }

  if (!message.method) {
    return { status: 400, body: rpcError(message.id, -32600, "Invalid Request") };
  }

  switch (message.method) {
    case "initialize":
      return {
        status: 200,
        body: rpcResult(message.id, {
          protocolVersion: MCP_PROTOCOL_VERSION,
          capabilities: { tools: {} },
          serverInfo: {
            name: MCP_SERVER_NAME,
            title: "Luciano Lazarte MCP Server",
            version: MCP_SERVER_VERSION,
          },
          instructions:
            "Use this server for Luciano Lazarte's profile, public projects, contact details, and developer resource URLs. Call list_developer_resources if the user needs OpenAPI, MCP, or Vercel API paths. Data is public; no auth.",
        }),
      };
    case "ping":
      return { status: 200, body: rpcResult(message.id, {}) };
    case "tools/list":
      return { status: 200, body: rpcResult(message.id, { tools: [...tools] }) };
    case "tools/call": {
      const name = String(message.params?.name ?? "");
      const result = callTool(name);
      if (!result) {
        return { status: 200, body: rpcError(message.id, -32602, `Unknown tool: ${name}`) };
      }
      return { status: 200, body: rpcResult(message.id, result) };
    }
    default:
      return { status: 200, body: rpcError(message.id, -32601, `Method not found: ${message.method}`) };
  }
}

export async function handleMcpPost(request: Request): Promise<Response> {
  const origin = request.headers.get("origin");
  if (!isValidOrigin(origin)) {
    return new Response("Invalid Origin", { status: 403, headers: mcpCorsHeaders() });
  }

  const version = request.headers.get("mcp-protocol-version");
  if (version && version !== MCP_PROTOCOL_VERSION && version !== "2025-03-26") {
    return new Response("Unsupported MCP-Protocol-Version", {
      status: 400,
      headers: mcpCorsHeaders(),
    });
  }

  let message: JsonRpc;
  try {
    message = (await request.json()) as JsonRpc;
  } catch {
    return Response.json(rpcError(null, -32700, "Parse error"), {
      status: 400,
      headers: { ...mcpCorsHeaders(), "Content-Type": "application/json" },
    });
  }

  const { status, body } = dispatchMcpMessage(message);
  if (status === 202) {
    return new Response(null, { status: 202, headers: mcpCorsHeaders() });
  }

  return Response.json(body, {
    status,
    headers: {
      ...mcpCorsHeaders(),
      "Content-Type": "application/json",
      "MCP-Protocol-Version": MCP_PROTOCOL_VERSION,
    },
  });
}
