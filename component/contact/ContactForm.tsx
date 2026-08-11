"use client";

import { useState, type ReactNode } from "react";

const INPUT_CLASS =
  "w-full px-3.5 py-2.5 border-[1.5px] border-gray-200 rounded-[10px] text-sm outline-none transition-all focus:border-brand focus:shadow-[0_0_0_3px_rgba(232,52,26,.08)]";

const TABS = [
  { key: "demo", label: "📅 데모 신청", placeholder: "데모에서 특히 확인하고 싶은 기능이나 궁금한 점을 알려주세요.", showRd: true },
  { key: "inquiry", label: "💬 도입 문의", placeholder: "도입을 검토 중인 배경이나 현재 어려움을 알려주시면 맞춤 상담이 가능합니다.", showRd: true },
  { key: "other", label: "📋 기타 문의", placeholder: "궁금하신 점을 자유롭게 작성해 주세요.", showRd: false },
] as const;

type TabKey = (typeof TABS)[number]["key"];

export default function ContactForm() {
  const [tab, setTab] = useState<TabKey>("demo");
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    orgName: "",
    contactName: "",
    email: "",
    phone: "",
    orgSize: "",
    rdExp: "",
    message: "",
  });
  const [error, setError] = useState("");

  const current = TABS.find((t) => t.key === tab)!;

  function switchTab(key: TabKey) {
    setTab(key);
    setSubmitted(false);
  }

  function submit() {
    if (!form.orgName.trim() || !form.contactName.trim() || !form.email.trim()) {
      setError("기관명, 담당자명, 이메일은 필수 입력 항목입니다.");
      return;
    }
    setError("");
    setSubmitted(true);
  }

  function reset() {
    setForm({ orgName: "", contactName: "", email: "", phone: "", orgSize: "", rdExp: "", message: "" });
    setSubmitted(false);
  }

  return (
    <div>
      <div className="flex gap-1 bg-gray-100 rounded-[10px] p-1 mb-7">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => switchTab(t.key)}
            className={`flex-1 py-2.25 text-[13.5px] font-semibold rounded-lg cursor-pointer transition-colors ${
              tab === t.key ? "bg-white text-gray-900 shadow-sm" : "bg-transparent text-gray-500"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-8">
        {!submitted ? (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4.5">
              <Field label="기관명" required>
                <input
                  value={form.orgName}
                  onChange={(e) => setForm({ ...form, orgName: e.target.value })}
                  placeholder="한국재료연구원"
                  className={INPUT_CLASS}
                />
              </Field>
              <Field label="담당자명" required>
                <input
                  value={form.contactName}
                  onChange={(e) => setForm({ ...form, contactName: e.target.value })}
                  placeholder="홍길동"
                  className={INPUT_CLASS}
                />
              </Field>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4.5">
              <Field label="이메일" required>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="contact@company.com"
                  className={INPUT_CLASS}
                />
              </Field>
              <Field label="연락처">
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="010-0000-0000"
                  className={INPUT_CLASS}
                />
              </Field>
            </div>
            <Field label="기관 규모" className="mb-4.5">
              <select
                value={form.orgSize}
                onChange={(e) => setForm({ ...form, orgSize: e.target.value })}
                className={INPUT_CLASS}
              >
                <option value="">선택해 주세요</option>
                <option>소기업 (50인 미만)</option>
                <option>중기업 (50~300인)</option>
                <option>중견·대기업 (300인 이상)</option>
                <option>대학·연구기관</option>
                <option>정부·공공기관</option>
              </select>
            </Field>
            {current.showRd && (
              <Field label="연간 R&D 과제 참여 건수" className="mb-4.5">
                <select
                  value={form.rdExp}
                  onChange={(e) => setForm({ ...form, rdExp: e.target.value })}
                  className={INPUT_CLASS}
                >
                  <option value="">선택해 주세요</option>
                  <option>없음 (처음 도전)</option>
                  <option>1~3건</option>
                  <option>4~10건</option>
                  <option>11건 이상</option>
                </select>
              </Field>
            )}
            <Field label="문의 내용" className="mb-2">
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder={current.placeholder}
                className={`${INPUT_CLASS} resize-y min-h-30 leading-relaxed`}
              />
            </Field>
            {error && <p className="text-[12.5px] text-brand mb-3">{error}</p>}
            <button
              onClick={submit}
              className="w-full py-3.25 bg-brand text-white text-[15px] font-bold rounded-[10px] mt-1 hover:bg-brand-hover transition-colors cursor-pointer"
            >
              문의 제출하기 →
            </button>
            <p className="text-xs text-gray-400 text-center mt-3 leading-relaxed">
              제출하신 정보는 문의 답변 목적으로만 사용되며,
              <br />제 3자에게 제공되지 않습니다.
            </p>
          </div>
        ) : (
          <div className="text-center py-12 px-6">
            <div className="w-14 h-14 bg-brand-light rounded-full flex items-center justify-center mx-auto mb-5 text-2xl">
              ✅
            </div>
            <div className="text-xl font-extrabold mb-2.5">문의가 접수되었습니다!</div>
            <p className="text-[14.5px] text-gray-500 leading-relaxed">
              영업일 기준 24시간 내에
              <br />
              담당자가 연락드리겠습니다.
              <br />
              <br />
              <span className="text-[13px] text-gray-400">문의 확인 메일이 발송되었습니다.</span>
            </p>
            <button
              onClick={reset}
              className="mt-7 py-3.25 px-6 bg-brand text-white text-[15px] font-bold rounded-[10px] hover:bg-brand-hover transition-colors cursor-pointer"
            >
              새 문의 작성
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  required,
  className = "",
  children,
}: {
  label: string;
  required?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.75">
        {label} {required && <span className="text-brand">*</span>}
      </label>
      {children}
    </div>
  );
}
