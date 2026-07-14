"use client";

import { trackSchedule } from "@/lib/fbpixel";

export default function ConsultationCtaSection() {
  return (
    <section
      className="py-20 px-4 text-center"
      style={{
        background: "linear-gradient(135deg, #0d1f3c 0%, #1a3a6b 100%)",
        borderTop: "1px solid rgba(201,168,76,0.3)",
        borderBottom: "1px solid rgba(201,168,76,0.3)",
      }}
    >
      <div className="max-w-2xl mx-auto">
        <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "#C9A84C" }}>ONE-ON-ONE</p>
        <div className="w-12 h-px mx-auto mb-6" style={{ background: "#C9A84C" }} />
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
          Schedule a Confidential Buyer Consultation
        </h2>
        <p className="text-base leading-relaxed mb-8" style={{ color: "#e8dfc8" }}>
          Discuss available opportunities, your investment criteria, and strategic goals with a Commercial Real Estate Specialist. No obligation.
        </p>
        <a
          href="https://my-url.in/booking-link"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackSchedule()}
          className="inline-flex items-center gap-2 px-8 py-4 rounded font-bold text-sm tracking-wider transition-all hover:opacity-90 active:scale-95 shadow-lg"
          style={{ background: "linear-gradient(135deg, #C9A84C, #a8893d)", color: "#000000" }}
        >
          📅 BOOK YOUR CONSULTATION
        </a>
      </div>
    </section>
  );
}
