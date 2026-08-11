"use client";

import { useState } from "react";
import Nav from "@/component/shared/Nav";
import Footer from "@/component/shared/Footer";
import SimpleLoginModal from "@/component/shared/SimpleLoginModal";
import ContactForm from "./ContactForm";
import InfoSidebar from "./InfoSidebar";

export default function ContactPage() {
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <>
      <Nav active="문의하기" onLoginClick={() => setLoginOpen(true)} />

      <div className="pt-18 pb-12 px-10 text-center">
        <div className="text-[12.5px] font-bold text-brand uppercase tracking-wide mb-3.5">Contact</div>
        <h1 className="text-[44px] font-black tracking-[-1.5px] leading-[1.12] mb-4">무엇이든 물어보세요</h1>
        <p className="text-base text-gray-500 leading-relaxed">
          데모 신청부터 도입 상담까지, 전담팀이 24시간 내 답변드립니다.
        </p>
      </div>

      <div className="max-w-[1060px] mx-auto px-10 pb-24 grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-14 items-start">
        <ContactForm />
        <InfoSidebar />
      </div>

      <Footer />
      <SimpleLoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}
