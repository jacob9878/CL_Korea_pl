"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { findCity } from "./data";
import { fmtD, localBadge } from "./format";
import DocumentBody from "./DocumentBody";

const TYPE_TAG: Record<string, string> = {
  text: "📝 텍스트 공고문",
  image: "🖼️ 이미지 공고문",
  pdf: "📄 PDF 공고",
  external: "🔗 외부 원문",
};

export default function LocalDetail({ city, idx }: { city: string; idx: number }) {
  const cd = findCity(city);
  const item = cd?.items[idx];
  if (!cd || !item) return notFound();

  const badge = localBadge(item);
  const hasText = item.body.length > 0;
  const hasImg = item.images.length > 0;
  const period =
    item.start && item.end ? `${fmtD(item.start)} ~ ${fmtD(item.end)}` : item.posted ? `공고일 ${fmtD(item.posted)}` : "상시·미기재";
  const related = cd.items.filter((_, i) => i !== idx).slice(0, 4);

  return (
    <main className="max-w-[1360px] mx-auto px-8 pt-11 pb-24">
      <div className="flex items-center gap-2 text-[13px] text-gray-500 mb-5.5 flex-wrap">
        <Link href="/announcements" className="hover:text-gray-900">
          사업공고
        </Link>
        <span className="text-gray-400">›</span>
        <Link href={`/announcements/local/${encodeURIComponent(cd.name)}`} className="hover:text-gray-900">
          {cd.name}
        </Link>
        <span className="text-gray-400">›</span>
        <span className="text-gray-900 font-semibold truncate max-w-[420px]">{item.title}</span>
      </div>

      <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="px-8 pt-7 pb-6 bg-gradient-to-br from-gray-50 to-white">
          <div className="flex gap-2 flex-wrap">
            <Badge>
              {cd.icon} {cd.name}
            </Badge>
            <Badge className={badge.cls}>{badge.label}</Badge>
          </div>
          <h1 className="mt-3.5 text-2xl font-black tracking-[-.6px] leading-snug">{item.title}</h1>
          <div className="mt-2.5 text-[12.5px] text-gray-500 flex gap-4 flex-wrap">
            {item.ancmNo && <span>{item.ancmNo}</span>}
            <span>{cd.source}</span>
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 border-t border-gray-200 bg-white">
          <SumCell label="📅 신청기간" value={period} />
          <SumCell label="🏢 담당" value={item.agency || cd.source} />
          <SumCell label="📋 상태" value={item.status || badge.label} />
          <SumCell label="📍 지역" value={cd.name} />
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
              <span className="ml-auto text-[11.5px] font-bold text-gray-500 bg-gray-100 px-2.5 py-0.5 rounded-full">
                {TYPE_TAG[item.bodyType]}
              </span>
            </div>
            {hasText || hasImg ? (
              <div>
                <DocumentBody paragraphs={item.body} />
                {hasImg && (
                  <div className="flex flex-col gap-2.5 mt-2">
                    {item.images.map((src) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img key={src} src={src} alt="공고문 이미지" className="max-w-full h-auto rounded-lg border border-gray-200" />
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="flex gap-3 items-start p-4.5 bg-gray-50 border border-gray-200 rounded-xl text-[13.5px] text-gray-600 leading-relaxed">
                <span className="text-xl">{item.bodyType === "pdf" ? "📄" : "🔗"}</span>
                <div>
                  {item.bodyType === "pdf"
                    ? "이 공고문은 PDF 문서로 제공됩니다. 아래 버튼에서 원문을 확인하세요."
                    : "이 공고의 본문은 해당 지자체 포털(또는 외부 시스템)에서 제공됩니다. 아래 버튼에서 원문을 확인하세요."}
                </div>
              </div>
            )}
          </div>
        </div>

        <aside className="flex flex-col gap-4 lg:sticky lg:top-20">
          <div className="border border-gray-200 rounded-[14px] p-4.5 shadow-sm">
            <h3 className="text-xs font-extrabold text-gray-400 uppercase tracking-wide mb-3.5">핵심 정보</h3>
            <SideRow k="지자체" v={cd.name} />
            <SideRow k="출처" v={cd.source} small />
            {item.ancmNo && <SideRow k="공고번호" v={item.ancmNo} small />}
            {item.start && <SideRow k="신청시작" v={item.start} />}
            {item.end && <SideRow k="신청마감" v={item.end} />}
            {item.agency && <SideRow k="담당" v={item.agency} small last />}
          </div>
          <div className="border border-gray-200 rounded-[14px] p-4.5 shadow-sm">
            <h3 className="text-xs font-extrabold text-gray-400 uppercase tracking-wide mb-3.5">첨부파일</h3>
            <div className="flex flex-col gap-2">
              {item.files.length ? (
                item.files.map((f) => (
                  <a
                    key={f.name}
                    href={f.url || item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-2.5 px-3.5 py-2.75 bg-gray-50 border border-gray-200 rounded-[10px] text-[12.5px] font-semibold text-gray-700 leading-snug hover:border-brand hover:text-brand hover:bg-white transition-colors"
                  >
                    <span>📎</span>
                    <span>{f.name}</span>
                  </a>
                ))
              ) : (
                <div className="text-[12.5px] text-gray-400">첨부파일 없음</div>
              )}
            </div>
          </div>
          <Link
            href="/signup"
            className="flex items-center justify-center gap-1.75 w-full py-2.75 text-[13.5px] font-bold rounded-[10px] bg-brand text-white hover:bg-brand-hover transition-colors"
          >
            이 공고로 컨소시엄 매칭 →
          </Link>
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.75 w-full py-2.75 text-[13.5px] font-bold rounded-[10px] bg-white text-gray-700 border border-gray-200 hover:border-gray-400 hover:bg-gray-50 transition-colors"
          >
            🔗 지자체 포털 원문 보기
          </a>
          <Link
            href={`/announcements/local/${encodeURIComponent(cd.name)}`}
            className="flex items-center justify-center gap-1.75 w-full py-2.75 text-[13.5px] font-bold rounded-[10px] bg-white text-gray-700 border border-gray-200 hover:border-gray-400 hover:bg-gray-50 transition-colors"
          >
            ← {cd.name} 목록
          </Link>
        </aside>
      </div>

      {related.length > 0 && (
        <div className="border border-gray-200 rounded-[14px] p-4.5 shadow-sm mt-7.5">
          <h3 className="text-xs font-extrabold text-gray-400 uppercase tracking-wide mb-3.5">{cd.name}의 다른 공고</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {related.map((r) => {
              const rIdx = cd.items.indexOf(r);
              const rb = localBadge(r);
              return (
                <Link
                  key={r.title}
                  href={`/announcements/local/${encodeURIComponent(cd.name)}/${rIdx}`}
                  className="block p-3.5 border border-gray-200 rounded-[10px] hover:border-[#fbd5ce] transition-colors"
                >
                  <span className={`inline-block text-[11.5px] font-bold px-2.5 py-0.5 rounded-full border ${rb.cls}`}>
                    {rb.label}
                  </span>
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

function SumCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="px-5 py-4 border-r border-b lg:border-b-0 border-gray-200 last:border-r-0">
      <div className="text-[11.5px] font-bold text-gray-400">{label}</div>
      <div className="mt-1.5 font-extrabold leading-snug text-[13px]">{value}</div>
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
