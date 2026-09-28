export default function AuthCodeErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6 text-center">
      <div>
        <div className="text-2xl font-black mb-2.5">로그인에 실패했습니다</div>
        <p className="text-gray-500 mb-6">
          인증 코드가 만료되었거나 잘못됐어요. 다시 시도해 주세요.
        </p>
        <a
          href="/signup"
          className="inline-block px-6 py-3 rounded-[10px] font-bold text-white bg-brand-600 hover:bg-brand-700"
        >
          회원가입으로 돌아가기
        </a>
      </div>
    </div>
  );
}
