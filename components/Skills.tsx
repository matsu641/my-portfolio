"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

type Skill = {
  name: string;
  level: number; // 1-5
  category: "frontend" | "backend" | "devops" | "ai";
  usedIn?: string[]; // どこで使用したか
};

const skills: Skill[] = [
  // Frontend
  { 
    name: "HTML", 
    level: 5, 
    category: "frontend", 
    usedIn: ["Portfolio", "Freelance", "Volunteer"]
  },
  { 
    name: "JavaScript", 
    level: 3, 
    category: "frontend", 
    usedIn: ["Freelance"]
  },
  { 
    name: "TypeScript", 
    level: 5, 
    category: "frontend", 
    usedIn: ["Portfolio", "Volunteer", "Internship"]
  },
  { 
    name: "React / Next.js", 
    level: 5, 
    category: "frontend", 
    usedIn: ["Portfolio", "Volunteer", "Internship"]
  },
  { 
    name: "Tailwind CSS", 
    level: 5, 
    category: "frontend", 
    usedIn: ["Portfolio", "Volunteer", "Internship"]
  },
  
  // Backend
  { 
    name: "Python", 
    level: 3, 
    category: "backend", 
    usedIn: ["GCI Course", "DL Basics Course", "Volunteer", "Internship"]
  },
  { 
    name: "FastAPI", 
    level: 3, 
    category: "backend", 
    usedIn: ["Volunteer", "Internship"]
  },
  { 
    name: "C / C++", 
    level: 5, 
    category: "backend", 
    usedIn: ["Rush Hour", "GIS Application"]
  },
  
  // DevOps
  { 
    name: "Linux", 
    level: 3, 
    category: "devops", 
    usedIn: ["GIS Application"]
  },
  { 
    name: "Git / GitHub", 
    level: 5, 
    category: "devops", 
    usedIn: ["All Projects"]
  },
  { 
    name: "Docker", 
    level: 3, 
    category: "devops", 
    usedIn: ["Volunteer", "Internship"]
  },
  { 
    name: "Firebase", 
    level: 3, 
    category: "devops", 
    usedIn: ["Internship"]
  },
  
  // AI/ML
  { 
    name: "NumPy / Pandas", 
    level: 4, 
    category: "ai", 
    usedIn: ["GCI Course", "DL Basics Course", "Data Analysis", "Image Classification"]
  },
  { 
    name: "scikit-learn", 
    level: 4, 
    category: "ai", 
    usedIn: ["GCI Course", "DL Basics Course", "Data Analysis", "Image Classification"]
  },
    { 
    name: "PyTorch", 
    level: 3, 
    category: "ai", 
    usedIn: ["GCI Course", "DL Basics Course", "Image Classification"]
  },
  { 
    name: "TensorFlow", 
    level: 1, 
    category: "ai", 
    usedIn: ["DL Basics Course"]
  },
];

const categoryConfig = {
  frontend: { color: "from-pink-500 to-rose-500" },
  backend: { color: "from-green-500 to-emerald-500" },
  ai: { color: "from-blue-500 to-cyan-500" },
  devops: { color: "from-orange-500 to-yellow-500" },
};

function SkillCard({ skill }: { skill: Skill }) {
  const config = categoryConfig[skill.category];
  
  return (
    <motion.div
      variants={item}
      className="border border-foreground/10 rounded-lg p-4 hover:border-accent/30 transition-colors"
    >
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold text-base">{skill.name}</h4>
        <span className="text-xs text-muted">{skill.level}/5</span>
      </div>
      
      {/* レベルバー */}
      <div className="w-full h-2 bg-foreground/5 rounded-full overflow-hidden mb-3">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${(skill.level / 5) * 100}%` }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={`h-full bg-gradient-to-r ${config.color} rounded-full`}
        />
      </div>
      
      {/* 使用経験タグ */}
      {skill.usedIn && skill.usedIn.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {skill.usedIn.map((tag) => (
            <span
              key={tag}
              className="text-xs font-medium px-2.5 py-1 rounded-md bg-blue-500/20 text-blue-200 border border-blue-400/40 hover:bg-blue-500/30 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default function Skills() {
  const { t } = useLanguage();
  
  return (
    <section id="skills" className="py-24 md:py-32 px-6 md:px-8 bg-foreground/[0.02]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">{t('skills.title')}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {(Object.keys(categoryConfig) as Array<keyof typeof categoryConfig>).map((category) => {
            const categorySkills = skills.filter((s) => s.category === category);
            const config = categoryConfig[category];
            
            return (
              <div key={category}>
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-4 h-4 rounded-full bg-gradient-to-br ${config.color}`} />
                  <h3 className="text-xl font-semibold">{t(`skills.categories.${category}`)}</h3>
                </div>
                
                <motion.div
                  variants={container}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-50px" }}
                  className="space-y-3"
                >
                  {categorySkills.map((skill) => (
                    <SkillCard key={skill.name} skill={skill} />
                  ))}
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
