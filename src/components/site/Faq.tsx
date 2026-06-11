import { useState } from "react";
import { Plus } from "lucide-react";

const faqs = [
  { q: "How accurate are the signals?", a: "Our verified 12-month average sits at 96.8% win-rate across BTC and ETH strategies, with a 2.4× average risk-to-reward ratio. All trades are auditable in your dashboard." },
  { q: "Which exchanges are supported?", a: "Binance, Coinbase, Bybit, OKX, Kraken, KuCoin, Bitget and MEXC. New exchanges are added based on user demand and regulatory clarity." },
  { q: "How does the AI bot work?", a: "The bot continuously scans 400+ pairs, scores opportunities through our neural prediction engine, applies risk constraints, then executes via your exchange API. You stay in full control of capital and limits." },
  { q: "Can beginners use it?", a: "Absolutely. The Starter plan is designed for new traders — simply receive signals on Telegram and execute manually, or enable the bot once you're comfortable." },
  { q: "What cryptocurrencies are supported?", a: "Bitcoin, Ethereum, and 200+ liquid altcoins across spot and perpetual markets. Coverage expands monthly." },
  { q: "How quickly are signals delivered?", a: "Signals are pushed to Telegram, Discord and the dashboard within 1–2 seconds of generation. The bot executes within milliseconds via exchange APIs." },
];

export function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="py-28">
      <div className="container-page">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gradient">FAQ</p>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink md:text-4xl lg:text-5xl lg:leading-[1.05]">
            Questions, answered.
          </h2>
        </div>

        <div className="mx-auto mt-14 max-w-3xl divide-y divide-black/5 overflow-hidden rounded-3xl border border-black/5 bg-white shadow-card">
          {faqs.map((f, i) => {
            const isOpen = i === open;
            return (
              <button
                key={f.q}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="block w-full px-6 py-5 text-left transition-colors hover:bg-secondary/60 md:px-8"
              >
                <div className="flex items-center justify-between gap-6">
                  <span className="text-lg font-semibold text-ink">{f.q}</span>
                  <span
                    className={`grid h-9 w-9 shrink-0 place-items-center rounded-full bg-secondary text-ink transition-transform ${isOpen ? "rotate-45 bg-gradient-brand text-white" : ""}`}
                  >
                    <Plus className="h-4 w-4" />
                  </span>
                </div>
                <div
                  className={`grid overflow-hidden transition-all duration-300 ${isOpen ? "mt-3 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                >
                  <div className="overflow-hidden">
                    <p className="text-base leading-relaxed text-ink-soft">{f.a}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
