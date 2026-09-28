import Link from "next/link";

export default function Nav({ onReset }: { onReset: () => void }) {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between h-14.5 px-7 bg-white border-b border-gray-200">
      <Link href="/" className="text-[17px] font-extrabold flex items-center gap-2.5">
        CL<span className="text-brand">Korea</span>
        <span className="text-[11px] font-extrabold bg-gray-900 text-white px-2.25 py-0.75 rounded-md tracking-wide">
          운영자 콘솔
        </span>
      </Link>
      <div className="flex items-center gap-4 text-[13px] text-gray-500">
        <Link href="/" className="font-semibold text-gray-600 hover:text-brand">
          ← 메인으로
        </Link>
        <button onClick={onReset} className="bg-transparent border-none text-gray-400 text-xs cursor-pointer hover:text-gray-600">
          데모 초기화
        </button>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-gray-900 text-white flex items-center justify-center text-xs font-extrabold">
            A
          </div>
          <span>이운영(admin)</span>
        </div>
      </div>
    </nav>
  );
}
