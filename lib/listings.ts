// Single source of truth for the listing cards shown on the homepage grid (/)
// and the WhatsApp landing grid (/whatsapp), plus the "Which property" options
// in the Request Information form. Each grid builds its own detailsHref from
// `slug`, so a listing only needs to be added here once.

export interface ListingSummary {
  slug: string;
  location: string;
  title: string;
  price: string;
  mls?: string;
  address?: string;
  features: string[];
  badge?: string;
  /** Form dropdown option / CRM "which property" value. */
  value: string;
  /** Meta Pixel Lead content_name. Only set on listings that send one. */
  pixelContentName?: string;
  /** Set to false to hide the listing everywhere (grids, form, sitemap, detail pages). */
  published?: boolean;
  /** Replaces the green "Active Listing" badge, e.g. "Off-Market Listing". */
  statusLabel?: string;
  /** Masked off-market listing: noindex, left out of the sitemap, no NDA label on the card. */
  exclusive?: boolean;
  /** Shown under the price, e.g. "Share sale". */
  priceNote?: string;
  category?: string;
  /** Listing-specific CRM tag, sent with "BC Hospitality Deals" and "Exclusive Listing". */
  crmTag?: string;
}

export const EXCLUSIVE_FOOTNOTE = "Figures are provided by the seller and are subject to verification.";

export const ALL_LISTINGS: ListingSummary[] = [
  {
    slug: "prince-george",
    location: "Prince George, BC",
    title: "Restaurant & Banquet Hall",
    price: "$650,000",
    mls: "C8079611",
    features: [
      "~9,000 sq ft full-service facility",
      "Located in franchise hotel complex",
      "Rent under $11,000/month",
      "Banquet capacity — events & weddings",
      "Full commercial kitchen equipment",
    ],
    badge: "PREMIUM",
    value: "Prince George Restaurant ($650K)",
  },
  {
    slug: "mcbride",
    location: "McBride, BC",
    title: "Highway Restaurant & Party Hall",
    price: "$180,000",
    mls: "C8079536",
    features: [
      "Prime highway location",
      "Located in franchise hotel",
      "Rent ~$4,700/mo — all inclusive",
      "Party hall for events",
      "Established local clientele",
    ],
    value: "McBride Restaurant ($180K)",
  },
  {
    slug: "cache-creek",
    location: "Cache Creek, BC",
    title: "Only Restaurant in Town — with Patio",
    price: "$120,000",
    mls: "10391540",
    address: "987 Trans Canada Highway, Cache Creek, BC V0K 1H0",
    features: [
      "No restaurant competition in town",
      "Outdoor patio seating",
      "Rent ~$2,000/month",
      "Strong local & traveller traffic",
      "Turn-key operation",
    ],
    badge: "EXCLUSIVE",
    value: "Cache Creek Restaurant ($120K)",
  },
  {
    slug: "dawson-creek",
    location: "Dawson Creek, BC",
    title: "Restaurant in Franchise Hotel",
    price: "$140,000",
    mls: "10392063",
    address: "800 120 Avenue, Dawson Creek, BC V1G 3H7",
    features: [
      "In-hotel restaurant location",
      "Rent ~$4,000/month",
      "Built-in hotel guest traffic",
      "Full kitchen setup included",
      "Established operation",
    ],
    value: "Dawson Creek Restaurant ($140K)",
  },
  {
    slug: "merritt-motel",
    location: "Merritt, BC",
    title: "14-Unit Motel with Owner Residence",
    price: "$1,800,000",
    mls: "10396244",
    features: [
      "14-unit motel + 3-bed owner/manager residence",
      "Turnkey operation — proven income",
      "Easy highway access & excellent visibility",
      "Mix of monthly & daily rentals",
      "0.25 acre freehold land",
    ],
    value: "Merritt Motel ($1.8M)",
  },
  {
    slug: "vancouver-vape-store",
    location: "Vancouver, BC",
    title: "Vape Stores and Convenience Store for Sale",
    price: "$80,000 – $200,000",
    features: [
      "Turnkey, established retail business",
    ],
    value: "Vape Stores & Convenience Store - Vancouver ($80K–$200K)",
    statusLabel: "Off-Market Listing",
  },
  {
    slug: "vancouver-granville-restaurant",
    location: "Vancouver, BC",
    title: "Confidential Restaurant Opportunity – Granville St",
    price: "$249,000",
    mls: "C8081075",
    features: [
      "High-profile Granville St location near Broadway",
      "Approx. 1,794 sq ft — approx. 65 seats",
      "Existing commercial kitchen",
      "Liquor licence in place",
      "Lease to July 2029 + 5-year renewal option",
    ],
    value: "Vancouver Granville Restaurant ($249K)",
    pixelContentName: "vancouver-granville-restaurant",
    published: true,
  },
  {
    slug: "langley-indian-restaurant",
    location: "Langley, BC",
    title: "Confidential Award-Winning Indian Restaurant",
    price: "$970,000",
    mls: "C8080200",
    features: [
      "Well-established, award-winning Indian restaurant",
      "160-seat capacity",
      "Premium commercial kitchen & full-service bar",
      "Heated patio & abundant parking",
      "Near Surrey–Langley SkyTrain expansion",
    ],
    badge: "PREMIUM",
    value: "Langley Indian Restaurant ($970K)",
    pixelContentName: "langley-indian-restaurant",
    published: true,
  },
  {
    slug: "willowbrook-food-franchise",
    location: "Willowbrook, Langley, BC",
    title: "Confidential Turn-Key Food Franchise",
    price: "$299,000",
    // TODO: add MLS number once confirmed. The MLS line is hidden while this is unset.
    features: [
      "Willowbrook Shopping Centre — high foot traffic",
      "Well-established franchise, strong brand recognition",
      "Fully operational",
      "Training & franchise support available",
      "Growth potential: catering, delivery & marketing",
    ],
    value: "Willowbrook Food Franchise ($299K)",
    pixelContentName: "willowbrook-food-franchise",
    published: true,
  },
  {
    slug: "quesnel-commercial-building",
    location: "Quesnel, BC",
    title: "Downtown Quesnel Commercial Building",
    price: "$2,200,000",
    priceNote: "Share sale",
    category: "Commercial / Investment property",
    features: [
      "10,000 sq ft land",
      "21,000 sq ft building",
      "8–9 tenants, long-term",
      "10% EBITDA",
      "Owner retiring",
      "Seller financing available",
    ],
    badge: "Exclusive · Off-market",
    value: "Downtown Quesnel Commercial Building ($2.2M)",
    pixelContentName: "quesnel-commercial-building",
    exclusive: true,
    crmTag: "Quesnel Building",
    published: true,
  },
  {
    slug: "central-bc-cafe-business",
    location: "Central BC",
    title: "Established Café Business",
    price: "$1,200,000",
    priceNote: "Share sale",
    category: "Restaurant / Café",
    features: [
      "Decades of operating history",
      "$500–600K net profit (seller-reported)",
      "Owner retiring",
      "Seller financing available",
      "Building available separately",
    ],
    badge: "Exclusive · Off-market",
    value: "Established Café Business ($1.2M)",
    pixelContentName: "central-bc-cafe-business",
    exclusive: true,
    crmTag: "Cafe Business",
    published: true,
  },
  {
    slug: "central-bc-cafe-and-building",
    location: "Central BC",
    title: "Own the Building. Own the Business.",
    price: "$3,400,000",
    priceNote: "Combined ($1.2M café business + $2.2M building), sold together or separately",
    category: "Restaurant / Café + Investment property",
    features: [
      "Café: decades of history, $500–600K net profit (seller-reported)",
      "Building: 21,000 sq ft on 10,000 sq ft of land, 10% EBITDA, long-term tenants",
      "Owner retiring",
      "Seller financing available on both",
    ],
    badge: "Exclusive · Off-market",
    value: "Café + Building Package ($3.4M)",
    pixelContentName: "central-bc-cafe-and-building",
    exclusive: true,
    crmTag: "Cafe + Building Package",
    published: true,
  },
];

export const LISTINGS = ALL_LISTINGS.filter((l) => l.published !== false);

export function isListingPublished(slug: string): boolean {
  return LISTINGS.some((l) => l.slug === slug);
}

export function isListingExclusive(slug: string): boolean {
  return ALL_LISTINGS.some((l) => l.slug === slug && l.exclusive);
}

const OTHER_PROPERTY_OPTIONS = [
  "Hotels",
  "Restaurants in Other Area in BC",
  "Restaurants in Lower Mainland BC",
  "Other Business",
];

const CRM_BASE_TAG = "BC Hospitality Deals";
const CRM_EXCLUSIVE_TAG = "Exclusive Listing";

/** One "Which property" dropdown option, plus what the form sends to the CRM / pixel when it's chosen. */
export interface PropertyOption {
  value: string;
  slug?: string;
  title?: string;
  pixelContentName?: string;
  tags: string[];
}

/**
 * Builds the Request Information form's property dropdown. Call it from a server
 * component and pass the result down, so a masked page never ships other
 * listings' details in its client bundle. Options whose value, slug or title
 * contain any of `maskedTerms` (case-insensitive) are left out.
 */
export function propertyOptions(maskedTerms: string[] = []): PropertyOption[] {
  const options: PropertyOption[] = [
    ...LISTINGS.map((l) => ({
      value: l.value,
      slug: l.slug,
      title: l.title,
      ...(l.pixelContentName ? { pixelContentName: l.pixelContentName } : {}),
      tags: l.exclusive
        ? [CRM_BASE_TAG, CRM_EXCLUSIVE_TAG, ...(l.crmTag ? [l.crmTag] : [])]
        : [CRM_BASE_TAG],
    })),
    ...OTHER_PROPERTY_OPTIONS.map((value) => ({ value, tags: [CRM_BASE_TAG] })),
  ];
  const masked = maskedTerms.map((t) => t.toLowerCase());
  return options.filter((o) => {
    const text = [o.value, o.slug, o.title].join(" ").toLowerCase();
    return !masked.some((t) => text.includes(t));
  });
}
