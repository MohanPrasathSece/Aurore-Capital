import { Check } from "lucide-react";
import { Link } from "@tanstack/react-router";
const plans = [
  {
    name: "Starter", price: "49", desc: "Parfait pour les nouveaux traders qui se lancent.",
    features: ["Signaux BTC et ETH", "Livraison sur Telegram", "Métriques de risque de base", "Support par e-mail"],
  },
  {
    name: "Professional", price: "149", desc: "Pour les traders sérieux qui veulent tous les avantages.", highlight: true,
    features: ["Toutes les fonctionnalités Starter", "Signaux Altcoins", "Accès au bot de trading IA", "Exécution multi-échanges", "Analytique avancée", "Support prioritaire"],
  },
  {
    name: "Enterprise", price: "Sur mesure", desc: "Pour les fonds, family offices et institutions.",
    features: ["Stratégies personnalisées", "Infrastructure dédiée", "Accès API", "Intégration premium", "Support téléphonique 24/7"],
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="bg-secondary/40 py-28">
      <div className="container-page">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gradient">
            Tarifs
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink md:text-4xl lg:text-5xl lg:leading-[1.05]">
            Des tarifs simples et transparents
          </h2>
          <p className="mt-5 text-lg text-ink-soft">
            Annulez à tout moment. Garantie de remboursement de 30 jours sur tous les forfaits.
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
                  Le plus populaire
                </span>
              )}
              <p className={`text-sm font-semibold ${p.highlight ? "text-primary-glow" : "text-ink-soft"}`}>
                {p.name}
              </p>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-5xl font-extrabold tracking-tight">
                  {p.price === "Sur mesure" ? "Sur mesure" : `$${p.price}`}
                </span>
                {p.price !== "Sur mesure" && (
                  <span className={p.highlight ? "text-white/60" : "text-ink-soft"}>/mois</span>
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

              <Link
                to={p.name === "Enterprise" ? "/contact" : "/"}
                search={p.name !== "Enterprise" ? { auth: "signup" } : undefined}
                className={`mt-8 w-full text-center inline-block rounded-full px-6 py-3.5 text-sm font-semibold transition-transform hover:-translate-y-0.5 ${
                  p.highlight
                    ? "bg-white text-ink"
                    : "bg-ink text-white"
                }`}
              >
                {p.name === "Enterprise" ? "Contacter les ventes" : "Commencer"}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
