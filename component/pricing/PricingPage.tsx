"use client";

import { useState } from "react";
import Nav from "@/component/shared/Nav";
import Footer from "@/component/shared/Footer";
import SimpleLoginModal from "@/component/shared/SimpleLoginModal";
import PlanCards from "./PlanCards";
import CompareTable from "./CompareTable";
import Faq from "./Faq";

export default function PricingPage() {
  const [loginOpen, setLoginOpen] = useState(false);
  const open = () => setLoginOpen(true);

  return (
    <>
      <Nav active="가격 정책" onLoginClick={open} />

      <div className="pt-20 pb-4 px-10 text-center">
        <div className="text-[12.5px] font-bold text-brand uppercase tracking-wide mb-3.5">Pricing</div>
        <h1 className="text-[48px] font-black tracking-[-1.5px] leading-[1.12] mb-4">
          R&D 성과에 맞는
          <br />
          합리적인 요금제
        </h1>
        <p className="text-base text-gray-500 leading-relaxed">
          과제 1건 예산으로 투자 비용을 판단하세요.
          <br />
          모든 플랜에 14일 무료 체험을 제공합니다.
        </p>
      </div>

      <div className="pb-24 px-10">
        <PlanCards onLoginClick={open} />
      </div>

      <CompareTable />
      <Faq />

      <div className="py-20 px-10 bg-brand text-center">
        <h2 className="text-4xl font-black text-white tracking-[-1px] mb-3.5">지금 바로 시작하세요</h2>
        <p className="text-base text-white/80 leading-relaxed mb-8">
          14일 무료 체험으로 CL Korea의 AI 매칭을 경험해보세요.
          <br />
          카드 등록 없이 즉시 사용 가능합니다.
        </p>
        <div className="flex justify-center gap-3">
          <button
            onClick={open}
            className="px-7 py-3 text-[15px] font-bold text-brand bg-white rounded-[10px] hover:shadow-lg transition-shadow cursor-pointer"
          >
            무료로 시작하기 →
          </button>
          <a
            href="/contact"
            className="px-7 py-3 text-[15px] font-bold text-white bg-transparent border-2 border-white/50 rounded-[10px] hover:border-white transition-colors"
          >
            데모 신청하기
          </a>
        </div>
      </div>

      <Footer />
      <SimpleLoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}
