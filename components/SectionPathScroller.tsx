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

function scrollToElement(id: string, block: ScrollLogicalPosition) {
  document.getElementById(id)?.scrollIntoView({ block });
}

export default function SectionPathScroller() {
  const pathname = usePathname();

  useEffect(() => {
    const sectionId = getSectionIdFromPath(pathname);
    if (!sectionId) return;

    const isProjectItem = sectionId.startsWith("project-");
    const block: ScrollLogicalPosition = isProjectItem ? "center" : "start";
    let attempts = 0;
    const scrollWhenReady = () => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ block });
        return;
      }

      attempts += 1;
      if (attempts < 10) {
        requestAnimationFrame(scrollWhenReady);
      }
    };

    requestAnimationFrame(scrollWhenReady);

    if (isProjectItem) {
      const timeouts = [150, 400, 900].map((delay) =>
        window.setTimeout(() => scrollToElement(sectionId, block), delay)
      );

      return () => {
        timeouts.forEach((timeout) => window.clearTimeout(timeout));
      };
    }
  }, [pathname]);

  return null;
}
