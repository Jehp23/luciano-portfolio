import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Luciano Lazarte · Desarrollador Fintech & IA";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const META = [
  { label: "ROL", val: "AI DEVELOPER" },
  { label: "EMPRESA", val: "PonchoCapital" },
  { label: "FOCO", val: "Fintech · IA" },
  { label: "STACK", val: "Python · TypeScript" },
];

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#05060a",
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Ambient glow — top left */}
        <div
          style={{
            position: "absolute",
            top: -160,
            left: -160,
            width: 600,
            height: 600,
            background: "rgba(255,176,0,0.07)",
            borderRadius: 9999,
          }}
        />

        {/* Ambient glow — bottom right */}
        <div
          style={{
            position: "absolute",
            bottom: -200,
            right: -100,
            width: 500,
            height: 500,
            background: "rgba(91,184,255,0.04)",
            borderRadius: 9999,
          }}
        />

        {/* Corner bracket — top left */}
        <div style={{ position: "absolute", top: 48, left: 48, display: "flex", flexDirection: "column" }}>
          <div style={{ width: 36, height: 3, background: "#FFB000" }} />
          <div style={{ width: 3, height: 33, background: "#FFB000" }} />
        </div>

        {/* Corner bracket — bottom right */}
        <div style={{ position: "absolute", bottom: 48, right: 48, display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
          <div style={{ width: 3, height: 33, background: "#FFB000" }} />
          <div style={{ width: 36, height: 3, background: "#FFB000" }} />
        </div>

        {/* Grid lines — decorative vertical */}
        {[0.3, 0.6, 0.75, 0.88].map((x) => (
          <div
            key={x}
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: `${x * 100}%`,
              width: 1,
              background: "rgba(31,39,56,0.6)",
            }}
          />
        ))}

        {/* Horizontal line */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: "62%",
            height: 1,
            background: "rgba(31,39,56,0.8)",
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "72px 88px",
            width: "75%",
          }}
        >
          {/* Tag line */}
          <div
            style={{
              color: "#4a5468",
              fontSize: 14,
              letterSpacing: 5,
              marginBottom: 28,
              display: "flex",
            }}
          >
            SALTA · ARGENTINA {"  //  "} PORTFOLIO
          </div>

          {/* Name */}
          <div
            style={{
              color: "#FFB000",
              fontSize: 96,
              fontWeight: 700,
              letterSpacing: -1,
              lineHeight: 0.95,
              display: "flex",
            }}
          >
            LUCIANO
          </div>
          <div
            style={{
              color: "#e8ecf2",
              fontSize: 96,
              fontWeight: 700,
              letterSpacing: -1,
              lineHeight: 0.95,
              marginBottom: 32,
              display: "flex",
            }}
          >
            LAZARTE
          </div>

          {/* Description */}
          <div
            style={{
              color: "#6b7689",
              fontSize: 20,
              letterSpacing: 1,
              display: "flex",
              marginBottom: "auto",
            }}
          >
            Desarrollador · Fintech & Inteligencia Artificial Aplicada
          </div>

          {/* Meta cells */}
          <div style={{ display: "flex", gap: 12, marginTop: 40 }}>
            {META.map(({ label, val }) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 5,
                  background: "rgba(255,176,0,0.06)",
                  border: "1px solid rgba(255,176,0,0.18)",
                  padding: "10px 16px",
                }}
              >
                <div style={{ color: "#4a5468", fontSize: 9, letterSpacing: 4, display: "flex" }}>
                  {label}
                </div>
                <div style={{ color: "#FFB000", fontSize: 13, fontWeight: 700, display: "flex" }}>
                  {val}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — large decorative initials */}
        <div
          style={{
            position: "absolute",
            right: 56,
            top: 0,
            bottom: 0,
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            style={{
              color: "rgba(255,176,0,0.04)",
              fontSize: 320,
              fontWeight: 700,
              lineHeight: 1,
              display: "flex",
              letterSpacing: -10,
            }}
          >
            LL
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
