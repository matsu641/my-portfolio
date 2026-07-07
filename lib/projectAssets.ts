import { projectSlugs, type ProjectSlug } from "@/lib/projectRoutes";

export type ProjectMediaAsset = {
  src: string;
  type: "image" | "video";
  label: string | {
    ja: string;
    en: string;
  };
};

export type ProjectAssetBundle = {
  slug: ProjectSlug;
  tags: string[];
  thumbnailImageUrl: string;
  demoMedia?: ProjectMediaAsset[];
  demoImageUrls?: string[];
  videoUrl?: string;
  slideUrl?: string;
  githubUrl?: string;
  websiteUrl?: string;
};

export const projectAssets: Record<ProjectSlug, ProjectAssetBundle> = {
  "chest-xray": {
    slug: "chest-xray",
    tags: ["PyTorch", "ResNet-50", "Multimodal Learning", "Focal Loss", "Unbalanced Datasets"],
    thumbnailImageUrl: "/chest-xray/thumbnail.png",
    demoMedia: [
      {
        src: "/chest-xray/demoImage2.png",
        type: "image",
        label: {
          ja: "ベースラインモデル - 混同行列",
          en: "Baseline Model - Confusion Matrix",
        },
      },
      {
        src: "/chest-xray/demoImage3.png",
        type: "image",
        label: {
          ja: "改善モデル - 混同行列",
          en: "Improved Model - Confusion Matrix",
        },
      },
      {
        src: "/chest-xray/demoImage1.jpg",
        type: "image",
        label: {
          ja: "モデル構成図",
          en: "Model Architecture",
        },
      },
    ],
    githubUrl: "https://github.com/matsu641/Multimodal-Chest-X-ray-Classification-with-CNN",
  },
  "employee-attrition": {
    slug: "employee-attrition",
    tags: ["Python", "scikit-learn", "Feature Engineering", "Business Analysis", "Problem Solving"],
    thumbnailImageUrl: "/employee-attrition/thumbnail.png",
    demoMedia: [
      {
        src: "/employee-attrition/demoImage1.png",
        type: "image",
        label: {
          ja: "社員データの探索的可視化",
          en: "Exploratory Dataset Visualization",
        },
      },
      {
        src: "/employee-attrition/demoImage2.png",
        type: "image",
        label: {
          ja: "特徴量・傾向分析",
          en: "Feature and Trend Analysis",
        },
      },
    ],
    slideUrl: "/employee-attrition/demoSlides.pdf",
    githubUrl: "https://github.com/matsu641/GCI_final_project",
  },
  "commit-message-reviewer": {
    slug: "commit-message-reviewer",
    tags: ["TypeScript", "Node.js", "CLI", "OpenRouter API", "LLM", "Developer Tooling"],
    thumbnailImageUrl: "/commit-message-reviewer/thumbnail.png",
    githubUrl: "https://github.com/matsu641/commit-message-reviewer",
  },
  "gis-map": {
    slug: "gis-map",
    tags: ["C++", "Algorithms", "A*", "GIS", "UI/UX", "Linux", "Teamwork", "Problem Solving"],
    thumbnailImageUrl: "/gis-map/thumbnail.png",
    demoMedia: [
      {
        src: "/gis-map/demoImage.png",
        type: "image",
        label: {
          ja: "リーダーボード",
          en: "Leaderboard",
        },
      },
      {
        src: "/gis-map/demoVideo.mp4",
        type: "video",
        label: {
          ja: "経路探索デモ",
          en: "Route Search Demo",
        },
      },
    ],
    videoUrl: "/gis-map/demoVideo.mp4",
    slideUrl: "/gis-map/demoSlides.pdf",
  },
  "rush-hour": {
    slug: "rush-hour",
    tags: ["C", "VGA", "PS/2 Interrupt", "RISC-V", "FPGA board"],
    thumbnailImageUrl: "/rush-hour/thumbnail.png",
    demoMedia: [
      {
        src: "/rush-hour/demoVideo.mp4",
        type: "video",
        label: {
          ja: "ゲームプレイデモ",
          en: "Gameplay Demo",
        },
      },
    ],
    videoUrl: "/rush-hour/demoVideo.mp4",
    githubUrl: "https://github.com/matsu641/RushHour",
  },
  "clinic-inventory": {
    slug: "clinic-inventory",
    tags: ["Electron", "React", "SQLite", "Vite", "Client Work","Problem Solving"],
    thumbnailImageUrl: "/clinic-inventory/thumbnail.png",
    demoMedia: [
      {
        src: "/clinic-inventory/demoVideo.mp4",
        type: "video",
        label: {
          ja: "在庫管理ワークフローデモ",
          en: "Inventory Workflow Demo",
        },
      },
    ],
    videoUrl: "/clinic-inventory/demoVideo.mp4",
    githubUrl: "https://github.com/matsu641/Clinic-Inventory-Management-System",
  },
  "appointment-system": {
    slug: "appointment-system",
    tags: ["Next.js", "React", "TypeScript", "PostgreSQL", "Problem Solving"],
    thumbnailImageUrl: "/appointment-system/thumbnail.png",
    demoMedia: [
      {
        src: "/appointment-system/demoVideo.mp4",
        type: "video",
        label: {
          ja: "予約管理ワークフローデモ",
          en: "Appointment Workflow Demo",
        },
      },
    ],
    videoUrl: "/appointment-system/demoVideo.mp4",
  },
  "clinic-website": {
    slug: "clinic-website",
    tags: ["Next.js", "CSS", "TypeScript", "Vercel", "SEO", "UI/UX", "Client Work"],
    thumbnailImageUrl: "/clinic-website/thumbnail.png",
    demoMedia: [
      {
        src: "/clinic-website/demoImage.png",
        type: "image",
        label: {
          ja: "トップページ画面",
          en: "Homepage Screenshot",
        },
      },
      {
        src: "/clinic-website/demoVideo.mp4",
        type: "video",
        label: {
          ja: "サイト操作デモ",
          en: "Website Walkthrough",
        },
      },
    ],
    videoUrl: "/clinic-website/demoVideo.mp4",
    githubUrl: "https://github.com/matsu641/clinic-website",
    websiteUrl: "https://kuwabara-ortho.jp",
  },
  "utjn-website": {
    slug: "utjn-website",
    tags: ["React/Next.js", "TypeScript", "PostgreSQL", "AWS", "Docker", "Teamwork"],
    thumbnailImageUrl: "/utjn-website/thumbnail.png",
    websiteUrl: "https://uoftjn.com/",
  },
};

type ProjectWithAssets = {
  title?: string;
  period?: string;
  background?: string;
  challenges?: string;
  solutions?: string[];
  learnings?: string;
  slug?: string;
  tags?: string[];
  thumbnailImageUrl?: string;
  demoMedia?: ProjectMediaAsset[];
  demoImageUrl?: string;
  demoImageUrls?: string[];
  analysisImages?: string[];
  videoUrl?: string;
  slideUrl?: string;
  githubUrl?: string;
  websiteUrl?: string;
};

type TranslationTree = Record<string, unknown> & {
  projects?: {
    items?: ProjectWithAssets[];
  };
};

export function addProjectAssets<T extends Record<string, TranslationTree>>(
  translations: T,
): T {
  return Object.fromEntries(
    Object.entries(translations).map(([language, languageTranslations]) => {
      const projectItems = languageTranslations.projects?.items;

      if (!projectItems) {
        return [language, languageTranslations];
      }

      return [
        language,
        {
          ...languageTranslations,
          projects: {
            ...languageTranslations.projects,
            items: projectItems.map((project, index) => {
              const slug = (project.slug ?? projectSlugs[index]) as
                | ProjectSlug
                | undefined;
              const assets = slug ? projectAssets[slug] : undefined;

              if (!assets) {
                return project;
              }

              return {
                ...project,
                slug,
                tags: assets.tags,
                thumbnailImageUrl: assets.thumbnailImageUrl,
                demoMedia: assets.demoMedia,
                demoImageUrl:
                  assets.demoMedia?.find((media) => media.type === "image")?.src ??
                  assets.demoImageUrls?.[0],
                demoImageUrls:
                  assets.demoMedia
                    ?.filter((media) => media.type === "image")
                    .map((media) => media.src) ?? assets.demoImageUrls,
                videoUrl: assets.videoUrl,
                slideUrl: assets.slideUrl,
                githubUrl: assets.githubUrl,
                websiteUrl: assets.websiteUrl,
                analysisImages: project.analysisImages
                  ? assets.demoImageUrls ?? project.analysisImages
                  : project.analysisImages,
              };
            }),
          },
        },
      ];
    }),
  ) as T;
}
