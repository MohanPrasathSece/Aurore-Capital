import { Link } from "@tanstack/react-router";
import { Twitter, Github, Linkedin, Send } from "lucide-react";
import logoIcon from "@/components/logoicon.png";

export function Footer() {
  return (
    <footer className="border-t border-black/5 bg-secondary/50 pt-20 pb-10">
      <div className="container-page">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]">
          <div>
            <Link to="/" className="flex items-center gap-2">
              <img src={logoIcon} alt="Aurore Capital Logo" className="h-9 w-9 object-contain" />
              <span className="text-lg font-semibold tracking-tight text-ink">
                Aurore Capital<span className="text-gradient"> AI</span>
              </span>
            </Link>
            <p className="mt-5 max-w-xs text-base leading-relaxed text-ink-soft">
              Intelligence de trading IA institutionnelle pour le marché
              crypto moderne.
            </p>
            <div className="mt-6 flex items-center gap-2">
              {[Twitter, Github, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="grid h-10 w-10 place-items-center rounded-full border border-black/5 bg-white text-ink-soft transition-colors hover:bg-ink hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <Col title="Produit" links={[
            { label: "Signaux", href: "#features" },
            { label: "Bot de trading", href: "#performance" },
            { label: "Gestion des risques", href: "#features" },
            { label: "Analytique", href: "#performance" }
          ]} />
          <Col title="Entreprise" links={[
            { label: "À propos", href: "#" },
            { label: "Carrières", href: "#" },
            { label: "Presse", href: "#" },
            { label: "Contact", href: "/contact" }
          ]} />
          <Col title="Légal" links={[
            { label: "Politique de confidentialité", href: "#" },
            { label: "Conditions d'utilisation", href: "#" },
            { label: "Avertissement sur les risques", href: "#" },
            { label: "Cookies", href: "#" }
          ]} />
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-black/5 pt-8 text-sm text-ink-soft md:flex-row">
          <p>© {new Date().getFullYear()} Aurore Capital AI. Tous droits réservés.</p>
          <p className="max-w-xl text-center md:text-right">
            Le trading de crypto implique des risques. Les performances passées ne préjugent pas des
            résultats futurs. Tradez de manière responsable.
          </p>
        </div>
      </div>
    </footer>
  );
}

function Col({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <p className="text-base font-semibold text-ink">{title}</p>
      <ul className="mt-4 space-y-3">
        {links.map((l) => (
          <li key={l.label}>
            <a href={l.href} onClick={(e) => l.href === "#" && e.preventDefault()} className="text-base text-ink-soft transition-colors hover:text-ink">
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
