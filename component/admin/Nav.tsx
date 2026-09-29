"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function Nav({ adminName }: { adminName: string }) {
  const router = useRouter();

  async function signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.replace("/");
    router.refresh();
  }

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between h-14.5 px-7 bg-white border-b border-gray-200">
      <Link href="/" className="text-[17px] font-extrabold flex items-center gap-2.5">
        CL<span className="text-brand-800">Korea</span>
        <span className="text-[11px] font-extrabold bg-gray-900 text-white px-2.25 py-0.75 rounded-md tracking-wide">
          운영자 콘솔
        </span>
      </Link>
      <div className="flex items-center gap-4 text-[13px] text-gray-500">
        <Link href="/" className="font-semibold text-gray-600 hover:text-brand-600">
          ← 메인으로
        </Link>
        <button onClick={signOut} className="bg-transparent border-none text-gray-400 text-xs cursor-pointer hover:text-gray-600">
          로그아웃
        </button>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-gray-900 text-white flex items-center justify-center text-xs font-extrabold">
            {adminName.charAt(0)}
          </div>
          <span>{adminName}</span>
        </div>
      </div>
    </nav>
  );
}
