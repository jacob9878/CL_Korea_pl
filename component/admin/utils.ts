import type { Database } from "@/lib/supabase/database.types";

export type VerificationStatus = Database["public"]["Enums"]["verification_status"];

export function stLabel(s: VerificationStatus): string {
  return { PENDING: "대기", APPROVED: "승인", REJECTED: "반려" }[s] || s;
}
