"use client";

import { motion } from "framer-motion";

const WHY_BC = [
  { icon: "🏔️", title: "Growing Market", desc: "BC's interior cities are experiencing population growth and rising demand for dining and hospitality services." },
  { icon: "📋", title: "Confidential Process", desc: "All listings handled with full NDA protection. Sellers remain anonymous until mutual interest is confirmed." },
  { icon: "🤝", title: "Expert Representation", desc: "CJ Kalra brings deep experience in BC commercial hospitality transactions and business sales." },
  { icon: "💼", title: "Turn-Key Operations", desc: "Listings include equipment, inventory, and established customer bases — ready to operate from day one." },
  { icon: "🏨", title: "Franchise Locations", desc: "Several listings are within established franchise hotel properties, providing built-in traffic and branding." },
  { icon: "📊", title: "Off-Market Access", desc: "Access exclusive off-market hospitality deals not listed publicly — registered buyers only." },
];

export default function WhyBcSection() {
  return (
    <section
      className="py-20"
      style={{
        background: "#0a1628",
        borderTop: "1px solid rgba(201,168,76,0.2)",
        borderBottom: "1px solid rgba(201,168,76,0.2)",
      }}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-14">
          <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: "-50px" }} className="text-[#C9A84C] text-xs uppercase tracking-widest font-medium">Why BC</motion.span>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.3, delay: 0.1 }} className="text-4xl md:text-5xl font-bold text-white mt-2" style={{ fontFamily: "var(--font-playfair)" }}>
            The BC Advantage
          </motion.h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {WHY_BC.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.3, delay: i * 0.1 }}
              className="rounded-xl p-6 transition-all duration-300 group"
              style={{
                background: "linear-gradient(145deg, #0a1628, #0d1f3c)",
                border: "1px solid rgba(201,168,76,0.15)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,168,76,0.5)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 30px rgba(26,58,107,0.3)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,168,76,0.15)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-[#C9A84C] transition-colors">{item.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#94a3b8" }}>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
