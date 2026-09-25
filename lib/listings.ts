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
}

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
    slug: "commercial-drive-vape-store",
    location: "Commercial Drive, Vancouver, BC",
    title: "Turnkey Vape Store for Sale",
    price: "$150,000",
    mls: "C8078570",
    features: [
      "Prime location on \"The Drive\" — heavy foot traffic",
      "Turnkey, established retail business",
      "Courier pickup location on-site",
      "Mobile accessory store inside",
      "Rent $5,500/month",
    ],
    value: "Vape Store - Commercial Drive ($150K)",
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
];

export const LISTINGS = ALL_LISTINGS.filter((l) => l.published !== false);

export function isListingPublished(slug: string): boolean {
  return LISTINGS.some((l) => l.slug === slug);
}
