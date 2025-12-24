"use client";

import { motion } from "framer-motion";

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
            <h2 className="text-4xl md:text-5xl font-bold mb-8">About Me</h2>
            <div className="space-y-6">
              <p className="text-lg text-muted leading-relaxed">
                トロント大学でコンピューターエンジニアリングを専攻している学部生です。
                TypeScript、React/Next.js、Python、FastAPIを使用したフルスタック開発に
                情熱を注いでいます。
              </p>
              <p className="text-lg text-muted leading-relaxed">
                現在、製造業向けSaaSプラットフォームの開発に携わり、Feature Leadとして
                要件定義からタスク分解、進行管理まで担当しています。また、フリーランスとして
                医療機関のウェブサイト開発を手がけ、SEO最適化により3ヶ月で2,856インプレッション、
                343クリック（CTR 12%）を達成しました。
              </p>
              <p className="text-lg text-muted leading-relaxed">
                技術選定においては、最新トレンドに飛びつくのではなく、プロジェクトの要件や
                長期的な保守性を重視した判断を心がけています。コードの品質とユーザー体験の
                両立を常に意識し、ビジネス目標達成に貢献するソリューションを構築します。
              </p>
            </div>
          </motion.div>

          {/* Education */}
          <motion.div variants={item} className="mb-16">
            <h3 className="text-2xl font-bold mb-6">学歴</h3>
            <div className="space-y-4">
              <div className="border-l-2 border-accent pl-6">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-xl font-semibold">トロント大学</h4>
                  <span className="text-sm text-muted">2023年8月 - 2028年5月（予定）</span>
                </div>
                <p className="text-muted">コンピューターエンジニアリング学部（Bachelor of Applied Science）</p>
              </div>
            </div>
          </motion.div>

          {/* Work Experience */}
          <motion.div variants={item} className="mb-16">
            <h3 className="text-2xl font-bold mb-6">職歴</h3>
            <div className="space-y-8">
              {/* STAR UP */}
              <div className="border-l-2 border-accent pl-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="text-xl font-semibold">ソフトウェアエンジニアインターン（Feature Lead）</h4>
                    <p className="text-accent font-medium">STAR UP, Inc.</p>
                  </div>
                  <span className="text-sm text-muted whitespace-nowrap ml-4">2025年5月 - 現在</span>
                </div>
                <p className="text-sm text-muted mb-3">京都、日本（ハイブリッド）</p>
                <ul className="space-y-2 text-muted">
                  <li className="flex gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>TypeScript、React/Next.js、FastAPIを使用した製造業向けSaaSプラットフォームの開発に貢献</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>継続的なリファクタリング、ユニットテストの作成、バグ修正によりコード品質とシステム信頼性を向上</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>新機能の企画と実行を主導し、エンジニアとビジネスステークホルダー間で要件調整、タスク分解、進捗管理を担当</span>
                  </li>
                </ul>
              </div>

              {/* Freelance */}
              <div className="border-l-2 border-accent pl-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="text-xl font-semibold">フリーランスウェブ開発者</h4>
                    <p className="text-accent font-medium">くわばら整形外科クリニック</p>
                  </div>
                  <span className="text-sm text-muted whitespace-nowrap ml-4">2024年5月 - 7月</span>
                </div>
                <p className="text-sm text-muted mb-3">リモート</p>
                <ul className="space-y-2 text-muted">
                  <li className="flex gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>HTML、CSS、JavaScriptを使用して、完全レスポンシブなクリニックウェブサイトをゼロから設計・開発</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>クライアントと密接に協力し、要件を明確化してサイト構造とUI/UXに変換</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>SEO最適化を実装しウェブサイトをデプロイ。オンライン可視性と患者のアクセシビリティを向上</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>ローンチ後3ヶ月以内に2,856インプレッション、343クリック（CTR 12%）を達成し、若年層患者の増加に貢献</span>
                  </li>
                </ul>
                <a 
                  href="https://kuwabara-ortho.jp" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block mt-3 text-accent hover:underline text-sm"
                >
                  ウェブサイトを見る →
                </a>
              </div>
            </div>
          </motion.div>

          {/* Volunteer */}
          <motion.div variants={item} className="mb-16">
            <h3 className="text-2xl font-bold mb-6">ボランティア活動</h3>
            <div className="space-y-4">
              <div className="border-l-2 border-accent pl-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="text-xl font-semibold">Web Executive Member</h4>
                    <p className="text-accent font-medium">University of Toronto Japan Network (UTJN)</p>
                  </div>
                  <span className="text-sm text-muted whitespace-nowrap ml-4">2023年9月 - 現在</span>
                </div>
                <ul className="space-y-2 text-muted mt-3">
                  <li className="flex gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>TypeScriptとPythonを使用した組織公式ウェブサイトの技術運用とフルスタック開発を担当</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>フロントエンドUIコンポーネント、バックエンドAPIロジック、データベース統合を含む機能開発に貢献</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>チームメンバーと協力して、機能とUI/UXの両面で問題を特定し改善提案を実施</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>他部門と連携して新機能リクエストの実装やメンテナンス、バグ修正タスクに対応</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* How I Work Section */}
          <motion.h2 variants={item} className="text-4xl md:text-5xl font-bold mb-12">
            How I Work
          </motion.h2>

          <div className="space-y-12">
            {/* Philosophy */}
            <motion.div variants={item}>
              <h3 className="text-xl font-semibold mb-3 text-accent">Philosophy</h3>
              <p className="text-lg text-muted leading-relaxed">
                I believe great engineering isn't about using the latest tech—it's about 
                choosing the right tool for the problem. I prioritize maintainability, 
                performance, and user experience over complexity.
              </p>
            </motion.div>

            {/* Approach */}
            <motion.div variants={item}>
              <h3 className="text-xl font-semibold mb-3 text-accent">Approach</h3>
              <ul className="space-y-3 text-lg text-muted">
                <li className="flex gap-3">
                  <span className="text-foreground font-mono text-sm mt-1">→</span>
                  <span>Start with the user problem, then choose the tech stack</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-foreground font-mono text-sm mt-1">→</span>
                  <span>Design APIs and data flow before writing components</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-foreground font-mono text-sm mt-1">→</span>
                  <span>Write code that's easy to delete and iterate on</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-foreground font-mono text-sm mt-1">→</span>
                  <span>Measure impact with real metrics, not assumptions</span>
                </li>
              </ul>
            </motion.div>

            {/* Focus Areas */}
            <motion.div variants={item}>
              <h3 className="text-xl font-semibold mb-3 text-accent">Current Focus</h3>
              <p className="text-lg text-muted leading-relaxed">
                Building high-performance web applications with React/Next.js, exploring 
                AI integration patterns, and improving my understanding of distributed 
                systems architecture.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
