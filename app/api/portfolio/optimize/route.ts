import { NextRequest, NextResponse } from "next/server";

const BASE = "https://data912.com";
const TYPES = ["stocks", "cedears", "bonds"];

interface D912Item { date: string; c: number | string; }

async function fetchData912(ticker: string): Promise<number[] | null> {
  const t = ticker.toUpperCase();

  for (const type of TYPES) {
    try {
      const res = await fetch(`${BASE}/historical/${type}/${t}`, {
        headers: { "User-Agent": "Mozilla/5.0" },
        next: { revalidate: 3600 },
      });
      if (!res.ok) continue;

      const data: D912Item[] = await res.json();
      if (!Array.isArray(data) || data.length < 50) continue;

      // Sort by date ascending (oldest → newest) and extract close prices
      const sorted = [...data].sort((a, b) => a.date.localeCompare(b.date));
      const closes = sorted
        .map((item) => Number(item.c))
        .filter((v) => isFinite(v) && v > 0);

      if (closes.length >= 50) return closes.slice(-365);
    } catch {
      continue;
    }
  }

  return null;
}

export async function POST(req: NextRequest) {
  let tickers: string[];
  try {
    const body = await req.json();
    tickers = body.tickers;
    if (!Array.isArray(tickers) || tickers.length < 2 || tickers.length > 10)
      return NextResponse.json({ error: "Ingresá entre 2 y 10 tickers." }, { status: 400 });
  } catch {
    return NextResponse.json({ error: "Request inválido." }, { status: 400 });
  }

  const results = await Promise.all(tickers.map((t) => fetchData912(t.trim())));

  const failed = tickers.filter((_, i) => results[i] === null);
  if (failed.length > 0)
    return NextResponse.json(
      { error: `No se encontraron datos para: ${failed.join(", ")}. Verificá que sean tickers de BYMA, CEDEARs o bonos argentinos.` },
      { status: 422 }
    );

  const minLen = Math.min(...results.map((r) => r!.length));
  const aligned = results.map((r) => r!.slice(-minLen));

  return NextResponse.json({ tickers, prices: aligned });
}
