import { Bitcoin, Coins, Zap, Timer, LineChart, Layers } from "lucide-react";

const signals = [
  {
    title: "Bitcoin Signals", asset: "BTC/USDT", icon: Bitcoin,
    accent: "from-amber-400 to-orange-500",
    entry: "64,820", tp: "68,420", sl: "62,950", conf: 94, risk: "Low", ret: "+5.5%",
  },
  {
    title: "Ethereum Signals", asset: "ETH/USDT", icon: Coins,
    accent: "from-indigo-400 to-violet-500",
    entry: "3,420", tp: "3,720", sl: "3,290", conf: 91, risk: "Low", ret: "+8.7%",
  },
  {
    title: "Altcoin Opportunities", asset: "SOL/USDT", icon: Layers,
    accent: "from-fuchsia-400 to-pink-500",
    entry: "168.40", tp: "192.80", sl: "159.10", conf: 88, risk: "Medium", ret: "+14.5%",
  },
  {
    title: "Scalp Trades", asset: "LINK/USDT", icon: Zap,
    accent: "from-emerald-400 to-teal-500",
    entry: "18.42", tp: "19.05", sl: "18.10", conf: 89, risk: "Low", ret: "+3.4%",
  },
  {
    title: "Swing Trades", asset: "AVAX/USDT", icon: LineChart,
    accent: "from-sky-400 to-blue-600",
    entry: "42.10", tp: "51.80", sl: "39.20", conf: 86, risk: "Medium", ret: "+22.8%",
  },
  {
    title: "Long-Term Setups", asset: "BNB/USDT", icon: Timer,
    accent: "from-rose-400 to-red-500",
    entry: "612.50", tp: "740.00", sl: "562.00", conf: 92, risk: "Medium", ret: "+20.8%",
  },
];

export function Signals() {
  return (
    <section id="signals" className="relative py-28">
      <div className="container-page">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gradient">
            AI Signals
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink md:text-4xl lg:text-5xl lg:leading-[1.05]">
            Signals built for every kind of trader
          </h2>
          <p className="mt-5 text-lg text-ink-soft">
            Real-time entries with precise risk parameters. Every signal is rated
            by our neural confidence score before it reaches your phone.
          </p>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {signals.map((s) => (
            <div
              key={s.title}
              className="group relative overflow-hidden rounded-[28px] border border-black/5 bg-white p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-elevated"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className={`grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br ${s.accent} text-white shadow-md`}>
                    <s.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs text-ink-soft">{s.title}</p>
                    <p className="text-base font-semibold text-ink">{s.asset}</p>
                  </div>
                </div>
                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
                  {s.ret}
                </span>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-2">
                <Mini label="Entry" value={`$${s.entry}`} />
                <Mini label="Take Profit" value={`$${s.tp}`} tone="good" />
                <Mini label="Stop Loss" value={`$${s.sl}`} tone="bad" />
              </div>

              <div className="mt-5">
                <div className="flex items-center justify-between text-xs text-ink-soft">
                  <span>AI Confidence</span>
                  <span className="font-semibold text-ink">{s.conf}%</span>
                </div>
                <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full bg-gradient-brand"
                    style={{ width: `${s.conf}%` }}
                  />
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-black/5 pt-4">
                <span className="text-xs text-ink-soft">Risk Rating</span>
                <span className="text-xs font-semibold text-ink">{s.risk}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Mini({ label, value, tone }: { label: string; value: string; tone?: "good" | "bad" }) {
  return (
    <div className="rounded-xl bg-secondary px-2.5 py-2">
      <p className="text-[10px] uppercase tracking-wider text-ink-soft">{label}</p>
      <p className={`text-xs font-semibold ${tone === "good" ? "text-emerald-600" : tone === "bad" ? "text-rose-600" : "text-ink"}`}>
        {value}
      </p>
    </div>
  );
}
