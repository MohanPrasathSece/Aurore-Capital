import { useEffect, useState } from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

const initialTickers = [
  { symbol: "BTC/USDT", price: 64820.50, change: 2.45, isUp: true },
  { symbol: "ETH/USDT", price: 3492.15, change: 1.82, isUp: true },
  { symbol: "SOL/USDT", price: 142.30, change: -0.45, isUp: false },
  { symbol: "BNB/USDT", price: 589.40, change: 0.20, isUp: true },
  { symbol: "XRP/USDT", price: 0.62, change: -1.15, isUp: false },
  { symbol: "DOGE/USDT", price: 0.16, change: 5.40, isUp: true },
  { symbol: "ADA/USDT", price: 0.45, change: -0.80, isUp: false },
  { symbol: "AVAX/USDT", price: 35.80, change: 3.20, isUp: true },
  { symbol: "LINK/USDT", price: 18.25, change: 1.10, isUp: true },
  { symbol: "DOT/USDT", price: 7.15, change: -0.30, isUp: false },
];

export function CryptoTicker() {
  const [tickers, setTickers] = useState(initialTickers);

  // Simulate live price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTickers(current => 
        current.map(ticker => {
          const volatility = ticker.price * 0.0005; // 0.05% max move per tick
          const move = (Math.random() - 0.5) * volatility;
          const newPrice = ticker.price + move;
          const newChange = ticker.change + (move / ticker.price) * 100;
          return {
            ...ticker,
            price: newPrice,
            change: newChange,
            isUp: newChange >= 0
          };
        })
      );
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full border-y border-white/5 bg-black/40 backdrop-blur-xl overflow-hidden py-2.5">
      <div className="flex whitespace-nowrap animate-marquee">
        {/* Render twice for seamless infinite scroll */}
        {[...tickers, ...tickers].map((ticker, i) => (
          <div key={i} className="flex items-center gap-3 px-8 border-r border-white/10 last:border-0">
            <span className="text-sm font-bold text-white/90">{ticker.symbol}</span>
            <span className="font-mono text-sm text-white/80">
              ${ticker.price >= 10 ? ticker.price.toFixed(2) : ticker.price.toFixed(4)}
            </span>
            <span className={`flex items-center gap-0.5 text-xs font-semibold ${ticker.isUp ? 'text-emerald-400' : 'text-rose-400'}`}>
              {ticker.isUp ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
              {Math.abs(ticker.change).toFixed(2)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
