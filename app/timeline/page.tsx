import type { Metadata } from "next";
import LanguageToggle from "@/components/LanguageToggle";
import Timeline from "@/components/Timeline";
import TopNavigation from "@/components/TopNavigation";

export const metadata: Metadata = {
  title: "My Timeline | Portfolio",
  description: "My journey, milestones, and the things I am building next.",
};

export default function TimelinePage() {
  return (
    <main className="min-h-screen">
      <TopNavigation />
      <LanguageToggle />
      <Timeline />
    </main>
  );
}
