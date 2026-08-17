// Shared helpers for the /whatsapp Google Ads landing pages, which replace the
// Request Information form with direct WhatsApp deep links.
import { trackContact, trackLead } from "@/lib/fbpixel";
import { trackGoogleAdsConversion } from "@/lib/googleAds";

export const WHATSAPP_NUMBER = "17788969552";

export const GENERIC_WHATSAPP_MESSAGE =
  "Hi, I'm interested in BC Hospitality Deals listings. Please send me more details.";

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/** location e.g. "Prince George, BC" -> "Prince George" */
function cityName(location: string): string {
  return location.split(",")[0].trim();
}

export function listingWhatsAppMessage(
  location: string,
  title: string,
  price: string,
  mls: string
): string {
  return `Hi, I'm interested in the ${cityName(location)} ${title} listing (${price}, MLS ${mls}). Please send me more details.`;
}

/**
 * Fires the same conversion signals the RequestInfoForm fired on a successful
 * submit (Lead + Google Ads generate_lead_conversion), since the WhatsApp CTA
 * is now the lead-capture action on these pages instead of the form.
 */
export function trackWhatsAppLead() {
  trackContact("WhatsApp");
  trackLead();
  trackGoogleAdsConversion();
}
