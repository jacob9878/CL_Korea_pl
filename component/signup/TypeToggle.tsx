import Link from "next/link";
import type { ReactNode } from "react";

export default function TypeToggle({ active }: { active: "individual" | "expert" }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-6.5">
      <Card
        href="/signup"
        on={active === "individual"}
        icon="🏢"
        title="개인자격 회원가입"
        desc="맞춤 공고 정렬 · 정기 레터 · 컨소시엄 참여 신청 지원"
      />
      <Card
        href="/signup/expert"
        on={active === "expert"}
        icon="🎓"
        title="전문가(평가위원) 회원가입"
        desc={
          <>
            전문분야 등록 후 과제 평가·자문·컨소시엄 매칭 전문가 풀 참여
            <br />
            수행 내용에 따라 전문가 활동비 지급
          </>
        }
      />
    </div>
  );
}

function Card({
  href,
  on,
  icon,
  title,
  desc,
}: {
  href: string;
  on: boolean;
  icon: string;
  title: string;
  desc: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`relative block border-[1.5px] rounded-2xl px-5 py-4.5 bg-white transition-all ${
        on
          ? "border-brand-600 bg-gradient-to-b from-[#e6f2ff] to-white shadow-[0_6px_18px_rgb(var(--rgb-brand-600)/.12)]"
          : "border-gray-200 hover:border-[#c7e1ff]"
      }`}
    >
      {on && (
        <span className="absolute top-4 right-4 text-[11px] font-bold text-white bg-brand-600 px-2.25 py-0.75 rounded-md">
          선택됨
        </span>
      )}
      <div className="flex items-center gap-2.5 font-extrabold text-base">
        <span className="w-9.5 h-9.5 rounded-[10px] bg-brand-100 text-brand-700 flex items-center justify-center text-lg shrink-0">
          {icon}
        </span>
        {title}
      </div>
      <p className="text-[13px] text-gray-500 mt-2 leading-relaxed">{desc}</p>
    </Link>
  );
}
