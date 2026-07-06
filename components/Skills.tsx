"use client";

import { motion } from "framer-motion";

const skillGroups = [
  ["TypeScript", "React", "Next.js", "Tailwind CSS"],
  ["Python", "PyTorch", "scikit-learn", "LLM / RAG"],
  ["C / C++", "AWS", "PostgreSQL", "Docker"],
];

export default function Skills() {
  return (
    <section id="skills" className="scroll-mt-20 px-6 py-8 md:px-8 md:py-10">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.45 }}
        className="mx-auto max-w-5xl border-y border-black/10 py-8"
      >
        <div className="grid gap-4 md:grid-cols-[170px_1fr] md:items-start">
          <h2 className="text-lg font-bold text-[#242424]">Skills</h2>
          <div className="grid gap-3 md:grid-cols-3">
            {skillGroups.map((group) => (
              <div key={group.join("-")} className="flex flex-wrap gap-2">
                {group.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-[#d7e0db] bg-white px-3 py-1.5 text-sm font-semibold text-[#5f6662]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
