import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CL Korea — AI 기반 정부 R&D 컨소시엄 매칭 플랫폼",
  description:
    "NTIS·KIPRIS·DART·RISS 데이터를 실시간으로 분석해 최적의 연구 파트너를 찾고, 컨소시엄을 자동으로 구성합니다.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-white text-gray-900">{children}</body>
    </html>
  );
}
