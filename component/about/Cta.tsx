export default function Cta({ onLoginClick }: { onLoginClick: () => void }) {
  return (
    <section className="py-22 px-10 bg-brand-800 text-center">
      <h2 className="text-[36px] font-black text-white tracking-[-1px] mb-4">
        지금 바로 파트너를 찾아보세요
      </h2>
      <p className="text-base text-white/85 leading-relaxed mb-10">
        14일 무료 체험, 신용카드 불필요.
        <br />
        가입 후 즉시 AI 매칭을 경험할 수 있습니다.
      </p>
      <div className="flex justify-center gap-3.5">
        <button
          onClick={onLoginClick}
          className="px-7 py-3.5 text-[15px] font-bold text-brand-600 bg-white rounded-[10px] cursor-pointer hover:opacity-90 transition-opacity"
        >
          무료로 시작하기
        </button>
        <a
          href="/contact"
          className="px-7 py-3.5 text-[15px] font-bold text-white bg-transparent border-2 border-white/50 rounded-[10px] hover:border-white transition-colors"
        >
          데모 신청하기
        </a>
      </div>
    </section>
  );
}
