export default function DocPreviewModal({ file, onClose }: { file: string | null; onClose: () => void }) {
  if (!file) return null;
  return (
    <div
      className="fixed inset-0 z-200 bg-black/55 flex items-center justify-center"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-2xl w-full max-w-[460px] overflow-hidden shadow-2xl">
        <div className="flex justify-between items-center px-4.5 py-3.5 border-b border-gray-200 font-extrabold text-sm">
          <span>{file} — 미리보기</span>
          <span onClick={onClose} className="text-[22px] text-gray-400 cursor-pointer leading-none">
            ×
          </span>
        </div>
        <div className="p-6">
          <div
            className="border border-gray-200 rounded-[10px] flex flex-col items-center justify-center gap-2.5 text-gray-300"
            style={{
              aspectRatio: "1/1.3",
              background:
                "repeating-linear-gradient(0deg,#fff,#fff 22px,#f9fafb 22px,#f9fafb 23px)",
            }}
          >
            <div className="text-[46px]">📄</div>
            <div className="text-[13px] font-bold text-gray-500">{file}</div>
          </div>
          <div className="text-[11px] text-gray-400 mt-3.5 flex gap-1.75 items-start leading-relaxed">
            <span>🔒</span>
            <span>
              비공개 스토리지에 저장된 파일입니다. 실서비스에서는 <b>만료형 Signed URL</b>로만 열리며
              직접 URL이 노출되지 않습니다.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
