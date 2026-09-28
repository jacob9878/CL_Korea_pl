"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

const INPUT =
  "flex-1 font-sans text-[14.5px] px-3.25 py-2.75 border border-gray-200 rounded-[10px] bg-white outline-none transition-colors focus:border-brand-600";

type Stage = "checking" | "email" | "code" | "done";

export default function EmailVerifyGate({ onVerified }: { onVerified: (email: string) => void }) {
  const [stage, setStage] = useState<Stage>("checking");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      if (data.user?.email) {
        setEmail(data.user.email);
        setStage("done");
        onVerified(data.user.email);
      } else {
        setStage("email");
      }
    });
    // Only ever check the session once on mount -- onVerified is a setter
    // from the parent and re-running this for a new identity each render
    // would fight the user's own stage transitions.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    setStage("done");
    onVerified(email.trim());
  }

  if (stage === "checking") return null;

  if (stage === "done") {
    return (
      <div className="flex items-center gap-2 text-[13px] font-semibold text-emerald-600 bg-emerald-50 border border-emerald-100 rounded-lg px-3.5 py-2.5 mb-6">
        ✓ {email} 본인인증 완료
      </div>
    );
  }

  return (
    <div className="border border-brand-200 bg-brand-50 rounded-xl p-5 mb-6">
      <div className="text-[13px] font-bold text-brand-800 uppercase tracking-wide mb-3">
        본인 확인 (필수)
      </div>

      {stage === "email" && (
        <div className="flex flex-col sm:flex-row gap-2.5">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@org.com"
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
              setStage("email");
              setCode("");
              setError("");
            }}
            className="text-[12.5px] text-gray-500 underline mt-2.5 cursor-pointer"
          >
            이메일 다시 입력
          </button>
        </div>
      )}

      {error && <div className="text-[12.5px] text-red-600 font-semibold mt-2.5">{error}</div>}
    </div>
  );
}
