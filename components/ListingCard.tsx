"use client";

import { motion } from "framer-motion";

interface ListingCardProps {
  location: string;
  title: string;
  price: string;
  features: string[];
  badge?: string;
  mls?: string;
  address?: string;
  index?: number;
  onRequestInfo?: () => void;
}

export default function ListingCard({
  location,
  title,
  price,
  features,
  badge,
  mls,
  address,
  index = 0,
  onRequestInfo,
}: ListingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
      className="relative rounded-xl overflow-hidden group transition-all duration-300 flex flex-col"
      style={{
        background: "linear-gradient(145deg, #0a1628 0%, #0d1f3c 100%)",
        border: "1px solid rgba(201,168,76,0.2)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,168,76,0.7)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 40px rgba(201,168,76,0.12), 0 0 20px rgba(26,58,107,0.3)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,168,76,0.2)";
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
      }}
    >
      {/* Top accent */}
      <div className="h-0.5 bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="p-6 flex flex-col flex-1">
        {/* Location badge */}
        <div className="flex items-center justify-between mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#C9A84C]/10 border border-[#C9A84C]/30 rounded-full text-[#C9A84C] text-xs font-medium tracking-wide">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
            {location}
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-500/10 border border-green-500/30 rounded-full text-green-400 text-[10px] font-medium uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Active Listing
          </span>
        </div>

        {/* Title */}
        <h3
          className="text-white font-heading text-lg font-semibold mb-1 leading-snug group-hover:text-[#E5C97A] transition-colors"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          {title}
        </h3>

        {/* Price */}
        <div className="text-3xl font-bold text-[#C9A84C] mb-2 font-heading"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          {price}
        </div>

        {/* MLS + Address */}
        {(mls || address) && (
          <div className="mb-4 space-y-0.5">
            {mls && (
              <p style={{ fontSize: "12px" }}>
                <span style={{ color: "#C9A84C", fontWeight: 600 }}>MLS®</span>{" "}
                <span style={{ color: "#94a3b8" }}>{mls}</span>
              </p>
            )}
            {address && (
              <p style={{ fontSize: "11px", color: "#94a3b8" }}>{address}</p>
            )}
          </div>
        )}

        {/* Features */}
        <ul className="space-y-2 mb-6 flex-1">
          {features.map((f, i) => (
            <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "#e8dfc8" }}>
              <svg
                className="w-4 h-4 text-[#C9A84C] mt-0.5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              {f}
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="flex gap-3 mt-auto">
          <button
            onClick={onRequestInfo}
            className="flex-1 px-4 py-2.5 bg-[#C9A84C] hover:bg-[#E5C97A] text-[#0D0D0D] font-semibold rounded text-sm transition-all duration-200 hover:scale-[1.02] active:scale-95"
          >
            Request Info
          </button>
          <button
            onClick={onRequestInfo}
            className="flex-1 px-4 py-2.5 border border-[#C9A84C]/50 text-[#C9A84C] hover:bg-[#C9A84C]/10 font-semibold rounded text-sm transition-all duration-200 hover:border-[#C9A84C]"
          >
            Get Details
          </button>
        </div>
      </div>

      {/* NDA Protected badge */}
      <div className="px-6 py-2 flex items-center gap-2" style={{ background: "#050d1a", borderTop: "1px solid rgba(201,168,76,0.15)" }}>
        <svg className="w-3 h-3 text-[#C9A84C]" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
            clipRule="evenodd"
          />
        </svg>
        <span className="text-white/30 text-[10px] uppercase tracking-widest font-medium">
          NDA Required · Confidential Listing
        </span>
      </div>
    </motion.div>
  );
}
