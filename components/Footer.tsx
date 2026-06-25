"use client";

const SOCIAL = [
  {
    href: "https://www.facebook.com/realtorcj",
    label: "Facebook",
    svg: <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.413c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/></svg>,
  },
  {
    href: "https://www.instagram.com/bcrealestate.c21/",
    label: "Instagram",
    svg: <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>,
  },
  {
    href: "https://wa.me/17788969552",
    label: "WhatsApp",
    svg: <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>,
  },
  {
    href: "https://www.tiktok.com/@bcrealestatec21",
    label: "TikTok",
    svg: <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.79 1.54V6.79a4.85 4.85 0 01-1.03-.1z"/></svg>,
  },
  {
    href: "https://www.linkedin.com/in/dr-cj-kalra",
    label: "LinkedIn",
    svg: <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>,
  },
  {
    href: "https://x.com/DrCJKalra",
    label: "X (Twitter)",
    svg: <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.259 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
  },
  {
    href: "https://www.youtube.com/@realtorcj",
    label: "YouTube",
    svg: <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>,
  },
];

const scrollToSection = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

export default function Footer() {
  return (
    <footer style={{ background: "#050d1a", borderTop: "1px solid rgba(201,168,76,0.25)" }}>

      {/* ── 4-column main grid ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ paddingTop: "60px", paddingBottom: "60px" }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Col 1 — Brand */}
          <div className="lg:col-span-1">
            {/* Logo row */}
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm"
                style={{ background: "rgba(201,168,76,0.15)", border: "1px solid rgba(201,168,76,0.4)", color: "#C9A84C" }}
              >
                BCH
              </div>
              <div className="leading-tight">
                <p className="font-bold text-white text-sm">BC Hospitality Deals</p>
                <p className="text-xs font-semibold tracking-widest" style={{ color: "#C9A84C" }}>COMMERCIAL REAL ESTATE</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "#94a3b8" }}>
              Your trusted BC REALTOR® specializing in commercial hospitality and restaurant business sales across British Columbia.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3">
              {SOCIAL.map(({ href, label, svg }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                  style={{ border: "1px solid rgba(201,168,76,0.35)", color: "#C9A84C" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(201,168,76,0.15)";
                    (e.currentTarget as HTMLElement).style.borderColor = "#C9A84C";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,168,76,0.35)";
                  }}
                >
                  {svg}
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 — Quick Links */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: "#C9A84C" }}>QUICK LINKS</p>
            <ul className="space-y-3">
              {[
                { label: "Home", action: () => scrollToSection("home"), href: undefined },
                { label: "Current Listings", action: () => scrollToSection("listings"), href: undefined },
                { label: "Why Work With Us", action: () => scrollToSection("why-us"), href: undefined },
                { label: "Request Information", action: () => scrollToSection("form-section"), href: undefined },
                { label: "Book Consultation", action: undefined, href: "https://my-url.in/booking-link" },
              ].map(({ label, action, href }) => (
                <li key={label} className="flex items-center gap-2">
                  <span className="text-[#C9A84C] text-xs flex-shrink-0">•</span>
                  {href ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm transition-colors hover:text-[#C9A84C]"
                      style={{ color: "rgba(255,255,255,0.65)" }}
                    >
                      {label}
                    </a>
                  ) : (
                    <button
                      onClick={action}
                      className="text-sm text-left transition-colors hover:text-[#C9A84C]"
                      style={{ color: "rgba(255,255,255,0.65)" }}
                    >
                      {label}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Our Listings */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: "#C9A84C" }}>OUR LISTINGS</p>
            <ul className="space-y-3">
              {[
                "Prince George – Restaurant & Banquet Hall ($650K)",
                "McBride – Hotel Restaurant & Party Hall ($180K)",
                "Cache Creek – Standalone Highway Restaurant ($120K)",
                "Dawson Creek – Restaurant in Franchise Hotel ($140K)",
                "Off-Market Opportunities Available",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-[#C9A84C] text-xs flex-shrink-0 mt-0.5">•</span>
                  <button
                    onClick={() => scrollToSection("form-section")}
                    className="text-sm text-left leading-snug transition-colors hover:text-[#C9A84C]"
                    style={{ color: "rgba(255,255,255,0.65)" }}
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Contact */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: "#C9A84C" }}>CONTACT US</p>
            <ul className="space-y-3 mb-6">
              <li>
                <a href="tel:7788969552" className="flex items-center gap-3 text-sm transition-colors hover:text-[#C9A84C]" style={{ color: "rgba(255,255,255,0.75)" }}>
                  <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" style={{ color: "#C9A84C" }} viewBox="0 0 24 24">
                    <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.4 11.4 0 003.57.57 1 1 0 011 1V20a1 1 0 01-1 1C9.61 21 3 14.39 3 6a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.24 1.01l-2.21 2.21z"/>
                  </svg>
                  778-896-9552
                </a>
              </li>
              <li>
                <a href="mailto:cj.kalra@century21.ca" className="flex items-center gap-3 text-sm transition-colors hover:text-[#C9A84C]" style={{ color: "rgba(255,255,255,0.75)" }}>
                  <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" style={{ color: "#C9A84C" }} viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                  cj.kalra@century21.ca
                </a>
              </li>
              <li>
                <a href="https://bcrealestate.c21.ca/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm transition-colors hover:text-[#C9A84C]" style={{ color: "rgba(255,255,255,0.75)" }}>
                  <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" style={{ color: "#C9A84C" }} viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                  </svg>
                  bcrealestate.c21.ca
                </a>
              </li>
            </ul>
            <div style={{ borderTop: "1px solid rgba(201,168,76,0.15)", paddingTop: "16px" }}>
              <p className="font-bold text-white text-sm mb-0.5">CJ Kalra</p>
              <p className="text-xs leading-snug" style={{ color: "#94a3b8" }}>Business &amp; Commercial Real Estate Specialist</p>
              <p className="text-xs" style={{ color: "#94a3b8" }}>Century 21 Coastal Realty Ltd.</p>
            </div>
          </div>

        </div>
      </div>

      {/* ── Divider ── */}
      <div style={{ borderTop: "1px solid #1e3a5f" }} />

      {/* ── Bottom bar ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.3)", maxWidth: "520px" }}>
          All information is deemed reliable but not guaranteed. All businesses offered as commercial opportunities only. CJ Kalra is a licensed REALTOR® with Century 21 Coastal Realty Ltd., BC.
        </p>
        <p className="text-xs flex-shrink-0" style={{ color: "rgba(255,255,255,0.3)" }}>
          © 2026 BC Hospitality Deals | Century 21 Coastal Realty Ltd.
        </p>
      </div>

    </footer>
  );
}
