import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Features } from "@/components/site/Features";
import { Testimonials } from "@/components/site/Testimonials";
import { CtaBand } from "@/components/site/CtaBand";
import { Faq } from "@/components/site/Faq";
import { Footer } from "@/components/site/Footer";
import { ScrollTop } from "@/components/site/ScrollTop";
import { FadeInUp } from "@/components/site/FadeInUp";

import { AuthModal } from "@/components/site/AuthModal";
import { useNavigate } from "@tanstack/react-router";

type SearchParams = {
  auth?: "login" | "signup";
};

export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>): SearchParams => {
    return {
      auth: (search.auth as "login" | "signup") || undefined,
    };
  },
  head: () => ({
    meta: [
      { title: "Aurore Capital" },
      {
        name: "description",
        content: "Aurore Capital",
      },
      { property: "og:title", content: "Aurore Capital" },
      { property: "og:description", content: "Aurore Capital" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

import { DemoSection } from "@/components/site/DemoSection";

function Index() {
  const { auth } = Route.useSearch();
  const navigate = useNavigate();

  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <Header />
      <Hero />
      <FadeInUp><DemoSection /></FadeInUp>
      <FadeInUp><Features /></FadeInUp>
      <FadeInUp><Testimonials /></FadeInUp>
      <FadeInUp><Faq /></FadeInUp>
      <FadeInUp><CtaBand /></FadeInUp>
      <Footer />
      <ScrollTop />
      {auth && (
        <AuthModal
          type={auth}
          onClose={() => navigate({ search: (prev: any) => ({ ...prev, auth: undefined }) })}
        />
      )}
    </main>
  );
}
