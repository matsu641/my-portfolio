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
                <p className="text-lg text-zinc-100 leading-relaxed">
                  日本で生まれ育ち、高校時代はアメリカへ留学しました。現在はカナダのトロント大学でComputer Engineeringを専攻する学部3年生です。
                </p>
                <p className="text-lg text-zinc-100 leading-relaxed">
                  大学では1・2年次に、ソフトウェアとハードウェアの両面から基礎を学び、C/C++やアセンブリ言語を用いた組み込み開発、回路設計などを経験しました。
                  現在は、制御工学・半導体デバイス・深層学習といった専門分野を中心に学びながら、サークル活動やスタートアップ企業でフルスタックWeb開発にも取り組んでいます。
                </p>
                <p className="text-lg text-zinc-100 leading-relaxed">
                  将来的には、AIやソフトウェアやハードウェアの技術的制約を理解した上で、課題設定から実装・評価までを一貫してリードできるエンジニアを目指しています。
                </p>
              </div>
          </motion.div>

          {/* Education */}
          <motion.div variants={item} className="mb-16">
            <h3 className="text-2xl font-bold mb-6">学歴</h3>
            <div className="space-y-4">
              <div className="border-l-2 border-accent pl-6">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-xl font-semibold">University of Toronto / トロント大学</h4>
                  <span className="text-sm text-zinc-300">2023年8月 - 2028年5月（予定）</span>
                </div>
                <div className="text-zinc-100 space-y-1">
                  <p>専攻：Bachelor of Applied Science in Computer Engineering / コンピュータ工学</p>
                  <p>副専攻：Artificial Intelligence / 人工知能</p>
                </div>
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
                  <span className="text-sm text-zinc-300 whitespace-nowrap ml-4">2025年5月 - 現在</span>
                </div>
                <p className="text-sm text-zinc-300 mb-3">京都、日本（ハイブリッド）</p>
                <ul className="space-y-2 text-zinc-100">
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
                    <h4 className="text-xl font-semibold">フリーランスウェブ開発</h4>
                    <p className="text-accent font-medium">くわばら整形外科クリニック</p>
                  </div>
                  <span className="text-sm text-zinc-300 whitespace-nowrap ml-4">2024年5月 - 7月</span>
                </div>
                <p className="text-sm text-zinc-300 mb-3">リモート</p>
                <ul className="space-y-2 text-zinc-100">
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
                <motion.a
                  href="https://kuwabara-ortho.jp"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-accent/10 hover:bg-accent/20 border border-accent/30 rounded-lg text-accent font-medium transition-all"
                >
                  ウェブサイトを見る
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </motion.a>
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
                  <span className="text-sm text-zinc-300 whitespace-nowrap ml-4">2025年8月 - 現在</span>
                </div>
                <ul className="space-y-2 text-zinc-100 mt-3">
                  <li className="flex gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>TypeScriptとPythonを使用した組織公式ウェブサイトの技術運用とフルスタック開発を担当</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>フロントエンドとバックエンドを含む機能開発やバグ修正に貢献</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>メンバーと定期的なミーティングを行い、機能とUI/UXの両面で問題を特定し改善提案を実施</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>他部門と連携して新機能リクエストの実装やメンテナンス、バグ修正タスクに対応</span>
                  </li>
                </ul>
                <motion.a
                  href="https://uoftjn.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-accent/10 hover:bg-accent/20 border border-accent/30 rounded-lg text-accent font-medium transition-all"
                >
                  ウェブサイトを見る
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </motion.a>
              </div>

              <div className="border-l-2 border-accent pl-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="text-xl font-semibold">Torontonians Executive Member</h4>
                    <p className="text-accent font-medium">University of Toronto Japan Network (UTJN)</p>
                  </div>
                  <span className="text-sm text-zinc-300 whitespace-nowrap ml-4">2023年9月 - 2025年8月</span>
                </div>
                <ul className="space-y-2 text-zinc-100 mt-3">
                  <li className="flex gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>トロント大学に興味のある人に向けてブログ記事を執筆し、大学生活や学業に関する情報を発信</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>インスタグラム動画投稿の企画と制作を補助し、SNSを通じた情報発信を強化</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>新入生向けにイベントを企画し、コミュニティ形成に貢献</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Certifications & Courses */}
          <motion.div variants={item} className="mb-16">
            <h3 className="text-2xl font-bold mb-6">修了コース</h3>
            <div className="space-y-6">
              {/* GCI Program */}
              <div className="border-l-2 border-accent pl-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="text-xl font-semibold">Global Consumer Intelligence Program</h4>
                    <p className="text-accent font-medium">松尾研究室（東京大学）</p>
                  </div>
                  <span className="text-sm text-zinc-300 whitespace-nowrap ml-4">修了：2025年8月</span>
                </div>
                <p className="text-zinc-100 mt-3">
                  データ駆動型アプローチを用いてグローバルな消費者行動を分析する手法を学習。
                  AIテクニックと市場・ビジネスの視点を組み合わせ、ケーススタディやプロジェクトを通じて実践的なスキルを習得。
                </p>
                <motion.a
                  href="/certificates/gci-certificate.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-accent/10 hover:bg-accent/20 border border-accent/30 rounded-lg text-accent font-medium transition-all"
                >
                  修了証を見る
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </motion.a>
              </div>

              {/* Deep Learning Foundations */}
              <div className="border-l-2 border-accent pl-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="text-xl font-semibold">Deep Learning Foundations Course</h4>
                    <p className="text-accent font-medium">松尾研究室（東京大学）</p>
                  </div>
                  <span className="text-sm text-zinc-300 whitespace-nowrap ml-4">修了：2025年7月</span>
                </div>
                <p className="text-zinc-100 mt-3">
                  ニューラルネットワーク、最適化、表現学習など、深層学習の理論的基礎を学習。
                  ハンズオン課題を通じてコアとなるモデルの実装を経験。
                </p>
                <motion.a
                  href="/certificates/dl-foundations-certificate.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-accent/10 hover:bg-accent/20 border border-accent/30 rounded-lg text-accent font-medium transition-all"
                >
                  修了証を見る
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </motion.a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
