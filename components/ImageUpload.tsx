"use client";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const INPUT = "w-full px-4 py-3 border border-[#C9A84C]/20 rounded-lg text-white text-sm focus:outline-none focus:border-[#C9A84C] transition-colors";
const BG: React.CSSProperties = { background: "#0a1628" };

export default function ImageUpload({ value, onChange }: Props) {
  return (
    <div className="space-y-3">
      <p className="text-xs" style={{ color: "#94a3b8" }}>
        Upload your image to{" "}
        <a href="https://imgbb.com" target="_blank" rel="noopener noreferrer" className="text-[#C9A84C] underline underline-offset-2">
          imgbb.com
        </a>{" "}
        and paste the direct image URL below.
      </p>
      <input
        type="text"
        placeholder="https://i.ibb.co/example/image.jpg"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={INPUT}
        style={BG}
      />

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
            onClick={() => onChange("")}
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
