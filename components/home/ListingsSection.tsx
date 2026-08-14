"use client";

import { motion } from "framer-motion";
import ListingCard from "@/components/ListingCard";

const LISTINGS = [
  {
    location: "Prince George, BC",
    title: "Restaurant & Banquet Hall",
    price: "$650,000",
    mls: "C8079611",
    features: [
      "~9,000 sq ft full-service facility",
      "Located in franchise hotel complex",
      "Rent under $11,000/month",
      "Banquet capacity — events & weddings",
      "Full commercial kitchen equipment",
    ],
    badge: "PREMIUM",
    value: "Prince George Restaurant ($650K)",
    detailsHref: "/listings/prince-george",
  },
  {
    location: "McBride, BC",
    title: "Highway Restaurant & Party Hall",
    price: "$180,000",
    mls: "C8079536",
    features: [
      "Prime highway location",
      "Located in franchise hotel",
      "Rent ~$4,700/mo — all inclusive",
      "Party hall for events",
      "Established local clientele",
    ],
    value: "McBride Restaurant ($180K)",
    detailsHref: "/listings/mcbride",
  },
  {
    location: "Cache Creek, BC",
    title: "Only Restaurant in Town — with Patio",
    price: "$120,000",
    mls: "10391540",
    address: "987 Trans Canada Highway, Cache Creek, BC V0K 1H0",
    features: [
      "No restaurant competition in town",
      "Outdoor patio seating",
      "Rent ~$2,000/month",
      "Strong local & traveller traffic",
      "Turn-key operation",
    ],
    badge: "EXCLUSIVE",
    value: "Cache Creek Restaurant ($120K)",
    detailsHref: "/listings/cache-creek",
  },
  {
    location: "Dawson Creek, BC",
    title: "Restaurant in Franchise Hotel",
    price: "$140,000",
    mls: "10392063",
    address: "800 120 Avenue, Dawson Creek, BC V1G 3H7",
    features: [
      "In-hotel restaurant location",
      "Rent ~$4,000/month",
      "Built-in hotel guest traffic",
      "Full kitchen setup included",
      "Established operation",
    ],
    value: "Dawson Creek Restaurant ($140K)",
    detailsHref: "/listings/dawson-creek",
  },
  {
    location: "Merritt, BC",
    title: "14-Unit Motel with Owner Residence",
    price: "$1,800,000",
    mls: "10396244",
    features: [
      "14-unit motel + 3-bed owner/manager residence",
      "Turnkey operation — proven income",
      "Easy highway access & excellent visibility",
      "Mix of monthly & daily rentals",
      "0.25 acre freehold land",
    ],
    value: "Merritt Motel ($1.8M)",
    detailsHref: "/listings/merritt-motel",
  },
];

const scrollToForm = () =>
  document.getElementById("form-section")?.scrollIntoView({ behavior: "smooth" });

export default function ListingsSection() {
  return (
    <section className="py-20 px-4 max-w-7xl mx-auto" id="listings" style={{ background: "#050d1a" }}>
      <div className="text-center mb-14">
        <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: "-50px" }} className="text-[#C9A84C] text-xs uppercase tracking-widest font-medium">Current Listings</motion.span>
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.3, delay: 0.1 }} className="text-4xl md:text-5xl font-bold text-white mt-2" style={{ fontFamily: "var(--font-playfair)" }}>
          Exclusive Opportunities
        </motion.h2>
        <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.3, delay: 0.2 }} className="mt-3 max-w-xl mx-auto" style={{ color: "#94a3b8" }}>
          All listings are confidential. An NDA is required to receive full financial details and business information.
        </motion.p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {LISTINGS.map((listing, i) => (
          <ListingCard key={listing.value} {...listing} index={i} onRequestInfo={scrollToForm} mls={listing.mls} address={listing.address} detailsHref={listing.detailsHref} />
        ))}
      </div>

      {/* Ticker bar */}
      <div className="flex items-center justify-center gap-2 mt-8 mb-6">
        <span className="w-2 h-2 rounded-full bg-blue-400 inline-block flex-shrink-0" />
        <span className="text-xs text-center" style={{ color: "#94a3b8" }}>
          All Listings Coming to MLS — Register Your Interest Now to Be First in Line
        </span>
      </div>

      {/* Off-market banner */}
      <div
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 rounded-xl p-6"
        style={{ background: "#0d1f3c", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "12px" }}
      >
        <div className="flex items-start gap-4">
          <div
            className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-xl"
            style={{ background: "rgba(201,168,76,0.15)", border: "1px solid rgba(201,168,76,0.35)" }}
          >
            🔒
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "#C9A84C" }}>
              NOT ON MLS — PRIVATE NETWORK ONLY
            </p>
            <p className="font-semibold text-white mb-2" style={{ fontFamily: "var(--font-playfair)" }}>
              Additional Off-Market Opportunities Available
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "#94a3b8" }}>
              Beyond these MLS listings, we have access to additional restaurant opportunities within hotels and motels across British Columbia, available through our professional network. Contact us directly to discuss what is currently available.
            </p>
          </div>
        </div>
        <button
          onClick={scrollToForm}
          className="flex-shrink-0 flex items-center justify-center gap-2 px-5 py-3 rounded font-semibold text-xs tracking-wider transition-all hover:opacity-90 active:scale-95 w-full sm:w-auto"
          style={{ background: "linear-gradient(135deg, #C9A84C, #a8893d)", color: "#000000", whiteSpace: "nowrap" }}
        >
          🔑 REQUEST INFORMATION
        </button>
      </div>

      {/* Disclaimer */}
      <p className="text-center mt-5" style={{ color: "#6b7280", fontSize: "11px", lineHeight: "1.6" }}>
        * Rent figures are approximate and provided for general reference only. All rents are subject to verification during due diligence. Net rents are exclusive of operating costs, taxes, and strata fees unless noted as all-inclusive. Buyers are advised to confirm all lease terms directly with the landlord or their representative.
      </p>
    </section>
  );
}
