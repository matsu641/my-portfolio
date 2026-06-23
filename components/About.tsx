"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

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
  const { t } = useLanguage();
  
  return (
    <section id="about" className="py-24 md:py-32 px-6 md:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* About Me Section */}
          <motion.div variants={item} className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">{t('about.title')}</h2>
              <div className="space-y-6">
                {t<string[]>('about.intro').map((paragraph: string, index: number) => (
                  <p key={index} className="text-lg text-zinc-100 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
          </motion.div>

          {/* Education */}
          <motion.div variants={item} className="mb-16">
            <h3 className="text-2xl font-bold mb-6">{t('about.education.title')}</h3>
            <div className="space-y-4">
              <div className="border-l-2 border-accent pl-6">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-xl font-semibold">{t('about.education.uoft.name')}</h4>
                  <span className="text-sm text-zinc-300">{t('about.education.uoft.period')}</span>
                </div>
                <div className="text-zinc-100 space-y-1">
                  <p>{t('about.education.uoft.major')}</p>
                  <p>{t('about.education.uoft.minor')}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
