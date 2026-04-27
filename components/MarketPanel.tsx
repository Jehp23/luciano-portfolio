"use client";

import { useEffect, useRef, useState } from "react";

interface Candle {
  o: number; h: number; l: number; c: number;
}

function initCandles(): Candle[] {
  let p = 170;
  const arr: Candle[] = [];
  for (let i = 0; i < 48; i++) {
    const o = p;
    const ch = (Math.random() - 0.45) * 4;
    const c = Math.max(150, o + ch);
    const h = Math.max(o, c) + Math.random() * 1.6;
    const l = Math.min(o, c) - Math.random() * 1.6;
    arr.push({ o, h, l, c });
    p = c;
  }
  return arr;
}

function drawCandleChart(canvas: HTMLCanvasElement, candles: Candle[]) {
  const dpr = devicePixelRatio || 1;
  const W = canvas.clientWidth;
  const H = 220;
  canvas.width = W * dpr;
  canvas.height = H * dpr;
  const ctx = canvas.getContext("2d")!;
  ctx.scale(dpr, dpr);

  ctx.fillStyle = "#05070a";
  ctx.fillRect(0, 0, W, H);

  ctx.strokeStyle = "#11161f";
  ctx.lineWidth = 1;
  for (let i = 1; i < 5; i++) {
    ctx.beginPath(); ctx.moveTo(0, i * H / 5); ctx.lineTo(W, i * H / 5); ctx.stroke();
  }
  for (let i = 1; i < 8; i++) {
    ctx.beginPath(); ctx.moveTo(i * W / 8, 0); ctx.lineTo(i * W / 8, H); ctx.stroke();
  }

  const max = Math.max(...candles.map((c) => c.h));
  const min = Math.min(...candles.map((c) => c.l));
  const pad = (max - min) * 0.08;
  const lo = min - pad, hi = max + pad;
  const yy = (v: number) => H - ((v - lo) / (hi - lo)) * H;
  const cw = W / candles.length;

  candles.forEach((c, i) => {
    const x = i * cw + cw / 2;
    const up = c.c >= c.o;
    ctx.strokeStyle = up ? "#22c55e" : "#f87171";
    ctx.fillStyle = up ? "rgba(34,197,94,0.55)" : "rgba(248,113,113,0.65)";
    ctx.beginPath(); ctx.moveTo(x, yy(c.h)); ctx.lineTo(x, yy(c.l)); ctx.stroke();
    const top = yy(Math.max(c.o, c.c));
    const bot = yy(Math.min(c.o, c.c));
    ctx.fillRect(x - cw * 0.32, top, cw * 0.64, Math.max(2, bot - top));
    ctx.strokeRect(x - cw * 0.32, top, cw * 0.64, Math.max(2, bot - top));
  });

  const last = candles[candles.length - 1].c;
  ctx.strokeStyle = "#f0a500";
  ctx.setLineDash([3, 3]);
  ctx.beginPath(); ctx.moveTo(0, yy(last)); ctx.lineTo(W, yy(last)); ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = "#f0a500";
  ctx.fillRect(W - 58, yy(last) - 9, 58, 18);
  ctx.fillStyle = "#020509";
  ctx.font = "bold 11px monospace";
  ctx.textAlign = "center";
  ctx.fillText(last.toFixed(2), W - 29, yy(last) + 4);
}

function initSeries() {
  const series: number[] = [];
  let value = 100;

  for (let i = 0; i < 160; i++) {
    value += (Math.random() - 0.42) * 1.2;
    series.push(value);
  }

  return series;
}

function drawLineChart(canvas: HTMLCanvasElement, series: number[]) {
  const dpr = devicePixelRatio || 1;
  const W = canvas.clientWidth;
  const H = 160;
  canvas.width = W * dpr;
  canvas.height = H * dpr;
  const ctx = canvas.getContext("2d")!;
  ctx.scale(dpr, dpr);

  ctx.fillStyle = "#05070a";
  ctx.fillRect(0, 0, W, H);

  ctx.strokeStyle = "#11161f";
  for (let i = 1; i < 4; i++) {
    ctx.beginPath(); ctx.moveTo(0, i * H / 4); ctx.lineTo(W, i * H / 4); ctx.stroke();
  }

  const max = Math.max(...series), min = Math.min(...series);
  const yy = (v: number) => H - ((v - min) / (max - min || 1)) * H * 0.85 - H * 0.05;

  ctx.strokeStyle = "#2a4060";
  ctx.setLineDash([4, 4]);
  ctx.lineWidth = 1;
  ctx.beginPath();
  series.forEach((_, i) => {
    const x = (i / (series.length - 1)) * W;
    const p = 100 + i * 0.06;
    if (i === 0) {
      ctx.moveTo(x, yy(p));
      return;
    }

    ctx.lineTo(x, yy(p));
  });
  ctx.stroke();
  ctx.setLineDash([]);

  const grad = ctx.createLinearGradient(0, 0, 0, H);
  grad.addColorStop(0, "rgba(240,165,0,0.3)");
  grad.addColorStop(1, "rgba(240,165,0,0)");
  ctx.fillStyle = grad;
  ctx.beginPath();
  series.forEach((point, i) => {
    const x = (i / (series.length - 1)) * W;
    if (i === 0) {
      ctx.moveTo(x, yy(point));
      return;
    }

    ctx.lineTo(x, yy(point));
  });
  ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.closePath(); ctx.fill();

  ctx.strokeStyle = "#f0a500";
  ctx.lineWidth = 2;
  ctx.beginPath();
  series.forEach((point, i) => {
    const x = (i / (series.length - 1)) * W;
    if (i === 0) {
      ctx.moveTo(x, yy(point));
      return;
    }

    ctx.lineTo(x, yy(point));
  });
  ctx.stroke();

  const lx = W, ly = yy(series[series.length - 1]);
  ctx.fillStyle = "#f0a500";
  ctx.beginPath(); ctx.arc(lx, ly, 4, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = "rgba(240,165,0,0.35)";
  ctx.beginPath();
  ctx.arc(lx, ly, 8 + Math.sin(Date.now() / 250) * 2, 0, Math.PI * 2);
  ctx.stroke();
}

function buildOrderBook(mid: number) {
  const asks: { p: number; s: number }[] = [];
  const bids: { p: number; s: number }[] = [];
  for (let i = 0; i < 8; i++) {
    asks.push({ p: mid + 0.05 + i * 0.18 + Math.random() * 0.05, s: Math.floor(Math.random() * 4500 + 200) });
    bids.push({ p: mid - 0.05 - i * 0.18 - Math.random() * 0.05, s: Math.floor(Math.random() * 4500 + 200) });
  }
  return { asks, bids };
}

export default function MarketPanel() {
  const candleCanvasRef = useRef<HTMLCanvasElement>(null);
  const lineCanvasRef = useRef<HTMLCanvasElement>(null);
  const candlesRef = useRef<Candle[]>([]);
  const seriesRef = useRef<number[]>([]);

  const [price, setPrice] = useState("187.42");
  const [delta, setDelta] = useState({ text: "+12.84 (+7.36%)", up: true });
  const [high, setHigh] = useState("189.12");
  const [low, setLow] = useState("172.30");
  const [orderBook, setOrderBook] = useState(() => buildOrderBook(187.42));

  useEffect(() => {
    const candleCanvas = candleCanvasRef.current;
    const lineCanvas = lineCanvasRef.current;

    if (!candleCanvas || !lineCanvas) {
      return;
    }

    if (candlesRef.current.length === 0) {
      candlesRef.current = initCandles();
    }

    if (seriesRef.current.length === 0) {
      seriesRef.current = initSeries();
    }

    drawCandleChart(candleCanvas, candlesRef.current);
    drawLineChart(lineCanvas, seriesRef.current);

    const candleId = setInterval(() => {
      const last = candlesRef.current[candlesRef.current.length - 1];
      last.c += (Math.random() - 0.48) * 0.7;
      last.h = Math.max(last.h, last.c);
      last.l = Math.min(last.l, last.c);
      if (Math.random() < 0.18) {
        const o = last.c;
        const c = o + (Math.random() - 0.45) * 3;
        candlesRef.current.push({ o, h: Math.max(o, c) + Math.random() * 1.5, l: Math.min(o, c) - Math.random() * 1.5, c });
        candlesRef.current.shift();
      }
      const p = last.c;
      const d = p - 174.58;
      const pct = (d / 174.58) * 100;
      setPrice(p.toFixed(2));
      setDelta({ text: `${d >= 0 ? "+" : ""}${d.toFixed(2)} (${pct >= 0 ? "+" : ""}${pct.toFixed(2)}%)`, up: d >= 0 });
      setHigh(Math.max(...candlesRef.current.map((c) => c.h)).toFixed(2));
      setLow(Math.min(...candlesRef.current.map((c) => c.l)).toFixed(2));
      drawCandleChart(candleCanvas, candlesRef.current);
    }, 650);

    const lineId = setInterval(() => {
      const s = seriesRef.current;
      s.push(s[s.length - 1] + (Math.random() - 0.4) * 1.4);
      s.shift();
      drawLineChart(lineCanvas, s);
    }, 800);

    const obId = setInterval(() => {
      const latestPrice = candlesRef.current[candlesRef.current.length - 1]?.c ?? 187.42;
      setOrderBook(buildOrderBook(latestPrice));
    }, 1300);

    const resizeHandler = () => {
      drawCandleChart(candleCanvas, candlesRef.current);
      drawLineChart(lineCanvas, seriesRef.current);
    };
    window.addEventListener("resize", resizeHandler);

    return () => {
      clearInterval(candleId);
      clearInterval(lineId);
      clearInterval(obId);
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  return (
    <section className="block" id="market">
      <div className="section-h">
        PERFORMANCE{" "}
        <span className="badge">
          <span className="live">●</span> SIM · DATOS DE EJEMPLO
        </span>
      </div>

      <div className="market-grid">
        <div className="panel">
          <div className="panel-h">
            <span className="ticker-name">LULA / USD · 1H</span>
            <span>VOL <span style={{ color: "var(--amber)" }}>2.4M</span></span>
          </div>
          <div className="price-hero">
            <span className="big">{price}</span>
            <span className="delta" style={{ color: delta.up ? "var(--green)" : "var(--red)" }}>
              {delta.text}
            </span>
          </div>
          <canvas ref={candleCanvasRef} height={220} />
          <div className="micro-stats">
            <div className="ms"><span className="l">OPEN</span><span className="v">174.58</span></div>
            <div className="ms"><span className="l">HIGH</span><span className="v">{high}</span></div>
            <div className="ms"><span className="l">LOW</span><span className="v">{low}</span></div>
            <div className="ms"><span className="l">MKT CAP</span><span className="v">∞</span></div>
          </div>
        </div>

        <div className="panel">
          <div className="panel-h">
            <span className="ticker-name">ORDER BOOK</span>
            <span>DEPTH 8</span>
          </div>
          <div className="order-book">
            {orderBook && (() => {
              const { asks, bids } = orderBook;
              const maxS = Math.max(...asks.map((a) => a.s), ...bids.map((b) => b.s));
              const spread = asks[asks.length - 1]?.p - bids[0]?.p;
              return (
                <>
                  {[...asks].reverse().map((a, i) => (
                    <div key={`ask-${i}`} className="ob-row ask">
                      <span>{a.p.toFixed(2)}</span>
                      <span>{a.s.toLocaleString()}</span>
                      <span>{(a.p * a.s).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                      <div className="ob-bar" style={{ width: `${(a.s / maxS) * 100}%` }} />
                    </div>
                  ))}
                  <div className="ob-spread">SPREAD {spread?.toFixed(2)}</div>
                  {bids.map((b, i) => (
                    <div key={`bid-${i}`} className="ob-row bid">
                      <span>{b.p.toFixed(2)}</span>
                      <span>{b.s.toLocaleString()}</span>
                      <span>{(b.p * b.s).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                      <div className="ob-bar" style={{ width: `${(b.s / maxS) * 100}%` }} />
                    </div>
                  ))}
                </>
              );
            })()}
          </div>
        </div>
      </div>

      <div style={{ marginTop: 18 }} className="panel">
        <div className="panel-h">
          <span className="ticker-name">PORTFOLIO_PERFORMANCE · YTD</span>
          <span><span className="up">+47.3%</span> vs SPY +9.1%</span>
        </div>
        <canvas ref={lineCanvasRef} height={160} />
      </div>
    </section>
  );
}
