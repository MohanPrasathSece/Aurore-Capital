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
  const router = useRouter();

  useEffect(() => {
    setIsLogin(type === 'login');
  }, [type]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const name = formData.get('name') as string;
    const phone = formData.get('phone') as string;

    try {
      if (isLogin) {
        await loginFn({ data: { email } });
      } else {
        await signupFn({ data: { name, email, phone } });
      }
      // Save local state for demo purposes
      localStorage.setItem('auth', 'true');
      onClose();
      router.navigate({ to: '/dashboard' });
    } catch (err: any) {
      console.error(err);
      alert(err?.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-black/40 p-4 backdrop-blur-xl">
      <div className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-primary/10 bg-background p-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)]">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full bg-black/5 text-ink hover:bg-black/10"
        >
          <X className="h-4 w-4" />
        </button>

        <h2 className="text-center font-display text-2xl font-bold text-ink">
          {isLogin ? 'Welcome back' : 'Create an account'}
        </h2>
        <p className="mt-2 text-center text-sm text-ink-soft">
          {isLogin ? 'Enter your email to access your dashboard' : 'Join Aurore Capital and start trading'}
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          {!isLogin && (
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-1 block text-sm font-medium text-ink">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="w-full rounded-xl border border-primary/20 bg-primary/5 px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-primary/50 focus:bg-background"
                  placeholder="Marcus Chen"
                />
              </div>
              <div>
                <label htmlFor="phone" className="mb-1 block text-sm font-medium text-ink">
                  Mobile Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  className="w-full rounded-xl border border-primary/20 bg-primary/5 px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-primary/50 focus:bg-background"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
            </div>
          )}
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-ink">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full rounded-xl border border-primary/20 bg-primary/5 px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-primary/50 focus:bg-background"
              placeholder="hello@example.com"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-gradient-brand py-3 text-sm font-semibold text-white shadow-md transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {loading ? 'Processing...' : isLogin ? 'Log In' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-ink-soft">
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <button onClick={() => setIsLogin(!isLogin)} className="font-semibold text-primary hover:underline">
            {isLogin ? 'Sign up' : 'Log in'}
          </button>
        </div>
      </div>
    </div>
  );
}
