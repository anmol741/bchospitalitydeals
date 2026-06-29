"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FAQ_ITEMS = [
  {
    q: "Why is the business name and location kept confidential?",
    a: "Sellers require confidentiality to protect ongoing operations. Disclosing that a business is for sale can unsettle staff, alarm customers, and affect supplier relationships. Once a mutual NDA is in place, full details including address and business name are provided.",
  },
  {
    q: "Why do I need to sign a Confidentiality Agreement (NDA)?",
    a: "The NDA protects the seller's sensitive business information — financials, lease terms, staff details, and customer data. It is a standard part of any commercial business sale and ensures that only serious, qualified buyers receive private information.",
  },
  {
    q: "How do I receive financial statements and business details?",
    a: "After you submit your inquiry and sign the NDA, CJ Kalra will provide you with a Confidential Business Review (CBR) package containing financials, lease summaries, sales history, and other due diligence materials relevant to your selected listing.",
  },
  {
    q: "Can these businesses support immigration or visa pathways?",
    a: "Several of these listings may qualify for Canadian business immigration programs. CJ works with RCIC-licensed consultants who can advise on BCPNP Entrepreneur stream and federal self-employed pathways. Mention your immigration goals in the inquiry form.",
  },
  {
    q: "How quickly can I receive information after submitting my inquiry?",
    a: "You will typically receive a response within 1 business day. After the NDA is signed, the Confidential Business Review is usually shared within 24–48 hours depending on availability.",
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="py-20 px-4" style={{ background: "#050d1a" }}>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "#C9A84C" }}>COMMON QUESTIONS</p>
          <div className="w-12 h-px mx-auto mb-4" style={{ background: "#C9A84C" }} />
          <h2 className="text-4xl font-bold text-white" style={{ fontFamily: "var(--font-playfair)" }}>Frequently Asked Questions</h2>
        </div>
        <div className="space-y-0">
          {FAQ_ITEMS.map((item, i) => (
            <div key={i} style={{ borderBottom: "1px solid rgba(201,168,76,0.15)" }}>
              <button
                className="w-full flex items-center justify-between gap-4 py-5 text-left transition-colors"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="font-medium text-white text-sm md:text-base">{item.q}</span>
                <svg
                  className="w-5 h-5 flex-shrink-0 transition-transform duration-300"
                  style={{
                    color: "#C9A84C",
                    transform: open === i ? "rotate(90deg)" : "rotate(0deg)",
                  }}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    key="answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="pb-5 text-sm leading-relaxed" style={{ color: "#94a3b8" }}>{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
