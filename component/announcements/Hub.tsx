"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { DEPTS, ITEMS, LOCAL_CITIES } from "./data";
import { computeDday } from "./format";
import { useFavorites } from "./useFavorites";

export default function Hub() {
  const { favs, ready } = useFavorites();

  const countByDept: Record<string, number> = {};
  ITEMS.forEach((it) => {
    countByDept[it.dept] = (countByDept[it.dept] || 0) + 1;
  });

  const total = ITEMS.length;
  const closing = ITEMS.filter((it) => {
    const d = computeDday(it.end);
    return d !== null && d >= 0 && d <= 5;
  }).length;
  const activeDepts = Object.keys(countByDept).length;
  const agencies = new Set(ITEMS.map((it) => it.agency)).size;
  const localTotal = LOCAL_CITIES.reduce((sum, c) => sum + c.items.length, 0);

  return (
    <main className="w-full max-w-[1360px] mx-auto px-8 pt-11 pb-24">
      <div className="text-[12.5px] font-bold text-gray-400 uppercase tracking-wide mb-2.5">
        Business Announcements
      </div>
      <h1 className="text-[32px] font-black tracking-[-1px] leading-tight text-gray-900">
        정부부처별 R&D 사업공고
      </h1>
      <p className="mt-3 text-[15px] text-gray-500 leading-relaxed max-w-[760px]">
        IRIS(범부처통합연구지원시스템)에서 수집한 접수중 공고를 부처별로 정리했습니다. 부처를
        선택하면 공고 목록이 표로 나오고, 공고를 열면 긴 공고문을 읽기 좋게 재구성해 보여드립니다.
      </p>
      <div className="mt-4.5 inline-flex items-center gap-2 px-3.5 py-1.5 bg-gray-50 border border-gray-200 rounded-full text-[12.5px] text-gray-500">
        <span className="w-1.75 h-1.75 rounded-full bg-emerald-500 shadow-[0_0_0_3px_#f0fdf4]" />
        <b className="text-gray-700 font-bold">IRIS</b> · 총 {total}건
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 mt-6.5">
        <Kpi dot="bg-brand-500" label="접수중 공고" value={`${total}건`} desc={`${activeDepts}개 부처`} />
        <Kpi dot="bg-amber-500" label="마감 임박 (D-5 이내)" value={`${closing}건`} desc="서둘러 확인하세요" />
        <Kpi
          dot="bg-yellow-400"
          label="관심 등록 공고"
          value={`${ready ? favs.length : 0}건`}
          desc="☆ 로 저장"
        />
        <Kpi dot="bg-emerald-500" label="연계 전문기관" value={`${agencies}곳`} desc="한국연구재단 등" />
      </div>

      <SectionLabel title="IRIS 연동 부처" muted="실시간 수집">
        <Link href="/announcements/all" className="text-[13px] font-semibold text-gray-500 hover:text-gray-900">
          전체 공고 표로 보기 →
        </Link>
      </SectionLabel>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {DEPTS.map((dept) => {
          const cnt = countByDept[dept.key] || 0;
          const clickable = cnt > 0;
          const Card = (
            <div
              className={`flex flex-col min-h-[150px] rounded-2xl border p-5.5 transition-all ${
                clickable
                  ? "bg-white border-gray-200 hover:shadow-lg hover:-translate-y-0.5 hover:border-gray-300"
                  : "bg-gray-50 border-dashed border-gray-200"
              }`}
            >
              <div
                className={`w-10.5 h-10.5 rounded-[11px] border border-gray-200 flex items-center justify-center text-xl ${
                  clickable ? "bg-gray-50" : "bg-white opacity-55"
                }`}
              >
                {dept.icon}
              </div>
              <div className="mt-3.5 text-base font-extrabold tracking-[-.3px]">{dept.key}</div>
              <div className="mt-1.5 text-[12.5px] text-gray-500 leading-snug">{dept.desc}</div>
              <div className="mt-auto pt-3.5 flex items-center justify-between">
                {clickable ? (
                  <div className="text-[13px] font-extrabold text-gray-900">
                    <span className="text-brand-800">{cnt}</span>건 접수중
                  </div>
                ) : (
                  <div className="text-[13px] font-semibold text-gray-400">접수중 공고 없음</div>
                )}
                {clickable && <div className="text-gray-300 text-[15px]">→</div>}
              </div>
            </div>
          );
          return clickable ? (
            <Link key={dept.key} href={`/announcements/org/${encodeURIComponent(dept.key)}`}>
              {Card}
            </Link>
          ) : (
            <div key={dept.key}>{Card}</div>
          );
        })}
      </div>

      <SectionLabel title="지자체" muted={`${LOCAL_CITIES.length}개 시·도 R&D 포털 수집 · 총 ${localTotal}건`} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {LOCAL_CITIES.map((city) => {
          const open = city.items.filter((it) => it.statusKey !== "closed").length;
          const clickable = city.items.length > 0;
          const Card = (
            <div
              className={`flex flex-col min-h-[150px] rounded-2xl border p-5.5 transition-all ${
                clickable
                  ? "bg-white border-gray-200 hover:shadow-lg hover:-translate-y-0.5 hover:border-gray-300"
                  : "bg-gray-50 border-dashed border-gray-200"
              }`}
            >
              <div className="w-10.5 h-10.5 rounded-[11px] bg-gray-50 border border-gray-200 flex items-center justify-center text-xl">
                {city.icon}
              </div>
              <div className="mt-3.5 text-base font-extrabold tracking-[-.3px]">{city.name}</div>
              <div className="mt-1.5 text-[12.5px] text-gray-500 leading-snug">{city.source}</div>
              <div className="mt-auto pt-3.5 flex items-center justify-between">
                <div className="text-[13px] font-extrabold text-gray-900">
                  {open > 0 ? (
                    <>
                      <span className="text-brand-800">{open}</span>건 접수중
                    </>
                  ) : (
                    <span className="text-gray-400 font-semibold">전체 {city.items.length}건</span>
                  )}
                </div>
                <div className="text-gray-300 text-[15px]">→</div>
              </div>
            </div>
          );
          return (
            <Link key={city.name} href={`/announcements/local/${encodeURIComponent(city.name)}`}>
              {Card}
            </Link>
          );
        })}
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
      <div className="text-xs mt-0.5 text-gray-400 font-semibold">{desc}</div>
    </div>
  );
}

function SectionLabel({
  title,
  muted,
  children,
}: {
  title: string;
  muted: string;
  children?: ReactNode;
}) {
  return (
    <div className="mt-9 mb-4 text-[13px] font-extrabold text-gray-900 flex items-center gap-2.5">
      {title} <span className="text-gray-400 font-semibold">· {muted}</span>
      <span className="flex-1 h-px bg-gray-200" />
      {children}
    </div>
  );
}
