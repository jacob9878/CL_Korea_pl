import { Fragment } from "react";

type Cell = "y" | "n" | string;

const GROUPS: { title: string; rows: [string, Cell, Cell, Cell][] }[] = [
  {
    title: "기본",
    rows: [
      ["파트너 검색", "월 3회", "무제한", "무제한"],
      ["기관 프로필 조회", "y", "y", "y"],
      ["공고 알림", "주 1회", "실시간", "실시간"],
      ["NTIS·KIPRIS·DART 연동", "n", "y", "y"],
    ],
  },
  {
    title: "컨소시엄",
    rows: [
      ["컨소시엄 방 생성", "n", "최대 3건", "무제한"],
      ["성공률 분석", "n", "기본", "고급"],
      ["역할 자동 배분", "n", "y", "y"],
    ],
  },
  {
    title: "AI 기능",
    rows: [
      ["AI 제안서 자동 생성", "n", "n", "y"],
      ["매칭 스코어 상세 분석", "n", "y", "y"],
      ["API 연동", "n", "n", "y"],
    ],
  },
  {
    title: "지원",
    rows: [
      ["이메일 지원", "n", "y", "y"],
      ["전담 매니저", "n", "n", "y"],
      ["온보딩 교육", "n", "n", "y"],
    ],
  },
];

function CellValue({ v }: { v: Cell }) {
  if (v === "y") return <span className="text-brand text-base font-extrabold">✓</span>;
  if (v === "n") return <span className="text-gray-300 text-base">–</span>;
  return <span>{v}</span>;
}

export default function CompareTable() {
  return (
    <div className="py-20 px-10 bg-gray-50">
      <div className="max-w-[1100px] mx-auto pt-2">
        <h2 className="text-[32px] font-black tracking-[-.8px] text-center mb-10">플랜 상세 비교</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse bg-white rounded-2xl overflow-hidden border border-gray-200">
            <thead>
              <tr>
                <th className="text-left text-gray-500 font-semibold text-[13px] px-5 py-4.5 border-b border-gray-200">기능</th>
                <th className="text-center text-gray-700 text-[13px] font-bold px-5 py-4.5 border-b border-gray-200">무료</th>
                <th className="text-center text-brand text-[13px] font-bold px-5 py-4.5 border-b border-gray-200">스탠다드</th>
                <th className="text-center text-gray-700 text-[13px] font-bold px-5 py-4.5 border-b border-gray-200">프로</th>
              </tr>
            </thead>
            <tbody>
              {GROUPS.map((g) => (
                <Fragment key={g.title}>
                  <tr className="bg-gray-50">
                    <td colSpan={4} className="px-5 py-2.5 text-[11px] font-bold text-gray-400 uppercase tracking-wide">
                      {g.title}
                    </td>
                  </tr>
                  {g.rows.map((row) => (
                    <tr key={row[0]} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-3.5 text-[13.5px] font-medium text-gray-700">{row[0]}</td>
                      <td className="px-5 py-3.5 text-center text-[13.5px] text-gray-600">
                        <CellValue v={row[1]} />
                      </td>
                      <td className="px-5 py-3.5 text-center text-[13.5px] text-gray-600">
                        <CellValue v={row[2]} />
                      </td>
                      <td className="px-5 py-3.5 text-center text-[13.5px] text-gray-600">
                        <CellValue v={row[3]} />
                      </td>
                    </tr>
                  ))}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
