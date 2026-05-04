import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Luciano Lazarte · Desarrollador Fintech & IA";
export const size = { width: 1200, height: 600 };
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
        <div style={{ position: "absolute", top: -160, left: -160, width: 600, height: 600, background: "rgba(255,176,0,0.07)", borderRadius: 9999 }} />
        <div style={{ position: "absolute", top: 40, left: 40, display: "flex", flexDirection: "column" }}>
          <div style={{ width: 36, height: 3, background: "#FFB000" }} />
          <div style={{ width: 3, height: 33, background: "#FFB000" }} />
        </div>
        <div style={{ position: "absolute", bottom: 40, right: 40, display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
          <div style={{ width: 3, height: 33, background: "#FFB000" }} />
          <div style={{ width: 36, height: 3, background: "#FFB000" }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", padding: "64px 88px", width: "75%" }}>
          <div style={{ color: "#4a5468", fontSize: 13, letterSpacing: 5, marginBottom: 20, display: "flex" }}>
            SALTA · ARGENTINA {"  //  "} PORTFOLIO
          </div>
          <div style={{ color: "#FFB000", fontSize: 88, fontWeight: 700, letterSpacing: -1, lineHeight: 0.95, display: "flex" }}>LUCIANO</div>
          <div style={{ color: "#e8ecf2", fontSize: 88, fontWeight: 700, letterSpacing: -1, lineHeight: 0.95, marginBottom: 24, display: "flex" }}>LAZARTE</div>
          <div style={{ color: "#6b7689", fontSize: 20, letterSpacing: 1, display: "flex", marginBottom: "auto" }}>
            Desarrollador · Fintech & Inteligencia Artificial Aplicada
          </div>
          <div style={{ display: "flex", gap: 12, marginTop: 32 }}>
            {META.map(({ label, val }) => (
              <div key={label} style={{ display: "flex", flexDirection: "column", gap: 5, background: "rgba(255,176,0,0.06)", border: "1px solid rgba(255,176,0,0.18)", padding: "10px 16px" }}>
                <div style={{ color: "#4a5468", fontSize: 9, letterSpacing: 4, display: "flex" }}>{label}</div>
                <div style={{ color: "#FFB000", fontSize: 13, fontWeight: 700, display: "flex" }}>{val}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ position: "absolute", right: 56, top: 0, bottom: 0, display: "flex", alignItems: "center" }}>
          <div style={{ color: "rgba(255,176,0,0.04)", fontSize: 300, fontWeight: 700, lineHeight: 1, display: "flex", letterSpacing: -10 }}>LL</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
