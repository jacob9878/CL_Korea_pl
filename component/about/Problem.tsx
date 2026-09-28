import Reveal from "@/component/landing/Reveal";

const CARDS = [
  {
    icon: "⏳",
    title: "긴 준비 시간",
    desc: "적합한 파트너 기관을 찾고 컨소시엄을 구성하는 데 평균 3~6개월이 소요됩니다.",
  },
  {
    icon: "🌐",
    title: "정보 비대칭",
    desc: "기관의 역량, 실적, 분야 정보가 분산되어 있어 적합한 파트너를 찾기 어렵습니다.",
  },
  {
    icon: "📉",
    title: "낮은 성공률",
    desc: "파트너 미스매치로 인한 컨소시엄 구성 실패가 과제 탈락의 주요 원인 중 하나입니다.",
  },
];

export default function Problem() {
  return (
    <section className="py-22 px-10 bg-gray-50">
      <div className="max-w-[1040px] mx-auto">
        <Reveal>
          <div className="text-[12.5px] font-bold text-brand-800 uppercase tracking-wide mb-3.5">Problem</div>
          <h2 className="text-[32px] font-black tracking-[-1px] mb-3">우리가 해결하는 문제</h2>
          <p className="text-base text-gray-500 leading-relaxed mb-14 max-w-[560px]">
            정부 R&D 컨소시엄 구성은 여전히 사람이 직접 발로 뛰는 방식에 의존합니다.
          </p>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {CARDS.map((c) => (
            <Reveal key={c.title}>
              <div className="bg-white border border-gray-200 rounded-2xl p-7 h-full">
                <div className="text-[28px] mb-3.5">{c.icon}</div>
                <h3 className="text-[15px] font-bold mb-2">{c.title}</h3>
                <p className="text-[13.5px] text-gray-500 leading-relaxed">{c.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="text-center text-[15px] font-bold text-brand-800 pt-2">
            → CL Korea는 이 문제를 AI로 해결합니다
          </div>
        </Reveal>
      </div>
    </section>
  );
}
