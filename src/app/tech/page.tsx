"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";

// --- 小見出しコンポーネント ---
const SubHeader = ({ children, emoji }: { children: string; emoji: string }) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    className="relative mb-16"
  >
    <h2 className="text-3xl md:text-5xl font-black flex items-center gap-6 text-slate-800 tracking-tighter">
      <span className="text-6xl drop-shadow-lg">{emoji}</span> {children}
    </h2>
    <motion.div 
      initial={{ width: 0 }}
      whileInView={{ width: "100%" }}
      transition={{ delay: 0.5, duration: 0.8 }}
      className="h-2 bg-gradient-to-r from-blue-500 to-transparent mt-4 rounded-full"
    />
  </motion.div>
);

// --- こだわりカードコンポーネント（ビルド時のクラスパージ対策版） ---
const DetailCard = ({ title, children, color, isCompact = false }: { title: string; children: React.ReactNode; color: string; isCompact?: boolean }) => {
  // Tailwind CSSのパージ対策：クラス名をフルパスで定義したマッピングを用意します
  const textColorMap: { [key: string]: string } = {
    "border-green-500": "text-green-500",
    "border-blue-500": "text-blue-500",
    "border-purple-500": "text-purple-500",
    "border-red-500": "text-red-500",
    "border-yellow-500": "text-yellow-600", // 黄色は視認性の高い600を使用
  };
  const textColor = textColorMap[color] || "text-slate-800";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -10 }}
      className={`
        px-8 rounded-[50px] bg-white/40 backdrop-blur-xl border-2 ${color}
        shadow-[0_20px_50px_rgba(0,0,0,0.03)]
        h-full flex flex-col transition-all duration-500 group
        ${isCompact ? 'py-8 min-h-0' : 'py-12 min-h-[520px]'}
      `}
    >
      <h3 className={`font-black mb-6 italic flex items-center gap-3 leading-tight group-hover:scale-105 transition-transform duration-300 ${isCompact ? 'text-xl' : 'text-2xl xl:text-3xl'} ${textColor}`}>
        <span className="w-5 h-5 rounded-full bg-current shadow-[0_0_15px_rgba(0,0,0,0.1)]"></span>
        <span className={isCompact ? '' : 'whitespace-nowrap'}>{title}</span>
      </h3>
      <div className={`text-slate-700 font-bold space-y-4 flex-grow text-justify ${isCompact ? 'text-[14px] leading-relaxed' : 'text-[18px] leading-[2.0]'}`}>
        {children}
      </div>
    </motion.div>
  );
};

export default function TechDetail() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    // mainの背景を透明にして、背面のインクを見せる
    <main className="min-h-screen bg-transparent text-slate-800 font-sans selection:bg-yellow-200 relative overflow-x-hidden font-bold">
      
      {/* --- スクロールプログレスバー --- */}
      <motion.div className="fixed top-0 left-0 right-0 h-2 bg-blue-500 origin-left z-[100]" style={{ scaleX }} />

      {/* --- 最背面レイヤー：背景色と動くインク --- */}
      <div className="fixed inset-0 -z-20 bg-[#fcfdff]" /> {/* ベースの背景色 */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* 青のインク */}
        <motion.div 
          animate={{ 
            y: [0, 40, 0],
            x: [0, 20, 0],
            scale: [1, 1.1, 1] 
          }} 
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-blue-400/15 rounded-full blur-[120px] will-change-transform" 
        />
        {/* 赤のインク */}
        <motion.div 
          animate={{ 
            y: [0, -50, 0],
            x: [0, -30, 0],
            scale: [1, 1.2, 1] 
          }} 
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[-5%] left-[-5%] w-[700px] h-[700px] bg-red-400/10 rounded-full blur-[120px] will-change-transform" 
        />
        {/* 黄のインク */}
        <motion.div 
          animate={{ 
            opacity: [0.4, 0.7, 0.4],
            scale: [1, 1.1, 1]
          }} 
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[30%] left-[10%] w-[400px] h-[400px] bg-yellow-300/20 rounded-full blur-[90px] will-change-transform" 
        />
      </div>

      {/* --- ナビゲーション --- */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/20 backdrop-blur-xl border-b border-white/30 p-5">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-blue-600 font-black flex items-center gap-3 hover:scale-105 transition-transform text-xl group">
            <span className="group-hover:-translate-x-1 transition-transform font-sans">←</span> TOP PAGE
          </Link>
          <div className="text-right">
            <span className="text-[10px] font-black text-slate-400 tracking-[0.5em] uppercase block">Development Story</span>
            <span className="text-[10px] font-black text-blue-500 uppercase">TECHNICAL Report</span>
          </div>
        </div>
      </nav>

      {/* --- ヒーローエリア --- */}
      <header className="pt-64 pb-48 px-4 text-center relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <h1 className="text-6xl md:text-[9rem] font-black mb-12 leading-[0.85] tracking-[-0.06em] text-slate-900">
            AI <span className="text-blue-500">PLAY</span><br />
            EXPERIENCE.
          </h1>
          <p className="text-xl md:text-3xl text-slate-500 font-black max-w-4xl mx-auto leading-relaxed mt-12">
            〜「pAInt」開発の裏側と、成功に至るまでの道のり〜
          </p>
          <motion.div animate={{ y: [0, 15, 0] }} transition={{ duration: 2, repeat: Infinity }} className="mt-16 text-blue-400 text-4xl">↓</motion.div>
        </motion.div>
      </header>

      <section className="pb-64 px-4 relative z-10 space-y-64 max-w-7xl mx-auto">
          
          {/* 1. きっかけ */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-slate-900 text-white p-12 md:p-24 rounded-[100px] shadow-2xl relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-blue-500/10 to-transparent pointer-events-none" />
            <h2 className="text-3xl md:text-5xl font-black mb-12 italic border-b-4 border-blue-500 inline-block">
              Origin: AIとの新たな向き合い方
            </h2>
            <div className="grid md:grid-cols-2 gap-16 text-lg md:text-xl font-bold leading-relaxed opacity-90 text-justify">
              <p>
                　生成AIの急速な普及により、かつては高度な技術だったAIは、今や私たちの身近な存在になりました。一方で、AIが<strong><span className="text-blue-400 underline decoration-blue-300 decoration-2 underline-offset-4">「なぜその答えを出したのか」</span></strong>という思考の過程は、依然としてブラックボックスのままです。これからの時代に求められるのは、AIを便利な道具として使うことだけではなく、その特性や限界、考え方を理解した上で共に向き合う姿勢だと私たちは考えました。
              </p>
              <p>
                　そこで私たちは、AIの思考や判断の仕組みを、誰もが直感的に体験できる形で可視化できないかと考えました。ただ学ぶのではなく、遊びの中で自然に触れ、理解が深まる体験をつくること。こうして生まれたのが、<strong><span className="text-blue-400 underline decoration-blue-300 decoration-2 underline-offset-4">ゲーム体験の中に、AIへの学び</span></strong>を組み込んだ「pAInt」プロジェクトです。
              </p>
            </div>
          </motion.div>

          {/* 2. 3つのこだわり */}
          <div>
            <SubHeader emoji="🎯">プロダクトを支える3つの柱</SubHeader>
            <div className="grid md:grid-cols-3 gap-10">
              <DetailCard title="筐体という存在感" color="border-blue-500">
                <p>　ネットの海に埋もれるデジタル作品ではなく、<strong><span className="text-blue-600 underline decoration-blue-200 decoration-4 underline-offset-4">大学の廊下</span></strong>という現実空間で勝負。アーケード筐体という形式が生む非日常性によって、通りすがりの人の好奇心を引き出し、「思わず触れてしまう」体験を生み出します。<br />　私たちはこの<strong><span className="text-blue-600 underline decoration-blue-200 decoration-4 underline-offset-4">偶発的な出会い</span></strong>をエンターテインメントとして最大化し、筐体だからこそ実現できる、唯一無二の体験価値を追求しました。</p>
              </DetailCard>
              <DetailCard title="徹底したユーザ目線" color="border-red-500">
                <p>　当初は、想定通りには機能しない場面も多く、体験の途中で離脱してしまうユーザが少なくありませんでした。そこで私たちは、ユーザへの<strong><span className="text-red-600 underline decoration-red-200 decoration-4 underline-offset-4">ヒアリングやアンケート、ログ分析</span></strong>を通じて原因を可視化し、UI/UXや体験時間を徹底的に見直しました。<br />　常に「作りたいもの」ではなく<strong><span className="text-red-600 underline decoration-red-200 decoration-4 underline-offset-4">「遊ばれ続ける体験」</span></strong>を基準に改善を重ねたことが、pAIntの体験設計を支えています。</p>
              </DetailCard>
              <DetailCard title="AIフィードバック" color="border-yellow-500">
                <p>　単なる「勝ち負け」で終わらせないのがpAIntの最大の特徴です。バトル後のAIによる言語化された判断理由を見て、ユーザはAIについての学びをより深めることができます。<br />　さらに、<strong><span className="text-yellow-600 underline decoration-yellow-200 decoration-4 underline-offset-4">公式LINEで「図鑑」として持ち帰り可能</span></strong>で、学びを思い出として手元に残せます。</p>
              </DetailCard>
            </div>
          </div>

          {/* 3. Hardware */}
          <div>
            <SubHeader emoji="⚙️">Hardware: 「手触り感」のある体験の設計</SubHeader>
            <div className="grid lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 space-y-8">
                <motion.div 
                  whileHover={{ scale: 1.01 }}
                  className="bg-white/40 backdrop-blur-xl p-10 rounded-[60px] shadow-xl border-4 border-white relative overflow-hidden"
                >
                  <p className="mb-8 italic text-slate-900 text-2xl font-black border-l-8 border-blue-500 pl-6">画面の中だけで完結させない、新たな体験を。</p>
                  <div className="text-lg font-bold text-slate-600 leading-9 space-y-6">
                    <p>● 私たちは、通りすがりの人が「面白そうだからやってみよう」と思える気軽なプレイ体験を目指し、<strong><span className="text-blue-600 underline decoration-blue-200 decoration-4 underline-offset-4">アーケード筐体そのものから制作</span></strong>しました。素材には加工のしやすい木材を選定。材料調達から組み立て、ゲームの世界観を体現した目を引く塗装まで、すべて自分たちで担当しました。</p>
                    <p>● 入力デバイスも、市販品ではなく<strong><span className="text-blue-600 underline decoration-blue-200 decoration-4 underline-offset-4">3Dプリンタを利用した専用コントローラー</span></strong>を自作。直感的な「持ちやすさ」を追求すると同時に、配線作業も自ら行うことでアーケード特有の「ボタンを叩く感触」にもこだわりました。</p>
                    <p>● もう一つの特徴は、デジタルとリアルを融合させる<strong><span className="text-blue-600 underline decoration-blue-200 decoration-4 underline-offset-4">贅沢な2画面構成</span></strong>です。メイン画面ではド派手な演出とバトルを担当し、手元にはサブ画面と「お絵描き用タブレット」を配置。アナログな感触をあえて残すことで、没入感を両立させています。</p>
                  </div>
                </motion.div>
              </div>

              <div className="lg:col-span-5 flex flex-col gap-5">
                {[
                  { src: "/images/controller1.jpg", label: "Custom Controller" },
                  { src: "/images/working_photo1.jpg", label: "DUAL-SCREEN INTERACTION" }
                ].map((img, i) => (
                  <motion.div 
                    key={i} 
                    whileHover={{ scale: 1.05 }}
                    className="relative rounded-[40px] overflow-hidden shadow-2xl border-4 border-white"
                  >
                    <Image src={img.src} alt={img.label} width={600} height={400} className="object-cover" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
                      <p className="text-white text-xs font-black tracking-widest uppercase">{img.label}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* 4. Software */}
          <div>
            <SubHeader emoji="🎮">Software: 複雑なロジックの統合</SubHeader>
            <div className="grid lg:grid-cols-12 gap-8 items-stretch">
              <div className="lg:col-span-7 bg-white/60 backdrop-blur-xl p-8 rounded-[60px] shadow-2xl border-4 border-white relative overflow-hidden flex flex-col">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400" />
                <p className="text-[10px] font-black text-slate-300 mt-4 mb-0 uppercase tracking-[0.3em] text-center">Full System Architecture</p>
                <div className="flex-grow relative min-h-[700px] flex items-center justify-center">
                  <Image src="/images/system_diagram.png" alt="Architecture" fill className="object-contain p-4" />
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col gap-6">
                <DetailCard title="Front-end" color="border-green-500" isCompact>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-[10px] font-black uppercase mb-4 inline-block">Unity / C#</span>
                  <p className="text-base leading-relaxed">お絵描きからバトル、AI連携までをUnity上で統合。ユーザを飽きさせない演出テンポの最適化やアニメーションを徹底し、体験時間を5分以内に凝縮。さらに初めての人でもつまずかない直感的なUI/UXを実現しました。</p>
                </DetailCard>
                <DetailCard title="Back-end" color="border-blue-500" isCompact>
                   <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-[10px] font-black uppercase mb-4 inline-block">GAS / DRIVE / SHEETS / LINE API/ SLACK API</span>
                   <div className="text-sm space-y-3 pb-10">
                    <p>
                    <strong>● AI連携の自動化:</strong> Unity・Drive・AI・Sheets間のデータ往復をGASで完全制御。AIが生成した属性情報をUnityへ反映しつつ、動的に図鑑画像を自動生成するロジックを構築しました。
                    </p>
                    <p><strong>● 運用監視体制:</strong> LINEへの図鑑送信に加え、Slack APIでプレイ状況をリアルタイム監視。公共展示におけるシステムの安定稼働を技術面で支えています。</p>
                   </div>
                </DetailCard>
                <DetailCard title="AI-Integration" color="border-purple-500" isCompact>
                  <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-[10px] font-black uppercase mb-4 inline-block">OpenAI / GPT-4o</span>
                  <p className="text-base leading-relaxed">gpt-4-vision-previewを活用し、キャプチャ画像から名前や属性を決定。「なぜその判断に至ったのか」を論理的に言語化するプロンプト設計を行い、AIの思考過程を「学び」へ変えています。</p>
                </DetailCard>
              </div>
            </div>
          </div>

          {/* 5. 2つの壁 */}
          <div>
            <SubHeader emoji="🏔️">立ちはだかった2つの壁</SubHeader>
            <div className="space-y-48 relative">
              <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-slate-200/50 hidden lg:block -translate-x-1/2" />
              
              <div className="flex flex-col lg:flex-row gap-16 items-center relative">
                <div className="flex-1 text-left space-y-6">
                  <span className="bg-red-500 text-white px-6 py-2 rounded-full text-xs font-black italic shadow-lg inline-block">CASE 01: 離脱率という真実</span>
                  <h3 className="text-2xl md:text-5xl font-black text-slate-800 tracking-tighter">「物珍しさ」のその先へ</h3>
                  <p className="text-lg leading-9 text-slate-600">　実装当初、筐体の珍しさから多くの人が立ち止まりましたが、最後まで遊んでくれる人はごくわずかでした。私たちはその原因を感覚で判断するのではなく、実際にプレイしたユーザへのヒアリングやアンケート、プレイログの分析を通じて丁寧に捉え直しました。その結果、「体験時間が長すぎること」や「初見では操作やルールが分かりにくいこと」が、離脱の主な要因であると分かりました。そこで、アニメーションによる導線設計やUIの簡略化、AIレスポンスの高速化など、体験の負荷を一つひとつ取り除く改善を繰り返しました。その結果、体験時間を約5分に収めながら離脱を抑えることができ、最終的にはユーザ満足度90%を超える評価につながりました。</p>
                </div>
                <div className="w-16 h-16 bg-red-500 rounded-full border-8 border-white shadow-xl flex items-center justify-center text-white font-black z-10">01</div>
                <div className="flex-1 rotate-2">
                  <motion.div whileHover={{ scale: 1.05, rotate: -2 }} className="bg-white p-6 rounded-[60px] shadow-2xl border-2 border-red-50">
                    <Image src="/images/ux_improvement_flow1.png" alt="UX Analysis" width={450} height={300} className="rounded-3xl" />
                  </motion.div>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row gap-16 items-center relative">
                <div className="flex-1 order-3 lg:order-1 rotate-358">
                  <motion.div whileHover={{ scale: 1.05, rotate: 2 }} className="bg-white p-6 rounded-[60px] shadow-2xl border-2 border-blue-50">
                    <Image src="/images/event3.png" alt="Fieldwork" width={450} height={300} className="rounded-3xl" />
                  </motion.div>
                </div>
                <div className="w-16 h-16 bg-blue-500 rounded-full border-8 border-white shadow-xl flex items-center justify-center text-white font-black z-10 order-1 lg:order-2">02</div>
                <div className="flex-1 order-2 lg:order-3 space-y-6 text-left">
                  <span className="bg-blue-500 text-white px-6 py-2 rounded-full text-xs font-black italic shadow-lg inline-block">CASE 02: チームの熱量</span>
                  <h3 className="text-2xl md:text-5xl font-black text-slate-800 tracking-tighter">「ユーザの笑顔」が火を付けた</h3>
                  <p className="text-lg leading-9 text-slate-600">　設置後の安定期、プロジェクトは一定の完成度に達した一方で、チーム内にはどこか停滞感が生まれていました。そこで私は、改善を磨き続ける大切さを共有するため、あえてオープンキャンパスへの展示を提案。会場では、自分たちが作った筐体の前で、多くの人が笑い、驚き、楽しむ姿を直接目にすることができました。画面上の数値や評価ではなく、目の前のユーザの「楽しさ」や「喜び」を実感できたことが、チームの意識を大きく変えました。この体験をきっかけに、「もっと良くしたい」「最高の形で届けたい」という思いが再びチームに火を灯し、現在の完成度、そして企業賞の受賞へとつながっています。</p>
                </div>
              </div>
            </div>
          </div>

          {/* 6. 学んだこと */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-yellow-400 p-12 md:p-24 rounded-[100px] shadow-2xl text-slate-900 relative overflow-hidden"
          >
            <h2 className="text-4xl md:text-7xl font-black mb-12 italic tracking-tighter">Final Thoughts</h2>
            <div className="space-y-10 text-xl md:text-3xl font-black leading-tight">
              <p className="relative pl-10 border-l-8 border-slate-900">ものづくりとは、作って終わりではなく、常に最善を尽くすこと。</p>
              <p className="relative pl-10 border-l-8 border-slate-900">技術はいかに人に新しい驚きや発見を、体験として届けられるかどうか。</p>
              <p className="relative pl-10 border-l-8 border-slate-900">現場での反応や笑顔こそが情熱を維持し、大きなやりがいとなる。</p>
            </div>
          </motion.div>
      </section>

      <footer className="py-40 text-center bg-white/80 backdrop-blur-md relative z-10">
        <Link href="/" className="inline-block px-16 py-8 bg-slate-900 text-white font-black rounded-full hover:scale-105 active:scale-95 transition-all shadow-2xl text-2xl tracking-[0.2em]">
          BACK TO TOP
        </Link>
        <p className="mt-16 text-sm font-black text-slate-300 uppercase tracking-[0.6em]">pAInt Project: Making of AI Arcade</p>
      </footer>
    </main>
  );
}