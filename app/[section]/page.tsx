import { notFound } from "next/navigation";
import Home from "../page";

const supportedSections = new Set([
  "about",
  "experience",
  "skill",
  "skills",
  "certification",
  "certifications",
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
  const normalizedSection = section.toLowerCase();

  if (!supportedSections.has(normalizedSection)) {
    notFound();
  }

  return <Home />;
}
