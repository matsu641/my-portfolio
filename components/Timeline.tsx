"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { IconType } from "react-icons";
import { FaBaby, FaCanadianMapleLeaf, FaGraduationCap, FaPlaneDeparture, FaRobot } from "react-icons/fa6";
import { HiOutlineCodeBracket } from "react-icons/hi2";
import { LuRocket } from "react-icons/lu";
import { useLanguage } from "@/contexts/LanguageContext";

type LocalizedText = { ja: string; en: string };
type TimelinePhoto = {
  src: string;
  alt: LocalizedText;
  orientation?: "landscape" | "portrait";
  position?: string;
  rotate?: number;
};
type TimelineItem = {
  year: string;
  title: LocalizedText;
  description: LocalizedText;
  icon: IconType;
  photos?: TimelinePhoto[];
};

const timelineItems: TimelineItem[] = [
  {
    year: "2004",
    title: { ja: "誕生", en: "Born" },
    description: {
      ja: "群馬県で生まれ育つ。\n自然大好きな子供に育つ。",
      en: "Born in Gunma, Japan.\nBack then, my only bug was crying.",
    },
    icon: FaBaby,
    photos: [{ src: "/timeline/gunma_nature.jpg", alt: { ja: "群馬の自然", en: "Nature in Gunma" }, rotate: 2 }],
  },
  {
    year: "2019",
    title: { ja: "工学との出会い", en: "My first encounter with engineering" },
    description: {
      ja: "CMで見た組み立て式ロボットを毎号集める。\nパーツが少しずつ動くロボットになっていく過程に夢中になり、初めて「工学って面白いかも」と思う。",
      en: "I collected every issue of a build-it-yourself robot I saw on TV.\nFor the first time, I thought engineering might be fun.",
    },
    icon: FaRobot,
    photos: [{ src: "/timeline/robot.jpg", alt: { ja: "組み立てロボット", en: "The robot I built" }, rotate: -4 }],
  },
  {
    year: "2020",
    title: { ja: "日本の高校を辞めて、アメリカへ", en: "Leaving high school in Japan for the U.S." },
    description: {
      ja: "日本の高校を中退し、最低気温-30℃のど田舎へアメリカ留学。\nコロナ下で、英語サバイバル生活を開始。\n\nGoogle翻訳が相棒。\nそして、日本食のありがたみを知る。",
      en: "I left high school in Japan and moved to a small American town of a few thousand people. In a place where cows seemed to outnumber people, my English survival life began.\n\nGoogle Translate became my closest companion—and I learned to truly appreciate Japanese food.",
    },
    icon: FaPlaneDeparture,
    photos: [
      { src: "/timeline/us_food.jpg", alt: { ja: "アメリカでの食事", en: "Food in the U.S." }, orientation: "portrait", rotate: -2 },
      { src: "/timeline/toeflscore.JPG", alt: { ja: "英語学習の記録", en: "A milestone in learning English" }, rotate: 4 },
      { src: "/timeline/us_snow.jpg", alt: { ja: "アメリカの雪", en: "Snow in the U.S." }, rotate: 3 },
    ],
  },
  {
    year: "May 2023",
    title: { ja: "アメリカの高校を無事卒業", en: "Graduating from high school in the U.S." },
    description: {
      ja: "言語も文化も異なる環境で、なんとか卒業までたどり着く。\n\n身につけた英語力、工学の基礎、そして新しい環境に飛び込む力は、一生の財産になった。",
      en: "In an environment with a different language and culture, I made it all the way to graduation.\n\nThe English skills, engineering foundations, and courage to step into new environments became lifelong assets.",
    },
    icon: FaGraduationCap,
    photos: [
      { src: "/timeline/us_graduation.JPG", alt: { ja: "アメリカの高校卒業", en: "High school graduation in the U.S." }, orientation: "portrait", rotate: -4 },
      { src: "/timeline/us_robot.jpg", alt: { ja: "高校での工学制作", en: "An engineering project in high school" }, rotate: 2 },
      { src: "/timeline/us_bridge.JPG", alt: { ja: "高校での工学制作", en: "An engineering project in high school" }, rotate: 3 },
      { src: "/timeline/us_friends.JPG", alt: { ja: "アメリカの友人たち", en: "Friends in the U.S." }, rotate: 5 },
    ],
  },
  {
    year: "September 2023",
    title: { ja: "University of Torontoへ", en: "University of Toronto" },
    description: {
      ja: "Computer Engineeringを専攻。\n\n初めてのカナダ、初めての大都会。\n新しい環境に慣れることにも、想像以上にレベルの高い周囲にも苦戦する。\n\nトロントの冬は極寒だったが、アメリカで鍛えられていたので、そこだけは余裕だった。",
      en: "I began majoring in Computer Engineering.\n\nIt was my first time in Canada and my first time living in a major city. Adapting to the new environment—and the incredibly talented people around me—was harder than expected.\n\nToronto winters were freezing, but after experiencing −30°C in the U.S., that was the one part I was ready for.",
    },
    icon: FaCanadianMapleLeaf,
    photos: [
      { src: "/timeline/uoft_building.jpg", alt: { ja: "トロント大学の校舎", en: "University of Toronto campus" }, rotate: -3 },
      { src: "/timeline/uoft_coursework.JPG", alt: { ja: "トロント大学での課題", en: "Coursework at the University of Toronto" }, rotate: 4 },
      // { src: "/timeline/uoft_coursework2.JPG", alt: { ja: "トロント大学での課題", en: "Coursework at the University of Toronto" }, rotate: 4 },
      // { src: "/timeline/uoft_coursework3.PNG", alt: { ja: "トロント大学での課題", en: "Coursework at the University of Toronto" }, rotate: 4 },
      { src: "/timeline/uoft_coursework4.JPG", alt: { ja: "トロント大学での課題", en: "Coursework at the University of Toronto" }, rotate: 4 },
      { src: "/timeline/uoft_snow.png", alt: { ja: "トロントの雪", en: "Snow in Toronto" }, rotate: 4 },   
    ],
  },
  {
    year: "2024–Present",
    title: { ja: "Software / AI Engineerとして修行中", en: "Training as a Software / AI Engineer" },
    description: {
      ja: "インターンやフリーランスを通して、フルスタックWeb開発を経験。現場の問題を聞き、アイデアを実際に使えるプロダクトへ変える面白さを知る。\n\nそして、\n「技術の力で、人の役に立つものを作りたい」\nという軸が少しずつ固まっていく。",
      en: "Through internships and freelance work, I gained experience in full-stack web development.\n\nI discovered how rewarding it is to listen to real problems and turn ideas into products people can actually use.\n\nMy purpose gradually became clear: I want to build things that help people through technology.",
    },
    icon: HiOutlineCodeBracket,
    photos: [
      { src: "/timeline/engineer.jpeg", alt: { ja: "エンジニアSTICKER", en: "engineer sticker" }, orientation: "portrait",rotate: 2 },
    ],
  },
  {
    year: "September 2026 — Coming Soon!!",
    title: { ja: "カナダ企業でSoftware Engineer", en: "Software Engineer at a Canadian company" },
    description: {
      ja: "初めての海外企業でフルタイム勤務。ワクワク！",
      en: "My first international company and my first full-time role.\n\nThe next stage is to apply everything I have learned to real products and users.",
    },
    icon: FaCanadianMapleLeaf,
  },
  {
    year: "Future",
    title: { ja: "Still Building", en: "Still Building" },
    description: {
      ja: "まだ作っていないものも、\nまだ解決されていない問題もたくさんある。\n\n次は、どんな問題をプロダクトに変えよう？",
      en: "There is still so much I have not built, and so many problems left unsolved.\n\nWhat problem should I turn into a product next?",
    },
    icon: LuRocket,
  },
];

function PhotoCloud({ photos, language, side }: { photos: TimelinePhoto[]; language: "ja" | "en"; side: "left" | "right" }) {
  const isSingle = photos.length === 1;

  return (
    <div
      className={`relative hidden gap-4 md:grid ${
        isSingle ? "min-h-56 place-items-center" : "min-h-80 grid-cols-2 content-center"
      } ${side === "left" ? "md:col-start-1" : "md:col-start-2"}`}
    >
      {photos.map((photo, photoIndex) => {
        const isPortrait = photo.orientation === "portrait";
        return (
          <motion.figure
            key={photo.src}
            initial={{ opacity: 0, y: 30, scale: 0.75, rotate: 0, filter: "blur(16px)" }}
            whileInView={{ opacity: 1, y: 0, scale: 1, rotate: photo.rotate ?? 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.12 + photoIndex * 0.09, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.055, rotate: 0, zIndex: 20 }}
            className={`relative overflow-hidden rounded-xl border-[5px] border-white bg-white shadow-[0_16px_38px_rgba(35,55,47,0.2)] dark:border-[#252b28] dark:bg-[#252b28] ${
              isSingle
                ? isPortrait
                  ? "h-64 w-44"
                  : "h-52 w-[88%]"
                : isPortrait
                  ? "h-52 w-36 justify-self-center"
                  : "h-36 w-full"
            } ${photo.position ?? ""}`}
          >
            <Image src={photo.src} alt={photo.alt[language]} fill sizes="360px" className="object-cover" />
          </motion.figure>
        );
      })}
    </div>
  );
}

export default function Timeline() {
  const { language } = useLanguage();

  return (
    <section className="relative overflow-hidden px-5 pb-28 pt-28 md:px-8">
      <div className="pointer-events-none absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full bg-[#dfeae4]/55 blur-3xl dark:bg-[#68887b]/10" />
      <header className="relative mx-auto max-w-3xl text-center">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#68887b] dark:text-[#9bb8aa]">Timeline</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-6xl">My Journey So Far</h1>
        <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#68706c] dark:text-[#a9b5af] md:text-base">
          {language === "ja" ? "これまでの歩みと、これから。" : "The path so far — and what comes next."}
        </p>
      </header>

      <div className="relative mx-auto mt-20 max-w-6xl">
        <div className="absolute bottom-8 left-5 top-5 w-px bg-[#cbd9d2] md:left-1/2 md:-translate-x-1/2 dark:bg-white/15" />
        <div className="space-y-14 md:space-y-20">
          {timelineItems.map((item, index) => {
            const cardSide = index % 2 === 0 ? "right" : "left";
            const photoSide = cardSide === "right" ? "left" : "right";
            const Icon = item.icon;
            return (
              <div key={`${item.year}-${item.title.en}`} className="relative md:grid md:min-h-48 md:grid-cols-2 md:items-center md:gap-20">
                <span className="absolute left-5 top-9 z-30 h-3.5 w-3.5 -translate-x-1/2 rounded-full bg-[#68887b] ring-[7px] ring-[#fbfbfa] md:left-1/2 dark:bg-[#9bb8aa] dark:ring-[#111312]" />
                {item.photos && <PhotoCloud photos={item.photos} language={language} side={photoSide} />}
                <motion.article
                  initial={{ opacity: 0, y: 42, scale: 0.92, filter: "blur(20px)" }}
                  whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                  viewport={{ once: true, amount: 0.28 }}
                  transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                  className={`ml-12 rounded-2xl border border-black/10 bg-white p-6 shadow-[0_14px_45px_rgba(39,58,50,0.08)] md:ml-0 md:p-7 dark:border-white/10 dark:bg-[#171b19] ${cardSide === "right" ? "md:col-start-2" : "md:col-start-1 md:row-start-1"}`}
                >
                  <p className="text-sm font-bold tracking-wide text-[#68887b] dark:text-[#9bb8aa]">{item.year}</p>
                  <div className="mt-3 flex items-start gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#edf3ef] text-[#68887b] dark:bg-[#222a26] dark:text-[#9bb8aa]" aria-hidden="true">
                      <Icon className="h-6 w-6" />
                    </span>
                    <div>
                      <h2 className="text-lg font-bold md:text-xl">{item.title[language]}</h2>
                      <p className="mt-2 whitespace-pre-line text-sm leading-7 text-[#5f6662] dark:text-[#b9c5bf]">{item.description[language]}</p>
                    </div>
                  </div>
                </motion.article>
                {item.photos && (
                  <div className="relative z-20 ml-16 mt-[-6px] flex h-24 items-start gap-2 md:hidden">
                    {item.photos.slice(0, 3).map((photo, photoIndex) => (
                      <motion.figure
                        key={photo.src}
                        initial={{ opacity: 0, y: 20, scale: 0.75, filter: "blur(12px)" }}
                        whileInView={{ opacity: 1, y: photoIndex % 2 ? 12 : 0, scale: 1, rotate: photo.rotate ?? 0, filter: "blur(0px)" }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.65, delay: 0.12 + photoIndex * 0.08, ease: [0.16, 1, 0.3, 1] }}
                        className={`relative min-w-0 overflow-hidden rounded-lg border-[3px] border-white bg-white shadow-lg dark:border-[#252b28] ${photo.orientation === "portrait" ? "h-28 max-w-20 flex-[0_0_5rem]" : "h-24 flex-1"}`}
                      >
                        <Image src={photo.src} alt={photo.alt[language]} fill sizes="30vw" className="object-cover" />
                      </motion.figure>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
