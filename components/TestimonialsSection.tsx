const TESTIMONIALS = [
  {
    body: "CJ's approach to confidentiality gave us complete confidence throughout the process. We received detailed financials within days of signing the NDA, and the transaction closed without a single issue. Exceptional commercial representation.",
    initials: "RS",
    name: "Rajinder S.",
    sub: "Verified Buyer — BC",
  },
  {
    body: "As an international investor exploring opportunities in BC, CJ provided clarity, professionalism, and access to deals I simply could not find elsewhere. His network and discretion are unmatched.",
    initials: "AK",
    name: "Avneet Kaur",
    sub: "Business Investor — Surrey, BC",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 px-4" style={{ background: "#050d1a" }}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "#C9A84C" }}>CLIENT EXPERIENCES</p>
          <div className="w-12 h-px mx-auto mb-4" style={{ background: "#C9A84C" }} />
          <h2 className="text-4xl font-bold text-white" style={{ fontFamily: "var(--font-playfair)" }}>What Buyers Are Saying</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.initials}
              className="rounded-xl p-7 flex flex-col gap-4"
              style={{
                background: "linear-gradient(145deg, #0a1628, #0d1f3c)",
                border: "1px solid rgba(201,168,76,0.15)",
                borderTop: "2px solid #C9A84C",
              }}
            >
              <span className="text-5xl leading-none text-[#C9A84C] opacity-40 font-serif">&ldquo;</span>
              <p className="text-sm leading-relaxed flex-1" style={{ color: "#e8dfc8" }}>{t.body}</p>
              <div className="flex items-center gap-1 text-[#C9A84C]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                  style={{ background: "rgba(201,168,76,0.2)", color: "#C9A84C", border: "1px solid rgba(201,168,76,0.4)" }}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{t.name}</p>
                  <p className="text-xs" style={{ color: "#94a3b8" }}>{t.sub}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
