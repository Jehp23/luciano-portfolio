import { buildJsonLd } from "@/lib/agent/jsonld";

export default function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd()) }}
    />
  );
}
