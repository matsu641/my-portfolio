"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { projectAssets } from "@/lib/projectAssets";
import { projectSlugs } from "@/lib/projectRoutes";
import {
  getVariantBasePath,
  projectIndicesByVariant,
  type PortfolioVariant,
} from "@/lib/portfolioVariants";

type ProjectSectionContent = string | string[];

type Project = {
  title: string;
  period: string;
  slug?: string;
  tags?: string[];
  background?: ProjectSectionContent;
  challenges?: ProjectSectionContent;
  solutions?: string[];
  learnings?: ProjectSectionContent;
  githubUrl?: string;
  slideUrl?: string;
  websiteUrl?: string;
  confusionMatrixImages?: string[];
  confusionMatrixLabels?: string[];
  analysisImages?: string[];
  analysisImageLabels?: string[];
  leaderboardImageUrl?: string;
  demoImageUrl?: string;
  demoMedia?: Array<{
    src: string;
    type: "image" | "video";
    label: string | {
      ja: string;
      en: string;
    };
  }>;
  demoImageUrls?: string[];
  videoUrl?: string;
  searchConsoleImageUrl?: string;
  thumbnailImageUrl?: string;
  featured?: boolean;
};

const selectedDefaultIndices = [
  5,
  // 2, // AI Document Review (temporarily hidden)
  3,
  0,
  // 6, // Clinic Reservation Management System (temporarily hidden)
  7,
  1,
  4,
  8,
];

const cleanTitle = (title: string) =>
  title
    .replace(/\s*\([^)]*\)/g, "")
    .replace("Interactive Map & Navigation System", "GIS Navigation System")
    .replace("Commit Message Reviewer", "AI Document Review")
    .replace("Chest X-ray Disease Classification", "Chest X-ray Classification")
    .replace("Clinic Inventory Management System", "Clinic Inventory Management System")
    .trim();

function resolveMediaLabel(
  label: string | { ja: string; en: string },
  language: "ja" | "en",
) {
  return typeof label === "string" ? label : label[language];
}

function getProjectPreview(project: Project, slug?: string): string | null {
  const candidates = [
    slug && slug in projectAssets
      ? projectAssets[slug as keyof typeof projectAssets].thumbnailImageUrl
      : undefined,
    project.thumbnailImageUrl,
  ];

  return candidates.find((c) => Boolean(c)) ?? null;
}

function ProjectSection({
  title,
  content,
}: {
  title: string;
  content?: ProjectSectionContent;
}) {
  if (!content) {
    return null;
  }

  const items = Array.isArray(content) ? content : [content];

  return (
    <section>
      <h2 className="mb-3 text-sm font-bold uppercase tracking-[0.12em] text-[#68887b] dark:text-[#9bb8aa]">
        {title}
      </h2>
      <ul className="list-disc space-y-2 pl-5">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

function getExtraProjects(language: "ja" | "en"): Array<{ slug: string; project: Project }> {
  return [
    {
      slug: "utjn-website",
      project: {
        title:
          language === "ja"
            ? "UTJN公式サイト"
            : "UTJN Official Website",
        period: "Sep 2023 - Present",
        tags: projectAssets["utjn-website"].tags,
        background:
          language === "ja"
            ? "University of Toronto Japan Networkの公式Webサイトを、学生チームで開発・運用しています。"
            : "Developed and maintained the official website for the University of Toronto Japan Network with a student engineering team.",
        challenges:
          language === "ja"
            ? "イベント告知、会員向け情報、組織運営に必要な更新を継続的に扱うため、保守しやすい構成と安定した運用が必要でした。"
            : "The site needed to support ongoing updates for events, member information, and organization operations while staying maintainable for a student team.",
        solutions:
          language === "ja"
            ? [
                "TypeScriptを中心に、チームで機能追加と修正を継続",
                "AWS / Docker構成で運用を意識したWebサイト管理を経験",
                "他部門からの依頼を受け、実ユーザー向けの改善を実施",
              ]
            : [
                "Used TypeScript to maintain and improve the production website with teammates",
                "Worked with AWS and Docker-based deployment and operations",
                "Handled requests from other departments and improved the site for real users",
              ],
        learnings:
          language === "ja"
            ? "チーム開発、継続運用、実ユーザーからの要望を受けた改善を通じて、プロダクトを長く保守する視点を学びました。"
            : "This experience strengthened my understanding of team development, long-term maintenance, and improving software based on real user requests.",
        thumbnailImageUrl: projectAssets["utjn-website"].thumbnailImageUrl,
        websiteUrl: "https://uoftjn.com/",
      },
    },
  ];
}

function MockPreview({ title }: { title: string }) {
  if (title.includes("AI Document")) {
    return (
      <div className="h-full bg-[#f8faf8] p-3 text-[10px] text-[#5f6662]">
        <div className="mb-3 rounded-t-md bg-[#262b2d] px-3 py-2 font-bold text-white">
          AI Document Review
        </div>
        <div className="grid h-[calc(100%-40px)] grid-cols-[90px_1fr] gap-3">
          <div className="space-y-2">
            {["Contract.pdf", "NDA.pdf", "Invoice_2024.pdf", "Report.pdf"].map((doc, index) => (
              <div key={doc} className={`rounded px-2 py-2 ${index === 0 ? "bg-[#e7efea] text-[#496b5f]" : "bg-white"}`}>
                {doc}
              </div>
            ))}
          </div>
          <div className="rounded-md border border-black/8 bg-white p-3">
            <p className="mb-2 text-xs font-bold text-[#242424]">Summary</p>
            <div className="space-y-1">
              <div className="h-2 w-full rounded bg-[#eef2ef]" />
              <div className="h-2 w-10/12 rounded bg-[#eef2ef]" />
              <div className="h-2 w-8/12 rounded bg-[#eef2ef]" />
            </div>
            <p className="mb-2 mt-4 text-xs font-bold text-[#242424]">Key Clauses</p>
            <div className="space-y-2">
              {["Confidentiality", "IP", "Liability", "Termination"].map((item, index) => (
                <div key={item} className="flex items-center justify-between">
                  <span>{item}</span>
                  <span className={`rounded-full px-2 py-0.5 text-[9px] ${index === 2 ? "bg-[#f5d8cf] text-[#9d5f4f]" : "bg-[#dfeee2] text-[#5d8464]"}`}>
                    {index === 2 ? "High" : "Low"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (title.includes("Chest X-ray")) {
    return (
      <div className="grid h-full grid-cols-[1.4fr_0.8fr] gap-3 bg-[#f8faf8] p-3">
        <div className="relative overflow-hidden rounded bg-[#1f2324]">
          <div className="absolute left-1/2 top-1/2 h-40 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/15 bg-white/12 blur-sm" />
          <div className="absolute left-[27%] top-[16%] h-36 w-16 rounded-full border border-white/15 bg-white/18 blur-[1px]" />
          <div className="absolute right-[27%] top-[16%] h-36 w-16 rounded-full border border-white/15 bg-white/18 blur-[1px]" />
          <span className="absolute left-3 top-2 text-lg font-semibold text-white/85">R</span>
        </div>
        <div className="rounded-md border border-black/8 bg-white p-3 text-xs text-[#5f6662]">
          <p className="text-[10px] font-semibold text-[#8a8f8c]">Prediction</p>
          <p className="mt-3 text-2xl font-bold text-[#68887b]">Normal</p>
          <p className="mt-3 font-semibold">Confidence</p>
          <p className="font-bold text-[#242424]">93.4%</p>
          <div className="mt-2 h-2 rounded-full bg-[#e9eee9]">
            <div className="h-2 w-[93%] rounded-full bg-[#68887b]" />
          </div>
          <div className="mt-5 space-y-2 text-[10px]">
            <p>Normal <span className="float-right">93.4%</span></p>
            <p>Pneumonia <span className="float-right">4.8%</span></p>
            <p>Tuberculosis <span className="float-right">1.8%</span></p>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

function ProjectCard({ project, href, slug }: { project: Project; href: string; slug?: string }) {
  const title = cleanTitle(project.title);
  const mock = MockPreview({ title });
  const preview = getProjectPreview(project, slug);
  const isVideo = preview?.endsWith(".mp4");
  const visibleTags = project.tags ?? [];

  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: 28, scale: 0.96, filter: "blur(18px)" },
        show: {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          transition: { duration: 0.7, ease: "easeOut" },
        },
      }}
    >
      <Link
        href={href}
        className="group block overflow-hidden rounded-lg border border-black/12 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.03)] transition-all hover:-translate-y-0.5 hover:border-[#9db2a8] hover:shadow-[0_10px_30px_rgba(31,41,37,0.08)] dark:border-white/10 dark:bg-[#171b19] dark:hover:border-[#9bb8aa]/60"
      >
        <div className="relative m-2 h-48 overflow-hidden rounded-md bg-[#f1f3f1] dark:bg-[#222824] md:h-52">
          {project.featured && (
            <span className="absolute left-3 top-3 z-10 rounded-full border border-[#d8c48a] bg-[#fff8db]/95 px-3 py-1 text-xs font-bold text-[#7a5a13] shadow-[0_4px_14px_rgba(67,52,18,0.14)] backdrop-blur dark:border-[#8b7440] dark:bg-[#332b17]/95 dark:text-[#f4d36a]">
              ⭐ Featured Project
            </span>
          )}
          {isVideo && preview ? (
            <video muted preload="metadata" className="h-full w-full object-cover">
              <source src={preview} type="video/mp4" />
            </video>
          ) : preview ? (
            <Image
              src={preview}
              alt=""
              width={720}
              height={420}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
          ) : mock ? (
            mock
          ) : (
            <div className="flex h-full items-center justify-center text-sm font-semibold text-[#8a8f8c]">
              Project Preview
            </div>
          )}
        </div>
        <h3 className="px-4 pb-3 pt-1 text-center text-base font-semibold text-[#3f4341] dark:text-[#f4f7f5]">
          {title}
        </h3>
        {visibleTags.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 px-4 pb-4">
            {visibleTags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[#d7e0db] bg-[#fbfbfa] px-2.5 py-1 text-xs font-semibold text-[#5f6662] dark:border-white/10 dark:bg-[#222824] dark:text-[#c6d2cc]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </Link>
    </motion.article>
  );
}

export default function Projects({
  variant = "default",
}: {
  variant?: PortfolioVariant;
}) {
  const { t, language } = useLanguage();
  const projects = t<Project[]>("projects.items") ?? [];
  const basePath = getVariantBasePath(variant);
  const projectIndices =
    projectIndicesByVariant[variant] ?? selectedDefaultIndices;

  const projectMap = new Map(
    projects
      .map((project) => [project.slug, project] as const)
      .filter((entry): entry is readonly [string, Project] =>
        Boolean(entry[0]),
      ),
  );

  const indexedProjects = projectIndices
    .map((projectIndex) => {
      const slug = projectSlugs[projectIndex] as string | undefined;
      return {
        project: slug ? projectMap.get(slug) : undefined,
        slug,
      };
    })
    .filter((entry): entry is { project: Project; slug: string } =>
      Boolean(entry.project && entry.slug),
    );

  const extraProjects =
    variant === "default"
      ? getExtraProjects(language).filter(({ slug }) => !projectMap.has(slug))
      : [];

  const visibleProjects = [...indexedProjects, ...extraProjects];

  const sectionCopy = {
    en: { eyebrow: "Projects", title: "What I've built" },
    ja: { eyebrow: "Projects", title: "What I've built" },
  }[language];

  return (
    <section id="projects" className="flex min-h-screen scroll-mt-20 items-center px-6 py-24 md:px-8">
      <div className="w-full">
      <div className="mx-auto mb-5 max-w-6xl">
        <p className="text-sm font-bold uppercase text-[#68887b] dark:text-[#9bb8aa]">{sectionCopy.eyebrow}</p>
        <h2 className="mt-1 text-2xl font-bold text-[#242424] dark:text-[#f4f7f5]">
          {sectionCopy.title}
        </h2>
      </div>
      <motion.div
        key={language}
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { staggerChildren: 0.08 } },
        }}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="mx-auto grid max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {visibleProjects.map(({ project, slug }) => (
          <ProjectCard
            key={`${project.title}-${slug}`}
            project={project}
            slug={slug}
            href={`${basePath}/projects/${slug}`}
          />
        ))}
      </motion.div>
      </div>
    </section>
  );
}

export function ProjectDetail({
  slug,
  backHref = "/#projects",
}: {
  slug: string;
  backHref?: string;
}) {
  const { t, language } = useLanguage();
  const projects = t<Project[]>("projects.items") ?? [];
  const projectMap = new Map(
    projects
      .map((project) => [project.slug, project] as const)
      .filter((entry): entry is readonly [string, Project] =>
        Boolean(entry[0]),
      ),
  );
  const extraProject = getExtraProjects(language).find((entry) => entry.slug === slug)?.project;
  const project = projectMap.get(slug) ?? extraProject;
  const preview = project ? getProjectPreview(project, slug) : null;
  const isVideo = preview?.endsWith(".mp4");
  const sectionTitles = {
    overview: language === "ja" ? "概要" : "Overview",
    challenge: language === "ja" ? "課題" : "Challenge",
    solution: language === "ja" ? "解決策" : "Solution",
    outcome: language === "ja" ? "成果" : "Outcome",
  };

  type MediaItem = { src: string; label: string; type: "image" | "video" };

  const mediaItems: MediaItem[] = project
    ? [
        ...(project.demoMedia?.map((media) => ({
          src: media.src,
          label: resolveMediaLabel(media.label, language),
          type: media.type,
        })) ?? []),
        ...(project.analysisImages?.map((src, imageIndex) => ({
          src,
          label: project.analysisImageLabels?.[imageIndex] ?? "Analysis",
          type: "image" as const,
        })) ?? []),
        ...(project.confusionMatrixImages?.map((src, imageIndex) => ({
          src,
          label: project.confusionMatrixLabels?.[imageIndex] ?? "Result",
          type: "image" as const,
        })) ?? []),
        project.leaderboardImageUrl
          ? {
              src: project.leaderboardImageUrl,
              label: language === "ja" ? "リーダーボード" : "Leaderboard",
              type: "image",
            }
          : null,
        project.searchConsoleImageUrl
          ? { src: project.searchConsoleImageUrl, label: "Search Console", type: "image" }
          : null,
        ...(!project.demoMedia?.length ? project.demoImageUrls?.map((src) => ({
          src,
          label: language === "ja" ? "アプリ画面" : "App Screenshot",
          type: "image" as const,
        })) ?? [] : []),
        !project.demoImageUrls?.length &&
        !project.demoMedia?.length &&
        project.demoImageUrl &&
        project.demoImageUrl !== preview
          ? {
              src: project.demoImageUrl,
              label: language === "ja" ? "アプリ画面" : "App Screenshot",
              type: "image",
            }
          : null,
        !project.demoMedia?.length &&
        project.videoUrl &&
        project.videoUrl !== preview
          ? {
              src: project.videoUrl,
              label: language === "ja" ? "デモ動画" : "Demo Video",
              type: "video",
            }
          : null,
      ]
          .filter(
            (item): item is MediaItem =>
              Boolean(item && item.src && item.src !== preview),
          )
          .filter(
            (item, index, items) =>
              items.findIndex((candidate) => candidate.src === item.src) === index,
          )
    : [];


  if (!project) {
    return <div className="px-6 py-32 text-center text-[#767b78]">Project not found</div>;
  }

  return (
    <section className="px-6 py-28 md:px-8">
      <article className="mx-auto max-w-4xl">
        <Link
          href={backHref}
          className="mb-8 inline-flex text-sm font-semibold text-[#68887b] hover:text-[#496b5f]"
        >
          Back to Home
        </Link>

        <div className="overflow-hidden rounded-lg border border-black/12 bg-white dark:border-white/10 dark:bg-[#171b19]">
          {preview && (
            <div className="bg-[#f1f3f1] p-3 dark:bg-[#222824]">
              {isVideo ? (
                <video controls className="max-h-[560px] w-full rounded-md object-contain">
                  <source src={preview} type="video/mp4" />
                </video>
              ) : (
                <Image
                  src={preview}
                  alt=""
                  width={1000}
                  height={620}
                  className="max-h-[560px] w-full rounded-md object-contain"
                />
              )}
            </div>
          )}
          <div className="p-6 md:p-8">
            <p className="text-sm font-semibold text-[#8a8f8c] dark:text-[#a9b5af]">{project.period}</p>
            <h1 className="mt-2 text-3xl font-bold text-[#242424] dark:text-[#f4f7f5] md:text-4xl">
              {project.title}
            </h1>

            {project.tags && (
              <div className="mt-5 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[#d7e0db] bg-[#f6f8f6] px-3 py-1 text-xs font-semibold text-[#60766d] dark:border-white/10 dark:bg-[#222824] dark:text-[#c6d2cc]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-8 space-y-7 text-base leading-7 text-[#4b504d] dark:text-[#c6d2cc]">
              <ProjectSection title={sectionTitles.overview} content={project.background} />
              <ProjectSection title={sectionTitles.challenge} content={project.challenges} />
              <ProjectSection title={sectionTitles.solution} content={project.solutions} />
              <ProjectSection title={sectionTitles.outcome} content={project.learnings} />
            </div>

            {mediaItems.length > 0 && (
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {mediaItems.map((item) => (
                  <figure
                    key={`${item.src}-${item.label}`}
                    className="overflow-hidden rounded-lg border border-black/10 bg-[#f6f8f6] p-2 dark:border-white/10 dark:bg-[#222824]"
                  >
                    {item.type === "video" ? (
                      <video controls className="h-auto w-full rounded-md object-contain">
                        <source src={item.src} type="video/mp4" />
                      </video>
                    ) : (
                      <Image
                        src={item.src}
                        alt={item.label}
                        width={900}
                        height={560}
                        className="h-auto w-full rounded-md object-contain"
                      />
                    )}
                    <figcaption className="px-1 pt-2 text-xs font-semibold text-[#6b736f] dark:text-[#a9b5af]">
                      {item.label}
                    </figcaption>
                  </figure>
                ))}
              </div>
            )}

            <div className="mt-8 flex flex-wrap gap-3">
              {project.githubUrl && (
                <a className="rounded-md bg-[#242424] px-4 py-2 text-sm font-semibold text-white" href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  View GitHub
                </a>
              )}
              {project.slideUrl && (
                <a className="rounded-md bg-[#242424] px-4 py-2 text-sm font-semibold text-white" href={project.slideUrl} target="_blank" rel="noopener noreferrer">
                  View Slides
                </a>
              )}
              {project.websiteUrl && (
                <a className="rounded-md bg-[#242424] px-4 py-2 text-sm font-semibold text-white" href={project.websiteUrl} target="_blank" rel="noopener noreferrer">
                  View Website
                </a>
              )}
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}
