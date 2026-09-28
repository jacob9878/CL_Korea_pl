"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { useMemo, useState } from "react";
import { findCity } from "./data";
import { localBadge } from "./format";

type Filter = "all" | "open" | "closing" | "closed";

export default function LocalTable({ city }: { city: string }) {
  const cd = findCity(city);
  if (!cd) return notFound();

  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  const rows = useMemo(() => {
    let list = cd.items.map((item, i) => ({ item, i }));
    if (q.trim()) list = list.filter(({ item }) => item.title.includes(q.trim()));
    if (filter !== "all") list = list.filter(({ item }) => item.statusKey === filter);
    const rank = (k: string) => (k === "open" ? 0 : k === "closing" ? 1 : 2);
    list.sort((a, b) => rank(a.item.statusKey) - rank(b.item.statusKey));
    return list;
  }, [cd.items, q, filter]);

  const open = cd.items.filter((x) => x.statusKey === "open").length;
  const closing = cd.items.filter((x) => x.statusKey === "closing").length;
  const closed = cd.items.filter((x) => x.statusKey === "closed").length;

  return (
    <main className="max-w-[1360px] mx-auto px-8 pt-11 pb-24">
      <div className="flex items-center gap-2 text-[13px] text-gray-500 mb-5.5">
        <Link href="/announcements" className="hover:text-gray-900">
          사업공고
        </Link>
        <span className="text-gray-400">›</span>
        <span className="text-gray-900 font-semibold">{cd.name}</span>
      </div>

      <div className="flex items-start gap-4">
        <div className="w-13 h-13 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-center text-2xl shrink-0">
          {cd.icon}
        </div>
        <div>
          <h1 className="text-[26px] font-black tracking-[-.5px]">{cd.name} 지역사업 공고</h1>
          <p className="mt-1.5 text-[15px] text-gray-500">
            {cd.source}에서 수집한 공고입니다.{" "}
            <a href={cd.url} target="_blank" rel="noopener noreferrer" className="text-brand-600 font-semibold">
              포털 바로가기 →
            </a>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 mt-5.5">
        <Kpi dot="bg-gray-400" label="수집 공고" value={`${cd.items.length}건`} desc={cd.source} />
        <Kpi dot="bg-emerald-500" label="접수중" value={`${open}건`} desc="모집 진행" />
        <Kpi dot="bg-amber-500" label="마감 임박" value={`${closing}건`} desc="D-5 이내" />
        <Kpi dot="bg-gray-300" label="마감" value={`${closed}건`} desc="접수 종료" />
      </div>

      <div className="mt-6 bg-white border border-gray-200 rounded-2xl p-3.5 shadow-sm flex flex-wrap gap-3 items-center">
        <div className="flex-1 min-w-[220px] relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="공고명 검색"
            className="w-full text-sm pl-9.5 pr-3 py-2.5 border border-gray-200 rounded-[10px] bg-gray-50 focus:outline-none focus:border-gray-400 focus:bg-white"
          />
        </div>
        <div className="flex gap-1.75 flex-wrap">
          {(
            [
              ["all", "전체"],
              ["open", "접수중"],
              ["closing", "마감임박"],
              ["closed", "마감"],
            ] as [Filter, string][]
          ).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`text-[13px] font-semibold px-3.5 py-2 rounded-full border transition-colors cursor-pointer ${
                filter === key
                  ? "bg-gray-900 text-white border-gray-900"
                  : "bg-gray-50 text-gray-500 border-gray-200 hover:border-gray-400 hover:text-gray-900"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="w-10 text-left text-xs font-bold text-gray-500 px-3.5 py-3.5">No</th>
                <th className="text-left text-xs font-bold text-gray-500 px-3.5 py-3.5">공고명</th>
                <th className="text-left text-xs font-bold text-gray-500 px-3.5 py-3.5">신청기간</th>
                <th className="w-24 text-left text-xs font-bold text-gray-500 px-3.5 py-3.5">상태</th>
                <th className="w-20 text-left text-xs font-bold text-gray-500 px-3.5 py-3.5">원문</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-16 text-center text-gray-400 text-sm">
                    <div className="text-3xl mb-3">🗂️</div>
                    조건에 맞는 공고가 없습니다.
                  </td>
                </tr>
              ) : (
                rows.map(({ item, i }) => {
                  const badge = localBadge(item);
                  const period = item.start && item.end ? `${item.start} ~ ${item.end}` : `공고일 ${item.posted}`;
                  const hasBody = item.body.length > 0 || item.images.length > 0;
                  return (
                    <tr
                      key={item.title + i}
                      onClick={() => (window.location.href = `/announcements/local/${encodeURIComponent(cd.name)}/${i}`)}
                      className="border-b border-gray-100 last:border-0 hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <td className="px-3.5 py-3.5 text-xs text-gray-400 text-center">{i + 1}</td>
                      <td className="px-3.5 py-3.5 font-bold text-[13px]">
                        {item.title}
                        {hasBody && <span className="ml-1.5 text-[10px] text-gray-400 font-semibold">📄 정리보기</span>}
                        <small className="block text-gray-400 font-medium text-[11.5px] mt-0.5">
                          {item.agency || item.ancmNo}
                        </small>
                      </td>
                      <td className="px-3.5 py-3.5 text-[12.5px] text-gray-600 whitespace-nowrap">{period}</td>
                      <td className="px-3.5 py-3.5">
                        <span className={`inline-block text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${badge.cls}`}>
                          {badge.label}
                        </span>
                      </td>
                      <td className="px-3.5 py-3.5">
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1 text-xs font-bold text-gray-600 border border-gray-200 rounded-md px-2 py-1 hover:border-brand-600 hover:text-brand-600 transition-colors"
                        >
                          🔗 원문
                        </a>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between items-center px-4 py-3.5 text-[13px] text-gray-500">
          <span>
            총 <b className="text-gray-900">{rows.length}</b>건
          </span>
        </div>
      </div>
    </main>
  );
}

function Kpi({ dot, label, value, desc }: { dot: string; label: string; value: string; desc: string }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl px-4.5 py-4 shadow-sm">
      <div className="text-[12.5px] text-gray-500 font-semibold flex items-center gap-1.75">
        <span className={`w-2 h-2 rounded-full ${dot}`} />
        {label}
      </div>
      <div className="text-2xl font-black mt-2 tracking-[-.5px]">{value}</div>
      <div className="text-xs mt-0.5 text-gray-400 font-semibold truncate max-w-[160px]">{desc}</div>
    </div>
  );
}
