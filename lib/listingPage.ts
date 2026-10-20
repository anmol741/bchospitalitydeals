// Server-only helpers for the listing detail routes that read from
// NEW_LISTING_DETAILS (image lookup + SEO metadata).
import { existsSync } from "fs";
import path from "path";
import type { Metadata } from "next";
import { NEW_LISTING_DETAILS } from "@/lib/newListingDetails";
import { isListingExclusive } from "@/lib/listings";

export const SITE_URL = "https://bchospitalitydeals.com";

/**
 * Returns /listings/<slug>.png only if the file is actually in /public, so pages never show a broken image.
 * Exclusive listings never get a photo, even if a file with a matching name is added later.
 */
export function listingImage(slug: string): string | undefined {
  if (isListingExclusive(slug)) return undefined;
  const rel = `/listings/${slug}.png`;
  return existsSync(path.join(process.cwd(), "public", rel)) ? rel : undefined;
}

export function listingMetadata(slug: string, routePrefix: string): Metadata {
  const content = NEW_LISTING_DETAILS[slug];
  const image = listingImage(slug);
  const url = `${SITE_URL}${routePrefix}${slug}`;
  return {
    title: content.seoTitle,
    description: content.seoDescription,
    alternates: { canonical: `${SITE_URL}/listings/${slug}` },
    ...(isListingExclusive(slug) ? { robots: { index: false, follow: false } } : {}),
    openGraph: {
      title: content.seoTitle,
      description: content.seoDescription,
      url,
      siteName: "BC Hospitality Deals",
      locale: "en_CA",
      type: "website",
      ...(image ? { images: [{ url: `${SITE_URL}${image}` }] } : {}),
    },
  };
}
