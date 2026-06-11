import { Clock, Bell, Send, MessageCircle, Network, Wallet } from "lucide-react";

const features = [
  { icon: Clock, title: "24/7 Market Monitoring", desc: "Our engine never sleeps. Every candle, every order book, every block." },
  { icon: Bell, title: "Real-Time Alerts", desc: "Receive trade-ready signals the moment a setup confirms." },
  { icon: Send, title: "Telegram Integration", desc: "Get signals delivered directly to your private Telegram channel." },
  { icon: MessageCircle, title: "Discord Integration", desc: "Built-in Discord bot keeps your community in sync with the AI." },
  { icon: Network, title: "Multi Exchange Support", desc: "Binance, Coinbase, Bybit, OKX, Kraken and more — all in one place." },
  { icon: Wallet, title: "Portfolio Tracking", desc: "Unified view of every position, PnL and exposure across wallets." },
];

export function Features() {
  return (
    <section id="features" className="py-28">
      <div className="container-page">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gradient">
            Features
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink md:text-4xl lg:text-5xl lg:leading-[1.05]">
            Everything you need to trade like a fund
          </h2>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="group rounded-3xl border border-black/5 bg-white p-7 shadow-card transition-all hover:-translate-y-1 hover:shadow-elevated"
            >
              <span className="inline-grid h-12 w-12 place-items-center rounded-2xl bg-accent text-primary transition-colors group-hover:bg-gradient-brand group-hover:text-white">
                <f.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-xl font-semibold tracking-tight text-ink">{f.title}</h3>
              <p className="mt-2 text-base leading-relaxed text-ink-soft">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
