"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToForm = () => {
    setMenuOpen(false);
    document.getElementById("form-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={scrolled ? {
        background: "rgba(5,13,26,0.95)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(201,168,76,0.25)",
        boxShadow: "0 4px 30px rgba(0,0,0,0.7)",
      } : { background: "transparent" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex flex-col leading-none group">
            <span
              className="text-[#C9A84C] font-heading font-bold text-xl md:text-2xl tracking-tight group-hover:text-[#E5C97A] transition-colors"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              BC Hospitality
            </span>
            <span className="text-white/60 text-xs tracking-widest uppercase">
              Deals
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            <a
              href="tel:7788969552"
              className="flex items-center gap-2 text-[#C9A84C] hover:text-[#E5C97A] transition-colors font-medium"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.4 11.4 0 003.57.57 1 1 0 011 1V20a1 1 0 01-1 1C9.61 21 3 14.39 3 6a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.24 1.01l-2.21 2.21z" />
              </svg>
              778-896-9552
            </a>
            <button
              onClick={scrollToForm}
              className="px-5 py-2.5 bg-[#C9A84C] hover:bg-[#E5C97A] text-[#0D0D0D] font-semibold rounded text-sm transition-all duration-200 hover:scale-105 active:scale-95"
            >
              Request Info
            </button>
          </div>

          {/* Mobile: phone + hamburger */}
          <div className="flex md:hidden items-center gap-3">
            <a
              href="tel:7788969552"
              className="text-[#C9A84C] text-sm font-medium"
            >
              778-896-9552
            </a>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white p-1"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden"
            style={{ background: "rgba(5,13,26,0.98)", borderTop: "1px solid rgba(201,168,76,0.25)" }}
          >
            <div className="px-4 py-4 flex flex-col gap-3">
              <button
                onClick={scrollToForm}
                className="w-full px-5 py-3 bg-[#C9A84C] hover:bg-[#E5C97A] text-[#0D0D0D] font-semibold rounded text-sm transition-all"
              >
                Request Information
              </button>
              <a
                href="https://my-url.in/booking-link"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full px-5 py-3 border border-[#C9A84C] text-[#C9A84C] font-semibold rounded text-sm text-center transition-all hover:bg-[#C9A84C]/10"
                onClick={() => setMenuOpen(false)}
              >
                Book Consultation
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
