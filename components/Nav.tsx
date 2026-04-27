"use client";

import { useEffect, useState } from "react";

const links = [
  { href: "#about", label: "PERFIL" },
  { href: "#market", label: "PERFORMANCE" },
  { href: "#stats", label: "CAPACIDADES" },
  { href: "#projects", label: "PROYECTOS" },
  { href: "#achievements", label: "RECONOCIMIENTOS" },
  { href: "#contact", label: "CONTACTO" },
];

export default function Nav() {
  const [clock, setClock] = useState("--:--:--");

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const pad = (n: number) => String(n).padStart(2, "0");
      setClock(`${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <nav className="main-nav">
      <div className="logo">
        <span className="dot" />
        LUCIANO.LAZARTE
      </div>
      <ul>
        {links.map(({ href, label }) => (
          <li key={href}>
            <a href={href}>{label}</a>
          </li>
        ))}
      </ul>
      <div className="status">ONLINE · {clock}</div>
    </nav>
  );
}
