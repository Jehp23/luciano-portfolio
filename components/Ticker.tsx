"use client";

const SYMBOLS: [string, number, number][] = [
  ["LULA", 187.42, 7.36], ["BTC", 71284.1, 3.41], ["ETH", 3982.55, 2.18],
  ["AAPL", 241.87, 1.24], ["NVDA", 1342.55, 5.12], ["TSLA", 192.3, -0.82],
  ["SPY", 527.18, 0.45], ["MSFT", 438.92, 1.05], ["MELI", 1820.4, -1.34],
  ["GLOB", 184.2, 2.77], ["ARS/USD", 1142.5, -0.18], ["GOLD", 2741.0, 0.92],
  ["SOL", 184.3, 4.21], ["VIX", 13.84, -2.1], ["META", 584.4, 1.91],
];

function TickerItem({ sym, price, delta }: { sym: string; price: number; delta: number }) {
  const cls = delta >= 0 ? "up" : "down";
  const arrow = delta >= 0 ? "▲" : "▼";
  return (
    <span className="ticker-item">
      <span className="sym">{sym}</span>
      {price.toFixed(2)}
      <span className={cls}>{arrow} {Math.abs(delta).toFixed(2)}%</span>
    </span>
  );
}

export default function Ticker() {
  const items = [...SYMBOLS, ...SYMBOLS];
  return (
    <div className="ticker">
      <div className="ticker-label">LIVE FEED</div>
      <div className="ticker-track">
        {items.map(([sym, price, delta], i) => (
          <TickerItem key={`${sym}-${i}`} sym={sym} price={price} delta={delta} />
        ))}
      </div>
    </div>
  );
}
