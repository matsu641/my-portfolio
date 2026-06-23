"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { projectSlugs } from "@/lib/projectRoutes";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 }
};

type Project = {
  title: string;
  period: string;
  tags?: string[];
  background?: string;
  challenges?: string;
  solutions?: string[];
  learnings?: string;
  githubUrl?: string;
  slideUrl?: string;
  websiteUrl?: string;
  confusionMatrixImages?: string[];
  confusionMatrixLabels?: string[];
  analysisImages?: string[];
  analysisImageLabels?: string[];
  leaderboardImageUrl?: string;
  demoImageUrl?: string;
  videoUrl?: string;
  searchConsoleImageUrl?: string;
};

type ProjectMedia = {
  src: string;
  alt: string;
  label?: string;
  type: "image" | "video";
};

function MediaPreview({
  media,
  className = "h-40",
  onOpen,
}: {
  media: ProjectMedia;
  className?: string;
  onOpen: (media: ProjectMedia) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(media)}
      className="group block w-full text-left"
      aria-label={`Open ${media.label || media.alt}`}
    >
      <div className="relative w-full overflow-hidden rounded-lg border border-zinc-600/60 bg-white p-2 transition-all group-hover:border-blue-400/70 group-hover:shadow-lg group-hover:shadow-blue-400/20">
        {media.type === "video" ? (
          <>
            <video muted preload="metadata" className={`w-full ${className} object-contain`}>
              <source src={media.src} type="video/mp4" />
            </video>
          </>
        ) : (
          <img src={media.src} alt={media.alt} className={`w-full ${className} object-contain`} />
        )}
        <span className="absolute inset-0 flex items-center justify-center bg-black/0 text-white opacity-0 transition-all group-hover:bg-black/35 group-hover:opacity-100">
          <span className="inline-flex items-center gap-2 rounded-full bg-black/75 px-4 py-2 text-sm font-medium shadow-lg">
            {media.type === "video" ? (
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            ) : (
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
              </svg>
            )}
            <span>{media.type === "video" ? "Click to play" : "Click to view"}</span>
          </span>
        </span>
      </div>
      {media.label && (
        <p className="mt-2 text-xs text-zinc-300 text-center leading-snug">{media.label}</p>
      )}
    </button>
  );
}

function MediaModal({
  media,
  onClose,
}: {
  media: ProjectMedia | null;
  onClose: () => void;
}) {
  if (!media) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 py-6"
      role="dialog"
      aria-modal="true"
      aria-label={media.label || media.alt}
      onClick={onClose}
    >
      <div className="relative w-full max-w-6xl" onClick={(event) => event.stopPropagation()}>
        <button
          type="button"
          onClick={onClose}
          className="absolute -top-12 right-0 rounded-lg border border-white/30 bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/20"
          aria-label="Close media preview"
        >
          Close
        </button>
        <div className="rounded-lg border border-white/20 bg-zinc-950 p-3 shadow-2xl">
          {media.type === "video" ? (
            <video controls autoPlay className="max-h-[82vh] w-full object-contain">
              <source src={media.src} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <img src={media.src} alt={media.alt} className="max-h-[82vh] w-full object-contain" />
          )}
        </div>
        {media.label && <p className="mt-3 text-center text-sm text-zinc-200">{media.label}</p>}
      </div>
    </div>
  );
}

function ProjectCard({ project, projectId }: { project: Project; projectId: string }) {
  const { t, language } = useLanguage();
  const [selectedMedia, setSelectedMedia] = useState<ProjectMedia | null>(null);

  return (
    <motion.article
      id={projectId}
      variants={item}
      className="scroll-mt-8 bg-gradient-to-br from-zinc-800/90 to-zinc-700/70 border-2 border-zinc-600/60 rounded-xl p-8 hover:border-blue-400/70 hover:shadow-lg hover:shadow-blue-400/25 transition-all duration-300"
    >
      {/* Header: Title + Period */}
      <div className="mb-6">
        <div className="flex items-center justify-between gap-4 mb-3">
          <h3 className="text-2xl font-bold text-white">{project.title}</h3>
          <span className="text-sm font-mono text-zinc-300 whitespace-nowrap">{project.period}</span>
        </div>
        
        {/* Links */}
        <div className="flex flex-wrap gap-4 mb-3">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-accent hover:opacity-80 transition-opacity"
              aria-label="GitHub Repository"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium">{t('projects.viewGithub')}</span>
            </a>
          )}
          
          {project.slideUrl && (
            <a
              href={project.slideUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-400 hover:opacity-80 transition-opacity"
              aria-label="View Slides"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <span className="text-sm font-medium">{t('projects.viewSlides')}</span>
            </a>
          )}
          
          {project.websiteUrl && (
            <a
              href={project.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-green-400 hover:opacity-80 transition-opacity"
              aria-label="View Website"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
              <span className="text-sm font-medium">{language === 'ja' ? 'ウェブサイトを見る' : 'View Website'}</span>
            </a>
          )}
        </div>
        
        {/* Tags */}
        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag: string) => (
              <span
                key={tag}
                className="text-xs font-mono px-3 py-1 bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded-full hover:bg-blue-500/30 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>


      <div className="space-y-6 pt-4 border-t border-zinc-700/50">
          {/* Background */}
          {project.background && (
            <div>
              <h4 className="text-sm font-mono text-blue-400 mb-2 uppercase tracking-wider font-semibold">
                {t('projects.background')}
              </h4>
              <p className="text-zinc-100 leading-relaxed">{project.background}</p>
            </div>
          )}

          {/* Challenges */}
          {project.challenges && (
            <div>
              <h4 className="text-sm font-mono text-blue-400 mb-2 uppercase tracking-wider font-semibold">
                {t('projects.challenges')}
              </h4>
              <p className="text-zinc-100 leading-relaxed">{project.challenges}</p>
            </div>
          )}

          {/* Solutions */}
          {project.solutions && project.solutions.length > 0 && (
            <div>
              <h4 className="text-sm font-mono text-blue-400 mb-3 uppercase tracking-wider font-semibold">
                {t('projects.solutions')}
              </h4>
              <ul className="space-y-2">
                {project.solutions.map((item: string, idx: number) => (
                  <li key={idx} className="flex gap-3 text-zinc-100">
                    <span className="text-blue-400 mt-1 flex-shrink-0">•</span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Analysis Images */}
          {project.analysisImages && project.analysisImages.length > 0 && (
            <div>
              <h4 className="text-sm font-mono text-blue-400 mb-3 uppercase tracking-wider font-semibold">
                {language === 'ja' ? '分析・モデル出力' : 'Analysis & Model Outputs'}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {project.analysisImages.map((imgPath: string, idx: number) => (
                  <MediaPreview
                    key={imgPath}
                    media={{
                      src: imgPath,
                      alt: project.analysisImageLabels?.[idx] || `Analysis output ${idx + 1}`,
                      label: project.analysisImageLabels?.[idx],
                      type: "image",
                    }}
                    className="h-40"
                    onOpen={setSelectedMedia}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Learnings */}
          {project.learnings && (
            <div>
              <h4 className="text-sm font-mono text-blue-400 mb-2 uppercase tracking-wider font-semibold">
                {t('projects.learnings')}
              </h4>
              <p className="text-zinc-100 leading-relaxed">{project.learnings}</p>
            </div>
          )}

          {/* Confusion Matrix Images */}
          {project.confusionMatrixImages && project.confusionMatrixImages.length > 0 && (
            <div>
              <h4 className="text-sm font-mono text-blue-400 mb-3 uppercase tracking-wider font-semibold">
                Confusion Matrix Comparison
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.confusionMatrixImages.map((imgPath: string, idx: number) => (
                  <MediaPreview
                    key={imgPath}
                    media={{
                      src: imgPath,
                      alt: project.confusionMatrixLabels?.[idx] || `Confusion Matrix ${idx + 1}`,
                      label: project.confusionMatrixLabels?.[idx],
                      type: "image",
                    }}
                    className="h-48"
                    onOpen={setSelectedMedia}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Leaderboard Image */}
          {project.leaderboardImageUrl && (
            <div>
              <h4 className="text-sm font-mono text-blue-400 mb-3 uppercase tracking-wider font-semibold">
                {t('projects.viewLeaderboard')}
              </h4>
              <div className="max-w-md">
                <MediaPreview
                  media={{
                    src: project.leaderboardImageUrl,
                    alt: "Leaderboard Results",
                    type: "image",
                  }}
                  className="h-48"
                  onOpen={setSelectedMedia}
                />
              </div>
            </div>
          )}



          {/* Demo Image */}
          {project.demoImageUrl && (
            <div>
              <h4 className="text-sm font-mono text-blue-400 mb-3 uppercase tracking-wider font-semibold">
                {t('projects.demoImage')}
              </h4>
              <div className="max-w-xl">
                <MediaPreview
                  media={{
                    src: project.demoImageUrl,
                    alt: "Application Demo",
                    type: "image",
                  }}
                  className="h-56"
                  onOpen={setSelectedMedia}
                />
              </div>
            </div>
          )}

          {/* Demo Video */}
          {project.videoUrl && (
            <div>
              <h4 className="text-sm font-mono text-blue-400 mb-3 uppercase tracking-wider font-semibold">
                {t('projects.viewDemo')}
              </h4>
              <div className="max-w-xl">
                <MediaPreview
                  media={{
                    src: project.videoUrl,
                    alt: "Demo Video",
                    type: "video",
                  }}
                  className="h-56"
                  onOpen={setSelectedMedia}
                />
              </div>
            </div>
          )}

          {/* Google Search Console */}
          {project.searchConsoleImageUrl && (
            <div>
              <h4 className="text-sm font-mono text-blue-400 mb-3 uppercase tracking-wider font-semibold">
                {language === 'ja' ? 'Google Search Consoleパフォーマンス' : 'Google Search Console Performance'}
              </h4>
              <div className="max-w-xl">
                <MediaPreview
                  media={{
                    src: project.searchConsoleImageUrl,
                    alt: "Google Search Console Performance",
                    type: "image",
                  }}
                  className="h-56"
                  onOpen={setSelectedMedia}
                />
              </div>
            </div>
          )}
      </div>
      <MediaModal media={selectedMedia} onClose={() => setSelectedMedia(null)} />
    </motion.article>
  );
}

export default function Projects() {
  const { t, language } = useLanguage();
  const projects = t<Project[]>('projects.items');
  
  if (!projects || !Array.isArray(projects)) {
    return <div className="text-center text-zinc-300">No projects found</div>;
  }
  
  return (
    <section id="projects" className="py-24 md:py-32 px-6 md:px-8">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-16">{t('projects.title')}</h2>

        <motion.div
          key={language}
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-8"
        >
          {(projects as Project[]).map((project, idx) => (
            <ProjectCard
              key={`${language}-${project.title}-${idx}`}
              project={project}
              projectId={`project-${projectSlugs[idx] ?? idx}`}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
