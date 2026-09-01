import { ImageResponse } from "next/og";
import { site } from "./site";

export const ogSize = { width: 1200, height: 630 };
export const twitterSize = { width: 1200, height: 600 };

export function createOgImage(size: { width: number; height: number }) {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#000000",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            color: "#ffffff",
            fontSize: 64,
            fontWeight: 500,
            letterSpacing: 18,
            textTransform: "uppercase",
            display: "flex",
          }}
        >
          {site.name.toUpperCase()}
        </div>
        <div
          style={{
            color: "#8a8a8a",
            fontSize: 20,
            fontWeight: 400,
            letterSpacing: 10,
            textTransform: "uppercase",
            marginTop: 28,
            display: "flex",
          }}
        >
          {site.headline.toUpperCase()}
        </div>
      </div>
    ),
    { ...size },
  );
}
