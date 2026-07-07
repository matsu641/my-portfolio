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

const translations = addProjectAssets(rawTranslations);
