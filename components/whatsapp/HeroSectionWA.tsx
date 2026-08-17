"use client";

import { motion } from "framer-motion";
import { trackSchedule } from "@/lib/fbpixel";
import { GENERIC_WHATSAPP_MESSAGE, buildWhatsAppUrl, trackWhatsAppLead } from "@/lib/whatsapp";

const HERO_WORDS = ["Exclusive", "|", "Confidential", "|", "Business", "Opportunities"];

const WA_HREF = buildWhatsAppUrl(GENERIC_WHATSAPP_MESSAGE);

export default function HeroSectionWA() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "radial-gradient(ellipse at 60% 30%, #0d1f3c 0%, #050d1a 50%, #000000 100%)" }}
    >
      {/* Blue glow — left */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 20% 60%, rgba(26,58,107,0.3) 0%, transparent 55%)" }} />
      {/* Gold glow — top right */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 80% 20%, rgba(201,168,76,0.1) 0%, transparent 50%)" }} />
      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(#C9A84C 1px, transparent 1px), linear-gradient(90deg, #C9A84C 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.3, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 border border-[#C9A84C]/30 rounded-full text-[#C9A84C] text-xs uppercase tracking-widest font-medium mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] inline-block animate-pulse" />
          BC Commercial Real Estate · Hospitality & Restaurant Sales
        </motion.div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-none mb-6" style={{ fontFamily: "var(--font-playfair)" }}>
          {HERO_WORDS.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.3, delay: 0.4 + i * 0.1, ease: "easeOut" }}
              className={`inline-block mr-3 ${word === "|" ? "text-[#C9A84C]/40 text-4xl md:text-5xl align-middle" : i % 2 === 0 || word === "Opportunities" ? "text-gradient" : "text-white"}`}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.3, delay: 1.2 }}
          className="text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ color: "#e8dfc8" }}
        >
          Exclusive, confidential listings of BC restaurant and hospitality businesses. NDA-protected.
          Represented by <span className="text-[#C9A84C]">CJ Kalra</span> · Century 21 Coastal Realty Ltd.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.3, delay: 1.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href={WA_HREF}
            target="_blank"
            rel="noopener noreferrer"
            onClick={trackWhatsAppLead}
            className="px-8 py-4 text-black font-bold rounded text-base transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg shadow-[#C9A84C]/20"
            style={{ background: "linear-gradient(135deg, #C9A84C, #a8893d)" }}
          >
            whatsapp Us
          </a>
          <a
            href="https://my-url.in/booking-link"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackSchedule()}
            className="px-8 py-4 border border-[#C9A84C] text-[#C9A84C] hover:bg-[#C9A84C]/10 font-bold rounded text-base transition-all duration-200"
          >
            Book Consultation
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: "-50px" }} transition={{ delay: 2, duration: 0.3 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ color: "#94a3b8" }}
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-5 h-8 border border-[#C9A84C]/20 rounded-full flex items-start justify-center pt-1.5">
          <div className="w-1 h-2 bg-[#C9A84C]/60 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
