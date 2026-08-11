"use client";

import { useEffect, useState } from "react";
import { CLKDB, nowStr, type Role, type Verification, type VerificationStatus } from "@/lib/clkdb";
import Nav from "./Nav";
import StatsRow from "./StatsRow";
import Queue from "./Queue";
import AuditLog from "./AuditLog";
import DetailPanel from "./DetailPanel";
import DocPreviewModal from "./DocPreviewModal";
import Toast from "./Toast";

type KindFilter = "all" | "company" | "academic";
type StatusFilter = VerificationStatus | "all";

export default function AdminConsole() {
  const [db, setDb] = useState<ReturnType<typeof CLKDB.get> | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [kindFilter, setKindFilter] = useState<KindFilter>("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("PENDING");
  const [query, setQuery] = useState("");
  const [previewFile, setPreviewFile] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    setDb(CLKDB.get());
  }, []);

  function refresh() {
    setDb(CLKDB.get());
  }

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast((cur) => (cur === msg ? null : cur)), 2400);
  }

  function handleApprove(id: string, role: Role) {
    CLKDB.resolve(id, "APPROVED", { role, reviewer: "이운영(admin)", at: nowStr() });
    refresh();
    showToast(`✅ 승인 완료 → ${role} 역할이 부여되었습니다.`);
  }

  function handleReject(id: string, reason: string) {
    if (!reason.trim()) {
      showToast("반려 사유를 입력하세요.");
      return;
    }
    CLKDB.resolve(id, "REJECTED", { reason, reviewer: "이운영(admin)", at: nowStr() });
    refresh();
    showToast("❌ 반려 처리되었습니다.");
  }

  function handleReset() {
    if (!confirm("데모 데이터를 초기 상태로 되돌릴까요? (승인/반려 내역이 모두 사라집니다)")) return;
    CLKDB.reset();
    setSelectedId(null);
    refresh();
    showToast("데모 데이터를 초기화했습니다.");
  }

  if (!db) return null;

  const selected = db.verifications.find((v: Verification) => v.id === selectedId) || null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Nav onReset={handleReset} />
      <div className="max-w-[1200px] mx-auto px-6 pt-6 pb-15">
        <h1 className="text-[21px] font-black tracking-[-.5px] mb-1">기관 인증 검증</h1>
        <p className="text-[13.5px] text-gray-500 mb-5">
          제출된 기업·기관 인증 요청을 검토하고, 승인 시 역할(담당자/관리자)을 부여합니다.
        </p>

        <StatsRow verifications={db.verifications} />

        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-4.5 items-start">
          <div>
            <Queue
              verifications={db.verifications}
              selectedId={selectedId}
              onSelect={setSelectedId}
              kindFilter={kindFilter}
              onKindFilter={setKindFilter}
              statusFilter={statusFilter}
              onStatusFilter={setStatusFilter}
              query={query}
              onQuery={setQuery}
            />
            <AuditLog audit={db.audit} />
          </div>

          <DetailPanel
            verification={selected}
            onApprove={handleApprove}
            onReject={handleReject}
            onPreviewDoc={setPreviewFile}
          />
        </div>
      </div>

      <DocPreviewModal file={previewFile} onClose={() => setPreviewFile(null)} />
      <Toast message={toast} />
    </div>
  );
}
