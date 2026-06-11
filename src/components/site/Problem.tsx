import { Brain, TrendingDown, Clock } from "lucide-react";

const items = [
  {
    icon: Brain,
    title: "Trading Émotionnel",
    desc: "La peur et l'avidité entraînent 90 % des pertes des particuliers. L'IA supprime l'émotion de chaque décision et s'exécute avec précision.",
  },
  {
    icon: TrendingDown,
    title: "Mauvaise Gestion des Risques",
    desc: "La plupart des traders risquent trop par transaction. Notre cadre redimensionne automatiquement les positions et protège le capital en priorité.",
  },
  {
    icon: Clock,
    title: "Entrées Tardives sur le Marché",
    desc: "Au moment où vous voyez le mouvement, c'est terminé. Les modèles neuronaux détectent les configurations des secondes avant la cassure.",
  },
];

export function Problem() {
  return (
    <section className="py-28">
      <div className="container-page">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gradient">
            Le Problème
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink md:text-4xl lg:text-5xl lg:leading-[1.05]">
            Pourquoi la plupart des traders perdent de l'argent
          </h2>
          <p className="mt-5 text-lg text-ink-soft">
            Le marché punit l'hésitation et récompense la discipline. Aurore Capital apporte
            les deux, à la vitesse des machines.
          </p>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {items.map((it) => (
            <div
              key={it.title}
              className="group relative overflow-hidden rounded-3xl border border-black/5 bg-white p-8 shadow-card transition-all hover:-translate-y-1 hover:shadow-elevated"
            >
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-brand opacity-0 blur-3xl transition-opacity group-hover:opacity-30" />
              <span className="inline-grid h-12 w-12 place-items-center rounded-2xl bg-secondary text-ink">
                <it.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-6 text-2xl font-semibold tracking-tight text-ink">
                {it.title}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-ink-soft">{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
