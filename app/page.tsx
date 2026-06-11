import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import LanguageToggle from "@/components/LanguageToggle";
import SectionPathScroller from "@/components/SectionPathScroller";

export default function Home() {
  return (
    <main className="min-h-screen">
      <SectionPathScroller />
      <LanguageToggle />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
    </main>
  );
}
