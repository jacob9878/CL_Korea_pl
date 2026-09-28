export default function Hero({ onLoginClick }: { onLoginClick: () => void }) {
  return (
    <section className="pt-25 pb-20 px-10 text-center bg-gradient-to-br from-white via-white to-brand-light">
      <div className="text-[12.5px] font-bold text-brand uppercase tracking-wide mb-3.5">About CL Korea</div>
      <h1 className="text-[52px] font-black tracking-[-2px] leading-[1.1] mb-5">
        대한민국 R&D 생태계를
        <br />
        <span className="text-brand">연결</span>합니다
      </h1>
      <p className="text-[17px] text-gray-500 leading-relaxed max-w-[560px] mx-auto mb-10">
        CL Korea는 AI 기반 컨소시엄 매칭으로 기관들이 더 쉽고 빠르게 정부 R&D 과정에 참여할 수
        있도록 돕습니다.
      </p>
      <div className="flex justify-center gap-3">
        <button
          onClick={onLoginClick}
          className="px-7 py-3.25 text-[15px] font-bold text-white bg-brand rounded-[10px] cursor-pointer hover:bg-brand-hover transition-colors"
        >
          무료로 시작하기
        </button>
        <a
          href="/contact"
          className="px-7 py-3.25 text-[15px] font-bold text-gray-700 bg-white border border-gray-200 rounded-[10px] hover:bg-gray-50 transition-colors"
        >
          데모 신청
        </a>
      </div>
    </section>
  );
}
