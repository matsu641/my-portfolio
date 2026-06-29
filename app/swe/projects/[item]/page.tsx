import { notFound } from "next/navigation";
import LanguageToggle from "@/components/LanguageToggle";
import { ProjectDetail } from "@/components/Projects";
import TopNavigation from "@/components/TopNavigation";
import { projectSlugSet } from "@/lib/projectRoutes";
import { projectIndicesByVariant } from "@/lib/portfolioVariants";
import { projectSlugs } from "@/lib/projectRoutes";

export default async function SweProjectDetailPage({
  params,
}: {
  params: Promise<{ item: string }>;
}) {
  const { item } = await params;
  const normalizedItem = item.toLowerCase();
  const sweProjectSlugs = new Set<string>(
    projectIndicesByVariant.swe?.map((projectIndex) => projectSlugs[projectIndex]) ?? []
  );

  if (!projectSlugSet.has(normalizedItem) || !sweProjectSlugs.has(normalizedItem)) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      <TopNavigation />
      <LanguageToggle />
      <ProjectDetail slug={normalizedItem} backHref="/swe#projects" />
    </main>
  );
}
