"use client";

import type { Verification, VerificationStatus } from "@/lib/clkdb";
import { kindGroup, kindLabel, stLabel } from "./utils";

type KindFilter = "all" | "company" | "academic";
type StatusFilter = VerificationStatus | "all";

export default function Queue({
  verifications,
  selectedId,
  onSelect,
  kindFilter,
  onKindFilter,
  statusFilter,
  onStatusFilter,
  query,
  onQuery,
}: {
  verifications: Verification[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  kindFilter: KindFilter;
  onKindFilter: (k: KindFilter) => void;
  statusFilter: StatusFilter;
  onStatusFilter: (s: StatusFilter) => void;
  query: string;
  onQuery: (q: string) => void;
}) {
  const rows = verifications.filter((v) => {
    if (kindFilter !== "all" && kindGroup(v.kind) !== kindFilter) return false;
    if (statusFilter !== "all" && v.status !== statusFilter) return false;
    if (query) {
      const needle = query.toLowerCase();
      if (!(v.orgName + " " + v.email + " " + v.name).toLowerCase().includes(needle)) return false;
    }
    return true;
  });

  return (
    <div className="bg-white border border-gray-200 rounded-[14px] overflow-hidden">
      <div className="px-4.5 py-3.75 border-b border-gray-200 text-sm font-extrabold flex items-center justify-between">
        검증 대기열 <span className="text-[11.5px] font-bold text-gray-400">{rows.length}건</span>
      </div>
      <div className="px-3.5 py-3 border-b border-gray-100 flex flex-wrap gap-1.5">
        {(
          [
            ["all", "전체"],
            ["company", "기업"],
            ["academic", "대학·연구소"],
          ] as [KindFilter, string][]
        ).map(([key, label]) => (
          <button
            key={key}
            onClick={() => onKindFilter(key)}
            className={`text-[11.5px] font-bold px-2.75 py-1.25 rounded-full border-[1.5px] transition-colors cursor-pointer ${
              kindFilter === key
                ? "border-brand-600 bg-brand-50 text-brand-600"
                : "border-gray-200 text-gray-600 hover:border-gray-300"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="px-3.5 py-3 border-b border-gray-100 flex flex-wrap gap-1.5">
        {(
          [
            ["PENDING", "대기"],
            ["APPROVED", "승인"],
            ["REJECTED", "반려"],
            ["all", "전체"],
          ] as [StatusFilter, string][]
        ).map(([key, label]) => (
          <button
            key={key}
            onClick={() => onStatusFilter(key)}
            className={`text-[11.5px] font-bold px-2.75 py-1.25 rounded-full border-[1.5px] transition-colors cursor-pointer ${
              statusFilter === key
                ? "border-brand-600 bg-brand-50 text-brand-600"
                : "border-gray-200 text-gray-600 hover:border-gray-300"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="px-3.5 py-2.5 border-b border-gray-100">
        <input
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          placeholder="기관명·이메일 검색"
          className="w-full px-2.75 py-2 border-[1.5px] border-gray-200 rounded-[9px] text-[13px] outline-none focus:border-brand-600"
        />
      </div>
      <div className="max-h-[560px] overflow-y-auto">
        {rows.length === 0 ? (
          <div className="py-9 px-5 text-center text-gray-400 text-[13px]">해당 조건의 요청이 없습니다.</div>
        ) : (
          rows.map((v) => {
            const grp = kindGroup(v.kind);
            const selected = v.id === selectedId;
            return (
              <div
                key={v.id}
                onClick={() => onSelect(v.id)}
                className={`px-4 py-3.25 border-b border-gray-100 cursor-pointer flex gap-2.5 items-start transition-colors ${
                  selected ? "bg-brand-50 shadow-[inset_3px_0_0_var(--color-brand-600)]" : "hover:bg-gray-50"
                }`}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-[13.5px] font-extrabold whitespace-nowrap overflow-hidden text-ellipsis">
                      {v.orgName}
                    </span>
                    <span
                      className={`text-[10px] font-extrabold px-1.75 py-0.5 rounded-md whitespace-nowrap ${
                        grp === "company" ? "bg-brand-50 text-brand-700" : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {kindLabel(v.kind)}
                    </span>
                  </div>
                  <div className="text-[11.5px] text-gray-500">
                    {v.name} · {v.email}
                  </div>
                  <div className="text-[10.5px] text-gray-400 mt-0.75">{v.requestedAt}</div>
                </div>
                <span
                  className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full whitespace-nowrap ${
                    v.status === "PENDING"
                      ? "bg-amber-50 text-amber-600"
                      : v.status === "APPROVED"
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-[#fef2f0] text-red-800"
                  }`}
                >
                  {stLabel(v.status)}
                </span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
