import { Radar, Target, ShieldCheck, Rocket, TrendingUp } from "lucide-react";

const steps = [
  { n: "01", title: "AI Scans Market", desc: "Neural models process 400+ pairs across 12 exchanges in real-time.", icon: Radar },
  { n: "02", title: "Detects Opportunity", desc: "Pattern recognition flags high-probability setups within milliseconds.", icon: Target },
  { n: "03", title: "Risk Assessment", desc: "Volatility, liquidity and correlation are scored before every trade.", icon: ShieldCheck },
  { n: "04", title: "Automated Execution", desc: "Orders route directly to your exchange with optimal slippage control.", icon: Rocket },
  { n: "05", title: "Profit Optimization", desc: "Adaptive trailing stops and partial take-profits maximize every edge.", icon: TrendingUp },
];

export function BotWorkflow() {
  return (
    <section id="bot" className="relative overflow-hidden bg-[#0B0B14] py-28 text-white">
      <div className="pointer-events-none absolute inset-0 opacity-70 [background:radial-gradient(60%_60%_at_50%_0%,rgba(124,92,255,0.35),transparent_60%),radial-gradient(40%_60%_at_80%_80%,rgba(192,132,252,0.25),transparent_60%)]" />
      <div className="container-page relative">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary-glow">
            AI Trading Bot
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl lg:leading-[1.05]">
            Autonomous trading,
            <br />
            <span className="text-gradient">engineered to win.</span>
          </h2>
          <p className="mt-5 text-lg text-white/60">
            Five layers of intelligence working in perfect sync — 24 hours a day,
            across every market condition.
          </p>
        </div>

        <div className="mt-20 grid gap-6 md:grid-cols-5">
          {steps.map((s, i) => (
            <div key={s.n} className="relative">
              <div className="group relative h-full rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur transition-all hover:-translate-y-1 hover:bg-white/[0.07]">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold tracking-wider text-white/40">
                    STEP {s.n}
                  </span>
                  <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-brand text-white shadow-[0_8px_30px_-8px_rgba(124,92,255,0.7)]">
                    <s.icon className="h-5 w-5" />
                  </span>
                </div>
                <h3 className="mt-6 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{s.desc}</p>
              </div>
              {i < steps.length - 1 && (
                <div className="absolute top-1/2 -right-3 hidden h-px w-6 bg-gradient-to-r from-white/30 to-transparent md:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
