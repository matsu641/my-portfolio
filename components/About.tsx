"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function About() {
  return (
    <section id="about" className="scroll-mt-20 px-6 py-10 md:px-8 md:py-12">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.45 }}
        className="mx-auto flex max-w-5xl items-center gap-7"
      >
        <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-full border border-black/10 bg-white text-4xl font-bold text-[#6f8f82] shadow-sm">
          M
        </div>
        <div className="max-w-3xl">
          <h2 className="text-lg font-bold text-[#242424]">Hi, I&apos;m Misumi.</h2>
          <p className="mt-3 text-base leading-7 text-[#4b504d]">
            Computer Engineering student at the University of Toronto with a passion for
            building reliable software and AI-powered tools. I enjoy turning ideas into
            products that solve real problems.
          </p>
          <Link
            href="/#contact"
            className="mt-3 inline-flex text-sm font-semibold text-[#68887b] hover:text-[#496b5f]"
          >
            Learn more about me -&gt;
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
