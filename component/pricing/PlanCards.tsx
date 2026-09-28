"use client";

import { useState, type ReactNode } from "react";

const PRICES = {
  monthly: { std: "99,000", pro: "299,000" },
  annual: { std: "82,500", pro: "249,200" },
};

const CHECK = (
  <span className="w-4.25 h-4.25 rounded-full bg-brand-light flex items-center justify-center shrink-0 mt-0.5">
    <svg width="9" height="8" viewBox="0 0 10 8" fill="none">
      <polyline points="1,4 3.5,7 9,1" stroke="var(--color-brand)" strokeWidth="2.5" fill="none" />
    </svg>
  </span>
);
const DASH = <span className="w-4.25 h-4.25 flex items-center justify-center shrink-0 text-gray-300 text-sm mt-0.5">–</span>;

export default function PlanCards({ onLoginClick }: { onLoginClick: () => void }) {
  const [annual, setAnnual] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-center gap-3.5 mt-9 mb-14">
        <span className={`text-sm font-semibold ${!annual ? "text-gray-900" : "text-gray-500"}`}>월간 결제</span>
        <button
          onClick={() => setAnnual((a) => !a)}
          className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer ${annual ? "bg-brand" : "bg-gray-200"}`}
        >
          <span
            className={`absolute w-4.5 h-4.5 bg-white rounded-full top-0.75 shadow transition-transform ${
              annual ? "translate-x-5.5" : "translate-x-0.75"
            }`}
          />
        </button>
        <span className={`text-sm font-semibold ${annual ? "text-gray-900" : "text-gray-500"}`}>연간 결제</span>
        <span className="inline-flex items-center px-2 py-0.5 bg-brand-light text-brand text-[11.5px] font-bold rounded-full border border-[#fbd5ce]">
          2개월 무료
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start max-w-[1100px] mx-auto">
        {/* FREE */}
        <div className="bg-white border border-gray-200 rounded-2xl p-8">
          <div className="text-[13px] font-bold text-gray-500 uppercase tracking-wide mb-2.5">무료</div>
          <div className="text-4xl font-black tracking-[-1px] mb-1.5">0원</div>
          <div className="text-[13.5px] text-gray-500 leading-relaxed mb-6 min-h-10">
            플랫폼 체험 및 기본 파트너 탐색에 적합합니다.
          </div>
          <div className="h-px bg-gray-200 mb-5.5" />
          <button
            onClick={onLoginClick}
            className="w-full py-2.75 text-sm font-bold text-gray-700 bg-white border-[1.5px] border-gray-200 rounded-[10px] mb-6 hover:border-gray-400 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            무료로 시작하기
          </button>
          <ul className="flex flex-col gap-2.5">
            <Feature ok>파트너 검색 월 3회</Feature>
            <Feature ok>기관 프로필 조회</Feature>
            <Feature ok>공고 알림 기본 (주 1회)</Feature>
            <Feature>컨소시엄 방 생성</Feature>
            <Feature>성공률 분석</Feature>
            <Feature>AI 제안서 자동 생성</Feature>
            <Feature>전담 매니저 지원</Feature>
          </ul>
        </div>

        {/* STANDARD */}
        <div className="relative bg-white border-2 border-brand rounded-2xl p-8">
          <div className="absolute -top-3.25 left-1/2 -translate-x-1/2 bg-brand text-white text-[11.5px] font-bold px-3.5 py-0.75 rounded-full whitespace-nowrap">
            가장 인기
          </div>
          <div className="text-[13px] font-bold text-gray-500 uppercase tracking-wide mb-2.5">스탠다드</div>
          <div className="flex items-baseline gap-1 mb-1.5">
            <span className="text-4xl font-black tracking-[-1px]">{annual ? PRICES.annual.std : PRICES.monthly.std}</span>
            <span className="text-sm text-gray-400">원 / 월</span>
          </div>
          <div className="text-[13.5px] text-gray-500 leading-relaxed mb-6 min-h-10">
            중소기업·연구자가 가장 많이 선택하는 플랜입니다.
          </div>
          <div className="h-px bg-gray-200 mb-5.5" />
          <button
            onClick={onLoginClick}
            className="w-full py-2.75 text-sm font-bold text-white bg-brand rounded-[10px] mb-6 hover:bg-brand-hover transition-colors cursor-pointer"
          >
            14일 무료 체험
          </button>
          <ul className="flex flex-col gap-2.5">
            <Feature ok>파트너 검색 무제한</Feature>
            <Feature ok>기관 프로필 조회</Feature>
            <Feature ok>공고 알림 실시간</Feature>
            <Feature ok>컨소시엄 방 최대 3건</Feature>
            <Feature ok>성공률 분석 기본</Feature>
            <Feature>AI 제안서 자동 생성</Feature>
            <Feature>전담 매니저 지원</Feature>
          </ul>
        </div>

        {/* PRO */}
        <div className="bg-white border border-gray-200 rounded-2xl p-8">
          <div className="text-[13px] font-bold text-gray-500 uppercase tracking-wide mb-2.5">프로</div>
          <div className="flex items-baseline gap-1 mb-1.5">
            <span className="text-4xl font-black tracking-[-1px]">{annual ? PRICES.annual.pro : PRICES.monthly.pro}</span>
            <span className="text-sm text-gray-400">원 / 월</span>
          </div>
          <div className="text-[13.5px] text-gray-500 leading-relaxed mb-6 min-h-10">
            주관기관·대형 연구기관을 위한 풀서비스 플랜입니다.
          </div>
          <div className="h-px bg-gray-200 mb-5.5" />
          <button
            onClick={onLoginClick}
            className="w-full py-2.75 text-sm font-bold text-gray-700 bg-white border-[1.5px] border-gray-200 rounded-[10px] mb-6 hover:border-gray-400 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            14일 무료 체험
          </button>
          <ul className="flex flex-col gap-2.5">
            <Feature ok>파트너 검색 무제한</Feature>
            <Feature ok>기관 프로필 조회</Feature>
            <Feature ok>공고 알림 실시간</Feature>
            <Feature ok>컨소시엄 방 무제한</Feature>
            <Feature ok>성공률 분석 고급</Feature>
            <Feature ok>AI 제안서 자동 생성</Feature>
            <Feature ok>전담 매니저 지원</Feature>
          </ul>
        </div>
      </div>
    </div>
  );
}

function Feature({ ok, children }: { ok?: boolean; children: ReactNode }) {
  return (
    <li className={`flex items-start gap-2.25 text-[13.5px] leading-relaxed ${ok ? "text-gray-600" : "text-gray-400"}`}>
      {ok ? CHECK : DASH}
      {children}
    </li>
  );
}
