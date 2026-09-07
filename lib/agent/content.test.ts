import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { markdownForPath, pageMarkdown, visibleTextLength } from "./content.ts";
import { INDEXABLE_PATHS } from "./routes.ts";

describe("markdown pages", () => {
  it("serves markdown for every indexable path", () => {
    for (const path of INDEXABLE_PATHS) {
      const result = markdownForPath(path);
      assert.equal(result.status, 200);
      assert.match(result.body, /^# /);
      assert.match(result.body, /Luciano Lazarte/);
    }
  });

  it("returns HTTP 404 markdown with recovery links", () => {
    const result = markdownForPath("/some-path-that-does-not-exist");
    assert.equal(result.status, 404);
    assert.match(result.body, /404/);
    assert.match(result.body, /llms\.txt/);
    assert.match(result.body, /sitemap\.xml/);
    assert.match(result.body, /developers/);
  });

  it("keeps about, contact, and privacy over 500 characters", () => {
    for (const path of ["/about", "/contact", "/privacy"] as const) {
      assert.ok(visibleTextLength(pageMarkdown(path)) >= 500, path);
    }
  });

  it("names Vercel and Luciano Lazarte on the developers page", () => {
    const body = pageMarkdown("/developers");
    assert.match(body, /Luciano Lazarte/);
    assert.match(body, /Vercel/);
    assert.match(body, /openapi\.json/);
    assert.match(body, /\/mcp/);
  });
});
