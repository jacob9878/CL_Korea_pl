import Reveal from "./Reveal";

const DEPT_PIPELINE = [
  { label: "산업통상자원부", value: 75, count: "3건", color: "#e8341a" },
  { label: "과학기술정보통신부", value: 50, count: "2건", color: "#1d4ed8" },
  { label: "중소벤처기업부", value: 50, count: "2건", color: "#059669" },
  { label: "환경부", value: 25, count: "1건", color: "#7c3aed" },
];

export default function Leadership() {
  return (
    <section className="py-24 px-10 bg-gray-50">
      <div className="max-w-[1160px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <Reveal>
          <div className="text-[12.5px] font-bold text-brand uppercase tracking-wide mb-3">
            기관 대표·연구실장용
          </div>
          <h2 className="text-[36px] font-black leading-[1.15] tracking-[-1px] text-gray-900 mb-5">
            R&D 파이프라인을
            <br />
            한눈에 관리하세요
          </h2>
          <p className="text-base text-gray-500 leading-relaxed mb-7 max-w-[460px]">
            진행 중인 컨소시엄, 선정 이력, 성공률 트렌드를 대시보드 하나로 파악합니다. 의사결정에
            필요한 모든 정보가 즉시 제공됩니다.
          </p>
          <ul className="flex flex-col gap-2 list-none">
            {[
              "부처별 과제 진행 상황 실시간 추적",
              "기관별 R&D 기여도 분석",
              "성공·실패 과제 패턴 학습 리포트",
              "팀원별 업무 현황 및 마감일 관리",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                <span className="text-brand font-extrabold mt-px">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal>
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-md">
            <div className="flex items-center justify-between px-4.5 py-3.5 border-b border-gray-200 bg-gray-50 text-xs font-bold text-gray-700">
              <span>📊 R&D 파이프라인 대시보드</span>
              <span className="text-[10px] text-gray-400">실시간 업데이트</span>
            </div>
            <div className="p-4.5">
              <div className="grid grid-cols-3 gap-2.5 mb-4">
                {[
                  { num: "7", label: "진행 중 과제" },
                  { num: "3", label: "선정 준비 중" },
                  { num: "89%", label: "평균 성공률" },
                ].map((kpi) => (
                  <div
                    key={kpi.label}
                    className="bg-gray-50 border border-gray-200 rounded-lg py-3 px-2.5 text-center"
                  >
                    <div className="text-lg font-black text-brand mb-0.5">{kpi.num}</div>
                    <div className="text-[9.5px] text-gray-400">{kpi.label}</div>
                  </div>
                ))}
              </div>
              <div className="text-[11px] font-bold text-gray-700 mb-2">부처별 과제 현황</div>
              <div className="flex flex-col gap-1.5">
                {DEPT_PIPELINE.map((dept) => (
                  <div key={dept.label} className="flex items-center gap-2.5 text-[10.5px] text-gray-600">
                    <div className="min-w-[90px] font-semibold">{dept.label}</div>
                    <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${dept.value}%`, background: dept.color }}
                      />
                    </div>
                    <div className="min-w-7 text-right font-bold text-gray-900">{dept.count}</div>
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
