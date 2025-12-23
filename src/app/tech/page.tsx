"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function TechDetail() {
  return (
    <main className="min-h-screen bg-white text-slate-800 font-sans selection:bg-yellow-200">
      
      {/* --- ナビゲーション（戻るボタン） --- */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md p-4">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="text-blue-500 font-bold flex items-center gap-2 hover:opacity-70 transition-opacity">
            ← トップページへ戻る
          </Link>
        </div>
      </nav>

      {/* --- ヒーローエリア --- */}
      <header className="pt-32 pb-16 px-4 bg-slate-50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
              Development Report<br />
              <span className="text-blue-500 text-2xl md:text-3xl">技術解説と開発のこだわり</span>
            </h1>
            <p className="text-slate-500 font-bold italic">"Making of pAInt: From Woodworking to AI Engineering"</p>
          </motion.div>
        </div>
      </header>

      {/* --- コンテンツエリア --- */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto space-y-20">
          
          {/* 1. ハードウェア：手作りへのこだわり */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-black mb-6 border-l-8 border-blue-500 pl-4 flex items-center gap-3">
              <span className="text-4xl">🪚</span> Hardware
            </h2>
            <div className="space-y-4 text-slate-600 leading-8 font-bold">
              <p>
                「画面の中だけで完結しない、手触りのある体験」を目指し、筐体そのものから設計しました。
                大学の工作室を利用し、MDF板の切り出し、塗装、そしてアーケード用ボタンの配線まで全て自分たちで行いました。
              </p>
              <div className="bg-slate-100 p-6 rounded-3xl border-2 border-slate-200">
                <h4 className="text-slate-800 font-black mb-2 italic">技術的ポイント: エルゴノミクスの考慮</h4>
                <p className="text-sm">
                  子供たちが立ったまま長時間遊んでも疲れないよう、パネルの角度を20度に設定。
                  また、バトル時の「叩く楽しさ」を重視し、耐久性の高い三和電子製のボタンを採用しました。
                </p>
              </div>
            </div>
          </motion.div>

          {/* 2. ソフトウェア：Unityによるゲームロジック */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-black mb-6 border-l-8 border-green-500 pl-4 flex items-center gap-3">
              <span className="text-4xl">🎮</span> Software
            </h2>
            <div className="space-y-4 text-slate-600 leading-8 font-bold">
              <p>
                メインシステムはUnity（C#）で構築。
                お絵描きシステム、属性判定アニメーション、そして複雑な3すくみロジックを統合したステートマシンを実装しています。
              </p>
              <div className="bg-green-50 p-6 rounded-3xl border-2 border-green-100">
                <h4 className="text-green-800 font-black mb-2 italic">こだわり：直感的なフィードバック</h4>
                <p className="text-sm text-slate-700">
                  AIの待ち時間（約3〜5秒）を「ハカセが考えている」という演出に変換。
                  プログレスバーを出すのではなく、ハカセのセリフを動的に生成することで、ユーザーの離脱を防ぎつつ期待感を高める工夫をしました。
                </p>
              </div>
            </div>
          </motion.div>

          {/* 3. AI：画像解析とリアルタイム生成 */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-black mb-6 border-l-8 border-purple-500 pl-4 flex items-center gap-3">
              <span className="text-4xl">🧠</span> AI & Backend
            </h2>
            <div className="space-y-4 text-slate-600 leading-8 font-bold">
              <p>
                描かれた絵は即座にPythonサーバーへ送信。Vision AI（GPT-4o等）を用いて画像をベクトル化し、
                事前に定義した「陸・海・空」の概念との類似度を計算して属性を決定しています。
              </p>
              <div className="bg-purple-50 p-6 rounded-3xl border-2 border-purple-100">
                <h4 className="text-purple-800 font-black mb-2 italic">挑戦：安全かつ一貫性のある生成</h4>
                <p className="text-sm text-slate-700">
                  生成AI特有の「ゆらぎ」を抑えるため、厳密なSystem Promptを設計。
                  子供が不適切な絵を描いた場合のガードレール実装に加え、何度遊んでも「納得感」のある判定ロジックの構築に最も時間を費やしました。
                </p>
              </div>
            </div>
          </motion.div>

          {/* 4. 改善のエピソード */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-black mb-6 border-l-8 border-yellow-500 pl-4 flex items-center gap-3">
              <span className="text-4xl">🛠️</span> Lessons Learned
            </h2>
            <div className="bg-yellow-50 p-8 rounded-[40px] border-4 border-yellow-200 shadow-xl">
              <h3 className="text-xl font-black mb-4 text-yellow-800 italic">「600人の声」が教えてくれたこと</h3>
              <p className="text-slate-700 font-bold mb-4">
                当初、バトルは完全自動でしたが、テストプレイで「自分で選びたい！」という声が多く寄せられました。
                そこで急遽、ボタン操作による「コマンド選択」を追加。
              </p>
              <p className="text-slate-700 font-bold">
                「自分の意思が結果に反映される」ことの重要性を学び、これが現在の高い満足度（90%）に繋がっています。
                ユーザーの声に真摯に向き合い、技術を「楽しさ」へ変換する重要性を痛感しました。
              </p>
            </div>
          </motion.div>

        </div>
      </section>

      {/* --- フッター --- */}
      <footer className="py-20 text-center bg-slate-50 border-t border-slate-200">
        <Link href="/" className="inline-block px-12 py-4 bg-blue-500 text-white font-black rounded-full hover:bg-blue-600 transition-all shadow-xl hover:shadow-2xl">
          トップページへ戻る
        </Link>
      </footer>

    </main>
  );
}