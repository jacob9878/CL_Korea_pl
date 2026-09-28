"use client";

import { useEffect, useRef, useState } from "react";

type SceneKey = "search" | "profile" | "consortium" | "analysis";

const SIDEBAR_ITEMS: { key: SceneKey; label: string; url: string }[] = [
  { key: "search", label: "파트너 검색", url: "clkorea.ai/search" },
  { key: "profile", label: "기관 프로필", url: "clkorea.ai/profile" },
  { key: "consortium", label: "컨소시엄 방", url: "clkorea.ai/consortium" },
  { key: "analysis", label: "성공률 분석", url: "clkorea.ai/analysis" },
];

const SEARCH_QUERY = "소재부품 기술 보유 중소기업, 주관기관 역할";
const SEARCH_RESULTS = [
  { name: "한국재료연구원", sub: "소재·부품 전문 / 주관기관 가능", score: 97 },
  { name: "나노테크솔루션㈜", sub: "나노소재 기술 보유 / 공동기관", score: 93 },
  { name: "포항공과대학교", sub: "R&D 역량 우수 / 시험기관 추천", score: 89 },
];

const PROFILE_STEPS = [
  { label: "KIPRIS 특허 DB", detail: "특허 기술 분석 중", result: "특허 47건" },
  { label: "DART 재무 정보", detail: "재무 역량 분석 중", result: "매출 320억" },
  { label: "NTIS R&D 이력", detail: "과제 수행 이력 조회", result: "과제 12건" },
  { label: "RISS 논문 분석", detail: "기술 역량 산출 중", result: "논문 89건" },
  { label: "AI 프로필 통합", detail: "역량 점수 최종 산출", result: "완료 ✓" },
];

const CONSORTIUM_SLOTS = [
  { role: "주관기관", filledName: "한국재료연구원", filledStatus: "✓ 확정" },
  { role: "공동기관", filledName: "나노테크솔루션㈜", filledStatus: "✓ 확정" },
  { role: "위탁기관", filledName: "포항공과대학교", filledStatus: "확정 중" },
];

const SCENE_DURATION = 4500;

export default function HeroMockup() {
  const [scene, setScene] = useState<SceneKey>("search");
  const [urlText, setUrlText] = useState(SIDEBAR_ITEMS[0].url);
  const [typedQuery, setTypedQuery] = useState("");
  const [showResults, setShowResults] = useState<boolean[]>([false, false, false]);
  const [profileShown, setProfileShown] = useState<boolean[]>([false, false, false, false, false]);
  const [profileDone, setProfileDone] = useState<boolean[]>([false, false, false, false, false]);
  const [slotState, setSlotState] = useState<("waiting" | "filled" | "pending")[]>([
    "waiting",
    "waiting",
    "waiting",
  ]);
  const [score, setScore] = useState(0);
  const [tipsShown, setTipsShown] = useState<boolean[]>([false, false, false]);

  const timeouts = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    function clearAll() {
      timeouts.current.forEach(clearTimeout);
      timeouts.current = [];
    }
    function after(ms: number, fn: () => void) {
      timeouts.current.push(setTimeout(fn, ms));
    }

    function runScene1() {
      setScene("search");
      setUrlText(SIDEBAR_ITEMS[0].url);
      setShowResults([false, false, false]);
      setTypedQuery("");
      let i = 0;
      const iv = setInterval(() => {
        i++;
        setTypedQuery(SEARCH_QUERY.slice(0, i));
        if (i >= SEARCH_QUERY.length) {
          clearInterval(iv);
          after(200, () => setShowResults([true, false, false]));
          after(500, () => setShowResults([true, true, false]));
          after(800, () => setShowResults([true, true, true]));
        }
      }, 55);
      timeouts.current.push(iv as unknown as ReturnType<typeof setTimeout>);
    }

    function runScene2() {
      setScene("profile");
      setUrlText(SIDEBAR_ITEMS[1].url);
      setProfileShown([false, false, false, false, false]);
      setProfileDone([false, false, false, false, false]);
      const delays = [600, 1400, 2200, 3000, 3800];
      delays.forEach((delay, idx) => {
        after(delay, () => {
          setProfileShown((prev) => prev.map((v, i) => (i === idx ? true : v)));
          after(500, () => setProfileDone((prev) => prev.map((v, i) => (i === idx ? true : v))));
        });
      });
    }

    function runScene3() {
      setScene("consortium");
      setUrlText(SIDEBAR_ITEMS[2].url);
      setSlotState(["waiting", "waiting", "waiting"]);
      after(500, () => setSlotState(["filled", "waiting", "waiting"]));
      after(1400, () => setSlotState(["filled", "filled", "waiting"]));
      after(2300, () => setSlotState(["filled", "filled", "pending"]));
    }

    function runScene4() {
      setScene("analysis");
      setUrlText(SIDEBAR_ITEMS[3].url);
      setScore(0);
      setTipsShown([false, false, false]);
      after(400, () => {
        let s = 0;
        const target = 78;
        const iv = setInterval(() => {
          s += 2;
          setScore(Math.min(s, target));
          if (s >= target) {
            clearInterval(iv);
            after(300, () => setTipsShown([true, false, false]));
            after(700, () => setTipsShown([true, true, false]));
            after(1100, () => setTipsShown([true, true, true]));
          }
        }, 30);
        timeouts.current.push(iv as unknown as ReturnType<typeof setTimeout>);
      });
    }

    function runSequence() {
      runScene1();
      after(SCENE_DURATION, () => {
        runScene2();
        after(SCENE_DURATION, () => {
          runScene3();
          after(SCENE_DURATION, () => {
            runScene4();
            after(SCENE_DURATION, runSequence);
          });
        });
      });
    }

    const kickoff = setTimeout(runSequence, 1200);
    timeouts.current.push(kickoff);

    return clearAll;
  }, []);

  return (
    <div className="animate-fade-in [animation-delay:.55s]">
      <div className="bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden">
        {/* browser bar */}
        <div className="flex items-center gap-2.5 px-3.5 py-2.5 bg-gray-50 border-b border-gray-200">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57] block" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e] block" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#28c840] block" />
          </div>
          <div className="flex-1 bg-white border border-gray-200 rounded-md px-2.5 py-1 text-[11.5px] text-gray-500 flex items-center gap-1.5">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2.5">
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <span>{urlText}</span>
          </div>
        </div>

        <div className="grid grid-cols-[180px_1fr] min-h-[480px]">
          {/* sidebar */}
          <div className="bg-gray-50 border-r border-gray-200 p-2.5 flex flex-col gap-0.5">
            <div className="text-[11px] font-extrabold text-gray-900 px-2 pb-3 pt-1">
              CL<span className="text-brand-800">K</span>
            </div>
            {SIDEBAR_ITEMS.map((item) => (
              <div
                key={item.key}
                className={`flex items-center gap-1.5 px-2 py-1.5 rounded-md text-[11px] transition-colors ${
                  scene === item.key
                    ? "bg-white text-gray-900 font-semibold shadow-sm"
                    : "text-gray-500"
                }`}
              >
                {item.label}
              </div>
            ))}
          </div>

          {/* main area */}
          <div className="p-4.5 relative overflow-hidden">
            {scene === "search" && (
              <div>
                <div className="text-[11px] font-extrabold text-gray-900 mb-2.5">파트너 검색</div>
                <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-[11px] text-gray-500 mb-3">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2.5">
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                  </svg>
                  <span className="text-gray-900">{typedQuery}</span>
                  {typedQuery.length < SEARCH_QUERY.length && (
                    <span className="inline-flex gap-[3px] items-center ml-1">
                      <span className="w-1 h-1 bg-gray-400 rounded-full animate-dot1" />
                      <span className="w-1 h-1 bg-gray-400 rounded-full animate-dot2" />
                      <span className="w-1 h-1 bg-gray-400 rounded-full animate-dot3" />
                    </span>
                  )}
                </div>
                {SEARCH_RESULTS.map((r, i) => (
                  <div
                    key={r.name}
                    className={`flex items-center justify-between bg-white border border-gray-200 rounded-lg px-3 py-2.5 mb-1.5 text-[11px] transition-all duration-300 ${
                      showResults[i] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
                    }`}
                  >
                    <div>
                      <div className="font-bold text-gray-900 text-[11px]">{r.name}</div>
                      <div className="text-gray-400 text-[10px] mt-0.5">{r.sub}</div>
                    </div>
                    <div className="text-xs font-extrabold text-brand-800">{r.score}%</div>
                  </div>
                ))}
              </div>
            )}

            {scene === "profile" && (
              <div>
                <div className="text-[11px] font-extrabold text-gray-900 mb-2.5 flex items-center">
                  AI 기관 프로필 구축 중
                  <span className="inline-flex gap-[3px] items-center ml-1">
                    <span className="w-1 h-1 bg-gray-400 rounded-full animate-dot1" />
                    <span className="w-1 h-1 bg-gray-400 rounded-full animate-dot2" />
                    <span className="w-1 h-1 bg-gray-400 rounded-full animate-dot3" />
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  {PROFILE_STEPS.map((step, i) => (
                    <div
                      key={step.label}
                      className={`flex items-center gap-2.5 px-2.5 py-2 bg-white border border-gray-200 rounded-lg text-[10.5px] transition-all duration-300 ${
                        profileShown[i] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
                      }`}
                    >
                      <div className="w-5.5 h-5.5 rounded-full bg-brand-50 flex items-center justify-center text-[10px] shrink-0">
                        {i === 4 ? "✨" : "📄"}
                      </div>
                      <div>
                        <div className="font-bold text-gray-900 text-[10.5px]">{step.label}</div>
                        <div className="text-gray-500">{step.detail}</div>
                      </div>
                      <div
                        className={`ml-auto font-bold text-[10px] ${
                          profileDone[i] ? "text-emerald-500" : "text-gray-900"
                        }`}
                      >
                        {profileDone[i] ? step.result : ""}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {scene === "consortium" && (
              <div>
                <div className="text-xs font-extrabold text-gray-900 mb-2.5">
                  소재부품 공정혁신 컨소시엄
                </div>
                <div className="text-[10px] text-gray-400 mb-3">
                  산업통상자원부 · 2026년 신규과제 · 총 연구비 48억
                </div>
                {CONSORTIUM_SLOTS.map((slot, i) => {
                  const st = slotState[i];
                  return (
                    <div
                      key={slot.role}
                      className={`flex items-center justify-between rounded-lg px-3 py-2.5 mb-1.5 text-[11px] transition-all duration-350 border ${
                        st === "filled"
                          ? "border-emerald-100 bg-emerald-50"
                          : st === "pending"
                            ? "border-amber-200 bg-amber-50"
                            : "border-dashed border-gray-200 text-gray-400"
                      }`}
                    >
                      <div>
                        <div className="font-semibold">{slot.role}</div>
                        <div className="text-[10px] text-gray-500 mt-0.5">
                          {st === "waiting" ? "배정 대기 중" : slot.filledName}
                        </div>
                      </div>
                      <div
                        className={`font-bold ${
                          st === "filled"
                            ? "text-emerald-500"
                            : st === "pending"
                              ? "text-amber-600"
                              : "text-gray-400"
                        }`}
                      >
                        {st === "waiting" ? "대기" : st === "filled" ? slot.filledStatus : "확정 중"}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {scene === "analysis" && (
              <div>
                <div className="text-[11px] font-extrabold text-gray-900 mb-2.5">
                  컨소시엄 성공률 분석
                </div>
                <div className="flex items-baseline gap-1.5 mb-3.5">
                  <div className="text-4xl font-black text-brand-600 leading-none">{score}</div>
                  <div className="text-xs text-gray-500">
                    / 100점&nbsp;
                    <span className="text-emerald-500 font-bold text-[11px]">→ 91점 예측</span>
                  </div>
                </div>
                <div className="bg-gray-100 rounded-full h-1.5 overflow-hidden mb-3.5">
                  <div
                    className="h-full bg-brand-500 rounded-full transition-[width] duration-1000"
                    style={{ width: `${score}%` }}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  {[
                    { icon: "✅", text: "주관기관 R&D 수행 이력 우수(12건)" },
                    { icon: "✅", text: "컨소시엄 역할 분담 최적화 완료" },
                    { icon: "⚠️", text: "위탁기관 보완 권장 → 점수 +13점 예상" },
                  ].map((tip, i) => (
                    <div
                      key={tip.text}
                      className={`flex items-center gap-1.5 text-[10.5px] text-gray-600 transition-opacity duration-300 ${
                        tipsShown[i] ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <span className="text-xs">{tip.icon}</span>
                      {tip.text}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
