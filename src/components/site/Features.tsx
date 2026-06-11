import { Clock, Bell, Send, MessageCircle, Network, Wallet } from "lucide-react";

const features = [
  { icon: Clock, title: "Surveillance du marché 24/7", desc: "Notre moteur ne dort jamais. Chaque bougie, chaque carnet d'ordres, chaque bloc." },
  { icon: Bell, title: "Alertes en temps réel", desc: "Recevez des signaux prêts à trader dès qu'une configuration se confirme." },
  { icon: Send, title: "Intégration Telegram", desc: "Recevez les signaux directement sur votre canal Telegram privé." },
  { icon: MessageCircle, title: "Intégration Discord", desc: "Le bot Discord intégré garde votre communauté synchronisée avec l'IA." },
  { icon: Network, title: "Support multi-échanges", desc: "Binance, Coinbase, Bybit, OKX, Kraken et plus — tout au même endroit." },
  { icon: Wallet, title: "Suivi de portefeuille", desc: "Vue unifiée de chaque position, PnL et exposition sur tous les portefeuilles." },
];

export function Features() {
  return (
    <section id="features" className="py-28">
      <div className="container-page">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gradient">
            Fonctionnalités
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink md:text-4xl lg:text-5xl lg:leading-[1.05]">
            Tout ce dont vous avez besoin pour trader comme un fonds
          </h2>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="group rounded-3xl border border-black/5 bg-white p-7 shadow-card transition-all hover:-translate-y-1 hover:shadow-elevated"
            >
              <span className="inline-grid h-12 w-12 place-items-center rounded-2xl bg-accent text-primary transition-colors group-hover:bg-gradient-brand group-hover:text-white">
                <f.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-xl font-semibold tracking-tight text-ink">{f.title}</h3>
              <p className="mt-2 text-base leading-relaxed text-ink-soft">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
