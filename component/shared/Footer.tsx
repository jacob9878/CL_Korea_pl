import Link from "next/link";

const FOOTER_COLS = [
  { title: "서비스", links: ["파트너 검색", "기관 프로필", "컨소시엄 방", "성공률 분석", "제안서 작성"] },
  {
    title: "회사",
    links: [
      { label: "소개", href: "/about" },
      { label: "성공 사례", href: "#" },
      { label: "가격 정책", href: "/pricing" },
      { label: "블로그", href: "#" },
      { label: "채용", href: "#" },
    ],
  },
  {
    title: "지원",
    links: [
      { label: "사용 가이드", href: "#" },
      { label: "API 문서", href: "#" },
      { label: "문의하기", href: "/contact" },
      { label: "개인정보처리방침", href: "#" },
      { label: "이용약관", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] px-10 pt-14 pb-8">
      <div className="max-w-[1160px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-12 pb-10 border-b border-gray-800 mb-8">
          <div>
            <div className="text-[17px] font-black text-white mb-3">
              CL<span className="text-brand-800">Korea</span>
            </div>
            <p className="text-[13px] text-gray-500 leading-relaxed">
              AI 기반 정부 R&D 컨소시엄
              <br />
              매칭 플랫폼. CL Korea.
            </p>
          </div>
          {FOOTER_COLS.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-bold text-white mb-3.5">{col.title}</h4>
              <ul className="flex flex-col gap-2 list-none">
                {col.links.map((link) => {
                  const isObj = typeof link !== "string";
                  const label = isObj ? link.label : link;
                  const href = isObj ? link.href : "#";
                  return (
                    <li key={label}>
                      <Link href={href} className="text-[13px] text-gray-500 hover:text-white transition-colors">
                        {label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col md:flex-row gap-2 md:items-center md:justify-between text-[12.5px] text-gray-600">
          <span>© 2026 CL Korea. All rights reserved.</span>
          <span>사업자등록번호: 000-00-00000 · 대표: 홍길동</span>
        </div>
      </div>
    </footer>
  );
}
