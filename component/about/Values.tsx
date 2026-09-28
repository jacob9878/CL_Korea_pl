import Reveal from "@/component/landing/Reveal";

const VALUES = [
  {
    icon: "🎯",
    title: "정확한 매칭",
    desc: "AI가 기관의 역량, 전문 분야, 과거 수주 실적을 종합 분석해 최적의 파트너를 추천합니다.",
  },
  {
    icon: "⚡",
    title: "빠른 속도",
    desc: "기존 3~6개월이 걸리던 컨소시엄 구성을 평균 3일 내 후보 추출로 단축합니다.",
  },
  {
    icon: "🔒",
    title: "신뢰 기반",
    desc: "검증된 기관 DB와 실명 계약 이력을 바탕으로 신뢰할 수 있는 파트너십을 지원합니다.",
  },
];

export default function Values() {
  return (
    <section className="py-22 px-10">
      <div className="max-w-[1040px] mx-auto">
        <Reveal>
          <div className="text-[12.5px] font-bold text-brand uppercase tracking-wide mb-3.5">Core Values</div>
          <h2 className="text-[32px] font-black tracking-[-1px] mb-3">핵심 가치</h2>
          <p className="text-base text-gray-500 leading-relaxed mb-14 max-w-[560px]">
            CL Korea가 추구하는 세 가지 원칙입니다.
          </p>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {VALUES.map((v) => (
            <Reveal key={v.title}>
              <div className="border border-gray-200 rounded-2xl p-8 h-full hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-brand-light flex items-center justify-center text-[22px] mb-4.5">
                  {v.icon}
                </div>
                <h3 className="text-base font-extrabold mb-2.5">{v.title}</h3>
                <p className="text-[13.5px] text-gray-500 leading-relaxed">{v.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
