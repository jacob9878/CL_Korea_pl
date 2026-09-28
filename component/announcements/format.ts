export function computeDday(end?: string): number | null {
  if (!end) return null;
  const [y, m, d] = end.split("-").map(Number);
  if (!y || !m || !d) return null;
  const endDate = new Date(y, m - 1, d);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  endDate.setHours(0, 0, 0, 0);
  return Math.round((endDate.getTime() - today.getTime()) / 86400000);
}

export function ddCls(d: number) {
  return d < 0 ? "text-gray-400" : d <= 5 ? "text-brand-800" : d <= 15 ? "text-amber-600" : "text-emerald-700";
}

export function ddTxt(d: number) {
  return d < 0 ? `마감 D+${-d}` : d === 0 ? "D-DAY" : `D-${d}`;
}

export function statusBadge(d: number): { cls: string; label: string } {
  if (d < 0) return { cls: "bg-gray-100 text-gray-500 border-gray-200", label: "마감" };
  if (d <= 5) return { cls: "bg-amber-50 text-amber-600 border-amber-200", label: "마감임박" };
  return { cls: "bg-emerald-50 text-emerald-700 border-emerald-200", label: "접수중" };
}

export function localBadge(item: { statusKey: string; status: string }): { cls: string; label: string } {
  if (item.statusKey === "closed") {
    return { cls: "bg-gray-100 text-gray-500 border-gray-200", label: item.status || "마감" };
  }
  if (item.statusKey === "closing") {
    return { cls: "bg-amber-50 text-amber-600 border-amber-200", label: "마감임박" };
  }
  return { cls: "bg-emerald-50 text-emerald-700 border-emerald-200", label: item.status || "접수중" };
}

export function fmtD(s?: string) {
  if (!s) return "-";
  const p = s.split("-");
  return p.length === 3 ? `${p[0]}. ${+p[1]}. ${+p[2]}.` : s;
}
