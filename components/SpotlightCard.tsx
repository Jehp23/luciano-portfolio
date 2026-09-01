"use client";

import type { CSSProperties, PointerEvent, ReactNode } from "react";

export default function SpotlightCard({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  function onMove(event: PointerEvent<HTMLElement>) {
    const el = event.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    el.style.setProperty("--my", `${event.clientY - rect.top}px`);
  }

  return (
    <article data-reveal className={className} style={style} onPointerMove={onMove}>
      {children}
    </article>
  );
}
