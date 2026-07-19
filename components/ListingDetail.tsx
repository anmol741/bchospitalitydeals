"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RequestInfoForm from "@/components/RequestInfoForm";
import { trackContact, trackSchedule } from "@/lib/fbpixel";

interface DetailRow {
  label: string;
  value: string;
}

export interface ListingDetailData {
  location: string;
  name: string;
  price: string;
  mls: string;
  sizeLabel: string;
  propertyName: string;
  highlights: string[];
  about: string;
  leaseDetails: DetailRow[];
  businessInfo: DetailRow[];
}

function DetailTable({ title, rows }: { title: string; rows: DetailRow[] }) {
  return (
    <div className="mb-10">
      <h2
        className="text-xl font-bold text-white mb-4"
        style={{ fontFamily: "var(--font-playfair)" }}
      >
        {title}
      </h2>
      <div
        className="rounded-lg overflow-hidden"
        style={{ border: "1px solid rgba(201,168,76,0.2)" }}
      >
        <table className="w-full text-sm">
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={row.label}
                style={{
                  background: i % 2 === 0 ? "#0a1628" : "#0d1f3c",
                }}
              >
                <td
                  className="px-4 py-3 font-semibold"
                  style={{ color: "#C9A84C", width: "45%" }}
                >
                  {row.label}
                </td>
                <td className="px-4 py-3" style={{ color: "#e8dfc8" }}>
                  {row.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function ListingDetail({ data }: { data: ListingDetailData }) {
  return (
    <>
      <Navbar />
      <main
        className="flex-1"
        style={{ background: "#050d1a", minHeight: "100vh" }}
      >
        <div className="max-w-6xl mx-auto px-4 pt-28 pb-20">
          {/* Back link */}
          <Link
            href="/#listings"
            className="inline-flex items-center gap-2 text-sm font-semibold mb-8 transition-colors hover:opacity-80"
            style={{ color: "#C9A84C" }}
          >
            ← Back to Listings
          </Link>

          {/* Header badges */}
          <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#C9A84C]/10 border border-[#C9A84C]/30 rounded-full text-[#C9A84C] text-xs font-medium tracking-wide">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              {data.location}
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-500/10 border border-green-500/30 rounded-full text-green-400 text-[10px] font-medium uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Active Listing
            </span>
          </div>

          {/* Hero */}
          <h1
            className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {data.name}
          </h1>
          <div className="flex items-center flex-wrap gap-x-6 gap-y-2 mb-12 pb-8" style={{ borderBottom: "1px solid rgba(201,168,76,0.15)" }}>
            <span
              className="text-4xl md:text-5xl font-bold text-[#C9A84C]"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {data.price}
            </span>
            <span className="text-sm" style={{ color: "#94a3b8" }}>
              <span style={{ color: "#C9A84C", fontWeight: 600 }}>MLS®</span> {data.mls}
            </span>
            <span className="text-sm" style={{ color: "#94a3b8" }}>{data.sizeLabel}</span>
          </div>

          {/* Two column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left column */}
            <div className="lg:col-span-2">
              {/* Highlights */}
              <div className="mb-10">
                <h2
                  className="text-xl font-bold text-white mb-4"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  Property Highlights
                </h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {data.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-sm" style={{ color: "#e8dfc8" }}>
                      <svg
                        className="w-4 h-4 text-[#C9A84C] mt-0.5 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              {/* About */}
              <div className="mb-10">
                <h2
                  className="text-xl font-bold text-white mb-4"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  About This Opportunity
                </h2>
                <p className="text-sm leading-relaxed" style={{ color: "#e8dfc8" }}>
                  {data.about}
                </p>
              </div>

              <DetailTable title="Lease & Financial Details" rows={data.leaseDetails} />
              <DetailTable title="Business Information" rows={data.businessInfo} />
            </div>

            {/* Right column */}
            <div className="lg:col-span-1">
              <div className="flex flex-col gap-5 lg:sticky lg:top-28">
                {/* Contact card */}
                <div
                  className="rounded-xl p-6"
                  style={{ background: "#0d1f3c", border: "1px solid rgba(201,168,76,0.2)" }}
                >
                  <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#C9A84C" }}>
                    Interested In This Listing?
                  </p>
                  <div className="flex flex-col gap-3">
                    <Link
                      href="#form-section"
                      className="w-full text-center px-4 py-3 bg-[#C9A84C] hover:bg-[#E5C97A] text-[#0D0D0D] font-semibold rounded text-sm transition-all duration-200 hover:scale-[1.02] active:scale-95"
                    >
                      Request Information
                    </Link>
                    <a
                      href="https://my-url.in/booking-link"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackSchedule()}
                      className="w-full text-center px-4 py-3 border border-[#C9A84C]/50 text-[#C9A84C] hover:bg-[#C9A84C]/10 font-semibold rounded text-sm transition-all duration-200 hover:border-[#C9A84C]"
                    >
                      Book Consultation
                    </a>
                  </div>
                </div>

                {/* CJ Kalra card */}
                <div
                  className="rounded-xl p-6 text-center"
                  style={{ background: "#0d1f3c", border: "1px solid rgba(201,168,76,0.2)" }}
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto"
                    style={{ background: "#112244", border: "2px solid rgba(201,168,76,0.3)" }}
                  >
                    <svg className="w-9 h-9" fill="#C9A84C" viewBox="0 0 24 24">
                      <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1" style={{ fontFamily: "var(--font-playfair)" }}>
                    CJ Kalra
                  </h3>
                  <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "#C9A84C" }}>
                    Business &amp; Commercial Real Estate Specialist
                  </p>
                  <p className="text-xs mb-4" style={{ color: "#94a3b8" }}>Century 21 Coastal Realty Ltd.</p>
                  <div className="flex flex-col gap-2">
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
                        onClick={href.startsWith("tel:") ? () => trackContact("Phone Call") : undefined}
                        className="flex items-center justify-center gap-2 text-sm transition-opacity hover:opacity-80"
                        style={{ color: "#C9A84C" }}
                      >
                        <span>{icon}</span>
                        {label}
                      </a>
                    ))}
                  </div>
                </div>

                {/* BC PNP box */}
                <div
                  className="rounded-xl p-6"
                  style={{ background: "#0a1628", border: "1px solid #C9A84C" }}
                >
                  <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#C9A84C" }}>
                    BC PNP Entrepreneur Immigration Opportunity
                  </p>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: "#e8dfc8" }}>
                    This listing may qualify for the BC Regional Entrepreneur Immigration Stream.
                  </p>
                  <div className="flex flex-col gap-1 mb-4 text-sm" style={{ color: "#e8dfc8" }}>
                    <p><span style={{ color: "#C9A84C", fontWeight: 600 }}>Min. Investment:</span> $100,000</p>
                    <p><span style={{ color: "#C9A84C", fontWeight: 600 }}>Min. Net Worth:</span> $300,000</p>
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: "#94a3b8" }}>
                    CJ Kalra is both a licensed Realtor AND RCIC (R708868).
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer disclaimer */}
          <p className="text-center mt-16 pt-8" style={{ color: "#6b7280", fontSize: "11px", lineHeight: "1.6", borderTop: "1px solid rgba(201,168,76,0.15)" }}>
            Do not disturb business operations. All information subject to verification.
          </p>
        </div>

        <RequestInfoForm defaultProperty={data.propertyName} />
      </main>
      <Footer />
    </>
  );
}
