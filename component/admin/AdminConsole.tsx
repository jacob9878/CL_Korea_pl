"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { AuditLogRow, ExpertApplicationRow } from "./types";
import type { VerificationStatus } from "./utils";
import Nav from "./Nav";
import StatsRow from "./StatsRow";
import Queue from "./Queue";
import AuditLog from "./AuditLog";
import DetailPanel from "./DetailPanel";
import Toast from "./Toast";

type StatusFilter = VerificationStatus | "all";
type GateState = "checking" | "signed-out" | "forbidden" | "ok";

export default function AdminConsole() {
  const [gate, setGate] = useState<GateState>("checking");
  const [adminName, setAdminName] = useState("");
  const [applications, setApplications] = useState<ExpertApplicationRow[]>([]);
  const [audit, setAudit] = useState<AuditLogRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("PENDING");
  const [query, setQuery] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast((cur) => (cur === msg ? null : cur)), 2400);
  }

  const load = useCallback(async () => {
    setLoading(true);
    const supabase = createClient();

    const [{ data: apps, error: appsError }, { data: auditRows, error: auditError }] = await Promise.all([
      supabase
        .from("expert_applications")
        .select("*, expert_application_taxonomy_picks(key, leaf, trail), reviewer:profiles!expert_applications_reviewed_by_fkey(name)")
        .order("requested_at", { ascending: false }),
      supabase
        .from("audit_log")
        .select("*, expert_applications(org_name), actor_profile:profiles!audit_log_actor_fkey(name)")
        .order("created_at", { ascending: false })
        .limit(30),
    ]);

    if (appsError) showToast(`목록을 불러오지 못했습니다: ${appsError.message}`);
    if (auditError) showToast(`감사 로그를 불러오지 못했습니다: ${auditError.message}`);

    setApplications((apps as ExpertApplicationRow[] | null) ?? []);
    setAudit((auditRows as AuditLogRow[] | null) ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) {
        setGate("signed-out");
        return;
      }
      const { data: profile } = await supabase
        .from("profiles")
        .select("name, role")
        .eq("id", data.user.id)
        .single();
      if (profile?.role !== "ADMIN") {
        setGate("forbidden");
        return;
      }
      setAdminName(profile.name);
      setGate("ok");
      load();
    });
  }, [load]);

  async function handleApprove(id: number) {
    const supabase = createClient();
    const { error } = await supabase.rpc("resolve_expert_application", {
      p_application_id: id,
      p_status: "APPROVED",
    });
    if (error) return showToast(`승인 처리 중 오류: ${error.message}`);
    showToast("✅ 승인 완료 → EXPERT 역할이 부여되었습니다.");
    load();
  }

  async function handleReject(id: number, reason: string) {
    if (!reason.trim()) {
      showToast("반려 사유를 입력하세요.");
      return;
    }
    const supabase = createClient();
    const { error } = await supabase.rpc("resolve_expert_application", {
      p_application_id: id,
      p_status: "REJECTED",
      p_reason: reason,
    });
    if (error) return showToast(`반려 처리 중 오류: ${error.message}`);
    showToast("❌ 반려 처리되었습니다.");
    load();
  }

  if (gate === "checking") return null;

  if (gate === "signed-out" || gate === "forbidden") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6 text-center">
        <div>
          <div className="text-2xl font-black mb-2.5">
            {gate === "signed-out" ? "로그인이 필요합니다" : "접근 권한이 없습니다"}
          </div>
          <p className="text-gray-500 mb-6">
            {gate === "signed-out"
              ? "운영자 콘솔은 관리자 계정으로 로그인해야 볼 수 있어요."
              : "이 계정은 관리자 권한이 없어요."}
          </p>
          {gate === "signed-out" && (
            <a
              href={`/login?next=${encodeURIComponent("/admin")}`}
              className="inline-block px-6 py-3 rounded-[10px] font-bold text-white bg-brand-600 hover:bg-brand-700"
            >
              로그인하기 →
            </a>
          )}
        </div>
      </div>
    );
  }

  const selected = applications.find((a) => a.id === selectedId) || null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Nav adminName={adminName} />
      <div className="max-w-[1200px] mx-auto px-6 pt-6 pb-15">
        <h1 className="text-[21px] font-black tracking-[-.5px] mb-1">전문가 신청 검토</h1>
        <p className="text-[13.5px] text-gray-500 mb-5">
          제출된 전문가(평가·자문위원) 등록 신청을 검토하고, 승인 시 EXPERT 역할을 부여합니다.
        </p>

        {loading ? (
          <div className="py-20 text-center text-gray-400 text-[13.5px]">불러오는 중...</div>
        ) : (
          <>
            <StatsRow applications={applications} />

            <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-4.5 items-start">
              <div>
                <Queue
                  applications={applications}
                  selectedId={selectedId}
                  onSelect={setSelectedId}
                  statusFilter={statusFilter}
                  onStatusFilter={setStatusFilter}
                  query={query}
                  onQuery={setQuery}
                />
                <AuditLog audit={audit} />
              </div>

              <DetailPanel application={selected} onApprove={handleApprove} onReject={handleReject} />
            </div>
          </>
        )}
      </div>

      <Toast message={toast} />
    </div>
  );
}
