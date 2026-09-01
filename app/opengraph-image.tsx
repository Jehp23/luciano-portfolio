import { createOgImage, ogSize } from "@/lib/og";
import { site } from "@/lib/site";

export const alt = site.title;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return createOgImage(size);
}
