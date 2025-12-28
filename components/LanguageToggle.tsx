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
      className="fixed top-6 right-6 z-50"
    >
      <div className="flex items-center gap-2 bg-background/80 backdrop-blur-md border border-foreground/10 rounded-full p-1">
        <button
          onClick={() => setLanguage('ja')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            language === 'ja'
              ? 'bg-accent text-white shadow-lg'
              : 'text-foreground/60 hover:text-foreground'
          }`}
        >
          日本語
        </button>
        <button
          onClick={() => setLanguage('en')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            language === 'en'
              ? 'bg-accent text-white shadow-lg'
              : 'text-foreground/60 hover:text-foreground'
          }`}
        >
          English
        </button>
      </div>
    </motion.div>
  );
}
