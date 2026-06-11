import { Check } from "lucide-react";

const plans = [
  {
    name: "Starter", price: "49", desc: "Perfect for new traders getting started.",
    features: ["BTC & ETH signals", "Telegram delivery", "Basic risk metrics", "Email support"],
  },
  {
    name: "Professional", price: "149", desc: "For serious traders who want every edge.", highlight: true,
    features: ["All Starter features", "Altcoin signals", "AI Trading Bot access", "Multi-exchange execution", "Advanced analytics", "Priority support"],
  },
  {
    name: "Enterprise", price: "Custom", desc: "For funds, family offices and institutions.",
    features: ["Custom strategies", "Dedicated infrastructure", "API access", "White-glove onboarding", "24/7 phone support"],
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="bg-secondary/40 py-28">
      <div className="container-page">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gradient">
            Pricing
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink md:text-4xl lg:text-5xl lg:leading-[1.05]">
            Simple, transparent pricing
          </h2>
          <p className="mt-5 text-lg text-ink-soft">
            Cancel anytime. 30-day money-back guarantee on all plans.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`relative flex flex-col rounded-[36px] border p-8 transition-all ${
                p.highlight
                  ? "border-transparent bg-gradient-to-br from-[#0F172A] to-[#1e1b4b] text-white shadow-[0_40px_100px_-30px_rgba(124,92,255,0.55)] lg:-translate-y-4 lg:scale-[1.02]"
                  : "border-black/5 bg-white text-ink shadow-card"
              }`}
            >
              {p.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-brand px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white shadow-md">
                  Most popular
                </span>
              )}
              <p className={`text-sm font-semibold ${p.highlight ? "text-primary-glow" : "text-ink-soft"}`}>
                {p.name}
              </p>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-5xl font-extrabold tracking-tight">
                  {p.price === "Custom" ? "Custom" : `$${p.price}`}
                </span>
                {p.price !== "Custom" && (
                  <span className={p.highlight ? "text-white/60" : "text-ink-soft"}>/month</span>
                )}
              </div>
              <p className={`mt-3 text-sm ${p.highlight ? "text-white/70" : "text-ink-soft"}`}>
                {p.desc}
              </p>

              <ul className="mt-7 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <span className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full ${p.highlight ? "bg-white/15 text-white" : "bg-accent text-primary"}`}>
                      <Check className="h-3 w-3" />
                    </span>
                    <span className={p.highlight ? "text-white/90" : "text-ink"}>{f}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`mt-8 w-full rounded-full px-6 py-3.5 text-sm font-semibold transition-transform hover:-translate-y-0.5 ${
                  p.highlight
                    ? "bg-white text-ink"
                    : "bg-ink text-white"
                }`}
              >
                {p.name === "Enterprise" ? "Contact sales" : "Get started"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
