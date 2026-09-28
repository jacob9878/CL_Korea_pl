"use client";

import { useState } from "react";

const FAQS = [
  {
    q: "14일 무료 체험 후 자동으로 결제되나요?",
    a: "아니요. 무료 체험 기간이 끝나면 자동으로 결제되지 않으며, 계속 이용하려면 플랜을 직접 선택해 결제해야 합니다. 카드 정보 없이도 체험을 시작할 수 있습니다.",
  },
  {
    q: "플랜을 중간에 변경하거나 취소할 수 있나요?",
    a: "언제든지 플랜을 업그레이드·다운그레이드하거나 취소할 수 있습니다. 업그레이드 시 남은 기간은 일할 계산되며, 취소하시더라도 현재 결제 기간이 끝날 때까지 서비스를 계속 이용할 수 있습니다.",
  },
  {
    q: "기관 단위로 여러 명이 함께 사용할 수 있나요?",
    a: "스탠다드 플랜부터 팀 멤버 초대 기능을 제공합니다. 기관 단위의 대용량 라이선스나 맞춤 계약이 필요하시면 문의하기를 통해 별도로 상담해 드립니다.",
  },
  {
    q: "세금계산서 발행이 가능한가요?",
    a: "네, 모든 유료 플랜에서 세금계산서 발행을 지원합니다. 결제 완료 후 마이페이지에서 사업자등록번호를 등록하시면 자동으로 발행됩니다.",
  },
  {
    q: "연간 결제 시 환불 정책은 어떻게 되나요?",
    a: "연간 결제 후 30일 이내에는 전액 환불이 가능합니다. 30일 이후에는 남은 기간에 대해 일할 계산으로 환불해 드립니다. 자세한 내용은 이용약관을 참고해 주세요.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="py-20 px-10">
      <div className="max-w-[720px] mx-auto">
        <h2 className="text-[32px] font-black tracking-[-.8px] text-center mb-10">자주 묻는 질문</h2>
        {FAQS.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={f.q} className="border-b border-gray-200">
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full flex items-center justify-between gap-4 py-5 text-left text-[15px] font-bold text-gray-900 cursor-pointer"
              >
                {f.q}
                <span
                  className={`w-5.5 h-5.5 rounded-full border-[1.5px] flex items-center justify-center text-base leading-none shrink-0 transition-all ${
                    isOpen ? "rotate-45 border-brand-600 text-brand-600" : "border-gray-200 text-gray-400"
                  }`}
                >
                  +
                </span>
              </button>
              <div
                className="overflow-hidden transition-all duration-300"
                style={{ maxHeight: isOpen ? "320px" : "0px" }}
              >
                <p className="pb-5 text-[14.5px] text-gray-500 leading-relaxed">{f.a}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
