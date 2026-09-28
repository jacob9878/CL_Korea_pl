const PERKS = [
  { icon: "🎯", title: "맞춤 공고 정렬", desc: "관심 키워드 · 부처 · 마감일 기준으로 나에게 맞는 공고만 상단에." },
  { icon: "✉️", title: "정기 R&D 레터", desc: "매주 놓치면 아쉬운 신규 공고와 마감 임박 과제를 이메일로." },
  { icon: "🤝", title: "컨소시엄 우선 제안", desc: "Phase II 오픈 시 매칭 후보로 우선 추천." },
];

export default function PerksSidebar() {
  return (
    <aside className="bg-white border border-gray-200 rounded-2xl shadow-[0_1px_3px_rgba(20,23,38,.06),0_8px_24px_rgba(20,23,38,.05)]">
      <div className="p-6">
        <h2 className="text-lg font-bold tracking-tight">가입하면 이런 게 좋아요</h2>
        <div className="text-gray-500 text-sm mb-5">Phase I 무료 제공</div>
        {PERKS.map((p) => (
          <div key={p.title} className="flex gap-3 mb-4.5 last:mb-0">
            <div className="w-9.5 h-9.5 rounded-[10px] bg-brand-100 text-brand-700 flex items-center justify-center shrink-0">
              {p.icon}
            </div>
            <div>
              <b className="text-sm">{p.title}</b>
              <p className="text-[13px] text-gray-500 mt-0.5">{p.desc}</p>
            </div>
          </div>
        ))}
        <div className="h-px bg-gray-200 my-5" />
        <Stat label="등록 기업" value="2,480+" />
        <Stat label="연동 공고 부처" value="18개" />
        <Stat label="주간 신규 공고" value="평균 60건" />
      </div>
    </aside>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-[13.5px] py-1.5">
      <span>{label}</span>
      <b className="font-bold">{value}</b>
    </div>
  );
}
