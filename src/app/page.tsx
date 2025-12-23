"use client";

import { useState } from "react"; // 追加
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"; // AnimatePresence追加
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import Link from "next/link";

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
  { src: "/images/event1.jpg", alt: "イベントで遊ぶ参加者", caption: "オープンキャンパスでの様子" },
  { src: "/images/event2.jpg", alt: "コンテスト受賞", caption: "技育博2025(vol.2) 企業賞受賞" },
  { src: "/images/event3.jpg", alt: "廊下での展示", caption: "現在も大学内に設置" },
];


export default function Home() {
  const [selectedStep, setSelectedStep] = useState<number | null>(null);
  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 100], [0, 0.9]);
  const headerY = useTransform(scrollY, [0, 100], [-20, 0]);

  // 実績カウンターが表示されたらアニメーション開始するためのフック
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <main className="min-h-screen overflow-x-hidden bg-slate-50 selection:bg-yellow-200 selection:text-slate-900">
      
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
          <a href="#mechanics" className="hover:text-blue-500 transition-colors">バトルの秘密</a>
          <a href="#gallery" className="hover:text-blue-500 transition-colors">みんなの図鑑</a>
          <a href="#achievement" className="hover:text-blue-500 transition-colors">実績</a>
        </nav>
      </motion.header>

      {/* --- 1. ヒーローセクション (変更なし) --- */}
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
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="relative w-80 h-40 md:w-[600px] md:h-[300px] -mt-30 mb-50"
          >
             <Image src="/images/logo1.jpg" alt="pAInt Logo" fill className="object-contain drop-shadow-2xl" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-6 tracking-wider leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
              描いた絵が、<span className="text-yellow-400">動き出す。</span><br />
              キミだけの最強モンスター！
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
                AIが「命」を吹き込む。<br />
                新感覚アーケードゲーム。
              </h3>
              <p className="text-lg text-slate-600 leading-8">
                「pAInt（ペイント）」は、自分だけのモンスターを描いて戦わせる対戦ゲーム。
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

      {/* --- 3. あそびかた (モーダル起動ボタンを追加) --- */}
      <section id="howtoplay" className="py-24 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center text-3xl md:text-5xl font-extrabold text-slate-800 mb-16">
            あそびかた
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
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
                {/* 詳しく見るボタン */}
                <button 
                  onClick={() => setSelectedStep(step.id)}
                  className={`w-full py-3 rounded-xl font-bold text-white transition-opacity hover:opacity-90 shadow-md ${step.id === 1 ? 'bg-red-500' : step.id === 2 ? 'bg-blue-500' : 'bg-yellow-500'}`}
                >
                  詳しく見る
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

      {/* --- 【順序変更】4. バトルのヒミツ --- */}
      <section id="mechanics" className="py-24 px-4 bg-yellow-50 relative overflow-hidden">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10 relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full md:w-1/3 flex justify-center"
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80 bg-white rounded-full border-4 border-yellow-400 overflow-hidden shadow-2xl">
              <Image src="/images/hakase.jpg" alt="Hakase" fill className="object-cover" />
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full md:w-2/3 bg-white p-8 rounded-3xl shadow-xl relative"
          >
            <div className="absolute top-[-10px] left-1/2 md:top-10 md:left-[-10px] w-6 h-6 bg-white transform rotate-45"></div>
            <h3 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              <span className="text-3xl">🎓</span> AIの思考を読み解くのじゃ！
            </h3>
            <p className="text-slate-600 leading-7 mb-4">
              ワシは「ペイント博士」じゃ。<br/>AIはキミの描いたイキモノの絵を見て、どの属性っぽいか判断しておる。<br/>
              例えば、<span className="font-bold text-blue-500">「ヒレがあるから海タイプ」</span><span className="font-bold text-yellow-500">「翼があるから空タイプ」</span>といった具合じゃな。
            </p>
            <div className="bg-yellow-100 p-4 rounded-xl border border-yellow-200">
              <p className="font-bold text-yellow-800 text-sm mb-1">💡 勝利のヒント</p>
              <p className="text-slate-700 text-sm">
                相手のモンスターの見た目をよく観察するんじゃ。「こいつはきっと空タイプだ！」と予想して、有利な属性で攻撃する心理戦がカギになるぞ！
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- 【順序変更】みんなの図鑑 --- */}
      <section id="gallery" className="py-20 bg-white overflow-hidden relative">
        <div className="text-center mb-10 relative z-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 flex items-center justify-center gap-2">
            <span className="text-yellow-500">🎨</span> みんなの図鑑
          </h2>
          <p className="text-slate-500 mt-2">これまでに生まれたユニークなモンスターたち</p>
        </div>

        <div className="relative w-full before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-32 before:bg-gradient-to-r before:from-white before:to-transparent after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-32 after:bg-gradient-to-l after:from-white after:to-transparent">
          <motion.div
            className="flex gap-8 w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 20, repeat: Infinity }}
          >
            {[...monsters, ...monsters].map((monster, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, rotate: 2 }}
                className="relative w-64 h-80 bg-slate-50 rounded-3xl p-4 shadow-md border-2 border-slate-100 flex-shrink-0 group"
              >
                <div className="relative h-48 w-full rounded-2xl overflow-hidden bg-white mb-4">
                  <Image src={monster.image} alt={monster.name} fill className="object-contain p-2" />
                </div>
                <div className="text-center">
                  <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full mb-2 ${monster.color}`}>
                    {monster.type}タイプ
                  </span>
                  <h3 className="text-lg font-bold text-slate-800 group-hover:text-blue-500 transition-colors">{monster.name}</h3>
                </div>
              </motion.div>
            ))}
          </motion.div>
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
                  <div className="relative h-48 overflow-hidden">
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

      {/* --- 5. 開発レポート (変更なし) --- */}
      <section id="tech" className="py-24 px-4 bg-slate-900 text-white border-t border-slate-800">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">開発レポート</h2>
          <p className="text-slate-400 mb-16">About Development</p>

          {/* 詳細ページへのリンクを追加 */}
          <Link href="/tech" className="inline-block mt-4 mb-16 text-blue-400 font-bold hover:underline">
            もっと詳しい技術解説を読む →
          </Link>

          <div className="grid md:grid-cols-3 gap-6">
             {/* Tech Card 1 */}
            <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 hover:border-blue-500 transition-colors">
              <div className="text-4xl mb-4">🖥️</div>
              <h4 className="text-xl font-bold mb-3 text-blue-400">Hardware</h4>
              <p className="text-slate-300 text-sm leading-6">
                木材のカットからボタン配線、モニターの組み込みまで、全てチームで設計・製作した完全オリジナルのアーケード筐体です。
              </p>
            </div>
             {/* Tech Card 2 */}
             <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 hover:border-green-500 transition-colors">
              <div className="text-4xl mb-4">🎮</div>
              <h4 className="text-xl font-bold mb-3 text-green-400">Software</h4>
              <p className="text-slate-300 text-sm leading-6">
                Unity (C#) を使用してゲームロジックを実装。子供たちが直感的に遊べるよう、UI/UXデザインには何度も改良を重ねました。
              </p>
            </div>
             {/* Tech Card 3 */}
             <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 hover:border-purple-500 transition-colors">
              <div className="text-4xl mb-4">🧠</div>
              <h4 className="text-xl font-bold mb-3 text-purple-400">AI / Backend</h4>
              <p className="text-slate-300 text-sm leading-6">
                Pythonサーバーと連携し、生成AIが描かれた絵をリアルタイム解析。安全性を考慮したプロンプトエンジニアリングを行っています。
              </p>
            </div>
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