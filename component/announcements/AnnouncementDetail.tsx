"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { ITEMS } from "./data";
import { computeDday, ddTxt, fmtD, statusBadge } from "./format";
import DocumentBody from "./DocumentBody";

export default function AnnouncementDetail({ id }: { id: string }) {
  const item = ITEMS.find((x) => x.ancmId === id);
  if (!item) return notFound();

  const dday = computeDday(item.end) ?? 0;
  const badge = statusBadge(dday);

  let pct = 50;
  if (item.start && item.end) {
    const s = new Date(item.start).getTime();
    const e = new Date(item.end).getTime();
    const now = Date.now();
    pct = dday < 0 ? 100 : Math.max(3, Math.min(98, Math.round(((now - s) / Math.max(e - s, 1)) * 100)));
  }

  const related = ITEMS.filter((x) => x.dept === item.dept && x.ancmId !== item.ancmId).slice(0, 4);

  return (
    <main className="w-full max-w-[1360px] mx-auto px-8 pt-11 pb-24">
      <div className="flex items-center gap-2 text-[13px] text-gray-500 mb-5.5 flex-wrap">
        <Link href="/announcements" className="hover:text-gray-900">
          사업공고
        </Link>
        <span className="text-gray-400">›</span>
        <Link href={`/announcements/org/${encodeURIComponent(item.dept)}`} className="hover:text-gray-900">
          {item.dept}
        </Link>
        <span className="text-gray-400">›</span>
        <span className="text-gray-900 font-semibold truncate max-w-[420px]">{item.title}</span>
      </div>

      <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="px-8 pt-7 pb-6 bg-gradient-to-br from-gray-50 to-white">
          <div className="flex gap-2 flex-wrap">
            <Badge>🏛️ {item.gov}</Badge>
            <Badge className={badge.cls}>{badge.label}</Badge>
            {dday >= 0 && <Badge className="bg-brand-50 text-brand-700 border-brand-200">{ddTxt(dday)}</Badge>}
            <Badge className="bg-gray-100 text-gray-600 border-gray-200">{item.type}</Badge>
          </div>
          <h1 className="mt-3.5 text-2xl font-black tracking-[-.6px] leading-snug">{item.title}</h1>
          <div className="mt-2.5 text-[12.5px] text-gray-500 flex gap-4 flex-wrap">
            <span>{item.ancmNo}</span>
            <span>공고일 {fmtD(item.ancmDe)}</span>
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 border-t border-gray-200 bg-white">
          <SumCell label="📅 신청기간" value={`~ ${fmtD(item.end)}`} small={`${fmtD(item.start)} 시작`} />
          <SumCell
            label="⏳ 마감"
            value={dday < 0 ? "접수 마감" : ddTxt(dday)}
            small={dday < 0 ? "" : dday === 0 ? "오늘 마감" : `${dday}일 남음`}
          />
          <SumCell label="🏢 전문기관" value={item.agency} small="" small2 />
          <SumCell label="📋 공모유형" value={item.type} small="" small2 />
        </div>
        <div className="px-8 pt-3.5 pb-4.5 bg-white border-t border-gray-100">
          <div className="flex justify-between text-[11.5px] text-gray-500 mb-1.75">
            <span>신청 진행률</span>
            <span>
              {dday < 0 ? (
                "접수 마감"
              ) : (
                <>
                  마감까지 <b className="text-brand-800">{dday === 0 ? "오늘" : `${dday}일`}</b>
                </>
              )}
            </span>
          </div>
          <div className="h-1.75 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-gray-900 rounded-full transition-[width] duration-700" style={{ width: `${pct}%` }} />
          </div>
        </div>
      </div>

      <div className="mt-7.5 grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-9 items-start">
        <div className="min-w-0">
          <div className="border border-gray-200 rounded-2xl p-7.5 md:p-8 shadow-sm">
            <div className="flex items-center gap-2.5 pb-4 mb-5 border-b border-gray-100">
              <div className="w-7 h-7 rounded-lg bg-gray-900 text-white flex items-center justify-center text-sm">
                📄
              </div>
              <h2 className="text-[17px] font-extrabold">공고문</h2>
            </div>
            <DocumentBody paragraphs={item.body} />
          </div>
        </div>

        <aside className="flex flex-col gap-4 lg:sticky lg:top-20">
          <div className="border border-gray-200 rounded-[14px] p-4.5 shadow-sm">
            <h3 className="text-xs font-extrabold text-gray-400 uppercase tracking-wide mb-3.5">핵심 정보</h3>
            <SideRow k="소관부처" v={item.gov} />
            <SideRow k="전문기관" v={item.agency} />
            <SideRow k="공고번호" v={item.ancmNo} small />
            <SideRow k="신청시작" v={item.start} />
            <SideRow k="신청마감" v={item.end} />
            {item.manager && <SideRow k="담당자" v={item.manager} small last />}
          </div>
          <div className="border border-gray-200 rounded-[14px] p-4.5 shadow-sm">
            <h3 className="text-xs font-extrabold text-gray-400 uppercase tracking-wide mb-3.5">첨부파일</h3>
            <div className="flex flex-col gap-2">
              {item.files.length ? (
                item.files.map((f) => (
                  <a
                    key={f.name}
                    href={item.irisUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-2.5 px-3.5 py-2.75 bg-gray-50 border border-gray-200 rounded-[10px] text-[12.5px] font-semibold text-gray-700 leading-snug hover:border-brand-600 hover:text-brand-600 hover:bg-white transition-colors"
                  >
                    <span>📎</span>
                    <span>
                      {f.name} <span className="text-gray-400 font-medium text-[11px]">{f.size}</span>
                    </span>
                  </a>
                ))
              ) : (
                <div className="text-[12.5px] text-gray-400">첨부파일 없음</div>
              )}
            </div>
          </div>
          <Link
            href="/signup"
            className="flex items-center justify-center gap-1.75 w-full py-2.75 text-[13.5px] font-bold rounded-[10px] bg-brand-600 text-white hover:bg-brand-700 transition-colors"
          >
            이 공고로 컨소시엄 매칭 →
          </Link>
          <a
            href={item.irisUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.75 w-full py-2.75 text-[13.5px] font-bold rounded-[10px] bg-white text-gray-700 border border-gray-200 hover:border-gray-400 hover:bg-gray-50 transition-colors"
          >
            🔗 IRIS 원문 보기
          </a>
          <Link
            href={`/announcements/org/${encodeURIComponent(item.dept)}`}
            className="flex items-center justify-center gap-1.75 w-full py-2.75 text-[13.5px] font-bold rounded-[10px] bg-white text-gray-700 border border-gray-200 hover:border-gray-400 hover:bg-gray-50 transition-colors"
          >
            ← {item.dept} 목록
          </Link>
        </aside>
      </div>

      {related.length > 0 && (
        <div className="border border-gray-200 rounded-[14px] p-4.5 shadow-sm mt-7.5">
          <h3 className="text-xs font-extrabold text-gray-400 uppercase tracking-wide mb-3.5">
            {item.dept}의 다른 공고
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {related.map((r) => {
              const rd = computeDday(r.end) ?? 0;
              const rb = statusBadge(rd);
              return (
                <Link
                  key={r.ancmId}
                  href={`/announcements/notice/${r.ancmId}`}
                  className="block p-3.5 border border-gray-200 rounded-[10px] hover:border-brand-200 transition-colors"
                >
                  <Badge className={rb.cls}>{rb.label}</Badge>
                  <div className="mt-2 text-[13px] font-bold leading-snug">{r.title}</div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </main>
  );
}

function Badge({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.75 rounded-full text-[11.5px] font-bold border whitespace-nowrap ${
        className || "bg-gray-100 text-gray-600 border-transparent"
      }`}
    >
      {children}
    </span>
  );
}

function SumCell({
  label,
  value,
  small,
  small2,
}: {
  label: string;
  value: string;
  small: string;
  small2?: boolean;
}) {
  return (
    <div className="px-5 py-4 border-r border-b lg:border-b-0 border-gray-200 last:border-r-0">
      <div className="text-[11.5px] font-bold text-gray-400">{label}</div>
      <div className={`mt-1.5 font-extrabold leading-snug ${small2 ? "text-[13px]" : "text-sm"}`}>
        {value}
        {small && <small className="block font-medium text-[11.5px] text-gray-500 mt-0.5">{small}</small>}
      </div>
    </div>
  );
}

function SideRow({ k, v, small, last }: { k: string; v: string; small?: boolean; last?: boolean }) {
  return (
    <div className={`flex justify-between gap-2.5 py-2 text-[13px] ${last ? "" : "border-b border-gray-100"}`}>
      <span className="text-gray-500 shrink-0">{k}</span>
      <span className={`font-bold text-right ${small ? "text-xs" : ""}`}>{v}</span>
    </div>
  );
}
