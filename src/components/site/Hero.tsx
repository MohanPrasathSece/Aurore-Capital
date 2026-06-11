import { motion } from "motion/react";
import { ArrowUpRight, TrendingUp, ShieldCheck, Activity, Bitcoin, Sparkles, Zap } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden min-h-[100dvh] flex flex-col justify-center pt-52 pb-16">
      {/* Mesh background */}
      <div className="pointer-events-none absolute inset-0 bg-mesh opacity-80" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[600px] bg-[radial-gradient(60%_60%_at_50%_0%,rgba(124,92,255,0.25),transparent_70%)]" />

      <div className="container-page relative">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto flex max-w-fit items-center gap-2 rounded-full border border-black/5 bg-white/70 px-4 py-1.5 text-xs font-medium text-ink-soft backdrop-blur-xl shadow-card"
        >
          <span className="grid h-5 w-5 place-items-center rounded-full bg-gradient-brand text-white">
            <Sparkles className="h-3 w-3" />
          </span>
          Introducing Aurore Capital v4 · Neural Trading Engine
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.05 }}
          className="mx-auto mt-6 max-w-5xl text-center font-display text-4xl font-extrabold leading-[1.02] tracking-[-0.03em] text-ink sm:text-5xl md:text-[64px] lg:text-[80px]"
        >
          Trade Crypto Smarter
          <br />
          With <span className="text-gradient">Artificial Intelligence</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mx-auto mt-7 max-w-2xl text-center text-base leading-[1.7] text-ink-soft md:text-lg"
        >
          Receive institutional-grade Bitcoin, Ethereum and Altcoin signals
          powered by advanced AI and real-time market intelligence.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <a
            href="#start"
            className="group inline-flex items-center gap-2 rounded-full bg-ink px-7 py-4 text-base font-semibold text-white shadow-elevated transition-transform hover:-translate-y-0.5"
          >
            Get Started
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a
            href="#performance"
            className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-7 py-4 text-base font-semibold text-ink shadow-card transition-colors hover:bg-secondary"
          >
            View Live Performance
          </a>
        </motion.div>

        {/* The Dashboard Mock has been moved to its own section below the Hero */}
      </div>
    </section>
  );
}

