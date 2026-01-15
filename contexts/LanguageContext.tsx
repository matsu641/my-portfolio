"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'ja' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('ja');

  const t = (key: string): any => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value;
  };

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
      description: "Software engineer focused on architecture, performance, and user experience.",
      cta: "View Projects"
    },
    about: {
      title: "About Me",
      intro: [
        "日本で生まれ育ち、高校時代はアメリカへ留学しました。現在はカナダのトロント大学でComputer Engineeringを専攻する学部3年生です。",
        "大学では1・2年次に、ソフトウェアとハードウェアの両面から基礎を学び、C/C++やアセンブリ言語を用いた組み込み開発、回路設計などを経験しました。現在は、制御工学・半導体デバイス・深層学習といった専門分野を中心に学びながら、サークル活動やスタートアップ企業でフルスタックWeb開発にも取り組んでいます。",
        "将来的には、AIやソフトウェアやハードウェアの技術的制約を理解した上で、課題設定から実装・評価までを一貫してリードできるエンジニアを目指しています。"
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
          role: "ソフトウェアエンジニアインターン（機能リード）",
          company: "株式会社 STAR UP",
          period: "2025年5月 - 現在",
          location: "京都、日本（リモート）",
          tasks: [
            "TypeScript、React/Next.js、FastAPIを使用した製造業向けSaaSプラットフォームの開発に貢献",
            "継続的なリファクタリング、ユニットテストの作成、バグ修正によりコード品質とシステム信頼性を向上",
            "新機能の企画と実行を主導し、エンジニアとビジネス側との定期的なキックオフミーティングで要件調整、タスク分解、進捗管理を担当"
          ]
        },
        equos: {
          role: "AIエンジニアインターン",
          company: "株式会社EQUOS",
          period: "2026年1月 - 現在",
          location: "東京、日本（リモート）",
          tasks: [
            "原子力発電所における入構管理業務のDXを目的としたAI導入プロジェクトに参画",
            "定例ミーティングに参加し、先方と業務課題やシステム導入方針の理解・方向性のすり合わせを実施",
            "要件定義内容をもとに、AI適用範囲やシステム構成に関する検討・整理を担当"
          ]
        },
        freelance: {
          role: "フリーランスウェブ開発",
          company: "くわばら整形外科クリニック",
          period: "2024年5月 - 2024年7月",
          location: "リモート",
          tasks: [
            "HTML、CSS、JavaScriptを使用して、完全レスポンシブなクリニックウェブサイトをゼロから設計・開発",
            "クライアントと密接に協力し、要件を明確化してサイト構造とUI/UXに変換",
            "SEO最適化を実装しウェブサイトをデプロイ。オンライン可視性と患者のアクセシビリティを向上",
            "ローンチ後3ヶ月以内に2,856インプレッション、343クリック（CTR 12%）を達成し、若年層患者の増加に貢献",
            "追加の依頼で、QRコードでアクセスできる専用情報ページの実装も担当"
          ]
        },
      },
      activities: {
        title: "ボランティア活動",
        utjn: {
          role: "Web Executive Member",
          organization: "University of Toronto Japan Network (UTJN)",
          period: "2025年8月 - 現在",
          tasks: [
            "TypeScriptとPythonを使用した組織公式ウェブサイトの技術運用およびフルスタック開発を担当",
            "フロントエンドバックエンド全体の機能開発やバグ修正に貢献",
            "メンバーと定期的なミーティングを行い、機能とUI/UXの両面で問題を特定し改善提案を実施",
            "他部門と連携して新機能リクエストの要求やメンテナンス、バグ修正タスクに対応"
          ]
        },
        torontonians: {
          role: "Torontonians Executive Member",
          organization: "University of Toronto Japan Network (UTJN)",
          period: "2023年9月 - 2025年8月",
          tasks: [
            "トロント大学に興味のある人に向けてブログを書き各年に、大学生活や学業に関する情報を発信",
            "インスタグラム動画投稿の企画と制作を補助し、SNSを通じた情報発信を強化",
            "新入生向けにイベントを企画し、コミュニティ形成に貢献"
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
      viewMore: "詳細を見る",
      viewLess: "閉じる",
      impact: "成果",
      background: "背景",
      challenges: "課題",
      solutions: "解決アプローチ",
      learnings: "学びと結果",
      viewDemo: "デモ動画",
      Slides: "スライドを見る",
      slidesTitle: "スライド",
      viewSlides: "スライドを見る",
      viewGithub: "GitHubで見る",
      viewLeaderboard: "リーダーボード",
      items: [
        {
          title: "胸部X線画像の疾患分類（マルチモーダル深層学習）",
          period: "2025/10 - 2025/12",
          what: "PyTorchを用いて胸部X線画像を4クラス分類するマルチモーダルモデル",
          impact: [
            "画像のみのベースラインと比較して、Effusion・CardiomegalyのRecallおよびMacro F1が大幅に向上",
            "極端なクラス不均衡（No Finding 多数）下での少数疾患クラス検出性能を改善",
          ],
          tags: ["PyTorch", "ResNet-50", "Multimodal Learning", "Focal Loss"],
          background: "個人プロジェクト。胸部X線データは『No Finding』が大多数を占め、画像のみのCNNでは少数疾患クラスのRecallが著しく低下する課題があった。医療文脈ではAccuracyが高くても疾患の見逃しが起こり得るため、画像特徴量と患者メタデータを統合したマルチモーダルモデルで少数クラス検出性能の改善を目指した。",
          challenges: "胸部X線データの約93%が『No Finding』に偏った極端なクラス不均衡が存在し、画像のみのCNNでは少数疾患クラス（Effusion、Cardiomegaly、Pneumonia）のRecallが0となる課題があった。医療AIにおいてAccuracyが高くても疾患の見逃しは許容できないため、少数クラスの検出性能を改善する必要があった。",
          solutions: [
            "ResNet-50による安定した特徴抽出を基盤とし、画像特徴量と患者メタデータ（年齢・性別・View Position）を統合するマルチモーダルアーキテクチャを採用",
            "クラス不均衡対策として、Focal Loss・クラス重み付け・Oversamplingを組み合わせて実装",
            "計算資源を考慮し、NIH Chest X-rayデータの15疾患ラベルを4クラスに再構成",
            "単一モデル設計で実装の透明性と推論効率を優先"
          ],
          learnings: "Accuracyに依存しない評価指標の重要性を習得。ベースラインはAccuracy 93%だが少数疾患クラスのRecallは全て0。マルチモーダルモデルでMacro F1が0.24→0.46（+92%）に向上。Effusion Recall 0.00→0.55、Cardiomegaly 0.00→0.33と大幅改善。Accuracyは0.93→0.86に低下したが、医療文脈で重要な「見逃し削減」を優先する設計判断の妥当性を確認した。",          confusionMatrixImages: ["/images/Baseline.png", "/images/Improved.png"],          confusionMatrixLabels: [
            "Baseline Model (画像のみ)",
            "Primary Model (マルチモーダル)"
          ],
          githubUrl: "https://github.com/matsu641/Multimodal-Chest-X-ray-Classification-with-CNN"
        },
        {
          title: "若手社員離職リスク予測モデル",
          period: "2025/08",
          what: "クラス不均衡な社員データからLightGBMを用いて離職リスクを予測するモデル",
          impact: [
            "クラス不均衡を考慮したRecall重視の閾値最適化により、離職リスクの高い社員を効果的に検出",
            "企業の人事施策への活用提案を含むレポートを作成",
          ],
          tags: ["LightGBM", "Python", "scikit-learn", "Feature Engineering"],
          background: "松尾研究室GCI 2025 Summerの最終課題（個人プロジェクト）。入社5年以内の若手社員の離職率が高く、人事施策の効果的な介入タイミングの特定が困難という課題があった。過去の社員データから離職リスクを事前に予測する仕組みが必要とされていた。",
          challenges: "離職者と非離職者のクラス不均衡により、単純な精度指標では少数クラス（離職者）を適切に検出できない課題があった。人事施策への活用を考慮すると、モデルの予測根拠を説明できる解釈性が必須であり、ブラックボックスなモデルは採用できなかった。",
          solutions: [
            "表形式データに対する高精度・高速学習・解釈性を兼ね備えたLightGBMを採用",
            "Python + scikit-learnで標準的なデータ前処理とモデル評価パイプラインを構築",
            "クラス不均衡対策として、Precision-Recall Curveを用いてRecallを重視した閾値最適化を実施",
            "特徴量重要度を活用し、人事部門が理解できる予測根拠を提供"
          ],
          learnings: "特徴量重要度を用いた解釈可能なモデル構築の重要性を実感し、ビジネス課題への機械学習の実践的な適用方法を習得した。",
          slideUrl: "/certificates/gci-final-project-slides.pdf",
          githubUrl: "https://github.com/matsu641/GCI_final_project"
        },
        {
          title: "Interactive Map & Navigation System（GISアプリケーション）",
          period: "2025/01 - 2025/04",
          what: "OpenStreetMapを活用した経路探索最適化GISアプリケーション（3人チーム開発）",
          impact: [
            "Traveling Courier Problemの最適化で高精度と高速性を実現",
            "全チームで競い合うリーダーボード上で上位14位/98チームを獲得",
            "制作物を学期末にプレゼン発表",
          ],
          tags: ["C++", "Algorithms", "A*", "GIS", "UI/UX", "Linux"],
          background: "ECE297（Design and Communication）の3人グループのプロジェクト課題。大規模都市データを扱う実用的なGISアプリケーション構築において、単なる地図表示だけでなく、高速な経路探索・UI/UX・パフォーマンス最適化を統合したシステムが求められた。",
          challenges: "OpenStreetMapの大規模都市データに対する高速な経路探索とスムーズ車の両立が必要だった。Traveling Courier Problemでは、Pickup → Delivery制約を満たしつつ、限られた計算時間内で商品質な経路を生成する必要があった。UI側では、複雑な地図情報をわかりやすく表示し、直感的な操作性を実現する必要があった。",
          solutions: [
            "大規模グラフ処理に最適化されたC++ + STLを採用し、効率的なデータ構造を設計",
            "A*アルゴリズムのヒューリスティック関数を最適化し、Dijkstraと組み合わせて高速な最短経路探索を実現",
            "Traveling Courier Problemには、Greedyによる初期解生成と2-opt局所探索を実装し、完全最適解ではないが計算時間と解の品質のバランスを重視",
            "UI側では、情報過多を避けたシンプルなデザインを採用し、ユーザビリティを優先"
          ],
          learnings: "個人ではA*機能、経路探索機能、UI/UX改善を担当し、チームと競技探索アルゴリズム改計とTraveling Courier Problem最適化を協力して行った。大規模システム開発でアルゴリズム理論を考慮した実計が重要であることを学んだ。実世界の道路ネットワークデータを扱う経験を通じて、大規模データ処理とパフォーマンス最適化の重要性を学んだ。",
          leaderboardImageUrl: "/images/ECE297_leaderboard.png",
          slideUrl: "/images/ECE297_Presentation.pdf",
          videoUrl: "/demos/map_application.mp4"
        },
        {
          title: "Rush Hour（駐車場パズルゲーム）",
          period: "2025/03 - 2025/04",
          what: "C言語でVGA描画・PS/2割り込み処理を実装した組み込みパズルゲーム",
          impact: [
            "CPUlator上で完全動作するパズルゲームを実装",
            "VGA描画、キーボード入力、衝突判定、タイマー、ビープ音機能を実現",
          ],
          tags: ["C", "VGA", "PS/2 Interrupt", "Embedded Systems","RISC-V"],
          background: "ECE243（Computer Organization）の個人プロジェクト課題。組み込みシステムと低レベルハードウェア制御の実践的な学習が必要だった。VGA描画とPS/2デバイス入力処理をC言語で実装し、動作するゲームを作成することが求められた。",
          challenges: "限られた組み込みシステムリソース下で、スムーズな2D描画とちらつき防止を実現する必要があった。PS/2キーボードからのリアルタイム入力を割り込み処理で適切にハンドリングし、ゲームの応答性を確保する必要があった。複雑な入力デバイス対応とパフォーマンスの両立が課題だった。",
          solutions: [
            "低レベルハードウェア制御に適したC言語を採用",
            "VGA + Double Bufferingでスムーズな描画とちらつき防止を実現",
            "PS/2割り込み処理（IRQ line 22）を実装し、リアルタイムなキーボード入力に対応",
            "マウス入力の代わりにキーボード操作に簡素化し、実装の複雑性を低減",
            "シンプルな矩形描画で車を表現し、パフォーマンスと実装速度を優先した設計を採用"
          ],
          learnings: "組み込みシステムの基礎を習得できた。特に、割り込み処理、メモリ管理、リアルタイム処理の実装は難易度は高かったが、より低レベルハードウェア制御について深い理解を得ることができた。また、限られたリソースの中で動作するシステムを設計する経験を通じて、効率的なプログラミングの重要性を学んだ。",
          videoUrl: "/demos/rush-hour-demo.mp4",
          githubUrl: "https://github.com/matsu641/RushHour"
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
      title: "I design systems,",
      subtitle: "not just interfaces.",
      description: "Software engineer focused on architecture, performance, and user experience.",
      cta: "View Projects"
    },
    about: {
      title: "About Me",
      intro: [
        "Born and raised in Japan, I studied abroad in the United States during high school. I am currently a third-year undergraduate student majoring in Computer Engineering at the University of Toronto, Canada.",
        "During my first and second years at university, I learned fundamentals from both software and hardware perspectives, gaining experience in embedded development using C/C++ and assembly language, as well as circuit design. Currently, I am focusing on specialized fields such as control engineering, semiconductor devices, and deep learning, while also engaging in full-stack web development through club activities and startup work.",
        "In the future, I aim to become an engineer who can lead consistently from problem definition to implementation and evaluation, with a deep understanding of technical constraints in AI, software, and hardware."
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
          period: "May 2025 - Present",
          location: "Kyoto, Japan (Remote)",
          tasks: [
            "Contributed to the development of a SaaS platform for the manufacturing industry using TypeScript, React/Next.js, and FastAPI",
            "Improved code quality and system reliability through continuous refactoring, unit testing, and bug fixes",
            "Led the planning and execution of new features, coordinating requirements between engineers and business stakeholders, task breakdown, and progress management"
          ]
        },
        equos: {
          role: "AI Engineer Intern",
          company: "EQUOS, Inc.",
          period: "Jan 2026 - Present",
          location: "Tokyo, Japan (Remote)",
          tasks: [
            "Participated in an AI implementation project aimed at digitally transforming entry management operations at nuclear power plants",
            "Attended regular meetings to understand business challenges and system implementation policies, and aligned project direction with stakeholders",
            "Responsible for examining and organizing the scope of AI application and system architecture based on requirement definitions"
          ]
        },
        freelance: {
          role: "Freelance Web Developer",
          company: "Kuwabara Orthopedic Clinic",
          period: "May 2024 - Jul 2024",
          location: "Remote",
          tasks: [
            "Designed and developed a fully responsive clinic website from scratch using HTML, CSS, and JavaScript",
            "Collaborated closely with clients to clarify requirements and translate them into site structure and UI/UX",
            "Implemented SEO optimization and deployed the website, improving online visibility and patient accessibility",
            "Achieved 2,856 impressions and 343 clicks (CTR 12%) within 3 months post-launch, contributing to increased younger patient demographics"
          ]
        },
      },
      activities: {
        title: "Volunteer Activities",
        utjn: {
          role: "Web Executive Member",
          organization: "University of Toronto Japan Network (UTJN)",
          period: "Aug 2025 - Present",
          tasks: [
            "Responsible for technical operations and full-stack development of the organization's official website using TypeScript and Python",
            "Contributed to feature development and bug fixes across front-end and back-end",
            "Held regular meetings with members to identify issues and implement improvement proposals for both functionality and UI/UX",
            "Collaborated with other departments to address new feature requests, maintenance, and bug fix tasks"
          ]
        },
        torontonians: {
          role: "Torontonians Executive Member",
          organization: "University of Toronto Japan Network (UTJN)",
          period: "Sep 2023 - Aug 2025",
          tasks: [
            "Wrote blog posts for people interested in the University of Toronto, sharing information about university life and academics",
            "Assisted in planning and producing Instagram video posts to strengthen information dissemination through SNS",
            "Organized events for new students and contributed to community building"
          ]
        }
      },
      certifications: {
        title: "Completed Courses",
        items: [
          {
            name: "Global Consumer Intelligence Program 2025 Summer",
            issuer: "Matsuo Lab (The University of Tokyo)",
            date: "Completed: Aug 2025",
            description: [
              "Learned methods to analyze global consumer behavior using data-driven approaches",
              "In the final project, learned practical approaches combining AI techniques with market business perspectives"
            ],
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
      viewMore: "View Details",
      viewLess: "Close",
      impact: "Impact",
      background: "Background",
      challenges: "Challenges",
      solutions: "Solutions",
      learnings: "Learnings & Results",
      viewDemo: "Demo",
      slidesTitle: "Project Slides",
      viewSlides: "View Slides",
      viewGithub: "View GitHub",
      viewLeaderboard: "Leaderboard",
      items: [
        {
          title: "Chest X-ray Disease Classification (Multimodal Deep Learning)",
          period: "Oct 2025 - Dec 2025",
          what: "A multimodal model for classifying chest X-ray images into 4 classes using PyTorch",
          impact: [
            "Significantly improved Recall for Effusion and Cardiomegaly, as well as Macro F1, compared to the image-only baseline",
            "Improved detection performance for minority disease classes under extreme class imbalance (majority No Finding)",
          ],
          tags: ["PyTorch", "ResNet-50", "Multimodal Learning", "Focal Loss"],
          background: "Personal project. Chest X-ray data is predominantly 'No Finding', causing image-only CNNs to suffer from significantly low Recall for minority disease classes. In medical contexts, high Accuracy alone can still lead to disease misses, so I aimed to improve minority class detection performance by integrating image features and patient metadata in a multimodal model.",
          challenges: "About 93% of chest X-ray data is biased towards 'No Finding', creating extreme class imbalance. Image-only CNNs resulted in zero Recall for minority disease classes (Effusion, Cardiomegaly, Pneumonia). In medical AI, missing diseases is unacceptable even with high Accuracy, so improving minority class detection was essential.",
          solutions: [
            "Adopted a multimodal architecture integrating image features with patient metadata (age, sex, View Position) based on stable feature extraction using ResNet-50",
            "Implemented a combination of Focal Loss, class weighting, and Oversampling to address class imbalance",
            "Restructured 15 disease labels from NIH Chest X-ray data into 4 classes considering computational resources",
            "Prioritized implementation transparency and inference efficiency with a single model design"
          ],
          learnings: "Learned the importance of evaluation metrics beyond Accuracy. Baseline achieved 93% Accuracy but zero Recall for all minority disease classes. Multimodal model improved Macro F1 from 0.24 to 0.46 (+92%). Effusion Recall improved from 0.00 to 0.55, and Cardiomegaly from 0.00 to 0.33. Although Accuracy decreased from 0.93 to 0.86, I confirmed the validity of the design decision prioritizing 'reducing missed diagnoses' in a medical context.",
          confusionMatrixImages: ["/images/Baseline.png", "/images/Improved.png"],
          confusionMatrixLabels: [
            "Baseline Model (Image Only)",
            "Primary Model (Multimodal)"
          ],
          githubUrl: "https://github.com/matsu641/Multimodal-Chest-X-ray-Classification-with-CNN"
        },
        {
          title: "Employee Attrition Risk Prediction Model",
          period: "Aug 2025",
          what: "A model using LightGBM to predict attrition risk from class-imbalanced employee data",
          impact: [
            "Effectively detected employees at high attrition risk through Recall-focused threshold optimization considering class imbalance",
            "Created a report including proposals for HR policy utilization",
          ],
          tags: ["LightGBM", "Python", "scikit-learn", "Feature Engineering"],
          background: "Final assignment for Matsuo Lab GCI 2025 Summer (individual project). High attrition rates among employees within their first five years made it difficult to identify effective intervention timing for HR policies. A mechanism to predict attrition risk in advance from past employee data was needed.",
          challenges: "Class imbalance between resigned and non-resigned employees meant simple accuracy metrics could not properly detect the minority class (resigned employees). Considering HR policy utilization, model interpretability to explain prediction rationale was essential, and black-box models were not feasible.",
          solutions: [
            "Adopted LightGBM for its high accuracy, fast learning, and interpretability on tabular data",
            "Built a standard data preprocessing and model evaluation pipeline using Python + scikit-learn",
            "Implemented Recall-focused threshold optimization using Precision-Recall Curve as a class imbalance countermeasure",
            "Provided prediction rationale understandable to HR departments using feature importance"
          ],
          learnings: "Realized the importance of interpretable model construction using feature importance and learned practical application methods of machine learning to business problems.",
          slideUrl: "/certificates/gci-final-project-slides.pdf",
          githubUrl: "https://github.com/matsu641/GCI_final_project"
        },
        {
          title: "Interactive Map & Navigation System (GIS Application)",
          period: "Jan 2025 - Apr 2025",
          what: "A route search optimization GIS application leveraging OpenStreetMap (3-person team development)",
          impact: [
            "Achieved high accuracy and speed in Traveling Courier Problem optimization",
            "Ranked 14th out of 98 teams on the competitive leaderboard",
            "Presented the project at the end of the semester",
          ],
          tags: ["C++", "Algorithms", "A*", "GIS", "UI/UX", "Linux"],
          background: "Project assignment for ECE297 (Design and Communication) in a 3-person group. In building a practical GIS application handling large-scale urban data, a system integrating not just map display but also high-speed route search, UI/UX, and performance optimization was required.",
          challenges: "High-speed route search and smooth performance were both required for large-scale OpenStreetMap urban data. For the Traveling Courier Problem, it was necessary to generate high-quality routes within limited computation time while satisfying Pickup → Delivery constraints. On the UI side, complex map information needed to be displayed clearly with intuitive operability.",
          solutions: [
            "Adopted C++ + STL optimized for large-scale graph processing and designed efficient data structures",
            "Optimized A* algorithm heuristic function and combined with Dijkstra to achieve high-speed shortest path search",
            "For Traveling Courier Problem, implemented initial solution generation by Greedy and 2-opt local search, prioritizing balance between computation time and solution quality rather than complete optimal solution",
            "On the UI side, adopted simple design avoiding information overload, prioritizing usability"
          ],
          learnings: "Individually handled A* functionality, route search features, and UI/UX improvements, while collaborating with the team on competitive search algorithm refinement and Traveling Courier Problem optimization. Learned that practical implementation considering algorithm theory is crucial in large-scale system development. Through experience handling real-world road network data, learned the importance of large-scale data processing and performance optimization.",
          leaderboardImageUrl: "/images/ECE297_leaderboard.png",
          slideUrl: "/images/ECE297_Presentation.pdf",
          videoUrl: "/demos/map_application.mp4"
        },
        {
          title: "Rush Hour (Parking Puzzle Game)",
          period: "Mar 2025 - Apr 2025",
          what: "An embedded puzzle game implemented in C with VGA rendering and PS/2 interrupt handling",
          impact: [
            "Implemented a fully functional puzzle game on CPUlator",
            "Realized VGA rendering, keyboard input, collision detection, timer, and beep sound features",
          ],
          tags: ["C", "VGA", "PS/2 Interrupt", "Embedded Systems","RISC-V"],
          background: "Individual project assignment for ECE243 (Computer Organization). Practical learning of embedded systems and low-level hardware control was required. Tasked with implementing VGA rendering and PS/2 device input processing in C to create a working game.",
          challenges: "Under limited embedded system resources, it was necessary to achieve smooth 2D rendering and prevent flickering. PS/2 keyboard real-time input needed to be properly handled through interrupt processing to ensure game responsiveness. The challenge was to balance complex input device support with performance.",
          solutions: [
            "Adopted C language suitable for low-level hardware control",
            "Achieved smooth rendering and flicker prevention with VGA + Double Buffering",
            "Implemented PS/2 interrupt handling (IRQ line 22) for real-time keyboard input",
            "Simplified to keyboard operation instead of mouse input to reduce implementation complexity",
            "Adopted a design prioritizing performance and implementation speed by representing cars with simple rectangle rendering"
          ],
          learnings: "Mastered the fundamentals of embedded systems. In particular, implementing interrupt handling, memory management, and real-time processing was challenging but provided a deeper understanding of low-level hardware control. Through the experience of designing a system that operates within limited resources, I learned the importance of efficient programming.",
          videoUrl: "/demos/rush-hour-demo.mp4",
          githubUrl: "https://github.com/matsu641/RushHour"
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
