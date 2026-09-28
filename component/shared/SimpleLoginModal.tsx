"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SimpleLoginModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const [email, setEmail] = useState("demo@clkorea.ai");

  if (!open) return null;

  function doLogin() {
    onClose();
    router.push(`/?login=1&email=${encodeURIComponent(email)}`);
  }

  return (
    <div
      className="fixed inset-0 z-200 bg-black/55 flex items-center justify-center"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative bg-white rounded-[20px] p-9 w-full max-w-[400px] shadow-2xl">
        <span
          onClick={onClose}
          className="absolute top-4 right-[18px] text-[22px] text-gray-400 hover:text-gray-700 cursor-pointer leading-none"
        >
          ×
        </span>
        <div className="text-xl font-black text-gray-900 text-center mb-1.5">
          CL<span className="text-brand-800">Korea</span>
        </div>
        <div className="text-[13.5px] text-gray-500 text-center mb-6">
          AI 기반 R&D 컨소시엄 매칭 플랫폼의 실제 검색을 체험합니다
        </div>

        <div className="mb-3.5">
          <label className="block text-[11.5px] font-bold text-gray-500 uppercase tracking-wide mb-1.5">이메일</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="contact@company.com"
            className="w-full px-3.5 py-2.5 border-[1.5px] border-gray-200 rounded-[10px] text-sm outline-none focus:border-brand-600 focus:shadow-[0_0_0_3px_rgb(var(--rgb-brand-600)/.08)]"
          />
        </div>
        <div className="mb-3.5">
          <label className="block text-[11.5px] font-bold text-gray-500 uppercase tracking-wide mb-1.5">비밀번호</label>
          <input
            type="password"
            defaultValue="••••••••"
            className="w-full px-3.5 py-2.5 border-[1.5px] border-gray-200 rounded-[10px] text-sm outline-none focus:border-brand-600 focus:shadow-[0_0_0_3px_rgb(var(--rgb-brand-600)/.08)]"
          />
        </div>

        <button
          onClick={doLogin}
          className="w-full py-3 bg-brand-600 text-white rounded-[10px] text-[15px] font-bold hover:bg-brand-700 transition-colors cursor-pointer"
        >
          로그인
        </button>
        <button
          onClick={doLogin}
          className="w-full mt-2.5 py-2.75 bg-white text-gray-700 border border-gray-200 rounded-[10px] text-[13.5px] font-semibold hover:bg-gray-50 transition-colors cursor-pointer"
        >
          ⚡ 데모로 바로 체험하기
        </button>
      </div>
    </div>
  );
}
