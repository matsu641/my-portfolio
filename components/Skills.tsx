"use client";

import { motion } from "framer-motion";

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
  category: "frontend" | "backend" | "devops";
};

const skills: Skill[] = [
  // Frontend
  { name: "HTML/CSS", level: 5, category: "frontend" },
  { name: "JavaScript", level: 3, category: "frontend" },
  { name: "TypeScript", level: 5, category: "frontend" },
  { name: "React / Next.js", level: 4, category: "frontend" },
  { name: "Tailwind CSS", level: 5, category: "frontend" },
  { name: "Vue.js", level: 2, category: "frontend" },
  
  // Backend
  { name: "Python", level: 4, category: "backend" },
  { name: "FastAPI", level: 3, category: "backend" },
  { name: "C / C++", level: 5, category: "backend" },
  { name: "MySQL", level: 1, category: "backend" },
  { name: "PostgreSQL", level: 2, category: "backend" },
  
  // DevOps
  { name: "Linux", level: 3, category: "devops" },
  { name: "Git / GitHub", level: 4, category: "devops" },
  { name: "Docker", level: 3, category: "devops" },
  { name: "Firebase", level: 3, category: "devops" },
];

const categoryConfig = {
  frontend: { label: "Front-end", color: "from-pink-500 to-rose-500" },
  backend: { label: "Back-end", color: "from-green-500 to-emerald-500" },
  devops: { label: "DevOps", color: "from-orange-500 to-yellow-500" },
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
      <div className="w-full h-2 bg-foreground/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${(skill.level / 5) * 100}%` }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={`h-full bg-gradient-to-r ${config.color} rounded-full`}
        />
      </div>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="py-24 md:py-32 px-6 md:px-8 bg-foreground/[0.02]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Skill</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {(Object.keys(categoryConfig) as Array<keyof typeof categoryConfig>).map((category) => {
            const categorySkills = skills.filter((s) => s.category === category);
            const config = categoryConfig[category];
            
            return (
              <div key={category}>
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-4 h-4 rounded-full bg-gradient-to-br ${config.color}`} />
                  <h3 className="text-xl font-semibold">{config.label}</h3>
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
