import Reveal from "./Reveal";

const STATS = [
  {
    num: "4주→3일",
    label: "컨소시엄 구성 시간 단축",
    desc: "기존 작업 대비 최대 72% 시간을 절약합니다. 파트너 협상부터 역할 배분까지 AI가 자동으로 처리합니다.",
  },
  {
    num: "97%",
    label: "AI 파트너 추천 성사율",
    desc: "CL Korea가 추천한 파트너 중 97%가 실제 컨소시엄에서 성사되었습니다. 정밀도 높은 매칭 알고리즘의 결과입니다.",
  },
  {
    num: "312억+",
    label: "파트너 기관 총 R&D 수주",
    desc: "CL Korea를 통해 매칭된 파트너 기관들이 수주한 R&D 과제 총액입니다.",
  },
];

export default function CaseStudy() {
  return (
    <div className="bg-[#0a0a0a] py-24 px-10">
      <div className="max-w-[1160px] mx-auto">
        <Reveal>
          <div className="text-xs font-bold text-brand uppercase tracking-wide mb-3">성과 지표</div>
          <h2 className="text-[40px] font-black text-white leading-[1.15] tracking-[-1px] max-w-[700px] mb-5">
            도입 기관의 실제 성과 데이터
          </h2>
          <p className="text-base text-gray-400 leading-relaxed max-w-[560px] mb-14">
            CL Korea를 도입한 연구기관·기업의 평균 성과입니다. 베타 운영 데이터 기준.
          </p>
        </Reveal>
        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[2px] border border-gray-800 rounded-2xl overflow-hidden">
            {STATS.map((stat) => (
              <div key={stat.label} className="p-9 bg-gray-900 hover:bg-gray-800 transition-colors">
                <div className="text-[44px] font-black text-brand tracking-[-1.5px] leading-none mb-2.5">
                  {stat.num}
                </div>
                <div className="text-[15px] font-bold text-white mb-1.5">{stat.label}</div>
                <div className="text-[13px] text-gray-500 leading-relaxed">{stat.desc}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  );
}
