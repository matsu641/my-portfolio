"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
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
  const [language, setLanguage] = useState<Language>('ja');

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

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
          learnings: "Google Search Consoleの過去16か月の集計で、46,700回の表示、5,430クリック、CTR 11.6%、平均掲載順位4.9を記録しました。",
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
          learnings: "Recorded 46,700 impressions, 5,430 clicks, an 11.6% CTR, and an average position of 4.9 over the latest 16 months in Google Search Console.",
        }
      ]
    }
  }
};

const projectItemsFromMarkdown = {
  ja: [
    {
      slug: "clinic-inventory",
      title: "クリニック在庫管理システム",
      period: "2026/06",
      background:
        "整形外科クリニックの紙ベースの在庫管理・発注業務を、院内でオフライン運用できるデスクトップアプリへ移行した。",
      challenges: [
        "紙での在庫確認と注文票への転記に時間がかかり、発注ミスや在庫切れが起きていた。",
        "院内にインターネット環境がないため、保存・発注・バックアップをすべてローカルで完結させる必要があった。",
      ],
      solutions: [
        "在庫・品目・発注履歴を一元化し、クリック操作で数量を更新できる画面を設計",
        "在庫不足アラートと、選択した品目からPDF注文票を自動生成する機能を実装",
        "ローカル保存とバックアップ機能を備え、インターネットに依存しない運用を実現",
      ],
      learnings: [
        "約20名の職員が実務で利用し、約20分かかっていた発注業務を約5分に短縮した。",
        "現場の制約と既存業務を変えすぎない設計が、継続利用につながることを学んだ。",
      ],
    },
    {
      slug: "commit-message-reviewer",
      title: "Gitコミットメッセージレビューツール",
      period: "2026/06",
      background:
        "GitコミットメッセージをLLMで評価し、結果をターミナルとHTMLレポートで確認できるNode.js / TypeScript製CLIを開発した。",
      challenges:
        "Git履歴の取得からLLM評価、レポート生成までを一つの操作にまとめつつ、揺れやすいLLM出力を安定して処理する必要があった。",
      solutions: [
        "ローカル・リモートの両方に対応し、URL・件数・出力先を指定できるCLIを実装",
        "OpenRouter APIで各コミットを3段階評価し、JSON検証と再評価処理で出力を安定化",
        "評価理由を一覧できるHTMLレポートを生成し、ローカルブラウザで確認できる形に整理",
      ],
      learnings:
        "LLM機能ではAPI連携だけでなく、評価基準・プロンプト・出力検証まで設計することが信頼性につながると学んだ。",
    },
    {
      slug: "gis-map",
      title: "GISマップアプリケーション",
      period: "2025/01 - 2025/04",
      background:
        "大学の授業の3人チームプロジェクトで、OpenStreetMapのデータとC++を用いたGISアプリケーションを開発した。",
      challenges:
        "都市規模の道路データを高速に処理しながら、配送ルートの精度と計算時間を両立し、各メンバーの実装を一つのアプリに統合する必要があった。",
      solutions: [
        "チームで探索向けのデータ構造を整え、不要な計算を削減",
        "経路探索とルート改善のアルゴリズムはチーム全員で実装し、実用的な時間内で配送経路を最適化",
        "左側のサイドバーを実装し、車・徒歩の移動手段を切り替えて経路と所要時間を確認できるようにした",
        "検索バーと画面左下の縮尺表示を実装し、地点の検索と地図上の距離の把握をしやすくした",
      ],
      learnings: [
        "アルゴリズムとUIを一体で改善し、授業内リーダーボードで98チーム中14位を達成した。",
        "最終プレゼンテーションを完了し、プロジェクトの合格評価を得た。",
      ],
    },
    {
      slug: "chest-xray",
      title: "胸部X線画像の疾患分類モデル",
      period: "2025/10 - 2025/12",
      background: [
        "大学の授業の個人プロジェクトとして取り組んだ。",
        "胸部X線画像と患者メタデータを組み合わせ、4クラスの疾患を分類するマルチモーダルモデルを構築した。",
      ],
      challenges: [
        "データの約93%が多数派クラスに偏っていたため、Accuracyだけでは少数クラスの検出性能を評価できなかった。",
        "ファイナルプロジェクトで開発期間が限られ、有料GPUを利用できなかったため、無料枠の実行環境と限られた計算資源の中でモデルの性能を改善する必要があった。",
      ],
      solutions: [
        "CNNで画像特徴量を抽出し、患者メタデータと統合",
        "Focal Loss、クラス重み、サンプリングを比較し、クラス不均衡への対応を検証",
        "Macro F1とクラス別Recallを基準に、モデル構成と学習方法を改善",
      ],
      learnings: [
        "Macro F1を0.24から0.46、EffusionのRecallを0.00から0.55へ改善した。",
        "最終評価で約90%を獲得し、合格評価を得た。",
      ],
    },
    {
      slug: "appointment-system",
      featured: true,
      title: "リハビリ予約管理システム",
      period: "2026/07 - 現在",
      background: [
        "1日約300名が来院する整形外科クリニックの依頼を受け、クリニックの予約管理システムを構築した。",
        "要件整理から設計・実装、導入時の操作説明、運用後の改善まで個人で一貫して担当した。",
      ],
      challenges: [
        "旧システムでは予約を入力できる端末が1台しかなく、特定の職員に作業が集中していた。",
        "画面の操作も分かりづらく、入力ミスや患者の待ち時間が課題だった。",
        "患者情報を扱うため、インターネット接続なしで使える院内システムが必要だった。",
      ],
      solutions: [
        "複数端末での予約管理　院内にサーバーを設置し、5台の端末から予約や患者記録を確認・更新できるようにした。同時に操作しても、同じ時間枠への二重予約を防ぐ仕組みを実装した。",
        "セキュリティ対策　インターネットから切り離した院内LAN上で運用し、通信を暗号化した。新しい端末は、メインサーバーの管理画面で発行される6桁の一時コードによる承認後のみ、アプリにアクセスできる仕組みにした。",
        "無線LAN障害時の業務継続　サーバー本体をルーターに有線接続し、無線LANが停止して他の端末から操作できない場合でも、サーバー本体では業務を継続できる構成にした。",
      ],
      learnings: [
        "複数端末から操作できるようになったことで、特定の職員に集中していた予約・記録業務の負担を分散できた。",
        "導入後、クリニックの職員からは、1日の業務終了が平均で約30分早まったことや、以前のシステムより操作しやすくなったとの声をいただいた。",
      ],
    },
    {
      slug: "clinic-website",
      title: "クリニックWebサイト",
      period: "2024/05 - 2024/07",
      background:
        "整形外科クリニックの公式Webサイトを、要件整理から設計・実装・公開後の改善まで一貫して担当した。",
      challenges:
        "高齢の患者にも読みやすい情報設計と、検索から必要な情報へ到達できるSEOを両立する必要があった。",
      solutions: [
        "診療内容・診療時間・アクセスへの導線と、文字サイズ・余白・配色を高齢者の利用を想定して設計",
        "メタ情報とページ構造を整え、検索流入を意識したSEOを実施",
        "Google SheetsをCMSとして接続し、職員がお知らせを更新できる仕組みと、必要書類へのQR導線を追加",
      ],
      learnings:
        "公開後16か月で46,700回表示、5,430クリック、CTR 11.6%、平均掲載順位4.9を記録した。新規患者の増加も報告され、利用者と運用者の双方を考えた設計の効果を確認できた。",
    },
    {
      slug: "employee-attrition",
      title: "若手社員離職リスク予測モデル",
      period: "2025/08",
      background: [
        "松尾研究室のGCI 2025 Summerの最終課題として取り組んだ。",
        "社員データから離職リスクを予測し、分析結果を人事施策につながる提案としてまとめた。",
      ],
      challenges: [
        "企業データだけが与えられ、分析対象や解くべき課題は定められていなかったため、データから企業の問題を発見し、検証する課題仮説を立てる必要があった。",
        "モデルの結果だけでなく、市場調査や外部情報も根拠として、背景から施策まで一貫した提案にまとめる必要があった。",
      ],
      solutions: [
        "課題の発見　与えられたデータを分析・可視化し、勤務状況・評価・満足度・職種・年齢などと離職の関係を整理した。",
        "仮説と予測モデル　若手社員の離職リスクと相関する項目から課題仮説を立て、離職を予測する分類モデルを構築した。",
        "提案資料　市場調査と外部情報で背景と根拠を補い、分析結果・モデル・施策を提案スライドにまとめた。",
      ],
      learnings:
        "最終課題を完了し、修了率14%の講座で修了認定を得た。",
    },
    {
      slug: "rush-hour",
      title: "Rush Hour組込みシステム",
      period: "2025/03 - 2025/04",
      background: [
        "大学の授業の2人チームプロジェクトで、DE1-SoCボード上で動作するRush HourパズルゲームをC言語で実装した。",
        "私はゲームロジックとタイマー、チームメイトは画面描画とキーボード入力を担当した。",
      ],
      challenges:
        "UIライブラリを使わず、PS/2キーボード入力、VGA描画、ゲーム状態の更新を低レイヤで正確に連携させる必要があった。",
      solutions: [
        "ゲームロジック　車同士の衝突を判定し、ほかの車にぶつかる方向へは移動できないように制御した。赤い車が盤面外へ出たときに「Success」を表示するクリア判定も実装した。",
        "タイマー　FPGAボード上のタイマーを実装し、ゲーム開始からクリアまでにかかった時間を計測・表示できるようにした。",
      ],
      learnings:
        "最終プロジェクトとしてゲームを完成させ、合格評価を得た。",
    },
    {
      slug: "utjn-website",
      title: "UTJN公式Webサイト",
      period: "2023/09 - Present",
      background: [
        "トロント大学の日本人学生団体UTJNの技術部門に所属し、6人チームで公式Webサイトを開発・運用している。",
        "メンバーとして割り当てられた開発タスクを担当し、チームミーティングではサイトの問題点や改善案を共有している。",
      ],
      challenges: [
        "イベント開催時にアクセスが集中するとサーバーが停止することがあり、限られた予算内で安定性と運用コストを両立する必要があった。",
        "複数メンバーが継続的に開発するため、変更時の不具合を早期に検出できる仕組みも必要だった。",
      ],
      solutions: [
        "サイトのデプロイ　AWS EC2、Route 53、Caddyを用いて公式Webサイトをデプロイした。",
        "アクセス集中への対応　イベント開催時はEC2インスタンスを拡大し、通常時は縮小することで、限られた予算内で安定性とコストを両立した。",
        "CIテストの導入　コード変更時にテストを自動実行する仕組みを導入し、不具合を早期に検出できるようにした。",
      ],
      learnings: [
        "イベント時のアクセス増加に対応しながら、通常時のインフラコストを抑える運用体制を整えた。",
        "デプロイとCIテストの導入を通じ、チームが継続的に開発・運用できる基盤を改善した。",
      ],
    },
  ],
  en: [
    {
      slug: "clinic-inventory",
      title: "Clinic Inventory Management System",
      period: "Jun 2026",
      background:
        "Designed and built an offline desktop application to digitize paper-based inventory and ordering workflows for an orthopedic clinic.",
      challenges: [
        "Paper-based stock checks and manual order-form entry were slow and led to ordering errors and unexpected shortages.",
        "Because the clinic has no internet connection, storage, ordering, and backups had to work entirely offline.",
      ],
      solutions: [
        "Centralized items, stock records, and order history with a click-based quantity workflow",
        "Added low-stock alerts and automatic PDF order-form generation",
        "Supported fully offline operation through local storage and backups",
      ],
      learnings: [
        "Deployed the app to around 20 staff members and reduced the ordering workflow from about 20 minutes to roughly 5 minutes.",
        "Learned that fitting existing workflows and operational constraints is essential for sustained adoption.",
      ],
    },
    {
      slug: "commit-message-reviewer",
      title: "Commit Message Reviewer",
      period: "Jun 2026",
      background:
        "Built a Node.js / TypeScript CLI that uses an LLM to evaluate Git commit messages and presents the results in the terminal and an HTML report.",
      challenges:
        "The tool had to combine Git history extraction, LLM evaluation, and report generation in one workflow while handling inconsistent model output reliably.",
      solutions: [
        "Supported local and remote repositories with options for repository URL, commit count, and output path",
        "Used OpenRouter to rate each commit on a three-level rubric, adding JSON validation and per-item retries",
        "Generated a local HTML report that makes ratings and explanations easy to compare",
      ],
      learnings:
        "Learned that a reliable LLM feature requires careful rubric, prompt, and output-validation design—not just API integration.",
    },
    {
      slug: "gis-map",
      title: "GIS Map Application",
      period: "Jan 2025 - Apr 2025",
      background:
        "Developed a C++ GIS application with a three-person team using OpenStreetMap data. I focused on route search and map UI improvements.",
      challenges:
        "We had to process city-scale road data efficiently, balance delivery-route quality with runtime, and integrate each member's work into one application.",
      solutions: [
        "Structured map data to reduce unnecessary search and computation",
        "Combined route search and improvement algorithms to optimize within practical runtime limits",
        "Implemented route visualization and integrated the team's algorithm, UI, and data-processing work",
      ],
      learnings:
        "Improved the algorithm and UI as one product, contributing to a 14th-place result out of 98 teams.",
    },
    {
      slug: "chest-xray",
      title: "Chest X-ray Disease Classification",
      period: "Oct 2025 - Dec 2025",
      background:
        "Built a multimodal model that combines chest X-rays with patient metadata for four-class disease classification.",
      challenges:
        "About 93% of the data belonged to the majority class, so accuracy alone could not represent minority-class detection performance.",
      solutions: [
        "Extracted image features with a CNN and fused them with patient metadata",
        "Compared focal loss, class weighting, and sampling strategies for class imbalance",
        "Improved the model using Macro F1 and class-specific Recall rather than accuracy alone",
      ],
      learnings:
        "Improved Macro F1 from 0.24 to 0.46 and Effusion Recall from 0.00 to 0.55, reinforcing the importance of task-appropriate metrics for imbalanced data.",
    },
    {
      slug: "appointment-system",
      featured: true,
      title: "Rehabilitation Appointment Management System",
      period: "Jul 2026 - Present",
      background:
        "Designed and built an on-premises system that centralizes appointments and patient records for an orthopedic clinic serving about 300 patients per day. Around 20 staff members use it in daily operations.",
      challenges: [
        "On-site observation and interviews revealed that booking was concentrated on a few devices, creating wait times, while patient records were managed separately.",
        "Concurrent use across PCs and iPads required conflict prevention, on-premises data protection, and safe behavior during connectivity problems.",
      ],
      solutions: [
        "Built a React, Fastify, PostgreSQL, and Electron system that shares appointments, patient data, and rehabilitation records across clinic devices",
        "Combined unique constraints, serializable transactions, and optimistic locking to prevent concurrent booking conflicts",
        "Implemented device approval, HTTPS, audit logs, backups, and outage-safe synchronization for production use",
        "Continued improving the UI and features from staff feedback and real production incidents",
      ],
      learnings: [
        "Enabled receptionists, physical therapists, nurses, and physicians to review and update appointments and patient records from their work areas.",
        "Owned the lifecycle from discovery and requirements through design, implementation, rollout, training, incident response, and continuous improvement, learning that post-launch iteration is essential for sustained use.",
      ],
    },
    {
      slug: "clinic-website",
      title: "Clinic Website",
      period: "May 2024 - Jul 2024",
      background:
        "Owned the orthopedic clinic website from requirements and design through implementation, launch, and post-launch improvements.",
      challenges:
        "The site had to remain readable for older patients while helping people find the right information through search.",
      solutions: [
        "Designed clear paths to treatment, hours, and access information with accessible typography, spacing, and color",
        "Structured metadata and pages for search visibility",
        "Connected Google Sheets as a lightweight CMS and added QR-based access to required documents",
      ],
      learnings:
        "Over 16 months, the site recorded 46,700 impressions, 5,430 clicks, an 11.6% CTR, and an average position of 4.9. The client also reported an increase in new patients, validating the user- and operator-centered design.",
    },
    {
      slug: "employee-attrition",
      title: "Employee Attrition Risk Prediction",
      period: "Aug 2025",
      background:
        "Predicted employee attrition risk and translated the analysis into an HR-focused business proposal.",
      challenges:
        "The analysis had to organize interacting factors such as work conditions, evaluations, satisfaction, and job type, then explain the results in a form HR stakeholders could act on.",
      solutions: [
        "Preprocessed and visualized the data, then built a classifier to identify attrition-related features",
        "Identified higher-risk groups and proposed targeted follow-up measures",
        "Connected the analysis, model results, and recommendations in a decision-maker presentation",
      ],
      learnings:
        "Completed the full process from analysis and modeling to recommendation design, finishing a program with a 14% completion rate. I learned to translate predictive results into practical decisions, not just report model performance.",
    },
    {
      slug: "rush-hour",
      title: "Rush Hour Embedded System",
      period: "Mar 2025 - Apr 2025",
      background:
        "Implemented a Rush Hour puzzle game in C on a DE1-SoC board.",
      challenges:
        "Without high-level UI libraries, PS/2 input, VGA rendering, and game-state updates had to work together reliably at a low level.",
      solutions: [
        "Used PS/2 input and interrupts to control vehicle selection and movement",
        "Managed the board, vehicles, and game state while rendering updates through VGA",
        "Separated input, state updates, and rendering to debug hardware-level behavior incrementally",
      ],
      learnings:
        "Completed the integrated game and gained hands-on experience with interrupts, memory-mapped I/O, state management, and low-level debugging.",
    },
    {
      slug: "utjn-website",
      title: "UTJN Official Website",
      period: "Sep 2023 - Present",
      background:
        "Develop and operate the University of Toronto Japan Network's official website with a student team.",
      challenges:
        "The site had to remain maintainable as student members changed while supporting feature work, production issues, deployment, and AWS operations.",
      solutions: [
        "Fixed frontend and backend issues and implemented authentication and data-management features",
        "Handled deployment and production maintenance with AWS EC2, Route 53, and Caddy",
        "Improved the codebase and workflow so future team members could continue operating it",
      ],
      learnings:
        "Continuously improved both the public site and internal operations, gaining experience across team development, production support, and infrastructure management.",
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
