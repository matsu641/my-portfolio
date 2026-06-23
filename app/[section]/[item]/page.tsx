import { notFound } from "next/navigation";
import { projectSlugSet } from "@/lib/projectRoutes";
import Home from "../../page";

export default async function ProjectItemPage({
  params,
}: {
  params: Promise<{ section: string; item: string }>;
}) {
  const { section, item } = await params;
  const normalizedSection = section.toLowerCase();
  const normalizedItem = item.toLowerCase();

  if (
    normalizedSection !== "project" &&
    normalizedSection !== "projects"
  ) {
    notFound();
  }

  if (!projectSlugSet.has(normalizedItem)) {
    notFound();
  }

  return <Home />;
}
