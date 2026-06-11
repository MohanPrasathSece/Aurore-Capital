import { motion, useInView, animate, useMotionValue, useTransform } from "motion/react";
import { useEffect, useRef } from "react";

const metrics = [
  { value: 18.4, suffix: "%", label: "Rendement moyen mensuel" },
  { value: 96.8, suffix: "%", label: "Taux de réussite" },
  { value: 2.4, suffix: "x", label: "Risque/Récompense moyen" },
  { value: 142, suffix: "", label: "Signaux ce mois-ci" },
];

export function Performance() {
  return (
    <section id="performance" className="py-28">
      <div className="container-page">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gradient">
            Performance en direct
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink md:text-4xl lg:text-5xl lg:leading-[1.05]">
            Les chiffres parlent d'eux-mêmes
          </h2>
          <p className="mt-5 text-lg text-ink-soft">
            Des résultats vérifiés et transparents — mis à jour en temps réel sur toutes
            nos stratégies.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {metrics.map((m) => (
            <div
              key={m.label}
              className="rounded-3xl border border-black/5 bg-white p-7 shadow-card"
            >
              <p className="text-sm text-ink-soft">{m.label}</p>
              <p className="mt-3 text-gradient text-5xl font-extrabold tracking-tight">
                <Counter to={m.value} />{m.suffix}
              </p>
              <div className="mt-5 h-1 w-full overflow-hidden rounded-full bg-secondary">
                <div className="h-full w-3/4 rounded-full bg-gradient-brand" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          <PerfChart label="Stratégie BTC" change="+24.6%" gradient="from-amber-400 to-orange-500" />
          <PerfChart label="Stratégie ETH" change="+19.2%" gradient="from-indigo-500 to-violet-500" />
          <PerfChart label="Panier Altcoins" change="+38.4%" gradient="from-fuchsia-500 to-pink-500" />
        </div>
      </div>
    </section>
  );
}

function Counter({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => (to % 1 === 0 ? Math.round(v).toString() : v.toFixed(1)));
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (inView) animate(mv, to, { duration: 1.6, ease: [0.22, 1, 0.36, 1] });
  }, [inView, to, mv]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

function PerfChart({ label, change, gradient }: { label: string; change: string; gradient: string }) {
  return (
    <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-card">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-ink">{label}</p>
        <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
          {change}
        </span>
      </div>
      <svg viewBox="0 0 300 100" className="mt-4 h-24 w-full">
        <defs>
          <linearGradient id={`pg-${label}`} x1="0" x2="1">
            <stop offset="0" stopColor="#7C5CFF" />
            <stop offset="1" stopColor="#D8B4FE" />
          </linearGradient>
        </defs>
        <path
          d="M0,80 C40,70 60,85 100,55 C140,28 180,50 220,30 C260,15 280,22 300,8"
          fill="none"
          stroke={`url(#pg-${label})`}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
      <div className={`mt-4 h-1 w-full rounded-full bg-gradient-to-r ${gradient}`} />
    </div>
  );
}
