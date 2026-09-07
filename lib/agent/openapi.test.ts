import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { buildOpenApi } from "./openapi.ts";
import { INDEXABLE_PATHS, absUrl, normalizePath } from "./routes.ts";

describe("OpenAPI and routes", () => {
  it("describes both public APIs under Luciano Lazarte / Vercel", () => {
    const spec = buildOpenApi();
    assert.equal(spec.openapi, "3.1.0");
    assert.match(String(spec.info && (spec.info as { title: string }).title), /Luciano Lazarte/);
    const paths = spec.paths as Record<string, unknown>;
    assert.ok(paths["/api/github"]);
    assert.ok(paths["/api/portfolio/optimize"]);
  });

  it("normalizes .md aliases and trailing slashes", () => {
    assert.equal(normalizePath("/about.md"), "/about");
    assert.equal(normalizePath("/about/"), "/about");
    assert.equal(normalizePath("/index.md"), "/");
  });

  it("builds absolute sitemap URLs", () => {
    assert.equal(absUrl("/"), "https://lucianolazarte.vercel.app");
    assert.deepEqual([...INDEXABLE_PATHS], ["/", "/about", "/contact", "/privacy", "/developers"]);
  });
});
