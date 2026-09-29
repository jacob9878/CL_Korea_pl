import type { ExpertApplicationRow } from "./types";

export default function StatsRow({ applications }: { applications: ExpertApplicationRow[] }) {
  const pending = applications.filter((a) => a.status === "PENDING").length;
  const approved = applications.filter((a) => a.status === "APPROVED").length;
  const rejected = applications.filter((a) => a.status === "REJECTED").length;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5.5">
      <div className="bg-white border border-gray-200 rounded-xl px-4.5 py-4">
        <div className="text-2xl font-black tracking-[-1px]">{applications.length}</div>
        <div className="text-xs text-gray-500 mt-0.75 font-semibold">전체 요청</div>
      </div>
      <div className="bg-white border border-gray-200 rounded-xl px-4.5 py-4">
        <div className="text-2xl font-black tracking-[-1px] text-amber-600">{pending}</div>
        <div className="text-xs text-gray-500 mt-0.75 font-semibold">검토 대기</div>
      </div>
      <div className="bg-white border border-gray-200 rounded-xl px-4.5 py-4">
        <div className="text-2xl font-black tracking-[-1px] text-emerald-500">{approved}</div>
        <div className="text-xs text-gray-500 mt-0.75 font-semibold">승인</div>
      </div>
      <div className="bg-white border border-gray-200 rounded-xl px-4.5 py-4">
        <div className="text-2xl font-black tracking-[-1px] text-red-800">{rejected}</div>
        <div className="text-xs text-gray-500 mt-0.75 font-semibold">반려</div>
      </div>
    </div>
  );
}
