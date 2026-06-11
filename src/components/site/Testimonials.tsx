import { Quote } from "lucide-react";

const items = [
  {
    name: "Marcus Chen", role: "Crypto Trader · Singapore", profit: "+184% YTD",
    quote: "Aurore Capital replaced my entire signal stack. The accuracy and execution speed are unlike anything I've used in 8 years of trading.",
  },
  {
    name: "Sophia Reyes", role: "Portfolio Manager · NYC", profit: "+62% in 90 days",
    quote: "I run a family-office crypto book. The risk framework alone is worth the subscription — it caught two flash crashes before I did.",
  },
  {
    name: "Daniel Okafor", role: "Independent Trader · London", profit: "+241% in 6 months",
    quote: "I went from blowing accounts to consistent monthly returns. The bot handles everything while I focus on macro research.",
  },
  {
    name: "Lena Hoffmann", role: "Quant Analyst · Berlin", profit: "+98% YTD",
    quote: "The neural model has a measurable edge on BTC and ETH. The transparency of the analytics dashboard is institutional grade.",
  },
];

export function Testimonials() {
  return (
    <section className="py-28" id="testimonials">
      <div className="container-page">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gradient">
            Testimonials
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink md:text-4xl lg:text-5xl lg:leading-[1.05]">
            Trusted by serious traders
          </h2>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {items.map((t) => (
            <div
              key={t.name}
              className="relative overflow-hidden rounded-3xl border border-primary/10 bg-background/80 p-8 shadow-elevated backdrop-blur-xl transition-transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-between">
                <Quote className="h-8 w-8 text-primary/40" />
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  {t.profit}
                </span>
              </div>
              <p className="mt-6 text-lg leading-relaxed text-ink font-medium">"{t.quote}"</p>
              <div className="mt-8 flex items-center gap-4 border-t border-primary/10 pt-6">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-gradient-brand text-sm font-bold text-white shadow-md">
                  {t.name.split(" ").map((n) => n[0]).join("")}
                </span>
                <div>
                  <p className="text-base font-semibold text-ink">{t.name}</p>
                  <p className="text-sm text-ink-soft">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
