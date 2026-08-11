import type { ReactNode } from "react";

const DEMO_BADGES = ["AI 파트너 검색", "기관 프로필 자동 구축", "컨소시엄 자동 구성", "성공률 분석", "제안서 초안 생성"];

const STATS = [
  { num: "47+", label: "활용 기관" },
  { num: "97%", label: "성사율" },
  { num: "72%", label: "시간 단축" },
  { num: "24h", label: "답변 보장" },
];

export default function InfoSidebar() {
  return (
    <div className="flex flex-col gap-4">
      <Card title="연락처" icon="✉️">
        <div className="flex flex-col gap-2">
          <Item>
            이메일: <b className="font-semibold">contact@clkorea.ai</b>
          </Item>
          <Item>
            전화: <b className="font-semibold">02-000-0000</b>
          </Item>
          <Item>운영시간: 평일 09:00 – 18:00</Item>
        </div>
      </Card>

      <Card title="오시는 길" icon="📍">
        <Item>
          서울특별시 강남구 테헤란로 000
          <br />
          <span className="text-gray-400 text-[12.5px]">지하철 2호선 강남역 3번 출구 도보 5분</span>
        </Item>
      </Card>

      <Card title="데모에서 확인할 수 있는 것" icon="🖥️">
        <div className="flex flex-wrap gap-1.75">
          {DEMO_BADGES.map((b) => (
            <span
              key={b}
              className="inline-flex items-center gap-1.25 px-2.75 py-1.25 bg-white border border-gray-200 rounded-full text-[12.5px] text-gray-600"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-brand shrink-0" />
              {b}
            </span>
          ))}
        </div>
      </Card>

      <Card title="현황" icon="📈">
        <div className="grid grid-cols-2 gap-2.5">
          {STATS.map((s) => (
            <div key={s.label} className="bg-white border border-gray-200 rounded-[10px] p-3.5 text-center">
              <div className="text-[22px] font-black text-brand tracking-[-.5px] mb-0.75">{s.num}</div>
              <div className="text-[11.5px] text-gray-400">{s.label}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function Card({ title, icon, children }: { title: string; icon: string; children: ReactNode }) {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
      <div className="text-[13px] font-bold flex items-center gap-1.75 mb-3.5">
        <span className="w-7 h-7 rounded-lg bg-brand-light flex items-center justify-center shrink-0">{icon}</span>
        {title}
      </div>
      <div className="text-[13.5px] text-gray-600 leading-relaxed">{children}</div>
    </div>
  );
}

function Item({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-start gap-2.25 leading-relaxed">
      <span className="w-1.25 h-1.25 rounded-full bg-brand shrink-0 mt-1.75" />
      <span>{children}</span>
    </div>
  );
}
