"use client";

import { useLoginModal } from "./LoginModalContext";

export default function CtaSection() {
  const { openLogin } = useLoginModal();

  return (
    <div className="py-24 px-10 bg-brand-800 text-center">
      <div className="max-w-[640px] mx-auto">
        <h2 className="text-[40px] font-black text-white leading-[1.15] tracking-[-1px] mb-4">
          지금 바로 시작하세요
        </h2>
        <p className="text-[17px] text-white/80 leading-relaxed mb-9">
          무료 체험으로 CL Korea의 AI 매칭을 경험해보세요. 설치 없이 즉시 사용 가능합니다.
        </p>
        <div className="flex justify-center gap-3">
          <button
            onClick={openLogin}
            className="px-7 py-3 text-[15px] font-bold text-brand-600 bg-white rounded-[10px] cursor-pointer hover:shadow-lg transition-shadow"
          >
            무료로 시작하기 →
          </button>
          <button
            onClick={openLogin}
            className="px-7 py-3 text-[15px] font-bold text-white bg-transparent border-2 border-white/50 rounded-[10px] cursor-pointer hover:border-white transition-colors"
          >
            데모 신청하기
          </button>
        </div>
      </div>
    </div>
  );
}
