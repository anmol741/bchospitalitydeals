"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const STEPS = [
  { label: "NDA", href: "/nda", step: 1 },
  { label: "BCFSA", href: "/bcfsa", step: 2 },
  { label: "Privacy", href: "/privacy", step: 3 },
  { label: "Agreement", href: "/agreement", step: 4 },
];

interface ProgressBarProps {
  currentStep: 1 | 2 | 3 | 4;
}

export default function ProgressBar({ currentStep }: ProgressBarProps) {
  const progressPercent = ((currentStep - 1) / 3) * 100;

  return (
    <div className="w-full mb-8">
      {/* Step labels */}
      <div className="flex justify-between mb-2">
        {STEPS.map(({ label, href, step }) => (
          <div key={step} className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold mb-1 transition-all ${
                step < currentStep
                  ? "bg-[#C9A84C] text-[#0D0D0D]"
                  : step === currentStep
                  ? "bg-[#C9A84C] text-[#0D0D0D] ring-4 ring-[#C9A84C]/30"
                  : "bg-[#2A2A2A] text-white/40"
              }`}
            >
              {step < currentStep ? (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                step
              )}
            </div>
            <span
              className={`text-[10px] uppercase tracking-wide font-medium ${
                step <= currentStep ? "text-[#C9A84C]" : "text-white/30"
              }`}
            >
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* Bar */}
      <div className="relative h-1.5 bg-[#2A2A2A] rounded-full overflow-hidden">
        <motion.div
          className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#C9A84C] to-[#E5C97A] rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        />
      </div>

      <p className="text-white/40 text-xs mt-2 text-center">
        Step {currentStep} of 4
      </p>
    </div>
  );
}
