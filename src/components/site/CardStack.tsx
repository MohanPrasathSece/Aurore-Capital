import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { Cpu, Brain, ShieldCheck, Rocket, PieChart, BarChart3 } from "lucide-react";

const cards = [
  {
    title: "Market Intelligence Engine",
    sub: "Real-time data ingestion across 12 exchanges, 400+ pairs, 30+ on-chain feeds.",
    icon: Cpu,
    gradient: "from-violet-500 via-fuchsia-500 to-rose-400",
  },
  {
    title: "Neural Prediction System",
    sub: "Transformer-based models forecast price action seconds before the market reacts.",
    icon: Brain,
    gradient: "from-indigo-500 via-violet-500 to-purple-400",
  },
  {
    title: "Smart Risk Framework",
    sub: "Position sizing, drawdown control and correlation hedging — all automated.",
    icon: ShieldCheck,
    gradient: "from-emerald-500 via-teal-500 to-cyan-400",
  },
  {
    title: "AI Execution Layer",
    sub: "Direct exchange routing with millisecond fills and intelligent slippage control.",
    icon: Rocket,
    gradient: "from-orange-500 via-amber-500 to-yellow-400",
  },
  {
    title: "Portfolio Optimization",
    sub: "Adaptive allocation rebalances your capital toward the highest-edge setups.",
    icon: PieChart,
    gradient: "from-sky-500 via-blue-500 to-indigo-400",
  },
  {
    title: "Performance Analytics",
    sub: "Institutional-grade reporting, attribution and risk metrics in one dashboard.",
    icon: BarChart3,
    gradient: "from-fuchsia-500 via-pink-500 to-rose-400",
  },
];

export function CardStack() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <section className="bg-secondary/40 py-28">
      <div className="container-page">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gradient">
            Platform Architecture
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink md:text-4xl lg:text-5xl lg:leading-[1.05]">
            Six layers. One advantage.
          </h2>
          <p className="mt-5 text-lg text-ink-soft">
            Every component of Aurore Capital is purpose-built to convert market data
            into measurable alpha.
          </p>
        </div>
      </div>

      <div ref={container} className="relative mt-16" style={{ height: `${cards.length * 80}vh` }}>
        {cards.map((c, i) => (
          <Card key={i} card={c} index={i} total={cards.length} progress={scrollYProgress} />
        ))}
      </div>
    </section>
  );
}

function Card({
  card, index, total, progress,
}: {
  card: typeof cards[number]; index: number; total: number; progress: MotionValue<number>;
}) {
  const start = index / total;
  const end = (index + 1) / total;
  const scale = useTransform(progress, [start, end], [1, 0.92]);
  const opacity = useTransform(progress, [start, Math.min(end + 0.05, 1)], [1, index === total - 1 ? 1 : 0.6]);

  return (
    <div className="sticky top-24 mx-auto flex h-[80vh] max-w-[1100px] items-center justify-center px-5">
      <motion.div
        style={{ scale, opacity, top: `${index * 18}px` }}
        className="relative w-full overflow-hidden rounded-[40px] border border-black/5 bg-white shadow-[0_30px_80px_-30px_rgba(15,23,42,0.35)]"
      >
        <div className={`absolute inset-0 opacity-90 bg-gradient-to-br ${card.gradient}`} />
        <div className="absolute inset-0 bg-[radial-gradient(120%_60%_at_0%_0%,rgba(255,255,255,0.35),transparent_60%)]" />

        <div className="relative grid gap-10 p-10 md:grid-cols-2 md:p-16">
          <div className="flex flex-col justify-between">
            <div>
              <span className="inline-grid h-12 w-12 place-items-center rounded-2xl bg-white/20 text-white backdrop-blur">
                <card.icon className="h-6 w-6" />
              </span>
              <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">
                Layer {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-3 font-display text-4xl font-bold leading-[1.05] tracking-tight text-white md:text-5xl">
                {card.title}
              </h3>
              <p className="mt-5 max-w-md text-lg text-white/80">{card.sub}</p>
            </div>
            <div className="mt-8 flex items-center gap-3">
              <button className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-ink">
                Learn more
              </button>
              <button className="rounded-full bg-white/15 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur">
                See it live
              </button>
            </div>
          </div>

          <div className="relative hidden md:block">
            <div className="absolute inset-0 grid place-items-center">
              <div className="aspect-square w-full max-w-[360px] rounded-[32px] border border-white/30 bg-white/10 p-6 backdrop-blur-xl">
                <div className="flex h-full flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold text-white/80">Live Module</p>
                    <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-300" />
                  </div>
                  <svg viewBox="0 0 200 120" className="h-32 w-full">
                    <path
                      d="M0,90 C30,70 50,100 80,60 C110,25 140,55 200,18"
                      fill="none"
                      stroke="white"
                      strokeOpacity="0.9"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="grid grid-cols-3 gap-2 text-center text-white">
                    <div className="rounded-xl bg-white/15 px-2 py-2">
                      <p className="text-[10px] text-white/70">Signals</p>
                      <p className="text-sm font-bold">142</p>
                    </div>
                    <div className="rounded-xl bg-white/15 px-2 py-2">
                      <p className="text-[10px] text-white/70">Accuracy</p>
                      <p className="text-sm font-bold">94%</p>
                    </div>
                    <div className="rounded-xl bg-white/15 px-2 py-2">
                      <p className="text-[10px] text-white/70">Latency</p>
                      <p className="text-sm font-bold">38ms</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
