import { motion } from "motion/react";
import { TrendingUp, ShieldCheck, Activity, Bitcoin, Zap } from "lucide-react";
import { useEffect, useState } from "react";

export function DemoSection() {
  const [pnl, setPnl] = useState(24180);
  const [portfolio, setPortfolio] = useState(348920.15);
  const [confidence, setConfidence] = useState(94);
  const [sentiment, setSentiment] = useState(76);

  useEffect(() => {
    const interval = setInterval(() => {
      setPnl(prev => prev + (Math.random() * 100 - 30));
      setPortfolio(prev => prev + (Math.random() * 500 - 150));
      setConfidence(prev => Math.min(99, Math.max(85, prev + Math.floor(Math.random() * 5 - 2))));
      setSentiment(prev => Math.min(95, Math.max(60, prev + Math.floor(Math.random() * 5 - 2))));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden py-24 bg-background">
      <div className="container-page relative">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="font-display text-4xl font-bold tracking-tight text-ink md:text-5xl">
            Démo en direct du moteur IA
          </h2>
          <p className="mt-4 text-lg text-ink-soft">
            Regardez notre réseau neuronal analyser le marché et exécuter des transactions en temps réel.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto max-w-6xl"
        >
          <div className="relative">
            {/* Floating glow */}
            <div className="absolute -inset-10 -z-10 bg-[radial-gradient(50%_60%_at_50%_50%,rgba(124,92,255,0.35),transparent_70%)] blur-2xl" />

            <div className="relative overflow-hidden rounded-[32px] border border-black/5 bg-white/80 p-2 shadow-[0_40px_120px_-30px_rgba(15,23,42,0.35)] backdrop-blur-xl">
              <div className="rounded-[24px] bg-gradient-to-br from-[#0F172A] to-[#1e1b4b] p-6 md:p-8">
                {/* Top bar */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                    <span className="ml-3 text-xs font-medium text-white/60">
                      Aurore Capital · Tableau de bord en direct
                    </span>
                  </div>
                  <div className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-medium text-white/80">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                    Moteur IA · En ligne
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-12 gap-4">
                  {/* Signal card BTC */}
                  <div className="col-span-12 md:col-span-5 animate-float">
                    <SignalCard
                      asset="BTC/USDT"
                      icon={<Bitcoin className="h-5 w-5" />}
                      direction="LONG"
                      entry="64,820"
                      tp="68,420"
                      sl="62,950"
                      confidence={confidence}
                      accent="from-amber-400 to-orange-500"
                    />
                  </div>

                  {/* Center chart */}
                  <div className="col-span-12 md:col-span-7">
                    <ChartCard portfolio={portfolio} />
                  </div>

                  {/* Stats row */}
                  <div className="col-span-6 md:col-span-3">
                    <StatCard label="Taux de réussite" value="96.8%" Icon={TrendingUp} />
                  </div>
                  <div className="col-span-6 md:col-span-3">
                    <StatCard label="PnL ouvert" value={`+$${pnl.toLocaleString('en-US', {minimumFractionDigits: 0, maximumFractionDigits: 0})}`} Icon={Activity} accent />
                  </div>
                  <div className="col-span-12 md:col-span-6">
                    <SentimentCard sentiment={sentiment} />
                  </div>
                </div>
              </div>
            </div>

            {/* Floating side cards */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.9, duration: 0.7 }}
              className="absolute -right-6 top-24 hidden w-64 rounded-2xl border border-white/60 bg-white/80 p-4 shadow-elevated backdrop-blur-xl md:block"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-ink">Prédiction IA</span>
                <span className="rounded-full bg-emerald-100 px-2 py-0.5 font-medium text-emerald-700">
                  +6.2%
                </span>
              </div>
              <p className="mt-1 text-[11px] text-ink-soft">Prévision ETH sur 24h</p>
              <div className="mt-3 h-12 w-full overflow-hidden rounded-lg bg-gradient-to-r from-violet-100 to-fuchsia-100">
                <svg viewBox="0 0 200 48" className="h-full w-full">
                  <path
                    d="M0,30 C30,20 50,35 80,22 C110,10 140,28 200,8"
                    fill="none"
                    stroke="url(#g1)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="g1" x1="0" x2="1">
                      <stop offset="0" stopColor="#7C5CFF" />
                      <stop offset="1" stopColor="#C084FC" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1.0, duration: 0.7 }}
              className="absolute -left-6 bottom-16 hidden w-56 rounded-2xl border border-white/60 bg-white/85 p-4 shadow-elevated backdrop-blur-xl md:block"
            >
              <div className="flex items-center gap-2">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-brand text-white">
                  <Zap className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-xs font-semibold text-ink">Transaction exécutée</p>
                  <p className="text-[10px] text-ink-soft">SOL/USDT · Bot Auto</p>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between text-xs">
                <span className="text-ink-soft">Profit</span>
                <span className="font-semibold text-emerald-600">+$842.30</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function SignalCard({
  asset, icon, direction, entry, tp, sl, confidence, accent,
}: {
  asset: string; icon: React.ReactNode; direction: string;
  entry: string; tp: string; sl: string; confidence: number; accent: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur transition-all duration-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br ${accent} text-white`}>
            {icon}
          </span>
          <div>
            <p className="text-sm font-semibold text-white">{asset}</p>
            <p className="text-[11px] text-white/50">Signal IA · en direct</p>
          </div>
        </div>
        <span className="rounded-full bg-emerald-400/15 px-2.5 py-1 text-[11px] font-semibold text-emerald-300">
          {direction}
        </span>
      </div>
      <div className="mt-5 grid grid-cols-3 gap-3 text-center">
        <Cell label="Entrée" value={entry} />
        <Cell label="TP" value={tp} good />
        <Cell label="SL" value={sl} bad />
      </div>
      <div className="mt-4">
        <div className="flex items-center justify-between text-[11px] text-white/60">
          <span>Confiance IA</span>
          <span className="font-semibold text-white transition-all duration-300">{confidence}%</span>
        </div>
        <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-violet-400 to-fuchsia-400 transition-all duration-300"
            style={{ width: `${confidence}%` }}
          />
        </div>
      </div>
    </div>
  );
}

function Cell({ label, value, good, bad }: { label: string; value: string; good?: boolean; bad?: boolean }) {
  return (
    <div className="rounded-xl bg-white/5 px-2 py-2.5">
      <p className="text-[10px] uppercase tracking-wider text-white/40">{label}</p>
      <p className={`text-sm font-semibold ${good ? "text-emerald-300" : bad ? "text-rose-300" : "text-white"}`}>
        ${value}
      </p>
    </div>
  );
}

function ChartCard({ portfolio }: { portfolio: number }) {
  return (
    <div className="h-full rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition-all duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-white/50">Valeur du portefeuille</p>
          <p className="mt-0.5 text-2xl font-bold text-white transition-all duration-300">
            ${portfolio.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
          </p>
        </div>
        <span className="rounded-full bg-emerald-400/15 px-2.5 py-1 text-xs font-semibold text-emerald-300">
          +18,42% ce mois-ci
        </span>
      </div>
      <svg viewBox="0 0 400 140" className="mt-4 h-32 w-full">
        <defs>
          <linearGradient id="area" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#A78BFA" stopOpacity="0.5" />
            <stop offset="1" stopColor="#A78BFA" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="line" x1="0" x2="1">
            <stop offset="0" stopColor="#7C5CFF" />
            <stop offset="1" stopColor="#D8B4FE" />
          </linearGradient>
        </defs>
        <path
          d="M0,100 C40,90 70,110 110,80 C150,55 180,70 220,50 C260,32 300,42 340,20 L400,12 L400,140 L0,140 Z"
          fill="url(#area)"
        />
        <path
          d="M0,100 C40,90 70,110 110,80 C150,55 180,70 220,50 C260,32 300,42 340,20 L400,12"
          fill="none"
          stroke="url(#line)"
          strokeWidth="2.5"
          strokeLinecap="round"
          className="animate-pulse"
        />
      </svg>
    </div>
  );
}

function StatCard({ label, value, Icon, accent }: { label: string; value: string; Icon: typeof TrendingUp; accent?: boolean }) {
  return (
    <div className={`rounded-2xl border border-white/10 p-4 transition-all duration-300 ${accent ? "bg-gradient-to-br from-violet-500/20 to-fuchsia-500/10" : "bg-white/[0.04]"}`}>
      <div className="flex items-center justify-between">
        <Icon className="h-4 w-4 text-white/60" />
        <ShieldCheck className="h-3 w-3 text-white/30" />
      </div>
      <p className="mt-3 text-xs text-white/50">{label}</p>
      <p className="text-lg font-bold text-white transition-all duration-300">{value}</p>
    </div>
  );
}

function SentimentCard({ sentiment }: { sentiment: number }) {
  const dashoffset = 94.2 - (94.2 * sentiment) / 100;
  
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition-all duration-300">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-white">Sentiment du marché</p>
        <span className="text-[11px] text-white/50 flex items-center gap-1">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" /> En direct
        </span>
      </div>
      <div className="mt-3 flex items-center gap-3">
        <div className="relative h-14 w-14 shrink-0">
          <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
            <circle cx="18" cy="18" r="15" stroke="rgba(255,255,255,0.1)" strokeWidth="3" fill="none" />
            <circle
              cx="18" cy="18" r="15"
              stroke="url(#sentG)" strokeWidth="3" fill="none"
              strokeDasharray="94.2" strokeDashoffset={dashoffset}
              strokeLinecap="round"
              className="transition-all duration-500"
            />
            <defs>
              <linearGradient id="sentG">
                <stop offset="0" stopColor="#34D399" />
                <stop offset="1" stopColor="#A78BFA" />
              </linearGradient>
            </defs>
          </svg>
          <span className="absolute inset-0 grid place-items-center text-xs font-bold text-white transition-all duration-300">
            {sentiment}
          </span>
        </div>
        <div>
          <p className="text-sm font-semibold text-emerald-300">Haussier</p>
          <p className="text-[11px] text-white/50">Forte pression d'achat détectée sur les carnets d'ordres BTC et ETH.</p>
        </div>
      </div>
    </div>
  );
}
