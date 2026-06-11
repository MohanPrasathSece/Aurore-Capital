import { Quote } from "lucide-react";

const items = [
  {
    name: "Marcus Chen", role: "Crypto Trader · Singapour", profit: "+184% YTD",
    quote: "Aurore Capital a remplacé toute ma pile de signaux. La précision et la vitesse d'exécution ne ressemblent à rien de ce que j'ai utilisé en 8 ans de trading.",
  },
  {
    name: "Sophia Reyes", role: "Gestionnaire de portefeuille · NYC", profit: "+62% en 90 jours",
    quote: "Je gère un portefeuille crypto de family office. Le cadre de gestion des risques à lui seul vaut l'abonnement — il a détecté deux krachs éclair avant moi.",
  },
  {
    name: "Daniel Okafor", role: "Trader indépendant · Londres", profit: "+241% en 6 mois",
    quote: "Je suis passé de comptes réduits à néant à des rendements mensuels constants. Le bot s'occupe de tout pendant que je me concentre sur la recherche macro.",
  },
  {
    name: "Lena Hoffmann", role: "Analyste quantitatif · Berlin", profit: "+98% YTD",
    quote: "Le modèle neuronal a un avantage mesurable sur BTC et ETH. La transparence du tableau de bord analytique est de niveau institutionnel.",
  },
];

export function Testimonials() {
  return (
    <section className="py-28" id="testimonials">
      <div className="container-page">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gradient">
            Témoignages
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink md:text-4xl lg:text-5xl lg:leading-[1.05]">
            Approuvé par des traders sérieux
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
