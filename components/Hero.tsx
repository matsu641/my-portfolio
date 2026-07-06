"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const heroCopy = {
  en: {
    subtitle: "Computer Engineering Student @ UofT | SW/AI Engineering Intern",
    description:
      "I enjoy working close to real users, understanding their problems, and turning ideas into products that are useful in practice.",
  },
  ja: {
    subtitle: "トロント大学コンピュータ工学科 | ソフトウェア/AIインターン",
    description:
      "私は、実際のユーザーの抱えている課題を理解し、アイデアを実用的なプロダクトに変えることが好きです。",
  },
};

function TypingSubtitle({ text }: { text: string }) {
  return (
    <svg
      className="mx-auto mt-5 h-12 w-full max-w-4xl overflow-visible md:h-16"
      viewBox="0 0 1100 80"
      role="img"
      aria-label={text}
    >
      <defs>
        <clipPath id="subtitle-typing-mask">
          <motion.rect
            x="0"
            y="0"
            height="80"
            initial={{ width: 0 }}
            animate={{ width: 1100 }}
            transition={{ duration: 2.2, ease: "easeInOut", delay: 0.35 }}
          />
        </clipPath>
      </defs>
      <text
        x="550"
        y="47"
        textAnchor="middle"
        clipPath="url(#subtitle-typing-mask)"
        className="fill-[#4b504d] text-[34px] font-semibold dark:fill-[#c6d2cc]"
      >
        {text}
      </text>
      <motion.line
        y1="16"
        y2="58"
        stroke="currentColor"
        strokeWidth="3"
        className="text-[#68887b] dark:text-[#9bb8aa]"
        initial={{ x1: 0, x2: 0, opacity: 1 }}
        animate={{ x1: [0, 1100, 1100], x2: [0, 1100, 1100], opacity: [1, 1, 0] }}
        transition={{ duration: 2.45, ease: "easeInOut", delay: 0.35, times: [0, 0.9, 1] }}
      />
    </svg>
  );
}

export default function Hero() {
  const { language } = useLanguage();
  const copy = heroCopy[language];

  return (
    <section
      id="home"
      className="flex min-h-screen scroll-mt-20 items-center justify-center px-6 py-24 md:px-8"
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="mx-auto max-w-4xl text-center"
      >
        <h1 className="text-5xl font-extrabold tracking-normal text-[#232425] dark:text-[#f4f7f5] md:text-7xl">
          Misumi Matsudo
        </h1>
        <TypingSubtitle text={copy.subtitle} />
        <p className="mx-auto mt-5 max-w-4xl text-lg font-medium leading-8 text-[#5f6662] dark:text-[#c6d2cc] md:text-2xl md:leading-10">
          {copy.description}
        </p>
      </motion.div>
    </section>
  );
}
