import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { INDEXABLE_PATHS, absUrl } from "@/lib/agent/routes";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(site.updated);
  return INDEXABLE_PATHS.map((path) => ({
    url: absUrl(path),
    lastModified,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.8,
  }));
}
