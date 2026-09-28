import Reveal from "./Reveal";

const TESTIMONIALS = [
  {
    text: "파트너를 찾는데 늘 2~3주 걸렸는데, CL Korea 도입 후 3일 만에 완성했습니다. AI 추천의 정확도가 놀라웠습니다.",
    name: "김지훈 연구실장",
    role: "한국재료연구원 · 소재부품연구본부",
    color: "#006cc3",
    initial: "김",
  },
  {
    text: "DART, NTIS를 일일이 뒤지던 시간이 없어졌어요. 기관 역량 분석이 자동으로 되니까 제안서 품질도 확실히 좋아졌습니다.",
    name: "박인성 기술전략팀장",
    role: "나노테크솔루션㈜ · 기술전략팀",
    color: "#00437c",
    initial: "박",
  },
  {
    text: "성공률 분석 기능이 특히 좋았습니다. 어느 부분을 보완해야 선정 가능성이 높아지는지 구체적으로 점수로 나와서 전략적 접근이 가능해졌어요.",
    name: "이수민 R&D기획팀장",
    role: "포항공과대학교 · 산학협력단",
    color: "#001b37",
    initial: "이",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 px-10 bg-white">
      <div className="max-w-[1160px] mx-auto">
        <Reveal className="text-center">
          <div className="text-[12.5px] font-bold text-brand-800 uppercase tracking-wide mb-3">
            고객 후기
          </div>
          <h2 className="text-[40px] font-black leading-[1.15] tracking-[-1px] text-gray-900">
            도입 기관의 목소리
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t) => (
            <Reveal key={t.name}>
              <div className="bg-white border border-gray-200 rounded-2xl p-7 h-full transition-all hover:shadow-lg hover:-translate-y-0.5">
                <div className="text-amber-400 text-sm mb-3.5">★★★★★</div>
                <p className="text-[14.5px] text-gray-700 leading-relaxed mb-5">{t.text}</p>
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-extrabold text-white shrink-0"
                    style={{ background: t.color }}
                  >
                    {t.initial}
                  </div>
                  <div>
                    <div className="text-[13.5px] font-bold text-gray-900">{t.name}</div>
                    <div className="text-xs text-gray-400">{t.role}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
