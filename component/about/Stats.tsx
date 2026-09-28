import Reveal from "@/component/landing/Reveal";

const STATS = [
  { num: "47개+", label: "등록 파트너 기관" },
  { num: "97%", label: "매칭 만족도" },
  { num: "312억+", label: "파트너 기관 총 R&D 수주" },
  { num: "3일", label: "평균 파트너 매칭 시간" },
];

export default function Stats() {
  return (
    <section className="py-22 px-10 bg-[#1a1a2e]">
      <div className="max-w-[1040px] mx-auto">
        <Reveal>
          <div className="text-[12.5px] font-bold text-white/50 uppercase tracking-wide mb-3.5">Numbers</div>
          <h2 className="text-[32px] font-black tracking-[-1px] text-white mb-3">숫자로 보는 CL Korea</h2>
          <p className="text-base text-white/55 leading-relaxed mb-14 max-w-[560px]">
            플랫폼 운영 이후 축적된 실제 데이터입니다.
          </p>
        </Reveal>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map((s) => (
            <Reveal key={s.label}>
              <div className="bg-white/6 border border-white/10 rounded-2xl py-8 px-6 text-center h-full">
                <div className="text-[36px] font-black text-brand-800 tracking-[-1px] mb-1.5">{s.num}</div>
                <div className="text-[13px] text-white/60">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
