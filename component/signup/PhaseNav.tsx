import Link from "next/link";

export default function PhaseNav() {
  return (
    <header className="sticky top-0 z-20 bg-vbg/85 backdrop-blur-md border-b border-vline">
      <div className="max-w-[1180px] mx-auto px-6 flex items-center h-16 gap-7">
        <Link href="/" className="flex items-center gap-2.5 font-extrabold text-[18px] tracking-tight">
          <span className="w-7.5 h-7.5 rounded-[9px] bg-gradient-to-br from-vbrand to-vbrand-2 flex items-center justify-center text-white text-[15px] font-extrabold">
            CL
          </span>
          씨엘코리아
        </Link>
        <nav className="hidden md:flex gap-5.5 text-vmuted font-medium text-[14.5px]">
          <Link href="/announcements" className="hover:text-vink">
            공고 확인
          </Link>
          <a href="#" className="hover:text-vink">
            정기 레터
          </a>
          <a href="#" className="hover:text-vink">
            컨소시엄 매칭
          </a>
        </nav>
        <div className="flex-1" />
        <Link
          href="/"
          className="text-vmuted font-semibold text-[14.5px] px-4.5 py-2.5 rounded-[10px] hover:text-vink transition-colors"
        >
          로그인
        </Link>
      </div>
    </header>
  );
}
