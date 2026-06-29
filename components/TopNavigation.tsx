"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { hash: "home", label: "Home", match: [""] },
  { hash: "projects", label: "Projects", match: ["project", "projects"] },
  { hash: "experience", label: "Experience", match: ["experience"] },
  { hash: "skills", label: "Skills", match: ["skill", "skills"] },
  { hash: "certifications", label: "Certifications", match: ["certification", "certifications"] },
  { hash: "contact", label: "Contact", match: ["contact"] },
];

export default function TopNavigation() {
  const pathname = usePathname();
  const pathParts = pathname.replace(/^\/+/, "").split("/");
  const activeVariant = pathParts[0] === "ai" || pathParts[0] === "swe" ? pathParts[0] : "";
  const currentSection = activeVariant ? pathParts[1]?.toLowerCase() || "" : pathParts[0].toLowerCase();
  const basePath = activeVariant ? `/${activeVariant}` : "/";

  return (
    <nav className="fixed left-0 right-0 top-0 z-40 px-4 py-5 pr-36 md:pr-48">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-end gap-5 md:gap-9">
        {navItems.map((item) => {
          const isActive = item.match.includes(currentSection);

          return (
            <Link
              key={item.hash}
              href={`${basePath}#${item.hash}`}
              aria-current={isActive ? "page" : undefined}
              className={`text-sm font-semibold transition-colors drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)] md:text-base ${
                isActive
                  ? "text-cyan-200"
                  : "text-white/78 hover:text-cyan-100"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
