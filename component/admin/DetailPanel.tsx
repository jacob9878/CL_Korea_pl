"use client";

import { useEffect, useState, type ReactNode } from "react";
import type { Role, Verification } from "@/lib/clkdb";
import { kindGroup, kindLabel, stLabel } from "./utils";

export default function DetailPanel({
  verification,
  onApprove,
  onReject,
  onPreviewDoc,
}: {
  verification: Verification | null;
  onApprove: (id: string, role: Role) => void;
  onReject: (id: string, reason: string) => void;
  onPreviewDoc: (file: string) => void;
}) {
  const [pickedRole, setPickedRole] = useState<Role>("MANAGER");
  const [reason, setReason] = useState("");

  useEffect(() => {
    if (verification) {
      setPickedRole(verification.firstMember ? "ADMIN" : "MANAGER");
      setReason("");
    }
  }, [verification?.id]);

  if (!verification) {
    return (
      <div className="bg-white border border-gray-200 rounded-[14px] min-h-[440px] flex flex-col items-center justify-center gap-3 text-gray-400">
        <div className="text-4xl opacity-50">📋</div>
        <div>왼쪽 대기열에서 검증할 요청을 선택하세요.</div>
      </div>
    );
  }

  const v = verification;
  const isCompany = v.kind === "company";
  const ntsOk = !!v.ntsStatus && !v.ntsStatus.includes("휴업");

  return (
    <div className="bg-white border border-gray-200 rounded-[14px]">
      <div className="p-5.5">
        <div className="flex items-start justify-between gap-3.5 mb-4.5">
          <div>
            <div className="text-[19px] font-black tracking-[-.4px]">{v.orgName}</div>
            <div className="text-[12.5px] text-gray-500 mt-1 flex gap-2 items-center flex-wrap">
              <span
                className={`text-[10px] font-extrabold px-1.75 py-0.5 rounded-md ${
                  kindGroup(v.kind) === "company" ? "bg-blue-50 text-blue-700" : "bg-violet-50 text-violet-700"
                }`}
              >
                {kindLabel(v.kind)} · {v.orgType}
              </span>
              <span className="text-[11px] font-bold text-gray-400">{v.id}</span>
              {v.firstMember && <span className="text-[11px] font-bold text-gray-400">· 기관 최초 가입자</span>}
            </div>
          </div>
          <span
            className={`text-[11px] font-extrabold px-2.5 py-1 rounded-full whitespace-nowrap ${
              v.status === "PENDING"
                ? "bg-amber-50 text-amber-600"
                : v.status === "APPROVED"
                  ? "bg-emerald-50 text-emerald-600"
                  : "bg-brand-light text-brand"
            }`}
          >
            {stLabel(v.status)}
          </span>
        </div>

        <Section label="신청자 정보">
          <div className="grid grid-cols-2 gap-x-4.5 gap-y-2.5">
            <Kv k="이름" v={v.name} />
            <Kv k="직위" v={v.position} />
            <Kv k="이메일" v={v.email} />
            <Kv k="담당자 권한 인증" v={v.method} />
            {v.domainEmail && <Kv k="기관 도메인 이메일" v={v.domainEmail} />}
          </div>
        </Section>

        {isCompany ? (
          <>
            <Section label="기업 정보">
              <div className="grid grid-cols-2 gap-x-4.5 gap-y-2.5">
                <Kv k="법인명/상호" v={v.orgName} />
                <Kv k="대표자명" v={v.ceoName} />
                <Kv k="사업자등록번호" v={v.bizNum} />
                <Kv k="개업일자" v={v.bizDate} />
              </div>
            </Section>
            <Section label="국세청 사업자 상태·휴폐업 조회">
              <div
                className={`flex gap-2.75 p-3.5 rounded-[11px] text-[13px] leading-relaxed ${
                  ntsOk ? "bg-emerald-50 border border-emerald-200 text-emerald-800" : "bg-brand-light border border-[#fecaca] text-red-800"
                }`}
              >
                <span className="text-[17px] shrink-0">{ntsOk ? "✅" : "❌"}</span>
                <div>
                  조회 결과: <b>{v.ntsStatus || "미조회"}</b>
                  {ntsOk ? " · 상태 확인 완료" : " · 인증 거절 권고"}
                </div>
              </div>
              <div className="text-[11px] text-gray-400 mt-2 leading-relaxed">
                ⚠️ 국세청 API는 휴·폐업 <b>상태</b>만 확인합니다. 실체 존재 여부는 제출 서류로 별도 검토하세요.
              </div>
            </Section>
          </>
        ) : (
          <Section label="기관 정보">
            <div className="grid grid-cols-2 gap-x-4.5 gap-y-2.5">
              <Kv k="기관명" v={v.orgName} />
              <Kv k="세부 유형" v={v.orgType} />
              <Kv k="부서/연구실" v={v.dept || "-"} />
              <Kv k="홈페이지" v={v.homepage || "-"} />
            </div>
          </Section>
        )}

        <Section label="제출 서류">
          <div className="flex flex-col gap-2.25">
            {v.docs.length ? (
              v.docs.map((d) => (
                <div key={d.file} className="flex items-center gap-3 border border-gray-200 rounded-[10px] px-3.25 py-2.75">
                  <div className="w-9.5 h-9.5 rounded-md bg-gray-100 flex items-center justify-center text-lg shrink-0">📄</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] font-bold">{d.type}</div>
                    <div className="text-[11px] text-gray-400 mt-0.25">{d.file} · 비공개 스토리지</div>
                  </div>
                  <button
                    onClick={() => onPreviewDoc(d.file)}
                    className="text-xs font-bold text-brand border-[1.5px] border-gray-200 rounded-lg px-3 py-1.5 bg-white hover:border-brand hover:bg-brand-light transition-colors cursor-pointer"
                  >
                    미리보기
                  </button>
                </div>
              ))
            ) : (
              <div className="text-[12.5px] text-gray-400">제출 서류 없음</div>
            )}
          </div>
        </Section>

        {v.status === "PENDING" ? (
          <div className="border border-gray-200 rounded-xl p-4.5 bg-gray-50">
            <div className="text-xs font-extrabold mb-3">승인 시 부여할 역할</div>
            <div className="flex gap-2 mb-3.5">
              <RoleOption
                role="MANAGER"
                title="기관 담당자"
                desc="신청 교환·미팅·컨소시엄 참여 문의"
                picked={pickedRole}
                onPick={setPickedRole}
              />
              <RoleOption
                role="ADMIN"
                title="기관 관리자"
                desc="참여 현황·협약서·담당자 관리 (기관당 1인 이상)"
                picked={pickedRole}
                onPick={setPickedRole}
              />
            </div>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="반려 사유 (반려 시 필수 · 신청자에게 전달됩니다)"
              className="w-full px-3 py-2.5 border-[1.5px] border-gray-200 rounded-[9px] text-[13px] outline-none focus:border-brand resize-y min-h-10.5 mb-3"
            />
            <div className="flex gap-2.5">
              <button
                onClick={() => onReject(v.id, reason)}
                className="flex-1 py-3 rounded-[10px] text-sm font-extrabold bg-white text-brand border-[1.5px] border-[#fecaca] hover:bg-brand-light transition-colors cursor-pointer"
              >
                반려
              </button>
              <button
                onClick={() => onApprove(v.id, pickedRole)}
                className="flex-1 py-3 rounded-[10px] text-sm font-extrabold bg-emerald-500 text-white hover:bg-emerald-600 transition-colors cursor-pointer"
              >
                승인 · 역할 부여
              </button>
            </div>
          </div>
        ) : v.status === "APPROVED" ? (
          <div className="rounded-xl px-4.5 py-4 text-[13px] leading-relaxed bg-emerald-50 border border-emerald-200">
            ✅ <b>승인 완료</b> → 부여 역할: <b>{v.grantedRole}</b>
            <br />
            검토: {v.reviewedBy} · {v.reviewedAt}
            <br />
            <span className="text-gray-500 text-xs">신청자 계정에 역할이 부여되어 컨소시엄 기능이 활성화되었습니다.</span>
          </div>
        ) : (
          <div className="rounded-xl px-4.5 py-4 text-[13px] leading-relaxed bg-brand-light border border-[#fecaca]">
            ❌ <b>반려</b>
            <br />
            사유: {v.rejectReason || "-"}
            <br />
            검토: {v.reviewedBy} · {v.reviewedAt}
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

function RoleOption({
  role,
  title,
  desc,
  picked,
  onPick,
}: {
  role: Role;
  title: string;
  desc: string;
  picked: Role;
  onPick: (r: Role) => void;
}) {
  const active = picked === role;
  return (
    <button
      onClick={() => onPick(role)}
      className={`flex-1 text-left border-[1.5px] rounded-[10px] px-3 py-2.75 bg-white transition-all cursor-pointer ${
        active ? "border-brand bg-brand-light shadow-[0_0_0_3px_rgba(232,52,26,.07)]" : "border-gray-200 hover:border-gray-300"
      }`}
    >
      <div className="text-[13px] font-extrabold">
        {title} <span className="text-gray-400 font-bold text-[11px]">{role}</span>
      </div>
      <div className="text-[11px] text-gray-500 mt-0.5 leading-snug">{desc}</div>
    </button>
  );
}
