const logos = ["BINANCE", "COINBASE", "KRAKEN", "BYBIT", "OKX", "KuCoin", "BITGET", "MEXC"];
const stats = [
  { value: "50,000+", label: "Active Traders" },
  { value: "2.8M", label: "Signals Delivered" },
  { value: "96.8%", label: "Signal Accuracy" },
  { value: "$500M+", label: "Volume Analyzed" },
];

export function TrustBar() {
  return (
    <section className="border-y border-black/5 bg-secondary/60 py-14">
      <div className="container-page">
        <p className="text-center text-xs font-medium uppercase tracking-[0.18em] text-ink-soft">
          Trusted by thousands of traders worldwide
        </p>

        <div className="relative mt-8 overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-secondary to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-secondary to-transparent" />
          <div className="flex w-max animate-marquee gap-14">
            {[...logos, ...logos].map((l, i) => (
              <span
                key={i}
                className="text-[22px] font-bold tracking-[0.2em] text-ink/40"
              >
                {l}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-gradient text-4xl font-extrabold tracking-tight md:text-5xl">
                {s.value}
              </p>
              <p className="mt-2 text-sm text-ink-soft">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
