"use client";

import Link from "next/link";
import { useLoginModal } from "./LoginModalContext";

const NAV_LINKS = [
  { href: "/", label: "서비스 소개", active: true },
  { href: "/#how", label: "매칭 방법" },
  { href: "/announcements", label: "사업 공고" },
  { href: "/contact", label: "문의하기" },
  { href: "/about", label: "회사 소개" },
];

export default function Nav() {
  const { openLogin } = useLoginModal();

  return (
    <nav className="sticky top-0 z-100 flex items-center justify-between h-15 px-10 bg-white/92 backdrop-blur-md border-b border-gray-200">
      <Link href="/" className="text-[17px] font-extrabold text-gray-900">
        CL<span className="text-brand-800">Korea</span>
      </Link>
      <ul className="hidden md:flex items-center gap-8 list-none">
        {NAV_LINKS.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className={
                link.active
                  ? "text-sm font-bold text-brand-600"
                  : "text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              }
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      <div className="flex items-center gap-2.5">
        <button
          onClick={openLogin}
          className="px-3.5 py-1.5 text-[13.5px] font-semibold text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
        >
          로그인
        </button>
      </div>
    </nav>
  );
}
