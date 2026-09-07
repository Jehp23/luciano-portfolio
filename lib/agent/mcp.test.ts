import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  buildMcpManifest,
  buildMcpServerCard,
  dispatchMcpMessage,
  isValidOrigin,
  MCP_PROTOCOL_VERSION,
} from "./mcp.ts";

describe("MCP handshake", () => {
  it("publishes a Streamable HTTP endpoint in the SEP-1960 manifest", () => {
    const manifest = buildMcpManifest();
    assert.equal(
      (manifest.endpoints as { streamable_http: string }).streamable_http,
      "https://lucianolazarte.vercel.app/mcp",
    );
    assert.equal(manifest.protocolVersion, MCP_PROTOCOL_VERSION);
    assert.equal((manifest.capabilities as { tools: boolean }).tools, true);
    assert.equal((manifest.authentication as { required: boolean }).required, false);
  });

  it("lists tools on the SEP-1649 server card", () => {
    const card = buildMcpServerCard();
    const tools = card.tools as { name: string }[];
    assert.deepEqual(
      tools.map((t) => t.name),
      ["get_profile", "list_projects", "get_contact", "list_developer_resources"],
    );
  });

  it("answers initialize as a live JSON-RPC handshake", () => {
    const { status, body } = dispatchMcpMessage({
      jsonrpc: "2.0",
      id: 1,
      method: "initialize",
      params: { protocolVersion: MCP_PROTOCOL_VERSION, capabilities: {}, clientInfo: { name: "test", version: "0" } },
    });
    assert.equal(status, 200);
    const result = (body as { result: { protocolVersion: string; serverInfo: { name: string } } }).result;
    assert.equal(result.protocolVersion, MCP_PROTOCOL_VERSION);
    assert.equal(result.serverInfo.name, "luciano-lazarte");
  });

  it("accepts initialized notifications with 202", () => {
    const { status, body } = dispatchMcpMessage({
      jsonrpc: "2.0",
      method: "notifications/initialized",
    });
    assert.equal(status, 202);
    assert.equal(body, null);
  });

  it("rejects malformed Origin values", () => {
    assert.equal(isValidOrigin(null), true);
    assert.equal(isValidOrigin("https://claude.ai"), true);
    assert.equal(isValidOrigin("not a url"), false);
  });
});
