"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 md:px-8">
      <div className="max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Clear value proposition - 5 second impact */}
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            I design systems,
            <br />
            <span className="text-muted">not just screens.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted max-w-2xl mb-8">
            Software engineer focused on architecture, performance, and user experience.
            I make technical decisions that scale.
          </p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex gap-4"
          >
            <a
              href="#projects"
              className="px-6 py-3 bg-foreground text-background rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              View Work
            </a>
            <a
              href="#contact"
              className="px-6 py-3 border border-foreground/20 rounded-lg font-medium hover:border-foreground/40 transition-colors"
            >
              Get in Touch
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
