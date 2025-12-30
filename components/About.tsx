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
  const { t, language } = useLanguage();
  
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
                {t('about.intro').map((paragraph: string, index: number) => (
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

          {/* Work Experience */}
          <motion.div variants={item} className="mb-16">
            <h3 className="text-2xl font-bold mb-6">{t('about.experience.title')}</h3>
            <div className="space-y-8">
              {/* STAR UP */}
              <div className="border-l-2 border-accent pl-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="text-xl font-semibold">{t('about.experience.starup.role')}</h4>
                    <p className="text-accent font-medium">{t('about.experience.starup.company')}</p>
                  </div>
                  <span className="text-sm text-zinc-300 whitespace-nowrap ml-4">{t('about.experience.starup.period')}</span>
                </div>
                <p className="text-zinc-300 mb-3">{t('about.experience.starup.location')}</p>
                <ul className="space-y-2 text-zinc-100">
                  {t('about.experience.starup.tasks').map((task: string, index: number) => (
                    <li key={index} className="flex gap-2">
                      <span className="text-accent mt-1">•</span>
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Freelance */}
              <div className="border-l-2 border-accent pl-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="text-xl font-semibold">{t('about.experience.freelance.role')}</h4>
                    <p className="text-accent font-medium">{t('about.experience.freelance.company')}</p>
                  </div>
                  <span className="text-sm text-zinc-300 whitespace-nowrap ml-4">{t('about.experience.freelance.period')}</span>
                </div>
                <p className="text-zinc-300 mb-3">{t('about.experience.freelance.location')}</p>
                <ul className="space-y-2 text-zinc-100">
                  {t('about.experience.freelance.tasks').map((task: string, index: number) => (
                    <li key={index} className="flex gap-2">
                      <span className="text-accent mt-1">•</span>
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>
                <motion.a
                  href="https://kuwabara-ortho.jp"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-accent/10 hover:bg-accent/20 border border-accent/30 rounded-lg text-accent font-medium transition-all"
                >
                  {language === 'ja' ? 'ウェブサイトを見る' : 'View Website'}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* Activities */}
          <motion.div variants={item} className="mb-16">
            <h3 className="text-2xl font-bold mb-6">{t('about.activities.title')}</h3>
            <div className="space-y-8">
              <div className="border-l-2 border-accent pl-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="text-xl font-semibold">{t('about.activities.utjn.role')}</h4>
                    <p className="text-accent font-medium">{t('about.activities.utjn.organization')}</p>
                  </div>
                  <span className="text-sm text-zinc-300 whitespace-nowrap ml-4">{t('about.activities.utjn.period')}</span>
                </div>
                <ul className="space-y-2 text-zinc-100 mt-3">
                  {t('about.activities.utjn.tasks').map((task: string, index: number) => (
                    <li key={index} className="flex gap-2">
                      <span className="text-accent mt-1">•</span>
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>
                <motion.a
                  href="https://uoftjn.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-accent/10 hover:bg-accent/20 border border-accent/30 rounded-lg text-accent font-medium transition-all"
                >
                  {language === 'ja' ? 'ウェブサイトを見る' : 'View Website'}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </motion.a>
              </div>

              <div className="border-l-2 border-accent pl-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="text-xl font-semibold">{t('about.activities.torontonians.role')}</h4>
                    <p className="text-accent font-medium">{t('about.activities.torontonians.organization')}</p>
                  </div>
                  <span className="text-sm text-zinc-300 whitespace-nowrap ml-4">{t('about.activities.torontonians.period')}</span>
                </div>
                <ul className="space-y-2 text-zinc-100 mt-3">
                  {t('about.activities.torontonians.tasks').map((task: string, index: number) => (
                    <li key={index} className="flex gap-2">
                      <span className="text-accent mt-1">•</span>
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Certifications */}
          <motion.div variants={item} className="mb-16">
            <h3 className="text-2xl font-bold mb-6">{t('about.certifications.title')}</h3>
            <div className="space-y-6">
              {t('about.certifications.items').map((cert: any, index: number) => (
                <div key={index} className="border-l-2 border-accent pl-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="text-xl font-semibold">{cert.name}</h4>
                      <p className="text-accent font-medium">{cert.issuer}</p>
                    </div>
                    <span className="text-sm text-zinc-300 whitespace-nowrap ml-4">{cert.date}</span>
                  </div>
                  {cert.description && (
                    <p className="text-zinc-100 mt-3">{cert.description}</p>
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
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
