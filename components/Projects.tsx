"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

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

function ProjectCard({ project, index }: { project: any; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { t } = useLanguage();

  return (
    <motion.article
      variants={item}
      className="bg-gradient-to-br from-zinc-800/90 to-zinc-700/70 border-2 border-zinc-600/60 rounded-xl p-8 hover:border-blue-400/70 hover:shadow-lg hover:shadow-blue-400/25 transition-all duration-300"
    >
      {/* Header: Title + Period */}
      <div className="mb-6">
        <div className="flex items-center justify-between gap-4 mb-3">
          <h3 className="text-2xl font-bold text-white">{project.title}</h3>
          <span className="text-sm font-mono text-zinc-300 whitespace-nowrap">{project.period}</span>
        </div>
        
        {/* GitHub Link */}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-accent hover:opacity-80 transition-opacity mb-3"
            aria-label="GitHub Repository"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium">{t('projects.viewGithub')}</span>
          </a>
        )}
        
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


      {/* What */}
      <div className="mb-6">
        <p className="text-lg text-zinc-100 leading-relaxed">{project.what}</p>
      </div>

      {/* Impact */}
      {project.impact && project.impact.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-mono text-blue-400 mb-3 uppercase tracking-wider font-semibold">
            {t('projects.impact')}
          </h4>
          <ul className="space-y-2">
            {project.impact.map((item: string, idx: number) => (
              <li key={idx} className="flex gap-3 text-zinc-100">
                <span className="text-blue-400 mt-1 flex-shrink-0">•</span>
                <span className="leading-relaxed"><strong>{item}</strong></span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Expandable Section */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-blue-400 hover:text-blue-300 hover:underline mb-4 text-sm font-semibold transition-colors"
        aria-expanded={isExpanded}
      >
        {isExpanded ? t('projects.viewLess') : t('projects.viewMore')}
      </button>

      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="space-y-6 pt-4 border-t border-zinc-700/50"
        >
          {/* Background */}
          <div>
            <h4 className="text-sm font-mono text-blue-400 mb-2 uppercase tracking-wider font-semibold">
              {t('projects.background')}
            </h4>
            <p className="text-zinc-100 leading-relaxed">{project.background}</p>
          </div>

          {/* Challenges */}
          <div>
            <h4 className="text-sm font-mono text-blue-400 mb-2 uppercase tracking-wider font-semibold">
              {t('projects.challenges')}
            </h4>
            <p className="text-zinc-100 leading-relaxed">{project.challenges}</p>
          </div>

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

          {/* Learnings */}
          <div>
            <h4 className="text-sm font-mono text-blue-400 mb-2 uppercase tracking-wider font-semibold">
              {t('projects.learnings')}
            </h4>
            <p className="text-zinc-100 leading-relaxed">{project.learnings}</p>
          </div>

          {/* Confusion Matrix Images */}
          {project.confusionMatrixImages && project.confusionMatrixImages.length > 0 && (
            <div>
              <h4 className="text-sm font-mono text-blue-400 mb-3 uppercase tracking-wider font-semibold">
                Confusion Matrix Comparison
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.confusionMatrixImages.map((imgPath: string, idx: number) => (
                  <div key={idx} className="space-y-2">
                    <p className="text-sm font-medium text-zinc-200 text-center">
                      {project.confusionMatrixLabels?.[idx]}
                    </p>
                    <div className="w-full bg-white rounded-lg border border-zinc-600/60 p-4">
                      <img 
                        src={imgPath} 
                        alt={project.confusionMatrixLabels?.[idx] || `Confusion Matrix ${idx + 1}`}
                        className="w-full h-auto object-contain"
                      />
                    </div>
                  </div>
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
              <img 
                src={project.leaderboardImageUrl} 
                alt="Leaderboard Results"
                className="w-full rounded-lg border border-zinc-700/50"
              />
            </div>
          )}

          {/* Project Slides */}
          {project.slideUrl && (
            <div>
              <h4 className="text-sm font-mono text-blue-400 mb-2 uppercase tracking-wider font-semibold">
                {t('projects.slidesTitle')}
              </h4>
              <a 
                href={project.slideUrl} 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 hover:underline transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                {t('projects.viewSlides')}
              </a>
            </div>
          )}

          {/* Demo Video */}
          {project.videoUrl && (
            <div>
              <h4 className="text-sm font-mono text-blue-400 mb-3 uppercase tracking-wider font-semibold">
                {t('projects.viewDemo')}
              </h4>
              <video 
                controls 
                className="w-full rounded-lg border border-zinc-700/50"
                preload="metadata"
              >
                <source src={project.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          )}
        </motion.div>
      )}
    </motion.article>
  );
}

export default function Projects() {
  const { t, language } = useLanguage();
  const projects = t('projects.items');
  
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
          {projects.map((project: any, idx: number) => (
            <ProjectCard key={`${language}-${project.title}-${idx}`} project={project} index={idx} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
