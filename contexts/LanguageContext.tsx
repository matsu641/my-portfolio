"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'ja' | 'en';

type TranslationGetter = {
  (key: string): string;
  <T>(key: string): T;
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationGetter;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (<T,>(key: string): T => {
    const keys = key.split('.');
    let value: unknown = translations[language];
    
    for (const k of keys) {
      value =
        value && typeof value === 'object'
          ? (value as Record<string, unknown>)[k]
          : undefined;
    }
    
    return value as T;
  }) as TranslationGetter;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}

// 翻訳データ
const translations = {
  ja: {
    hero: {
      greeting: "はじめまして、",
      name: "松戸美純です！",
      title: "I design systems,",
      subtitle: "not just interfaces.",
      description: "I turn technical ideas into practical AI and software products.",
      cta: "View Projects"
    },
    about: {
      title: "About Me",
      intro: [
        "トロント大学でComputer Engineeringを専攻し、AIを副専攻として学びながら、ソフトウェア開発とAIを活用したプロダクト開発に注力しています。インターン、大学プロジェクト、サークル活動を通じて、フルスタック開発、機械学習、実運用を意識したWebアプリ開発を経験してきました。ソフトウェアエンジニアインターンでは、実装だけでなく、要件整理やタスク管理を含む機能開発の主導も経験しています。将来的には、AIや技術的なアイデアを、実際のユーザー課題を解決する信頼性の高いプロダクトに落とし込めるソフトウェアエンジニアを目指しています。"
      ],
      education: {
        title: "学歴",
        uoft: {
          name: "University of Toronto / トロント大学",
          period: "2023年8月 - 2028年5月（予定）",
          major: "専攻：Bachelor of Applied Science in Computer Engineering / コンピュータ工学",
          minor: "副専攻：Artificial Intelligence / 人工知能"
        }
      },
      experience: {
        title: "職歴",
        starup: {
          role: "ソフトウェアエンジニアインターン",
          company: "株式会社 STAR UP",
          period: "2025年5月 - 2026年2月",
          location: "京都、日本（リモート）",
          tags: ["React/Next.js", "TypeScript", "FastAPI", "Project Management"],
          tasks: [
            "製造業向けSaaSの機能開発を主導し、要件整理・タスク分解・実装まで担当。入社3ヶ月で昇給を受けるなど、早期に成果を評価されました。"
          ]
        },
        equos: {
          role: "AIエンジニアインターン",
          company: "株式会社 EQUES",
          period: "2026年2月 - 現在",
          location: "東京、日本（リモート）",
          tags: ["LLM", "RAG", "Document Review", "Python", "AI Research"],
          projects: [
            {
              title: "QAI Generator（製薬AI事業）",
              period: "2026年5月 - 現在",
              tasks: [
                "製薬QA文書生成において、RAGなどを用いて手順書を参照しながらLLM出力の精度と根拠性を高める方法を調査・検証しました。"
              ]
            },
            {
              title: "製薬スケジュール最適化アルゴリズム開発",
              period: "2026年2月 - 2026年3月",
              tasks: [
                "Pythonで製薬スケジュール最適化アルゴリズムを開発し、複数制約を考慮した生産計画の自動生成に取り組みました。"
              ]
            }
          ]
        },
        freelance: {
          role: "ソフトウェアエンジニア（フリーランス）",
          company: "くわばら整形外科クリニック",
          period: "2024年5月 - 2024年7月",
          location: "リモート",
          tags: ["HTML", "CSS", "JavaScript", "SEO", "Client Work"],
          tasks: [
            "整形外科クリニックの公式Webサイトをゼロから制作し、要件整理から実装、SEO、公開後の追加対応まで一貫して担当しました。"
          ]
        },
      },
      activities: {
        title: "Team Experience",
        utjn: {
          role: "ソフトウェアエンジニア（チームメンバー）",
          organization: "University of Toronto Japan Network (UTJN)",
          period: "2023年9月 - 現在",
          tags: ["TypeScript", "PostgreSQL", "AWS", "Caddy", "Software Deployment"],
          tasks: [
            "チームメンバーと協力して組織公式Webサイトの開発・運用を担当し、他部門からの新機能開発依頼やバグ修正依頼に対応しました。",
            "Docker ComposeとCaddyリバースプロキシを用いて、単一のAWS EC2インスタンス上に2つの本番Webサイトをデプロイし、DNS、TLS、環境変数、マルチコンテナ構成のリソース制約を設定しました。"
          ],
          websites: [
            {
              title: "University of Toronto Japan Network",
              url: "https://uoftjn.com/",
              image: "/images/utjn-tumbnail.png"
            },
            {
              title: "University of Toronto Japan Alumni Association",
              url: "https://uoftkaedekai.com/",
              image: "/images/kaedekai-tumbnail.png"
            }
          ]
        }
      },
      certifications: {
        title: "修了コース",
        items: [
          {
            name: "グローバル消費インテリジェンス寄附講座 2025 Summer",
            issuer: "松尾研究室（東京大学）",
            date: "修了：2025年8月",
            description: [
              "データ駆動型アプローチを用いてグローバル消費者行動を分析する手法を学習",
              "最終プロジェクトでは、AI技術と市場ビジネスの視点を組み合わせた実践的なアプローチを取得",
            ],
            tags: ["ML", "Data Analysis", "Business Proposal"],
            link: "/certificates/gci-certificate.pdf"
          },
          {
            name: "Deep Learning 基礎講座 2025 Spring",
            issuer: "松尾研究室（東京大学）",
            date: "修了：2025年7月",
            description: [
              "ニューラルネットワーク、畳み込み、及び深層強化学習など、深層学習の基礎的な概念を学習",
              "演習を通じて深層学習モデルの実装経験を習得"
            ],
            tags: ["DL", "Neural Networks", "PyTorch"],
            link: "/certificates/dl-foundations-certificate.pdf"
          }
        ]
      }
    },
    skills: {
      title: "Skill",
      categories: {
        frontend: "Front-end",
        backend: "Back-end",
        ai: "AI / ML",
        devops: "Other"
      }
    },
    projects: {
      title: "Projects",
      background: "背景",
      challenges: "課題",
      solutions: "解決アプローチ",
      learnings: "学びと結果",
      viewDemo: "デモ動画",
      demoImage: "アプリ画面",
      Slides: "スライドを見る",
      slidesTitle: "スライド",
      viewSlides: "スライドを見る",
      viewGithub: "GitHubで見る",
      viewLeaderboard: "リーダーボード",
      items: [
        // {
        //   title: "からだ日記（ヘルスケア記録アプリ）",
        //   period: "2025/09 - 現在",
        //   what: "慢性関節疾患向けの症状・服薬・リハビリ・気圧データを統合管理するモバイルアプリ（個人開発）",
        //   impact: [
        //     "症状・服薬・運動の3系統データを統合表示する日付ベース集約ロジックを設計",
        //     "異なる痛みスケール（0–10 / 0–3）を統合する共通アルゴリズムを実装",
        //     "Firestore + AsyncStorage のハイブリッド構成でパフォーマンスとコストを両立",
        //     "トレンド分析画面においてデータ取得最適化とMap構造による高速参照を実現",
        //   ],
        //   tags: ["React Native", "TypeScript", "Firebase", "Firestore", "AsyncStorage", "UI/UX", "Data Aggregation", "Mobile"],
        //   background: "家族がリウマチを患っており、日々の体調変化を記録・可視化できるツールの必要性を感じたことがきっかけ。既存の健康管理アプリは汎用的で、関節ごとの痛み・腫れ・しびれの記録や、気圧変化との相関を追える専門的な機能が不足していた。『毎日の記録を簡単に続けられ、長期的な変化を把握できるアプリ』を目指して開発を開始した。",
        //   challenges: "数値入力中心のUIでは記録継続が困難。症状ログ（0–10）と詳細関節ログ（0–3）のスケール不一致。症状・服薬・運動が独立データ構造であり、画面間同期が複雑。詳細症状データをクラウド保存するとコスト増大。トレンド画面で期間変更ごとに大量再計算が発生。相関表示が医学的因果と誤認される可能性。",
        //   solutions: [
        //     "タップ中心UI設計：関節マップ入力 + 0–3段階プリセットスケールを採用し、入力時間を最小化",
        //     "スケール統合ロジック設計：詳細ログ優先 + 最大関節痛を代表値とする共通計算アルゴリズムを設計し、Home・Calendar・Trend画面で統一",
        //     "日付ベース集約構造の導入：useCalendarRecordsカスタムフックを作成し、90日分データを一括取得後Map構造へ変換（O(1)参照）",
        //     "クラウド×ローカルの分離設計：詳細症状はAsyncStorage、集約値はFirestoreへ保存するハイブリッド構成",
        //     "パフォーマンス最適化：期間前データの事前取得、グラフ用データのサンプリング処理、不要再フェッチ回避",
        //     "表現設計の安全化：因果断定を避け『傾向表示』に限定、相関係数は内部実装に留める"
        //   ],
        //   learnings: "Firebaseをバックエンドとしたモバイルアプリのフルスタック設計・実装を一人で行いテストデプロイまで完了。Firestoreのコスト構造を考慮し、ローカルとクラウドを分離したハイブリッド設計を採用。Repositoryパターンによるサービス層分離で保守性を確保し、TypeScriptで型安全な設計を構築した。医療ドメインのUI設計を通して、入力負荷を下げるUX設計の重要性を学んだ。",
        //   demoImageUrl: "/images/KaradaNote.png",
        //   slideUrl: "/images/からだノート.pdf",
        //   githubUrl: "https://github.com/matsu641/karada-diary"
        // },
        {
          title: "胸部X線画像の疾患分類（マルチモーダル深層学習）",
          period: "2025/10 - 2025/12",
          tags: ["PyTorch", "ResNet-50", "Multimodal Learning", "Focal Loss"],
          background: "胸部X線画像と年齢・性別・撮影方向などの患者メタデータを組み合わせ、PyTorchで4クラス分類モデルを構築しました。",
          challenges: "データの約93%が「No Finding」に偏っていたため、AccuracyではなくMacro F1とクラス別Recallを重視して評価しました。",
          solutions: [
            "ResNet-50、Focal Loss、クラス重み付け、Oversamplingを使用",
            "画像特徴量と患者メタデータを統合し、少数クラス検出を改善"
          ],
          learnings: "Macro F1を0.24から0.46に改善し、EffusionとCardiomegalyのRecallも大きく改善しました。",
          confusionMatrixImages: ["/images/Baseline.png", "/images/Improved.png"],
          confusionMatrixLabels: [
            "Baseline Model (画像のみ)",
            "Primary Model (マルチモーダル)"
          ],
          githubUrl: "https://github.com/matsu641/Multimodal-Chest-X-ray-Classification-with-CNN"
        },
        {
          title: "若手社員離職リスク予測モデル",
          period: "2025/08",
          tags: ["LightGBM", "Python", "scikit-learn", "Feature Engineering"],
          background: "書類審査制の松尾研究室GCI 2025 Summerに選抜され、企業提供の社員データを用いた最終課題に取り組みました。",
          challenges: "単に予測モデルを構築するだけでなく、データ分析からビジネス上の課題を特定し、人事施策として活用できる提案に落とし込むことが求められました。",
          solutions: [
            "NumPy、Pandas、可視化ツールを用いて探索的データ分析を実施し、離職に関係する傾向を特定",
            "そのうえで、LightGBMを用いた勾配ブースティング分類モデルを構築し、離職リスクの高い社員を見逃さないようRecallを重視して閾値を調整"
          ],
          learnings: "分析結果、モデルの予測結果、改善施策をビジネス提案スライドとして整理し、データ分析からAIモデル実装、ビジネス提案まで一貫して実施しました。最終的に修了要件を満たし、修了率約14%の同講座を修了しました。",
          slideUrl: "/certificates/gci-final-project-slides.pdf",
          githubUrl: "https://github.com/matsu641/GCI_final_project"
        },
        {
          title: "Interactive Map & Navigation System（GISアプリケーション）",
          period: "2025/01 - 2025/04",
          tags: ["C++", "Algorithms", "A*", "GIS", "UI/UX", "Linux"],
          background: "ECE297の3人チームプロジェクトとして、OpenStreetMapのデータを用いたC++製GISアプリケーションを開発しました。",
          challenges: "大規模な道路ネットワークデータを扱いながら、地図表示、経路探索、配送経路最適化を実装しました。",
          solutions: [
            "A*ベースの最短経路探索を実装",
            "Greedyによる初期解生成と2-opt局所探索で、経路品質と実行時間のバランスを調整"
          ],
          learnings: "経路探索機能と地図UI/UXの改善を担当し、授業内リーダーボードで98チーム中14位を獲得しました。",
          leaderboardImageUrl: "/images/ECE297_leaderboard.png",
          slideUrl: "/images/ECE297_Presentation.pdf",
          videoUrl: "/demos/map_application.mp4"
        },
        {
          title: "Rush Hour（駐車場パズルゲーム）",
          period: "2025/03 - 2025/04",
          tags: ["C", "VGA", "PS/2 Interrupt", "Embedded Systems","RISC-V"],
          background: "ECE243の個人プロジェクトとして、CPUlator上で動作するRush Hour形式のパズルゲームをC言語で実装しました。",
          challenges: "VGA描画とPS/2キーボード入力を直接扱い、限られた組み込み環境の中でリアルタイムに動作するゲームを作成しました。",
          solutions: [
            "Double Bufferingを用いて画面のちらつきを軽減",
            "PS/2キーボード入力を割り込み処理で扱い、メモリマップドI/Oを実践"
          ],
          learnings: "VGA描画、割り込み処理、メモリマップドI/Oなど、低レベルなハードウェア制御を実践しました。",
          videoUrl: "/demos/rush-hour-demo.mp4",
          githubUrl: "https://github.com/matsu641/RushHour"
        },
        {
          title: "クリニック在庫管理システム（くわばら整形外科クリニック）",
          period: "2026/06",
          tags: ["Electron", "React", "TypeScript", "Vite", "pdf-lib", "Tailwind CSS", "GitHub Actions"],
          background: "くわばら整形外科クリニック向けに、物品・検査用品・日用品・松葉杖の在庫をオフラインで管理できるWindowsデスクトップアプリを開発しました。",
          challenges: "院内PCではWi-Fiやクラウドサービスを前提にしづらく、既存の紙・PDF注文票や外付けSSDバックアップの運用も残しながら、在庫不足と発注漏れを防ぐ必要がありました。",
          solutions: [
            "Electron / React / TypeScriptで端末単体で動作するアプリを構築し、商品マスタ、入出庫、アラート、発注管理、注文履歴を一体化",
            "既存のGoods / Ciメディカル用PDF注文票に商品コード・商品名・数量を座標指定で出力し、現場の発注フローを大きく変えずに効率化",
            "在庫データ、注文履歴、設定情報をJSONとして外付けSSDなど任意フォルダにバックアップできる仕組みを実装"
          ],
          learnings: "現場の制約に合わせたオフラインファースト設計、既存帳票を活かしたPDF出力、Windows x64向け配布とGitHub Actionsによるビルド検証までを一通り設計・実装しました。",
          demoImageUrl: "/images/clinic-inventory-demo.png",
          githubUrl: "https://github.com/matsu641/Clinic-Inventory-Management-System"
        },
        {
          title: "クリニックウェブサイト（くわばら整形外科クリニック）",
          period: "2024年5月 - 2024年7月",
          tags: ["HTML", "CSS", "JavaScript", "Responsive Design", "SEO", "Freelance"],
          background: "フリーランス案件として、整形外科クリニックの公式Webサイトを設計・開発・公開しました。",
          challenges: "要件整理、サイト構成、実装、SEO、公開、公開後の追加対応まで一貫して担当しました。",
          solutions: [
            "HTML、CSS、JavaScriptでレスポンシブサイトを実装",
            "基本的なSEO対策と、QRコードからアクセスできる専用情報ページを追加"
          ],
          learnings: "公開後3ヶ月で2,856インプレッション、343クリック、CTR 12%を達成しました。",
          websiteUrl: "https://kuwabara-ortho.jp",
          searchConsoleImageUrl: "/images/clinic_search_console.png",
          thumbnailImageUrl: "/images/clinic-tumbnail.png",
          githubUrl: "https://github.com/matsu641/clinic-website"
        }
      ]
    },
    contact: {
      title: "Contact",
      email: "Email",
      linkedin: "LinkedIn",
      github: "GitHub",
      footer: "© 2025 松戸美純 (Misumi Matsudo)",
      footerNote: "Next.js + Three.js + GSAP + Framer Motion で作成"
    }
  },
  en: {
    hero: {
      greeting: "Hi, I'm ",
      name: "Misumi Matsudo",
      title: "CE student at UofT,",
      subtitle: "building AI and full-stack systems.",
      description: "I turn technical ideas into practical AI and software products.",
      cta: "View Projects"
    },
    about: {
      title: "About Me",
      intro: [
        "I am a Computer Engineering student at the University of Toronto, pursuing an AI minor and focusing on software engineering and AI-driven product development. Through internships, university projects, and student organization work, I have built experience in full-stack development, machine learning, and production web applications. As a software engineering intern, I have also led feature development, working across implementation, requirement clarification, and task coordination. I aim to become a software engineer who can turn AI and technical ideas into reliable products that solve real user problems."
      ],
      education: {
        title: "Education",
        uoft: {
          name: "University of Toronto",
          period: "Aug 2023 - May 2028 (Expected)",
          major: "Major: Bachelor of Applied Science in Computer Engineering",
          minor: "Minor: Artificial Intelligence"
        }
      },
      experience: {
        title: "Work Experience",
        starup: {
          role: "Software Engineer Intern (Feature Lead)",
          company: "STAR UP, Inc.",
          period: "May 2025 - Feb 2026",
          location: "Kyoto, Japan (Remote)",
          tags: ["React", "Next.js", "TypeScript", "FastAPI", "Project Management"],
          tasks: [
            "Led feature development for a manufacturing SaaS platform, covering requirement clarification, task breakdown, and implementation; earned a raise within three months of joining."
          ]
        },
        equos: {
          role: "AI Engineer Intern (Member)",
          company: "EQUES, Inc.",
          period: "Feb 2026 - Present",
          location: "Tokyo, Japan (Remote)",
          tags: ["LLM", "RAG", "Document Review", "Python", "AI Research"],
          // projects: [
          //   {
          //     title: "QAI Generator (Pharmaceutical AI)",
          //     period: "May 2026 - Present",
          //     tasks: [
          //       "Researched and validated ways to improve LLM-generated pharmaceutical QA documents by referencing SOPs and internal documents through methods such as RAG."
          //     ]
          //   },
          //   {
          //     title: "Pharmaceutical Schedule Optimization Algorithm",
          //     period: "Feb 2026 - Mar 2026",
          //     tasks: [
          //       "Developed a Python-based pharmaceutical schedule optimization algorithm that generated production plans under multiple operational constraints."
          //     ]
          //   }
          // ]
          tasks: [
            "Researched and validated ways to improve LLM-generated pharmaceutical QA documents by referencing SOPs and internal documents through methods such as RAG."
          ]
        },
        freelance: {
          role: "Software Engineer (Freelance)",
          company: "Kuwabara Orthopedic Clinic",
          period: "May 2024 - Jul 2024",
          location: "Hybrid",
          tags: ["HTML", "CSS", "JavaScript", "SEO", "Client Work"],
          tasks: [
            "Built the clinic's official website from scratch, owning the full process from requirements and implementation to SEO, launch, and post-launch updates."
          ]
        },
      },
      activities: {
        title: "Team Experience",
        utjn: {
          role: "Software Engineer (Team Member)",
          organization: "University of Toronto Japan Network (UTJN)",
          period: "Sep 2023 - Present",
          tags: ["TypeScript", "PostgreSQL", "AWS", "Caddy", "Software Deployment"],
          tasks: [
            "Collaborated with team members on the development and operation of the organization's official website, handling new feature requests and bug fixes from other departments.",
            "Deployed two production websites on a single AWS EC2 instance using Docker Compose and Caddy reverse proxy, configuring DNS, TLS, environment variables, and resource constraints for a multi-container stack."
          ],
          websites: [
            {
              title: "University of Toronto Japan Network",
              url: "https://uoftjn.com/",
              image: "/images/utjn-tumbnail.png"
            },
            {
              title: "University of Toronto Japan Alumni Association",
              url: "https://uoftkaedekai.com/",
              image: "/images/kaedekai-tumbnail.png"
            }
          ]
        }
      },
      certifications: {
        title: "Certifications",
        items: [
          {
            name: "Global Consumer Intelligence Program 2025 Summer",
            issuer: "Matsuo Lab (The University of Tokyo)",
            date: "Completed: Aug 2025",
            description: [
              "Learned methods to analyze global consumer behavior using data-driven approaches",
              "In the final project, learned practical approaches combining AI techniques with market business perspectives"
            ],
            tags: ["ML", "Data Analysis", "Business Proposal"],
            link: "/certificates/gci-certificate.pdf"
          },
          {
            name: "Deep Learning Foundations Course 2025 Spring",
            issuer: "Matsuo Lab (The University of Tokyo)",
            date: "Completed: Jul 2025",
            description: [
              "Learned fundamental concepts of deep learning including neural networks, convolution, and deep reinforcement learning",
              "Gained hands-on experience implementing deep learning models through practical exercises"
            ],
            tags: ["DL", "Neural Networks", "PyTorch"],
            link: "/certificates/dl-foundations-certificate.pdf"
          }
        ]
      }
    },
    skills: {
      title: "Skills",
      categories: {
        frontend: "Front-end",
        backend: "Back-end",
        ai: "AI / ML",
        devops: "Other"
      }
    },
    projects: {
      title: "Projects",
      background: "Background",
      challenges: "Challenges",
      solutions: "Solutions",
      learnings: "Learnings & Results",
      viewDemo: "Demo",
      demoImage: "App Screenshots",
      slidesTitle: "Project Slides",
      viewSlides: "View Slides",
      viewGithub: "View GitHub",
      viewLeaderboard: "Leaderboard",
      items: [
        // {
        //   title: "Karada Diary (Healthcare Tracking App)",
        //   period: "Sep 2025 - Present",
        //   what: "A mobile app for integrated management of symptoms, medications, rehabilitation, and barometric pressure data for chronic joint diseases (personal development)",
        //   impact: [
        //     "Designed date-based aggregation logic integrating three data systems: symptoms, medications, and exercise",
        //     "Implemented a unified algorithm integrating different pain scales (0–10 / 0–3)",
        //     "Achieved balance between performance and cost with Firestore + AsyncStorage hybrid architecture",
        //     "Realized optimized data retrieval and high-speed reference using Map structure in trend analysis screen",
        //   ],
        //   tags: ["React Native", "TypeScript", "Firebase", "Firestore", "AsyncStorage", "UI/UX", "Data Aggregation", "Mobile"],
        //   background: "Motivated by a family member suffering from rheumatoid arthritis, I felt the need for a tool to record and visualize daily health changes. Existing health management apps were generic and lacked specialized features for recording pain, swelling, and numbness by joint, or tracking correlations with barometric pressure changes. I started development aiming to create 'an app that makes daily recording easy to continue and enables long-term change tracking.'",
        //   challenges: "UI centered on numerical input made continuous recording difficult. Scale mismatch between symptom logs (0–10) and detailed joint logs (0–3). Symptoms, medications, and exercise had independent data structures, making cross-screen synchronization complex. Cloud storage of detailed symptom data increased costs. Massive recalculations occurred with each period change on the trend screen. Correlation displays risked misinterpretation as medical causation.",
        //   solutions: [
        //     "Tap-centric UI design: Adopted joint map input + 0–3 level preset scale to minimize input time",
        //     "Scale integration logic design: Designed a unified calculation algorithm prioritizing detailed logs + using maximum joint pain as representative value, unified across Home, Calendar, and Trend screens",
        //     "Introduction of date-based aggregation structure: Created useCalendarRecords custom hook to batch-fetch 90 days of data and convert to Map structure (O(1) reference)",
        //     "Cloud × Local separation design: Hybrid architecture storing detailed symptoms in AsyncStorage and aggregate values in Firestore",
        //     "Performance optimization: Pre-fetching previous period data, sampling processing for graph data, avoiding unnecessary re-fetches",
        //     "Safety-focused presentation design: Limited to 'trend display' avoiding causal statements, keeping correlation coefficients internal"
        //   ],
        //   learnings: "Completed full-stack design and implementation of a mobile app with Firebase as backend through test deployment by myself. Adopted hybrid design separating local and cloud considering Firestore cost structure. Ensured maintainability through service layer separation using Repository pattern and built type-safe design with TypeScript. Learned the importance of UX design that reduces input burden through medical domain UI design.",
        //   demoImageUrl: "/images/KaradaNote.png",
        //   slideUrl: "/images/からだノート.pdf",
        //   githubUrl: "https://github.com/matsu641/karada-diary"
        // },
        {
          title: "Chest X-ray Disease Classification (Multimodal Deep Learning)",
          period: "Oct 2025 - Dec 2025",
          tags: ["PyTorch", "ResNet-50", "Multimodal Learning", "Focal Loss"],
          background: "Built a PyTorch-based multimodal model for 4-class chest X-ray classification by combining image features with patient metadata such as age, sex, and view position.",
          challenges: "The dataset was highly imbalanced, with approximately 93% of samples labeled “No Finding,” so I focused on Macro F1 and class-specific Recall rather than Accuracy.",
          solutions: [
            "Used ResNet-50, focal loss, class weighting, and oversampling",
            "Fused patient metadata with image features to improve minority-class detection"
          ],
          learnings: "Improved Macro F1 from 0.24 to 0.46, Effusion Recall from 0.00 to 0.55, and Cardiomegaly Recall from 0.00 to 0.33.",
          confusionMatrixImages: ["/images/Baseline.png", "/images/Improved.png"],
          confusionMatrixLabels: [
            "Baseline Model (Image Only)",
            "Primary Model (Multimodal)"
          ],
          githubUrl: "https://github.com/matsu641/Multimodal-Chest-X-ray-Classification-with-CNN"
        },
        {
          title: "Employee Attrition Risk Analysis & Business Proposal",
          period: "Aug 2025",
          tags: ["LightGBM", "Python", "scikit-learn", "Feature Engineering"],
          background: "Selected for Matsuo Lab’s application-based GCI 2025 Summer program and worked on a final project using a company-provided employee dataset.",
          challenges: "The project required more than building a prediction model; I needed to identify business issues from the data and translate the findings into actionable HR recommendations.",
          solutions: [
            "Used NumPy, Pandas, and visualization tools for exploratory data analysis,and identified patterns related to attrition",
            "Built a LightGBM-based gradient boosting classifier to predict high-risk employees, adjusting thresholds to prioritize Recall and minimize false negatives"
          ],
          learnings: "Summarized the analysis, model results, and proposed countermeasures into a business proposal slide deck, completing the full process from data analysis to AI model implementation and business solution design. I met the completion requirements and completed the program, which had an approximately 14% completion rate.",
          slideUrl: "/certificates/gci-final-project-slides.pdf",
          githubUrl: "https://github.com/matsu641/GCI_final_project"
        },
        {
          title: "Interactive Map & Navigation System (GIS Application)",
          period: "Jan 2025 - Apr 2025",
          tags: ["C++", "Algorithms", "A*", "GIS", "UI/UX", "Linux"],
          background: "Developed a C++ GIS application using OpenStreetMap data in a 3-person team project for ECE297.",
          challenges: "The application supported map visualization, route search, and delivery route optimization while handling large-scale road network data efficiently.",
          solutions: [
            "Used A*-based shortest-path search for route search features",
            "Used greedy initialization and 2-opt local search to balance route quality and runtime performance"
          ],
          learnings: "Implemented route search features and improved map UI/UX, contributing to a 14th-place ranking out of 98 teams.",
          leaderboardImageUrl: "/images/ECE297_leaderboard.png",
          slideUrl: "/images/ECE297_Presentation.pdf",
          videoUrl: "/demos/map_application.mp4"
        },
        {
          title: "Rush Hour (Parking Puzzle Game)",
          period: "Mar 2025 - Apr 2025",
          tags: ["C", "VGA", "PS/2 Interrupt", "Embedded Systems","RISC-V"],
          background: "Implemented a Rush Hour-style puzzle game in C on CPUlator for ECE243.",
          challenges: "The project involved direct control of VGA graphics and PS/2 keyboard input, requiring real-time interaction under limited embedded-system resources.",
          solutions: [
            "Used double buffering to reduce screen flickering",
            "Handled PS/2 keyboard input through interrupts and practiced memory-mapped I/O"
          ],
          learnings: "Practiced low-level hardware control through VGA rendering, interrupts, and memory-mapped I/O.",
          videoUrl: "/demos/rush-hour-demo.mp4",
          githubUrl: "https://github.com/matsu641/RushHour"
        },
        {
          title: "Clinic Inventory Management System (Kuwabara Orthopedic Clinic)",
          period: "Jun 2026",
          tags: ["Electron", "React", "TypeScript", "Vite", "pdf-lib", "Tailwind CSS", "GitHub Actions"],
          background: "Built a Windows desktop app for Kuwabara Orthopedic Clinic to manage supplies, examination items, daily-use goods, and crutches in an offline environment.",
          challenges: "The clinic needed inventory visibility and ordering support without relying on Wi-Fi or cloud services, while keeping existing paper/PDF order forms and external SSD backup workflows practical.",
          solutions: [
            "Built an offline-first Electron / React / TypeScript app covering item masters, stock in/out records, alerts, order management, and order history",
            "Generated order PDFs by writing item codes, names, and quantities onto existing Goods and Ci Medical PDF templates at fixed coordinates",
            "Implemented backups for inventory data, order history, and settings to an external SSD or another local folder"
          ],
          learnings: "Designed and implemented a workflow-centered desktop system, including offline-first data handling, PDF template output, Windows x64 distribution, and GitHub Actions build verification.",
          demoImageUrl: "/images/clinic-inventory-demo.png",
          githubUrl: "https://github.com/matsu641/Clinic-Inventory-Management-System"
        },
        {
          title: "Clinic Website (Kuwabara Orthopedic Clinic)",
          period: "May 2024 - Jul 2024",
          tags: ["HTML", "CSS", "JavaScript", "Responsive Design", "SEO", "Freelance"],
          background: "Designed, developed, and deployed a responsive website for an orthopedic clinic as a freelance web development project.",
          challenges: "I handled the full process from requirements gathering and site structure to implementation, SEO, deployment, and post-launch updates.",
          solutions: [
            "Built the website with HTML, CSS, and JavaScript for mobile, tablet, and desktop",
            "Implemented basic SEO improvements to improve online visibility and accessibility"
          ],
          learnings: "Achieved 2,856 impressions and 343 clicks with a 12% CTR within 3 months after launch, and the website continues to receive daily visitors while contributing to an increase in new patients.",
          websiteUrl: "https://kuwabara-ortho.jp",
          searchConsoleImageUrl: "/images/clinic_search_console.png",
          thumbnailImageUrl: "/images/clinic-tumbnail.png",
          githubUrl: "https://github.com/matsu641/clinic-website"
        }
      ]
    },
    contact: {
      title: "Contact",
      email: "Email",
      linkedin: "LinkedIn",
      github: "GitHub",
      footer: "© 2025 Misumi Matsudo",
      footerNote: "Built with Next.js + Three.js + GSAP + Framer Motion"
    }
  }
};
