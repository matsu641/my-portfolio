"use client";

import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

type Skill = {
  name: string;
  context: string;
};

const mainSkills: Skill[] = [
  { name: "TypeScript", context: "Primary language for type-safe applications" },
  { name: "React / Next.js", context: "Production-level SPAs and SSR/SSG apps" },
  { name: "Node.js", context: "API development and tooling" },
  { name: "Tailwind CSS", context: "Rapid, consistent UI development" },
  { name: "SQL / PostgreSQL", context: "Data modeling and query optimization" },
];

const familiarSkills: Skill[] = [
  { name: "React Three Fiber", context: "3D visualization and interactive graphics" },
  { name: "GSAP", context: "Complex scroll animations and micro-interactions" },
  { name: "Docker", context: "Local development and deployment consistency" },
  { name: "GraphQL", context: "Type-safe API layer for complex data requirements" },
  { name: "Python", context: "Data processing and automation scripts" },
];

function SkillCard({ skill, index }: { skill: Skill; index: number }) {
  return (
    <motion.div
      variants={item}
      className="border border-foreground/10 rounded-lg p-5 hover:border-accent/30 transition-colors"
    >
      <h4 className="font-semibold text-lg mb-2">{skill.name}</h4>
      <p className="text-muted text-sm leading-relaxed">{skill.context}</p>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="py-24 md:py-32 px-6 md:px-8 bg-foreground/[0.02]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Skills</h2>
        <p className="text-xl text-muted mb-16 max-w-2xl">
          Not just what I know, but how and when I use it.
        </p>

        <div className="space-y-12">
          {/* Main Skills */}
          <div>
            <h3 className="text-sm font-mono text-accent mb-6 uppercase tracking-wider">
              Production Ready
            </h3>
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {mainSkills.map((skill, idx) => (
                <SkillCard key={skill.name} skill={skill} index={idx} />
              ))}
            </motion.div>
          </div>

          {/* Familiar Skills */}
          <div>
            <h3 className="text-sm font-mono text-accent mb-6 uppercase tracking-wider">
              Experienced With
            </h3>
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {familiarSkills.map((skill, idx) => (
                <SkillCard key={skill.name} skill={skill} index={idx} />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
