import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import LanguageToggle from "@/components/LanguageToggle";
import Overview from "@/components/Overview";
import Projects from "@/components/Projects";
import TopNavigation from "@/components/TopNavigation";
import type { PortfolioVariant } from "@/lib/portfolioVariants";

export default function PortfolioPage({
  variant = "default",
}: {
  variant?: PortfolioVariant;
}) {
  return (
    <main className="min-h-screen">
      <TopNavigation />
      <LanguageToggle />
      <Hero />
      <Overview />
      <Projects variant={variant} />
      <Contact />
    </main>
  );
}
