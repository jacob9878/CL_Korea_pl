import type { AuditLogRow } from "./types";

export default function AuditLog({ audit }: { audit: AuditLogRow[] }) {
  return (
    <div className="bg-white border border-gray-200 rounded-[14px] overflow-hidden mt-4.5">
      <div className="px-4.5 py-3.75 border-b border-gray-200 text-sm font-extrabold flex items-center justify-between">
        감사 로그 <span className="text-[11.5px] font-bold text-gray-400">최근 검토 이력</span>
      </div>
      <div className="max-h-[230px] overflow-y-auto">
        {audit.length === 0 ? (
          <div className="py-9 px-5 text-center text-gray-400 text-[13px]">검토 이력이 없습니다.</div>
        ) : (
          audit.map((entry) => (
            <div
              key={entry.id}
              className="flex gap-2.5 px-4 py-2.75 border-b border-gray-100 last:border-0 text-xs items-start"
            >
              <span
                className={`text-[10px] font-extrabold px-1.75 py-0.5 rounded-md shrink-0 ${
                  entry.action === "APPROVE" ? "bg-emerald-50 text-emerald-600" : "bg-[#fef2f0] text-red-800"
                }`}
              >
                {entry.action === "APPROVE" ? "승인" : "반려"}
              </span>
              <div className="flex-1 min-w-0">
                <div className="font-bold">
                  EA-{entry.application_id} · {entry.expert_applications?.org_name ?? "-"}
                </div>
                {entry.note && <div className="text-gray-500 text-[11.5px]">{entry.note}</div>}
                <div className="text-gray-400 text-[10.5px] mt-0.5">
                  {entry.actor_profile?.name ?? "관리자"}
                </div>
              </div>
              <span className="text-gray-400 text-[11px] whitespace-nowrap">
                {new Date(entry.created_at).toLocaleString("ko-KR")}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
