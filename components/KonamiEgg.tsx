"use client";

import { useEffect, useRef } from "react";

const CODE = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];

export default function KonamiEgg() {
  const idxRef = useRef(0);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === CODE[idxRef.current]) {
        idxRef.current++;
        if (idxRef.current === CODE.length) {
          document.body.style.transition = "filter 0.4s";
          document.body.style.filter = "hue-rotate(180deg) saturate(1.4)";
          const msg = document.createElement("div");
          msg.textContent = "// EASTER_EGG_FOUND · OK YOU GET IT";
          Object.assign(msg.style, {
            position: "fixed", top: "80px", left: "50%", transform: "translateX(-50%)",
            background: "#000", border: "1px solid var(--magenta)", color: "var(--magenta)",
            padding: "14px 22px", fontFamily: "monospace", fontWeight: "700", fontSize: "12px",
            zIndex: "10000", boxShadow: "0 0 30px var(--magenta)", letterSpacing: "2px",
          });
          document.body.appendChild(msg);
          setTimeout(() => { msg.remove(); document.body.style.filter = ""; }, 3500);
          idxRef.current = 0;
        }
      } else {
        idxRef.current = 0;
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return null;
}
