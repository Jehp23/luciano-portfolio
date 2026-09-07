"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useI18n } from "@/components/LocaleProvider";

// ─── Constants ────────────────────────────────────────────────────────────────

const N_SIM = 8000;
const TRADING_DAYS = 252;
const COLORS = ["#FFB000","#6FE3FF","#ff3d9a","#3DD68C","#4ab8ff","#ff7c5c","#b39ddb","#f06292","#aed581","#80deea"];

// ─── Types ────────────────────────────────────────────────────────────────────

interface Asset { ticker: string; weight: string; }
interface Portfolio { weights: number[]; ret: number; vol: number; sharpe: number; }
interface AssetStat { ticker: string; ret: number; vol: number; sharpe: number; }

interface MCResult {
  tickers: string[];
  all: Portfolio[];
  maxSharpe: Portfolio;
  minVol: Portfolio;
  moderate: Portfolio;
  userPortfolio: Portfolio;
  assetStats: AssetStat[];
  corrMatrix: number[][];
  nDays: number;
  rf: number;
}

// ─── Math ─────────────────────────────────────────────────────────────────────

function logReturns(prices: number[]): number[] {
  const r: number[] = [];
  for (let i = 1; i < prices.length; i++) {
    const v = Math.log(prices[i] / prices[i - 1]);
    if (isFinite(v)) r.push(v);
  }
  return r;
}

function mean(arr: number[]): number {
  return arr.reduce((s, v) => s + v, 0) / arr.length;
}

function covMatrix(rets: number[][]): number[][] {
  const n = rets.length;
  const means = rets.map(mean);
  const d = rets[0].length;
  const cov: number[][] = Array.from({ length: n }, () => Array(n).fill(0));
  for (let i = 0; i < n; i++)
    for (let j = i; j < n; j++) {
      let s = 0;
      for (let k = 0; k < d; k++) s += (rets[i][k] - means[i]) * (rets[j][k] - means[j]);
      cov[i][j] = cov[j][i] = (s / (d - 1)) * TRADING_DAYS;
    }
  return cov;
}

function portStats(w: number[], muAnn: number[], cov: number[][], rf: number) {
  const ret = w.reduce((s, wi, i) => s + wi * muAnn[i], 0);
  let v = 0;
  for (let i = 0; i < w.length; i++) for (let j = 0; j < w.length; j++) v += w[i] * w[j] * cov[i][j];
  const vol = Math.sqrt(Math.max(0, v));
  return { ret, vol, sharpe: vol > 0 ? (ret - rf) / vol : -Infinity };
}

function runMC(prices: number[][], userWeights: number[], rf: number): MCResult {
  const rets = prices.map(logReturns);
  const nDays = Math.min(...rets.map((r) => r.length));
  const aligned = rets.map((r) => r.slice(-nDays));
  const muAnn = aligned.map((r) => mean(r) * TRADING_DAYS);
  const cov = covMatrix(aligned);
  const n = prices.length;

  // Individual asset statistics
  const assetStats: AssetStat[] = muAnn.map((mu, i) => {
    const vol = Math.sqrt(Math.max(0, cov[i][i]));
    return { ticker: "", ret: mu, vol, sharpe: vol > 0 ? (mu - rf) / vol : 0 };
  });

  // Correlation matrix (from covariance)
  const corrMatrix = cov.map((row, i) =>
    row.map((c, j) => {
      const denom = Math.sqrt(cov[i][i]) * Math.sqrt(cov[j][j]);
      return denom > 0 ? c / denom : (i === j ? 1 : 0);
    })
  );

  // Monte Carlo — Dirichlet sampling via exponential trick
  const all: Portfolio[] = [];
  for (let s = 0; s < N_SIM; s++) {
    const raw = Array.from({ length: n }, () => -Math.log(Math.random() + 1e-10));
    const sum = raw.reduce((a, b) => a + b, 0);
    const weights = raw.map((v) => v / sum);
    all.push({ weights, ...portStats(weights, muAnn, cov, rf) });
  }

  const validAll = all.filter((p) => isFinite(p.sharpe));
  const maxSharpe = validAll.reduce((b, p) => (p.sharpe > b.sharpe ? p : b), validAll[0]);
  const minVol = validAll.reduce((b, p) => (p.vol < b.vol ? p : b), validAll[0]);

  // Moderate: midpoint Sharpe between tangent and GMV portfolios
  const targetSharpe = (maxSharpe.sharpe + minVol.sharpe) / 2;
  const moderate = validAll.reduce((b, p) =>
    Math.abs(p.sharpe - targetSharpe) < Math.abs(b.sharpe - targetSharpe) ? p : b, validAll[0]);

  const userPortfolio = { weights: userWeights, ...portStats(userWeights, muAnn, cov, rf) };

  return { tickers: [], all: validAll, maxSharpe, minVol, moderate, userPortfolio, assetStats, corrMatrix, nDays, rf };
}

// ─── Pie Chart ────────────────────────────────────────────────────────────────

function drawPie(canvas: HTMLCanvasElement, assets: { ticker: string; w: number }[]) {
  const dpr = window.devicePixelRatio || 1;
  const S = canvas.clientWidth;
  if (S === 0) return;
  canvas.width = S * dpr;
  canvas.height = S * dpr;
  const ctx = canvas.getContext("2d")!;
  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, S, S);

  const total = assets.reduce((s, a) => s + a.w, 0);
  const cx = S / 2, cy = S / 2, r = S * 0.4, ri = r * 0.56;
  let angle = -Math.PI / 2;

  assets.forEach((a, i) => {
    if (a.w <= 0) return;
    const slice = (a.w / Math.max(total, 1)) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, r, angle, angle + slice);
    ctx.closePath();
    ctx.fillStyle = COLORS[i % COLORS.length];
    ctx.fill();
    if (slice > 0.22) {
      const mid = angle + slice / 2;
      ctx.fillStyle = "#020509";
      ctx.font = `bold ${Math.max(9, S * 0.036)}px monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(a.ticker, cx + r * 0.72 * Math.cos(mid), cy + r * 0.72 * Math.sin(mid));
    }
    angle += slice;
  });

  ctx.beginPath();
  ctx.arc(cx, cy, ri, 0, Math.PI * 2);
  ctx.fillStyle = "#0a0c14";
  ctx.fill();

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const pct = total > 0 ? Math.min(total, 100).toFixed(0) + "%" : "0%";
  ctx.fillStyle = total > 101 ? "#ff3a5c" : total >= 99 ? "#3DD68C" : "#e8ecf2";
  ctx.font = `bold ${S * 0.1}px monospace`;
  ctx.fillText(pct, cx, cy - S * 0.04);
  ctx.fillStyle = "#6b7689";
  ctx.font = `${S * 0.052}px monospace`;
  ctx.fillText("total", cx, cy + S * 0.07);
}

// ─── Frontier Chart ───────────────────────────────────────────────────────────

function sharpeColor(t: number): string {
  const clamped = Math.max(0, Math.min(1, t));
  if (clamped < 0.5) return `rgb(255,${Math.round(176 * clamped * 2)},0)`;
  const u = (clamped - 0.5) * 2;
  return `rgb(${Math.round(255 - 194 * u)},${Math.round(176 + 38 * u)},${Math.round(140 * u)})`;
}

type FrontierLabels = {
  yours: string;
  axisX: string;
  axisY: string;
  legend: readonly string[];
};

function drawFrontier(canvas: HTMLCanvasElement, result: MCResult, labels: FrontierLabels) {
  const dpr = window.devicePixelRatio || 1;
  const W = canvas.clientWidth, H = canvas.clientHeight;
  if (W === 0 || H === 0) return;
  canvas.width = W * dpr;
  canvas.height = H * dpr;
  const ctx = canvas.getContext("2d")!;
  ctx.scale(dpr, dpr);

  const PAD = { t: 28, r: 28, b: 60, l: 68 };
  const cW = W - PAD.l - PAD.r, cH = H - PAD.t - PAD.b;
  const { all, maxSharpe, minVol, moderate, userPortfolio, rf } = result;

  const allPts = [...all, userPortfolio];
  const xMin = Math.min(...allPts.map((p) => p.vol)) * 0.88;
  const xMax = Math.max(...allPts.map((p) => p.vol)) * 1.08;
  const yMin = Math.min(...allPts.map((p) => p.ret)) * (Math.min(...allPts.map((p) => p.ret)) < 0 ? 1.12 : 0.84);
  const yMax = Math.max(...allPts.map((p) => p.ret)) * 1.1;
  const sMin = Math.min(...all.map((p) => p.sharpe));
  const sMax = Math.max(...all.map((p) => p.sharpe));

  const cx = (v: number) => PAD.l + ((v - xMin) / (xMax - xMin)) * cW;
  const cy = (r: number) => PAD.t + cH - ((r - yMin) / (yMax - yMin)) * cH;

  // Background
  ctx.fillStyle = "#05070a";
  ctx.fillRect(0, 0, W, H);

  // Grid
  ctx.strokeStyle = "#131826";
  ctx.lineWidth = 1;
  for (let i = 0; i <= 5; i++) { const y = PAD.t + (i / 5) * cH; ctx.beginPath(); ctx.moveTo(PAD.l, y); ctx.lineTo(W - PAD.r, y); ctx.stroke(); }
  for (let i = 0; i <= 6; i++) { const x = PAD.l + (i / 6) * cW; ctx.beginPath(); ctx.moveTo(x, PAD.t); ctx.lineTo(x, H - PAD.b); ctx.stroke(); }

  // Zero-return reference line
  if (yMin < 0 && yMax > 0) {
    const y0 = cy(0);
    ctx.strokeStyle = "#2a3550";
    ctx.setLineDash([3, 4]);
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(PAD.l, y0); ctx.lineTo(W - PAD.r, y0); ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = "#2a3550";
    ctx.font = "9px monospace";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillText("0%", PAD.l + 4, y0 - 7);
  }

  // Scatter — portfolios colored by Sharpe ratio
  const sorted = [...all].sort((a, b) => a.sharpe - b.sharpe);
  for (const p of sorted) {
    const x = cx(p.vol), y = cy(p.ret);
    if (!isFinite(x) || !isFinite(y)) continue;
    const t = (p.sharpe - sMin) / (sMax - sMin || 1);
    ctx.fillStyle = sharpeColor(t) + "cc";
    ctx.beginPath();
    ctx.arc(x, y, 2.8, 0, Math.PI * 2);
    ctx.fill();
  }

  // Efficient frontier line — upper envelope (monotonically increasing return)
  {
    const volMin = Math.min(...all.map((p) => p.vol));
    const volMax = Math.max(...all.map((p) => p.vol));
    const step = (volMax - volMin) / 80;
    const bucketBest: Portfolio[] = [];
    for (let i = 0; i < 80; i++) {
      const lo = volMin + i * step, hi = lo + step;
      const bucket = all.filter((p) => p.vol >= lo && p.vol < hi);
      if (bucket.length > 0) bucketBest.push(bucket.reduce((b, p) => (p.ret > b.ret ? p : b), bucket[0]));
    }
    bucketBest.sort((a, b) => a.vol - b.vol);
    const frontierPts: Portfolio[] = [];
    let runMax = -Infinity;
    for (const p of bucketBest) {
      if (p.ret >= runMax) { runMax = p.ret; frontierPts.push(p); }
    }
    if (frontierPts.length > 1) {
      ctx.strokeStyle = "rgba(255,255,255,0.5)";
      ctx.lineWidth = 1.5;
      ctx.setLineDash([6, 5]);
      ctx.lineJoin = "round";
      ctx.beginPath();
      frontierPts.forEach((p, i) => {
        const x = cx(p.vol), y = cy(p.ret);
        if (!isFinite(x) || !isFinite(y)) return;
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      });
      ctx.stroke();
      ctx.setLineDash([]);
    }
  }

  // CML — Capital Market Line: passes through (0, rf) and (maxSharpe.vol, maxSharpe.ret)
  {
    const slope = (maxSharpe.ret - rf) / maxSharpe.vol;
    const pts: [number, number][] = [];
    for (let vi = xMin; vi <= xMax; vi += (xMax - xMin) / 200) {
      const ri = rf + slope * vi;
      if (ri >= yMin && ri <= yMax) pts.push([cx(vi), cy(ri)]);
    }
    if (pts.length > 1) {
      ctx.strokeStyle = "rgba(255,176,0,0.3)";
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 5]);
      ctx.beginPath();
      pts.forEach(([x, y], i) => { if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y); });
      ctx.stroke();
      ctx.setLineDash([]);
      // CML label
      const [lx, ly] = pts[Math.floor(pts.length * 0.75)];
      ctx.fillStyle = "rgba(255,176,0,0.55)";
      ctx.font = "9px monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "bottom";
      ctx.fillText("CML", lx, ly - 4);
    }
  }

  // User portfolio marker
  {
    const x = cx(userPortfolio.vol), y = cy(userPortfolio.ret);
    if (isFinite(x) && isFinite(y)) {
      ctx.fillStyle = "rgba(255,255,255,0.12)";
      ctx.strokeStyle = "rgba(255,255,255,0.6)";
      ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.arc(x, y, 7, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      ctx.fillStyle = "#c0c8d8";
      ctx.font = "9px monospace";
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      ctx.fillText(labels.yours, x + 11, y);
    }
  }

  // Moderate portfolio
  {
    const x = cx(moderate.vol), y = cy(moderate.ret);
    if (isFinite(x) && isFinite(y)) {
      ctx.fillStyle = "#3DD68C";
      ctx.beginPath(); ctx.arc(x, y, 7, 0, Math.PI * 2); ctx.fill();
    }
  }

  // Minimum variance (GMV)
  {
    const x = cx(minVol.vol), y = cy(minVol.ret);
    if (isFinite(x) && isFinite(y)) {
      ctx.fillStyle = "#6FE3FF";
      ctx.beginPath(); ctx.arc(x, y, 7, 0, Math.PI * 2); ctx.fill();
    }
  }

  // Tangency portfolio (max Sharpe) — star marker
  {
    const x = cx(maxSharpe.vol), y = cy(maxSharpe.ret);
    if (isFinite(x) && isFinite(y)) {
      ctx.fillStyle = "#FFB000";
      ctx.shadowColor = "rgba(255,176,0,0.55)";
      ctx.shadowBlur = 14;
      ctx.beginPath();
      for (let i = 0; i < 10; i++) {
        const rr = i % 2 === 0 ? 10 : 4.5, a = (i * Math.PI) / 5 - Math.PI / 2;
        if (i === 0) ctx.moveTo(x + rr * Math.cos(a), y + rr * Math.sin(a));
        else ctx.lineTo(x + rr * Math.cos(a), y + rr * Math.sin(a));
      }
      ctx.closePath(); ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  // Axis tick labels
  ctx.fillStyle = "#6b7689";
  ctx.font = "11px monospace";
  ctx.textBaseline = "middle";
  ctx.textAlign = "right";
  for (let i = 0; i <= 5; i++) {
    const v = yMin + ((5 - i) / 5) * (yMax - yMin);
    ctx.fillText((v * 100).toFixed(1) + "%", PAD.l - 8, PAD.t + (i / 5) * cH);
  }
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  for (let i = 0; i <= 6; i++) {
    const v = xMin + (i / 6) * (xMax - xMin);
    ctx.fillText((v * 100).toFixed(1) + "%", PAD.l + (i / 6) * cW, H - PAD.b + 8);
  }

  // Axis titles
  ctx.fillStyle = "#4a5468";
  ctx.font = "10px monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "bottom";
  ctx.fillText(labels.axisX, PAD.l + cW / 2, H - 4);
  ctx.save();
  ctx.translate(14, PAD.t + cH / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.textBaseline = "top";
  ctx.fillText(labels.axisY, 0, 0);
  ctx.restore();

  // Legend
  const legendColors = ["#FFB000", "#6FE3FF", "#3DD68C", "rgba(255,255,255,0.6)", "rgba(255,176,0,0.35)"];
  const legendItems: [string, string][] = legendColors.map((color, i) => [color, labels.legend[i] ?? ""]);
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.font = "9.5px monospace";
  legendItems.forEach(([color, label], i) => {
    ctx.fillStyle = color;
    ctx.fillText(label, PAD.l + 8, PAD.t + 14 + i * 16);
  });
}

// ─── Correlation color ────────────────────────────────────────────────────────

function corrBg(r: number): string {
  if (r >= 0.9) return "rgba(255,58,92,0.55)";
  if (r >= 0.7) return "rgba(255,120,0,0.4)";
  if (r >= 0.4) return "rgba(255,176,0,0.28)";
  if (r >= 0.1) return "rgba(100,100,120,0.18)";
  if (r < 0)    return "rgba(91,184,255,0.35)";
  return "transparent";
}

// ─── Component ────────────────────────────────────────────────────────────────

const DEFAULT: Asset[] = [
  { ticker: "GGAL", weight: "30" },
  { ticker: "YPFD", weight: "25" },
  { ticker: "AAPL", weight: "25" },
  { ticker: "AL30", weight: "20" },
];

export default function PortfolioOptimizer() {
  const { locale, t } = useI18n();
  const [assets, setAssets] = useState<Asset[]>(DEFAULT);
  const [rfInput, setRfInput] = useState("40");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<MCResult | null>(null);
  const pieRef = useRef<HTMLCanvasElement>(null);
  const frontierRef = useRef<HTMLCanvasElement>(null);
  const chartLabels = useMemo(
    () => ({
      yours: t.opt.chartYours,
      axisX: t.opt.chartX,
      axisY: t.opt.chartY,
      legend: t.opt.chartLegend,
    }),
    [t.opt],
  );

  const parsed = assets.map((a) => ({
    ticker: a.ticker.trim().toUpperCase(),
    w: parseFloat(a.weight) || 0,
  }));
  const total = parsed.reduce((s, a) => s + a.w, 0);
  const rf = (parseFloat(rfInput) || 0) / 100;
  const valid = parsed.filter((a) => a.ticker).length >= 2 && Math.abs(total - 100) <= 1;

  useEffect(() => {
    if (!pieRef.current) return;
    drawPie(pieRef.current, parsed);
  });

  useEffect(() => {
    if (!result || !frontierRef.current) return;
    drawFrontier(frontierRef.current, result, chartLabels);
  }, [result, locale, chartLabels]);

  useEffect(() => {
    if (!result || !frontierRef.current) return;
    const obs = new ResizeObserver(() => {
      if (frontierRef.current && result) drawFrontier(frontierRef.current, result, chartLabels);
    });
    obs.observe(frontierRef.current);
    return () => obs.disconnect();
  }, [result, locale, chartLabels]);

  function updateAsset(i: number, field: keyof Asset, value: string) {
    setAssets((prev) => prev.map((a, idx) => (idx === i ? { ...a, [field]: value } : a)));
  }
  function addRow() { setAssets((prev) => [...prev, { ticker: "", weight: "" }]); }
  function removeRow(i: number) { setAssets((prev) => prev.filter((_, idx) => idx !== i)); }

  async function optimize() {
    const tickers = parsed.filter((a) => a.ticker).map((a) => a.ticker);
    const weights = parsed.filter((a) => a.ticker).map((a) => a.w / 100);
    if (tickers.length < 2) { setError(t.opt.errMin); return; }
    if (Math.abs(total - 100) > 1) { setError(t.opt.errWeights(total.toFixed(1))); return; }

    setLoading(true); setError(null); setResult(null);
    try {
      const res = await fetch("/api/portfolio/optimize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tickers }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? t.opt.errData); return; }
      const mc = runMC(data.prices as number[][], weights, rf);
      mc.tickers = data.tickers;
      mc.assetStats.forEach((s, i) => { s.ticker = data.tickers[i]; });
      setResult(mc);
    } catch { setError(t.opt.errConn); }
    finally { setLoading(false); }
  }

  const pct = (n: number, d = 2) => (n * 100).toFixed(d) + "%";
  const fmt2 = (n: number) => n.toFixed(2);

  const RECS = result
    ? [
        { ...t.opt.recItems[0], p: result.maxSharpe, color: "var(--amber)" },
        { ...t.opt.recItems[1], p: result.moderate, color: "var(--up)" },
        { ...t.opt.recItems[2], p: result.minVol, color: "var(--cyan)" },
      ]
    : [];

  return (
    <div>
      <h2 className="section-h" style={{ marginBottom: 4 }}>
        {t.opt.title}{" "}
        <span className="badge">{t.opt.badge}</span>
      </h2>
      <p style={{ fontSize: 11, color: "var(--dim-2)", marginBottom: 20, lineHeight: 1.6 }}>
        {t.opt.intro(N_SIM.toLocaleString(locale === "en" ? "en-US" : "es-AR"), TRADING_DAYS)}
      </p>

      <div className="opt-main-grid">
        {/* Left: asset table + RF input */}
        <div>
          <div className="opt-label" style={{ marginBottom: 10 }}>{t.opt.composition}</div>
          <table className="opt-table">
            <thead>
              <tr>
                <th>{t.opt.asset}</th>
                <th>{t.opt.weight}</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {assets.map((a, i) => (
                <tr key={i}>
                  <td>
                    <input
                      className="opt-cell-input"
                      value={a.ticker}
                      onChange={(e) => updateAsset(i, "ticker", e.target.value.toUpperCase())}
                      placeholder={t.opt.placeholder}
                      maxLength={8}
                      spellCheck={false}
                    />
                  </td>
                  <td>
                    <input
                      className="opt-cell-input"
                      type="number"
                      min={0}
                      max={100}
                      step={0.1}
                      value={a.weight}
                      onChange={(e) => updateAsset(i, "weight", e.target.value)}
                      placeholder="0"
                    />
                  </td>
                  <td>
                    <button className="opt-remove" onClick={() => removeRow(i)}>✕</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ display: "flex", gap: 10, marginTop: 10, alignItems: "center" }}>
            <button className="opt-add-btn" onClick={addRow}>{t.opt.add}</button>
            <span style={{
              fontSize: 12,
              color: Math.abs(total - 100) <= 1 ? "var(--up)" : total > 100 ? "var(--red)" : "var(--dim)",
            }}>
              Σ = {total.toFixed(1)}%
            </span>
          </div>

          {/* RF input */}
          <div style={{ marginTop: 20, display: "flex", alignItems: "flex-end", gap: 12 }}>
            <div style={{ flex: 1 }}>
              <div className="opt-label" style={{ marginBottom: 6 }}>{t.opt.rf}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <input
                  className="opt-cell-input"
                  type="number"
                  min={0}
                  max={200}
                  step={0.5}
                  value={rfInput}
                  onChange={(e) => setRfInput(e.target.value)}
                  style={{ maxWidth: 80 }}
                />
                <span style={{ color: "var(--dim)", fontSize: 13 }}>{t.opt.rfUnit}</span>
              </div>
              <p style={{ fontSize: 10, color: "var(--dim-2)", marginTop: 5, lineHeight: 1.5 }}>
                {t.opt.rfHint}
              </p>
            </div>
          </div>

          <div style={{ marginTop: 20 }}>
            <button
              className="btn"
              onClick={optimize}
              disabled={loading || !valid}
              style={{ width: "100%", opacity: valid ? 1 : 0.5 }}
            >
              {loading ? t.opt.calculating : t.opt.calc}
            </button>
            {!valid && !loading && (
              <p className="opt-hint" style={{ marginTop: 8 }}>
                {total < 99
                  ? t.opt.needMore((100 - total).toFixed(1))
                  : total > 101
                  ? t.opt.tooMuch((total - 100).toFixed(1))
                  : t.opt.minAssets}
              </p>
            )}
          </div>

          {error && <div className="opt-error" style={{ marginTop: 12 }}>{error}</div>}

          <p className="opt-hint" style={{ marginTop: 14 }}>
            {t.opt.supports}
          </p>
        </div>

        {/* Right: pie chart */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
          <div className="opt-label">{t.opt.distribution}</div>
          <canvas ref={pieRef} style={{ width: "100%", maxWidth: 230, aspectRatio: "1", height: "auto" }} />
          <div style={{ display: "flex", flexWrap: "wrap", gap: "5px 12px", justifyContent: "center" }}>
            {parsed.filter((a) => a.ticker && a.w > 0).map((a, i) => (
              <span key={a.ticker} style={{ fontSize: 11, color: COLORS[i % COLORS.length], display: "flex", alignItems: "center", gap: 5 }}>
                <span style={{ width: 7, height: 7, background: COLORS[i % COLORS.length], display: "inline-block", borderRadius: 1 }} />
                {a.ticker} {a.w.toFixed(1)}%
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Results ─────────────────────────────────────────────────────────── */}
      {result && (
        <div style={{ marginTop: 36 }}>

          {/* Individual asset statistics */}
          <div className="opt-label" style={{ marginBottom: 10 }}>{t.opt.stats}</div>
          <div style={{ overflowX: "auto", marginBottom: 28 }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
              <thead>
                <tr style={{ color: "var(--dim)", fontSize: 10, letterSpacing: 2 }}>
                  {t.opt.statHeaders.map((h) => (
                    <th key={h} style={{ textAlign: h === t.opt.statHeaders[0] ? "left" : "right", padding: "6px 12px 10px", borderBottom: "1px solid var(--border)", whiteSpace: "nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {result.assetStats.map((s, i) => (
                  <tr key={s.ticker} style={{ borderBottom: "1px solid var(--border)" }}>
                    <td style={{ padding: "9px 12px", color: COLORS[i % COLORS.length], fontWeight: 700 }}>{s.ticker}</td>
                    <td style={{ padding: "9px 12px", textAlign: "right", color: s.ret >= 0 ? "var(--up)" : "var(--red)" }}>{pct(s.ret)}</td>
                    <td style={{ padding: "9px 12px", textAlign: "right", color: "var(--text-hi)" }}>{pct(s.vol)}</td>
                    <td style={{ padding: "9px 12px", textAlign: "right", color: s.sharpe >= 0 ? "var(--text-hi)" : "var(--dim)" }}>{fmt2(s.sharpe)}</td>
                    <td style={{ padding: "9px 12px", textAlign: "right", color: "var(--dim)" }}>
                      {pct(parsed.find((a) => a.ticker === s.ticker)?.w ?? 0, 1).replace("%", "pp")}
                    </td>
                  </tr>
                ))}
                {/* User portfolio row */}
                <tr style={{ background: "rgba(255,255,255,0.03)", borderTop: "1px solid var(--border-hi)" }}>
                  <td style={{ padding: "9px 12px", color: "var(--text-hi)", fontWeight: 700 }}>{t.opt.currentPortfolio}</td>
                  <td style={{ padding: "9px 12px", textAlign: "right", color: result.userPortfolio.ret >= 0 ? "var(--up)" : "var(--red)" }}>{pct(result.userPortfolio.ret)}</td>
                  <td style={{ padding: "9px 12px", textAlign: "right", color: "var(--text-hi)" }}>{pct(result.userPortfolio.vol)}</td>
                  <td style={{ padding: "9px 12px", textAlign: "right", color: "var(--text-hi)", fontWeight: 700 }}>{fmt2(result.userPortfolio.sharpe)}</td>
                  <td style={{ padding: "9px 12px", textAlign: "right", color: "var(--dim)" }}>100pp</td>
                </tr>
              </tbody>
            </table>
            <p style={{ fontSize: 10, color: "var(--dim-2)", marginTop: 6 }}>
              {t.opt.sharpeNote(pct(result.rf), result.nDays)}
            </p>
          </div>

          {/* Correlation matrix */}
          <div className="opt-label" style={{ marginBottom: 10 }}>{t.opt.corr}</div>
          <div style={{ overflowX: "auto", marginBottom: 28 }}>
            <table style={{ borderCollapse: "collapse", fontSize: 12 }}>
              <thead>
                <tr>
                  <th style={{ padding: "6px 12px", color: "var(--dim)", fontSize: 10, textAlign: "left", borderBottom: "1px solid var(--border)" }} />
                  {result.tickers.map((t, i) => (
                    <th key={t} style={{ padding: "6px 12px", color: COLORS[i % COLORS.length], fontSize: 11, letterSpacing: 1, borderBottom: "1px solid var(--border)", textAlign: "center" }}>{t}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {result.corrMatrix.map((row, i) => (
                  <tr key={i}>
                    <td style={{ padding: "7px 12px", color: COLORS[i % COLORS.length], fontWeight: 700, fontSize: 11, whiteSpace: "nowrap", borderBottom: "1px solid var(--border)" }}>
                      {result.tickers[i]}
                    </td>
                    {row.map((r, j) => (
                      <td
                        key={j}
                        style={{
                          padding: "7px 14px",
                          textAlign: "center",
                          background: i === j ? "rgba(255,176,0,0.12)" : corrBg(r),
                          color: i === j ? "var(--amber)" : "var(--text-hi)",
                          fontWeight: i === j ? 700 : 400,
                          fontSize: 12,
                          borderBottom: "1px solid var(--border)",
                        }}
                      >
                        {r.toFixed(2)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <p style={{ fontSize: 10, color: "var(--dim-2)", marginTop: 6 }}>
              {t.opt.corrNote}
            </p>
          </div>

          {/* Efficient frontier chart */}
          <div className="opt-label" style={{ marginBottom: 10 }}>{t.opt.frontier}</div>
          <canvas
            ref={frontierRef}
            style={{ width: "100%", height: "clamp(300px, 42vw, 460px)", display: "block", borderRadius: 3 }}
          />
          <p style={{ fontSize: 10, color: "var(--dim-2)", marginTop: 6 }}>
            {t.opt.frontierNote}
          </p>

          {/* 3 recommended portfolios */}
          <div className="opt-label" style={{ margin: "28px 0 12px" }}>{t.opt.recs}</div>
          <div className="opt-recs-grid">
            {RECS.map(({ label, sub, p, color }) => (
              <div key={label} className="panel" style={{ borderColor: color + "44" }}>
                <div className="panel-h" style={{ flexDirection: "column", alignItems: "flex-start", gap: 2 }}>
                  <span className="ticker-name" style={{ color }}>{label}</span>
                  <span style={{ fontSize: 10, color: "var(--dim)", letterSpacing: 1 }}>{sub}</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, margin: "14px 0 16px" }}>
                  {[["E[r]", pct(p.ret)], ["σ", pct(p.vol)], ["Sharpe", fmt2(p.sharpe)]].map(([l, v]) => (
                    <div key={l}>
                      <div style={{ fontSize: 9, color: "var(--dim)", letterSpacing: 2, marginBottom: 3 }}>{l}</div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text-hi)" }}>{v}</div>
                    </div>
                  ))}
                </div>
                {result.tickers.map((t, i) => (
                  <div key={t} style={{ marginBottom: 7 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 3 }}>
                      <span style={{ color: COLORS[i % COLORS.length], fontWeight: 700 }}>{t}</span>
                      <span style={{ color: "var(--text-hi)" }}>{pct(p.weights[i])}</span>
                    </div>
                    <div style={{ background: "var(--border)", height: 4, borderRadius: 2, overflow: "hidden" }}>
                      <div style={{ background: COLORS[i % COLORS.length], width: pct(p.weights[i]), height: "100%", borderRadius: 2 }} />
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <p style={{ fontSize: 10, color: "var(--dim-2)", marginTop: 14, lineHeight: 1.6 }}>
            {t.opt.disclaimer}
          </p>
        </div>
      )}
    </div>
  );
}
