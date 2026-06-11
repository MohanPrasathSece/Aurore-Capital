import { ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
export function CtaBand() {
  return (
    <section className="py-20">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-br from-[#0F172A] via-[#221b4b] to-[#3b1d6e] p-8 md:p-16 lg:p-20 text-white">
          <div className="pointer-events-none absolute inset-0 [background:radial-gradient(50%_60%_at_80%_20%,rgba(192,132,252,0.35),transparent_60%),radial-gradient(40%_50%_at_10%_80%,rgba(124,92,255,0.35),transparent_60%)]" />
          <div className="relative mx-auto max-w-3xl text-center">
            <h2 className="font-display text-3xl font-bold leading-[1.05] tracking-tight md:text-4xl lg:text-5xl">
              L'IA ne dort pas.
              <br />
              <span className="text-gradient">Votre portefeuille non plus.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-white/70">
              Rejoignez plus de 50 000 traders qui utilisent Aurore Capital pour capturer chaque mouvement — sur chaque marché, 24 heures sur 24.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                search={{ auth: "signup" }}
                className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-base font-semibold text-ink transition-transform hover:-translate-y-0.5"
              >
                Démarrer l'essai gratuit
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <a
                href="#pricing"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-7 py-4 text-base font-semibold text-white backdrop-blur transition-colors hover:bg-white/15"
              >
                Voir les tarifs
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
