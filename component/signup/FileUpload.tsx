"use client";

import { useRef, useState } from "react";

export default function FileUpload({
  hint,
  defaultFile,
}: {
  hint: string;
  defaultFile?: { name: string; size: string };
}) {
  const [file, setFile] = useState<{ name: string; size: string } | null>(defaultFile ?? null);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFiles(files: FileList | null) {
    if (!files || !files[0]) return;
    const f = files[0];
    setFile({ name: f.name, size: `${(f.size / (1024 * 1024)).toFixed(1)}MB` });
  }

  return (
    <div>
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          handleFiles(e.dataTransfer.files);
        }}
        className="border-[1.5px] border-dashed border-[#c7e1ff] rounded-xl p-6.5 text-center bg-[#fbfbfe] cursor-pointer transition-colors hover:border-brand-600 hover:bg-brand-100"
      >
        <div className="w-11 h-11 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center mx-auto mb-2.5 text-xl">
          ⬆
        </div>
        <div>
          <b className="text-brand-800">파일을 끌어다 놓거나 클릭</b>해서 업로드
        </div>
        <div className="text-[12.5px] text-gray-500 mt-1.5">{hint}</div>
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>
      {file && (
        <div className="flex items-center gap-3 px-3.5 py-2.75 border border-gray-200 rounded-[10px] mt-2.5 text-[13.5px]">
          <div className="w-8 h-8 rounded-lg bg-[#eaf7f0] text-vok flex items-center justify-center shrink-0">✓</div>
          <div className="flex-1 min-w-0 truncate">
            {file.name}
            <br />
            <small className="text-gray-500">{file.size} · 검토 대기중</small>
          </div>
          <div
            onClick={() => setFile(null)}
            className="text-gray-500 cursor-pointer hover:text-gray-700"
          >
            ×
          </div>
        </div>
      )}
    </div>
  );
}
