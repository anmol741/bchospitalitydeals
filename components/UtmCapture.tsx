"use client";

import { useEffect } from "react";
import { captureUtm } from "@/lib/utm";

/** Mounted once in the root layout so UTMs are captured on whichever page the visitor lands on. */
export default function UtmCapture() {
  useEffect(() => {
    captureUtm();
  }, []);
  return null;
}
