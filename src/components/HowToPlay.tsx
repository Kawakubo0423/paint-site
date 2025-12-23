export default function HowToPlay() {
  const steps = [
    {
      title: "描く",
      body: "好きな生き物を自由にお絵描き。上手い下手より“発想”が大事。",
      icon: "🖍️",
    },
    {
      title: "AIが命名・分類",
      body: "AIが絵を見て、名前・属性（陸/海/空）・技名を自動生成。",
      icon: "🤖",
    },
    {
      title: "技を選ぶ",
      body: "陸=グー / 空=チョキ / 海=パー。3つの技から選択。",
      icon: "✊✌️🖐️",
    },
    {
      title: "推理じゃんけんバトル",
      body: "相手の属性は見えない。見た目・名前・倍率表示から推理して勝つ。",
      icon: "🧠",
    },
    {
      title: "AIの理由を学ぶ",
      body: "なぜその属性にしたのかをAIが解説。AIの思考を“言語化”で理解。",
      icon: "📚",
    },
    {
      title: "図鑑を持ち帰る",
      body: "絵・技名・解説がまとまった図鑑をLINEからダウンロード。",
      icon: "📱",
    },
  ];

  return (
    <section id="how" className="mx-auto max-w-6xl px-4 py-16 md:py-24">
      <div className="flex items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl font-extrabold md:text-4xl">How to Play</h2>
          <p className="mt-3 max-w-2xl text-slate-600">
            描く → AI生成 → 推理 → バトル → 学び、の流れで“遊びながらAI理解”へ。
          </p>
        </div>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {steps.map((s) => (
          <div
            key={s.title}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="text-2xl">{s.icon}</div>
            <div className="mt-3 text-lg font-bold">{s.title}</div>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              {s.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
