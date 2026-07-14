"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CountryCodeSelect from "@/components/CountryCodeSelect";
import { submitToCRM } from "@/lib/submitToCRM";
import { trackLead, trackContact } from "@/lib/fbpixel";

type ContactFormParams = {
  name: string; email: string; countryCode: string; phone: string;
  property: string; buyerProfile: string; budget: string;
  timeline: string; ndaComfort: string; details: string;
};

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

type FormErrors = Partial<Record<keyof ContactFormParams | "privacy", string>>;

export default function ContactFormSection() {
  const formRef = useRef<HTMLFormElement>(null);

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
  const [submitFailed, setSubmitFailed] = useState(false);

  const set = useCallback(<K extends keyof ContactFormParams>(k: K, v: ContactFormParams[K]) => {
    setFd((prev) => ({ ...prev, [k]: v }));
    setErrors((prev) => ({ ...prev, [k]: undefined }));
  }, []);

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
    setSubmitFailed(false);
    const ok = await submitToCRM({
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
    setSubmitting(false);
    if (ok) {
      setSubmitted(true);
      trackLead();
    } else {
      setSubmitFailed(true);
    }
  };

  const inputClass = (key: keyof FormErrors) =>
    errors[key] ? INPUT_ERROR : INPUT_NORMAL;

  const selectClass = (key: keyof FormErrors) =>
    `${inputClass(key)} appearance-none cursor-pointer`;

  return (
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
              <a
                href="tel:7788969552"
                onClick={() => trackContact("Phone Call")}
                className="block text-2xl font-bold text-white hover:text-[#C9A84C] transition-colors mb-2"
              >
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

              {submitFailed && (
                <p className="text-xs text-center text-red-400">
                  Something went wrong sending your request. Please try again or call us at 778-896-9552.
                </p>
              )}

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
  );
}
