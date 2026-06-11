import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useRouter } from "@tanstack/react-router";

export function AuthModal({
  type,
  onClose,
}: {
  type: "login" | "signup";
  onClose: () => void;
}) {
  const [isLogin, setIsLogin] = useState(type === 'login');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  useEffect(() => {
    setIsLogin(type === 'login');
    setErrorMsg("");
  }, [type]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const name = formData.get('name') as string;
    const phone = formData.get('phone') as string;

    try {
      if (isLogin) {
        const res = await fetch("http://localhost:5000/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Échec de la connexion");
        localStorage.setItem("aurore_user", JSON.stringify(data.user));
      } else {
        const res = await fetch("http://localhost:5000/api/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, phone })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Échec de l'inscription");
        localStorage.setItem("aurore_user", JSON.stringify(data.user));
      }
      localStorage.setItem('auth', 'true');
      onClose();
      router.navigate({ to: '/dashboard' });
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err?.message || "Une erreur s'est produite. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center overflow-y-auto bg-black/40 p-4 backdrop-blur-xl">
      <div className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-primary/10 bg-background p-6 sm:p-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)]">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full bg-black/5 text-ink hover:bg-black/10"
        >
          <X className="h-4 w-4" />
        </button>

        <h2 className="text-center font-display text-3xl font-bold text-ink">
          {isLogin ? 'Bon retour' : 'Créer un compte'}
        </h2>
        <p className="mt-2 text-center text-base text-ink-soft">
          {isLogin ? 'Entrez votre e-mail pour accéder à votre tableau de bord' : 'Rejoignez Aurore Capital et commencez à trader'}
        </p>

        {errorMsg && (
          <div className="mt-6 rounded-xl bg-rose-50 p-4 text-center text-sm font-semibold text-rose-600 border border-rose-100">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          {!isLogin && (
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-1 block text-base font-medium text-ink">
                  Nom complet
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="w-full rounded-xl border border-primary/20 bg-primary/5 px-4 py-3 text-base text-ink outline-none transition-colors focus:border-primary/50 focus:bg-background"
                  placeholder="Marcus Chen"
                />
              </div>
              <div>
                <label htmlFor="phone" className="mb-1 block text-base font-medium text-ink">
                  Numéro de mobile
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  className="w-full rounded-xl border border-primary/20 bg-primary/5 px-4 py-3 text-base text-ink outline-none transition-colors focus:border-primary/50 focus:bg-background"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
            </div>
          )}
          <div>
            <label htmlFor="email" className="mb-1 block text-base font-medium text-ink">
              Adresse e-mail
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full rounded-xl border border-primary/20 bg-primary/5 px-4 py-3 text-base text-ink outline-none transition-colors focus:border-primary/50 focus:bg-background"
              placeholder="hello@example.com"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-gradient-brand py-3 text-base font-semibold text-white shadow-md transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {loading ? 'Traitement...' : isLogin ? 'Se connecter' : "S'inscrire"}
          </button>
        </form>

        <div className="mt-6 text-center text-base text-ink-soft">
          {isLogin ? "Vous n'avez pas de compte ? " : 'Vous avez déjà un compte ? '}
          <button onClick={() => setIsLogin(!isLogin)} className="font-semibold text-primary hover:underline">
            {isLogin ? "S'inscrire" : 'Se connecter'}
          </button>
        </div>
      </div>
    </div>
  );
}
