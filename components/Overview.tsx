"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { ReactNode } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const focusItems = [
  {
    title: { en: "Problem-Driven Product Development", ja: "現場課題起点のプロダクト開発" },
    description: {
      en: "Turning real-world problems into usable software systems.",
      ja: "現場の課題を整理し、使われるシステムとして形にします。",
    },
    icon: (
      <svg viewBox="0 0 24 24" className="h-9 w-9" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 4a3 3 0 0 0-3 3v10a3 3 0 0 0 6 0V7a3 3 0 0 0-3-3Z" />
        <path d="M8.5 8H7a3 3 0 0 0 0 6h1.5M15.5 8H17a3 3 0 0 1 0 6h-1.5M9 12h6M12 4V2M12 22v-2" />
      </svg>
    ),
  },
  {
    title: { en: "Full-stack development", ja: "フルスタック開発" },
    description: {
      en: "Building complete web applications from frontend to backend.",
      ja: "フロントエンドからAPI実装まで、実用性を重視して開発します。",
    },
    icon: (
      <svg viewBox="0 0 24 24" className="h-9 w-9" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" />
      </svg>
    ),
  },
  {
    title: { en: "AI / LLM Integration", ja: "AI / LLM活用" },
    description: {
      en: "Creating AI-powered features that improve workflows and user experiences.",
      ja: "AIを業務改善やユーザー体験につながる機能として実装します。",
    },
    icon: (
      <svg viewBox="0 0 24 24" className="h-9 w-9" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 3v5M6 13v5M18 13v5M12 8h-2v5h4V8h-2ZM4 18h4v3H4zM16 18h4v3h-4zM12 13H6v5M12 13h6v5" />
      </svg>
    ),
  },
];

const skillGroups = [
  {
    title: "Frontend",
    skills: [
      { name: "TypeScript", level: 3 },
      { name: "React", level: 3 },
      { name: "Next.js", level: 3 },
      { name: "Tailwind CSS", level: 3 },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "C / C++", level: 3 },
      { name: "Python", level: 3 },
      { name: "FastAPI", level: 2 },
      { name: "PostgreSQL", level: 2 },
    ],
  },
  {
    title: "AI / ML",
    skills: [
      { name: "PyTorch", level: 4 },
      { name: "scikit-learn", level: 2 },
      { name: "LLM / RAG", level: 2 },
    ],
  },
  {
    title: "Other",
    skills: [
      { name: "AWS", level: 1 },
      { name: "Docker", level: 2 },
      { name: "Git", level: 3 },
    ],
  },
];

const experiences = [
  {
    company: "Yappli",
    role: "AI Engineer",
    type: "Internship",
    period: "Jul 2026 - Aug 2026",
    description: { en: "Analyzed user data to identify product issues and designed and implemented improvements for an AI-powered BI product.", ja: "データ分析から課題設定、UI/UX設計、Frontend/Backend実装まで一貫してプロダクト改善を担当。" },
    logo: "/logo/yappli_logo.jpeg",
  },
  {
    company: "EQUES",
    role: "AI Engineer",
    type: "Internship",
    period: "Feb 2026 - Present",
    description: {
      en: "Investigated and implemented methods to improve document review features for pharmaceutical companies using RAG and other techniques.",
      ja: "製薬会社向けの文書レビュー機能改善のための手法を、RAGなどの技術を使い調査・実装。",
    },
    logo: "/logo/eques_logo.jpeg",
  },
  {
    company: "STAR UP",
    role: "Software Engineer",
    type: "Internship",
    period: "May 2025 - Feb 2026",
    description: {
      en: "Led feature development for a manufacturing SaaS platform.",
      ja: "製造業向けSaaSの新機能開発をリード。",
    },
    logo: "/logo/star_up_logo.jpeg",
  },
  {
    company: "Kuwabara Orthopedic Clinic",
    role: "Software Engineer",
    type: "Freelance",
    period: "May 2024 - Jul 2024",
    description: {
      en: "Developed and maintained the official website and internal management system from scratch.",
      ja: "公式サイトや業務効率化システムを0→1開発・運用。",
    },
    logo: "/logo/kuwabara_ortho_logo.jpeg",
  },
  {
    company: "University of Toronto Japanese Network",
    role: "Software Engineer",
    type: "Team Member",
    period: "Sep 2023 - Present",
    description: {
      en: "Developed and maintained the official website with team members.",
      ja: "サークルの公式Webサイトをチームで開発・運用。",
    },
    logo: "/logo/utjn_logo.jpeg",
  },
];

function Panel({
  title,
  children,
  className = "",
  id,
}: {
  title: string;
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 28, scale: 0.96, filter: "blur(18px)" }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.72, ease: "easeOut" }}
      className={`scroll-mt-20 rounded-lg border border-black/12 bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.03)] dark:border-white/10 dark:bg-[#171b19] ${className}`}
    >
      <h2 className="text-[15px] font-bold text-[#242424] dark:text-[#f4f7f5]">{title}</h2>
      {children}
    </motion.div>
  );
}

export default function Overview() {
  const { language } = useLanguage();
  const copy = {
    en: {
      eyebrow: "About",
      title: "What I experienced, where I learn, and how I work.",
      focus: "What I focus on",
      education: "Education",
      major: "・Computer Engineering Major",
      minor: "・AI Minor",
      expected: "2023 - 2028 (Expected)",
      skills: "Skills",
      skillLevels: ["Basic", "Product", "Practical"],
      experience: "Experience highlights",
    },
    ja: {
      eyebrow: "About",
      title: "What I experienced, where I learn, and how I work.",
      focus: "注力領域",
      education: "学歴",
      major: "・コンピュータ工学 専攻",
      minor: "・AI 副専攻",
      expected: "2023 - 2028 (予定)",
      skills: "スキル",
      skillLevels: ["Basic", "Product", "Practical"],
      experience: "経験",
    },
  }[language];

  return (
    <section id="about" className="flex min-h-screen scroll-mt-20 items-center px-6 py-24 md:px-8">
      <div className="w-full">
      <div className="mx-auto mb-5 max-w-7xl">
        <p className="text-sm font-bold uppercase text-[#68887b] dark:text-[#9bb8aa]">{copy.eyebrow}</p>
        <h2 className="mt-1 text-lg font-bold text-[#242424] dark:text-[#f4f7f5]">
          {copy.title}
        </h2>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.02fr_1fr_1.08fr]"
      >
        <Panel title={copy.skills} className="self-start">
          <div className="mt-3 flex justify-end gap-2 text-[10px] font-semibold text-[#8a8f8c] dark:text-[#a9b5af]">
            {copy.skillLevels.map((label) => (
              <span key={label} className="w-12 text-center">{label}</span>
            ))}
          </div>
          <div className="mt-2 grid gap-2.5">
            {skillGroups.map((group) => (
              <div key={group.title} className="rounded-md border border-black/10 bg-[#fbfbfa] px-3 py-2.5 dark:border-white/10 dark:bg-[#171b19]">
                <h3 className="text-xs font-bold uppercase text-[#68887b] dark:text-[#9bb8aa]">{group.title}</h3>
                <div className="mt-2 space-y-1.5">
                  {group.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-xs font-semibold text-[#3f4341] dark:text-[#dfe7e2]">{skill.name}</span>
                        <span className="sr-only">{skill.level} out of 3</span>
                        <div className="grid w-40 grid-cols-3 gap-1" aria-hidden="true">
                          {Array.from({ length: 3 }).map((_, index) => (
                            <motion.span
                              key={index}
                              initial={{ opacity: 0.35, scaleX: 0.35 }}
                              whileInView={{ opacity: 1, scaleX: 1 }}
                              viewport={{ once: true, margin: "-60px" }}
                              transition={{ duration: 0.35, delay: index * 0.06, ease: "easeOut" }}
                              className={`h-2 origin-left rounded-full ${
                                index < skill.level
                                  ? "bg-[#68887b] dark:bg-[#9bb8aa]"
                                  : "bg-[#dce5df] dark:bg-[#2c332f]"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Panel>

        <div className="grid gap-6">
          <Panel title={copy.education}>
            <div className="mt-6 flex items-center gap-5">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-md border border-black/8 bg-white p-2 shadow-sm dark:border-white/10">
                <Image
                  src="/logo/university_of_toronto_logo.jpeg"
                  alt="University of Toronto logo"
                  width={80}
                  height={80}
                  className="h-full w-full object-contain"
                />
              </div>
              <div>
                <h3 className="text-[15px] font-bold text-[#242424] dark:text-[#f4f7f5]">University of Toronto</h3>
                <span className="mt-3 inline-flex rounded-md bg-[#f0f4f1] px-3 py-1.5 text-xs font-semibold text-[#6b736f] dark:bg-[#222824] dark:text-[#c6d2cc]">
                  {copy.expected}
                </span>
                <p className="mt-2 text-sm text-[#4b504d] dark:text-[#c6d2cc]">{copy.major}</p>
                <p className="mt-1 text-sm text-[#4b504d] dark:text-[#c6d2cc]">{copy.minor}</p>
              </div>
            </div>
          </Panel>

          <Panel title={copy.focus}>
            <div className="mt-5 space-y-3">
              {focusItems.map((item) => (
                <motion.div
                  key={item.title.en}
                  initial={{ opacity: 0, x: -16, scale: 0.98, filter: "blur(12px)" }}
                  whileInView={{ opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.55, ease: "easeOut" }}
                  className="flex gap-4 rounded-md border border-black/10 p-3 dark:border-white/10"
                >
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-md bg-[#f0f4f1] text-[#68887b] dark:bg-[#222824] dark:text-[#9bb8aa]">
                    {item.icon}
                  </div>
                  <div className="self-center">
                    <h3 className="text-sm font-bold text-[#242424] dark:text-[#f4f7f5]">{item.title[language]}</h3>
                    <p className="mt-1 text-xs leading-5 text-[#5f6662] dark:text-[#c6d2cc]">{item.description[language]}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </Panel>
        </div>

        <Panel title={copy.experience}>
          <div className="relative mt-5 space-y-5 pl-5">
            <div className="absolute bottom-4 left-[5px] top-2 w-px bg-[#d6dfda] dark:bg-white/15" />
            {experiences.map((experience) => (
              <motion.div
                key={experience.company}
                initial={{ opacity: 0, y: 18, scale: 0.98, filter: "blur(12px)" }}
                whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, ease: "easeOut" }}
                className="relative border-b border-black/10 pb-5 last:border-b-0 last:pb-0 dark:border-white/10"
              >
                <span className="absolute -left-[19px] top-2.5 h-2.5 w-2.5 rounded-full bg-[#68887b] ring-4 ring-white dark:ring-[#171b19]" />
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-md border border-black/8 bg-white p-1.5 shadow-sm dark:border-white/10">
                    <Image
                      src={experience.logo}
                      alt={`${experience.company} logo`}
                      width={48}
                      height={48}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="min-w-0 whitespace-nowrap text-[15px] font-bold leading-tight text-[#242424] dark:text-[#f4f7f5]">{experience.role}</h3>
                      <span className="shrink-0 self-start rounded-md bg-[#f0f4f1] px-2.5 py-1 text-[11px] font-semibold leading-none text-[#6b736f] dark:bg-[#222824] dark:text-[#c6d2cc]">
                        {experience.period}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-[#242424] dark:text-[#dfe7e2]">
                      {experience.company} · {experience.type}
                    </p>
                    <p className="mt-2 text-xs leading-5 text-[#4b504d] dark:text-[#c6d2cc]">{experience.description[language]}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Panel>
      </motion.div>
      </div>
    </section>
  );
}
