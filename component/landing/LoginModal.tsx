"use client";

import { useLoginModal } from "./LoginModalContext";

const DEMO_ROLES = [
  { label: "🙍 일반 사용자", role: "VIEWER" },
  { label: "🧑‍💼 기관 담당자", role: "MANAGER" },
  { label: "🛡️ 기관 관리자", role: "ADMIN" },
  { label: "⚙️ 운영자 콘솔", role: "OPERATOR" },
];

export default function LoginModal() {
  const { isOpen, closeLogin } = useLoginModal();

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-200 bg-black/55 flex items-center justify-center"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeLogin();
      }}
    >
      <div className="relative bg-white rounded-[20px] p-9 w-full max-w-[400px] shadow-2xl">
        <span
          onClick={closeLogin}
          className="absolute top-4 right-[18px] text-[22px] text-gray-400 hover:text-gray-700 cursor-pointer leading-none"
        >
          ×
        </span>
        <div className="text-xl font-black text-gray-900 text-center mb-1.5">
          CL<span className="text-brand">Korea</span>
        </div>
        <div className="text-[13.5px] text-gray-500 text-center mb-7">
          AI 기반 R&D 컨소시엄 매칭 플랫폼의 실제 검색을 체험합니다
        </div>

        <div className="mb-3.5">
          <label className="block text-[11.5px] font-bold text-gray-500 uppercase tracking-wide mb-1.5">
            이메일
          </label>
          <input
            type="email"
            placeholder="contact@company.com"
            defaultValue="demo@clkorea.ai"
            className="w-full px-3.5 py-2.5 border-[1.5px] border-gray-200 rounded-[10px] text-sm outline-none focus:border-brand focus:shadow-[0_0_0_3px_rgba(232,52,26,.08)]"
          />
        </div>
        <div className="mb-3.5">
          <label className="block text-[11.5px] font-bold text-gray-500 uppercase tracking-wide mb-1.5">
            비밀번호
          </label>
          <input
            type="password"
            defaultValue="••••••••"
            className="w-full px-3.5 py-2.5 border-[1.5px] border-gray-200 rounded-[10px] text-sm outline-none focus:border-brand focus:shadow-[0_0_0_3px_rgba(232,52,26,.08)]"
          />
        </div>

        <button
          onClick={closeLogin}
          className="w-full py-3 bg-brand text-white rounded-[10px] text-[15px] font-bold mt-1.5 hover:bg-brand-hover transition-colors cursor-pointer"
        >
          로그인
        </button>

        <div className="text-center text-[11px] text-gray-400 my-3.5 tracking-wide">
          — 역할별 데모 바로가기 —
        </div>
        <div className="grid grid-cols-2 gap-2">
          {DEMO_ROLES.map((r) => (
            <button
              key={r.role}
              onClick={closeLogin}
              className="w-full py-2.5 text-[13.5px] font-semibold text-gray-700 bg-white border-[1.5px] border-gray-200 rounded-[10px] hover:bg-gray-50 transition-colors cursor-pointer"
            >
              {r.label}
            </button>
          ))}
        </div>

        <div className="text-center mt-4.5 text-[13px] text-gray-500">
          아직 계정이 없으신가요?{" "}
          <a href="/signup" className="text-brand font-bold">
            회원가입
          </a>
        </div>
      </div>
    </div>
  );
}
