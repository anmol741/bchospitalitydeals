// GTM (GTM-TK4CMZRL) already owns window.dataLayer and loads gtag.js internally, so the
// Google Ads conversion is fired by pushing an event for GTM to pick up rather than loading
// gtag.js a second time. In GTM, add a Google Ads Conversion Tracking tag
// (Conversion ID AW-18084530712, Label gOXQCMvui9EcEJiUsK9D) triggered on the
// "generate_lead_conversion" custom event.
export function trackGoogleAdsConversion() {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "generate_lead_conversion",
    value: 1.0,
    currency: "CAD",
  });
}

// TODO: conversion_label is a placeholder (the AW- account ID, not a real label).
// Replace it with the actual "AW-18084530712/XXXXXXXXX" label once the
// "form_submit_conversion" Google Ads Conversion Tracking tag is published in GTM.
export function trackFormSubmitConversion() {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "form_submit_conversion",
    conversion_label: "AW-18084530712",
  });
}
