"use client";

export type ConsentDoc = { type: "text"; content: string } | { type: "table"; rows: [string, string][] };

export type ConsentItem = {
  id: string;
  label: string;
  tag: { text: string; variant: "must" | "opt" | "pay" };
  hint?: string;
  doc?: ConsentDoc;
};

const TAG_CLASS: Record<string, string> = {
  must: "bg-[#ffece9] text-[#e0442f]",
  opt: "bg-vbrand-soft text-vbrand",
  pay: "bg-[#fff4e6] text-[#e07f16]",
};

export default function ConsentSection({
  items,
  checked,
  onChange,
}: {
  items: ConsentItem[];
  checked: Record<string, boolean>;
  onChange: (next: Record<string, boolean>) => void;
}) {
  const allOn = items.every((it) => checked[it.id]);

  function toggleAll() {
    const next: Record<string, boolean> = {};
    items.forEach((it) => (next[it.id] = !allOn));
    onChange(next);
  }

  function toggleOne(id: string) {
    onChange({ ...checked, [id]: !checked[id] });
  }

  return (
    <div className="border border-vline rounded-xl overflow-hidden">
      <label className="flex items-center gap-3 px-4 py-3.75 bg-vbrand-soft font-bold text-[14.5px] cursor-pointer">
        <input type="checkbox" checked={allOn} onChange={toggleAll} className="w-5 h-5 accent-vbrand shrink-0" />
        아래 항목에 전체 동의합니다{" "}
        <span className="font-medium text-[12.5px] text-vmuted">(선택 항목 포함)</span>
      </label>
      {items.map((it) => (
        <div key={it.id} className="flex gap-3 px-4 py-3.5 border-t border-vline items-start">
          <input
            type="checkbox"
            checked={!!checked[it.id]}
            onChange={() => toggleOne(it.id)}
            className="w-5 h-5 accent-vbrand shrink-0 mt-0.5"
          />
          <div className="flex-1 text-[13.8px]">
            {it.label}{" "}
            <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${TAG_CLASS[it.tag.variant]}`}>
              {it.tag.text}
            </span>
            {it.hint && <small className="block text-vmuted mt-0.75 text-[12.5px]">{it.hint}</small>}
            {it.doc && (
              <details className="mt-2" onClick={(e) => e.stopPropagation()}>
                <summary className="cursor-pointer text-[12.5px] text-vbrand font-semibold list-none marker:content-none [&::-webkit-details-marker]:hidden">
                  약관·고지 전문 보기
                </summary>
                <div className="mt-2 bg-[#fbfbfe] border border-vline rounded-lg p-3 text-[12.5px] text-gray-600 max-h-50 overflow-auto leading-relaxed">
                  {it.doc.type === "text" ? (
                    it.doc.content
                  ) : (
                    <table className="w-full border-collapse text-xs mt-1">
                      <tbody>
                        {it.doc.rows.map(([k, v]) => (
                          <tr key={k}>
                            <th className="border border-vline bg-[#f4f5fb] font-bold w-1/4 whitespace-nowrap text-left p-1.5 align-top">
                              {k}
                            </th>
                            <td className="border border-vline text-left p-1.5 align-top">{v}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </details>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
