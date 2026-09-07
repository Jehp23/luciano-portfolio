import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { buildLlmsTxt } from "./llms.ts";

describe("llms.txt", () => {
  it("follows llmstxt.org order: H1, blockquote, when-to-use, then H2 file lists", () => {
    const txt = buildLlmsTxt();
    const lines = txt.trim().split("\n");
    assert.equal(lines[0], "# Luciano Lazarte");
    assert.ok(lines[1].startsWith("> "));
    assert.match(txt, /When to use this:/);
    assert.match(txt, /How an agent should call this:/);
    assert.match(txt, /^## Pages$/m);
    assert.match(txt, /^- \[Home\]\(https:\/\/lucianolazarte\.vercel\.app\):/m);
    assert.match(txt, /^## Developer resources$/m);
    assert.match(txt, /openapi\.json/);
    assert.match(txt, /\/.well-known\/mcp/);
    assert.match(txt, /^## Optional$/m);
  });
});
