import { createOgImage, twitterSize } from "@/lib/og";
import { site } from "@/lib/site";

export const alt = site.title;
export const size = twitterSize;
export const contentType = "image/png";

export default function Image() {
  return createOgImage(size);
}
