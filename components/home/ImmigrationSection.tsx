const RCIC_AUDIENCE = [
  "International Entrepreneurs",
  "Business Investors",
  "Owner-Operators",
  "Provincial Entrepreneur Stream Candidates",
  "Individuals Seeking Active Business Ownership",
];

export default function ImmigrationSection() {
  return (
    <section className="py-20 px-4" style={{ background: "#050d1a" }}>
      <div className="max-w-4xl mx-auto">
        <div
          className="rounded-xl p-8 md:p-12"
          style={{ background: "#0d1f3c", border: "1px solid rgba(201,168,76,0.2)" }}
        >
          {/* Label */}
          <p className="text-xs font-semibold uppercase tracking-widest mb-2 text-center" style={{ color: "#C9A84C" }}>
            FOR IMMIGRATION PROFESSIONALS &amp; INTERNATIONAL CLIENTS
          </p>
          <div className="w-12 h-px mx-auto mb-8" style={{ background: "#C9A84C" }} />

          {/* Heading */}
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-5 text-center leading-snug" style={{ fontFamily: "var(--font-playfair)" }}>
            Attention: RCICs, Immigration Lawyers &amp; International Entrepreneurs
          </h2>

          {/* Body */}
          <p className="text-sm leading-relaxed mb-7 text-center max-w-2xl mx-auto" style={{ color: "#e8dfc8" }}>
            Some opportunities listed may be of potential interest to individuals exploring entrepreneurial or business ownership pathways. These opportunities may be relevant to:
          </p>

          {/* Checkmark grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-8">
            {RCIC_AUDIENCE.map((item) => (
              <div key={item} className="flex items-start gap-3">
                <span className="text-[#C9A84C] font-bold text-base flex-shrink-0 mt-0.5">✓</span>
                <span className="text-sm" style={{ color: "#e8dfc8" }}>{item}</span>
              </div>
            ))}
          </div>

          {/* Disclaimer box */}
          <div
            className="rounded-lg p-5"
            style={{
              background: "#0a1628",
              borderLeft: "3px solid #C9A84C",
            }}
          >
            <p className="text-xs leading-relaxed" style={{ color: "#94a3b8" }}>
              <span className="font-bold" style={{ color: "#C9A84C" }}>Important Immigration Disclaimer: </span>
              The purchase of a business does not guarantee eligibility for any immigration program, work permit, provincial nomination, permanent residence application, or approval by any government authority. Prospective buyers should consult their own licensed RCIC or Immigration Lawyer regarding their specific immigration goals, eligibility, and suitability before making any investment decision. All businesses are offered as commercial opportunities only and not as immigration products or guarantees of immigration outcomes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
