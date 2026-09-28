"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Status = "checking" | "signed-in" | "signed-out";

export default function AuthGate({
  onVerified,
}: {
  onVerified: (info: { email: string | null }) => void;
}) {
  const [status, setStatus] = useState<Status>("checking");
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        setEmail(data.user.email ?? null);
        setStatus("signed-in");
        onVerified({ email: data.user.email ?? null });
      } else {
        setStatus("signed-out");
      }
    });
    // Only check once on mount -- onVerified is a setter from the parent and
    // re-running this on every render would fight the user's own state.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (status === "checking") return null;

  if (status === "signed-in") {
    return (
      <div className="flex items-center gap-2 text-[13px] font-semibold text-emerald-600 bg-emerald-50 border border-emerald-100 rounded-lg px-3.5 py-2.5 mb-6">
        ✓ {email ?? "소셜 계정"}으로 로그인됨
      </div>
    );
  }

  return (
    <div className="border border-brand-200 bg-brand-50 rounded-xl p-5 mb-6 flex items-center justify-between gap-4 flex-wrap">
      <div>
        <div className="text-[13px] font-bold text-brand-800 uppercase tracking-wide mb-1">
          본인 확인 (필수)
        </div>
        <div className="text-[13px] text-gray-600">신청하려면 먼저 로그인해 주세요.</div>
      </div>
      <a
        href={`/login?next=${encodeURIComponent(typeof window !== "undefined" ? window.location.pathname : "/")}`}
        className="px-5 py-2.75 rounded-[10px] font-bold text-white bg-brand-600 hover:bg-brand-700 transition-colors whitespace-nowrap"
      >
        로그인하기 →
      </a>
    </div>
  );
}
