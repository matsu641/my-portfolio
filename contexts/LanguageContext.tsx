"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { addProjectAssets } from '@/lib/projectAssets';

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

const rawTranslations = {
  ja: {
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
        {
          title: "胸部X線画像の疾患分類モデル",
          period: "2025/10 - 2025/12",
          background: "胸部X線画像と年齢・性別・撮影方向などの患者メタデータを組み合わせ、PyTorchで4クラス分類モデルを構築しました。",
          challenges: "データの約93%が「No Finding」に偏っていたため、AccuracyではなくMacro F1とクラス別Recallを重視して評価しました。",
          solutions: [
            "ResNet-50、Focal Loss、クラス重み付け、Oversamplingを使用",
            "画像特徴量と患者メタデータを統合し、少数クラス検出を改善"
          ],
          learnings: "Macro F1を0.24から0.46に改善し、EffusionとCardiomegalyのRecallも大きく改善しました。",
        },
        {
          title: "若手社員離職リスク予測モデル",
          period: "2025/08",
          background: "書類審査制の松尾研究室GCI 2025 Summerに選抜され、企業提供の社員データを用いた最終課題に取り組みました。",
          challenges: "単に予測モデルを構築するだけでなく、データ分析からビジネス上の課題を特定し、人事施策として活用できる提案に落とし込むことが求められました。",
          solutions: [
            "NumPy、Pandas、可視化ツールを用いて探索的データ分析を実施し、離職に関係する傾向を特定",
            "そのうえで、LightGBMを用いた勾配ブースティング分類モデルを構築し、離職リスクの高い社員を見逃さないようRecallを重視して閾値を調整"
          ],
          learnings: "分析結果、モデルの予測結果、改善施策をビジネス提案スライドとして整理し、データ分析からAIモデル実装、ビジネス提案まで一貫して実施しました。最終的に修了要件を満たし、修了率約14%の同講座を修了しました。",
        },
        {
          title: "Commit Message Reviewer",
          period: "2026/06",
          background: "Gitリポジトリの直近コミットメッセージをLLMで評価し、品質をレビューするCLIツールを開発しました。",
          challenges: "ローカルリポジトリとリモートGitHub URLの両方に対応し、LLMの評価結果をターミナルとHTMLレポートの両方で確認できるようにする必要がありました。また、LLM評価の揺れを抑えるため、プロンプト設計と評価基準の調整も重要でした。",
          solutions: [
            "Node.js / TypeScriptで`review-commits` CLIを実装し、現在の作業ディレクトリまたは`--url`で指定したリモートリポジトリを解析",
            "Gitコマンドから直近コミットのhash、author、date、subject、bodyを取得し、OpenRouter APIのLLMにJSON形式でレビューさせる構成を設計",
            "評価結果を`excellent`、`good`、`bad`と理由に分けてターミナルに表示し、同時にHTMLレポートを生成してlocalhost:3546で配信",
            "LLMの判定が`good`や`excellent`に偏る問題に対して、評価ルーブリックとtemperature設定を調整"
          ],
          learnings: "LLMを使った評価機能では、単にAPIを呼び出すだけでなく、出力形式の安定化、評価基準の設計、プロンプトの過学習回避、結果の再現性への配慮が重要であることを学びました。",
        },
        {
          title: "GISマップアプリケーション",
          period: "2025/01 - 2025/04",
          background: "大学の3人チームプロジェクトとして、OpenStreetMapのデータを用いたC++でGISアプリケーションを開発しました。",
          challenges: "大規模な道路ネットワークデータを扱いながら、地図表示、経路探索、配送経路最適化を実装しました。",
          solutions: [
            "A*ベースの最短経路探索を実装",
            "Greedyによる初期解生成と2-opt局所探索で、経路品質と実行時間のバランスを調整"
          ],
          learnings: "経路探索機能と地図UI/UXの改善を担当し、授業内リーダーボードで98チーム中14位を獲得しました。",
        },
        {
          title: "Rush Hour組込みシステム開発",
          period: "2025/03 - 2025/04",
          background: "大学のプロジェクトとして、DE1Socボード上でPCとキーボードを連携させて動作するパズルゲームをC言語で実装しました。",
          challenges: "VGA描画とPS/2キーボード入力を直接扱い、限られた組み込み環境の中でリアルタイムに動作するゲームを作成しました。",
          solutions: [
            "Double Bufferingを用いて画面のちらつきを軽減",
            "PS/2キーボード入力を割り込み処理で扱い、メモリマップドI/Oを実践"
          ],
          learnings: "VGA描画、割り込み処理、メモリマップドI/Oなど、低レベルなハードウェア制御を実践しました。",
        },
        {
          title: "クリニック在庫管理システム",
          period: "2026/06",
          background: "クリニック向けに、物品・検査用品・日用品・松葉杖の在庫をオフラインで管理できるWindowsデスクトップアプリを開発しました。",
          challenges: "院内PCではWi-Fiやクラウドサービスを前提にしづらく、既存の紙・PDF注文票や外付けSSDバックアップの運用も残しながら、在庫不足と発注漏れを防ぐ必要がありました。",
          solutions: [
            "Electron / React / TypeScriptで端末単体で動作するアプリを構築し、商品マスタ、入出庫、アラート、発注管理、注文履歴を一体化",
            "既存のGoods / Ciメディカル用PDF注文票に商品コード・商品名・数量を座標指定で出力し、現場の発注フローを大きく変えずに効率化",
            "在庫データ、注文履歴、設定情報をJSONとして外付けSSDなど任意フォルダにバックアップできる仕組みを実装"
          ],
          learnings: "現場の制約に合わせたオフラインファースト設計、既存帳票を活かしたPDF出力、Windows x64向け配布とGitHub Actionsによるビルド検証までを一通り設計・実装しました。",
        },
        {
          title: "クリニック予約管理システム",
          period: "2026/07",
          background: "小規模事業者やクリニックでの利用を想定し、予約表、空き枠確認、顧客情報を一画面で扱える予約管理システムのデモを制作しました。",
          challenges: "紙・電話・表計算ソフトで分散しがちな予約情報を、担当者別の予定や顧客情報と結びつけて、確認漏れが起きにくい画面に整理する必要がありました。",
          solutions: [
            "予約状況、顧客情報、予約詳細を同じ流れで確認できる画面構成を設計",
            "空き枠や担当者ごとの予定を見つけやすいように、一覧性を重視したUIを作成",
            "実際の業務利用を想定し、操作の流れが伝わるデモ動画を作成"
          ],
          learnings: "業務システムでは、機能数よりも現場で迷わず使える情報設計と導線設計が重要であることを意識して制作しました。",
        },
        {
          title: "クリニックウェブサイト",
          period: "2024年5月 - 2024年7月",
          background: "フリーランス案件として、整形外科クリニックの公式Webサイトを設計・開発・公開しました。",
          challenges: "要件整理、サイト構成、実装、SEO、公開、公開後の追加対応まで一貫して担当しました。",
          solutions: [
            "HTML、CSS、TypeScriptでレスポンシブサイトを実装",
            "基本的なSEO対策と、QRコードからアクセスできる専用情報ページを追加"
          ],
          learnings: "公開後3ヶ月で2,856インプレッション、343クリック、CTR 12%を達成しました。",
        }
      ]
    }
  },
  en: {
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
        {
          title: "Chest X-ray Disease Classification (Multimodal Deep Learning)",
          period: "Oct 2025 - Dec 2025",
          background: "Built a PyTorch-based multimodal model for 4-class chest X-ray classification by combining image features with patient metadata such as age, sex, and view position.",
          challenges: "The dataset was highly imbalanced, with approximately 93% of samples labeled “No Finding,” so I focused on Macro F1 and class-specific Recall rather than Accuracy.",
          solutions: [
            "Used ResNet-50, focal loss, class weighting, and oversampling",
            "Fused patient metadata with image features to improve minority-class detection"
          ],
          learnings: "Improved Macro F1 from 0.24 to 0.46, Effusion Recall from 0.00 to 0.55, and Cardiomegaly Recall from 0.00 to 0.33.",
        },
        {
          title: "Employee Attrition Risk Analysis",
          period: "Aug 2025",
          background: "Selected for Matsuo Lab’s application-based GCI 2025 Summer program and worked on a final project using a company-provided employee dataset.",
          challenges: "The project required more than building a prediction model; I needed to identify business issues from the data and translate the findings into actionable HR recommendations.",
          solutions: [
            "Used NumPy, Pandas, and visualization tools for exploratory data analysis,and identified patterns related to attrition",
            "Built a LightGBM-based gradient boosting classifier to predict high-risk employees, adjusting thresholds to prioritize Recall and minimize false negatives"
          ],
          learnings: "Summarized the analysis, model results, and proposed countermeasures into a business proposal slide deck, completing the full process from data analysis to AI model implementation and business solution design. I met the completion requirements and completed the program, which had an approximately 14% completion rate.",
        },
        {
          title: "Commit Message Reviewer (LLM Git Review CLI)",
          period: "Jun 2026",
          background: "Built a TypeScript CLI tool that reviews recent Git commit messages with an LLM and reports whether each message is excellent, good, or bad.",
          challenges: "The tool needed to work on both the current local repository and remote GitHub repositories, then show results in terminal logs and an HTML report. A key challenge was making LLM-based evaluation useful and reasonably stable instead of drifting toward one rating.",
          solutions: [
            "Implemented a `review-commits` Node.js / TypeScript CLI that runs on the current working directory or clones a repository passed through `--url`",
            "Collected recent commit hash, author, date, subject, and body data through Git commands and sent structured review requests to OpenRouter",
            "Generated terminal logs and an HTML report, then served the report locally on port 3546 with Node's built-in HTTP server",
            "Iterated on the LLM rubric, JSON-only prompt design, temperature settings, and rating boundaries to reduce bias toward `good` or `excellent`"
          ],
          learnings: "Learned that LLM product work requires more than API integration: prompt boundaries, output validation, reproducibility, fallback handling, and clear user-facing reports all matter for a reliable developer tool.",
        },
        {
          title: "Interactive Map & Navigation System (GIS Application)",
          period: "Jan 2025 - Apr 2025",
          background: "Developed a C++ GIS application using OpenStreetMap data in a 3-person team project for ECE297.",
          challenges: "The application supported map visualization, route search, and delivery route optimization while handling large-scale road network data efficiently.",
          solutions: [
            "Used A*-based shortest-path search for route search features",
            "Used greedy initialization and 2-opt local search to balance route quality and runtime performance"
          ],
          learnings: "Implemented route search features and improved map UI/UX, contributing to a 14th-place ranking out of 98 teams.",
        },
        {
          title: "Rush Hour (Parking Puzzle Game) on Embedded System",
          period: "Mar 2025 - Apr 2025",
          background: "Implemented a Rush Hour-style puzzle game in C with VGA and PS/2 keyboard support for ECE243(Computer Organization).",
          challenges: "The project involved direct control of VGA graphics and PS/2 keyboard input, requiring real-time interaction under limited embedded-system resources.",
          solutions: [
            "Used double buffering to reduce screen flickering",
            "Handled PS/2 keyboard input through interrupts and practiced memory-mapped I/O"
          ],
          learnings: "Practiced low-level hardware control through VGA rendering, interrupts, and memory-mapped I/O.",
        },
        {
          title: "Clinic Inventory Management System (Kuwabara Orthopedic Clinic)",
          period: "Jun 2026",
          background: "Built a Windows desktop app for Kuwabara Orthopedic Clinic to manage supplies, examination items, daily-use goods, and crutches in an offline environment.",
          challenges: "The clinic needed inventory visibility and ordering support without relying on Wi-Fi or cloud services, while keeping existing paper/PDF order forms and external SSD backup workflows practical.",
          solutions: [
            "Built an offline-first Electron / React / TypeScript app covering item masters, stock in/out records, alerts, order management, and order history",
            "Generated order PDFs by writing item codes, names, and quantities onto existing Goods and Ci Medical PDF templates at fixed coordinates",
            "Implemented backups for inventory data, order history, and settings to an external SSD or another local folder"
          ],
          learnings: "Designed and implemented a workflow-centered desktop system, including offline-first data handling, PDF template output, Windows x64 distribution, and GitHub Actions build verification.",
        },
        {
          title: "Appointment Management System",
          period: "Jul 2026",
          background: "Built a demo appointment management system for small businesses and clinics, focusing on schedules, available slots, and customer information in one workflow.",
          challenges: "Appointment information is often scattered across calls, notes, and spreadsheets, so the UI needed to make schedules and customer details easy to verify at a glance.",
          solutions: [
            "Designed a screen flow that keeps appointment status, customer details, and reservation notes in one place",
            "Prioritized scan-friendly layouts for checking available slots and staff schedules",
            "Created a demo video to communicate the core workflow clearly"
          ],
          learnings: "This project reinforced that practical business tools depend on clear information architecture and low-friction workflows as much as implementation details.",
        },
        {
          title: "Clinic Website (Kuwabara Orthopedic Clinic)",
          period: "May 2024 - Jul 2024",
          background: "Designed, developed, and deployed a responsive website for an orthopedic clinic as a freelance web development project.",
          challenges: "I handled the full process from requirements gathering and site structure to implementation, SEO, deployment, and post-launch updates.",
          solutions: [
            "Built the website with HTML, CSS, and TypeScript for mobile, tablet, and desktop",
            "Implemented basic SEO improvements to improve online visibility and accessibility"
          ],
          learnings: "Achieved 2,856 impressions and 343 clicks with a 12% CTR within 3 months after launch, and the website continues to receive daily visitors while contributing to an increase in new patients.",
        }
      ]
    }
  }
};

const projectItemsFromMarkdown = {
  ja: [
    {
      slug: "clinic-inventory",
      featured: true,
      title: "クリニック在庫管理システム",
      period: "2026/06",
      background: [
        "整形外科クリニックの紙ベースの在庫管理・発注業務をデジタル化",
        "オフラインでも使えるデスクトップアプリとして設計・開発",
      ],
      challenges: [
        "在庫数・発注履歴を紙で管理しており、確認や更新に手間がかかっていた",
        "注文票に商品情報を手作業で転記していたため発注ミスが多かった",
        "在庫切れに気づかず、必要な物品が使いたいときに無かったことがあった",
        "院内にはインターネットが無いため、インターネットに依存しない設計が必要だった",
      ],
      solutions: [
        "在庫情報・品目データ・発注履歴をアプリ内で一元管理",
        "簡単なクリック操作で直感的に個数を更新できるように設計",
        "在庫不足アラートにより、発注漏れを防止",
        "選択した品目と数量をもとに、PDF発注書を自動生成",
        "ローカル保存とバックアップ機能により、オフライン運用に対応",
      ],
      learnings: [
        "手作業では20分かかっていた業務を、このシステムで5分程度に短縮",
        "クリニックのスタッフ（20人）が実際の現場で利用",
      ],
    },
    {
      slug: "commit-message-reviewer",
      title: "Gitコミットメッセージレビューツール",
      period: "2026/06",
      background:
        "GitコミットメッセージをLLMでレビューするNode.js / TypeScript製CLIを開発しました。ローカル・リモートリポジトリに対応し、結果をターミナルとHTMLレポートで確認できます。",
      challenges:
        "Git履歴取得、リモートclone、LLM評価、HTML生成を一つのCLIワークフローに統合する必要がありました。さらに、LLMの評価結果が揺れやすいため、安定したJSON出力と評価基準の設計も課題でした。",
      solutions: [
        "`--url`、`--limit`、`--output` に対応したCLIを実装",
        "OpenRouter APIで各コミットを `excellent` / `good` / `bad` に分類",
        "JSONレスポンスを検証し、失敗時は1件ずつ再評価するfallback処理を追加",
        "HTMLレポートを生成し、`localhost:3546` で確認できるように実装",
      ],
      learnings:
        "コミットメッセージの品質を自動レビューし、結果を可視化できるツールを完成させました。LLMを使うだけでなく、評価基準・プロンプト・出力検証を改善しながら実装する経験を得ました。",
    },
    {
      slug: "gis-map",
      title: "GISマップアプリケーション",
      period: "2025/01 - 2025/04",
      background:
        "大学の授業で、OpenStreetMapデータを用いたC++ベースのGISアプリケーションをチームで開発しました。地図表示、経路探索、配送ルート最適化機能を実装しました。",
      challenges:
        "都市全体の大規模な道路・交差点データを高速に処理しながら、配送ルート最適化では解の質と計算時間のバランスを取る必要がありました。また、アルゴリズム、UI、データ処理をチームで統合することも課題でした。",
      solutions: [
        "データ構造を工夫し、不要な探索や計算を削減",
        "経路探索とルート改善のアルゴリズムを組み合わせ、実行時間を抑えながら最適化",
        "地図上で経路や地点を視覚的に確認できるUIを実装",
        "チーム内で機能を分担し、最終アプリケーションとして統合",
      ],
      learnings:
        "大規模データ処理、アルゴリズム設計、UI実装を含む実践的な開発を経験し、98チーム中14位の成績を達成しました。",
    },
    {
      slug: "chest-xray",
      title: "胸部X線画像の疾患分類モデル",
      period: "2025/10 - 2025/12",
      background:
        "大学の授業で、胸部X線画像と患者メタデータを組み合わせた疾患分類モデルを構築しました。画像情報と表形式データを統合するマルチモーダル学習に取り組みました。",
      challenges:
        "疾患ごとのデータ数に大きな偏りがあり、多数派クラスに予測が偏りやすい状況でした。Accuracyだけでは少数クラスの検出性能を正しく評価できず、画像特徴量とメタデータの統合方法も課題でした。",
      solutions: [
        "CNNで画像特徴量を抽出し、患者メタデータと統合",
        "Focal Loss、クラス重み、サンプリング手法を試行",
        "Macro F1やクラス別Recallを用いて少数クラスの性能を評価",
        "学習結果を比較しながらモデル構成と評価方法を改善",
      ],
      learnings:
        "Macro F1を0.24から0.46へ改善し、EffusionクラスのRecallを0.00から0.55へ改善しました。医療AIにおけるクラス不均衡と評価指標の重要性を学びました。",
    },
    {
      slug: "appointment-system",
      featured: true,
      title: "クリニック予約管理システム",
      period: "2026/07",
      background:
        "クリニックの予約情報・患者情報を管理する予約管理システムを開発しました。受付業務や予約確認を効率化する業務向けシステムとして設計しました。",
      challenges:
        "予約日時、患者情報、診療内容、ステータスを正確に紐づける必要がありました。同時操作によるダブルブッキングを避け、複数端末での反映の時差を最小限にしつつ、医療現場で迷わず使える操作性も求められました。",
      solutions: [
        "予約情報・患者情報・ステータスを一元管理できる構成に設計",
        "必要な情報にすぐアクセスできるよう画面構成と入力項目を整理",
        "予約データを構造化し、検索・確認・更新しやすい仕組みを実装",
        "日常業務の流れに沿ったUIを意識",
      ],
      learnings:
        "予約・患者情報をまとめて管理できるシステムとして構築し、業務フローに合わせたUI設計とデータ管理の経験を得ました。",
    },
    {
      slug: "clinic-website",
      featured: true,
      title: "クリニックWebサイト",
      period: "2024/05 - 2024/07",
      background:
        "整形外科クリニックの公式Webサイトを設計・開発・公開しました。要件整理、実装、デプロイ、公開後の追加対応まで一貫して担当しました。",
      challenges:
        "高齢の患者さんにも読みやすく、迷わず使えるサイト設計が必要でした。情報量を増やしすぎると読みにくく、減らしすぎると不親切になるため、公開後に検索から見つけてもらうためのSEOも含めてバランスを取る必要がありました。",
      solutions: [
        "診療内容、診療時間、アクセス情報にすぐ到達できる導線を設計",
        "文字サイズ、余白、配色、アイコンを調整し、読みやすさを重視",
        "メタ情報やページ構造を整え、基本的なSEO対策を実施",
        "QRコード経由で必要書類にアクセスできるページを公開後に追加",
        "Google Sheetsを使ってサイトをCMS化し、クリニック職員が「お知らせ欄」を編集できるように実装",
      ],
      learnings:
        "公開後3か月で2,856 impressions、343 clicks、CTR約12%を達成しました。クライアントから新規患者数増加の報告もいただき、クライアント要望と利用者目線を両立したWeb開発を経験しました。",
    },
    {
      slug: "employee-attrition",
      title: "若手社員離職リスク予測モデル",
      period: "2025/08",
      background:
        "社員データを分析し、離職リスクを予測する機械学習モデルを構築しました。分析結果を人事施策につながるビジネス提案として整理しました。",
      challenges:
        "離職には勤務状況、評価、満足度、職種など複数要因が関係していました。モデルの予測結果をビジネス側にも理解できる形で説明し、精度だけでなく実際の人事施策にどう活かすかまで考える必要がありました。",
      solutions: [
        "社員データを前処理し、可視化によって離職傾向を分析",
        "分類モデルを構築し、離職リスクに関係する特徴量を確認",
        "モデル結果をもとに、リスクが高い層へのフォロー施策を提案",
        "技術的な分析を意思決定に使える形に整理",
      ],
      learnings:
        "データ分析、モデル構築、ビジネス提案までを一貫して経験しました。予測精度だけでなく、分析結果を実務にどう活かすかを学び、修了率14%の講座を無事修了しました。",
    },
    {
      slug: "rush-hour",
      title: "Rush Hour組込みシステム",
      period: "2025/03 - 2025/04",
      background:
        "DE1-SoCボード上で動作するRush Hourパズルゲームを開発しました。入力処理、VGA表示、ゲーム状態管理を統合した組込みシステムとして実装しました。",
      challenges:
        "高レベルなUIライブラリに頼らず、入力・描画・状態更新を低レイヤで管理する必要がありました。PS/2キーボード入力やVGA表示など、ハードウェアに近い処理を扱い、処理タイミングや状態管理を正確に設計することが課題でした。",
      solutions: [
        "キーボード入力をもとにゲーム内の車の移動を制御",
        "VGA出力を通じて盤面や車の状態を画面に表示",
        "車の位置、移動可能範囲、ゲーム進行状態を管理",
        "入力、描画、状態更新を分けて確認しながらデバッグ",
      ],
      learnings:
        "ハードウェア入力、画面出力、ゲームロジックを統合したアプリケーションを完成させ、低レイヤでの実装、状態管理、デバッグ経験を得ました。",
    },
    {
      slug: "utjn-website",
      title: "UTJN公式Webサイト",
      period: "2023/09 - Present",
      background:
        "University of Toronto Japan Networkの公式Webサイトを開発・保守しています。外部向け情報発信と団体内部の運用を支えるWebサイトとして改善しています。",
      challenges:
        "イベント情報や団体情報を継続的に更新できる構成が必要でした。学生団体のため運用メンバーが変わっても保守しやすく、本番環境での表示崩れや機能不具合、AWS上での運用・デプロイ・インフラ設定にも対応する必要がありました。",
      solutions: [
        "フロントエンド・バックエンドの修正を行い、表示や機能の不具合を改善",
        "AWS EC2、Route 53、Caddyを用いて本番環境でのデプロイを経験",
        "認証機能やデータ更新など、内部運用に関わる機能を実装",
        "チームで継続的に保守しやすい構成を意識して改善",
      ],
      learnings:
        "外部向け情報発信と内部運用の両方を支えるWebサイトとして保守・改善し、チーム開発、本番環境運用、インフラ管理を含むWeb開発を経験しました。",
    },
  ],
  en: [
    {
      slug: "clinic-inventory",
      featured: true,
      title: "Clinic Inventory Management System",
      period: "Jun 2026",
      background:
        "Designed and built an offline desktop application to digitize paper-based inventory and ordering workflows for an orthopedic clinic.",
      challenges:
        "The clinic managed stock counts and order history on paper, which made updates slow and error-prone. Staff also had to copy product details into order forms manually, and the clinic needed a solution that did not depend on internet access.",
      solutions: [
        "Centralized item data, inventory records, and order history inside the app",
        "Designed a click-based workflow so staff could update quantities quickly",
        "Added low-stock alerts to prevent missed orders",
        "Generated PDF order forms automatically from selected items and quantities",
        "Supported offline operation with local storage and backup features",
      ],
      learnings:
        "Reduced a workflow that previously took about 20 minutes by hand to roughly 5 minutes in the system. The app is used by 20 clinic staff members in the actual workplace.",
    },
    {
      slug: "commit-message-reviewer",
      title: "Commit Message Reviewer",
      period: "Jun 2026",
      background:
        "Built a Node.js / TypeScript CLI that reviews Git commit messages with an LLM and presents the results in both the terminal and an HTML report.",
      challenges:
        "The tool needed to combine Git history extraction, remote repository cloning, LLM evaluation, and HTML report generation into one CLI workflow. Another challenge was making LLM output stable enough to parse and compare consistently.",
      solutions: [
        "Implemented CLI options such as `--url`, `--limit`, and `--output`",
        "Used the OpenRouter API to classify each commit as `excellent`, `good`, or `bad`",
        "Validated JSON responses and added a fallback that re-evaluates commits one by one when batch output fails",
        "Generated an HTML report that can be viewed locally at `localhost:3546`",
      ],
      learnings:
        "Completed a tool that automatically reviews commit message quality and visualizes the results. The project gave me hands-on experience improving prompts, rubrics, and output validation for an LLM-powered developer tool.",
    },
    {
      slug: "gis-map",
      title: "GIS Map Application",
      period: "Jan 2025 - Apr 2025",
      background:
        "Developed a C++ GIS application with a team using OpenStreetMap data for a university course. The app includes map rendering, route search, and delivery route optimization.",
      challenges:
        "The application had to process large-scale road and intersection data efficiently. For delivery route optimization, the main challenge was balancing solution quality with runtime while integrating algorithms, UI, and data processing as a team.",
      solutions: [
        "Designed data structures to reduce unnecessary search and computation",
        "Combined route search and route improvement algorithms to optimize within practical runtime limits",
        "Implemented UI features for visually checking routes and locations on the map",
        "Split responsibilities across the team and integrated the final application",
      ],
      learnings:
        "Gained practical experience with large-scale data processing, algorithm design, and UI implementation, contributing to a 14th-place result out of 98 teams.",
    },
    {
      slug: "chest-xray",
      title: "Chest X-ray Disease Classification",
      period: "Oct 2025 - Dec 2025",
      background:
        "Built a disease classification model for a university project by combining chest X-ray images with patient metadata, focusing on multimodal learning across image and tabular data.",
      challenges:
        "The dataset was highly imbalanced across disease classes, so predictions tended to favor the majority class. Accuracy alone was not enough to evaluate minority-class performance, and I also needed to decide how to fuse image features with metadata.",
      solutions: [
        "Extracted image features with a CNN and fused them with patient metadata",
        "Experimented with focal loss, class weighting, and sampling strategies",
        "Evaluated minority-class performance using Macro F1 and class-specific Recall",
        "Compared training results to improve both model structure and evaluation approach",
      ],
      learnings:
        "Improved Macro F1 from 0.24 to 0.46 and Effusion Recall from 0.00 to 0.55. The project taught me the importance of class imbalance handling and evaluation metrics in medical AI.",
    },
    {
      slug: "appointment-system",
      featured: true,
      title: "Clinic Reservation Management System",
      period: "Jul 2026",
      background:
        "Built a reservation management system for a clinic to manage appointments and patient information, with a focus on making reception workflows easier to handle.",
      challenges:
        "The system needed to link appointment time, patient details, treatment information, and status accurately. It also had to avoid double booking during concurrent use, keep multiple devices in sync with minimal delay, and remain simple enough for a medical workplace.",
      solutions: [
        "Designed a structure that centralizes appointment data, patient information, and status",
        "Organized screens and input fields so staff can reach key information quickly",
        "Structured reservation data for easier searching, checking, and updating",
        "Designed the UI around the flow of daily reception work",
      ],
      learnings:
        "Built a system that manages appointment and patient information in one place, gaining experience with workflow-oriented UI design and practical data management.",
    },
    {
      slug: "clinic-website",
      featured: true,
      title: "Clinic Website",
      period: "May 2024 - Jul 2024",
      background:
        "Designed, developed, and launched the official website for an orthopedic clinic, covering requirements, implementation, deployment, and post-launch updates.",
      challenges:
        "The website needed to be readable and easy to navigate for older patients. I had to balance enough information to be helpful without making the pages feel crowded, while also considering SEO so the clinic could be found through search.",
      solutions: [
        "Designed clear paths to treatment information, clinic hours, and access details",
        "Adjusted typography, spacing, colors, and icons to improve readability",
        "Implemented basic SEO through metadata and page structure",
        "Added post-launch pages that patients can access through QR codes for required documents",
        "Connected Google Sheets as a lightweight CMS so non-engineer clinic staff can edit the announcements section",
      ],
      learnings:
        "Reached 2,856 impressions, 343 clicks, and about a 12% CTR within three months after launch. The client also reported an increase in new patients, giving me experience balancing client needs with real user behavior.",
    },
    {
      slug: "employee-attrition",
      title: "Employee Attrition Risk Prediction",
      period: "Aug 2025",
      background:
        "Analyzed employee data and built a machine learning model to predict attrition risk, then organized the findings as a business proposal for HR decision-making.",
      challenges:
        "Attrition was influenced by multiple factors such as work conditions, evaluations, satisfaction, and job type. The model results had to be understandable to business stakeholders, and the focus was not only accuracy but how the insights could support HR action.",
      solutions: [
        "Preprocessed employee data and visualized patterns related to attrition",
        "Built a classification model and examined features associated with attrition risk",
        "Proposed follow-up measures for higher-risk employee groups based on model results",
        "Translated technical analysis into a form usable for decision-making",
      ],
      learnings:
        "Completed the full process from data analysis and model building to business proposal design. I learned how to connect predictive results to practical use cases and completed a program with a 14% completion rate.",
    },
    {
      slug: "rush-hour",
      title: "Rush Hour Embedded System",
      period: "Mar 2025 - Apr 2025",
      background:
        "Developed a Rush Hour puzzle game running on a DE1-SoC board, integrating input handling, VGA display, and game state management as an embedded system.",
      challenges:
        "The project required managing input, rendering, and state updates at a low level without relying on high-level UI libraries. I also had to work close to the hardware through PS/2 keyboard input and VGA output while designing timing and state transitions carefully.",
      solutions: [
        "Controlled vehicle movement based on keyboard input",
        "Rendered the board and vehicle states through VGA output",
        "Managed vehicle positions, valid movement ranges, and game progress state",
        "Debugged by separating input, rendering, and state update logic",
      ],
      learnings:
        "Completed an application that integrates hardware input, screen output, and game logic, gaining experience with low-level implementation, state management, and debugging.",
    },
    {
      slug: "utjn-website",
      title: "UTJN Official Website",
      period: "Sep 2023 - Present",
      background:
        "Develop and maintain the official website for the University of Toronto Japan Network, improving it as a platform for public information and internal operations.",
      challenges:
        "The site needs to support ongoing updates for events and organization information. Because it is run by a student group, the system also needs to remain maintainable as members change, while handling production issues, deployment, and AWS infrastructure management.",
      solutions: [
        "Fixed frontend and backend issues affecting display and functionality",
        "Worked with AWS EC2, Route 53, and Caddy for production deployment",
        "Implemented internal operation features such as authentication and data updates",
        "Improved the system with team maintainability in mind",
      ],
      learnings:
        "Maintained and improved a production website that supports both public communication and internal operations, gaining experience with team development, production operations, and infrastructure management.",
    },
  ],
};

const projectTranslations = {
  ...rawTranslations,
  ja: {
    ...rawTranslations.ja,
    projects: {
      ...rawTranslations.ja.projects,
      items: projectItemsFromMarkdown.ja,
    },
  },
  en: {
    ...rawTranslations.en,
    projects: {
      ...rawTranslations.en.projects,
      items: projectItemsFromMarkdown.en,
    },
  },
};

const translations = addProjectAssets(projectTranslations);
