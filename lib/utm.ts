// Captures UTM parameters from the landing URL into sessionStorage so they
// survive client-side navigation (e.g. home → listing page → form submit) and
// can be sent to the CRM with the lead. Storage access is wrapped because it
// throws in some private-browsing modes.

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign"] as const;
type UtmKey = (typeof UTM_KEYS)[number];
export type UtmParams = Record<UtmKey, string>;

const STORAGE_KEY = "bchd_utm";

function fromQueryString(): Partial<UtmParams> {
  const params = new URLSearchParams(window.location.search);
  const found: Partial<UtmParams> = {};
  for (const key of UTM_KEYS) {
    const value = params.get(key);
    if (value) found[key] = value.slice(0, 200);
  }
  return found;
}

/** Saves any UTM params on the current URL. Only overwrites when the URL actually has some. */
export function captureUtm() {
  if (typeof window === "undefined") return;
  const found = fromQueryString();
  if (Object.keys(found).length === 0) return;
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(found));
  } catch {
    // Storage unavailable; getUtm() still falls back to the current URL.
  }
}

export function getUtm(): UtmParams {
  const empty: UtmParams = { utm_source: "", utm_medium: "", utm_campaign: "" };
  if (typeof window === "undefined") return empty;
  let stored: Partial<UtmParams> = {};
  try {
    stored = JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? "{}");
  } catch {
    stored = {};
  }
  return { ...empty, ...stored, ...fromQueryString() };
}
