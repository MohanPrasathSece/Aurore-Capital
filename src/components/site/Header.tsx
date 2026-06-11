import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logoIcon from "@/components/logoicon.png";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Features", href: "#features" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    setIsAuth(!!localStorage.getItem("auth"));
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("auth");
    setIsAuth(false);
    window.location.href = "/";
  };

  return (
    <header className="fixed inset-x-0 top-5 z-50 flex justify-center px-4">
      <div
        className={`flex w-full max-w-[1180px] items-center justify-between rounded-full border border-black/5 px-3 py-2 transition-all duration-300 ${
          scrolled
            ? "bg-white/85 backdrop-saturate-150 backdrop-blur-xl shadow-[0_10px_40px_-20px_rgba(15,23,42,0.25)]"
            : "bg-white/60 backdrop-blur-md"
        }`}
      >
        <Link 
          to="/" 
          onClick={(e) => {
            if (window.location.pathname === "/") {
              window.scrollTo({ top: 0, behavior: "smooth" });
            } else if (window.location.pathname === "/dashboard") {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className="flex items-center gap-2 pl-3"
        >
          <img src={logoIcon} alt="Aurore Capital Logo" className="h-8 w-8 object-contain" />
          <span className="text-lg font-semibold tracking-tight text-ink">
            Aurore<span className="text-gradient"> Capital</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {!isAuth && (
            <>
              {navLinks.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  className="rounded-full px-4 py-2 text-base font-medium text-ink-soft transition-colors hover:bg-black/5 hover:text-ink"
                >
                  {l.label}
                </a>
              ))}
              <Link
                to="/contact"
                className="rounded-full px-4 py-2 text-base font-medium text-ink-soft transition-colors hover:bg-black/5 hover:text-ink"
              >
                Contact
              </Link>
            </>
          )}
        </nav>

        <div className="hidden items-center gap-2 pr-1 lg:flex">
          {isAuth ? (
            <>
              <Link
                to="/dashboard"
                className="rounded-full px-4 py-2 text-base font-medium text-ink-soft transition-colors hover:text-ink hover:bg-primary/10"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="group relative inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-base font-semibold text-white transition-transform hover:-translate-y-0.5"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                search={{ auth: "login" }}
                className="rounded-full px-4 py-2 text-base font-medium text-ink-soft transition-colors hover:text-ink hover:bg-primary/10"
              >
                Login
              </Link>
              <Link
                search={{ auth: "signup" }}
                className="group relative inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-base font-semibold text-white transition-transform hover:-translate-y-0.5"
              >
                Sign Up
                <span className="grid h-5 w-5 place-items-center rounded-full bg-white/15 transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </Link>
            </>
          )}
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((o) => !o)}
          className="grid h-10 w-10 place-items-center rounded-full hover:bg-black/5 lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="fixed inset-x-4 top-20 z-40 rounded-3xl border border-primary/10 bg-background/95 p-4 shadow-elevated backdrop-blur-xl lg:hidden">
          <nav className="flex flex-col">
            {!isAuth && (
              <>
                {navLinks.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="rounded-2xl px-4 py-3 text-lg font-medium text-ink hover:bg-primary/5"
                  >
                    {l.label}
                  </a>
                ))}
                <Link
                  to="/contact"
                  onClick={() => setOpen(false)}
                  className="rounded-2xl px-4 py-3 text-lg font-medium text-ink hover:bg-primary/5"
                >
                  Contact
                </Link>
              </>
            )}
            {isAuth ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={() => setOpen(false)}
                  className="rounded-2xl px-4 py-3 text-lg font-medium text-ink hover:bg-primary/5"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => { setOpen(false); handleLogout(); }}
                  className="mt-2 rounded-full bg-primary px-4 py-3 text-center text-lg font-semibold text-white"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  search={{ auth: "login" }}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl px-4 py-3 text-lg font-medium text-ink hover:bg-primary/5"
                >
                  Login
                </Link>
                <Link
                  search={{ auth: "signup" }}
                  onClick={() => setOpen(false)}
                  className="mt-2 rounded-full bg-primary px-4 py-3 text-center text-lg font-semibold text-white"
                >
                  Sign Up
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
