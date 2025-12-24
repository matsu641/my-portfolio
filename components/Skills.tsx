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
  context: string;
};

const mainSkills: Skill[] = [
  { name: "TypeScript", context: "主要言語としてタイプセーフなアプリケーション開発" },
  { name: "React / Next.js", context: "本番環境レベルのSPAとSSR/SSGアプリケーション" },
  { name: "Python", context: "データ処理、自動化、FastAPI開発" },
  { name: "C / C++", context: "システムプログラミングと組込み開発" },
  { name: "Tailwind CSS", context: "迅速で一貫性のあるUI開発" },
  { name: "FastAPI", context: "高性能なREST API開発" },
];

const familiarSkills: Skill[] = [
  { name: "Docker", context: "ローカル開発とデプロイメントの一貫性" },
  { name: "Firebase", context: "認証、データベース、ホスティング" },
  { name: "PyTorch / NumPy / Pandas", context: "機械学習とデータ分析" },
  { name: "Git / GitHub", context: "バージョン管理とコラボレーション" },
];

function SkillCard({ skill, index }: { skill: Skill; index: number }) {
  return (
    <motion.div
      variants={item}
      className="border border-foreground/10 rounded-lg p-5 hover:border-accent/30 transition-colors"
    >
      <h4 className="font-semibold text-lg mb-2">{skill.name}</h4>
      <p className="text-muted text-sm leading-relaxed">{skill.context}</p>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="py-24 md:py-32 px-6 md:px-8 bg-foreground/[0.02]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">スキル</h2>
        <p className="text-xl text-muted mb-16 max-w-2xl">
          知識だけでなく、どのように、いつ使用するかを重視しています
        </p>

        <div className="space-y-12">
          {/* Main Skills */}
          <div>
            <h3 className="text-sm font-mono text-accent mb-6 uppercase tracking-wider">
              本番環境対応可能
            </h3>
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {mainSkills.map((skill, idx) => (
                <SkillCard key={skill.name} skill={skill} index={idx} />
              ))}
            </motion.div>
          </div>

          {/* Familiar Skills */}
          <div>
            <h3 className="text-sm font-mono text-accent mb-6 uppercase tracking-wider">
              経験あり
            </h3>
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {familiarSkills.map((skill, idx) => (
                <SkillCard key={skill.name} skill={skill} index={idx} />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
