import { Check } from "lucide-react";

const rows = [
  {
    eyebrow: "Signal Dashboard",
    title: "Every signal, perfectly framed.",
    desc: "Real-time entries, confidence scores and full trade history — all rendered in one focused interface.",
    points: ["Live confidence scoring", "One-click execution", "Historical analytics"],
  },
  {
    eyebrow: "Trading Bot Console",
    title: "Hands-off, fully accountable.",
    desc: "Configure strategies once. The bot executes, hedges and reports — you stay in control with full transparency.",
    points: ["Strategy presets", "Drawdown limits", "Real-time logs"],
  },
  {
    eyebrow: "Risk Manager",
    title: "Capital protection, automated.",
    desc: "Position sizing, exposure limits and correlation-aware hedging keep your portfolio resilient in every regime.",
    points: ["Auto stop-loss", "Exposure caps", "Correlation hedging"],
  },
];

export function Showcase() {
  return (
    <section className="bg-secondary/40 py-28">
      <div className="container-page space-y-24">
        {rows.map((r, i) => (
          <div
            key={r.title}
            className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${i % 2 ? "lg:[&>div:first-child]:order-2" : ""}`}
          >
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gradient">
                {r.eyebrow}
              </p>
              <h3 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink md:text-4xl lg:text-5xl lg:leading-[1.08]">
                {r.title}
              </h3>
              <p className="mt-5 text-lg text-ink-soft">{r.desc}</p>
              <ul className="mt-7 space-y-3">
                {r.points.map((p) => (
                  <li key={p} className="flex items-center gap-3 text-ink">
                    <span className="grid h-6 w-6 place-items-center rounded-full bg-gradient-brand text-white">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-base">{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            <MockPanel index={i} />
          </div>
        ))}
      </div>
    </section>
  );
}

function MockPanel({ index }: { index: number }) {
  return (
    <div className="relative rounded-[32px] border border-black/5 bg-white p-2 shadow-[0_30px_80px_-30px_rgba(15,23,42,0.25)]">
      <div className="overflow-hidden rounded-[24px] bg-gradient-to-br from-[#0F172A] to-[#1e1b4b] p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-rose-400" />
            <span className="h-2 w-2 rounded-full bg-amber-400" />
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
          </div>
          <span className="text-[10px] font-medium text-white/40">quantnova.ai/{["signals", "bot", "risk"][index]}</span>
        </div>
        <div className="mt-6 grid gap-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-white/60">{["Active Signals", "Bot Strategies", "Total Exposure"][index]}</span>
              <span className="text-xs text-emerald-300">+12.4%</span>
            </div>
            <p className="mt-2 text-2xl font-bold text-white">
              {["24", "8", "$184,200"][index]}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[0, 1, 2, 3].map((k) => (
              <div key={k} className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
                <div className="h-1 w-12 rounded-full bg-gradient-brand" />
                <p className="mt-2 text-[10px] text-white/40">Module {k + 1}</p>
                <p className="text-sm font-semibold text-white">Operational</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
