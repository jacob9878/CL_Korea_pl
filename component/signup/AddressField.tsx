"use client";

import Script from "next/script";
import { useState } from "react";

declare global {
  interface Window {
    daum?: {
      Postcode: new (opts: { oncomplete: (data: DaumPostcodeData) => void }) => { open: () => void };
    };
  }
}

type DaumPostcodeData = {
  userSelectedType: "R" | "J";
  roadAddress: string;
  jibunAddress: string;
  bname?: string;
  buildingName?: string;
  apartment?: "Y" | "N";
  zonecode: string;
};

const INPUT =
  "w-full font-sans text-[14.5px] px-3.25 py-2.75 border border-gray-200 rounded-[10px] bg-[#fbfbfe] text-gray-900 outline-none transition-colors focus:border-brand-600 focus:bg-white focus:shadow-[0_0_0_3px_var(--color-brand-100)]";

export default function AddressField({
  zip,
  addr1,
  addr2,
  onChange,
}: {
  zip: string;
  addr1: string;
  addr2: string;
  onChange: (next: { zip: string; addr1: string; addr2: string }) => void;
}) {
  const [ready, setReady] = useState(false);

  function findAddr() {
    if (typeof window === "undefined" || !window.daum?.Postcode) {
      alert("우편번호 서비스를 불러오는 중입니다. 인터넷 연결을 확인하고 잠시 후 다시 시도해 주세요.");
      return;
    }
    new window.daum.Postcode({
      oncomplete: (data) => {
        const addr = data.userSelectedType === "R" ? data.roadAddress : data.jibunAddress;
        let extra = "";
        if (data.userSelectedType === "R") {
          if (data.bname && /[동|로|가]$/.test(data.bname)) extra += data.bname;
          if (data.buildingName && data.apartment === "Y") extra += extra ? `, ${data.buildingName}` : data.buildingName;
          if (extra) extra = ` (${extra})`;
        }
        onChange({ zip: data.zonecode, addr1: addr + extra, addr2 });
      },
    }).open();
  }

  return (
    <div className="field mb-4">
      <Script
        src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
        strategy="afterInteractive"
        onLoad={() => setReady(true)}
      />
      <label className="block text-[13.5px] font-semibold mb-1.75">
        현재주소 <span className="text-red-600">*</span>
      </label>
      <div className="flex gap-2.5 mb-2.5">
        <input readOnly value={zip} placeholder="우편번호" className={`${INPUT} max-w-38`} />
        <button
          type="button"
          onClick={findAddr}
          className="bg-[#2b3a55] hover:bg-[#1f2b40] text-white rounded-lg font-bold text-sm px-4.5 whitespace-nowrap cursor-pointer transition-colors"
        >
          {ready ? "우편번호 찾기" : "불러오는 중…"}
        </button>
      </div>
      <input
        readOnly
        value={addr1}
        placeholder="기본주소 (도로명/지번)"
        className={`${INPUT} mb-2.5`}
      />
      <input
        value={addr2}
        onChange={(e) => onChange({ zip, addr1, addr2: e.target.value })}
        placeholder="상세주소 (건물명, 층/호 등)"
        className={INPUT}
      />
    </div>
  );
}
