"use client";

import { useState, type ReactNode } from "react";
import PhaseNav from "./PhaseNav";
import TypeToggle from "./TypeToggle";
import PhaseSteps from "./PhaseSteps";
import TaxonomyPicker, { type TaxonomyPick } from "./TaxonomyPicker";
import AddressField from "./AddressField";
import ConsentSection, { type ConsentItem } from "./ConsentSection";
import EmailVerifyGate from "./EmailVerifyGate";
import { createClient } from "@/lib/supabase/client";

const INPUT =
  "w-full font-sans text-[14.5px] px-3.25 py-2.75 border border-gray-200 rounded-[10px] bg-[#fbfbfe] text-gray-900 outline-none transition-colors focus:border-brand-600 focus:bg-white focus:shadow-[0_0_0_3px_var(--color-brand-100)]";

const DEGREES = ["박사", "박사수료", "석사", "학사", "기타"];

const CONSENT_ITEMS: ConsentItem[] = [
  {
    id: "tos",
    label: "서비스 이용약관 동의",
    tag: { text: "필수", variant: "must" },
    doc: {
      type: "text",
      content:
        "제1조(목적) 본 약관은 씨엘코리아(이하 \"회사\")가 제공하는 R&D 공고 정보 및 컨소시엄·전문가 매칭 서비스(이하 \"서비스\")의 이용조건과 절차, 회사와 회원의 권리·의무를 규정함을 목적으로 합니다.\n제2조(회원의 의무) 회원은 가입 시 정확한 정보를 제공하여야 하며, 등록 정보에 변경이 있을 경우 즉시 갱신하여야 합니다.\n제3조(서비스의 변경·중단) 회사는 운영상·기술상 필요에 따라 서비스의 전부 또는 일부를 변경하거나 중단할 수 있습니다.",
    },
  },
  {
    id: "expert-code",
    label: "전문가 행동강령 동의",
    tag: { text: "필수", variant: "must" },
    doc: {
      type: "text",
      content:
        "본인은 회사가 위임하는 과제 평가·자문·컨소시엄 매칭 활동에 참여하며, 다음 사항을 준수합니다.\n1. 평가·자문 과정에서 알게 된 과제 내용·기술·영업비밀을 외부에 누설하지 않습니다(비밀유지 의무).\n2. 공정하고 객관적으로 평가·자문 업무를 수행합니다.\n3. 활동 내용에 따라 회사가 정한 기준에 따라 전문가 활동비를 지급받습니다.",
    },
  },
  {
    id: "privacy",
    label: "개인정보 수집·이용 동의",
    tag: { text: "필수", variant: "must" },
    hint: "동의를 거부할 수 있으나, 거부 시 전문가 회원가입이 제한됩니다.",
    doc: {
      type: "table",
      rows: [
        ["수집 항목", "성명, 생년월일, 이메일, 휴대폰, 소속기관, 부서·직위, 현재주소, 전문분야, 최종학위·전공, 경력, 보유 자격·주요 실적"],
        ["수집·이용 목적", "전문가 회원 식별·관리, 과제 평가·자문 및 컨소시엄 전문가 매칭, 활동 안내·연락"],
        ["보유·이용 기간", "회원 탈퇴 시까지(관계 법령에 따른 보존의무가 있는 경우 해당 기간까지)"],
      ],
    },
  },
  {
    id: "third-party",
    label: "개인정보 제3자 제공 동의",
    tag: { text: "필수", variant: "must" },
    hint: "매칭 성사 시 전문가 정보가 과제 주관기관·참여기업에 제공됩니다.",
    doc: {
      type: "table",
      rows: [
        ["제공받는 자", "매칭 대상 과제의 주관기관 및 참여기업(위탁기관)"],
        ["제공 목적", "컨소시엄 구성 검토, 과제 평가·자문 위촉 검토"],
        ["제공 항목", "성명, 소속기관·직위, 전문분야, 경력·주요실적, 연락처(이메일)"],
        ["보유·이용 기간", "제공 목적 달성 시까지 또는 회원 탈퇴·동의 철회 시까지"],
      ],
    },
  },
  {
    id: "conflict",
    label: "이해충돌(제척·회피) 확인 동의",
    tag: { text: "필수", variant: "must" },
    hint: "본인이 이해관계가 있는 과제의 평가·자문 시 제척·회피를 동의합니다.",
  },
  {
    id: "age",
    label: "만 14세 이상이며, 위 내용을 확인하였습니다",
    tag: { text: "필수", variant: "must" },
  },
  {
    id: "payment",
    label: "활동비 지급용 정보(주민등록번호·계좌) 수집·이용 동의",
    tag: { text: "활동비 지급 시", variant: "pay" },
    hint: "전문가 활동비 지급 및 소득세법에 따른 원천징수·지급명세서 제출을 위해 수집합니다. (실제 지급 단계에서 별도 수집·암호화 보관)",
  },
  {
    id: "marketing",
    label: "마케팅 · 정기 레터 수신 동의",
    tag: { text: "선택", variant: "opt" },
  },
];

export default function ExpertSignupPage() {
  const [name, setName] = useState("");
  const [birth, setBirth] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [org, setOrg] = useState("");
  const [dept, setDept] = useState("");
  const [address, setAddress] = useState({ zip: "", addr1: "", addr2: "" });
  const [picks, setPicks] = useState<TaxonomyPick[]>([]);
  const [degree, setDegree] = useState(DEGREES[0]);
  const [major, setMajor] = useState("");
  const [years, setYears] = useState("");
  const [credentials, setCredentials] = useState("");
  const [consent, setConsent] = useState<Record<string, boolean>>({});
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [verifiedEmail, setVerifiedEmail] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function submit() {
    if (!verifiedEmail) return setError("이메일 본인인증을 먼저 완료해 주세요.");
    if (!name.trim() || !email.trim() || !phone.trim()) return setError("성명·이메일·휴대폰을 입력해 주세요.");
    if (!org.trim() || !dept.trim()) return setError("소속기관과 부서/직위를 입력해 주세요.");
    if (picks.length < 3) return setError(`전문분야를 3개 모두 선택해 주세요. (현재 ${picks.length}개)`);
    if (!years.trim()) return setError("해당분야 경력(년)을 입력해 주세요.");
    const requiredIds = ["tos", "expert-code", "privacy", "third-party", "conflict", "age"];
    if (requiredIds.some((id) => !consent[id])) return setError("필수 약관에 모두 동의해 주세요.");
    setError("");
    setSubmitting(true);

    const supabase = createClient();
    const { data: application, error: insertError } = await supabase
      .from("expert_applications")
      .insert({
        name: name.trim(),
        birth: birth || null,
        email: verifiedEmail,
        phone: phone.trim(),
        org_name: org.trim(),
        dept: dept.trim(),
        address_zip: address.zip || null,
        address_addr1: address.addr1 || null,
        address_addr2: address.addr2 || null,
        degree,
        major: major.trim() || null,
        years: parseInt(years, 10),
        credentials: credentials.trim() || null,
        consents: consent,
      })
      .select()
      .single();

    if (insertError || !application) {
      setSubmitting(false);
      return setError(`제출 중 오류가 발생했습니다: ${insertError?.message ?? "알 수 없는 오류"}`);
    }

    const { error: picksError } = await supabase.from("expert_application_taxonomy_picks").insert(
      picks.map((p) => ({ application_id: application.id, key: p.key, leaf: p.leaf, trail: p.trail })),
    );

    setSubmitting(false);
    if (picksError) return setError(`전문분야 저장 중 오류가 발생했습니다: ${picksError.message}`);

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
          <h1 className="text-2xl font-extrabold mb-2.5">전문가 등록 신청이 접수되었습니다</h1>
          <p className="text-gray-500 leading-relaxed mb-8">
            제출하신 전문분야·경력을 바탕으로 자격 검토를 진행합니다.
            <br />
            심사 승인되면 이메일로 안내드리며, 이후 과제 평가·자문·컨소시엄 매칭 요청을 받아보실 수
            있습니다.
          </p>
          <a
            href="/announcements"
            className="inline-block px-6 py-3.25 rounded-[10px] font-bold text-white bg-gradient-to-br from-brand-600 to-brand-700 shadow-[0_6px_16px_rgb(var(--rgb-brand-600)/.28)]"
          >
            공고 확인하러 가기 →
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <PhaseNav />

      <section className="max-w-[1120px] mx-auto px-6 pt-10 pb-2">
        <span className="inline-flex items-center gap-2 bg-brand-100 text-brand-700 font-bold text-[13px] px-3 py-1.5 rounded-full">
          ● Phase I · 회원가입
        </span>
        <h1 className="text-[32px] font-extrabold tracking-tight mt-4 mb-2.5">
          어떤 자격으로 가입하시나요?
        </h1>
        <p className="text-gray-500 text-base max-w-[660px]">
          개인 회원으로 맞춤 공고를 받아보거나, 전문가(평가·자문위원)로 등록해 컨소시엄과 과제 평가에
          참여할 수 있습니다.
        </p>
        <TypeToggle active="expert" />
      </section>

      <div className="max-w-[1120px] mx-auto px-6 py-8 pb-16">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-[0_1px_3px_rgba(20,23,38,.06),0_8px_24px_rgba(20,23,38,.05)]">
          <PhaseSteps steps={["기본·소속 정보", "전문분야 (3개)", "경력·동의"]} />

          <div className="p-7">
            <EmailVerifyGate
              onVerified={(verified) => {
                setVerifiedEmail(verified);
                setEmail(verified);
              }}
            />

            <SectionTitle>기본 정보</SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="성명" required>
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="홍길동" className={INPUT} />
              </Field>
              <Field label="생년월일" required>
                <input type="date" value={birth} onChange={(e) => setBirth(e.target.value)} className={INPUT} />
              </Field>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="이메일" required>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@org.re.kr"
                  disabled={!!verifiedEmail}
                  className={`${INPUT} ${verifiedEmail ? "opacity-60 cursor-not-allowed" : ""}`}
                />
              </Field>
              <Field label="휴대폰" required>
                <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="010-0000-0000" className={INPUT} />
              </Field>
            </div>

            <SectionTitle>소속 · 직위</SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="소속기관" required>
                <input value={org} onChange={(e) => setOrg(e.target.value)} placeholder="예) 한국건설생활환경시험연구원(KCL)" className={INPUT} />
              </Field>
              <Field label="부서 / 직위" required>
                <input value={dept} onChange={(e) => setDept(e.target.value)} placeholder="예) 신뢰성인증본부 / 책임연구원" className={INPUT} />
              </Field>
            </div>
            <AddressField zip={address.zip} addr1={address.addr1} addr2={address.addr2} onChange={setAddress} />

            <SectionTitle>
              전문분야 선택{" "}
              <span className="ml-auto text-xs font-bold text-gray-500 normal-case tracking-normal">
                선택 <b className="text-brand-800">{picks.length}</b> / 3 (필수)
              </span>
            </SectionTitle>
            <TaxonomyPicker picks={picks} onChange={setPicks} max={3} />
            <div className="text-[12.5px] text-gray-500 mt-3.5">
              최하위 세분류(또는 최하위 분류)를 클릭하면 전문분야로 담깁니다. 우선기업이 분류한(대·중·소·세분류)
              기준이며, 전문분야는 과제 심사위원 매칭에 활용됩니다.
            </div>

            <SectionTitle>학력 · 경력</SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="최종학위" required>
                <select value={degree} onChange={(e) => setDegree(e.target.value)} className={INPUT}>
                  {DEGREES.map((d) => (
                    <option key={d}>{d}</option>
                  ))}
                </select>
              </Field>
              <Field label="세부 전공">
                <input value={major} onChange={(e) => setMajor(e.target.value)} placeholder="예) 재료공학" className={INPUT} />
              </Field>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="해당분야 경력(년)" required>
                <input
                  type="number"
                  value={years}
                  onChange={(e) => setYears(e.target.value)}
                  placeholder="예) 12"
                  className={INPUT}
                />
              </Field>
              <Field label="보유 자격 / 주요 실적">
                <input
                  value={credentials}
                  onChange={(e) => setCredentials(e.target.value)}
                  placeholder="예) 기술사, SCI 논문 20편, 특허 5건"
                  className={INPUT}
                />
              </Field>
            </div>

            <SectionTitle>약관 및 개인정보 동의</SectionTitle>
            <ConsentSection items={CONSENT_ITEMS} checked={consent} onChange={setConsent} />
          </div>

          <div className="flex justify-between items-center gap-4 px-7 py-5 border-t border-gray-200 flex-wrap">
            <span className="text-[12.5px] text-gray-500">
              {error ? (
                <span className="text-[#e0442f] font-semibold">{error}</span>
              ) : (
                "전문가 등록 후 자격 검토를 거쳐 승인되면 전문가 회원으로 등록됩니다."
              )}
            </span>
            <button
              onClick={submit}
              disabled={submitting}
              className="px-6 py-3 rounded-[10px] font-bold text-white bg-gradient-to-br from-brand-600 to-brand-700 shadow-[0_6px_16px_rgb(var(--rgb-brand-600)/.28)] hover:-translate-y-px transition-transform cursor-pointer whitespace-nowrap disabled:opacity-50 disabled:hover:translate-y-0"
            >
              {submitting ? "제출 중..." : "전문가 등록 신청 →"}
            </button>
          </div>
        </div>
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

function Field({ label, required, children }: { label: string; required?: boolean; children: ReactNode }) {
  return (
    <div className="mb-4">
      <label className="block text-[13.5px] font-semibold mb-1.75">
        {label} {required && <span className="text-red-600">*</span>}
      </label>
      {children}
    </div>
  );
}
