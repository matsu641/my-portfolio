"use client";

import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function About() {
  return (
    <section id="about" className="py-24 md:py-32 px-6 md:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2 variants={item} className="text-4xl md:text-5xl font-bold mb-12">
            How I Work
          </motion.h2>

          <div className="space-y-12">
            {/* Philosophy */}
            <motion.div variants={item}>
              <h3 className="text-xl font-semibold mb-3 text-accent">Philosophy</h3>
              <p className="text-lg text-muted leading-relaxed">
                I believe great engineering isn't about using the latest tech—it's about 
                choosing the right tool for the problem. I prioritize maintainability, 
                performance, and user experience over complexity.
              </p>
            </motion.div>

            {/* Approach */}
            <motion.div variants={item}>
              <h3 className="text-xl font-semibold mb-3 text-accent">Approach</h3>
              <ul className="space-y-3 text-lg text-muted">
                <li className="flex gap-3">
                  <span className="text-foreground font-mono text-sm mt-1">→</span>
                  <span>Start with the user problem, then choose the tech stack</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-foreground font-mono text-sm mt-1">→</span>
                  <span>Design APIs and data flow before writing components</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-foreground font-mono text-sm mt-1">→</span>
                  <span>Write code that's easy to delete and iterate on</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-foreground font-mono text-sm mt-1">→</span>
                  <span>Measure impact with real metrics, not assumptions</span>
                </li>
              </ul>
            </motion.div>

            {/* Focus Areas */}
            <motion.div variants={item}>
              <h3 className="text-xl font-semibold mb-3 text-accent">Current Focus</h3>
              <p className="text-lg text-muted leading-relaxed">
                Building high-performance web applications with React/Next.js, exploring 
                AI integration patterns, and improving my understanding of distributed 
                systems architecture.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
