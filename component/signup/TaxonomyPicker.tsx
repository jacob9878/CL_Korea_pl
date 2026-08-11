"use client";

import { useMemo, useState } from "react";
import { GROUPS } from "./taxonomy";

export type TaxonomyPick = { key: string; leaf: string; trail: string };

type Row = [string, string, string, string | null];

function flatRows(group: string): Row[] {
  const g = GROUPS[group];
  const rows: Row[] = [];
  for (const dae in g) {
    for (const jung in g[dae]) {
      for (const so in g[dae][jung]) {
        const ses = g[dae][jung][so];
        if (ses && ses.length) {
          ses.forEach((se) => rows.push([dae, jung, so, se]));
        } else {
          rows.push([dae, jung, so, null]);
        }
      }
    }
  }
  return rows;
}

function flatAll(keyword: string): Row[] {
  const rows: Row[] = [];
  for (const group in GROUPS) {
    rows.push(...flatRows(group));
  }
  const kw = keyword.trim();
  if (!kw) return rows;
  return rows.filter((r) => r.join(" ").indexOf(kw) >= 0);
}

function keyOf(r: Row) {
  return r[3] ? r.join(" > ") : r.slice(0, 3).join(" > ");
}

function spanCount(rows: Row[], idx: number, col: number) {
  const key = rows[idx].slice(0, col + 1).join("|");
  let n = 1;
  for (let i = idx + 1; i < rows.length; i++) {
    if (rows[i].slice(0, col + 1).join("|") === key) n++;
    else break;
  }
  return n;
}

function isFirst(rows: Row[], idx: number, col: number) {
  if (idx === 0) return true;
  return rows[idx].slice(0, col + 1).join("|") !== rows[idx - 1].slice(0, col + 1).join("|");
}

export default function TaxonomyPicker({
  picks,
  onChange,
  max = 3,
}: {
  picks: TaxonomyPick[];
  onChange: (picks: TaxonomyPick[]) => void;
  max?: number;
}) {
  const groupKeys = useMemo(() => Object.keys(GROUPS), []);
  const [group, setGroup] = useState(groupKeys[0]);
  const [kwInput, setKwInput] = useState("");
  const [appliedKw, setAppliedKw] = useState("");
  const [warn, setWarn] = useState("");

  const rows = useMemo(() => (appliedKw.trim() ? flatAll(appliedKw) : flatRows(group)), [appliedKw, group]);
  const title = appliedKw.trim() ? `"${appliedKw.trim()}" 전체 검색 결과 (${rows.length}건)` : group;

  function isPicked(key: string) {
    return picks.some((p) => p.key === key);
  }

  function toggle(key: string, leaf: string, trail: string) {
    if (isPicked(key)) {
      onChange(picks.filter((p) => p.key !== key));
      return;
    }
    if (picks.length >= max) {
      setWarn(`최대 ${max}개까지만 선택할 수 있습니다.`);
      setTimeout(() => setWarn(""), 2200);
      return;
    }
    onChange([...picks, { key, leaf, trail }]);
  }

  function runSearch() {
    setAppliedKw(kwInput);
  }

  return (
    <div>
      <div className="bg-[#f1f3f7] border border-vline rounded-xl px-4 py-3.5 flex items-center gap-2.5 flex-wrap">
        <span className="text-[17px] text-gray-600">🔍</span>
        <span className="text-[13px] font-bold text-gray-700 whitespace-nowrap before:content-['▪_'] before:text-vaccent">
          키워드
        </span>
        <span className="flex-1 min-w-40">
          <input
            value={kwInput}
            onChange={(e) => setKwInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                runSearch();
              }
            }}
            placeholder="예) 인공지능, 반도체, 이차전지 (전체 분류에서 검색)"
            className="w-full bg-white text-[14.5px] px-3 py-2.5 border border-vline rounded-[10px] outline-none focus:border-vbrand"
          />
        </span>
        <span className="text-[13px] font-bold text-gray-700 whitespace-nowrap before:content-['▪_'] before:text-vaccent">
          조회조건
        </span>
        <select
          value={group}
          onChange={(e) => {
            setGroup(e.target.value);
            setAppliedKw("");
            setKwInput("");
          }}
          className="min-w-32 text-sm px-3 py-2.5 border border-vline rounded-[10px] bg-white"
        >
          {groupKeys.map((g) => (
            <option key={g}>{g}</option>
          ))}
        </select>
        <button
          type="button"
          onClick={runSearch}
          className="bg-[#2b3a55] hover:bg-[#1f2b40] text-white rounded-lg font-bold text-sm px-5 py-2.5 whitespace-nowrap cursor-pointer transition-colors"
        >
          조회
        </button>
      </div>

      <div className="flex items-center gap-2.5 mt-4.5 mb-2.5">
        <span className="w-6 h-1.25 rounded bg-vaccent" />
        <h3 className="text-lg font-extrabold tracking-tight">{title}</h3>
        <span className="ml-auto text-[12.5px] font-bold text-gray-500">
          선택 <b className="text-vbrand">{picks.length}</b> / {max}
        </span>
      </div>

      <div className="border border-[#d7dae4] rounded-lg overflow-hidden">
        <div className="max-h-[460px] overflow-auto">
          <table className="w-full border-collapse text-[13.5px] min-w-[640px]">
            <thead>
              <tr>
                <th className="sticky top-0 bg-[#f4f5f8] text-gray-700 font-bold text-[13.5px] text-center py-3 px-2 border-b border-[#d7dae4] border-r border-vline w-1/5">
                  대분류
                </th>
                <th className="sticky top-0 bg-[#f4f5f8] text-gray-700 font-bold text-[13.5px] text-center py-3 px-2 border-b border-[#d7dae4] border-r border-vline w-[23%]">
                  중분류
                </th>
                <th className="sticky top-0 bg-[#f4f5f8] text-gray-700 font-bold text-[13.5px] text-center py-3 px-2 border-b border-[#d7dae4] border-r border-vline w-1/4">
                  소분류
                </th>
                <th className="sticky top-0 bg-[#f4f5f8] text-gray-700 font-bold text-[13.5px] text-center py-3 px-2 border-b border-[#d7dae4] w-[32%]">
                  세분류
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-9 text-center text-gray-500 text-sm">
                    검색 결과가 없습니다. 키워드를 바꿔보세요.
                  </td>
                </tr>
              ) : (
                rows.map((r, i) => {
                  const key = keyOf(r);
                  const picked = isPicked(key);
                  return (
                    <tr key={i} className={picked && !r[3] ? "bg-[#f2f2ff]" : ""}>
                      {isFirst(rows, i, 0) && (
                        <td
                          rowSpan={spanCount(rows, i, 0)}
                          className="text-gray-700 font-medium bg-[#fcfcfe] text-center align-middle py-2.5 px-3 border-b border-[#edeef2] border-r border-[#edeef2]"
                        >
                          {r[0]}
                        </td>
                      )}
                      {isFirst(rows, i, 1) && (
                        <td
                          rowSpan={spanCount(rows, i, 1)}
                          className="text-gray-700 font-medium bg-[#fcfcfe] text-center align-middle py-2.5 px-3 border-b border-[#edeef2] border-r border-[#edeef2]"
                        >
                          {r[1]}
                        </td>
                      )}
                      {r[3] ? (
                        <>
                          {isFirst(rows, i, 2) && (
                            <td
                              rowSpan={spanCount(rows, i, 2)}
                              className="text-gray-600 text-center align-middle py-2.5 px-3 border-b border-[#edeef2] border-r border-[#edeef2]"
                            >
                              {r[2]}
                            </td>
                          )}
                          <td className="text-left pl-3.5 align-middle py-2.5 px-3 border-b border-[#edeef2]">
                            <Leaf
                              picked={picked}
                              label={r[3]}
                              onClick={() => toggle(key, r[3]!, `${r[0]} ▸ ${r[1]} ▸ ${r[2]}`)}
                            />
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="text-left pl-3.5 align-middle py-2.5 px-3 border-b border-[#edeef2] border-r border-[#edeef2]">
                            <Leaf
                              picked={picked}
                              label={r[2]}
                              onClick={() => toggle(key, r[2], `${r[0]} ▸ ${r[1]}`)}
                            />
                          </td>
                          <td className="text-center align-middle py-2.5 px-3 border-b border-[#edeef2] text-gray-300">
                            —
                          </td>
                        </>
                      )}
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {warn && <div className="text-[12.5px] text-red-600 mt-2.5">{warn}</div>}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mt-3.5">
        {Array.from({ length: max }).map((_, i) => {
          const p = picks[i];
          return (
            <div
              key={i}
              className={`flex items-center gap-2.5 border rounded-[10px] px-3.25 py-2.75 min-h-13.5 ${
                p ? "border-solid border-[#dfe0ff] bg-gradient-to-b from-[#f7f7ff] to-white" : "border-dashed border-[#c9cbe0] bg-white"
              }`}
            >
              <span
                className={`w-5.5 h-5.5 rounded-full flex items-center justify-center font-extrabold text-[11px] shrink-0 ${
                  p ? "bg-vbrand text-white" : "bg-vbrand-soft text-vbrand"
                }`}
              >
                {i + 1}
              </span>
              {p ? (
                <>
                  <div className="flex-1 min-w-0 text-[13px]">
                    <span className="font-bold block truncate" title={p.leaf}>
                      {p.leaf}
                    </span>
                    <small className="text-gray-500 block truncate text-[11px]" title={p.trail}>
                      {p.trail}
                    </small>
                  </div>
                  <button
                    type="button"
                    onClick={() => onChange(picks.filter((x) => x.key !== p.key))}
                    className="text-gray-400 hover:text-gray-600 text-base bg-transparent border-0 cursor-pointer"
                  >
                    ×
                  </button>
                </>
              ) : (
                <span className="flex-1 text-[13px] text-gray-400">분야 {i + 1} 미선택</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Leaf({ picked, label, onClick }: { picked: boolean; label: string; onClick: () => void }) {
  return (
    <span
      onClick={onClick}
      className={`inline-flex items-center gap-2 cursor-pointer font-semibold rounded-md px-1.75 py-1 transition-colors hover:bg-vbrand-soft hover:text-vbrand ${
        picked ? "text-vbrand" : "text-vink"
      }`}
    >
      <span
        className={`w-4 h-4 rounded flex items-center justify-center text-[10px] text-white shrink-0 border-[1.5px] ${
          picked ? "bg-vbrand border-vbrand" : "border-gray-300"
        }`}
      >
        {picked ? "✓" : ""}
      </span>
      {label}
    </span>
  );
}
