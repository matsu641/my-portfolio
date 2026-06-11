import { notFound } from "next/navigation";
import Home from "../page";

const supportedSections = new Set([
  "about",
  "skill",
  "skills",
  "project",
  "projects",
  "contact",
]);

export default async function SectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;

  if (!supportedSections.has(section.toLowerCase())) {
    notFound();
  }

  return <Home />;
}
