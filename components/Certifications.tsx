"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

type Certification = {
  name: string;
  issuer: string;
  date: string;
  description?: string[];
  tags?: string[];
  link: string;
};

function SkillTags({ tags }: { tags?: string[] }) {
  if (!tags || tags.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mt-3">
      {tags.map((tag) => (
        <span
          key={tag}
          className="text-xs font-mono px-3 py-1 bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded-full"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

export default function Certifications() {
  const { t, language } = useLanguage();
  const certifications = t('about.certifications.items') as Certification[];

  return (
    <section id="certifications" className="py-24 md:py-32 px-6 md:px-8 bg-foreground/[0.02]">
      <div className="max-w-4xl mx-auto">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2 variants={item} className="text-4xl md:text-5xl font-bold mb-12">
            {t('about.certifications.title')}
          </motion.h2>

          <div className="space-y-6">
            {certifications.map((cert, index) => (
              <motion.div key={index} variants={item} className="border-l-2 border-accent pl-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-xl font-semibold">{cert.name}</h3>
                    <p className="text-accent font-medium">{cert.issuer}</p>
                  </div>
                  <span className="text-sm text-zinc-300 whitespace-nowrap ml-4">{cert.date}</span>
                </div>
                <SkillTags tags={cert.tags} />
                {cert.description && (
                  <ul className="space-y-2 text-zinc-100 mt-3">
                    {cert.description.map((desc, descIndex) => (
                      <li key={descIndex} className="flex gap-2">
                        <span className="text-accent mt-1">•</span>
                        <span>{desc}</span>
                      </li>
                    ))}
                  </ul>
                )}
                <motion.a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-accent/10 hover:bg-accent/20 border border-accent/30 rounded-lg text-accent font-medium transition-all"
                >
                  {language === 'ja' ? '修了証を見る' : 'View Certificate'}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </motion.a>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
