"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const navItems = {
  en: [
    { hash: "about", label: "About" },
    { hash: "projects", label: "Work" },
  ],
  ja: [
    { hash: "about", label: "About" },
    { hash: "projects", label: "Work" },
  ],
};

export default function TopNavigation() {
  const pathname = usePathname();
  const { language } = useLanguage();
  const [isDark, setIsDark] = useState(false);
  const pathParts = pathname.replace(/^\/+/, "").split("/");
  const activeVariant = pathParts[0] === "ai" || pathParts[0] === "swe" ? pathParts[0] : "";
  const basePath = activeVariant ? `/${activeVariant}` : "/";

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-black/10 bg-[#fbfbfa]/88 backdrop-blur-md dark:border-white/10 dark:bg-[#111312]/88">
      <nav className="mx-auto flex h-14 max-w-7xl items-center justify-between px-5 md:px-8">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsDark((current) => !current)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#cfdad3] bg-white text-sm font-bold text-[#5f756c] shadow-sm transition-colors hover:bg-[#f0f4f1] dark:border-white/15 dark:bg-[#1b1f1d] dark:text-[#d9e4de] dark:hover:bg-[#242b27]"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            title={isDark ? "Dark mode" : "Light mode"}
          >
            {isDark ? (
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M21 14.3A8.3 8.3 0 0 1 9.7 3a.75.75 0 0 0-.9-.9 10 10 0 1 0 13.1 13.1.75.75 0 0 0-.9-.9Z" />
              </svg>
            ) : (
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
              </svg>
            )}
          </button>
        </div>

        <div className="mr-28 flex items-center gap-5 text-sm font-semibold text-[#5f6662] md:mr-36 md:gap-10 dark:text-[#c6d2cc]">
          {navItems[language].map((item) => (
            <Link
              key={item.hash}
              href={`${basePath}#${item.hash}`}
              className="transition-colors hover:text-[#496b5f] dark:hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
