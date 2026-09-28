"use client";

import { useState, type ReactNode } from "react";
import PhaseNav from "./PhaseNav";
import TypeToggle from "./TypeToggle";
import PhaseSteps from "./PhaseSteps";
import TaxonomyPicker, { type TaxonomyPick } from "./TaxonomyPicker";
import FileUpload from "./FileUpload";
import ConsentSection, { type ConsentItem } from "./ConsentSection";
import PerksSidebar from "./PerksSidebar";

const INPUT =
  "w-full font-sans text-[14.5px] px-3.25 py-2.75 border border-gray-200 rounded-[10px] bg-[#fbfbfe] text-gray-900 outline-none transition-colors focus:border-brand-600 focus:bg-white focus:shadow-[0_0_0_3px_var(--color-brand-100)]";

const CONSENT_ITEMS: ConsentItem[] = [
  {
    id: "tos",
    label: "서비스 이용약관 동의",
    tag: { text: "필수", variant: "must" },
    doc: {
      type: "text",
      content:
        "제1조(목적) 본 약관은 씨엘코리아(이하 \"회사\")가 제공하는 R&D 공고 정보 및 컨소시엄 매칭 서비스(이하 \"서비스\")의 이용조건과 절차, 회사와 회원의 권리·의무를 규정함을 목적으로 합니다.\n제2조(회원의 의무) 회원은 가입 시 정확한 정보를 제공하여야 하며, 등록 정보에 변경이 있을 경우 즉시 갱신하여야 합니다.\n제3조(서비스의 변경·중단) 회사는 운영상·기술상 필요에 따라 서비스의 전부 또는 일부를 변경하거나 중단할 수 있습니다.",
    },
  },
  {
    id: "privacy",
    label: "개인정보 수집·이용 동의",
    tag: { text: "필수", variant: "must" },
    hint: "동의를 거부할 수 있으나, 거부 시 회원가입이 제한됩니다.",
    doc: {
      type: "table",
      rows: [
        ["수집 항목", "기업명, 사업자등록번호, 기업유형, 주력 산업분야, 담당자명·직함, 이메일, 연락처, 관심 키워드·전문분야"],
        ["수집·이용 목적", "회원 식별·관리, 맞춤 R&D 공고 정렬 제공, 정기 레터 발송, 컨소시엄 매칭 서비스 제공"],
        ["보유·이용 기간", "회원 탈퇴 시까지(관계 법령에 따른 보존의무가 있는 경우 해당 기간까지)"],
      ],
    },
  },
  {
    id: "third-party",
    label: "개인정보 제3자 제공 동의",
    tag: { text: "Phase II · 매칭 시 필수", variant: "opt" },
    hint: "컨소시엄 매칭 성사 시 귀사 정보가 다른 기관·기업에 제공되어 참여 제안을 받게 됩니다.",
    doc: {
      type: "table",
      rows: [
        ["제공받는 자", "컨소시엄 구성을 희망하는 다른 기관·기업(주관기관 등)"],
        ["제공 목적", "컨소시엄 참여 제안 및 협상 검토"],
        ["제공 항목", "기업명, 주력 산업분야, 관심 키워드·전문분야, 담당자 연락처(이메일)"],
        ["보유·이용 기간", "제공 목적 달성 시까지 또는 회원 탈퇴·동의 철회 시까지"],
      ],
    },
  },
  {
    id: "age",
    label: "만 14세 이상이며, 위 내용을 확인하였습니다",
    tag: { text: "필수", variant: "must" },
  },
  {
    id: "marketing",
    label: "마케팅 · 정기 레터 수신 동의",
    tag: { text: "선택", variant: "opt" },
  },
];

const ORG_TYPES = ["중소기업", "중견기업", "대기업", "대학·연구소", "비영리·공공"];
const FOCUS_FIELDS = ["AI·SW", "바이오·헬스", "소재·부품·장비", "이차전지·에너지", "로봇·자동화", "기타"];

export default function IndividualSignupPage() {
  const [companyName, setCompanyName] = useState("");
  const [bizNum, setBizNum] = useState("");
  const [orgType, setOrgType] = useState(ORG_TYPES[0]);
  const [focusField, setFocusField] = useState(FOCUS_FIELDS[0]);
  const [managerName, setManagerName] = useState("");
  const [managerTitle, setManagerTitle] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [keywords, setKeywords] = useState("");
  const [picks, setPicks] = useState<TaxonomyPick[]>([]);
  const [consent, setConsent] = useState<Record<string, boolean>>({});
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function submit() {
    if (!companyName.trim() || !bizNum.trim()) return setError("기업명과 사업자등록번호를 입력해 주세요.");
    if (!managerName.trim() || !email.trim() || !phone.trim())
      return setError("담당자 정보를 모두 입력해 주세요.");
    if (picks.length < 1) return setError("전문분야·관심 기술분야를 1개 이상 선택해 주세요.");
    if (!consent.tos || !consent.privacy || !consent.age) return setError("필수 약관에 동의해 주세요.");
    setError("");
    setSubmitted(true);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 text-gray-900">
        <PhaseNav />
        <div className="max-w-[720px] mx-auto px-6 py-24 text-center">
          <div className="w-16 h-16 rounded-full bg-[#eaf7f0] text-vok flex items-center justify-center text-3xl mx-auto mb-5">
            ✓
          </div>
          <h1 className="text-2xl font-extrabold mb-2.5">가입이 완료되었습니다</h1>
          <p className="text-gray-500 leading-relaxed mb-8">
            {companyName || "회원님"}의 관심 분야에 맞는 R&D 공고를 정리해 곧 이메일로 보내드립니다.
            <br />
            Phase II 오픈 시 컨소시엄 매칭 후보로 우선 안내해 드릴게요.
          </p>
          <a
            href="/announcements"
            className="inline-block px-6 py-3.25 rounded-[10px] font-bold text-white bg-gradient-to-br from-brand-600 to-brand-700 shadow-[0_6px_16px_rgb(var(--rgb-brand-600)/.28)]"
          >
            지금 바로 공고 확인하기 →
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <PhaseNav />

      <section className="max-w-[1180px] mx-auto px-6 pt-11 pb-2">
        <span className="inline-flex items-center gap-2 bg-brand-100 text-brand-700 font-bold text-[13px] px-3 py-1.5 rounded-full">
          ● Phase I · 회원가입
        </span>
        <h1 className="text-[34px] font-extrabold tracking-tight mt-4 mb-2.5">
          정부 R&D 공고, 우리 회사에 맞게 받아보세요
        </h1>
        <p className="text-gray-500 text-base max-w-[640px]">
          3분이면 가입 완료. 관심 분야만 등록하면 맞춤 공고 정렬과 정기 레터를 받아보고, 추후 컨소시엄
          구성 제안까지 연결됩니다.
        </p>
        <TypeToggle active="individual" />
      </section>

      <div className="max-w-[1180px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-7 items-start py-8 pb-16">
        <main className="bg-white border border-gray-200 rounded-2xl shadow-[0_1px_3px_rgba(20,23,38,.06),0_8px_24px_rgba(20,23,38,.05)]">
          <PhaseSteps steps={["기본·소속 정보", "전문분야 (3개)", "자료·동의"]} />

          <div className="p-7">
            <SectionTitle>기업 정보</SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="기업명" required>
                <input value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="예) 씨엘코리아㈜" className={INPUT} />
              </Field>
              <Field label="사업자등록번호" required>
                <input value={bizNum} onChange={(e) => setBizNum(e.target.value)} placeholder="000-00-00000" className={INPUT} />
              </Field>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="기업 유형" required>
                <select value={orgType} onChange={(e) => setOrgType(e.target.value)} className={INPUT}>
                  {ORG_TYPES.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </Field>
              <Field label="주력 산업분야" required>
                <select value={focusField} onChange={(e) => setFocusField(e.target.value)} className={INPUT}>
                  {FOCUS_FIELDS.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </Field>
            </div>

            <SectionTitle>담당자 정보</SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="담당자명" required>
                <input value={managerName} onChange={(e) => setManagerName(e.target.value)} placeholder="홍길동" className={INPUT} />
              </Field>
              <Field label="직함">
                <input value={managerTitle} onChange={(e) => setManagerTitle(e.target.value)} placeholder="기업부설연구소장" className={INPUT} />
              </Field>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="이메일" required>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@company.com" className={INPUT} />
              </Field>
              <Field label="연락처" required>
                <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="010-0000-0000" className={INPUT} />
              </Field>
            </div>

            <SectionTitle>관심 R&D 키워드</SectionTitle>
            <Field label="관심 분야 · 부처 (맞춤 정렬 및 레터에 활용)">
              <input
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="예) 이차전지AI, 반도체 소부장, 중기부, TIPS, 스케일업"
                className={INPUT}
              />
              <div className="text-[12.5px] text-gray-500 mt-1.5">
                쉼표로 구분해 입력하면 공고 확인 화면과 레터가 이 키워드 기준으로 정렬됩니다.
              </div>
            </Field>

            <SectionTitle>
              전문분야 · 관심 기술분야 선택{" "}
              <span className="ml-auto text-xs font-bold text-gray-500 normal-case tracking-normal">
                선택 <b className="text-brand-800">{picks.length}</b> / 3
              </span>
            </SectionTitle>
            <TaxonomyPicker picks={picks} onChange={setPicks} max={3} />
            <div className="text-[12.5px] text-gray-500 mt-3.5">
              최하위 세분류(또는 최하위 분류)를 클릭하면 담깁니다. 우리기업 분류할 기준이며, 맞춤 공고
              정렬·컨소시엄 매칭에 활용됩니다.
            </div>

            <SectionTitle>기업 소개 자료 업로드</SectionTitle>
            <FileUpload
              hint="회사소개서 · 기업소개서 · 사업자등록증 (PDF, PPTX, ZIP · 최대 20MB)"
              defaultFile={{ name: "씨엘코리아_회사소개서_2026.pdf", size: "4.2MB" }}
            />
            <div className="text-[12.5px] text-gray-500 mt-1.5">
              업로드 자료는 컨소시엄 매칭 시 파트너 기관 검토용으로 활용되며, 별도 동의 후 공개됩니다.
            </div>

            <SectionTitle>약관 동의</SectionTitle>
            <ConsentSection items={CONSENT_ITEMS} checked={consent} onChange={setConsent} />

            <div className="border border-[#c7e1ff] bg-gradient-to-b from-[#e6f2ff] to-white rounded-xl p-4 mt-6 flex gap-3">
              <div className="w-9.5 h-9.5 rounded-[10px] bg-brand-600 text-white flex items-center justify-center shrink-0">
                🤝
              </div>
              <div className="text-[13.5px]">
                <b className="text-brand-800">왜 컨소시엄 매칭 동의가 필요한가요?</b>
                <br />
                Phase II에서 AI가 공고별 최적의 컨소시엄을 구성할 때, 동의한 기업만 매칭 후보로
                추천됩니다. 지금 동의해 두면 좋은 과제가 열렸을 때 먼저 제안을 받을 수 있어요.
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center gap-4 px-7 py-5 border-t border-gray-200 flex-wrap">
            <span className="text-[12.5px] text-gray-500">
              {error ? <span className="text-[#e0442f] font-semibold">{error}</span> : "가입 시 이용약관 및 개인정보처리방침에 동의하게 됩니다."}
            </span>
            <button
              onClick={submit}
              className="px-6 py-3 rounded-[10px] font-bold text-white bg-gradient-to-br from-brand-600 to-brand-700 shadow-[0_6px_16px_rgb(var(--rgb-brand-600)/.28)] hover:-translate-y-px transition-transform cursor-pointer whitespace-nowrap"
            >
              가입 완료하기 →
            </button>
          </div>
        </main>

        <PerksSidebar />
      </div>
    </div>
  );
}

function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-2 text-[13px] font-bold text-brand-800 uppercase tracking-wide mt-6.5 first:mt-1.5 mb-3.5">
      {children}
    </div>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="mb-4">
      <label className="block text-[13.5px] font-semibold mb-1.75">
        {label} {required && <span className="text-red-600">*</span>}
      </label>
      {children}
    </div>
  );
}
