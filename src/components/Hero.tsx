import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* 背景 */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white" />
      <div className="absolute -top-24 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-slate-100 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
        <div className="flex flex-col justify-center">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-600">
            🎨 絵から生まれる、新たな体験
          </div>

          <h1 className="mt-4 text-4xl font-extrabold leading-tight md:text-5xl">
            描いた絵が、
            <span className="block">AIで「イキモノ」になる。</span>
          </h1>

          <p className="mt-4 text-base leading-relaxed text-slate-600">
            プレイヤーが描いた生き物をAIが読み取り、名前・属性（陸/海/空）・技を生成。
            相手の属性を推理しながら、じゃんけんバトルで勝利を目指すアーケード型シリアスゲーム。
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#how"
              className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-slate-800"
            >
              遊び方を見る
            </a>
            <a
              href="#cta"
              className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50"
            >
              体験・展示情報
            </a>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-3 text-xs text-slate-600">
            <div className="rounded-xl border border-slate-200 bg-white p-3">
              <div className="font-semibold text-slate-900">AIの思考</div>
              <div className="mt-1">判断理由を言語化</div>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-3">
              <div className="font-semibold text-slate-900">推理バトル</div>
              <div className="mt-1">属性を当てて有利に</div>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-3">
              <div className="font-semibold text-slate-900">図鑑</div>
              <div className="mt-1">LINEで持ち帰れる</div>
            </div>
          </div>
        </div>

        {/* 右側：画像（後で差し替え） */}
        <div className="relative">
          <div className="rounded-3xl border border-slate-200 bg-white p-3 shadow-sm">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100">
              {/* public/images/hero.png を置けば自動で表示される */}
              <Image
                src="/images/hero.png"
                alt="pAInt hero"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-3">
            {["draw.png", "ai.png", "battle.png"].map((name) => (
              <div
                key={name}
                className="relative aspect-square overflow-hidden rounded-2xl border border-slate-200 bg-slate-100"
              >
                <Image
                  src={`/images/${name}`}
                  alt={name}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          <p className="mt-2 text-xs text-slate-500">
            ※画像はあとで差し替え（仮のプレースホルダーでOK）
          </p>
        </div>
      </div>
    </section>
  );
}
