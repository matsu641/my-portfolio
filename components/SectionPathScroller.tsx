"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

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
  const path = pathname.replace(/^\/+|\/+$/g, "").toLowerCase();
  return sectionByPath[path];
}

export default function SectionPathScroller() {
  const pathname = usePathname();

  useEffect(() => {
    const sectionId = getSectionIdFromPath(pathname);
    if (!sectionId) return;

    requestAnimationFrame(() => {
      document.getElementById(sectionId)?.scrollIntoView({ block: "start" });
    });
  }, [pathname]);

  return null;
}
