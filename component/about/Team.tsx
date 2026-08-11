import Reveal from "@/component/landing/Reveal";

const TEAM = [
  {
    role: "대표이사 / CEO",
    name: "홍길동",
    desc: "정부 R&D 정책 10년+ 경력. 과제 기획 및 컨소시엄 구성 전문가.",
  },
  {
    role: "CTO",
    name: "기술 리드",
    desc: "AI/ML 기반 매칭 알고리즘 개발. 자연어 처리 및 추천 시스템 전문.",
  },
  {
    role: "사업개발본부장",
    name: "사업 개발",
    desc: "기관 파트너십 및 플랫폼 성장 전략 담당. 공공·민간 협력 네트워크 보유.",
  },
];

export default function Team() {
  return (
    <section className="py-22 px-10 bg-gray-50">
      <div className="max-w-[1040px] mx-auto">
        <Reveal>
          <div className="text-[12.5px] font-bold text-brand uppercase tracking-wide mb-3.5">Team</div>
          <h2 className="text-[32px] font-black tracking-[-1px] mb-3">팀 소개</h2>
          <p className="text-base text-gray-500 leading-relaxed mb-14 max-w-[560px]">
            R&D 정책, AI 기술, 사업 개발 전문가들이 함께합니다.
          </p>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {TEAM.map((m) => (
            <Reveal key={m.role}>
              <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden text-center h-full">
                <div className="h-[180px] bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-5xl">
                  👤
                </div>
                <div className="px-5 py-6">
                  <h3 className="text-base font-extrabold mb-1">{m.name}</h3>
                  <div className="text-[12.5px] font-bold text-brand mb-2.5">{m.role}</div>
                  <p className="text-[13px] text-gray-500 leading-relaxed">{m.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
