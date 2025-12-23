import type { Metadata } from "next";
import { M_PLUS_Rounded_1c } from "next/font/google"; // Google Fonts読み込み
import "./globals.css";

// フォントの設定（太さ400, 700, 800を使用）
const mPlus = M_PLUS_Rounded_1c({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  variable: "--font-mplus",
});

export const metadata: Metadata = {
  title: "pAInt -全てはAI次第！？お絵かきジャンケンバトル！-",
  description: "手作りアーケード筐体 × 生成AI × 心理戦バトル",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${mPlus.className} antialiased bg-slate-50 text-slate-800`}>
        {children}
      </body>
    </html>
  );
}