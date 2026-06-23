"use client";

import { motion } from "framer-motion";
import Image from "next/image";
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

type ProjectExperience = {
  title: string;
  period: string;
  tasks: string[];
};

type WebsiteExperience = {
  title: string;
  url: string;
  image?: string;
};

type ExperienceEntry = {
  tags?: string[];
  tasks?: string[];
  projects?: ProjectExperience[];
  websites?: WebsiteExperience[];
};

function SkillTags({ tags }: { tags?: string[] }) {
  if (!tags || tags.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mb-3">
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

function TaskList({ tasks }: { tasks: string[] }) {
  return (
    <ul className="space-y-2 text-zinc-100">
      {tasks.map((task, index) => (
        <li key={index} className="flex gap-2">
          <span className="text-accent mt-1">•</span>
          <span>{task}</span>
        </li>
      ))}
    </ul>
  );
}

export default function Experience() {
  const { t, language } = useLanguage();
  const equos = t<ExperienceEntry>('about.experience.equos');
  const starup = t<ExperienceEntry>('about.experience.starup');
  const freelance = t<ExperienceEntry>('about.experience.freelance');
  const utjn = t<ExperienceEntry>('about.activities.utjn');
  const utjnWebsites = utjn.websites ?? [
    {
      title: "UofT Japan Network",
      url: "https://uoftjn.com/",
      image: "/images/utjn-tumbnail.png"
    }
  ];

  return (
    <section id="experience" className="py-24 md:py-32 px-6 md:px-8 bg-foreground/[0.02]">
      <div className="max-w-4xl mx-auto">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2 variants={item} className="text-4xl md:text-5xl font-bold mb-12">
            Experience
          </motion.h2>

          <motion.div variants={item} className="mb-16">
            <h3 className="text-2xl font-bold mb-6">{t('about.experience.title')}</h3>
            <div className="space-y-8">
              <div className="border-l-2 border-accent pl-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="text-xl font-semibold">{t('about.experience.equos.role')}</h4>
                    <p className="text-accent font-medium">{t('about.experience.equos.company')}</p>
                  </div>
                  <span className="text-sm text-zinc-300 whitespace-nowrap ml-4">{t('about.experience.equos.period')}</span>
                </div>
                <p className="text-zinc-300 mb-4">{t('about.experience.equos.location')}</p>
                <SkillTags tags={equos.tags} />
                <div className="space-y-5">
                  {equos.projects?.map((project: ProjectExperience, index: number) => (
                    <div key={index}>
                      <div className="flex justify-between items-baseline mb-2">
                        <h5 className="text-sm font-semibold text-zinc-200">{project.title}</h5>
                        <span className="text-xs text-zinc-400 whitespace-nowrap ml-3">{project.period}</span>
                      </div>
                      <TaskList tasks={project.tasks} />
                    </div>
                  ))}
                  {!equos.projects && equos.tasks && <TaskList tasks={equos.tasks} />}
                </div>
              </div>

              <div className="border-l-2 border-accent pl-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="text-xl font-semibold">{t('about.experience.starup.role')}</h4>
                    <p className="text-accent font-medium">{t('about.experience.starup.company')}</p>
                  </div>
                  <span className="text-sm text-zinc-300 whitespace-nowrap ml-4">{t('about.experience.starup.period')}</span>
                </div>
                <p className="text-zinc-300 mb-3">{t('about.experience.starup.location')}</p>
                <SkillTags tags={starup.tags} />
                <TaskList tasks={t<string[]>('about.experience.starup.tasks')} />
              </div>

              <div className="border-l-2 border-accent pl-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="text-xl font-semibold">{t('about.experience.freelance.role')}</h4>
                    <p className="text-accent font-medium">{t('about.experience.freelance.company')}</p>
                  </div>
                  <span className="text-sm text-zinc-300 whitespace-nowrap ml-4">{t('about.experience.freelance.period')}</span>
                </div>
                <p className="text-zinc-300 mb-3">{t('about.experience.freelance.location')}</p>
                <SkillTags tags={freelance.tags} />
                <TaskList tasks={t<string[]>('about.experience.freelance.tasks')} />
              </div>
            </div>
          </motion.div>

          <motion.div variants={item}>
            <h3 className="text-2xl font-bold mb-6">{t('about.activities.title')}</h3>
            <div className="border-l-2 border-accent pl-6">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="text-xl font-semibold">{t('about.activities.utjn.role')}</h4>
                  <p className="text-accent font-medium">{t('about.activities.utjn.organization')}</p>
                </div>
                <span className="text-sm text-zinc-300 whitespace-nowrap ml-4">{t('about.activities.utjn.period')}</span>
              </div>
              <div className="mt-3">
                <SkillTags tags={utjn.tags} />
                <TaskList tasks={t<string[]>('about.activities.utjn.tasks')} />
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {utjnWebsites.map((website) => (
                  <motion.a
                    key={website.url}
                    href={website.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="block overflow-hidden rounded-lg border border-accent/30 bg-accent/5 hover:bg-accent/10 transition-all"
                  >
                    {website.image ? (
                      <div className="relative w-full h-48 mb-3">
                        <Image
                          src={website.image}
                          alt={`${website.title} Website`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="flex h-48 mb-3 items-center justify-center bg-zinc-900/70 px-5 text-center">
                        <span className="text-lg font-semibold text-zinc-100">{website.title}</span>
                      </div>
                    )}
                    <div className="px-4 pb-4 flex items-center justify-between gap-3">
                      <div>
                        <p className="text-zinc-100 font-medium">{website.title}</p>
                        <span className="text-accent text-sm font-medium">
                          {language === 'ja' ? 'ウェブサイトを見る' : 'View Website'}
                        </span>
                      </div>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
