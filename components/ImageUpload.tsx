"use client";

import { useRef } from "react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const INPUT = "w-full px-4 py-3 border border-[#C9A84C]/20 rounded-lg text-white text-sm focus:outline-none focus:border-[#C9A84C] transition-colors";
const BG: React.CSSProperties = { background: "#0a1628" };

export default function ImageUpload({ value, onChange }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const isDataUrl = value.startsWith("data:");

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => onChange(reader.result as string);
    reader.readAsDataURL(file);
  }

  function handleClear() {
    onChange("");
    if (fileRef.current) fileRef.current.value = "";
  }

  return (
    <div className="space-y-3">
      {/* File picker */}
      <div
        className="relative flex items-center gap-3 px-4 py-3 rounded-lg border border-dashed cursor-pointer transition-colors hover:border-[#C9A84C]/50"
        style={{ background: "#0a1628", borderColor: "rgba(201,168,76,0.25)" }}
        onClick={() => fileRef.current?.click()}
      >
        <svg className="w-5 h-5 flex-shrink-0" style={{ color: "#C9A84C" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span className="text-sm" style={{ color: isDataUrl ? "#C9A84C" : "#94a3b8" }}>
          {isDataUrl ? "Image uploaded — click to replace" : "Click to upload image from computer"}
        </span>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={handleFile}
          onClick={(e) => e.stopPropagation()}
        />
      </div>

      {/* URL fallback */}
      <div className="flex items-center gap-2">
        <div className="h-px flex-1" style={{ background: "rgba(201,168,76,0.12)" }} />
        <span className="text-xs px-2" style={{ color: "#6b7280" }}>or paste URL</span>
        <div className="h-px flex-1" style={{ background: "rgba(201,168,76,0.12)" }} />
      </div>
      <input
        type="text"
        placeholder="https://example.com/image.jpg"
        value={isDataUrl ? "" : value}
        onChange={(e) => {
          if (fileRef.current) fileRef.current.value = "";
          onChange(e.target.value);
        }}
        className={INPUT}
        style={BG}
      />

      {/* Preview */}
      {value && (
        <div className="relative inline-block">
          <img
            src={value}
            alt="Preview"
            className="rounded-lg object-cover"
            style={{ width: 200, height: 120 }}
          />
          <button
            type="button"
            onClick={handleClear}
            className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-opacity hover:opacity-80"
            style={{ background: "#0d1f3c", border: "1px solid rgba(201,168,76,0.4)", color: "#C9A84C" }}
            title="Remove image"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
