"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { ReactNode } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

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
    category: "work",
    company: "Powerline Connect Inc.",
    role: "Software Engineer",
    type: "Full-time Co-op",
    period: "Sep 2026 - Sep 2027",
    location: { en: "Canada", ja: "カナダ" },
    description: {
      en: "Developing new features, improving existing functionality, and proposing product enhancements.",
      ja: "新機能の開発、既存機能の改修、プロダクトの改善提案を担当。",
    },
    logo: "/logo/powerline_connect_logo.svg",
  },
  {
    category: "shortInternship",
    company: "株式会社ヤプリ",
    role: "Data Science Program Participant",
    type: "Internship",
    period: "Jul 2026 - Aug 2026",
    location: { en: "Japan", ja: "日本" },
    description: { en: "Analyzed user data to identify product issues and designed and implemented improvements for an AI-powered BI product.", ja: "データ分析から課題設定、UI/UX設計、Frontend/Backend実装まで一貫してプロダクト改善を担当。" },
    logo: "/logo/yappli_logo.jpeg",
  },
  {
    category: "shortInternship",
    company: "株式会社アットマーク・ソリューション",
    role: "Project Participant",
    type: "Internship",
    period: "Jul 2026 - Aug 2026",
    location: { en: "Japan", ja: "日本" },
    description: {
      en: "Analyzed issues in an education support platform, proposed improvements, and implemented an interactive demo.",
      ja: "教育支援プラットフォームの課題整理、改善提案、操作できるデモの実装を担当。",
    },
    logo: "/logo/atmark_solution_logo.png",
  },
  {
    category: "work",
    company: "株式会社EQUES",
    role: "AI Engineer",
    type: "Part-time",
    period: "Feb 2026 - Aug 2026",
    location: { en: "Japan", ja: "日本" },
    description: {
      en: "Investigated and implemented methods to improve document review features for pharmaceutical companies using RAG and other techniques.",
      ja: "製薬会社向けの文書レビュー機能改善のための手法を、RAGなどの技術を使い調査・実装。",
    },
    logo: "/logo/eques_logo.jpeg",
  },
  {
    category: "work",
    company: "株式会社STAR UP",
    role: "Software Engineer",
    type: "Part-time",
    period: "May 2025 - Feb 2026",
    location: { en: "Japan", ja: "日本" },
    description: {
      en: "Led feature development for a manufacturing SaaS platform.",
      ja: "製造業向けSaaSの新機能開発をリード。",
    },
    logo: "/logo/star_up_logo.jpeg",
  },
  {
    category: "work",
    company: "くわばら整形外科",
    role: "Software Engineer",
    type: "Contract",
    period: "May 2024 - Jul 2024",
    location: { en: "Japan", ja: "日本" },
    description: {
      en: "Developed and maintained the official website and internal management system from scratch.",
      ja: "公式サイトや業務効率化システムを0→1開発・運用。",
    },
    logo: "/logo/kuwabara_ortho_logo.jpeg",
  },
  {
    category: "extracurricular",
    company: "University of Toronto Japanese Network",
    role: "Web Development Member",
    type: "日本人学生団体",
    period: "Sep 2023 - Present",
    location: { en: "Canada", ja: "カナダ" },
    description: {
      en: "Developed and maintained the official website with team members.",
      ja: "サークルの公式Webサイトをチームで開発・運用。",
    },
    logo: "/logo/utjn_logo.jpeg",
  },
];

const experienceGroups = [
  {
    key: "work",
    title: { en: "Work Experience", ja: "職務経験" },
  },
  {
    key: "shortInternship",
    title: { en: "Short-term Internships", ja: "短期インターン" },
  },
  {
    key: "extracurricular",
    title: { en: "Extracurricular Activities", ja: "課外活動" },
  },
] as const;

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
      title: "Education, skills, and experience.",
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
      title: "学歴・スキル・経験",
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
        className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.82fr_1.38fr] lg:items-start"
      >
        <div className="grid content-start gap-6">
        <Panel
          title={copy.skills}
          className="order-2 self-start"
        >
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

        <div className="order-1 grid gap-6">
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
        </div>
        </div>

        <Panel
          title={copy.experience}
          className="self-start"
        >
          <div className="mt-5 space-y-8">
            {experienceGroups.map((group) => (
              <section key={group.key}>
                <h3 className="text-xs font-bold uppercase tracking-[0.08em] text-[#68887b] dark:text-[#9bb8aa]">
                  {group.title[language]}
                </h3>
                <div className="relative mt-4 space-y-5 pl-5 lg:space-y-6">
                  <div className="absolute bottom-4 left-[5px] top-2 w-px bg-[#d6dfda] dark:bg-white/15" />
                  {experiences
                    .filter((experience) => experience.category === group.key)
                    .map((experience) => (
                      <motion.div
                        key={experience.company}
                        initial={{ opacity: 0, y: 18, scale: 0.98, filter: "blur(12px)" }}
                        whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.55, ease: "easeOut" }}
                        className="relative border-b border-black/10 pb-5 last:border-b-0 last:pb-0 dark:border-white/10 lg:pb-6 lg:last:pb-0"
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
                              <h4 className="min-w-0 text-[15px] font-bold leading-tight text-[#242424] dark:text-[#f4f7f5]">
                                {experience.role}
                              </h4>
                              <span className="shrink-0 self-start rounded-md bg-[#f0f4f1] px-2.5 py-1 text-[11px] font-semibold leading-none text-[#6b736f] dark:bg-[#222824] dark:text-[#c6d2cc]">
                                {experience.period}
                              </span>
                            </div>
                            <p className="mt-1 text-xs text-[#242424] dark:text-[#dfe7e2]">
                              {experience.company} · {experience.type} · {experience.location[language]}
                            </p>
                            <p className="mt-2 text-xs leading-5 text-[#4b504d] dark:text-[#c6d2cc]">
                              {experience.description[language]}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                </div>
              </section>
            ))}
          </div>
        </Panel>
      </motion.div>
      </div>
    </section>
  );
}
