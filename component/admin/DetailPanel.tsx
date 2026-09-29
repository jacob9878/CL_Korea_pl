"use client";

import { useState, type ReactNode } from "react";
import type { ExpertApplicationRow } from "./types";
import { stLabel } from "./utils";

export default function DetailPanel({
  application,
  onApprove,
  onReject,
}: {
  application: ExpertApplicationRow | null;
  onApprove: (id: number) => void;
  onReject: (id: number, reason: string) => void;
}) {
  const [reason, setReason] = useState("");
  const [reasonForId, setReasonForId] = useState<number | null>(null);

  // Reset the reject-reason draft when a different application is selected --
  // adjusting state during render (React's documented pattern for this)
  // instead of an effect, since an effect's setState here would cause an
  // extra render every time the selection changes.
  if (application && reasonForId !== application.id) {
    setReasonForId(application.id);
    if (reason !== "") setReason("");
  }

  if (!application) {
    return (
      <div className="bg-white border border-gray-200 rounded-[14px] min-h-[440px] flex flex-col items-center justify-center gap-3 text-gray-400">
        <div className="text-4xl opacity-50">📋</div>
        <div>왼쪽 대기열에서 검토할 신청을 선택하세요.</div>
      </div>
    );
  }

  const a = application;
  const address = [a.address_zip, a.address_addr1, a.address_addr2].filter(Boolean).join(" ");

  return (
    <div className="bg-white border border-gray-200 rounded-[14px]">
      <div className="p-5.5">
        <div className="flex items-start justify-between gap-3.5 mb-4.5">
          <div>
            <div className="text-[19px] font-black tracking-[-.4px]">{a.org_name}</div>
            <div className="text-[12.5px] text-gray-500 mt-1 flex gap-2 items-center flex-wrap">
              <span className="text-[10px] font-extrabold px-1.75 py-0.5 rounded-md bg-brand-50 text-brand-700">
                전문가 신청
              </span>
              <span className="text-[11px] font-bold text-gray-400">EA-{a.id}</span>
            </div>
          </div>
          <span
            className={`text-[11px] font-extrabold px-2.5 py-1 rounded-full whitespace-nowrap ${
              a.status === "PENDING"
                ? "bg-amber-50 text-amber-600"
                : a.status === "APPROVED"
                  ? "bg-emerald-50 text-emerald-600"
                  : "bg-[#fef2f0] text-red-800"
            }`}
          >
            {stLabel(a.status)}
          </span>
        </div>

        <Section label="신청자 정보">
          <div className="grid grid-cols-2 gap-x-4.5 gap-y-2.5">
            <Kv k="이름" v={a.name} />
            <Kv k="생년월일" v={a.birth ?? undefined} />
            <Kv k="이메일" v={a.email} />
            <Kv k="휴대폰" v={a.phone} />
            <Kv k="소속기관" v={a.org_name} />
            <Kv k="부서/직위" v={a.dept} />
            {address && <Kv k="주소" v={address} />}
          </div>
        </Section>

        <Section label="학력·경력">
          <div className="grid grid-cols-2 gap-x-4.5 gap-y-2.5">
            <Kv k="최종학위" v={a.degree} />
            <Kv k="세부 전공" v={a.major ?? undefined} />
            <Kv k="해당분야 경력" v={`${a.years}년`} />
            <Kv k="보유 자격/실적" v={a.credentials ?? undefined} />
          </div>
        </Section>

        <Section label="전문분야">
          {a.expert_application_taxonomy_picks.length ? (
            <div className="flex flex-wrap gap-1.5">
              {a.expert_application_taxonomy_picks.map((p) => (
                <span
                  key={p.key}
                  className="text-[12px] font-semibold px-2.5 py-1 rounded-full bg-brand-50 text-brand-700"
                  title={p.trail}
                >
                  {p.leaf}
                </span>
              ))}
            </div>
          ) : (
            <div className="text-[12.5px] text-gray-400">선택된 전문분야 없음</div>
          )}
        </Section>

        {a.status === "PENDING" ? (
          <div className="border border-gray-200 rounded-xl p-4.5 bg-gray-50">
            <div className="text-xs font-extrabold mb-3">승인 시 EXPERT 역할이 부여됩니다.</div>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="반려 사유 (반려 시 필수 · 신청자에게 전달됩니다)"
              className="w-full px-3 py-2.5 border-[1.5px] border-gray-200 rounded-[9px] text-[13px] outline-none focus:border-brand-600 resize-y min-h-10.5 mb-3"
            />
            <div className="flex gap-2.5">
              <button
                onClick={() => onReject(a.id, reason)}
                className="flex-1 py-3 rounded-[10px] text-sm font-extrabold bg-white text-red-800 border-[1.5px] border-[#fecaca] hover:bg-[#fef2f0] transition-colors cursor-pointer"
              >
                반려
              </button>
              <button
                onClick={() => onApprove(a.id)}
                className="flex-1 py-3 rounded-[10px] text-sm font-extrabold bg-emerald-500 text-white hover:bg-emerald-600 transition-colors cursor-pointer"
              >
                승인 · EXPERT 역할 부여
              </button>
            </div>
          </div>
        ) : a.status === "APPROVED" ? (
          <div className="rounded-xl px-4.5 py-4 text-[13px] leading-relaxed bg-emerald-50 border border-emerald-200">
            ✅ <b>승인 완료</b> → 부여 역할: <b>{a.granted_role}</b>
            <br />
            검토: {a.reviewer?.name ?? "관리자"} · {a.reviewed_at ? new Date(a.reviewed_at).toLocaleString("ko-KR") : "-"}
            <br />
            <span className="text-gray-500 text-xs">신청자 계정에 EXPERT 역할이 부여되었습니다.</span>
          </div>
        ) : (
          <div className="rounded-xl px-4.5 py-4 text-[13px] leading-relaxed bg-[#fef2f0] border border-[#fecaca]">
            ❌ <b>반려</b>
            <br />
            사유: {a.reject_reason || "-"}
            <br />
            검토: {a.reviewer?.name ?? "관리자"} · {a.reviewed_at ? new Date(a.reviewed_at).toLocaleString("ko-KR") : "-"}
          </div>
        )}
      </div>
    </div>
  );
}

function Section({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="mb-5">
      <div className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wide mb-2.5">{label}</div>
      {children}
    </div>
  );
}

function Kv({ k, v }: { k: string; v?: string }) {
  return (
    <div className="text-[13px]">
      <div className="text-gray-500 text-[11.5px] mb-0.5">{k}</div>
      <div className="font-bold">{v || "-"}</div>
    </div>
  );
}
