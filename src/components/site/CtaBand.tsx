import { ArrowUpRight } from "lucide-react";

export function CtaBand() {
  return (
    <section className="py-20">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-br from-[#0F172A] via-[#221b4b] to-[#3b1d6e] p-8 md:p-16 lg:p-20 text-white">
          <div className="pointer-events-none absolute inset-0 [background:radial-gradient(50%_60%_at_80%_20%,rgba(192,132,252,0.35),transparent_60%),radial-gradient(40%_50%_at_10%_80%,rgba(124,92,255,0.35),transparent_60%)]" />
          <div className="relative mx-auto max-w-3xl text-center">
            <h2 className="font-display text-3xl font-bold leading-[1.05] tracking-tight md:text-4xl lg:text-5xl">
              The AI doesn't sleep.
              <br />
              <span className="text-gradient">Neither does your portfolio.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-white/70">
              Join 50,000+ traders using Aurore Capital to capture every move — in
              every market, around the clock.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="#start"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-base font-semibold text-ink transition-transform hover:-translate-y-0.5"
              >
                Start free trial
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href="#pricing"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-7 py-4 text-base font-semibold text-white backdrop-blur transition-colors hover:bg-white/15"
              >
                See pricing
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
