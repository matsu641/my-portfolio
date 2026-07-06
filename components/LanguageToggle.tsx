"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="fixed right-4 top-3 z-50 md:right-6"
    >
      <div className="flex items-center gap-1 rounded-full border border-black/10 bg-white/90 p-1 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-[#1b1f1d]/90">
        <button
          onClick={() => setLanguage('ja')}
          className={`rounded-full px-3 py-1.5 text-xs font-bold transition-all ${
            language === 'ja'
              ? 'bg-[#68887b] text-white shadow-sm'
              : 'text-[#5f6662] hover:text-[#242424] dark:text-[#c6d2cc] dark:hover:text-white'
          }`}
        >
          日本語
        </button>
        <button
          onClick={() => setLanguage('en')}
          className={`rounded-full px-3 py-1.5 text-xs font-bold transition-all ${
            language === 'en'
              ? 'bg-[#68887b] text-white shadow-sm'
              : 'text-[#5f6662] hover:text-[#242424] dark:text-[#c6d2cc] dark:hover:text-white'
          }`}
        >
          English
        </button>
      </div>
    </motion.div>
  );
}
