import Reveal from "./Reveal";

const CARDS = [
  {
    icon: "🔍",
    title: "맞춤형 공고 탐색",
    desc: "기관의 기술 역량과 연구 이력을 분석해 최적의 공고를 자동 추천합니다. 매일 새로운 부처 공고를 스캔합니다.",
    ui: (
      <div className="flex flex-col gap-1.5">
        {[
          { label: "소재부품 공정혁신 R&D", score: "97%" },
          { label: "나노기술 응용연구 과제", score: "91%" },
          { label: "반도체 소재 국산화 과제", score: "87%" },
        ].map((row) => (
          <div
            key={row.label}
            className="flex items-center justify-between text-[10px] text-gray-700 px-2 py-1.5 bg-white rounded-md border border-gray-200"
          >
            <span>{row.label}</span>
            <span className="font-bold text-brand">{row.score}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    icon: "🤝",
    title: "AI 파트너 매칭",
    desc: "NTIS·KIPRIS 데이터로 최적 파트너를 추천합니다. 기술 역량, 재무 건전성, R&D 이력을 종합 평가합니다.",
    ui: (
      <div className="flex flex-wrap gap-1.5">
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-brand-light text-brand border border-[#fbd5ce]">
          소재기업 ✓
        </span>
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
          재무 안정 ✓
        </span>
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
          과제 12건 ✓
        </span>
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
          우대가점 비율
        </span>
      </div>
    ),
  },
  {
    icon: "📊",
    title: "기관 역량 자동 분석",
    desc: "4개 공공 DB를 자동 수집·분석해 기관 프로필을 구축합니다. 수동 입력 없이 신뢰도 높은 데이터를 확보합니다.",
    ui: (
      <div className="flex flex-col gap-1.5">
        {[
          { label: "특허 역량", value: 82, color: "bg-brand", num: "text-brand" },
          { label: "R&D 이력", value: 91, color: "bg-emerald-500", num: "text-emerald-500" },
          { label: "재무 건전성", value: 76, color: "bg-brand", num: "text-brand" },
        ].map((bar) => (
          <div key={bar.label} className="flex items-center gap-2">
            <span className="text-[9.5px] text-gray-500 min-w-16">{bar.label}</span>
            <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div className={`h-full rounded-full ${bar.color}`} style={{ width: `${bar.value}%` }} />
            </div>
            <span className={`text-[9.5px] font-bold ${bar.num}`}>{bar.value}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    icon: "🏗️",
    title: "컨소시엄 자동 구성",
    desc: "주관·공동·위탁 역할을 AI가 최적 배분합니다. 부처 심사 기준에 맞는 구성을 자동으로 제안합니다.",
    ui: (
      <div className="flex flex-col gap-1.5">
        {[
          { role: "주관기관", status: "✓ 확정", ok: true },
          { role: "공동기관", status: "✓ 확정", ok: true },
          { role: "위탁기관", status: "확정 중", ok: false },
        ].map((row) => (
          <div
            key={row.role}
            className={`flex items-center justify-between text-[10px] px-2 py-1 rounded-md border ${
              row.ok
                ? "bg-emerald-50 border-emerald-200"
                : "bg-amber-50 border-amber-200"
            }`}
          >
            <span className="font-bold">{row.role}</span>
            <span className={`font-bold ${row.ok ? "text-emerald-700" : "text-amber-600"}`}>
              {row.status}
            </span>
          </div>
        ))}
      </div>
    ),
  },
  {
    icon: "📈",
    title: "성공률 예측 분석",
    desc: "과거 선정 과제 데이터를 학습해 현재 컨소시엄의 선정 가능성을 정량화하고 보완 방안을 제안합니다.",
    ui: (
      <div>
        <div className="flex items-baseline gap-1.5 mb-1.5">
          <span className="text-[22px] font-black text-brand">78점</span>
          <span className="text-[10px] text-emerald-500 font-bold">→ 91점 예측</span>
        </div>
        <div className="bg-gray-200 rounded-full h-1.25 overflow-hidden">
          <div className="w-[78%] h-full bg-brand rounded-full" />
        </div>
      </div>
    ),
  },
  {
    icon: "📝",
    title: "제안서 초안 작성",
    desc: "수집된 기관 데이터와 과제 정보를 바탕으로 제안서 초안을 자동 작성합니다. 작성 시간 80% 단축.",
    ui: (
      <div className="flex flex-col gap-1">
        <div className="text-[10px] text-gray-500">연구개발계획서 초안</div>
        <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
          <div className="w-[68%] h-full bg-brand rounded-full" />
        </div>
        <div className="text-[9.5px] text-gray-400">68% 완성 · 나머지 항목 AI 작성 중</div>
      </div>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="py-24 px-10 bg-white">
      <div className="max-w-[1160px] mx-auto">
        <Reveal>
          <div className="text-[12.5px] font-bold text-brand uppercase tracking-wide mb-3">
            핵심 기능
          </div>
          <h2 className="text-[40px] font-black leading-[1.15] tracking-[-1px] text-gray-900 mb-4">
            AI가 처리하는 R&D 매칭의
            <br />6가지 핵심 단계
          </h2>
          <p className="text-[17px] text-gray-500 leading-relaxed max-w-[560px]">
            공고 발굴부터 컨소시엄 완성까지, 기존 4주 걸리던 작업을 3일로 단축합니다.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {CARDS.map((card) => (
            <Reveal key={card.title}>
              <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden transition-all hover:shadow-lg hover:-translate-y-0.5 h-full">
                <div className="p-5 pb-0">
                  <div className="w-9 h-9 rounded-[10px] bg-brand-light flex items-center justify-center text-lg mb-3.5">
                    {card.icon}
                  </div>
                  <div className="text-[15px] font-extrabold text-gray-900 mb-1.5">{card.title}</div>
                  <div className="text-[13px] text-gray-500 leading-relaxed mb-4">{card.desc}</div>
                </div>
                <div className="bg-gray-50 border-t border-gray-200 px-4 py-3.5 min-h-20">
                  {card.ui}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
