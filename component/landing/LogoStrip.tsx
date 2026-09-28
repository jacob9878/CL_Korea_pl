const SOURCES = [
  { label: "NTIS", color: "#1d4ed8" },
  { label: "KIPRIS", color: "#dc2626" },
  { label: "DART", color: "#0369a1" },
  { label: "RISS", color: "#7c3aed" },
  { label: "ScienceON", color: "#059669" },
  { label: "IRIS", color: "#b45309" },
  { label: "범부처통합연구지원", color: "#be185d" },
  { label: "Korea Tech Portal", color: "#374151" },
];

export default function LogoStrip() {
  return (
    <div className="mt-20 border-t border-b border-gray-200 bg-gray-50 py-8 px-10">
      <div className="max-w-[1280px] mx-auto">
        <p className="text-center text-xs font-semibold text-gray-400 tracking-wide uppercase mb-6">
          연동 데이터 소스
        </p>
        <div className="flex items-center justify-center flex-wrap">
          {SOURCES.map((source, i) => (
            <div
              key={source.label}
              className={`flex items-center gap-2 px-8 py-2 text-[13px] font-bold text-gray-500 ${
                i < SOURCES.length - 1 ? "border-r border-gray-200" : ""
              }`}
            >
              <span
                className="w-7 h-7 rounded-md flex items-center justify-center text-[11px] font-black text-white shrink-0"
                style={{ background: source.color }}
              >
                {source.label[0]}
              </span>
              {source.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
