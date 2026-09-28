import Reveal from "@/component/landing/Reveal";

const TIMELINE = [
  {
    year: "2024",
    badge: "2024.03",
    title: "법인 설립",
    desc: "CL Korea 주식회사 설립. AI 기반 R&D 매칭 플랫폼 개발 시작.",
  },
  {
    year: "2024",
    badge: "2024.09",
    title: "베타 서비스 오픈",
    desc: "초기 파트너 기관 20개와 함께 베타 테스트 진행.",
  },
  {
    year: "2025",
    badge: "2025.01",
    title: "파트너 기관 47개 돌파",
    desc: "도입 기관 매칭 성공 사례 다수, 총 R&D 수주액 312억 달성.",
  },
  {
    year: "2026",
    badge: "2026 예정",
    title: "정식 서비스 출시",
    highlight: true,
    desc: "기관 프로필 자동화, 정식 AI 제안서 자동 생성 기능 추가 예정.",
  },
];

export default function Timeline() {
  return (
    <section className="py-22 px-10">
      <div className="max-w-[1040px] mx-auto">
        <Reveal>
          <div className="text-[12.5px] font-bold text-brand uppercase tracking-wide mb-3.5">History</div>
          <h2 className="text-[32px] font-black tracking-[-1px] mb-3">연혁</h2>
          <p className="text-base text-gray-500 leading-relaxed mb-14 max-w-[560px]">
            CL Korea의 성장 여정입니다.
          </p>
        </Reveal>
        <div className="relative max-w-[640px] mx-auto">
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200" />
          {TIMELINE.map((t) => (
            <Reveal key={t.badge}>
              <div className="flex gap-7 mb-9 relative">
                <div
                  className={`w-12.5 h-12.5 rounded-full bg-white border-2 flex items-center justify-center text-[11px] font-bold shrink-0 z-1 ${
                    t.highlight ? "border-brand text-brand" : "border-gray-200 text-gray-500"
                  }`}
                >
                  {t.year}
                </div>
                <div className="pt-3">
                  <div className="inline-block text-[11px] font-bold text-brand bg-brand-light rounded-full px-2.5 py-0.5 mb-1.5">
                    {t.badge}
                  </div>
                  <h3 className="text-[15px] font-bold mb-1">{t.title}</h3>
                  <p className="text-[13.5px] text-gray-500">{t.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
