"use client";

import { useLoginModal } from "./LoginModalContext";
import HeroMockup from "./HeroMockup";

export default function Hero() {
  const { openLogin } = useLoginModal();

  return (
    <section className="max-w-[1280px] mx-auto px-10 pt-20 grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-14 items-start">
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-50 text-brand-800 text-[12.5px] font-semibold rounded-full border border-brand-200 animate-fade-up [animation-delay:.1s]">
          <span className="relative w-1.5 h-1.5 bg-brand-500 rounded-full">
            <span className="absolute inset-0 bg-brand-500 rounded-full animate-brand-ping" />
          </span>
          AI 기반 R&D 컨소시엄 매칭 · 베타 운영 중
        </div>

        <h1 className="mt-5 text-[52px] font-black leading-[1.12] tracking-[-1.5px] text-gray-900 opacity-0 animate-fade-up [animation-delay:.2s]">
          정부 R&D
          <br />
          컨소시엄 구성,
          <br />
          <em className="not-italic text-brand-600">AI가 최적화</em>합니다
        </h1>

        <p className="mt-5 text-[17px] text-gray-500 leading-relaxed opacity-0 animate-fade-up [animation-delay:.35s]">
          NTIS·KIPRIS·DART·RISS 데이터를 실시간으로 분석해
          <br />
          최적의 연구 파트너를 찾고, 컨소시엄을 자동으로 구성합니다.
          <br />
          공고 발굴부터 협약 체결까지, CL Korea와 함께하세요.
        </p>

        <div className="mt-8 flex gap-3 items-center opacity-0 animate-fade-up [animation-delay:.48s]">
          <button
            onClick={openLogin}
            className="px-6 py-3 text-[15px] font-bold text-white bg-brand-600 rounded-[10px] cursor-pointer hover:bg-brand-700 hover:shadow-[0_4px_14px_rgb(var(--rgb-brand-600)/.35)] transition-all"
          >
            데모로 체험하기 →
          </button>
        </div>

        <p className="mt-7 text-[12.5px] text-gray-400 opacity-0 animate-fade-up [animation-delay:.6s]">
          <span className="text-gray-600 font-semibold">47개</span> 기관이 활용 중 &nbsp;·&nbsp;{" "}
          평균 매칭 시간 <span className="text-gray-600 font-semibold">72% 단축</span> &nbsp;·&nbsp;{" "}
          성사율 <span className="text-gray-600 font-semibold">97%</span>
        </p>
      </div>

      <HeroMockup />
    </section>
  );
}
