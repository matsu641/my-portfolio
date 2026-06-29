import About from "@/components/About";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import Experience from "@/components/Experience";
import Hero from "@/components/Hero";
import LanguageToggle from "@/components/LanguageToggle";
import Projects from "@/components/Projects";
import SectionPathScroller from "@/components/SectionPathScroller";
import Skills from "@/components/Skills";
import TopNavigation from "@/components/TopNavigation";
import type { PortfolioVariant } from "@/lib/portfolioVariants";

export default function PortfolioPage({
  variant = "default",
}: {
  variant?: PortfolioVariant;
}) {
  return (
    <main className="min-h-screen">
      <SectionPathScroller />
      <TopNavigation />
      <LanguageToggle />
      <Hero />
      <Projects variant={variant} />
      <About />
      <Experience variant={variant} />
      <Skills />
      <Certifications />
      <Contact />
    </main>
  );
}
