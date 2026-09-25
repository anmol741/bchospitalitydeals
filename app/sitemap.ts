import type { MetadataRoute } from "next";
import { LISTINGS } from "@/lib/listings";
import { SITE_URL } from "@/lib/listingPage";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/blog`, changeFrequency: "weekly", priority: 0.6 },
    ...LISTINGS.map((l) => ({
      url: `${SITE_URL}/listings/${l.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
  ];
}
