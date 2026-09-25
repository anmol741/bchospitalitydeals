// Thin wrappers around the Meta Pixel client-side SDK (window.fbq).
// Every call is guarded so pages render fine if the pixel hasn't loaded yet
// (blocked by an ad blocker, script still loading, etc).

function fbq(...args: unknown[]) {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq(...args);
  }
}

/**
 * Fires on a successful "Request Information" form submission. Pass the
 * listing slug as contentName to tag the Lead with content_name.
 */
export function trackLead(contentName?: string) {
  if (contentName) {
    fbq("track", "Lead", { content_name: contentName });
  } else {
    fbq("track", "Lead");
  }
}

/** Fires when a visitor initiates phone/WhatsApp contact. */
export function trackContact(name: string) {
  fbq("track", "Contact", { contact_method: name });
}

/** Fires when a visitor clicks through to book a consultation. */
export function trackSchedule() {
  fbq("track", "Schedule");
}

/** Fires on the thank-you panel once an NDA inquiry has been submitted. */
export function trackCompleteRegistration() {
  fbq("track", "CompleteRegistration", { content_name: "NDA Inquiry Submitted" });
}
