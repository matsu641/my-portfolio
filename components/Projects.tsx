"use client";

import { motion } from "framer-motion";
import { useState } from "react";

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
  problem: string;
  role: string;
  techStack: { name: string; reason: string }[];
  tradeoffs: string;
  result: string;
  tags: string[];
};

const projects: Project[] = [
  {
    title: "Real-time Collaboration Platform",
    problem: "Team needed to collaborate on documents with 50+ concurrent users, existing solutions had 2-3s latency causing conflicts.",
    role: "Lead frontend engineer. Designed state synchronization architecture, implemented optimistic UI updates, mentored 2 junior developers.",
    techStack: [
      { name: "Next.js + TypeScript", reason: "Type safety critical for complex state management" },
      { name: "WebSocket + Redis", reason: "Sub-100ms latency requirement ruled out HTTP polling" },
      { name: "Zustand", reason: "Lighter than Redux, easier to reason about for realtime updates" },
    ],
    tradeoffs: "Chose eventual consistency over strong consistency—acceptable for documents, saved 40% infra cost. No offline mode in v1 to ship faster.",
    result: "Latency reduced to <200ms (90th percentile). User engagement +35%. 0 data loss incidents in 6 months.",
    tags: ["React", "TypeScript", "WebSocket", "Redis"],
  },
  {
    title: "E-commerce Performance Optimization",
    problem: "Mobile conversion rate 40% below desktop. LCP was 8.2s, users abandoned before product images loaded.",
    role: "Solo performance engineer. Conducted profiling, implemented lazy loading strategy, negotiated with backend team for API changes.",
    techStack: [
      { name: "Next.js Image", reason: "Automatic WebP/AVIF, lazy loading, responsive sizes" },
      { name: "Dynamic Imports", reason: "Reduced initial JS bundle from 340KB to 120KB" },
      { name: "Edge Functions", reason: "Regional caching for product data improved TTFB" },
    ],
    tradeoffs: "Removed some animation libraries (30KB saved). Delayed non-critical analytics loading. Simplified hero section design.",
    result: "LCP: 8.2s → 2.1s. Mobile conversion +18%. Lighthouse score 45 → 92. Featured in company engineering blog.",
    tags: ["Performance", "Next.js", "Web Vitals"],
  },
  {
    title: "Design System & Component Library",
    problem: "5 teams building similar components inconsistently. Design-dev handoff taking 2-3 weeks per feature.",
    role: "Technical lead. Defined component API patterns, set up automated visual regression testing, created migration guides.",
    techStack: [
      { name: "React + TypeScript", reason: "Strict types prevent API misuse across teams" },
      { name: "Tailwind CSS", reason: "Design tokens as utility classes, easy theming" },
      { name: "Storybook", reason: "Living documentation, visual testing, design QA" },
    ],
    tradeoffs: "Focused on 20 core components first instead of 60+. Delayed advanced animation features. Used CSS instead of CSS-in-JS for simpler mental model.",
    result: "Design-dev cycle: 2-3 weeks → 3-4 days. 4/5 teams adopted within 2 months. Reduced bug reports by 60% (fewer one-off implementations).",
    tags: ["Design System", "React", "TypeScript", "Storybook"],
  },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.article
      variants={item}
      className="border border-foreground/10 rounded-xl p-8 hover:border-accent/30 transition-colors"
    >
      {/* Title and Tags */}
      <div className="mb-6">
        <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-mono px-3 py-1 bg-accent/10 text-accent rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Problem */}
      <div className="mb-6">
        <h4 className="text-sm font-mono text-accent mb-2 uppercase tracking-wider">
          Problem
        </h4>
        <p className="text-muted leading-relaxed">{project.problem}</p>
      </div>

      {/* Role */}
      <div className="mb-6">
        <h4 className="text-sm font-mono text-accent mb-2 uppercase tracking-wider">
          My Role
        </h4>
        <p className="text-muted leading-relaxed">{project.role}</p>
      </div>

      {/* Expandable Section */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-accent hover:underline mb-4 text-sm font-medium"
        aria-expanded={isExpanded}
      >
        {isExpanded ? "Show Less" : "Show Technical Details →"}
      </button>

      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="space-y-6 pt-4 border-t border-foreground/10"
        >
          {/* Tech Stack */}
          <div>
            <h4 className="text-sm font-mono text-accent mb-3 uppercase tracking-wider">
              Tech Stack & Decisions
            </h4>
            <ul className="space-y-3">
              {project.techStack.map((tech) => (
                <li key={tech.name} className="text-muted">
                  <span className="font-semibold text-foreground">{tech.name}:</span>{" "}
                  {tech.reason}
                </li>
              ))}
            </ul>
          </div>

          {/* Trade-offs */}
          <div>
            <h4 className="text-sm font-mono text-accent mb-2 uppercase tracking-wider">
              Trade-offs
            </h4>
            <p className="text-muted leading-relaxed">{project.tradeoffs}</p>
          </div>

          {/* Result */}
          <div>
            <h4 className="text-sm font-mono text-accent mb-2 uppercase tracking-wider">
              Result & Impact
            </h4>
            <p className="text-muted leading-relaxed">{project.result}</p>
          </div>
        </motion.div>
      )}
    </motion.article>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-24 md:py-32 px-6 md:px-8">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Selected Work</h2>
        <p className="text-xl text-muted mb-16 max-w-2xl">
          Projects that demonstrate technical decision-making and impact.
        </p>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-8"
        >
          {projects.map((project, idx) => (
            <ProjectCard key={project.title} project={project} index={idx} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
