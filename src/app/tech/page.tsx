"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

// --- 小見出しコンポーネント ---
const SubHeader = ({ children, emoji }: { children: string; emoji: string }) => (
  <h2 className="text-2xl md:text-4xl font-black mb-12 border-l-[16px] border-blue-500 pl-6 flex items-center gap-4 text-slate-800 tracking-tighter">
    <span className="text-5xl">{emoji}</span> {children}
  </h2>
);

// --- こだわりカードコンポーネント ---
const DetailCard = ({ title, children, color }: { title: string; children: React.ReactNode; color: string }) => (
  <div className={`p-8 rounded-[40px] border-4 ${color} bg-white/60 backdrop-blur-md shadow-xl h-full flex flex-col hover:scale-[1.02] transition-transform duration-300`}>
    <h3 className="text-xl font-black mb-4 italic flex items-center gap-2">
      <span className="w-3 h-3 rounded-full bg-current"></span> {title}
    </h3>
    <div className="text-slate-600 font-bold leading-relaxed text-sm space-y-3 flex-grow">
      {children}
    </div>
  </div>
);

export default function TechDetail() {
  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans selection:bg-yellow-200 relative overflow-hidden">
      
      {/* --- 背景アレンジ：pAIntらしいインクの滲み演出 --- */}
      <div className="absolute top-[5%] right-[-10%] w-[600px] h-[600px] bg-blue-300/20 rounded-full blur-[120px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-[5%] left-[-10%] w-[700px] h-[700px] bg-red-300/20 rounded-full blur-[150px] -z-10 animate-pulse transition-all duration-[4s]"></div>
      <div className="absolute top-[35%] left-[0%] w-[500px] h-[500px] bg-yellow-300/25 rounded-full blur-[110px] -z-10 animate-pulse delay-700"></div>
      <div className="absolute top-[65%] right-[5%] w-[450px] h-[450px] bg-blue-200/20 rounded-full blur-[100px] -z-10 animate-pulse delay-1000"></div>

      {/* --- ナビゲーション --- */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/60 backdrop-blur-xl border-b border-slate-200/50 p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-blue-500 font-black flex items-center gap-2 hover:scale-105 transition-transform text-lg">
            ← TOP PAGE
          </Link>
          <span className="text-xs font-black text-slate-400 tracking-[0.4em] uppercase">Development Story</span>
        </div>
      </nav>

      {/* --- ヒーローエリア --- */}
      <header className="pt-48 pb-32 px-4 text-center relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="text-5xl md:text-8xl font-black mb-10 leading-[1.05] tracking-tight text-slate-900">
            AIとアーケードで、<br /><span className="text-blue-500">「新たな体験」</span>のカタチに。
          </h1>
          <p className="text-xl md:text-2xl text-slate-500 font-black max-w-3xl mx-auto leading-relaxed">
            なぜ私たちは、このプロジェクトを始めたのか。
          </p>
        </motion.div>
      </header>

      <section className="pb-32 px-4 relative z-10 space-y-48 max-w-6xl mx-auto">
          
          {/* 1. きっかけ */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <div className="bg-slate-900 text-white p-12 md:p-24 rounded-[100px] shadow-2xl relative overflow-hidden">
              <div className="absolute -top-20 -right-20 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px]"></div>
              <h2 className="text-3xl md:text-5xl font-black mb-12 italic border-b-4 border-blue-500 inline-block">
                Origin: AIとの新たな向き合い方
              </h2>
              <div className="grid md:grid-cols-2 gap-16 text-lg font-bold leading-relaxed opacity-90 text-justify">
                <p>
                  生成AIの急速な普及により、高度な技術であったAIは私たちの身近な存在となりました。一方で、AIが<span className="text-blue-400">「なぜその答えを出したのか」</span>という思考過程はブラックボックスのままです。しかし、これからの時代はAIの利便性や懸念点を理解した上で活用することが重要になってきます。
                </p>
                <p>
                  そこで私たちは、<span className="text-blue-400">「誰もが楽しめるゲーム」</span>を通して、この課題に挑戦しました。<br />AIの思考過程や考え方を誰もが直感的に体験できる形で可視化し、AIとの新たな向き合い方を提案したいと考え、このプロジェクトをスタートさせました。
                </p>
              </div>
            </div>
          </motion.div>

          {/* 2. 3つの徹底的なこだわり */}
          <div>
            <SubHeader emoji="🎯">プロダクトを支える3つの柱</SubHeader>
            <div className="grid md:grid-cols-3 gap-10">
              <DetailCard title="筐体という「存在感」" color="border-blue-500 text-blue-500">
                <p>ネットの海に埋もれるデジタル作品ではなく、<strong><span className="text-blue-500 font-bold">大学の廊下</span></strong>という現実空間で勝負。「面白そうなのがあるからやってみる」「偶然通った人が思わず触れてしまう」、私たちにしかできないような唯一無二で新たな体験を追求しました。</p>
              </DetailCard>
              <DetailCard title="徹底した「ユーザ体験」" color="border-red-500 text-red-500">
                <p>当初の課題は「体験時間の長さ」や「分かりにくいUI」による離脱者の多さでした。私たちはユーザへの<strong><span className="text-red-500 font-bold">ヒアリングやアンケート、ログ分析</span></strong>を通じてUI/UXや体験時間を徹底的に見直し、常にユーザ目線での改善を繰り返しました。</p>
              </DetailCard>
              <DetailCard title="AIから「フィードバック」" color="border-yellow-500 text-yellow-500">
                <p>単なる「勝ち負け」で終わらせないのが最大の特徴。バトル後のハカセによる言語化された判断理由を見て、ユーザはAIについて学ぶことができます。<br /><strong><span className="text-yellow-500 font-bold">公式LINEで「図鑑」として持ち帰り可能</span></strong>で、学びを思い出として手元に残せます。</p>
              </DetailCard>
            </div>
          </div>

          {/* 3. Hardware (デザイン強化：画像を右側にコンパクトに配置) */}
          <div>
            <SubHeader emoji="🪚">Hardware: 「手触り感」のある体験の設計</SubHeader>
            <div className="grid lg:grid-cols-12 gap-8 items-start">
              
              {/* テキストエリア (左側 7カラム) */}
              <div className="lg:col-span-7 bg-white/40 backdrop-blur-md p-10 rounded-[60px] shadow-xl border-4 border-blue-500/10 relative overflow-hidden h-full">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -mr-16 -mt-16"></div>
                <p className="mb-8 italic text-slate-900 text-2xl font-black border-l-8 border-blue-500 pl-6">
                  画面の中だけで完結させない、新たな体験を。
                </p>
                <div className="text-lg font-bold text-slate-600 leading-9 space-y-6">
                  <p>
                    私たちは「通りすがりの人が、面白そうだからやってみよう」と思える気軽なプレイ体験を目指し、<strong>アーケード筐体そのものから設計</strong>を行いました。素材には加工のしやすい木材を選定。材料調達から組み立て、ゲームの世界観を体現した目を引く塗装まで、すべて自分たちで担当しました。
                  </p>
                  <p>
                    入力デバイスも、市販品ではなく<strong>3Dプリンタを利用した専用コントローラー</strong>を自作。直感的な「持ちやすさ」を追求すると同時に、配線作業も自ら行うことでアーケード特有の「ボタンを叩く感触」にもこだわりました。
                  </p>
                  <p>
                    最大の特徴は、デジタルとリアルを融合させる<strong>贅沢な2画面構成</strong>です。メイン画面ではド派手な演出とバトルを担当し、手元にはサブ画面と「お絵描き用タブレット」を配置。 実際にペンを使って生き物を描くというアナログな感触をあえて残すことで、UI/UXの配慮と没入感を両立させています。 
                  </p>
                </div>
              </div>

              {/* 画像エリア (右側 5カラム) - 指定の赤枠サイズを意識した縦並び */}
              <div className="lg:col-span-5 flex flex-col gap-6 h-full justify-between">
                <motion.div whileHover={{ scale: 1.03 }} className="bg-white p-4 rounded-3xl shadow-lg border-2 border-slate-100 flex flex-col items-center">
                  <div className="relative w-full aspect-[10/4] rounded-2xl overflow-hidden bg-slate-100 mb-3 shadow-inner">
                    <Image src="/images/event3.jpg" alt="Arcade Cabinet" fill className="object-cover" />
                  </div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Main Arcade Cabinet</p>
                </motion.div>

                <motion.div whileHover={{ scale: 1.03 }} className="bg-white p-4 rounded-3xl shadow-lg border-2 border-slate-100 flex flex-col items-center">
                  <div className="relative w-full aspect-[10/4] rounded-2xl overflow-hidden bg-slate-100 mb-3 shadow-inner">
                    <Image src="/images/controller_photo.jpg" alt="3D Print Controller" fill className="object-cover" />
                  </div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">3D Printed Controller</p>
                </motion.div>

                <motion.div whileHover={{ scale: 1.03 }} className="bg-white p-4 rounded-3xl shadow-lg border-2 border-slate-100 flex flex-col items-center">
                  <div className="relative w-full aspect-[10/4] rounded-2xl overflow-hidden bg-slate-100 mb-3 shadow-inner">
                    <Image src="/images/working_photo.jpg" alt="Work Scene" fill className="object-cover" />
                  </div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Manufacturing Process</p>
                </motion.div>
              </div>

            </div>
          </div>

          {/* 4. Software (新提案：構成図を左に、解説カードを右に縦並び) */}
          <div>
            <SubHeader emoji="⚡">Software: 複雑なロジックの統合</SubHeader>
            <div className="grid lg:grid-cols-12 gap-8 items-stretch">
              
              {/* システム構成図 (左側 7カラム) */}
              <div className="lg:col-span-7 bg-white/70 backdrop-blur-md p-10 rounded-[60px] shadow-2xl border-4 border-slate-100 relative overflow-hidden flex flex-col">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400"></div>
                <p className="text-[10px] font-black text-slate-300 mb-8 uppercase tracking-[0.3em] text-center">Full System Architecture & Technical Stack</p>
                
                <div className="flex-grow flex items-center justify-center relative group">
                  <div className="absolute -inset-4 bg-gradient-to-r from-blue-50 to-slate-50 rounded-[40px] blur-xl opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                  <Image src="/images/system_diagram.png" alt="Architecture" width={450} height={150} className="relative rounded-[40px] shadow-md bg-white/50 p-6" />
                </div>
                
                {/* <div className="mt-10 flex flex-wrap justify-center gap-4">
                   {["unity", "openai", "gas", "line", "slack"].map((tech) => (
                    <div key={tech} className="bg-white px-5 py-2 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-3 grayscale hover:grayscale-0 transition-all duration-300 transform hover:-translate-y-1">
                      <Image src={`/images/tech_${tech}.png`} alt={tech} width={24} height={24} />
                      <span className="text-[9px] font-black uppercase text-slate-400">{tech}</span>
                    </div>
                   ))}
                </div> */}
              </div>

              {/* 解説カード (右側 5カラム 縦並び) */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                <DetailCard title="Frontend" color="border-green-500 text-green-600">
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-[10px] font-black uppercase mb-2 inline-block w-fit">Unity / C#</span>
                  {/* <p className="font-bold text-slate-800 text-sm mb-2">ステートマシンによるゲーム制御</p> */}
                  <p className="text-[15px] leading-relaxed font-bold">
                    お絵描きからバトル、AI連携までをUnity上で統合。ユーザを飽きさせない演出テンポの最適化やアニメーションを徹底し、体験時間を5分以内に凝縮。さらに初めての人でもつまずかない直感的なUI/UXを実現しました。
                  </p>
                </DetailCard>

                <DetailCard title="Backend" color="border-blue-500 text-blue-600">
                   <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-[10px] font-black uppercase mb-2 inline-block w-fit">GAS / Google Drive / Google Sheets / LINE API / Slack API</span>
                   {/* <p className="font-bold text-slate-800 text-sm mb-2">運用を支えるリアルタイム基盤</p> */}
                   <p className="text-[15px] leading-relaxed font-bold">
                    GASを核にLINE Messaging APIを連携。図鑑のスマホ送信機能を構築。さらにSlack APIと連携し、プレイ状況を監視することで公共の場での安定稼働を技術面で支えています。
                   </p>
                </DetailCard>

                <DetailCard title="AI Integration" color="border-purple-500 text-purple-600">
                  <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-[10px] font-black uppercase mb-2 inline-block w-fit">OpenAI API/ GPT-4o</span>
                  {/* <p className="font-bold text-slate-800 text-sm mb-2">納得感を生む思考ロジック</p> */}
                  <p className="text-[15px] leading-relaxed font-bold">
                    gpt-4-vision-previewを活用した画像解析。判断理由を論理的に説明するためのプロンプト最適化に注力。納得感のあるフィードバックを生成するアルゴリズムを開発しました。
                  </p>
                </DetailCard>
              </div>

            </div>
          </div>

          {/* 5. 2つの壁 */}
          <div>
            <SubHeader emoji="🏔️">立ちはだかった2つの壁</SubHeader>
            <div className="space-y-32 relative">
              <div className="absolute left-[50%] top-0 bottom-0 w-1 bg-slate-200/50 hidden lg:block -z-10"></div>
              
              <div className="flex flex-col lg:flex-row gap-16 items-center relative">
                <div className="flex-1 text-right order-2 lg:order-1 space-y-6 text-justify lg:text-right">
                  <span className="bg-red-500 text-white px-6 py-2 rounded-full text-xs font-black italic shadow-lg inline-block">CASE 01: 離脱率という真実</span>
                  <h3 className="text-2xl md:text-4xl font-black text-slate-800">「物珍しさ」のその先へ</h3>
                  <p className="font-bold leading-9 text-slate-600">
                    実装当初、筐体の珍しさに多くの人が立ち止まりましたが、完走してくれる人はごくわずかでした。原因究明のため、現場でのプレイヤー観察やログ分析を徹底的に行いました。判明したのは「体験時間が長すぎる」「初見では説明が分かりにくい」という課題でした。私たちは「5分」を最大限楽しんでもらうため、UIをシンプルにし、AIのレスポンスを1秒でも速める改善を繰り返しました。その執念が、満足度90%超という評価を導きました。
                  </p>
                </div>
                <div className="w-20 h-20 bg-red-500 rounded-full border-[10px] border-white shadow-2xl flex items-center justify-center text-white font-black text-2xl z-10 order-1 lg:order-2 shrink-0">01</div>
                <div className="flex-1 order-3">
                  <div className="bg-white/80 backdrop-blur-sm p-8 rounded-[60px] shadow-2xl border-2 border-red-50 transform lg:rotate-3 transition-all">
                    <Image src="/images/ux_improvement_flow.png" alt="UX Analysis" width={450} height={300} className="rounded-3xl" />
                  </div>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row gap-16 items-center relative">
                <div className="flex-1 order-3 lg:order-1">
                  <div className="bg-white/80 backdrop-blur-sm p-8 rounded-[60px] shadow-2xl border-2 border-blue-50 transform lg:-rotate-3 transition-all">
                    <Image src="/images/event1.jpg" alt="Fieldwork" width={500} height={500} className="rounded-3xl" />
                  </div>
                </div>
                <div className="w-20 h-20 bg-blue-500 rounded-full border-[10px] border-white shadow-2xl flex items-center justify-center text-white font-black text-2xl z-10 order-1 lg:order-2 shrink-0">02</div>
                <div className="flex-1 order-2 lg:order-3 space-y-6 text-left text-justify">
                  <span className="bg-blue-500 text-white px-6 py-2 rounded-full text-xs font-black italic shadow-lg inline-block">CASE 02: チームの熱量</span>
                  <h3 className="text-2xl md:text-4xl font-black text-slate-800">「現場の笑顔」が火を付けた</h3>
                  <p className="font-bold leading-9 text-slate-600">
                    設置後の安定期、メンバーのモチベーションが低下しました。改善を磨き続ける大切さを共有するため、あえてオープンキャンパスへの展示を強行。「自分が作ったものの前で子供たちが本気で笑い、驚く姿を直接肌で感じる」という、私たちのプロダクトにしかできない体験を共有しました。画面上の数字ではなく、目の前の喜びを分かち合った瞬間、チームに「最高のものに仕上げたい」という執念が再燃。これが今の完成度と、企業賞受賞という結末に繋がりました。
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 6. 学んだこと */}
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="bg-yellow-400 p-12 md:p-24 rounded-[100px] shadow-[0_40px_100px_rgba(255,204,0,0.3)] text-slate-900 relative overflow-hidden">
               <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-white/20 rounded-full blur-[120px]"></div>
               <h2 className="text-4xl md:text-7xl font-black mb-16 italic tracking-tighter text-center lg:text-left">
                 Final Thoughts: <br />エンジニアとしての覚悟
               </h2>
               <div className="space-y-10 text-xl md:text-3xl font-black leading-tight tracking-tight text-justify lg:text-left">
                 <p className="relative pl-10 border-l-8 border-slate-900">ものづくりとは、誰かの『大切な時間』を預かるということ。</p>
                 <p className="relative pl-10 border-l-8 border-slate-900">技術はいかに「驚き」と「納得」という体験に変えられるか。</p>
                 <p className="relative pl-10 border-l-8 border-slate-900">現場の笑顔で情熱を維持する。これが私たちの最高の正解でした。</p>
               </div>
            </div>
          </motion.div>
      </section>

      {/* --- フッター --- */}
      <footer className="py-40 text-center bg-white relative z-10">
        <Link href="/" className="inline-block px-16 py-7 bg-slate-900 text-white font-black rounded-full hover:scale-105 active:scale-95 transition-all shadow-[0_20px_50px_rgba(0,0,0,0.2)] text-2xl tracking-[0.2em]">
          BACK TO TOP
        </Link>
        <p className="mt-16 text-sm font-black text-slate-300 uppercase tracking-[0.6em]">pAInt Project: Developed for Nintendo selection</p>
      </footer>

    </main>
  );
}