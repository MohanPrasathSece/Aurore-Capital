import { useState } from "react";
import { Plus } from "lucide-react";

const faqs = [
  { q: "Quelle est la précision des signaux ?", a: "Notre moyenne vérifiée sur 12 mois se situe à 96,8 % de taux de réussite pour les stratégies BTC et ETH, avec un ratio risque/rendement moyen de 2,4×. Toutes les transactions sont auditables dans votre tableau de bord." },
  { q: "Quels échanges sont pris en charge ?", a: "Binance, Coinbase, Bybit, OKX, Kraken, KuCoin, Bitget et MEXC. De nouveaux échanges sont ajoutés en fonction de la demande des utilisateurs et de la clarté réglementaire." },
  { q: "Comment fonctionne le bot IA ?", a: "Le bot scanne en permanence plus de 400 paires, évalue les opportunités grâce à notre moteur de prédiction neuronale, applique des contraintes de risque, puis exécute via l'API de votre échange. Vous gardez le contrôle total du capital et des limites." },
  { q: "Les débutants peuvent-ils l'utiliser ?", a: "Absolument. Le plan Starter est conçu pour les nouveaux traders — recevez simplement les signaux sur Telegram et exécutez-les manuellement, ou activez le bot une fois que vous êtes à l'aise." },
  { q: "Quelles crypto-monnaies sont prises en charge ?", a: "Bitcoin, Ethereum et plus de 200 altcoins liquides sur les marchés au comptant et perpétuels. La couverture s'étend chaque mois." },
  { q: "À quelle vitesse les signaux sont-ils envoyés ?", a: "Les signaux sont envoyés sur Telegram, Discord et le tableau de bord dans les 1 à 2 secondes suivant leur génération. Le bot s'exécute en quelques millisecondes via les API d'échange." },
];

export function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="py-28">
      <div className="container-page">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gradient">FAQ</p>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink md:text-4xl lg:text-5xl lg:leading-[1.05]">
            Vos questions, nos réponses.
          </h2>
        </div>

        <div className="mx-auto mt-14 max-w-3xl divide-y divide-black/5 overflow-hidden rounded-3xl border border-black/5 bg-white shadow-card">
          {faqs.map((f, i) => {
            const isOpen = i === open;
            return (
              <button
                key={f.q}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="block w-full px-6 py-5 text-left transition-colors hover:bg-secondary/60 md:px-8"
              >
                <div className="flex items-center justify-between gap-6">
                  <span className="text-lg font-semibold text-ink">{f.q}</span>
                  <span
                    className={`grid h-9 w-9 shrink-0 place-items-center rounded-full bg-secondary text-ink transition-transform ${isOpen ? "rotate-45 bg-gradient-brand text-white" : ""}`}
                  >
                    <Plus className="h-4 w-4" />
                  </span>
                </div>
                <div
                  className={`grid overflow-hidden transition-all duration-300 ${isOpen ? "mt-3 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                >
                  <div className="overflow-hidden">
                    <p className="text-base leading-relaxed text-ink-soft">{f.a}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
