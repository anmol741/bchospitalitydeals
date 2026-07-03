"use client";

import { motion } from "framer-motion";

export default function WhyUsSection() {
  return (
    <section className="py-20 px-4" style={{ background: "#0a1628" }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

          {/* Left — Agent card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.3 }}
            className="rounded-xl p-8 flex flex-col items-center text-center h-full"
            style={{ background: "#0d1f3c", border: "1px solid rgba(201,168,76,0.2)" }}
          >
            {/* Avatar */}
            <div
              className="w-28 h-28 rounded-full flex items-center justify-center mb-5 relative overflow-hidden"
              style={{ background: "#112244", border: "2px solid rgba(201,168,76,0.3)" }}
            >
              <svg className="w-16 h-16" fill="#C9A84C" viewBox="0 0 24 24">
                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: "var(--font-playfair)" }}>CJ Kalra</h3>
            <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "#C9A84C" }}>
              Business &amp; Commercial Real Estate Specialist
            </p>
            <p className="text-sm mb-6" style={{ color: "#94a3b8" }}>Century 21 Coastal Realty Ltd.</p>
            <div className="flex flex-col gap-3 w-full">
              {[
                { icon: "📞", label: "778-896-9552", href: "tel:7788969552" },
                { icon: "✉️", label: "cj.kalra@century21.ca", href: "mailto:cj.kalra@century21.ca" },
                { icon: "🌐", label: "bcrealestate.c21.ca", href: "https://bcrealestate.c21.ca/" },
              ].map(({ icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-center justify-center gap-2 text-sm transition-opacity hover:opacity-80"
                  style={{ color: "#C9A84C" }}
                >
                  <span>{icon}</span>
                  {label}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right — feature content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.3, delay: 0.1 }}
          >
            <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "#C9A84C" }}>YOUR SPECIALIST TEAM</p>
            <div className="w-10 h-px mb-5" style={{ background: "#C9A84C" }} />
            <h2 className="text-4xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
              Why Work With Us
            </h2>
            <p className="text-sm leading-relaxed mb-8" style={{ color: "#e8dfc8" }}>
              We represent buyers and sellers of hospitality businesses and commercial properties across British Columbia — with a focus on professionalism, discretion, and results-driven representation.
            </p>
            <div className="flex flex-col gap-3">
              {[
                { icon: "🔑", title: "Access to MLS & Off-Market Opportunities", desc: "Active MLS listings plus privately sourced off-market restaurants and hospitality businesses available through our professional network." },
                { icon: "📋", title: "Business Valuation Support Available", desc: "We work alongside qualified professionals to review financial statements, assess goodwill, and help you understand what a business is truly worth before you commit." },
                { icon: "👥", title: "Qualified Buyer & Investor Network", desc: "A broad network of owner-operators, investors, and entrepreneurs across Canada and internationally actively seeking hospitality acquisitions." },
                { icon: "🔑", title: "Commercial Negotiation Experience", desc: "Skilled representation through lease reviews, asset negotiations, and complex multi-party transactions with full due diligence support." },
                { icon: "🛡️", title: "End-to-End Transaction Support", desc: "From first enquiry through to completed sale — professional guidance at every stage of your acquisition or disposition." },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex items-start gap-4 rounded-lg p-4"
                  style={{
                    background: "#0d1f3c",
                    border: "1px solid rgba(201,168,76,0.12)",
                    borderLeft: "3px solid #C9A84C",
                  }}
                >
                  <span className="text-xl flex-shrink-0 mt-0.5">{item.icon}</span>
                  <div>
                    <p className="font-semibold text-white text-sm mb-1">{item.title}</p>
                    <p className="text-xs leading-relaxed" style={{ color: "#94a3b8" }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
