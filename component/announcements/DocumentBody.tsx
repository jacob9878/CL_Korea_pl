function classify(paragraph: string): "heading" | "bullet" | "text" {
  if (/^[□○▶※【]/.test(paragraph)) return "heading";
  if (/^[-·]/.test(paragraph)) return "bullet";
  return "text";
}

export default function DocumentBody({ paragraphs }: { paragraphs: string[] }) {
  if (!paragraphs.length) {
    return (
      <p className="text-[14.5px] text-gray-500 leading-relaxed">
        공고문 본문을 불러오지 못했습니다. 첨부파일 또는 전문기관 홈페이지를 확인해 주세요.
      </p>
    );
  }
  return (
    <div>
      {paragraphs.map((p, i) => {
        const kind = classify(p);
        if (kind === "heading") {
          return (
            <p key={i} className="font-extrabold text-gray-900 text-[15.5px] mt-5.5 mb-2 first:mt-0">
              {p}
            </p>
          );
        }
        if (kind === "bullet") {
          return (
            <p key={i} className="pl-4.5 -indent-3.5 text-gray-700 text-[14.5px] leading-[1.85] mb-2">
              {p}
            </p>
          );
        }
        return (
          <p key={i} className="text-[14.5px] leading-[1.85] text-gray-700 mb-2.5" style={{ wordBreak: "keep-all" }}>
            {p}
          </p>
        );
      })}
    </div>
  );
}
