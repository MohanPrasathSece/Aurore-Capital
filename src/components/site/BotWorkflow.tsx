import { Radar, Target, ShieldCheck, Rocket, TrendingUp } from "lucide-react";

const steps = [
  { n: "01", title: "L'IA Scanne le Marché", desc: "Les modèles neuronaux traitent plus de 400 paires sur 12 échanges en temps réel.", icon: Radar },
  { n: "02", title: "Détecte les Opportunités", desc: "La reconnaissance de formes signale les configurations à haute probabilité en quelques millisecondes.", icon: Target },
  { n: "03", title: "Évaluation des Risques", desc: "La volatilité, la liquidité et la corrélation sont évaluées avant chaque transaction.", icon: ShieldCheck },
  { n: "04", title: "Exécution Automatisée", desc: "Les ordres sont acheminés directement vers votre échange avec un contrôle optimal du glissement.", icon: Rocket },
  { n: "05", title: "Optimisation des Profits", desc: "Les trailing stops adaptatifs et les prises de bénéfices partielles maximisent chaque avantage.", icon: TrendingUp },
];

export function BotWorkflow() {
  return (
    <section id="bot" className="relative overflow-hidden bg-[#0B0B14] py-28 text-white">
      <div className="pointer-events-none absolute inset-0 opacity-70 [background:radial-gradient(60%_60%_at_50%_0%,rgba(124,92,255,0.35),transparent_60%),radial-gradient(40%_60%_at_80%_80%,rgba(192,132,252,0.25),transparent_60%)]" />
      <div className="container-page relative">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary-glow">
            Bot de Trading IA
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl lg:leading-[1.05]">
            Trading autonome,
            <br />
            <span className="text-gradient">conçu pour gagner.</span>
          </h2>
          <p className="mt-5 text-lg text-white/60">
            Cinq couches d'intelligence fonctionnant en parfaite synchronisation — 24 heures sur 24,
            dans toutes les conditions de marché.
          </p>
        </div>

        <div className="mt-20 grid gap-6 md:grid-cols-5">
          {steps.map((s, i) => (
            <div key={s.n} className="relative">
              <div className="group relative h-full rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur transition-all hover:-translate-y-1 hover:bg-white/[0.07]">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold tracking-wider text-white/40">
                    ÉTAPE {s.n}
                  </span>
                  <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-brand text-white shadow-[0_8px_30px_-8px_rgba(124,92,255,0.7)]">
                    <s.icon className="h-5 w-5" />
                  </span>
                </div>
                <h3 className="mt-6 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{s.desc}</p>
              </div>
              {i < steps.length - 1 && (
                <div className="absolute top-1/2 -right-3 hidden h-px w-6 bg-gradient-to-r from-white/30 to-transparent md:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
