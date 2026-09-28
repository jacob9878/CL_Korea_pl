import type { VerificationKind, VerificationStatus } from "@/lib/clkdb";

const ACADEMIC: VerificationKind[] = ["university", "research"];

export function kindGroup(k: VerificationKind): "academic" | "company" {
  return ACADEMIC.includes(k) ? "academic" : "company";
}

export function kindLabel(k: VerificationKind): string {
  return { company: "기업", university: "대학", research: "연구소" }[k] || "기관";
}

export function stLabel(s: VerificationStatus): string {
  return { PENDING: "대기", APPROVED: "승인", REJECTED: "반려" }[s] || s;
}
