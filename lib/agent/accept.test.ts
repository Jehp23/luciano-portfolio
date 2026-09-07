import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { preferredType } from "./accept.ts";

describe("preferredType", () => {
  it("defaults to HTML when Accept is missing", () => {
    assert.equal(preferredType(null), "text/html");
  });

  it("selects markdown when it is the only type", () => {
    assert.equal(preferredType("text/markdown"), "text/markdown");
  });

  it("honors q-values so markdown beats lower-q HTML", () => {
    assert.equal(preferredType("text/markdown, text/html;q=0.8"), "text/markdown");
  });

  it("picks HTML for a typical browser header", () => {
    assert.equal(
      preferredType("text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"),
      "text/html",
    );
  });

  it("returns null when every produced type is rejected", () => {
    assert.equal(preferredType("application/pdf"), null);
  });

  it("does not let */* override an explicit q=0 rejection of HTML", () => {
    assert.equal(preferredType("text/html;q=0, text/markdown"), "text/markdown");
  });
});
