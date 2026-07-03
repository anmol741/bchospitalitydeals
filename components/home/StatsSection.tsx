"use client";

import { useRef, useState, useEffect } from "react";
import { useInView, animate } from "framer-motion";

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

export default function StatsSection() {
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-80px" });

  return (
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
  );
}
