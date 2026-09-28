export default function PhaseSteps({ steps }: { steps: string[] }) {
  return (
    <div className="flex gap-2 px-7 py-5 border-b border-gray-200 flex-wrap">
      {steps.map((label, i) => (
        <div key={label} className="flex-1 min-w-40 flex gap-2.5 items-center text-[13.5px] font-semibold text-gray-900">
          <span className="w-6.5 h-6.5 rounded-full bg-brand-600 text-white flex items-center justify-center font-bold text-[13px] shrink-0">
            {i + 1}
          </span>
          {label}
        </div>
      ))}
    </div>
  );
}
