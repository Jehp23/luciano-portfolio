import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { buildJsonLd } from "./jsonld.ts";
import { site } from "../site.ts";

describe("JSON-LD", () => {
  it("emits Person and Organization with contactPoint and PostalAddress", () => {
    const doc = buildJsonLd();
    assert.equal(doc["@context"], "https://schema.org");
    const graph = doc["@graph"] as Record<string, unknown>[];
    const person = graph.find((n) => n["@type"] === "Person");
    const org = graph.find((n) => n["@type"] === "Organization");
    assert.ok(person);
    assert.ok(org);
    assert.equal(person.name, site.name);
    assert.equal(person.url, site.url);
    assert.equal((person.address as { "@type": string })["@type"], "PostalAddress");
    const contact = org.contactPoint as { email: string; contactType: string };
    assert.equal(contact.email, site.email);
    assert.equal(contact.contactType, "professional");
    assert.equal((org.address as { "@type": string })["@type"], "PostalAddress");
  });
});
