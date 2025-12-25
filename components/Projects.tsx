"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 }
};

type Project = {
  title: string;
  period: string;
  what: string; // 何を作ったか（1行）
  impact: string[]; // インパクト（箇条書き、展開前表示）
  mainTech: string[]; // 主要技術（3-4個、展開前表示）
  background: string; // 背景（展開後）
  technicalApproach: string; // 技術アプローチと課題点（展開後）
  learnings: string; // 学びと結果（展開後）
  tags: string[];
  videoUrl?: string; // デモビデオのパス（オプション）
  slidesUrl?: string; // プロジェクトスライドのパス（オプション）
  githubUrl?: string; // GitHubリポジトリのURL（オプション）
  leaderboardImageUrl?: string; // リーダーボード画像のパス（オプション）
  confusionMatrixImages?: { path: string; label: string }[]; // Confusion Matrix画像（オプション）
};

const projects: Project[] = [
  {
    title: "胸部X線画像の疾患分類（マルチモーダル深層学習）",
    period: "2025/10 - 2025/12",
    what: "PyTorchを用いて胸部X線画像を4クラス分類するマルチモーダルモデルを構築",
    impact: [
      "画像のみのベースラインと比較して、Effusion・CardiomegalyのRecallおよびMacro F1が大幅に向上",
      "極端なクラス不均衡（No Finding 多数）下での少数疾患クラス検出性能を改善",
    ],
    mainTech: ["PyTorch", "ResNet-50", "Multimodal Learning", "Focal Loss"],
    background:
      "個人プロジェクト。胸部X線データは『No Finding』が大多数を占め、画像のみのCNNでは少数疾患クラスのRecallが著しく低下する課題があった。医療文脈ではAccuracyが高くても疾患の見逃しが起こり得るため、画像特徴量と患者メタデータを統合したマルチモーダルモデルで少数クラス検出性能の改善を目指した。",
    technicalApproach:
      "ResNet-50で特徴抽出の安定性を確保。NIH Chest X-rayデータを使用し、計算資源を考慮して元の15疾患ラベルから4クラス（No Finding / Effusion / Cardiomegaly / Pneumonia）に再構成。画像特徴量と患者メタデータ（年齢・性別・View Position）を結合するマルチモーダル統合で少数疾患クラスの判別性能を向上。約93%がNo Findingに偏った極端な分布に対し、Focal Loss・クラス重み付け・Oversamplingで対策。単一モデルに留め、実装の透明性と推論効率を優先した。",
    learnings:
      "Accuracyに依存しない評価指標の重要性を習得。ベースラインはAccuracy 93%だが少数疾患クラスのRecallは全て0。マルチモーダルモデルでMacro F1が0.24→0.46（+92%）に向上。Effusion Recall 0.00→0.55、Cardiomegaly 0.00→0.33と大幅改善。Accuracyは0.93→0.86に低下したが、医療文脈で重要な「見逃し削減」を優先する設計判断の妥当性を確認した。",
    tags: ["Deep Learning", "PyTorch", "CNN", "Medical AI", "Multimodal"],
    githubUrl: "https://github.com/matsu641/Multimodal-Chest-X-ray-Classification-with-CNN",
    confusionMatrixImages: [
      { path: "/images/Baseline.png", label: "Baseline Model (画像のみ)" },
      { path: "/images/Improved.png", label: "Primary Model (マルチモーダル)" }
    ]
  },
  {
    title: "若手社員離職リスク予測モデル",
    period: "2025/05 - 2025/08",
    what: "クラス不均衡な社員データからLightGBMを用いて離職リスクを予測",
    impact: [
      "クラス不均衡を考慮したRecall重視の閾値最適化により、離職リスクの高い社員を効果的に検出",
      "企業の人事施策への活用提案を含むレポートを作成",
    ],
    mainTech: ["LightGBM", "Python", "scikit-learn", "Feature Engineering"],
    background:
      "松尾研究室GCI 2025 Summerの最終課題（個人プロジェクト）。入社5年以内の若手社員の離職率が高く、人事施策の効果的な介入タイミングの特定が困難という課題があった。過去の社員データから離職リスクを事前に予測する仕組みが必要とされていた。",
    technicalApproach:
      "表形式データに対する高精度と学習速度、特徴量重要度の解釈性を考慮してLightGBMを選択。データ前処理とモデル評価にはPython + scikit-learnの標準ライブラリを活用。クラス不均衡下でRecallを重視した閾値最適化のため、Precision-Recall Curveを用いた評価を実施。解釈性と学習速度を優先し、少量データでも安定した性能を実現した。",
    learnings:
      "特徴量重要度を用いた解釈可能なモデル構築の重要性を実感し、ビジネス課題への機械学習の実践的な適用方法を習得した。",
    tags: ["Machine Learning", "LightGBM", "Python", "Feature Engineering"],
    slidesUrl: "/certificates/gci-final-project-slides.pdf",
    githubUrl: "https://github.com/matsu641/GCI_final_project",
  },
  {
    title: "Interactive Map & Navigation System（GISアプリケーション）",
    period: "2025/01 - 2025/04",
    what: "OpenStreetMapを活用した経路探索最適化GISアプリケーション（3人チーム開発）",
    impact: [
      "全チームで競い合うリーダーボードで上位14位/98チームを獲得",
      "Traveling Courier Problemの最適化で高精度と高速性を実現",
      "地図切替（Toronto ↔ Tokyo）のパフォーマンス要件をクリア",
    ],
    mainTech: ["C++", "A* Algorithm", "Dijkstra", "OpenStreetMap"],
    background:
      "ECE297（Design and Communication）の3人グループのプロジェクト課題。大規模都市データを扱う実用的なGISアプリケーション構築において、単なる地図表示だけでなく、高速な経路探索・UI/UX・パフォーマンス最適化を統合したシステムが求められた。パフォーマンスを他のチームと競い合い、学期末には成果物をプレゼン発表した。",
    technicalApproach:
      "大規模グラフ処理の高速化とメモリ効率の良いデータ構造のためにC++ + STLを採用。ヒューリスティック設計によりA*とDijkstraを用いて最短経路探索を高速化。Traveling Courier Problemに対してはGreedy + 2-optによる初期解生成と局所探索を実装。経路探索において精度と速度のトレードオフが課題だったが、完全な最適解ではなく計算時間と解の品質のバランスを重視し、TAベンチマークで実用的な性能を実現。UI側では情報過多を避けるためシンプルなデザインを採用し、ユーザビリティを優先した。個人では、ズーム機能、経路検索機能、UI/UX改善を担当し、チームでは、経路探索アルゴリズム設計とTraveling Courier Problemの最適化実装を協力して担当した。",
    learnings:
      "Pickup → Delivery制約を満たす合法経路探索を実装し、アルゴリズムの実装力を向上。チーム開発を通じてアルゴリズムとUIが密接に関連することを実感し、計算量とUXのトレードオフを考慮した設計経験を獲得。実世界の道路ネットワークデータを扱う経験を通じて、大規模データ処理とパフォーマンス最適化の重要性を学んだ。",
    tags: ["C++", "Algorithms", "A*", "GIS", "UI/UX", "Linux"],
    videoUrl: "/demos/map_application.mp4",
    slidesUrl: "/images/ECE297_Presentation.pdf",
    leaderboardImageUrl: "/images/ECE297_leaderboard.png",
  },
  {
    title: "Rush Hour（駐車場パズルゲーム）",
    period: "2025/03 - 2025/04",
    what: "C言語でVGA描画・PS/2割り込み処理を実装した組み込みパズルゲーム",
    impact: [
      "CPUlator上で完全動作するパズルゲームを実装",
      "VGA描画、キーボード入力、衝突判定、タイマー、ビープ音機能を実現",
    ],
    mainTech: ["C", "VGA", "PS/2 Interrupt", "Embedded Systems"],
    background:
      "ECE243（Computer Organization）の個人プロジェクト課題。組み込みシステムと低レベルハードウェア制御の実践的な学習が必要だった。VGA描画とPS/2デバイス入力処理をC言語で実装し、動作するゲームを作成することが求められた。",
    technicalApproach:
      "組み込みシステム開発に適した低レベル言語であるC言語を使用し、ハードウェア直接制御を実装。スムーズな2D描画とちらつき防止のためVGA + Double Bufferingを採用。リアルタイムなキーボード入力に対応するため、IRQ line 22からPS/2割り込み処理を実装。複雑なマウス入力の代わりにキーボード操作でプレイできるように設計。シンプルな矩形描画で車を表現し、パフォーマンスと実装速度を優先した。",
    learnings:
      "組み込みシステムの基礎を習得できた。特に、割り込み処理、メモリ管理、リアルタイム処理の実装は難易度は高かったが、より低レベルハードウェア制御について深い理解を得ることができた。また、限られたリソースの中で動作するシステムを設計する経験を通じて、効率的なプログラミングの重要性を学んだ。",
    tags: ["C", "Embedded Systems", "VGA", "Computer Organization", "RISC-V"],
    videoUrl: "/demos/rush-hour-demo.mp4",
    githubUrl: "https://github.com/matsu641/RushHour",
  },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.article
      variants={item}
      className="bg-gradient-to-br from-zinc-800/70 to-zinc-700/50 border-2 border-zinc-600/50 rounded-xl p-8 hover:border-blue-400/60 hover:shadow-lg hover:shadow-blue-400/20 transition-all duration-300"
    >
      {/* Header: Title + Period + GitHub */}
      <div className="mb-6">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex items-center gap-3 flex-1">
            <h3 className="text-2xl font-bold text-white">{project.title}</h3>
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-accent hover:opacity-80 transition-opacity"
                aria-label="GitHub Repository"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">GitHubで見る</span>
              </a>
            )}
          </div>
          <span className="text-sm font-mono text-zinc-300 whitespace-nowrap">{project.period}</span>
        </div>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-mono px-3 py-1 bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded-full hover:bg-blue-500/30 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>


      {/* What */}
      <div className="mb-6">
        <p className="text-lg text-zinc-100 leading-relaxed">{project.what}</p>
      </div>

      {/* Impact */}
      <div className="mb-6">
        <h4 className="text-sm font-mono text-blue-400 mb-3 uppercase tracking-wider font-semibold">
          成果
        </h4>
        <ul className="space-y-2">
          {project.impact.map((item, idx) => (
            <li key={idx} className="flex gap-3 text-zinc-100">
              <span className="text-blue-400 mt-1 flex-shrink-0">•</span>
              <span className="leading-relaxed"><strong>{item}</strong></span>
            </li>
          ))}
        </ul>
      </div>

      {/* Expandable Section */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-blue-400 hover:text-blue-300 hover:underline mb-4 text-sm font-semibold transition-colors"
        aria-expanded={isExpanded}
      >
        {isExpanded ? "閉じる" : "詳細を見る →"}
      </button>

      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="space-y-6 pt-4 border-t border-zinc-700/50"
        >
          {/* Background */}
          <div>
            <h4 className="text-sm font-mono text-blue-400 mb-2 uppercase tracking-wider font-semibold">
              背景
            </h4>
            <p className="text-zinc-100 leading-relaxed">{project.background}</p>
          </div>

          {/* Technical Approach */}
          <div>
            <h4 className="text-sm font-mono text-blue-400 mb-2 uppercase tracking-wider font-semibold">
              技術アプローチと課題点
            </h4>
            <p className="text-zinc-100 leading-relaxed">{project.technicalApproach}</p>
          </div>

          {/* Learnings */}
          <div>
            <h4 className="text-sm font-mono text-blue-400 mb-2 uppercase tracking-wider font-semibold">
              学びと結果
            </h4>
            <p className="text-zinc-100 leading-relaxed">{project.learnings}</p>
          </div>

          {/* Confusion Matrix Images */}
          {project.confusionMatrixImages && project.confusionMatrixImages.length > 0 && (
            <div>
              <h4 className="text-sm font-mono text-blue-400 mb-3 uppercase tracking-wider font-semibold">
                Confusion Matrix
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.confusionMatrixImages.map((img, idx) => (
                  <div key={idx} className="space-y-2">
                    <p className="text-sm font-medium text-zinc-200">{img.label}</p>
                    <div className="w-full h-[400px] flex items-center justify-center bg-zinc-900/30 rounded-lg border border-zinc-700/50 p-4">
                      <img 
                        src={img.path} 
                        alt={img.label}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Leaderboard Image */}
          {project.leaderboardImageUrl && (
            <div>
              <h4 className="text-sm font-mono text-blue-400 mb-3 uppercase tracking-wider font-semibold">
                リーダーボード
              </h4>
              <img 
                src={project.leaderboardImageUrl} 
                alt="Leaderboard Results"
                className="w-full rounded-lg border border-zinc-700/50"
              />
            </div>
          )}

          {/* Project Slides */}
          {project.slidesUrl && (
            <div>
              <h4 className="text-sm font-mono text-blue-400 mb-2 uppercase tracking-wider font-semibold">
                プロジェクト資料
              </h4>
              <a 
                href={project.slidesUrl} 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 hover:underline transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                プロジェクトスライドを見る
              </a>
            </div>
          )}

          {/* Demo Video */}
          {project.videoUrl && (
            <div>
              <h4 className="text-sm font-mono text-blue-400 mb-3 uppercase tracking-wider font-semibold">
                デモンストレーション
              </h4>
              <video 
                controls 
                className="w-full rounded-lg border border-zinc-700/50"
                preload="metadata"
              >
                <source src={project.videoUrl} type="video/mp4" />
                お使いのブラウザは動画タグをサポートしていません。
              </video>
            </div>
          )}
        </motion.div>
      )}
    </motion.article>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-24 md:py-32 px-6 md:px-8">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Projects</h2>
        <p className="text-xl text-zinc-200 mb-16 max-w-2xl">
          個人やグループで行ったプロジェクト
        </p>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-8"
        >
          {projects.map((project, idx) => (
            <ProjectCard key={project.title} project={project} index={idx} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
