"use client";

import Link from "next/link";
import { useMemo, useState, type ReactNode } from "react";
import { ITEMS, findDept } from "./data";
import { computeDday, ddCls, ddTxt, statusBadge } from "./format";
import { useFavorites } from "./useFavorites";

type Filter = "all" | "open" | "closing" | "fav";
type SortKey = "dday" | "ancmDe" | "title";

export default function AnnouncementTable({ deptKey }: { deptKey?: string }) {
  const isAll = !deptKey;
  const dept = deptKey ? findDept(deptKey) : undefined;
  const title = isAll ? "전체 공고" : deptKey!;
  const icon = isAll ? "🗂️" : dept?.icon || "🗂️";
  const desc = isAll ? "수집된 모든 IRIS 접수중 공고입니다." : dept?.desc || "IRIS 수집 공고";

  const { isFav, toggleFav, ready } = useFavorites();
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [sortKey, setSortKey] = useState<SortKey>("dday");
  const [sortDir, setSortDir] = useState(1);

  const scoped = useMemo(() => (isAll ? ITEMS : ITEMS.filter((it) => it.dept === deptKey)), [isAll, deptKey]);

  const rows = useMemo(() => {
    let list = scoped
      .map((it) => ({ item: it, dday: computeDday(it.end) ?? 9999 }))
      .filter(({ dday }) => dday >= -3650);

    if (q.trim()) {
      const needle = q.trim().toLowerCase();
      list = list.filter(
        ({ item }) =>
          item.title.toLowerCase().includes(needle) ||
          item.agency.toLowerCase().includes(needle) ||
          item.ancmNo.toLowerCase().includes(needle) ||
          item.gov.toLowerCase().includes(needle),
      );
    }
    if (filter === "open") list = list.filter(({ dday }) => dday >= 0);
    if (filter === "closing") list = list.filter(({ dday }) => dday >= 0 && dday <= 5);
    if (filter === "fav") list = list.filter(({ item }) => ready && isFav(item.ancmId));

    list.sort((a, b) => {
      if (sortKey === "dday") return sortDir * (a.dday - b.dday);
      const av = sortKey === "title" ? a.item.title : a.item.ancmDe;
      const bv = sortKey === "title" ? b.item.title : b.item.ancmDe;
      return sortDir * av.localeCompare(bv, "ko");
    });
    return list;
  }, [scoped, q, filter, sortKey, sortDir, isFav, ready]);

  const closingCount = scoped.filter((it) => {
    const d = computeDday(it.end);
    return d !== null && d >= 0 && d <= 5;
  }).length;
  const favCount = scoped.filter((it) => ready && isFav(it.ancmId)).length;
  const soonest = scoped
    .map((it) => ({ item: it, dday: computeDday(it.end) ?? 9999 }))
    .filter(({ dday }) => dday >= 0)
    .sort((a, b) => a.dday - b.dday)[0];

  function toggleSort(key: SortKey) {
    if (sortKey === key) setSortDir((d) => -d);
    else {
      setSortKey(key);
      setSortDir(1);
    }
  }

  return (
    <main className="max-w-[1360px] mx-auto px-8 pt-11 pb-24">
      <div className="flex items-center gap-2 text-[13px] text-gray-500 mb-5.5 flex-wrap">
        <Link href="/announcements" className="hover:text-gray-900">
          사업공고
        </Link>
        <span className="text-gray-400">›</span>
        <span className="text-gray-900 font-semibold">{title}</span>
      </div>

      <div className="flex items-start gap-4">
        <div className="w-13 h-13 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-center text-2xl shrink-0">
          {icon}
        </div>
        <div>
          <h1 className="text-[26px] font-black tracking-[-.5px]">{title}</h1>
          <p className="mt-1.5 text-[15px] text-gray-500">{desc}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 mt-5.5">
        <Kpi dot="bg-brand" label="해당 공고" value={`${scoped.length}건`} desc="IRIS 수집" />
        <Kpi dot="bg-amber-500" label="마감 임박" value={`${closingCount}건`} desc="D-5 이내" />
        <Kpi dot="bg-yellow-400" label="관심 등록" value={`${favCount}건`} desc="☆ 저장" />
        <Kpi
          dot="bg-emerald-500"
          label="가장 임박"
          value={soonest ? ddTxt(soonest.dday) : "-"}
          desc={soonest ? soonest.item.title.slice(0, 14) + "…" : "해당 없음"}
        />
      </div>

      <div className="mt-6 bg-white border border-gray-200 rounded-2xl p-3.5 shadow-sm flex flex-wrap gap-3 items-center">
        <div className="flex-1 min-w-[220px] relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="공고명 · 전문기관 · 공고번호 검색"
            className="w-full text-sm pl-9.5 pr-3 py-2.5 border border-gray-200 rounded-[10px] bg-gray-50 focus:outline-none focus:border-gray-400 focus:bg-white focus:shadow-[0_0_0_3px_theme(colors.gray.100)]"
          />
        </div>
        <div className="flex gap-1.75 flex-wrap">
          {(
            [
              ["all", "전체"],
              ["open", "접수중"],
              ["closing", "마감임박"],
              ["fav", "☆ 관심"],
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
        <div className="flex items-center gap-2 text-[13px] text-gray-500">
          정렬
          <select
            value={sortKey === "ancmDe" ? "date" : sortKey}
            onChange={(e) => {
              const v = e.target.value;
              setSortKey(v === "date" ? "ancmDe" : (v as SortKey));
              setSortDir(v === "title" ? 1 : -1);
            }}
            className="text-[13px] font-semibold px-3 py-2 border border-gray-200 rounded-[10px] bg-gray-50 cursor-pointer"
          >
            <option value="dday">마감 임박순</option>
            <option value="date">공고일 최신순</option>
            <option value="title">공고명순</option>
          </select>
        </div>
      </div>

      <div className="mt-4 bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-[820px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <Th w="34" />
                <Th>공고번호</Th>
                <Th onClick={() => toggleSort("title")} active={sortKey === "title"} dir={sortDir}>
                  공고명(사업명)
                </Th>
                {isAll && <Th>소관부처</Th>}
                <Th>전문기관</Th>
                <Th onClick={() => toggleSort("ancmDe")} active={sortKey === "ancmDe"} dir={sortDir}>
                  공고일자
                </Th>
                <Th onClick={() => toggleSort("dday")} active={sortKey === "dday"} dir={sortDir}>
                  D-day
                </Th>
                <Th>공모유형</Th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={isAll ? 8 : 7} className="py-16 text-center text-gray-400 text-sm">
                    <div className="text-3xl mb-3">🗂️</div>
                    조건에 맞는 공고가 없습니다.
                  </td>
                </tr>
              ) : (
                rows.map(({ item, dday }) => (
                  <tr
                    key={item.ancmId}
                    onClick={() => (window.location.href = `/announcements/notice/${item.ancmId}`)}
                    className="border-b border-gray-100 last:border-0 hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <td className="px-3.5 py-3.5">
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFav(item.ancmId);
                        }}
                        className={`text-lg cursor-pointer select-none ${
                          ready && isFav(item.ancmId) ? "text-yellow-400" : "text-gray-300"
                        }`}
                      >
                        {ready && isFav(item.ancmId) ? "★" : "☆"}
                      </span>
                    </td>
                    <td className="px-3.5 py-3.5 text-xs font-semibold text-gray-500 whitespace-nowrap">
                      {item.ancmNo}
                    </td>
                    <td className="px-3.5 py-3.5 font-bold text-[13px] min-w-[260px] max-w-[420px] leading-snug">
                      <Link
                        href={`/announcements/notice/${item.ancmId}`}
                        onClick={(e) => e.stopPropagation()}
                        className="hover:text-brand"
                      >
                        {item.title}
                      </Link>
                    </td>
                    {isAll && (
                      <td className="px-3.5 py-3.5">
                        <span className="inline-block text-[11.5px] font-bold px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 whitespace-nowrap">
                          {item.dept}
                        </span>
                      </td>
                    )}
                    <td className="px-3.5 py-3.5 text-[12.5px] text-gray-600 whitespace-nowrap">{item.agency}</td>
                    <td className="px-3.5 py-3.5 text-[12.5px] text-gray-600 whitespace-nowrap">{item.ancmDe}</td>
                    <td className={`px-3.5 py-3.5 text-center font-extrabold text-[13px] whitespace-nowrap ${ddCls(dday)}`}>
                      {ddTxt(dday)}
                    </td>
                    <td className="px-3.5 py-3.5">
                      <span className="inline-block text-[11.5px] font-semibold px-2.5 py-0.5 rounded-md bg-gray-100 text-gray-600 whitespace-nowrap">
                        {item.type}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between items-center px-4 py-3.5 text-[13px] text-gray-500">
          <span>
            총 <b className="text-gray-900">{rows.length}</b>건
          </span>
          <span className="text-xs">행을 클릭하면 정리된 공고문이 열립니다</span>
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

function Th({
  children,
  onClick,
  active,
  dir,
  w,
}: {
  children?: ReactNode;
  onClick?: () => void;
  active?: boolean;
  dir?: number;
  w?: string;
}) {
  return (
    <th
      onClick={onClick}
      style={w ? { width: w } : undefined}
      className={`text-left text-xs font-bold px-3.5 py-3.5 whitespace-nowrap ${
        onClick ? "cursor-pointer select-none" : ""
      } ${active ? "text-gray-900" : "text-gray-500"}`}
    >
      {children}
      {onClick && <span className="ml-1 opacity-40 text-[10px]">{active ? (dir! > 0 ? "▲" : "▼") : "↕"}</span>}
    </th>
  );
}
