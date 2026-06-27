"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, useInView, animate, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CountryCodeSelect from "@/components/CountryCodeSelect";
import ListingCard from "@/components/ListingCard";
import { submitToCRM } from "@/lib/submitToCRM";
type ContactFormParams = {
  name: string; email: string; countryCode: string; phone: string;
  property: string; buyerProfile: string; budget: string;
  timeline: string; ndaComfort: string; details: string;
};
// ─── Data ────────────────────────────────────────────────────────────────────

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
  },
];

const PROPERTIES = [
  "Prince George Restaurant ($650K)",
  "McBride Restaurant ($180K)",
  "Cache Creek Restaurant ($120K)",
  "Dawson Creek Restaurant ($140K)",
  "Hotels",
  "Restaurants in Other Area in BC",
  "Restaurants in Lower Mainland BC",
  "Other Business",
];

const BUYER_PROFILES = [
  "First-Time Buyer",
  "Owner-Operator",
  "Investor",
  "International Buyer",
  "RCIC (Referring Client)",
  "Realtor (Co-op)",
  "Other",
];

const BUDGETS = [
  "$50K – $100K",
  "$100K – $200K",
  "Up to $500K",
  "$500K – $1M",
  "$1M – $2M",
  "$2M – $5M",
];

const TIMELINES = [
  "Immediately",
  "Within 3 months",
  "3–6 months",
  "6+ months",
  "Just Exploring",
];

const NDA_OPTIONS = [
  "Yes",
  "No",
  "Need More Information",
];

const WHY_BC = [
  { icon: "🏔️", title: "Growing Market", desc: "BC's interior cities are experiencing population growth and rising demand for dining and hospitality services." },
  { icon: "📋", title: "Confidential Process", desc: "All listings handled with full NDA protection. Sellers remain anonymous until mutual interest is confirmed." },
  { icon: "🤝", title: "Expert Representation", desc: "CJ Kalra brings deep experience in BC commercial hospitality transactions and business sales." },
  { icon: "💼", title: "Turn-Key Operations", desc: "Listings include equipment, inventory, and established customer bases — ready to operate from day one." },
  { icon: "🏨", title: "Franchise Locations", desc: "Several listings are within established franchise hotel properties, providing built-in traffic and branding." },
  { icon: "📊", title: "Off-Market Access", desc: "Access exclusive off-market hospitality deals not listed publicly — registered buyers only." },
];

// ─── Count-up ─────────────────────────────────────────────────────────────────

function useCountUp(target: number, duration = 1.8, shouldStart = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!shouldStart) return;
    const controls = animate(0, target, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => setCount(Math.round(v)),
    });
    return controls.stop;
  }, [shouldStart, target, duration]);
  return count;
}

function StatItem({ value, suffix = "", prefix = "", label, isInView }: {
  value: number; suffix?: string; prefix?: string; label: string; isInView: boolean;
}) {
  const count = useCountUp(value, 1.8, isInView);
  return (
    <div className="flex flex-col items-center text-center px-4">
      <div className="text-3xl md:text-4xl font-bold text-[#C9A84C] mb-1" style={{ fontFamily: "var(--font-playfair)" }}>
        {prefix}{count}{suffix}
      </div>
      <div className="text-sm uppercase tracking-widest font-medium" style={{ color: "#94a3b8" }}>{label}</div>
    </div>
  );
}

// ─── Field helpers ────────────────────────────────────────────────────────────

const INPUT_BASE = "w-full px-4 py-3 border rounded-lg text-white text-sm focus:outline-none transition-colors";
const INPUT_NORMAL = `${INPUT_BASE} border-[#C9A84C]/20 focus:border-[#C9A84C]`;
const INPUT_ERROR = `${INPUT_BASE} border-red-500/70 focus:border-red-500`;
const INPUT_BG: React.CSSProperties = { background: "#0a1628" };

function FieldError({ msg }: { msg?: string }) {
  return (
    <AnimatePresence>
      {msg && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.2 }}
          className="mt-1.5 text-red-400 text-xs flex items-center gap-1"
        >
          <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {msg}
        </motion.p>
      )}
    </AnimatePresence>
  );
}

// ─── HomePage ─────────────────────────────────────────────────────────────────

type FormErrors = Partial<Record<keyof ContactFormParams | "privacy", string>>;

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

function FaqSection() {
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

const HERO_WORDS = ["Exclusive", "|", "Confidential", "|", "Business", "Opportunities"];

export default function HomePage() {
  const statsRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-80px" });

  // ── form state
  const [fd, setFd] = useState<ContactFormParams>({
    name: "",
    email: "",
    countryCode: "+1",
    phone: "",
    property: "",
    buyerProfile: "",
    budget: "",
    timeline: "",
    ndaComfort: "",
    details: "",
  });
  const [selectedCountryName, setSelectedCountryName] = useState("Canada");
  const [privacyChecked, setPrivacyChecked] = useState(false);

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const set = useCallback(<K extends keyof ContactFormParams>(k: K, v: ContactFormParams[K]) => {
    setFd((prev) => ({ ...prev, [k]: v }));
    setErrors((prev) => ({ ...prev, [k]: undefined }));
  }, []);

  const scrollToForm = () =>
    document.getElementById("form-section")?.scrollIntoView({ behavior: "smooth" });

  // ── validation
  const validate = (): FormErrors => {
    const e: FormErrors = {};
    if (!fd.name.trim()) e.name = "Full name is required.";
    if (!fd.email.trim()) {
      e.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fd.email)) {
      e.email = "Please enter a valid email address.";
    }
    if (!fd.phone.trim()) {
      e.phone = "Phone number is required.";
    } else if (fd.phone.replace(/\D/g, "").length < 7) {
      e.phone = "Phone number must be at least 7 digits.";
    }
    if (!fd.property) e.property = "Please select a property.";
    if (!fd.buyerProfile) e.buyerProfile = "Please select your buyer profile.";
    if (!fd.budget) e.budget = "Please select your purchase budget.";
    if (!fd.timeline) e.timeline = "Please select your buying timeline.";
    if (!fd.ndaComfort) e.ndaComfort = "Please select an option.";
    if (!privacyChecked) e.privacy = "You must agree to the Privacy Policy.";
    return e;
  };

  // ── scroll to first error field
  const scrollToFirstError = (errs: FormErrors) => {
    const order: Array<keyof FormErrors> = [
      "name", "email", "phone", "property", "buyerProfile", "budget", "timeline", "ndaComfort", "privacy",
    ];
    for (const key of order) {
      if (errs[key]) {
        const el = document.getElementById(`field-${key}`);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
          (el.querySelector("input,select,textarea") as HTMLElement | null)?.focus();
        }
        break;
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      scrollToFirstError(errs);
      return;
    }
    setSubmitting(true);
    submitToCRM({
      contact_name: fd.name,
      contact_email: fd.email,
      contact_phone: fd.countryCode + fd.phone,
      contact_source: 'BC Hospitality Deals Website',
      'which_p_wshrbo': fd.property,
      'buyer_profile__ajl': fd.buyerProfile,
      'purchase_budget__tsm': fd.budget,
      'when_ar_jlvatx': fd.timeline,
      'are_you_qnylji': fd.ndaComfort,
      'additio_ewnbhy': fd.details,
    });
    setSubmitted(true);
    setSubmitting(false);
  };

  
  const inputClass = (key: keyof FormErrors) =>
    errors[key] ? INPUT_ERROR : INPUT_NORMAL;

  const selectClass = (key: keyof FormErrors) =>
    `${inputClass(key)} appearance-none cursor-pointer`;

  return (
    <>
      <Navbar />
      <main className="flex-1">

        {/* ── Hero ── */}
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
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
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
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + i * 0.1, ease: "easeOut" }}
                  className={`inline-block mr-3 ${word === "|" ? "text-[#C9A84C]/40 text-4xl md:text-5xl align-middle" : i % 2 === 0 || word === "Opportunities" ? "text-gradient" : "text-white"}`}
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.2 }}
              className="text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
              style={{ color: "#e8dfc8" }}
            >
              Exclusive, confidential listings of BC restaurant and hospitality businesses. NDA-protected.
              Represented by <span className="text-[#C9A84C]">CJ Kalra</span> · Century 21 Coastal Realty Ltd.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <button
                onClick={scrollToForm}
                className="px-8 py-4 text-black font-bold rounded text-base transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg shadow-[#C9A84C]/20"
                style={{ background: "linear-gradient(135deg, #C9A84C, #a8893d)" }}
              >
                Request Information
              </button>
              <a
                href="https://my-url.in/booking-link"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 border border-[#C9A84C] text-[#C9A84C] hover:bg-[#C9A84C]/10 font-bold rounded text-base transition-all duration-200"
              >
                Book Consultation
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 0.6 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            style={{ color: "#94a3b8" }}
          >
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-5 h-8 border border-[#C9A84C]/20 rounded-full flex items-start justify-center pt-1.5">
              <div className="w-1 h-2 bg-[#C9A84C]/60 rounded-full" />
            </motion.div>
          </motion.div>
        </section>

        {/* ── Stats ── */}
        <section
          ref={statsRef}
          className="py-10"
          style={{
            background: "linear-gradient(135deg, #0a1628 0%, #0d1f3c 50%, #0a1628 100%)",
            borderTop: "1px solid rgba(201,168,76,0.4)",
            borderBottom: "1px solid rgba(201,168,76,0.4)",
          }}
        >
          <div className="max-w-5xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6" style={{ borderColor: "rgba(201,168,76,0.15)" }}>
              <StatItem value={4} suffix=" Listings" label="Active" isInView={statsInView} />
              <StatItem value={1090} prefix="$" suffix="K" label="Combined Value" isInView={statsInView} />
              <StatItem value={4} label="Restaurants & Motels" isInView={statsInView} />
              <div className="flex flex-col items-center text-center px-4">
                <div className="text-3xl md:text-4xl font-bold text-[#C9A84C] mb-1" style={{ fontFamily: "var(--font-playfair)" }}>NDA</div>
                <div className="text-sm uppercase tracking-widest font-medium" style={{ color: "#94a3b8" }}>Protected</div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Listings ── */}
        <section className="py-20 px-4 max-w-7xl mx-auto" id="listings" style={{ background: "#050d1a" }}>
          <div className="text-center mb-14">
            <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-[#C9A84C] text-xs uppercase tracking-widest font-medium">Current Listings</motion.span>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="text-4xl md:text-5xl font-bold text-white mt-2" style={{ fontFamily: "var(--font-playfair)" }}>
              Exclusive Opportunities
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="mt-3 max-w-xl mx-auto" style={{ color: "#94a3b8" }}>
              All listings are confidential. An NDA is required to receive full financial details and business information.
            </motion.p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {LISTINGS.map((listing, i) => (
              <ListingCard key={listing.value} {...listing} index={i} onRequestInfo={scrollToForm} mls={listing.mls} address={listing.address} />
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
              className="flex-shrink-0 flex items-center gap-2 px-5 py-3 rounded font-semibold text-xs tracking-wider transition-all hover:opacity-90 active:scale-95"
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

        {/* ── Why BC ── */}
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
              <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-[#C9A84C] text-xs uppercase tracking-widest font-medium">Why BC</motion.span>
              <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="text-4xl md:text-5xl font-bold text-white mt-2" style={{ fontFamily: "var(--font-playfair)" }}>
                The BC Advantage
              </motion.h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {WHY_BC.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.5, delay: i * 0.1 }}
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

        {/* ── Why Work With Us ── */}
        <section className="py-20 px-4" style={{ background: "#0a1628" }}>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

              {/* Left — Agent card */}
              <motion.div
                initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.7 }}
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
                viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}
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

        {/* ── Immigration / RCIC ── */}
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
                {[
                  "International Entrepreneurs",
                  "Business Investors",
                  "Owner-Operators",
                  "Provincial Entrepreneur Stream Candidates",
                  "Individuals Seeking Active Business Ownership",
                ].map((item) => (
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

        {/* ── Request Information (unified) ── */}
        <section
          id="form-section"
          className="py-20 px-4"
          style={{
            background: "#050d1a",
            borderTop: "1px solid rgba(201,168,76,0.2)",
            borderBottom: "1px solid rgba(201,168,76,0.2)",
          }}
        >
          <div className="max-w-6xl mx-auto">

            {/* Header */}
            <div className="text-center mb-14">
              <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "#C9A84C" }}>
                CONFIDENTIAL INQUIRY
              </p>
              <div className="w-12 h-px mx-auto mb-5" style={{ background: "#C9A84C" }} />
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
                Request Information
              </h2>
              <p className="max-w-2xl mx-auto text-sm leading-relaxed" style={{ color: "#94a3b8" }}>
                All inquiries are fully confidential. An NDA will be required before full details are shared, asset sold as-is, or can be taken before we proceed.
              </p>
            </div>

            {/* 2-column layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

              {/* ── Left column ── */}
              <div className="flex flex-col gap-4">
                {[
                  { icon: "🔒", title: "100% Confidential", desc: "All inquiries handled with complete discretion. Your information is never shared." },
                  { icon: "⏰", title: "Response Within 1 Business Day", desc: "A qualified specialist will follow up promptly to discuss your requirements." },
                  { icon: "📋", title: "NDA at No Cost", desc: "A Confidentiality Agreement is provided electronically at no cost to the buyer." },
                  { icon: "🔍", title: "Off-Market Access Available", desc: "Additional hotel and motel restaurant opportunities available through our professional network." },
                ].map((card) => (
                  <div
                    key={card.title}
                    className="flex items-start gap-4 rounded-lg p-5"
                    style={{
                      background: "#0d1f3c",
                      border: "1px solid rgba(201,168,76,0.15)",
                      borderLeft: "3px solid #C9A84C",
                    }}
                  >
                    <span className="text-2xl flex-shrink-0 mt-0.5">{card.icon}</span>
                    <div>
                      <p className="font-semibold text-white text-sm mb-1">{card.title}</p>
                      <p className="text-xs leading-relaxed" style={{ color: "#94a3b8" }}>{card.desc}</p>
                    </div>
                  </div>
                ))}

                {/* Prefer to call box */}
                <div
                  className="rounded-lg p-5 mt-2"
                  style={{ background: "#0d1f3c", border: "1px solid rgba(201,168,76,0.35)" }}
                >
                  <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#C9A84C" }}>
                    PREFER TO CALL?
                  </p>
                  <a href="tel:7788969552" className="block text-2xl font-bold text-white hover:text-[#C9A84C] transition-colors mb-2">
                    778-896-9552
                  </a>
                  <a href="mailto:cj.kalra@century21.ca" className="text-sm hover:opacity-80 transition-opacity" style={{ color: "#C9A84C" }}>
                    cj.kalra@century21.ca
                  </a>
                </div>
              </div>

              {/* ── Right column — form / success ── */}
              <div
                className="rounded-2xl p-6 md:p-8"
                style={{
                  background: "linear-gradient(145deg, #0a1628, #0d1f3c)",
                  border: submitted ? "2px solid rgba(201,168,76,0.5)" : "1px solid rgba(201,168,76,0.2)",
                }}
              >
                {submitted ? (
                  <div className="flex flex-col items-center justify-center text-center py-12 px-4">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                      style={{ background: "rgba(201,168,76,0.15)", border: "1px solid rgba(201,168,76,0.5)" }}
                    >
                      <svg className="w-8 h-8 text-[#C9A84C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-playfair)" }}>
                      Thank You!
                    </h3>
                    <p className="text-sm leading-relaxed max-w-sm" style={{ color: "#e8dfc8" }}>
                      We have received your inquiry. CJ Kalra will be in touch within 1 business day.
                    </p>
                  </div>
                ) : (
                <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-6">

                  {/* Full Name */}
                  <div id="field-name">
                    <label className="block text-sm font-medium mb-1.5" style={{ color: "#e8dfc8" }}>
                      Full Name <span className="text-[#C9A84C]">*</span>
                    </label>
                    <input
                      type="text"
                      value={fd.name}
                      onChange={(e) => set("name", e.target.value)}
                      placeholder="Your full name"
                      className={inputClass("name")}
                      style={INPUT_BG}
                    />
                    <FieldError msg={errors.name} />
                  </div>

                  {/* Email */}
                  <div id="field-email">
                    <label className="block text-sm font-medium mb-1.5" style={{ color: "#e8dfc8" }}>
                      Email Address <span className="text-[#C9A84C]">*</span>
                    </label>
                    <input
                      type="email"
                      value={fd.email}
                      onChange={(e) => set("email", e.target.value)}
                      placeholder="you@email.com"
                      className={inputClass("email")}
                      style={INPUT_BG}
                    />
                    <FieldError msg={errors.email} />
                  </div>

                  {/* Phone */}
                  <div id="field-phone">
                    <label className="block text-sm font-medium mb-1.5" style={{ color: "#e8dfc8" }}>
                      Phone Number <span className="text-[#C9A84C]">*</span>
                    </label>
                    <div className="flex gap-2">
                      <CountryCodeSelect
                        dialCode={fd.countryCode}
                        countryName={selectedCountryName}
                        onChange={(dialCode, name) => {
                          set("countryCode", dialCode);
                          setSelectedCountryName(name);
                        }}
                        hasError={!!errors.phone}
                      />
                      <input
                        type="tel"
                        value={fd.phone}
                        onChange={(e) => set("phone", e.target.value)}
                        placeholder="604 555 0123"
                        className={`${inputClass("phone")} flex-1`}
                        style={INPUT_BG}
                      />
                    </div>
                    <FieldError msg={errors.phone} />
                  </div>

                  {/* Property */}
                  <div id="field-property">
                    <label className="block text-sm font-medium mb-1.5" style={{ color: "#e8dfc8" }}>
                      Which Property are you interested in? <span className="text-[#C9A84C]">*</span>
                    </label>
                    <div className="relative">
                      <select value={fd.property} onChange={(e) => set("property", e.target.value)} className={selectClass("property")} style={INPUT_BG}>
                        <option value="" disabled>Select a property…</option>
                        {PROPERTIES.map((p) => <option key={p}>{p}</option>)}
                      </select>
                      <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C9A84C]/40 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </div>
                    <FieldError msg={errors.property} />
                  </div>

                  {/* Buyer Profile */}
                  <div id="field-buyerProfile">
                    <label className="block text-sm font-medium mb-1.5" style={{ color: "#e8dfc8" }}>
                      Buyer Profile <span className="text-[#C9A84C]">*</span>
                    </label>
                    <div className="relative">
                      <select value={fd.buyerProfile} onChange={(e) => set("buyerProfile", e.target.value)} className={selectClass("buyerProfile")} style={INPUT_BG}>
                        <option value="" disabled>Select your profile…</option>
                        {BUYER_PROFILES.map((p) => <option key={p}>{p}</option>)}
                      </select>
                      <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C9A84C]/40 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </div>
                    <FieldError msg={errors.buyerProfile} />
                  </div>

                  {/* Budget */}
                  <div id="field-budget">
                    <label className="block text-sm font-medium mb-0.5" style={{ color: "#e8dfc8" }}>
                      Purchase Budget <span className="text-[#C9A84C]">*</span>
                    </label>
                    <p className="text-xs mb-1.5" style={{ color: "#94a3b8" }}>Total selling price of the business/real estate you want to buy</p>
                    <div className="relative">
                      <select value={fd.budget} onChange={(e) => set("budget", e.target.value)} className={selectClass("budget")} style={INPUT_BG}>
                        <option value="" disabled>Select budget range…</option>
                        {BUDGETS.map((b) => <option key={b}>{b}</option>)}
                      </select>
                      <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C9A84C]/40 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </div>
                    <FieldError msg={errors.budget} />
                  </div>

                  {/* Timeline */}
                  <div id="field-timeline">
                    <label className="block text-sm font-medium mb-3" style={{ color: "#e8dfc8" }}>
                      When are you hoping to buy? <span className="text-[#C9A84C]">*</span>
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {TIMELINES.map((t) => {
                        const active = fd.timeline === t;
                        return (
                          <label
                            key={t}
                            className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border cursor-pointer transition-all text-sm select-none ${active ? "border-[#C9A84C] bg-[#C9A84C]/10 text-[#C9A84C]" : "border-[#C9A84C]/15 hover:border-[#C9A84C]/40"} ${errors.timeline && !active ? "border-red-500/40" : ""}`}
                            style={{ color: active ? undefined : "#94a3b8" }}
                          >
                            <input type="radio" name="timeline" value={t} checked={active} onChange={() => set("timeline", t)} className="sr-only" />
                            <span className={`w-3.5 h-3.5 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${active ? "border-[#C9A84C] bg-[#C9A84C]" : "border-[#C9A84C]/30"}`}>
                              {active && <span className="w-1.5 h-1.5 rounded-full bg-[#050d1a]" />}
                            </span>
                            {t}
                          </label>
                        );
                      })}
                    </div>
                    <FieldError msg={errors.timeline} />
                  </div>

                  {/* NDA Comfort */}
                  <div id="field-ndaComfort">
                    <label className="block text-sm font-medium mb-1" style={{ color: "#e8dfc8" }}>
                      Are you comfortable signing an NDA before receiving private financials? <span className="text-[#C9A84C]">*</span>
                    </label>
                    <p className="text-xs leading-relaxed mb-3" style={{ color: "#94a3b8" }}>
                      An NDA is a confidentiality agreement signed before receiving private business details such as exact address, financials, lease information, staff details, or seller information. It protects the seller&apos;s confidential business.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2">
                      {NDA_OPTIONS.map((opt) => {
                        const active = fd.ndaComfort === opt;
                        return (
                          <label
                            key={opt}
                            className={`flex-1 flex items-center gap-2 px-4 py-3 rounded-lg border cursor-pointer transition-all text-sm select-none ${active ? "border-[#C9A84C] bg-[#C9A84C]/10 text-[#C9A84C]" : "border-[#C9A84C]/15 hover:border-[#C9A84C]/40"} ${errors.ndaComfort && !active ? "border-red-500/30" : ""}`}
                            style={{ color: active ? undefined : "#94a3b8" }}
                          >
                            <input type="radio" name="ndaComfort" value={opt} checked={active} onChange={() => set("ndaComfort", opt)} className="sr-only" />
                            <span className={`w-3.5 h-3.5 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${active ? "border-[#C9A84C] bg-[#C9A84C]" : "border-[#C9A84C]/30"}`}>
                              {active && <span className="w-1.5 h-1.5 rounded-full bg-[#050d1a]" />}
                            </span>
                            {opt}
                          </label>
                        );
                      })}
                    </div>
                    <FieldError msg={errors.ndaComfort} />
                  </div>

                  {/* Additional Details */}
                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: "#e8dfc8" }}>
                      Additional Details <span className="font-normal" style={{ color: "#94a3b8" }}>(optional)</span>
                    </label>
                    <textarea
                      value={fd.details}
                      onChange={(e) => set("details", e.target.value)}
                      placeholder="Give details of your requirement, budget and intent in Canada"
                      rows={4}
                      className={`${INPUT_NORMAL} resize-none`}
                      style={INPUT_BG}
                    />
                  </div>

                  {/* Privacy Policy */}
                  <div id="field-privacy">
                    <label className={`flex items-start gap-3 cursor-pointer group ${errors.privacy ? "text-red-400" : ""}`}>
                      <div className="mt-0.5 flex-shrink-0">
                        <div
                          onClick={() => { setPrivacyChecked((v) => !v); setErrors((prev) => ({ ...prev, privacy: undefined })); }}
                          className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all cursor-pointer ${privacyChecked ? "bg-[#C9A84C] border-[#C9A84C]" : errors.privacy ? "border-red-500/70 bg-transparent" : "border-[#C9A84C]/30 bg-transparent group-hover:border-[#C9A84C]/60"}`}
                        >
                          {privacyChecked && (
                            <svg className="w-3 h-3 text-[#0D0D0D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                      </div>
                      <span className="text-sm leading-relaxed transition-colors" style={{ color: errors.privacy ? undefined : "#94a3b8" }}>
                        I agree to the{" "}
                        <a href="https://bcgservicesgroup.com/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-[#C9A84C] hover:text-[#E5C97A] underline underline-offset-2 transition-colors" onClick={(e) => e.stopPropagation()}>
                          Privacy Policy
                        </a>
                        {" "}<span className="text-[#C9A84C]">*</span>
                      </span>
                    </label>
                    <FieldError msg={errors.privacy} />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 disabled:opacity-60 disabled:cursor-not-allowed text-black font-bold rounded-lg text-base transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] shadow-lg shadow-[#C9A84C]/10"
                    style={{ background: "linear-gradient(135deg, #C9A84C, #a8893d)" }}
                  >
                    {submitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Sending…
                      </span>
                    ) : "Request Information →"}
                  </button>

                  <p className="text-xs text-center leading-relaxed" style={{ color: "#94a3b8" }}>
                    By submitting you agree to receive communications from CJ Kalra, Century 21 Coastal Realty Ltd.
                    All information is kept strictly confidential and protected by NDA.
                  </p>
                </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ── Consultation CTA ── */}
        <section
          className="py-20 px-4 text-center"
          style={{
            background: "linear-gradient(135deg, #0d1f3c 0%, #1a3a6b 100%)",
            borderTop: "1px solid rgba(201,168,76,0.3)",
            borderBottom: "1px solid rgba(201,168,76,0.3)",
          }}
        >
          <div className="max-w-2xl mx-auto">
            <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "#C9A84C" }}>ONE-ON-ONE</p>
            <div className="w-12 h-px mx-auto mb-6" style={{ background: "#C9A84C" }} />
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
              Schedule a Confidential Buyer Consultation
            </h2>
            <p className="text-base leading-relaxed mb-8" style={{ color: "#e8dfc8" }}>
              Discuss available opportunities, your investment criteria, and strategic goals with a Commercial Real Estate Specialist. No obligation.
            </p>
            <a
              href="https://my-url.in/booking-link"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded font-bold text-sm tracking-wider transition-all hover:opacity-90 active:scale-95 shadow-lg"
              style={{ background: "linear-gradient(135deg, #C9A84C, #a8893d)", color: "#000000" }}
            >
              📅 BOOK YOUR CONSULTATION
            </a>
          </div>
        </section>

        {/* ── Testimonials ── */}
        <section className="py-20 px-4" style={{ background: "#050d1a" }}>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "#C9A84C" }}>CLIENT EXPERIENCES</p>
              <div className="w-12 h-px mx-auto mb-4" style={{ background: "#C9A84C" }} />
              <h2 className="text-4xl font-bold text-white" style={{ fontFamily: "var(--font-playfair)" }}>What Buyers Are Saying</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
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
              ].map((t) => (
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

        {/* ── FAQ ── */}
        <FaqSection />
      </main>

      <Footer />
    </>
  );
}
