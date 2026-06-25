"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface CountryEntry {
  flag: string;
  label: string;    // dial code, e.g. "+1"
  country: string;  // display name, e.g. "Canada"
}

const COUNTRY_CODES: CountryEntry[] = [
  { flag: "🇨🇦", label: "+1",    country: "Canada" },
  { flag: "🇮🇳", label: "+91",   country: "India" },
  { flag: "🇺🇸", label: "+1",    country: "USA" },
  { flag: "🇦🇪", label: "+971",  country: "UAE" },
  { flag: "🇬🇧", label: "+44",   country: "UK" },
  { flag: "🇦🇺", label: "+61",   country: "Australia" },
  { flag: "🇳🇿", label: "+64",   country: "New Zealand" },
  { flag: "🇸🇬", label: "+65",   country: "Singapore" },
  { flag: "🇵🇰", label: "+92",   country: "Pakistan" },
  { flag: "🇵🇭", label: "+63",   country: "Philippines" },
  { flag: "🇧🇩", label: "+880",  country: "Bangladesh" },
  { flag: "🇱🇰", label: "+94",   country: "Sri Lanka" },
  { flag: "🇳🇵", label: "+977",  country: "Nepal" },
  { flag: "🇲🇾", label: "+60",   country: "Malaysia" },
  { flag: "🇮🇩", label: "+62",   country: "Indonesia" },
  { flag: "🇨🇳", label: "+86",   country: "China" },
  { flag: "🇯🇵", label: "+81",   country: "Japan" },
  { flag: "🇰🇷", label: "+82",   country: "South Korea" },
  { flag: "🇻🇳", label: "+84",   country: "Vietnam" },
  { flag: "🇹🇭", label: "+66",   country: "Thailand" },
  { flag: "🇸🇦", label: "+966",  country: "Saudi Arabia" },
  { flag: "🇶🇦", label: "+974",  country: "Qatar" },
  { flag: "🇰🇼", label: "+965",  country: "Kuwait" },
  { flag: "🇧🇭", label: "+973",  country: "Bahrain" },
  { flag: "🇴🇲", label: "+968",  country: "Oman" },
  { flag: "🇯🇴", label: "+962",  country: "Jordan" },
  { flag: "🇱🇧", label: "+961",  country: "Lebanon" },
  { flag: "🇮🇱", label: "+972",  country: "Israel" },
  { flag: "🇹🇷", label: "+90",   country: "Turkey" },
  { flag: "🇮🇷", label: "+98",   country: "Iran" },
  { flag: "🇩🇪", label: "+49",   country: "Germany" },
  { flag: "🇫🇷", label: "+33",   country: "France" },
  { flag: "🇮🇹", label: "+39",   country: "Italy" },
  { flag: "🇪🇸", label: "+34",   country: "Spain" },
  { flag: "🇳🇱", label: "+31",   country: "Netherlands" },
  { flag: "🇧🇪", label: "+32",   country: "Belgium" },
  { flag: "🇨🇭", label: "+41",   country: "Switzerland" },
  { flag: "🇸🇪", label: "+46",   country: "Sweden" },
  { flag: "🇳🇴", label: "+47",   country: "Norway" },
  { flag: "🇩🇰", label: "+45",   country: "Denmark" },
  { flag: "🇫🇮", label: "+358",  country: "Finland" },
  { flag: "🇵🇹", label: "+351",  country: "Portugal" },
  { flag: "🇬🇷", label: "+30",   country: "Greece" },
  { flag: "🇵🇱", label: "+48",   country: "Poland" },
  { flag: "🇷🇴", label: "+40",   country: "Romania" },
  { flag: "🇺🇦", label: "+380",  country: "Ukraine" },
  { flag: "🇷🇺", label: "+7",    country: "Russia" },
  { flag: "🇿🇦", label: "+27",   country: "South Africa" },
  { flag: "🇳🇬", label: "+234",  country: "Nigeria" },
  { flag: "🇰🇪", label: "+254",  country: "Kenya" },
  { flag: "🇬🇭", label: "+233",  country: "Ghana" },
  { flag: "🇪🇹", label: "+251",  country: "Ethiopia" },
  { flag: "🇹🇿", label: "+255",  country: "Tanzania" },
  { flag: "🇺🇬", label: "+256",  country: "Uganda" },
  { flag: "🇪🇬", label: "+20",   country: "Egypt" },
  { flag: "🇲🇦", label: "+212",  country: "Morocco" },
  { flag: "🇩🇿", label: "+213",  country: "Algeria" },
  { flag: "🇹🇳", label: "+216",  country: "Tunisia" },
  { flag: "🇧🇷", label: "+55",   country: "Brazil" },
  { flag: "🇲🇽", label: "+52",   country: "Mexico" },
  { flag: "🇦🇷", label: "+54",   country: "Argentina" },
  { flag: "🇨🇴", label: "+57",   country: "Colombia" },
  { flag: "🇨🇱", label: "+56",   country: "Chile" },
  { flag: "🇵🇪", label: "+51",   country: "Peru" },
  { flag: "🇻🇪", label: "+58",   country: "Venezuela" },
  { flag: "🇯🇲", label: "+1876", country: "Jamaica" },
  { flag: "🇹🇹", label: "+1868", country: "Trinidad & Tobago" },
  { flag: "🇭🇰", label: "+852",  country: "Hong Kong" },
  { flag: "🇹🇼", label: "+886",  country: "Taiwan" },
  { flag: "🇲🇻", label: "+960",  country: "Maldives" },
  { flag: "🇫🇯", label: "+679",  country: "Fiji" },
  { flag: "🇿🇼", label: "+263",  country: "Zimbabwe" },
  { flag: "🇿🇲", label: "+260",  country: "Zambia" },
  { flag: "🇮🇶", label: "+964",  country: "Iraq" },
  { flag: "🇦🇫", label: "+93",   country: "Afghanistan" },
  { flag: "🇦🇹", label: "+43",   country: "Austria" },
  { flag: "🇨🇿", label: "+420",  country: "Czech Republic" },
  { flag: "🇭🇺", label: "+36",   country: "Hungary" },
  { flag: "🇸🇰", label: "+421",  country: "Slovakia" },
  { flag: "🇭🇷", label: "+385",  country: "Croatia" },
  { flag: "🇷🇸", label: "+381",  country: "Serbia" },
  { flag: "🇧🇬", label: "+359",  country: "Bulgaria" },
  { flag: "🇱🇹", label: "+370",  country: "Lithuania" },
  { flag: "🇱🇻", label: "+371",  country: "Latvia" },
  { flag: "🇪🇪", label: "+372",  country: "Estonia" },
  { flag: "🇮🇪", label: "+353",  country: "Ireland" },
  { flag: "🇮🇸", label: "+354",  country: "Iceland" },
  { flag: "🇲🇹", label: "+356",  country: "Malta" },
  { flag: "🇨🇾", label: "+357",  country: "Cyprus" },
  { flag: "🇲🇲", label: "+95",   country: "Myanmar" },
  { flag: "🇰🇭", label: "+855",  country: "Cambodia" },
  { flag: "🇱🇦", label: "+856",  country: "Laos" },
  { flag: "🇧🇳", label: "+673",  country: "Brunei" },
  { flag: "🇹🇱", label: "+670",  country: "Timor-Leste" },
  { flag: "🇵🇬", label: "+675",  country: "Papua New Guinea" },
  { flag: "🇸🇧", label: "+677",  country: "Solomon Islands" },
  { flag: "🇼🇸", label: "+685",  country: "Samoa" },
  { flag: "🇹🇴", label: "+676",  country: "Tonga" },
  { flag: "🇺🇿", label: "+998",  country: "Uzbekistan" },
  { flag: "🇰🇿", label: "+7",    country: "Kazakhstan" },
  { flag: "🇦🇿", label: "+994",  country: "Azerbaijan" },
  { flag: "🇬🇪", label: "+995",  country: "Georgia" },
  { flag: "🇦🇲", label: "+374",  country: "Armenia" },
];

// First 6 entries are pinned as "Common"
const COMMON = COUNTRY_CODES.slice(0, 6);

interface Props {
  dialCode: string;
  countryName: string;
  onChange: (dialCode: string, countryName: string) => void;
  hasError?: boolean;
}

export default function CountryCodeSelect({ dialCode, countryName, onChange, hasError }: Props) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    const onDown = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDown);
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      setTimeout(() => searchRef.current?.focus(), 50);
    } else {
      setSearch("");
    }
  }, [open]);

  const q = search.trim().toLowerCase();

  const filteredCommon = useMemo(
    () => q ? COMMON.filter((c) => c.country.toLowerCase().includes(q) || c.label.includes(q)) : COMMON,
    [q]
  );

  const filteredAll = useMemo(
    () => q ? COUNTRY_CODES.filter((c) => c.country.toLowerCase().includes(q) || c.label.includes(q)) : COUNTRY_CODES,
    [q]
  );

  const select = (c: CountryEntry) => {
    onChange(c.label, c.country);
    setOpen(false);
  };

  const displayEntry = COUNTRY_CODES.find((c) => c.country === countryName) ?? COUNTRY_CODES[0];

  const borderCls = hasError
    ? "border-red-500/70"
    : open
    ? "border-[#C9A84C]/60"
    : "border-[#2A2A2A] hover:border-[#C9A84C]/30";

  return (
    <div ref={containerRef} className="relative flex-shrink-0">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-1.5 h-full px-3 py-3 bg-[#111111] border rounded-lg text-white text-sm transition-colors min-w-[100px] ${borderCls}`}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="text-base leading-none">{displayEntry.flag}</span>
        <span className="text-white/80 font-medium">{dialCode}</span>
        <svg
          className={`w-3.5 h-3.5 text-white/30 ml-auto transition-transform flex-shrink-0 ${open ? "rotate-180" : ""}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute top-full left-0 mt-1.5 w-72 bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl shadow-2xl shadow-black/60 z-[100] overflow-hidden"
          >
            {/* Search */}
            <div className="p-2 border-b border-[#2A2A2A]">
              <div className="relative">
                <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  ref={searchRef}
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search country…"
                  className="w-full pl-7 pr-3 py-1.5 bg-[#111111] border border-[#2A2A2A] rounded-lg text-white text-xs placeholder-white/20 focus:outline-none focus:border-[#C9A84C]/50"
                />
              </div>
            </div>

            {/* List */}
            <div className="max-h-60 overflow-y-auto overscroll-contain">
              {!q && (
                <>
                  <div className="px-3 pt-2 pb-1">
                    <span className="text-[10px] uppercase tracking-widest text-white/25 font-medium">Common</span>
                  </div>
                  {COMMON.map((c) => (
                    <CountryItem key={`common-${c.country}`} entry={c} selected={c.country === countryName} onSelect={select} />
                  ))}
                  <div className="mx-3 my-1 border-t border-[#2A2A2A]" />
                  <div className="px-3 pt-1 pb-1">
                    <span className="text-[10px] uppercase tracking-widest text-white/25 font-medium">All Countries</span>
                  </div>
                  {COUNTRY_CODES.map((c) => (
                    <CountryItem key={`all-${c.country}`} entry={c} selected={c.country === countryName} onSelect={select} />
                  ))}
                </>
              )}

              {q && filteredAll.length > 0 && filteredAll.map((c) => (
                <CountryItem key={c.country} entry={c} selected={c.country === countryName} onSelect={select} />
              ))}

              {q && filteredAll.length === 0 && (
                <p className="px-3 py-4 text-white/30 text-xs text-center">No countries found</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function CountryItem({
  entry, selected, onSelect,
}: {
  entry: CountryEntry;
  selected: boolean;
  onSelect: (c: CountryEntry) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(entry)}
      className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm text-left transition-colors ${
        selected
          ? "bg-[#C9A84C]/10 text-[#C9A84C]"
          : "text-white/70 hover:bg-white/5 hover:text-white"
      }`}
    >
      <span className="text-base leading-none flex-shrink-0">{entry.flag}</span>
      <span className="flex-1 truncate">{entry.country}</span>
      <span className="text-white/30 text-xs flex-shrink-0 font-mono">{entry.label}</span>
      {selected && (
        <svg className="w-3.5 h-3.5 text-[#C9A84C] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      )}
    </button>
  );
}
