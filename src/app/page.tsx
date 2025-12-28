"use client";

import { useState, useRef, useEffect } from "react"; // useRef, useEffect を追加
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import Link from "next/link";

// --- 【追加】ゲームモードの詳細データ ---
const gameModeDetails = [
  {
    id: "duo",
    title: "二人対戦 (Duo Battle)",
    subtitle: "究極の心理戦",
    emoji: "⚔️",
    color: "text-red-500",
    bg: "bg-red-50",
    description: "pAIntの基本モード。友達や家族と、お互いが描いたイキモノで真剣勝負！相手のタイプを予想し、読み勝った時の快感は格別です。対戦相手がいるからこそ生まれる熱狂を楽しもう。"
  },
  {
    id: "solo",
    title: "一人対戦 (Solo Battle)",
    subtitle: "過去の強敵に挑む",
    emoji: "🤖",
    color: "text-blue-500",
    bg: "bg-blue-50",
    description: "一人でもCPUと対戦が可能！CPUが使うのは「過去に他のユーザが描いたイキモノ」です。ランダムに選ばれる強敵たちと戦うことで、自分にはなかった新しい描き方やAIの判断基準を学ぶことができます。"
  },
  {
    id: "quick",
    title: "お絵描きのみ (Quick)",
    subtitle: "短い時間でも大満足",
    emoji: "🎨",
    color: "text-yellow-600",
    bg: "bg-yellow-50",
    description: "「バトルをする時間がない...」という人のためのスピード体験モード。描いた後にAIが即座に分析し、図鑑を生成します。AIの分析待ち時間は、過去のユーザが描いた図鑑一覧を眺めて楽しむことができる、無駄のない設計です。"
  }
];

// --- モーダル用の詳細データ ---
const howToPlayDetails = [
  {
    id: 1,
    title: "描く (Draw)",
    color: "text-red-500",
    borderColor: "border-red-500",
    video: "/videos/step1_demo.mp4", // 動画ファイルのパス
    description: "キャンバスに自由にイキモノを描いてみよう！描き終わるとAIがリアルタイムで画像を解析。「〇〇っぽい名前」「この足の形は陸タイプ」といったように、見た目から「名前」「タイプ」、さらに「3つの技名」を考えてくれるぞ。"
  },
  {
    id: 2,
    title: "戦う (Battle)",
    color: "text-blue-500",
    borderColor: "border-blue-500",
    video: "/videos/step2_demo.mp4",
    description: "ジャンケンをベースにした戦略バトル！　「陸がグー、空がチョキ、海がパー」に対応しており、使う技と相手のタイプによって威力が変わるぞ。さらに、自分のタイプと同じ技を使うと威力がアップ。相手の見た目からタイプを予想して、有利な技を叩き込め！"
  },
  {
    id: 3,
    title: "集める (Get)",
    color: "text-yellow-500",
    borderColor: "border-yellow-500",
    video: "/videos/step3_demo.mp4",
    description: "バトルが終わったら、キミのイキモノが世界に一冊の『図鑑』になるぞ。図鑑にはAIからの説明もあるぞ。表示されたQRコードをスマホで読み取れば、公式LINEから画像を保存可能。友達と見せ合ったり、次回のバトルの研究に役立てよう！"
  }
];

// --- 図鑑のサンプルデータ ---
const monsters = [
  { id: 1, name: "マグマザウルス", type: "陸", image: "/images/monster1.png", color: "bg-red-100 text-red-600" },
  { id: 2, name: "スプラッシュドラコ", type: "海", image: "/images/monster2.png", color: "bg-blue-100 text-blue-600" },
  { id: 3, name: "サンダーグリフォン", type: "空", image: "/images/monster3.png", color: "bg-yellow-100 text-yellow-600" },
  { id: 4, name: "ロックゴーレム", type: "海", image: "/images/monster4.png", color: "bg-red-100 text-red-600" },
  { id: 5, name: "アクアサーペント", type: "海", image: "/images/monster5.png", color: "bg-blue-100 text-blue-600" },
];

// --- グラフ用データ ---
const satisfactionData = [{ name: "満足", value: 90 }, { name: "その他", value: 10 }];
const COLORS = ["#ffcc00", "#e2e8f0"];

// --- 実績写真データ ---
const achievementPhotos = [
  { src: "/images/event2.png", alt: "イベントで遊ぶ参加者", caption: "オープンキャンパスでの様子" },
  { src: "/images/event2.jpg", alt: "コンテスト受賞", caption: "技育博2025(vol.2) 企業賞受賞" },
  { src: "/images/event3.jpg", alt: "廊下での展示", caption: "一から筐体を手作り" },
];


export default function Home() {
  const [showIntro, setShowIntro] = useState(true); // イントロ全体の表示フラグ
  const [isZooming, setIsZooming] = useState(false); // ズーム開始のトリガー

  // 【修正】自動ズームの useEffect は削除、または初期表示のフェードインのみに変更
  useEffect(() => {
    // ページ読み込み時に何か初期化が必要ならここで行う
  }, []);

  // ズーム終了後にイントロUIを完全に削除するハンドラ
  const handleIntroComplete = () => {
    setShowIntro(false);
  };
  const handleStart = () => {
    if (!isZooming) {
      setIsZooming(true);
    }
  };

  const [selectedStep, setSelectedStep] = useState<number | null>(null);
  const [selectedMode, setSelectedMode] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPvOpen, setIsPvOpen] = useState(false); // 【追加】PVモーダル用
  // --- 【追加】PVの比率を管理するState ---
  const [pvAspectRatio, setPvAspectRatio] = useState<number>(16 / 9);

  // 動画読み込み時に比率を計算するハンドラ
  const handleVideoLoad = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    const video = e.currentTarget;
    if (video.videoWidth && video.videoHeight) {
      setPvAspectRatio(video.videoWidth / video.videoHeight);
    }
  };
  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 100], [0, 0.9]);
  const headerY = useTransform(scrollY, [0, 100], [-20, 0]);

  // 実績カウンターが表示されたらアニメーション開始するためのフック
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  // --- 追加：図鑑セクションの制御用 ---
  const galleryRef = useRef<HTMLDivElement>(null);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const autoScrollTimerRef = useRef<NodeJS.Timeout | null>(null);

  // 自動スクロールの処理
  useEffect(() => {
    const container = galleryRef.current;
    if (!container) return;

    let animationFrameId: number;

    const scroll = () => {
      // ユーザー操作中は自動スクロールを停止
      if (isUserInteracting) {
        animationFrameId = requestAnimationFrame(scroll);
        return;
      }

      // 1フレームごとに少しずつ右へスクロール（速度はここで調整）
      container.scrollLeft += 1.5; 

      // 簡易的な無限ループ処理：右端付近まで来たら先頭に戻す
      if (container.scrollLeft >= container.scrollWidth / 2) {
         container.scrollTo({ left: 0, behavior: 'auto' }); // 瞬時に戻す
      }

      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isUserInteracting]);

  // ユーザー操作開始
  const handleInteractionStart = () => {
    setIsUserInteracting(true);
    if (autoScrollTimerRef.current) clearTimeout(autoScrollTimerRef.current);
  };

  // ユーザー操作終了（少し待ってから自動再開）
  const handleInteractionEnd = () => {
    autoScrollTimerRef.current = setTimeout(() => {
        setIsUserInteracting(false);
    }, 1500);
  };
  // ------------------------------------

  return (
    <main className="min-h-screen overflow-x-hidden bg-slate-50 selection:bg-yellow-200 selection:text-slate-900">
{/* --- 【修正版】没入型イントロオーバーレイ（確実に動く最適化） --- */}
<AnimatePresence>
  {showIntro && (
    <motion.div
      key="intro-overlay"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-white overflow-hidden"
      style={{ backfaceVisibility: "hidden" }}
    >
      {/* 1. 背景の浮遊粒子：位置を style(left/top) で固定し、x/y で揺らす */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[
          { color: "bg-red-500", size: "w-72 h-72", x: "15%", y: "20%", d: 12, move: 40 },
          { color: "bg-blue-500", size: "w-96 h-96", x: "75%", y: "15%", d: 15, move: -50 },
          { color: "bg-yellow-500", size: "w-80 h-80", x: "25%", y: "65%", d: 18, move: 30 },
          { color: "bg-red-400", size: "w-56 h-56", x: "85%", y: "75%", d: 10, move: -20 },
          { color: "bg-blue-400", size: "w-[400px] h-[400px]", x: "45%", y: "85%", d: 20, move: 60 },
          { color: "bg-yellow-400", size: "w-64 h-64", x: "55%", y: "10%", d: 14, move: -40 },
        ].map((p, i) => (
          <motion.div
            key={i}
            // style で初期位置を画面全体に散らす
            style={{ left: p.x, top: p.y }}
            className={`absolute ${p.color} ${p.size} rounded-full blur-[80px]`}
            initial={{ opacity: 0, scale: 1 }}
            animate={isZooming ? {
              // ズーム時は画面中央付近へ吸い込まれる
              left: "50%",
              top: "38%",
              scale: 0,
              opacity: 0,
              transition: { duration: 1.5, ease: "circIn" }
            } : {
              // 待機時：ホワホワと移動・明滅
              opacity: [0.3, 0.6, 0.3],
              x: [0, p.move, 0], // move値を使って個別に揺らす
              y: [0, -p.move, 0],
              scale: [1, 1.1, 1],
              transition: { 
                duration: p.d, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }
            }}
          />
        ))}
      </div>

      {/* 1. 背後のエナジーオーラ（中略：以前と同じ） */}
      {isZooming && (
        <div className="absolute inset-0 z-10 pointer-events-none">
          <motion.div
            initial={{ scale: 1, opacity: 0 }}
            animate={{ scale: 2, opacity: [0, 0.7, 0] }}
            transition={{ duration: 1.8, ease: "circIn" }}
            className="absolute inset-0 flex items-center justify-center"
            style={{ willChange: "transform, opacity" }}
          >
            <div 
              className="w-[80vw] h-[80vw] rounded-full blur-[80px]"
              style={{
                background: 'radial-gradient(circle, #ef4444 0%, #3b82f6 40%, #eab308 70%, transparent 100%)',
                transform: 'translateZ(0)'
              }}
            />
          </motion.div>
        </div>
      )}

      {/* 2. 筐体本体（中略：以前と同じ） */}
      <motion.div
        initial={{ scale: 1.0, opacity: 0, y: -40 }}
        animate={isZooming ? {
          scale: 7, 
          opacity: [1, 1, 0],
          y: 0,
          transition: { 
              duration: 2.0, 
              ease: [0.2, 0.4, 0.6, 1],
              opacity: { times: [0, 0.8, 1], duration: 2.0 } 
          }
        } : { 
          scale: 1, opacity: 1, y: 0,
          transition: { duration: 0.8 }
        }}
        onAnimationComplete={() => isZooming && handleIntroComplete()}
        style={{ 
          originX: 0.5,
          originY: 0.36,
          zIndex: 20,
          willChange: "transform, opacity",
          transform: 'translateZ(0)'
        }}
        className="relative w-[400px] h-[690px] md:w-[800px] md:h-[1200px]"
        onClick={handleStart}
      >
        <Image 
          src="/images/arcade-front-paint1.png" 
          alt="Arcade Machine Intro" 
          fill 
          className="object-contain"
          priority
        />

{/* PRESS START テキスト（筐体の画面内に配置） */}
        {!isZooming && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex flex-col items-center pointer-events-none"
          >
            <motion.div
              animate={{ opacity: [1, 0] }} 
              transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
              style={{ top: "35%" }}
              className="absolute bg-black/80 px-6 py-3 rounded-lg border-2 border-white shadow-[0_0_20px_rgba(255,255,255,0.4)] flex flex-col items-center"
            >
              <p className="text-white font-black tracking-[0.3em] text-sm md:text-xl italic leading-none">
                ー PRESS START ー
              </p>
              <p className="text-slate-400 font-bold text-[8px] md:text-[10px] mt-2 tracking-widest uppercase">
                Click Screen
              </p>
            </motion.div>
          </motion.div>
        )}
      </motion.div>

      {/* --- 3. 最前面：放射状の光（3層レイヤー・開始方向をずらして密度アップ） --- */}
      {isZooming && (
        <div className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center">
          {/* レイヤーA: 角度45度から高速回転（青・白） */}
          <motion.div
            initial={{ rotate: 45, scale: 0, opacity: 0 }}
            animate={{ rotate: 405, scale: 4, opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, ease: "circIn" }}
            style={{ willChange: "transform", transform: 'translateZ(0)' }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div 
              className="w-[150vmax] h-[150vmax]" 
              style={{
                background: 'conic-gradient(from 0deg at 50% 50%, transparent 0deg, #3b82f6 2deg, transparent 5deg, white 10deg, transparent 15deg)',
                maskImage: 'radial-gradient(circle, black 30%, transparent 70%)',
                filter: 'blur(1px)'
              }}
            />
          </motion.div>

          {/* レイヤーB: 角度-110度から逆回転（白・透過） */}
          <motion.div
            initial={{ rotate: -110, scale: 0, opacity: 0 }}
            animate={{ rotate: -270, scale: 5, opacity: [0, 0.8, 0] }}
            transition={{ duration: 1.3, ease: "circIn", delay: 0.1 }}
            style={{ willChange: "transform", transform: 'translateZ(0)' }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div 
              className="w-[150vmax] h-[150vmax]" 
              style={{
                background: 'conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(255,255,255,0.4) 15deg, transparent 30deg)',
                maskImage: 'radial-gradient(circle, black 20%, transparent 60%)',
                filter: 'blur(3px)'
              }}
            />
          </motion.div>

          {/* 【新設】レイヤーC: 角度200度から低速回転（淡い光・広範囲） */}
          <motion.div
            initial={{ rotate: 250, scale: 0, opacity: 0 }}
            animate={{ rotate: 560, scale: 6, opacity: [0, 0.6, 0] }}
            transition={{ duration: 1.7, ease: "circIn", delay: 0.2 }}
            style={{ willChange: "transform", transform: 'translateZ(0)' }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div 
              className="w-[150vmax] h-[150vmax]" 
              style={{
                background: 'conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(255,255,255,0.2) 20deg, transparent 40deg)',
                maskImage: 'radial-gradient(circle, black 10%, transparent 50%)',
                filter: 'blur(6px)'
              }}
            />
          </motion.div>

          {/* 中央コア */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 2, 8], opacity: [0, 1, 0] }}
            transition={{ duration: 1.4, ease: "circIn" }}
            className="absolute w-40 h-40 bg-white rounded-full blur-[30px]"
          />
        </div>
      )}

      {/* 4. ホワイトアウト */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isZooming ? { 
          opacity: [0, 0, 1, 0],
          transition: { times: [0, 0.7, 0.85, 1], duration: 2.0 } 
        } : { opacity: 0 }}
        className="absolute inset-0 bg-white z-40 pointer-events-none"
      />
    </motion.div>
  )}
</AnimatePresence>

{/* --- 2. メインコンテンツ：飛び出してくる演出（爆発エフェクト） --- */}
      <motion.div
        initial={{ opacity: 0, scale: 1.3, filter: "blur(20px)" }}
        animate={!showIntro ? { 
          opacity: 1, 
          scale: 1, 
          filter: "blur(0px)",
          transition: { 
            duration: 1.2, 
            ease: [0.22, 1, 0.36, 1], // 強力な減速で「着地」感を出す
            delay: 0.1
          } 
        } : {}}
        className="relative"
      >
        {/* コンテンツが表示される瞬間の残光演出 */}
        {!showIntro && (
          <motion.div
            initial={{ opacity: 1, scale: 0.8 }}
            animate={{ opacity: 0, scale: 2 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0 z-[60] bg-white pointer-events-none"
          />
        )}</motion.div>
      
      {/* --- ヘッダー --- */}
      <motion.header 
        style={{ opacity: headerOpacity, y: headerY }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-sm py-3 px-6 flex justify-between items-center"
      >
        <div className="relative w-24 h-10">
          <Image src="/images/logo1.jpg" alt="pAInt Logo" fill className="object-contain scale-[1.7] origin-left" />
        </div>
        <nav className="hidden md:flex gap-6 text-sm font-bold text-slate-600">
          {/* メニューの順番も変更 */}
          <a href="#about" className="hover:text-blue-500 transition-colors">pAIntとは？</a>
          <a href="#howtoplay" className="hover:text-blue-500 transition-colors">あそびかた</a>
          <a href="#modes" className="hover:text-blue-500 transition-colors">ゲームモード</a>
          <a href="#mechanics" className="hover:text-blue-500 transition-colors">バトルの秘密</a>
          <a href="#gallery" className="hover:text-blue-500 transition-colors">みんなの図鑑</a>
          <a href="#achievement" className="hover:text-blue-500 transition-colors">実績</a>
          <a href="#tech" className="hover:text-blue-500 transition-colors">開発レポート</a>
        </nav>
      </motion.header>

{/* --- 1. ヒーローセクション --- */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/hero-bg7.jpg"
              alt="Main Background"
              fill
              className="object-cover brightness-[0.8]"
              priority
            />
          </div>

          <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center">
            {/* ロゴの飛び出しを少し強調 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={!showIntro ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.3, duration: 1, type: "spring" }}
              className="relative w-80 h-40 md:w-[600px] md:h-[300px] -mt-30 mb-50"
            >
               <Image src="/images/logo1.jpg" alt="pAInt Logo" fill className="object-contain drop-shadow-2xl" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={!showIntro ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-6 tracking-wider leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
                描いた絵が、動き出す。<br />
                キミだけの<span className="text-yellow-400">イキモノ</span>を創り出せ！
              </h1>
              <p className="text-lg md:text-xl text-white font-bold bg-slate-900/50 inline-block px-8 py-3 rounded-full backdrop-blur-sm border border-white/20">
                アーケード筐体 × 生成AI × 心理戦バトル
              </p>
            </motion.div>

            <motion.div
              className="absolute top-150"
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <p className="text-white text-xs font-bold tracking-widest mb-2">SCROLL</p>
              <div className="w-6 h-6 border-b-4 border-r-4 border-white rotate-45 mx-auto"></div>
            </motion.div>
          </div>
        </section>

      {/* --- 2. pAIntとは？ (変更なし) --- */}
      <section id="about" className="py-24 px-4 bg-white relative overflow-hidden">
        <div className="absolute top-20 left-[-50px] w-64 h-64 bg-yellow-100 rounded-full blur-3xl -z-0"></div>
        <div className="absolute bottom-20 right-[-50px] w-80 h-80 bg-blue-100 rounded-full blur-3xl -z-0"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-800">
              <span className="text-blue-500">pAInt</span>とは？
            </h2>
            <div className="w-20 h-1 bg-yellow-400 mx-auto mt-4 rounded-full"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl md:text-3xl font-bold text-slate-800 leading-relaxed">
                AIが「命」を吹き込む、<br />
                新感覚アーケードゲーム。
              </h3>
              <p className="text-lg text-slate-600 leading-8">
                「pAInt（ペイント）」は、自分だけのイキモノを描いて戦わせるシリアス対戦ゲーム。
                最大の特徴は、<span className="font-bold text-blue-500">自作のアーケード筐体</span>と<span className="font-bold text-blue-500">生成AI</span>の融合です。
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <span className="bg-red-500 text-white p-1 rounded-full text-xs">●</span>
                  <span className="font-bold text-slate-700">描いた絵をAIが即座に解析</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="bg-blue-500 text-white p-1 rounded-full text-xs">●</span>
                  <span className="font-bold text-slate-700">見た目から「陸・海・空」属性を付与</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="bg-yellow-500 text-white p-1 rounded-full text-xs">●</span>
                  <span className="font-bold text-slate-700">3すくみの心理戦バトル</span>
                </li>
              </ul>
            </div>
            <div className="relative rotate-2 hover:rotate-0 transition-transform duration-500 group">
              <div className="absolute inset-0 bg-slate-800 rounded-3xl transform translate-x-3 translate-y-3 group-hover:translate-x-1 group-hover:translate-y-1 transition-all"></div>
              <Image
                src="/images/about.png"
                alt="Game Arcade"
                width={600}
                height={400}
                className="relative rounded-3xl z-10 border-4 border-white"
              />
            </div>
          </div>
        </div>
      </section>

 {/* --- 3. あそびかた (PV小窓・拡大機能付き) --- */}
      <section id="howtoplay" className="py-24 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center text-3xl md:text-5xl font-extrabold text-slate-800 mb-16">
            あそびかた
          </h2>

          {/* 既存のSTEPカードグリッド */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {howToPlayDetails.map((step) => (
              <motion.div 
                key={step.id}
                whileHover={{ y: -10 }} 
                className={`bg-white p-6 rounded-3xl shadow-lg border-b-8 ${step.borderColor} relative overflow-hidden flex flex-col`}
              >
                <div className={`absolute top-0 left-0 ${step.id === 1 ? 'bg-red-500' : step.id === 2 ? 'bg-blue-500' : 'bg-yellow-500'} text-white font-black px-4 py-2 rounded-br-2xl text-lg`}>
                  STEP {step.id}
                </div>
                <div className="mt-8 mb-4 h-48 relative rounded-xl overflow-hidden bg-slate-100">
                  <Image src={`/images/step${step.id}.jpg`} alt={step.title} fill className="object-cover" />
                </div>
                <h3 className={`text-xl font-bold ${step.color} mb-2`}>{step.title}</h3>
                <p className="text-slate-600 text-sm mb-6 flex-grow">
                  {step.id === 1 && "制限時間内に好きな生き物を描こう。AIがどんな生き物か見てくれるぞ。"}
                  {step.id === 2 && "「陸(グー)」「海(パー)」「空(チョキ)」の3すくみバトル！属性を見極めろ。"}
                  {step.id === 3 && "バトル後はQRコードで図鑑をゲット。LINEでいつでも見返せる！"}
                </p>
                <button 
                  onClick={() => setSelectedStep(step.id)}
                  className={`w-full py-3 rounded-xl font-bold text-white transition-opacity hover:opacity-90 shadow-md ${step.id === 1 ? 'bg-red-500' : step.id === 2 ? 'bg-blue-500' : 'bg-yellow-500'}`}
                >
                  詳しく見る
                </button>
              </motion.div>
            ))}
          </div>

          {/* --- 【新設】プロジェクトPV・小窓エリア --- */}
          <div className="flex flex-col items-center">
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            onClick={() => setIsPvOpen(true)}
            // styleに aspect-ratio を適用。aspect-[6/4] は削除。
            style={{ aspectRatio: pvAspectRatio }}
            className="relative w-full max-w-sm rounded-[40px] overflow-hidden shadow-xl border-[8px] border-white bg-slate-900 cursor-pointer group"
          >
            {/* 背景で薄く流れるプレビュー */}
            <video
              src="/videos/pv_15s.mp4"
              
              loop
              muted
              playsInline
              onLoadedMetadata={handleVideoLoad} // ここでサイズを取得
              className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500"
            />
              
              {/* 中央の再生アイコン */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border-2 border-white/50 group-hover:bg-yellow-400 group-hover:border-yellow-400 transition-all duration-300">
                  <span className="text-2xl ml-1 group-hover:text-slate-900">▶</span>
                </div>
                <p className="mt-4 font-black tracking-[0.2em] text-xs opacity-80 group-hover:opacity-100">PLAY PV</p>
              </div>

              {/* 右上のLIVEバッジ風装飾 */}
              <div className="absolute top-4 right-4 flex items-center gap-2 bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm border border-white/20">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span>
                <span className="text-[8px] font-bold tracking-widest text-white uppercase">15s Demo</span>
              </div>
            </motion.div>
            <p className="mt-6 text-slate-400 font-bold text-xs tracking-widest uppercase text-center">
               Click to expand gameplay video
            </p>
          </div>
        </div>
      </section>

{/* --- PV拡大モーダル --- */}
<AnimatePresence>
  {isPvOpen && (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsPvOpen(false)}
        className="absolute inset-0 bg-slate-900/90 backdrop-blur-md"
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        // styleに比率を適用。aspect-[4/3] を削除。
        style={{ aspectRatio: pvAspectRatio }}
        className="relative w-full max-w-5xl bg-black rounded-[40px] shadow-2xl overflow-hidden border-2 border-white/20"
      >
        <button 
          onClick={() => setIsPvOpen(false)}
          className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-20"
        >
          ✕
        </button>

        <video 
          src="/videos/pv_15s.mp4" 
          autoPlay 
          controls
          className="w-full h-full object-contain"
        />
      </motion.div>
    </div>
  )}
</AnimatePresence>

      {/* --- 【新セクション】選べる3つのゲームモード --- */}
      <section id="modes" className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-800">選べる3つのゲームモード</h2>
            <p className="text-slate-500 mt-4 font-bold">スタイルに合わせて、最適な遊び方を選ぼう</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {gameModeDetails.map((mode) => (
              <motion.div 
                key={mode.id}
                whileHover={{ scale: 1.02 }}
                className={`${mode.bg} p-10 rounded-[40px] border-2 border-slate-100 shadow-sm flex flex-col items-center text-center group cursor-pointer transition-all hover:shadow-xl`}
                onClick={() => setSelectedMode(mode.id)}
              >
                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform">{mode.emoji}</div>
                <h3 className={`text-2xl font-black mb-2 ${mode.color}`}>{mode.title}</h3>
                <p className="text-slate-400 font-bold mb-6">{mode.subtitle}</p>
                <button className={`mt-auto px-6 py-2 rounded-full border-2 ${mode.color.replace('text-', 'border-')} ${mode.color} font-black text-sm group-hover:bg-white transition-colors`}>
                  詳細を見る
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* --- 追加：詳細モーダル --- */}
      <AnimatePresence>
        {selectedStep && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* 背景オーバーレイ */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedStep(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            
            {/* モーダルコンテンツ */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-3xl bg-white rounded-[40px] shadow-2xl overflow-hidden"
            >
              <button 
                onClick={() => setSelectedStep(null)}
                className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center bg-slate-100 rounded-full text-slate-500 hover:bg-slate-200 transition-colors z-10"
              >
                ✕
              </button>

              <div className="p-8 md:p-12">
                <div className="flex items-center gap-4 mb-6">
                  <span className={`px-4 py-1 rounded-full text-white font-bold ${selectedStep === 1 ? 'bg-red-500' : selectedStep === 2 ? 'bg-blue-500' : 'bg-yellow-500'}`}>
                    STEP {selectedStep}
                  </span>
                  <h3 className={`text-2xl md:text-4xl font-black ${howToPlayDetails[selectedStep-1].color}`}>
                    {howToPlayDetails[selectedStep-1].title}
                  </h3>
                </div>

                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="aspect-video bg-slate-900 rounded-2xl overflow-hidden relative shadow-inner">
                    {/* 動画の実装例（動画ファイルがない場合はImageやYouTubeを配置） */}
                    <div className="absolute inset-0 flex items-center justify-center text-white text-sm">
                      <p className="px-4 text-center opacity-50">ここに実際のゲーム映像<br/>(demo_video.mp4)を表示</p>
                    </div>
                    {/* <video 
                      src={howToPlayDetails[selectedStep-1].video} 
                      autoPlay loop muted playsInline 
                      className="w-full h-full object-cover"
                    /> 
                    */}
                  </div>
                  <div>
                    <p className="text-slate-600 leading-relaxed font-bold">
                      {howToPlayDetails[selectedStep-1].description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- 【追加】ゲームモード詳細モーダル --- */}
      <AnimatePresence>
        {selectedMode && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedMode(null)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative w-full max-w-2xl bg-white rounded-[40px] shadow-2xl overflow-hidden">
              <button onClick={() => setSelectedMode(null)} className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center bg-slate-100 rounded-full text-slate-500 hover:bg-slate-200 transition-colors z-10">✕</button>
              <div className="p-10 md:p-16 text-center">
                <div className="text-7xl mb-8">{gameModeDetails.find(m => m.id === selectedMode)?.emoji}</div>
                <h3 className={`text-3xl md:text-4xl font-black mb-4 ${gameModeDetails.find(m => m.id === selectedMode)?.color}`}>
                  {gameModeDetails.find(m => m.id === selectedMode)?.title}
                </h3>
                <p className="text-slate-400 font-bold mb-8 tracking-widest">{gameModeDetails.find(m => m.id === selectedMode)?.subtitle}</p>
                <div className="bg-slate-50 p-8 rounded-3xl text-left border-2 border-slate-100">
                  <p className="text-slate-600 leading-relaxed font-bold text-lg whitespace-pre-wrap">
                    {gameModeDetails.find(m => m.id === selectedMode)?.description}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>


{/* --- 4. バトルのヒミツ (最終調整：重なり解消・右端揃え・横幅最適化) --- */}
      <section id="mechanics" className="pt-16 pb-32 px-4 bg-yellow-50 relative overflow-hidden">
        
        {/* 背景の装飾 */}
        <div className="absolute top-10 right-10 w-64 h-64 bg-yellow-200/30 rounded-full blur-3xl -z-0" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-red-100/30 rounded-full blur-3xl -z-0" />

        <div className="max-w-6xl mx-auto relative z-10">
          
          {/* A. AIの思考プロセス（吹き出し：重なりを解消し右端を揃える） */}
          {/* 修正: md:gap-12 を追加して重なりを解消。items-centerで高さを揃える */}
          <div className="flex flex-col md:flex-row items-center md:gap-12 mb-24">
            
            {/* 博士のアイコン */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="w-full md:w-auto flex justify-center flex-shrink-0 relative z-30"
            >
              <div className="relative w-48 h-48 md:w-72 md:h-72 bg-white rounded-full border-[10px] border-white overflow-hidden shadow-[0_15px_50px_rgba(0,0,0,0.12)]">
                <Image src="/images/hakase.jpg" alt="Hakase" fill className="object-cover" />
              </div>
            </motion.div>
            
            {/* 博士のセリフカード（吹き出し） */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              // 修正: flex-1で右端まで広げつつ、重なり用マージンを削除。横幅を少し抑えるために md:max-w-4xl を追加（右端揃えは維持）
              className="flex-1 w-full bg-white p-8 md:p-12 rounded-[50px] shadow-[0_20px_50px_rgba(0,0,0,0.06)] relative border-2 border-slate-200 z-20 mt-8 md:mt-0 md:max-w-4xl"
            >
              {/* 吹き出しの矢印パーツ */}
              {/* 修正: 左端の位置 md:left-[-12px] を微調整して、重なりを解いた隙間に適応させる */}
              <div className="absolute top-[-12px] left-1/2 -translate-x-1/2 md:top-1/2 md:left-[-3px] md:-translate-y-1/2 w-8 h-8 bg-white transform rotate-45 z-0 border-l-2 border-t-2 md:border-t-0 md:border-l-2 md:border-b-2 border-slate-200"></div>
              
              <div className="relative z-10">
                <div className="inline-block bg-slate-900 text-white px-5 py-1.5 rounded-full text-[10px] font-black mb-6 tracking-[0.2em] uppercase">AI Logic Insight</div>
                <h3 className="text-2xl md:text-4xl font-black text-slate-800 mb-6 flex items-center gap-3 italic leading-tight">
                   AIの思考を読み解くのじゃ！
                </h3>
                <p className="text-base md:text-lg font-bold text-slate-600 leading-relaxed mb-10">
                  ワシは「ペイント博士」じゃ。AIはキミの描いたイキモノの見た目や色などを見て、<br/>名前や技名、タイプを決定しておる。それぞれの傾向を教えてやろう。
                </p>
                
                {/* 3属性の傾向 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-red-50 p-5 rounded-[30px] border-2 border-red-100/50 transition-transform hover:scale-[1.03]">
                    <p className="text-red-500 font-black text-[18px] mb-1 flex items-center gap-2">
                      <span className="text-xl">🌋</span> 陸タイプの傾向
                    </p>
                    <p className="text-slate-700 text-xs md:text-sm font-bold leading-relaxed">「地面に立っている」や「体を使って攻撃しそう」など</p>
                  </div>
                  <div className="bg-blue-50 p-5 rounded-[30px] border-2 border-blue-100/50 transition-transform hover:scale-[1.03]">
                    <p className="text-blue-600 font-black text-[18px] mb-1 flex items-center gap-2">
                      <span className="text-xl">🌊</span> 海タイプの傾向
                    </p>
                    <p className="text-slate-700 text-xs md:text-sm font-bold leading-relaxed">ヒレや尾、水の中で動いていそうな形や動きなど</p>
                  </div>
                  <div className="bg-yellow-50 p-5 rounded-[30px] border-2 border-yellow-100/50 transition-transform hover:scale-[1.03]">
                    <p className="text-yellow-600 font-black text-[18px] mb-1 flex items-center gap-2">
                      <span className="text-xl">☁️</span> 空タイプの傾向
                    </p>
                    <p className="text-slate-700 text-xs md:text-sm font-bold leading-relaxed">「飛ぶ・浮く・舞う」や空中を移動できそうな特徴など</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* B. バトルの鉄則：3つのルール（メイン） */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-[60px] shadow-2xl p-8 md:p-20 relative overflow-hidden"
          >
            {/* 装飾ライン */}
            <div className="absolute top-0 left-0 w-full h-4 bg-gradient-to-r from-red-500 via-yellow-400 to-blue-500" />
            
            <div className="text-center mb-16">
              <h3 className="text-4xl md:text-6xl font-black text-slate-900 mb-4 tracking-tighter italic uppercase">Battle Mechanics</h3>
              <p className="text-slate-400 font-bold tracking-[0.2em]">勝利を掴むための3つのシステム</p>
            </div>

            <div className="grid lg:grid-cols-12 gap-16 items-center">
              {/* 左：3すくみ画像 */}
              <div className="lg:col-span-5 relative group">
                <div className="absolute inset-0 bg-yellow-400/20 rounded-full blur-[100px]" />
                <Image 
                  src="/images/type_chart1.png" 
                  alt="3-Way Deadlock System" 
                  width={600} 
                  height={600} 
                  className="relative z-10 rounded-[30px] drop-shadow-[0_30px_60px_rgba(0,0,0,0.1)] group-hover:scale-105 transition-transform duration-500"
                />
                <div className="mt-8 bg-slate-900 text-white p-4 rounded-2xl text-center z-10 relative shadow-xl">
                  <p className="text-sm font-black italic">※バトル中、相手のタイプは隠されている！</p>
                </div>
              </div>

              {/* 右：3つのルールのカード化 */}
              <div className="lg:col-span-7 space-y-8">
                {[
                  {
                    num: "01",
                    title: "先攻・後攻の決定",
                    icon: "⏱️",
                    desc: "全ターン「じゃんけん」で勝負。勝った方が先に攻撃できる。終盤、相手のHPを削り切る一撃を先に放てるかが勝敗を分ける。",
                    highlight: "先にHPを0にした方の勝ち"
                  },
                  {
                    num: "02",
                    title: "3属性の相性",
                    icon: "🎯",
                    desc: "相手の弱点タイプで攻撃すればダメージは1.5倍。逆に相性が悪いと 0.5倍に半減する。左の3すくみをマスターせよ。",
                    highlight: "強気な一撃は1.5倍の威力"
                  },
                  {
                    num: "03",
                    title: "タイプ一致ボーナス",
                    icon: "💪",
                    desc: "自分のイキモノと同じ属性の技を使うと、さらに威力は1.5倍。自分の本領を発揮できる技をいつ出すかが重要だ。",
                    highlight: "最大2.25倍の超ダメージ！"
                  }
                ].map((rule: { num: string; title: string; icon: string; desc: string; highlight: string }, i: number) => (
                  <div key={i} className="flex gap-6 group">
                    <div className="flex-shrink-0 w-16 h-16 bg-slate-100 rounded-[24px] flex items-center justify-center text-2xl font-black text-slate-400 group-hover:bg-slate-900 group-hover:text-white transition-all duration-300">
                      {rule.num}
                    </div>
                    <div className="pt-2">
                      <h4 className="text-2xl font-black text-slate-800 mb-2 flex items-center gap-3">
                        {rule.title} <span className="text-2xl">{rule.icon}</span>
                      </h4>
                      <p className="text-slate-500 font-bold leading-relaxed mb-3">{rule.desc}</p>
                      <span className="inline-block bg-yellow-100 text-yellow-700 text-xs font-black px-4 py-1 rounded-full uppercase tracking-widest">{rule.highlight}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 戦略のまとめ */}
            <div className="mt-7 pt-10 border-t-2 border-slate-50">
              <div className="bg-slate-900 text-white p-10 md:p-16 rounded-[50px] relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-blue-500/20 to-transparent pointer-events-none" />
                <h4 className="text-2xl md:text-4xl font-black mb-6 italic tracking-tight">The Core Strategy: 予測の先にある勝利</h4>
                <p className="text-lg md:text-xl font-bold text-slate-300 leading-9 text-justify">
                  　バトルのルールはシンプルだが、<span className="text-blue-400 underline decoration-2 underline-offset-8">相手のタイプが見えない</span>ことが、このゲームを高度な心理戦へと変える。相手が描いた絵、選んだ名前、そして技名。AIがそこから何を読み取ったかを予測し、誰よりも早く最適な一撃を導き出すのじゃ。
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- みんなの図鑑 (手動スクロールの境界線バグ修正版) --- */}
      <section id="gallery" className="py-20 bg-white overflow-hidden relative">
        <div className="text-center mb-10 relative z-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 flex items-center justify-center gap-2">
            <span className="text-yellow-500">🎨</span> みんなの図鑑
          </h2>
          <p className="text-slate-500 mt-2">これまでに生まれたユニークなイキモノたち</p>
        </div>

        {/* 修正ポイント：
            グラデーション（before/after）をこの親要素に持たせ、中身のスクロールに干渉させない。
        */}
        <div className="relative w-full before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-32 before:bg-gradient-to-r before:from-white before:to-transparent before:pointer-events-none after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-32 after:bg-gradient-to-l after:from-white after:to-transparent after:pointer-events-none">
          
          {/* スクロール本体：グラデーションクラスを削除し、純粋なコンテナに */}
          <div
            ref={galleryRef}
            onMouseDown={handleInteractionStart}
            onTouchStart={handleInteractionStart}
            onMouseUp={handleInteractionEnd}
            onMouseLeave={handleInteractionEnd}
            onTouchEnd={handleInteractionEnd}
            className="w-full overflow-x-auto pb-10 scrollbar-hide cursor-grab active:cursor-grabbing"
          >
            <div className="flex gap-10 w-max px-10 md:px-20">
          {[...monsters, ...monsters, ...monsters].map((monster, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, y: -5 }}
              // カード全体のパディングを p-6 から p-2 に大幅削減
              className="relative w-[440px] h-[360px] bg-slate-50 rounded-[40px] p-2 shadow-md border-2 border-slate-100 flex-shrink-0 group flex flex-col"
            >
              {/* 画像エリア：高さを h-[210px] から h-[270px] に拡大し、余白をほぼゼロに */}
              <div className="relative h-[270px] w-full rounded-[32px] overflow-hidden bg-white shadow-inner">
                <Image 
                  src={monster.image} 
                  alt={monster.name} 
                  fill 
                  className="object-contain p-3" // 枠に当たりすぎないよう最小限のパディング
                />
              </div>

              {/* テキストエリア：画像の下に綺麗に収まるよう調整 */}
              <div className="flex items-center justify-between mt-auto px-5 pb-4">
                <div className="text-left">
                  <h3 className="text-2xl font-black text-slate-800 group-hover:text-blue-500 transition-colors leading-tight">
                    {monster.name}
                  </h3>
                  <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-1">
                    ENCYCLOPEDIA ENTRY NO.{monster.id.toString().padStart(3, '0')}
                  </p>
                </div>
                <span className={`text-xs font-black px-4 py-2 rounded-full shadow-sm ${monster.color}`}>
                  {monster.type}タイプ
                </span>
              </div>
            </motion.div>
          ))}
        </div>
          </div>
        </div>
      </section>

      {/* --- 実績（数字とグラフ + 写真ギャラリー） --- */}
      <section id="achievement" ref={ref} className="py-24 px-4 bg-slate-800 text-white relative overflow-hidden">
        {/* 背景装飾 */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-center text-3xl md:text-4xl font-extrabold mb-12">
            <span className="text-yellow-400">実績</span>と<span className="text-blue-400">活動</span>
          </h2>
          

          {/* 数字とグラフ */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            {/* 左側：カウンター */}
            <div className="grid grid-cols-2 gap-6 text-center">
              <div className="bg-slate-700/50 p-6 rounded-2xl border border-slate-600 backdrop-blur-sm">
                <h3 className="text-slate-300 text-sm font-bold mb-2">総プレイ人数</h3>
                <p className="text-5xl font-black text-yellow-400">
                  {inView ? <CountUp end={600} duration={2.5} suffix="人+" /> : "0人+"}
                </p>
              </div>
              <div className="bg-slate-700/50 p-6 rounded-2xl border border-slate-600 backdrop-blur-sm">
                <h3 className="text-slate-300 text-sm font-bold mb-2">イベント出展</h3>
                <p className="text-5xl font-black text-blue-400">
                  {inView ? <CountUp end={5} duration={2.5} suffix="回以上" /> : "0回以上"}
                </p>
              </div>
              <div className="bg-slate-700/50 p-6 rounded-2xl border border-slate-600 backdrop-blur-sm col-span-2">
                <h3 className="text-slate-300 text-sm font-bold mb-2">受賞歴</h3>
                <p className="text-xl font-bold">サポーターズ主催「技育博2025(vol.2)」 企業賞 受賞</p>
              </div>
            </div>

            {/* 右側：満足度グラフ */}
            <div className="bg-slate-700/50 p-8 rounded-3xl border border-slate-600 backdrop-blur-sm flex flex-col items-center">
               <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-yellow-400">⭐</span> ユーザー満足度
               </h3>
               <div className="relative w-64 h-64">
                 <div className="absolute inset-0 flex flex-col items-center justify-center z-0">
                   <p className="text-6xl font-black text-yellow-400">
                     {inView ? <CountUp end={90} duration={2.5} suffix="%" /> : "0%"}
                   </p>
                   <p className="text-slate-300 text-sm font-bold">が「満足」と回答</p>
                 </div>
                 <ResponsiveContainer width="100%" height="100%">
                   <PieChart>
                     <Pie
                       data={satisfactionData}
                       cx="50%"
                       cy="50%"
                       innerRadius={80}
                       outerRadius={110}
                       fill="#8884d8"
                       paddingAngle={5}
                       dataKey="value"
                       startAngle={90}
                       endAngle={-270}
                     >
                       {satisfactionData.map((entry, index) => (
                         <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                       ))}
                     </Pie>
                   </PieChart>
                 </ResponsiveContainer>
               </div>
            </div>
          </div>

          {/* 【追加】活動写真ギャラリー */}
          <div>
            <h3 className="text-center text-xl font-bold mb-8 flex items-center justify-center gap-2">
              <span className="text-blue-400">📷</span> 活動の様子
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {achievementPhotos.map((photo, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="bg-slate-700/50 rounded-2xl overflow-hidden border border-slate-600 backdrop-blur-sm group"
                >
                  <div className="relative h-80 overflow-hidden">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <p className="text-sm font-bold text-slate-300">{photo.caption}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </section>

{/* --- 5. 開発レポート (一新：4つの技術カードと強調された誘導) --- */}
      <section id="tech" className="py-32 px-4 bg-slate-900 text-white border-t border-slate-800 relative overflow-hidden">
        {/* 背景の装飾：エンジニアリングを感じさせる回路のようなライン */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-1/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
          <div className="absolute top-2/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter">開発レポート</h2>
            <p className="text-slate-400 mb-16 font-bold tracking-[0.3em] uppercase">TECHNICAL STORY</p>
          </motion.div>

                    {/* 開発者ページへの強力な誘導リンク */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Link 
              href="/tech" 
              className="group relative inline-flex items-center gap-4 px-12 py-6 bg-white text-slate-900 font-black rounded-full hover:bg-blue-500 hover:text-white transition-all duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:shadow-blue-500/40 overflow-hidden"
            >
              <span className="relative z-10 text-xl tracking-tight">開発の裏側を詳しく見る</span>
              <span className="relative z-10 text-2xl group-hover:translate-x-2 transition-transform duration-300">→</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </Link>
            <p className="mt-8 mb-10 text-slate-500 font-bold text-sm animate-pulse">
              「pAInt」開発の裏側と、成功に至るまでの道のりを公開中
            </p>
          </motion.div>

          {/* 4つの技術カードグリッド */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20 text-left">
             {/* 1. Hardware */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-slate-800/50 p-8 rounded-[32px] border-2 border-slate-700 hover:border-blue-500 transition-all duration-300 backdrop-blur-sm"
            >
              <div className="text-3xl mb-6 bg-blue-500/20 w-16 h-16 flex items-center justify-center rounded-2xl shadow-inner">⚙️</div>
              <h4 className="text-xl font-black mb-3 text-blue-400 italic">Hardware</h4>
              <p className="text-slate-400 text-sm leading-7 font-bold">
                木材の筐体設計から3Dプリンタによる専用コントローラー製作、配線まで。手触りと没入感を追求した完全自作のアーケード。
              </p>
            </motion.div>

             {/* 2. Frontend */}
             <motion.div 
              whileHover={{ y: -5 }}
              className="bg-slate-800/50 p-8 rounded-[32px] border-2 border-slate-700 hover:border-green-500 transition-all duration-300 backdrop-blur-sm"
            >
              <div className="text-3xl mb-6 bg-green-500/20 w-16 h-16 flex items-center justify-center rounded-2xl shadow-inner">🎮</div>
              <h4 className="text-xl font-black mb-3 text-green-400 italic">Frontend</h4>
              <p className="text-slate-400 text-sm leading-7 font-bold">
                Unity (C#) を使用。お絵描き、バトル演出、AI通信を統合する複雑なステート管理を行い、5分間の濃密なUXを構築。
              </p>
            </motion.div>

             {/* 3. Backend */}
             <motion.div 
              whileHover={{ y: -5 }}
              className="bg-slate-800/50 p-8 rounded-[32px] border-2 border-slate-700 hover:border-blue-400 transition-all duration-300 backdrop-blur-sm"
            >
              <div className="text-3xl mb-6 bg-blue-400/20 w-16 h-16 flex items-center justify-center rounded-2xl shadow-inner">🌐</div>
              <h4 className="text-xl font-black mb-3 text-blue-300 italic">Backend</h4>
              <p className="text-slate-400 text-sm leading-7 font-bold">
                GASを核とした設計。Google Drive/Sheets/LINE/Slackを統合し、図鑑生成から運用監視までを行う自律型パイプライン。
              </p>
            </motion.div>

             {/* 4. AI Integration */}
             <motion.div 
              whileHover={{ y: -5 }}
              className="bg-slate-800/50 p-8 rounded-[32px] border-2 border-slate-700 hover:border-purple-500 transition-all duration-300 backdrop-blur-sm"
            >
              <div className="text-3xl mb-6 bg-purple-500/20 w-16 h-16 flex items-center justify-center rounded-2xl shadow-inner">🧠</div>
              <h4 className="text-xl font-black mb-3 text-purple-400 italic">AI Integration</h4>
              <p className="text-slate-400 text-sm leading-7 font-bold">
                GPT-4o Visionを活用。描画画像から属性や名前、判断理由を論理的に抽出する高度なプロンプトエンジニアリングを実装。
              </p>
            </motion.div>
          </div>


        </div>
      </section>

      {/* --- フッター (変更なし) --- */}
      <footer className="bg-slate-950 text-slate-500 py-8 text-center text-sm">
        <p>© 2025 pAInt Project. All Rights Reserved.</p>
        <p className="mt-2 text-xs opacity-50">Designed for Nintendo Selection Portfolio</p>
      </footer>

    </main>
  );
}