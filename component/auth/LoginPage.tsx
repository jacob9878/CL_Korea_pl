"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { GoogleLogo, KakaoLogo } from "./ProviderLogos";

const INPUT =
  "flex-1 font-sans text-[14.5px] px-3.25 py-2.75 border border-gray-200 rounded-[10px] bg-white outline-none transition-colors focus:border-brand-600";

type Stage = "checking" | "start" | "code";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/";

  const [stage, setStage] = useState<Stage>("checking");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        router.replace(next);
      } else {
        setStage("start");
      }
    });
    // Only check once on mount -- verifyCode below handles the post-login redirect itself.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function oauth(provider: "google" | "kakao") {
    setError("");
    const supabase = createClient();
    const { error: err } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
      },
    });
    if (err) setError(err.message);
    // On success the browser navigates away to the provider, then back
    // through /auth/callback -- nothing more to do here.
  }

  async function sendCode() {
    if (!email.trim()) return setError("이메일을 입력해 주세요.");
    setError("");
    setBusy(true);
    const supabase = createClient();
    const { error: err } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: { shouldCreateUser: true },
    });
    setBusy(false);
    if (err) return setError(err.message);
    setStage("code");
  }

  async function verifyCode() {
    if (!code.trim()) return setError("인증코드를 입력해 주세요.");
    setError("");
    setBusy(true);
    const supabase = createClient();
    const { error: err } = await supabase.auth.verifyOtp({
      email: email.trim(),
      token: code.trim(),
      type: "email",
    });
    setBusy(false);
    if (err) return setError(err.message);
    router.replace(next);
    router.refresh();
  }

  if (stage === "checking") return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6 py-16">
      <div className="w-full max-w-[420px] bg-white border border-gray-200 rounded-2xl shadow-[0_1px_3px_rgba(20,23,38,.06),0_8px_24px_rgba(20,23,38,.05)] p-8">
        <div className="text-center mb-7">
          <div className="text-[17px] font-black mb-1.5">
            CL<span className="text-brand-800">Korea</span>
          </div>
          <div className="text-gray-500 text-[13.5px]">로그인하고 계속하기</div>
        </div>

        <button
          onClick={() => oauth("google")}
          className="w-full flex items-center justify-center gap-2.5 px-5 py-3 rounded-[10px] font-semibold text-[14px] text-gray-700 border border-gray-200 bg-white hover:bg-gray-50 transition-colors cursor-pointer mb-2.5"
        >
          <GoogleLogo /> Google로 계속하기
        </button>
        <button
          onClick={() => oauth("kakao")}
          className="w-full flex items-center justify-center gap-2.5 px-5 py-3 rounded-[10px] font-bold text-[14px] text-[#191919] bg-[#FEE500] hover:brightness-95 transition-[filter] cursor-pointer mb-5"
        >
          <KakaoLogo /> 카카오로 계속하기
        </button>

        <div className="flex items-center gap-3 text-[11.5px] text-gray-400 mb-5">
          <div className="flex-1 h-px bg-gray-200" />
          또는 이메일로 로그인
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {stage === "start" && (
          <div className="flex flex-col sm:flex-row gap-2.5">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className={INPUT}
            />
            <button
              onClick={sendCode}
              disabled={busy}
              className="px-5 py-2.75 rounded-[10px] font-bold text-white bg-brand-600 hover:bg-brand-700 disabled:opacity-50 cursor-pointer whitespace-nowrap"
            >
              {busy ? "전송 중..." : "인증코드 받기"}
            </button>
          </div>
        )}

        {stage === "code" && (
          <div>
            <div className="text-[13px] text-gray-600 mb-2.5">
              <b>{email}</b>로 전송된 6자리 코드를 입력해 주세요.
            </div>
            <div className="flex flex-col sm:flex-row gap-2.5">
              <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="123456"
                className={INPUT}
              />
              <button
                onClick={verifyCode}
                disabled={busy}
                className="px-5 py-2.75 rounded-[10px] font-bold text-white bg-brand-600 hover:bg-brand-700 disabled:opacity-50 cursor-pointer whitespace-nowrap"
              >
                {busy ? "확인 중..." : "확인"}
              </button>
            </div>
            <button
              onClick={() => {
                setStage("start");
                setCode("");
                setError("");
              }}
              className="text-[12.5px] text-gray-500 underline mt-2.5 cursor-pointer"
            >
              이메일 다시 입력
            </button>
          </div>
        )}

        {error && <div className="text-[12.5px] text-red-600 font-semibold mt-3">{error}</div>}
      </div>
    </div>
  );
}
