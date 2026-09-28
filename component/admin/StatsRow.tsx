import type { Verification } from "@/lib/clkdb";

export default function StatsRow({ verifications }: { verifications: Verification[] }) {
  const pending = verifications.filter((v) => v.status === "PENDING").length;
  const approved = verifications.filter((v) => v.status === "APPROVED").length;
  const rejected = verifications.filter((v) => v.status === "REJECTED").length;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5.5">
      <div className="bg-white border border-gray-200 rounded-xl px-4.5 py-4">
        <div className="text-2xl font-black tracking-[-1px]">{verifications.length}</div>
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
        <div className="text-2xl font-black tracking-[-1px] text-brand">{rejected}</div>
        <div className="text-xs text-gray-500 mt-0.75 font-semibold">반려</div>
      </div>
    </div>
  );
}
