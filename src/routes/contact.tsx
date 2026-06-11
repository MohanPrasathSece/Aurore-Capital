import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Mail, Phone, MapPin, Twitter, Linkedin, Github, ArrowUpRight } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Aurore Capital AI" },
      { name: "description", content: "Entrez en contact avec l'équipe Aurore Capital AI. Parlez aux ventes, au support ou aux partenariats." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name") as string,
          email: formData.get("email") as string,
          phone: formData.get("phone") as string,
          message: formData.get("message") as string,
        })
      });
      if (!res.ok) throw new Error("Failed");
      setSuccess(true);
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l'envoi du message. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <Header />
      <section className="relative pt-36 pb-24 md:pt-44">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[500px] bg-[radial-gradient(60%_50%_at_50%_0%,rgba(124,92,255,0.18),transparent_70%)]" />
        <div className="container-page relative">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gradient">Contact</p>
            <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-ink sm:text-5xl md:text-6xl lg:text-[80px] lg:leading-[1.02]">
              Parlons <span className="text-gradient">trading.</span>
            </h1>
          </div>
          <div className="mx-auto mt-16 grid max-w-6xl gap-8 lg:grid-cols-[1fr_1.2fr]">
            <div className="space-y-5">
              <div className="rounded-3xl border border-primary/10 bg-white p-8 shadow-card">
                <h2 className="text-xl font-semibold text-ink">Siège social d'Aurore Capital AI</h2>
                <ul className="mt-7 space-y-5">
                  <Info Icon={MapPin} label="Adresse" value="One Financial Plaza, New York" />
                  <Info Icon={Mail} label="E-mail" value="hello@aurorecapital.com" href="mailto:hello@aurorecapital.com" />
                </ul>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="rounded-3xl border border-primary/10 bg-white p-6 sm:p-8 shadow-elevated md:p-10">
              {success ? (
                <div className="text-center py-12">
                  <h3 className="text-2xl font-bold text-ink">Message envoyé !</h3>
                  <p className="mt-2 text-ink-soft">Nous vous répondrons sous peu.</p>
                </div>
              ) : (
                <>
                  <div className="grid gap-5 md:grid-cols-2">
                    <Field name="name" label="Nom complet" required />
                    <Field name="email" label="E-mail" type="email" required />
                    <Field name="phone" label="Numéro" />
                  </div>
                  <div className="mt-5">
                    <label className="text-sm font-medium text-ink">Message</label>
                    <textarea name="message" required rows={5} className="mt-2 w-full rounded-2xl border border-primary/20 bg-secondary/40 px-4 py-3 text-sm text-ink outline-none transition-shadow focus:border-primary focus:bg-white focus:shadow-[0_0_0_4px_rgba(124,92,255,0.15)]" />
                  </div>
                  <button type="submit" disabled={loading} className="group mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-7 py-4 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 disabled:opacity-50">
                    {loading ? "Envoi en cours..." : "Envoyer le message"}
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

function Info({ Icon, label, value, href }: { Icon: typeof Mail; label: string; value: string; href?: string }) {
  return (
    <li>
      <div className="flex items-start gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent text-primary"><Icon className="h-4 w-4" /></span>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-ink-soft">{label}</p>
          <p className="mt-0.5 text-sm font-medium text-ink">{value}</p>
        </div>
      </div>
    </li>
  );
}

function Field({ name, label, type = "text", required = false }: { name: string; label: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="text-sm font-medium text-ink">{label}</label>
      <input name={name} type={type} required={required} className="mt-2 w-full rounded-2xl border border-primary/20 bg-secondary/40 px-4 py-3 text-sm text-ink outline-none transition-shadow focus:border-primary focus:bg-white focus:shadow-[0_0_0_4px_rgba(124,92,255,0.15)]" />
    </div>
  );
}
