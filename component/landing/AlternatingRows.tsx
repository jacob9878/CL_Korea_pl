import Reveal from "./Reveal";

function ConnectRow({ label, count, color }: { label: string; count: string; color: string }) {
  return (
    <div className="flex items-center justify-between text-xs px-2.5 py-2 bg-gray-50 border border-gray-200 rounded-md">
      <span className="font-bold">{label}</span>
      <span className="text-[11px] font-bold" style={{ color }}>
        ✓ 연결됨 · {count}
      </span>
    </div>
  );
}

function MiniBar({ label, value, colorClass, numClass }: { label: string; value: number; colorClass: string; numClass: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[9.5px] text-gray-500 min-w-16">{label}</span>
      <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${colorClass}`} style={{ width: `${value}%` }} />
      </div>
      <span className={`text-[9.5px] font-bold ${numClass}`}>{value}</span>
    </div>
  );
}

export default function AlternatingRows() {
  return (
    <section id="services" className="py-24 px-10 bg-gray-50">
      <div className="max-w-[1160px] mx-auto">
        <Reveal className="text-center mb-16">
          <div className="text-[12.5px] font-bold text-brand-800 uppercase tracking-wide mb-3">
            플랫폼이 특별한 이유
          </div>
          <h2 className="text-[40px] font-black leading-[1.15] tracking-[-1px] text-gray-900">
            CL Korea만의
            <br />
            차별화된 기술
          </h2>
        </Reveal>

        {/* ROW 1 */}
        <Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-16 border-b border-gray-200">
            <div>
              <div className="text-xs font-bold text-brand-800 tracking-wide uppercase mb-2.5">
                실시간 데이터 연동
              </div>
              <h3 className="text-[30px] font-black text-gray-900 tracking-[-.7px] leading-tight mb-3.5">
                4개 공공 DB를
                <br />
                자동으로 수집·분석
              </h3>
              <p className="text-[15.5px] text-gray-500 leading-relaxed mb-5">
                NTIS, KIPRIS, DART, RISS를 실시간으로 연동해 기관의 기술 역량, 재무 상태, R&D 이력,
                논문·특허를 자동으로 분석합니다. 수동 입력 불필요.
              </p>
              <ul className="flex flex-col gap-2 list-none">
                {[
                  "특허 DB 47만 건 실시간 스캔",
                  "DART 재무제표 자동 파싱",
                  "NTIS 과제 이력 12년치 분석",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="text-brand-800 font-extrabold mt-px">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-md">
              <div className="flex items-center gap-1.5 px-4 py-3 bg-gray-50 border-b border-gray-200 text-[11.5px] font-bold text-gray-700">
                <span>📡 데이터 연동 현황</span>
                <span className="ml-auto text-[9px] px-1.5 py-0.5 rounded-full bg-brand-50 text-brand-800 border border-brand-200">
                  실시간
                </span>
              </div>
              <div className="p-4 flex flex-col gap-2">
                <ConnectRow label="NTIS" count="과제 12만건" color="#10b981" />
                <ConnectRow label="KIPRIS" count="특허 47만건" color="#10b981" />
                <ConnectRow label="DART" count="공시 8만건" color="#10b981" />
                <ConnectRow label="RISS" count="논문 32만건" color="#10b981" />
              </div>
            </div>
          </div>
        </Reveal>

        {/* ROW 2 (reversed) */}
        <Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-16 border-b border-gray-200">
            <div className="lg:order-2">
              <div className="text-xs font-bold text-brand-800 tracking-wide uppercase mb-2.5">
                AI 매칭 알고리즘
              </div>
              <h3 className="text-[30px] font-black text-gray-900 tracking-[-.7px] leading-tight mb-3.5">
                과거 선정 데이터로
                <br />
                학습한 매칭 엔진
              </h3>
              <p className="text-[15.5px] text-gray-500 leading-relaxed mb-5">
                수천 건의 과거 R&D 선정 과제를 학습한 AI가 현재 컨소시엄의 강점과 약점을 분석하고,
                선정 가능성을 점수로 보여줍니다.
              </p>
              <ul className="flex flex-col gap-2 list-none">
                {[
                  "부처별 심사 기준 반영",
                  "컨소시엄 역할 비율 최적화",
                  "약점 항목 보완 방안 자동 제시",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="text-brand-800 font-extrabold mt-px">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:order-1 bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-md">
              <div className="flex items-center gap-1.5 px-4 py-3 bg-gray-50 border-b border-gray-200 text-[11.5px] font-bold text-gray-700">
                📊 매칭 분석 리포트
              </div>
              <div className="p-4">
                <div className="text-[11px] font-bold text-gray-700 mb-1.5">역할 구성 최적도</div>
                <div className="flex flex-col gap-1.5 mb-3">
                  <MiniBar label="주관 역량" value={91} colorClass="bg-brand-500" numClass="text-brand-800" />
                  <MiniBar label="협업 이력" value={84} colorClass="bg-emerald-500" numClass="text-emerald-500" />
                  <MiniBar label="우대가점 비율" value={62} colorClass="bg-amber-500" numClass="text-amber-600" />
                </div>
                <div className="bg-brand-50 border border-brand-200 rounded-md px-2.5 py-2 text-[10.5px] text-brand-800">
                  💡 우대 기관 1개 추가 시 선정 확률 +13% 예상
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ROW 3 */}
        <Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-16">
            <div>
              <div className="text-xs font-bold text-brand-800 tracking-wide uppercase mb-2.5">
                자동화된 제안서
              </div>
              <h3 className="text-[30px] font-black text-gray-900 tracking-[-.7px] leading-tight mb-3.5">
                데이터 기반
                <br />
                제안서 초안 자동 작성
              </h3>
              <p className="text-[15.5px] text-gray-500 leading-relaxed mb-5">
                수집된 모든 데이터를 기반으로 연구개발계획서 초안을 자동으로 작성합니다. 작성 시간을
                80% 절약하고 완성도를 높입니다.
              </p>
              <ul className="flex flex-col gap-2 list-none">
                {[
                  "기관 역량 챕터 자동 작성",
                  "연구비 배분 자동 계산",
                  "부처 양식에 맞는 포맷 적용",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="text-brand-800 font-extrabold mt-px">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-md">
              <div className="flex items-center gap-1.5 px-4 py-3 bg-gray-50 border-b border-gray-200 text-[11.5px] font-bold text-gray-700">
                <span>📝 제안서 작성 진행률</span>
                <span className="ml-auto text-[9px] px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  AI 작성 중
                </span>
              </div>
              <div className="p-4 flex flex-col gap-2">
                {[
                  { label: "연구개발 목표 및 필요성", status: "완료", pct: 100 },
                  { label: "연구팀 역량 및 기관 소개", status: "완료", pct: 100 },
                  { label: "연구개발 추진 전략", status: "68%", pct: 68 },
                  { label: "연구비 산정 및 배분", status: "대기", pct: 0 },
                ].map((row) => (
                  <div key={row.label}>
                    <div className="flex justify-between text-[10.5px] mb-1">
                      <span>{row.label}</span>
                      <span
                        className={
                          row.pct === 100
                            ? "text-emerald-500 font-bold"
                            : row.pct === 0
                              ? "text-gray-400"
                              : "text-brand-800 font-bold"
                        }
                      >
                        {row.status}
                      </span>
                    </div>
                    <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${row.pct === 100 ? "bg-emerald-500" : "bg-brand-500"}`}
                        style={{ width: `${row.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
