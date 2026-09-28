export default function Toast({ message }: { message: string | null }) {
  return (
    <div
      className={`fixed bottom-6.5 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-5 py-3 rounded-[10px] text-[13.5px] font-semibold shadow-xl transition-all duration-250 z-300 ${
        message ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5 pointer-events-none"
      }`}
      style={{ transform: message ? "translateX(-50%) translateY(0)" : "translateX(-50%) translateY(20px)" }}
    >
      {message}
    </div>
  );
}
