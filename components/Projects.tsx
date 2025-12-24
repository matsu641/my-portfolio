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
  overview: string;
  problem: string;
  role: string;
  techStack: { name: string; reason: string }[];
  tradeoffs: string;
  result: string;
  tags: string[];
  videoUrl?: string; // デモビデオのパス（オプション）
  slidesUrl?: string; // プロジェクトスライドのパス（オプション）
  githubUrl?: string; // GitHubリポジトリのURL（オプション）
  leaderboardImageUrl?: string; // リーダーボード画像のパス（オプション）
};

const projects: Project[] = [
  {
    title: "胸部X線画像の疾患分類（マルチモーダルモデル）",
    period: "2025/10 - 2025/12",
    overview: "個人プロジェクト。PyTorch + ResNetを用いた胸部X線画像の4クラス疾患分類。画像特徴量と患者メタデータを統合したマルチモーダルモデルで少数クラスの検出性能を改善。",
    problem: "医療画像診断において、画像データのみでは少数クラス（特定疾患）の検出精度が低く、誤診リスクがあった。患者の年齢・性別などのメタデータを活用した精度向上が課題。",
    role: "データセット構築、CNN実装、マルチモーダルモデル設計、クラス不均衡対策まで担当。",
    techStack: [
      { name: "PyTorch + ResNet", reason: "画像分類タスクで実績のあるアーキテクチャ、転移学習が可能" },
      { name: "マルチモーダル統合", reason: "画像特徴量と患者メタデータを結合し少数クラスの検出性能向上" },
      { name: "クラス重み付け", reason: "極端なクラス不均衡（4クラス）に対応するための損失関数調整" },
    ],
    tradeoffs: "複雑なアンサンブルではなく単一のマルチモーダルモデルを選択。推論速度と実装のシンプルさを優先。少数クラスのRecallを重視し、一部クラスのPrecisionはトレードオフ。",
    result: "画像のみのベースラインと比較して、患者メタデータを統合したマルチモーダルモデルで少数クラス（Effusion, Cardiomegaly）の検出性能が向上。クラス不均衡下での評価手法を習得。",
    tags: ["Deep Learning", "PyTorch", "CNN", "Medical AI", "Multimodal"],
    githubUrl: "https://github.com/matsu641/Multimodal-Chest-X-ray-Classification-with-CNN",
  },
  {
    title: "若手社員離職リスク予測モデル",
    period: "2025/05 - 2025/08",
    overview: "松尾研究室GCI 2025 Summerの最終課題。クラス不均衡な社員データからLightGBMを用いて離職リスクを予測し、人事施策への活用を提案。",
    problem: "入社5年以内の若手社員の離職率が高く、人事施策の効果的な介入タイミングの特定が困難。過去の社員データから離職リスクを事前に予測する仕組みが必要とされていた。",
    role: "データ前処理、特徴量設計、モデル構築から評価・最適化。",
    techStack: [
      { name: "LightGBM", reason: "表形式データに対する高精度と学習速度、特徴量重要度の解釈性" },
      { name: "Python + scikit-learn", reason: "データ前処理とモデル評価の標準ライブラリ" },
      { name: "Precision-Recall Curve", reason: "クラス不均衡下でRecallを重視した閾値最適化が必要" },
    ],
    tradeoffs: "ディープラーニングではなくLightGBMを選択。解釈性と学習速度を優先し、少量データでも安定した性能を実現。Recall重視の閾値設定により一部の誤検知は許容。",
    result: "クラス不均衡を考慮したRecall重視の閾値最適化により、離職リスクの高い社員を効果的に検出。企業の人事施策への活用提案を含むレポートを作成。",
    tags: ["Machine Learning", "LightGBM", "Python", "Feature Engineering"],
    slidesUrl: "/certificates/gci-final-project-slides.pdf",
    githubUrl: "https://github.com/matsu641/GCI_final_project",
  },
  {
    title: "Interactive Map & Navigation System（GISアプリケーション）",
    period: "2025/01 - 2025/04",
    overview: "ECE297（Design and Communication）の3人グループのプロジェクト課題。OpenStreetMapを活用し、様々なアルゴリズムを用い経路探索を最適化・多機能UIを実装したGISアプリケーションを構築し、学年末に制作物のプレゼン発表を行った。",
    problem: "大規模都市データを扱う実用的なGISアプリケーション構築において、単なる地図表示だけでなく、高速な経路探索・UI/UX・パフォーマンス最適化を統合したシステムが求められた。特に、都市間の地図切替（Toronto ↔ Tokyo）を制限時間内に完了し、複雑な制約条件下での最適経路探索が課題だった。",
    role: "ズーム機能、経路検索機能、UI改善を一人で担当。経路探索アルゴリズム設計（Dijkstra / A*）とTraveling Courier Problemの最適化実装はチーム全員で協力して開発。",
    techStack: [
      { name: "C++ + STL", reason: "大規模グラフ処理の高速化、メモリ効率の良いデータ構造" },
      { name: "A* + Dijkstra", reason: "ヒューリスティック設計により最短経路探索を高速化" },
      { name: "Greedy + 2-opt", reason: "Traveling Courier Problemの初期解生成と局所探索による最適化" },
      { name: "OpenStreetMap (OSM) データ", reason: "実世界の道路ネットワークと多言語表記に対応" },
    ],
    tradeoffs: "完全な最適解ではなくGreedy + 局所探索を採用。計算時間と解の品質のバランスを重視し、TAベンチマークで実用的な性能を実現。UI側では情報過多を避けるためシンプルなものを採用し、ユーザビリティを優先。",
    result: "全チームで競い合うリーダーボードで上位14位を獲得。200以上のチームの中で高い精度と速度を実現し、Traveling Courier Problemの最適化で優れた性能を示した。Pickup → Delivery制約を満たす合法経路探索を実装し、地図切替のパフォーマンス要件をクリア。チーム開発を通じてアルゴリズムとUIが密接に関連することを実感し、計算量とUXのトレードオフを考慮した設計経験を獲得。",
    tags: ["C++", "Algorithms", "A*", "GIS", "UI/UX", "Linux"],
    videoUrl: "/demos/map_application.mp4",
    slidesUrl: "/images/ECE297_Presentation.pdf",
    leaderboardImageUrl: "/images/ECE297_leaderboard.png",
  },
  {
    title: "Rush Hour（駐車場パズルゲーム）",
    period: "2025/03 - 2025/04",
    overview: "ECE243（Computer Organization）の個人プロジェクト課題。C言語でVGA描画・PS/2割り込み処理・ゲームロジックを実装し、CPUlator上で動作する組み込みパズルゲームを開発。",
    problem: "組み込みシステムと低レベルハードウェア制御の実践的な学習が必要だった。VGA描画とPS/2デバイス入力処理をC言語で実装し、動作するゲームを作成することが求められた。",
    role: "VGA出力によるグラフィック描画、PS/2キーボード割り込み処理、ゲームロジック、衝突判定、タイマー機能まで全て実装。CPUlator上でDE1-SoCボードをシミュレート。",
    techStack: [
      { name: "C言語", reason: "組み込みシステム開発に適した低レベル言語、ハードウェア直接制御が可能" },
      { name: "VGA + Double Buffering", reason: "スムーズな2D描画とちらつき防止のため二重バッファリングを採用" },
      { name: "PS/2割り込み処理", reason: "リアルタイムなキーボード入力に対応するためIRQ line 22から割り込み処理" },
    ],
    tradeoffs: "複雑なアニメーションやマウス入力は後回しにし、基本的なゲームロジックと描画に注力。シンプルな矩形描画で車を表現し、パフォーマンスと実装速度を優先。",
    result: "CPUlator上で完全動作するパズルゲームを実装。VGA描画、キーボード入力、衝突判定、HEXディスプレイタイマー、ビープ音機能を実現。課題として提出し、組み込みシステムの基礎を習得。",
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
      className="bg-gradient-to-br from-zinc-900/50 to-zinc-800/30 border-2 border-zinc-700/50 rounded-xl p-8 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300"
    >
      {/* Title and Tags */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-3">
          <h3 className="text-2xl font-bold text-white">{project.title}</h3>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:opacity-80 transition-opacity"
              aria-label="GitHub Repository"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </a>
          )}
        </div>
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

      {/* Period */}
      <div className="mb-6">
        <h4 className="text-sm font-mono text-blue-400 mb-2 uppercase tracking-wider font-semibold">
          期間
        </h4>
        <p className="text-gray-300 leading-relaxed">{project.period}</p>
      </div>

      {/* Overview */}
      <div className="mb-6">
        <h4 className="text-sm font-mono text-blue-400 mb-2 uppercase tracking-wider font-semibold">
          概要
        </h4>
        <p className="text-gray-300 leading-relaxed">{project.overview}</p>
      </div>

      {/* Problem */}
      <div className="mb-6">
        <h4 className="text-sm font-mono text-blue-400 mb-2 uppercase tracking-wider font-semibold">
          課題
        </h4>
        <p className="text-gray-300 leading-relaxed">{project.problem}</p>
      </div>

      {/* Role */}
      <div className="mb-6">
        <h4 className="text-sm font-mono text-blue-400 mb-2 uppercase tracking-wider font-semibold">
          担当役割
        </h4>
        <p className="text-gray-300 leading-relaxed">{project.role}</p>
      </div>

      {/* Expandable Section */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-blue-400 hover:text-blue-300 hover:underline mb-4 text-sm font-semibold transition-colors"
        aria-expanded={isExpanded}
      >
        {isExpanded ? "閉じる" : "技術詳細を見る →"}
      </button>

      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="space-y-6 pt-4 border-t border-zinc-700/50"
        >
          {/* Tech Stack */}
          <div>
            <h4 className="text-sm font-mono text-blue-400 mb-3 uppercase tracking-wider font-semibold">
              用いた技術
            </h4>
            <ul className="space-y-3">
              {project.techStack.map((tech) => (
                <li key={tech.name} className="text-gray-300">
                  <span className="font-semibold text-white">{tech.name}:</span>{" "}
                  {tech.reason}
                </li>
              ))}
            </ul>
          </div>

          {/* Trade-offs */}
          <div>
            <h4 className="text-sm font-mono text-blue-400 mb-2 uppercase tracking-wider font-semibold">
              トレードオフ
            </h4>
            <p className="text-gray-300 leading-relaxed">{project.tradeoffs}</p>
          </div>

          {/* Result */}
          <div>
            <h4 className="text-sm font-mono text-blue-400 mb-2 uppercase tracking-wider font-semibold">
              結果とインパクト
            </h4>
            <p className="text-gray-300 leading-relaxed">{project.result}</p>
          </div>

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
        <p className="text-xl text-muted mb-16 max-w-2xl">
          技術的な意思決定とインパクトを示すプロジェクト
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
