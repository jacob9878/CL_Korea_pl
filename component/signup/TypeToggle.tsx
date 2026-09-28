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
          ? "border-vbrand bg-gradient-to-b from-[#f7f7ff] to-white shadow-[0_6px_18px_rgba(91,91,239,.12)]"
          : "border-vline hover:border-[#c9cbe0]"
      }`}
    >
      {on && (
        <span className="absolute top-4 right-4 text-[11px] font-bold text-white bg-vbrand px-2.25 py-0.75 rounded-md">
          선택됨
        </span>
      )}
      <div className="flex items-center gap-2.5 font-extrabold text-base">
        <span className="w-9.5 h-9.5 rounded-[10px] bg-vbrand-soft text-vbrand flex items-center justify-center text-lg shrink-0">
          {icon}
        </span>
        {title}
      </div>
      <p className="text-[13px] text-vmuted mt-2 leading-relaxed">{desc}</p>
    </Link>
  );
}
