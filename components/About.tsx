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
                トロント大学でコンピュータ工学を専攻し、AIを副専攻しています。5年制プログラムで、現在は学部3年生です。
              </p>
              <p className="text-lg text-muted leading-relaxed">
                1・2年次には、ソフトウェアとハードウェアの両面から基礎を学び、C/C++やアセンブリ言語を用いた組み込み開発、回路設計などの経験を積みました。
                現在は、制御工学、半導体デバイス、深層学習など、大学でより専門的な分野を中心に学びながら、サークルやスタートアップ企業でフルスタックWeb開発をしています。
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

          {/* Certifications & Courses */}
          <motion.div variants={item} className="mb-16">
            <h3 className="text-2xl font-bold mb-6">修了コース・研修</h3>
            <div className="space-y-6">
              {/* GCI Program */}
              <div className="border-l-2 border-accent pl-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="text-xl font-semibold">Global Consumer Intelligence Program</h4>
                    <p className="text-accent font-medium">松尾研究室（東京大学）</p>
                  </div>
                  <span className="text-sm text-muted whitespace-nowrap ml-4">修了：2025年8月</span>
                </div>
                <p className="text-muted mt-3">
                  データ駆動型アプローチを用いてグローバルな消費者行動を分析する手法を学習。
                  AIテクニックと市場・ビジネスの視点を組み合わせ、ケーススタディやプロジェクトを通じて実践的なスキルを習得。
                </p>
                <a 
                  href="/certificates/gci-certificate.pdf" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-accent hover:underline text-sm mt-4"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  修了証を見る
                </a>
              </div>

              {/* Deep Learning Foundations */}
              <div className="border-l-2 border-accent pl-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="text-xl font-semibold">Deep Learning Foundations Course</h4>
                    <p className="text-accent font-medium">松尾研究室（東京大学）</p>
                  </div>
                  <span className="text-sm text-muted whitespace-nowrap ml-4">修了：2025年7月</span>
                </div>
                <p className="text-muted mt-3">
                  ニューラルネットワーク、最適化、表現学習など、深層学習の理論的基礎を学習。
                  ハンズオン課題を通じてコアとなるモデルの実装を経験。
                </p>
                <a 
                  href="/certificates/dl-foundations-certificate.pdf" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-accent hover:underline text-sm mt-4"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  修了証を見る
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
