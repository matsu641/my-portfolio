"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const heroCopy = {
  en: {
    subtitle: "Computer Engineering Student @ UofT | SW/AI Engineering Intern",
    description: [
      "I enjoy working close to real users, understanding their problems,",
      "and turning ideas into products that are useful in practice.",
    ],
  },
  ja: {
    subtitle: "工学部生@トロント大　|　ソフトウェア/AIエンジニアインターン",
    description: [
      "私は、実際のユーザーの抱えている課題を理解し、",
      "アイデアを実用的なプロダクトに変えることが好きです。",
    ],
  },
};

function TypingSubtitle({ text, animationKey }: { text: string; animationKey: string }) {
  const maskId = `subtitle-typing-mask-${animationKey}`;

  return (
    <svg
      className="mx-auto mt-5 h-12 w-full max-w-4xl overflow-visible md:h-16"
      viewBox="0 0 1100 80"
      role="img"
      aria-label={text}
    >
      <defs>
        <clipPath id={maskId}>
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
        clipPath={`url(#${maskId})`}
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

function AnimatedDescription({ lines }: { lines: string[] }) {
  return (
    <motion.p
      className="mx-auto mt-6 max-w-4xl text-lg font-medium leading-8 text-[#5f6662] dark:text-[#c6d2cc] md:text-2xl md:leading-10"
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.18,
            delayChildren: 2.35,
          },
        },
      }}
    >
      {lines.map((line) => (
        <motion.span
          key={line}
          className="block"
          variants={{
            hidden: { opacity: 0, y: 18, scale: 0.98, filter: "blur(16px)" },
            show: {
              opacity: 1,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
              transition: { duration: 0.72, ease: "easeOut" },
            },
          }}
        >
          {line}
        </motion.span>
      ))}
    </motion.p>
  );
}

export default function Hero() {
  const { language } = useLanguage();
  const copy = heroCopy[language];

  return (
    <section
      id="home"
      className="relative flex min-h-screen scroll-mt-20 items-center justify-center px-6 py-24 md:px-8"
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
        <TypingSubtitle key={`subtitle-${language}`} text={copy.subtitle} animationKey={language} />
        <AnimatedDescription key={`description-${language}`} lines={copy.description} />
      </motion.div>
      <motion.a
        href="#about"
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-xs font-bold uppercase tracking-normal text-[#68887b] transition-colors hover:text-[#496b5f] dark:text-[#9bb8aa] dark:hover:text-white md:bottom-10"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{
          opacity: { duration: 0.5, delay: 3 },
          y: { duration: 1.4, repeat: Infinity, ease: "easeInOut", delay: 3 },
        }}
        aria-label={language === "ja" ? "次のセクションへスクロール" : "Scroll down"}
      >
        <span>{language === "ja" ? "Scroll down" : "Scroll down"}</span>
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
          <path d="M12 5v14" strokeLinecap="round" />
          <path d="m6 13 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.a>
    </section>
  );
}
