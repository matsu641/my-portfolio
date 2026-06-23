"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { projectSlugSet } from "@/lib/projectRoutes";

const sectionByPath: Record<string, string> = {
  about: "about",
  experience: "experience",
  skill: "skills",
  skills: "skills",
  certification: "certifications",
  certifications: "certifications",
  project: "projects",
  projects: "projects",
  contact: "contact",
};

export function getSectionIdFromPath(pathname: string) {
  const [section, item] = pathname
    .replace(/^\/+|\/+$/g, "")
    .toLowerCase()
    .split("/");

  if ((section === "project" || section === "projects") && item) {
    return projectSlugSet.has(item) ? `project-${item}` : "projects";
  }

  return sectionByPath[section];
}

export default function SectionPathScroller() {
  const pathname = usePathname();

  useEffect(() => {
    const sectionId = getSectionIdFromPath(pathname);
    if (!sectionId) return;

    let attempts = 0;
    const scrollWhenReady = () => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ block: "start" });
        return;
      }

      attempts += 1;
      if (attempts < 10) {
        requestAnimationFrame(scrollWhenReady);
      }
    };

    requestAnimationFrame(scrollWhenReady);
  }, [pathname]);

  return null;
}
