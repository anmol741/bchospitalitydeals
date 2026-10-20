// Detail-page content for listings rendered by both /listings/<slug> and
// /whatsapp/listings/<slug>, so the two routes can't drift apart.
import type { ListingDetailData } from "@/components/ListingDetail";
import { EXCLUSIVE_FOOTNOTE } from "@/lib/listings";

const CO_OP_BROKERAGE = "Century 21 Coastal Realty Ltd.";
const CO_OP_DISCLAIMER =
  "Listing information sourced from MLS®/REALTOR.ca and subject to change. Confidential listing. Illustrative image only — not actual property photo.";
const CO_OP_FORM_HEADING = "Request Details & Private Viewing";
const EXCLUSIVE_NOTE = "Confidential listing · details on request. Please do not approach the business, tenants or owner.";
// Words that must never appear on the masked café pages, including in the
// form's property dropdown (which otherwise lists every listing).
const CAFE_MASKED_TERMS = ["Quesnel", "coffee", "Granville"];

export interface ListingPageContent {
  /** Short card title, also used in the WhatsApp message. */
  title: string;
  seoTitle: string;
  seoDescription: string;
  /** Words that must not appear anywhere on this listing's page (applied to the form dropdown server-side). */
  maskedTerms?: string[];
  detail: ListingDetailData;
}

export const NEW_LISTING_DETAILS: Record<string, ListingPageContent> = {
  "vancouver-granville-restaurant": {
    title: "Confidential Restaurant Opportunity – Granville St",
    seoTitle: "Restaurant for Sale – Granville St, Vancouver ($249,000) | BC Hospitality Deals",
    seoDescription:
      "Confidential restaurant opportunity on Granville St near Broadway, Vancouver. Approx. 1,794 SF, ~65 seats, commercial kitchen, liquor licence, lease to 2029 + 5-yr option. $249,000.",
    detail: {
      location: "Vancouver, BC",
      name: "Confidential Restaurant Opportunity – Vancouver (Granville St)",
      price: "$249,000",
      mls: "C8081075",
      board: "Greater Vancouver REALTORS®",
      sizeLabel: "Approx. 1,794 Sq Ft",
      propertyName: "Vancouver Granville Restaurant ($249K)",
      highlights: [
        "High-profile Granville Street location near Broadway",
        "Approx. 1,794 SF, configured for approx. 65 seats",
        "Existing commercial kitchen",
        "Liquor licence in place",
        "Lease secured to July 2029 + 5-year renewal option",
        "Suited to a new food concept, grill, lounge, bar or late-night dining",
      ],
      about:
        "An exciting opportunity to take over a restaurant space in a high-profile Granville Street location near Broadway, surrounded by a strong mix of residential, commercial, retail and entertainment activity. The existing commercial kitchen and liquor licence give a new operator flexibility to introduce their own concept.",
      confidentialityNote:
        "Business name and identity not disclosed publicly. Do not approach staff. Showings by appointment only.",
      leaseDetails: [
        { label: "Lease Term", value: "Secured to July 2029" },
        { label: "Renewal Option", value: "5 years" },
      ],
      businessInfo: [
        { label: "Business Type", value: "Food & Beverage" },
        { label: "Sub-Type", value: "Restaurant" },
        { label: "Seating", value: "Approx. 65 seats" },
        { label: "Liquor Licence", value: "In place" },
      ],
      listingBrokerage: CO_OP_BROKERAGE,
      disclaimer: CO_OP_DISCLAIMER,
      formHeading: CO_OP_FORM_HEADING,
      pixelContentName: "vancouver-granville-restaurant",
    },
  },
  "langley-indian-restaurant": {
    title: "Confidential Award-Winning Indian Restaurant",
    seoTitle: "Award-Winning Indian Restaurant for Sale – Langley ($970,000) | BC Hospitality Deals",
    seoDescription:
      "Confidential, well-established award-winning Indian restaurant in Langley, BC. 160 seats, premium kitchen, full bar, heated patio, near the Surrey–Langley SkyTrain. $970,000.",
    detail: {
      location: "Langley, BC",
      name: "Confidential Award-Winning Indian Restaurant – Langley",
      price: "$970,000",
      mls: "C8080200",
      board: "Fraser Valley Real Estate Board",
      sizeLabel: "160 Seats",
      propertyName: "Langley Indian Restaurant ($970K)",
      highlights: [
        "Well-established, award-winning Indian restaurant",
        "160-seat capacity",
        "Premium commercial kitchen and full-service bar",
        "Heated patio",
        "Abundant customer parking",
        "Significant leasehold improvements",
        "Near the Surrey–Langley SkyTrain expansion and future Willowbrook transit hub",
        "Lease exclusivity clause: only Indian cuisine permitted in the plaza",
      ],
      about:
        "Turnkey operation close to one of Langley's fastest-growing commercial corridors. The area is seeing substantial residential, commercial and mixed-use redevelopment, and a new mixed-use development with retail and residential components is planned directly across the plaza.",
      confidentialityNote: "NDA required for full details. Qualified buyers only.",
      leaseDetails: [
        { label: "Exclusivity", value: "Only Indian cuisine permitted in the plaza" },
      ],
      businessInfo: [
        { label: "Business Type", value: "Food & Beverage" },
        { label: "Sub-Type", value: "Indian Restaurant" },
        { label: "Seating", value: "160 seats" },
        { label: "Amenities", value: "Full-service bar; heated patio; ample parking" },
      ],
      listingBrokerage: CO_OP_BROKERAGE,
      disclaimer: CO_OP_DISCLAIMER,
      formHeading: CO_OP_FORM_HEADING,
      pixelContentName: "langley-indian-restaurant",
    },
  },
  "willowbrook-food-franchise": {
    title: "Confidential Turn-Key Food Franchise",
    seoTitle: "Turn-Key Food Franchise for Sale – Willowbrook, Langley ($299,000) | BC Hospitality Deals",
    seoDescription:
      "Confidential, fully operational food franchise in Willowbrook Shopping Centre, Langley. High foot traffic, strong brand, training and franchise support. $299,000.",
    detail: {
      location: "Willowbrook, Langley, BC",
      name: "Confidential Turn-Key Food Franchise – Willowbrook, Langley",
      price: "$299,000",
      // TODO: add MLS number once confirmed. The MLS line is hidden while this is unset.
      propertyName: "Willowbrook Food Franchise ($299K)",
      highlights: [
        "Willowbrook Shopping Centre location, high foot traffic",
        "Well-established franchise with strong brand recognition",
        "Fully operational",
        "Training and franchise support available",
        "Growth potential: catering, delivery and marketing",
        "Seamless transition opportunity",
      ],
      about:
        "Ideal for owner-operators, entrepreneurs and investors looking for an established franchise concept.",
      leaseDetails: [
        { label: "Location", value: "Willowbrook Shopping Centre" },
      ],
      businessInfo: [
        { label: "Business Type", value: "Food & Beverage" },
        { label: "Sub-Type", value: "Food Franchise" },
        { label: "Support", value: "Training and franchise support available" },
      ],
      pixelContentName: "willowbrook-food-franchise",
    },
  },
  "quesnel-commercial-building": {
    title: "Downtown Quesnel Commercial Building",
    seoTitle: "Downtown Commercial Building for Sale – Quesnel, BC ($2,200,000) | BC Hospitality Deals",
    seoDescription:
      "Exclusive off-market commercial building in downtown Quesnel, BC. 21,000 sq ft building on 10,000 sq ft of land, 8–9 long-term tenants, 10% EBITDA, seller financing available. $2,200,000 share sale.",
    detail: {
      location: "Quesnel, BC",
      name: "Downtown Quesnel Commercial Building",
      price: "$2,200,000",
      priceNote: "Share sale",
      sizeLabel: "21,000 Sq Ft Building",
      propertyName: "Downtown Quesnel Commercial Building ($2.2M)",
      highlights: [
        "10,000 sq ft land",
        "21,000 sq ft building",
        "8–9 tenants, long-term",
        "10% EBITDA",
        "Owner retiring",
        "Seller financing available",
      ],
      about:
        "An off-market opportunity to acquire a downtown commercial building with an established, long-term tenant base. The owner is retiring and seller financing is available to qualified buyers.",
      confidentialityNote: EXCLUSIVE_NOTE,
      leaseDetails: [
        { label: "Tenants", value: "8–9, long-term" },
        { label: "EBITDA", value: "10%" },
        { label: "Seller Financing", value: "Available" },
      ],
      businessInfo: [
        { label: "Category", value: "Commercial / Investment property" },
        { label: "Land", value: "10,000 sq ft" },
        { label: "Building", value: "21,000 sq ft" },
        { label: "Sale Structure", value: "Share sale" },
      ],
      disclaimer: EXCLUSIVE_FOOTNOTE,
      pixelContentName: "quesnel-commercial-building",
      exclusive: true,
      badge: "Exclusive · Off-market",
    },
  },
  "central-bc-cafe-business": {
    title: "Established Café Business",
    seoTitle: "Established Café Business for Sale – Central BC ($1,200,000) | BC Hospitality Deals",
    seoDescription:
      "Exclusive off-market café business in Central BC with decades of operating history and $500–600K seller-reported net profit. Owner retiring, seller financing available. $1,200,000 share sale.",
    maskedTerms: CAFE_MASKED_TERMS,
    detail: {
      location: "Central BC",
      name: "Established Café Business",
      price: "$1,200,000",
      priceNote: "Share sale",
      propertyName: "Established Café Business ($1.2M)",
      highlights: [
        "Decades of operating history",
        "$500–600K net profit (seller-reported)",
        "Owner retiring",
        "Seller financing available",
        "Building available separately",
      ],
      about:
        "A long-established café business in Central BC, offered off-market as the owner retires. Seller financing is available, and the building can be purchased separately.",
      confidentialityNote: EXCLUSIVE_NOTE,
      leaseDetails: [
        { label: "Net Profit", value: "$500–600K (seller-reported)" },
        { label: "Seller Financing", value: "Available" },
        { label: "Building", value: "Available separately" },
      ],
      businessInfo: [
        { label: "Category", value: "Restaurant / Café" },
        { label: "Operating History", value: "Decades" },
        { label: "Sale Structure", value: "Share sale" },
      ],
      disclaimer: EXCLUSIVE_FOOTNOTE,
      pixelContentName: "central-bc-cafe-business",
      exclusive: true,
      badge: "Exclusive · Off-market",
    },
  },
  "central-bc-cafe-and-building": {
    title: "Own the Building. Own the Business.",
    seoTitle: "Café Business + Building for Sale – Central BC ($3,400,000) | BC Hospitality Deals",
    seoDescription:
      "Exclusive off-market package in Central BC: an established café business ($1.2M) and a 21,000 sq ft commercial building ($2.2M), sold together or separately. Seller financing available on both.",
    maskedTerms: CAFE_MASKED_TERMS,
    detail: {
      location: "Central BC",
      name: "Own the Building. Own the Business.",
      price: "$3,400,000",
      priceNote: "Combined ($1.2M café business + $2.2M building), sold together or separately",
      propertyName: "Café + Building Package ($3.4M)",
      highlights: [
        "Café: decades of history, $500–600K net profit (seller-reported)",
        "Building: 21,000 sq ft on 10,000 sq ft of land",
        "Building: 10% EBITDA, long-term tenants",
        "Owner retiring",
        "Seller financing available on both",
      ],
      about:
        "Acquire an established café business together with the commercial building, or purchase either one separately. The owner is retiring and seller financing is available on both.",
      confidentialityNote: EXCLUSIVE_NOTE,
      leaseDetails: [
        { label: "Café Business", value: "$1,200,000" },
        { label: "Building", value: "$2,200,000" },
        { label: "Combined", value: "$3,400,000" },
        { label: "Seller Financing", value: "Available on both" },
      ],
      businessInfo: [
        { label: "Category", value: "Restaurant / Café + Investment property" },
        { label: "Café", value: "Decades of history; $500–600K net profit (seller-reported)" },
        { label: "Building", value: "21,000 sq ft on 10,000 sq ft of land; 10% EBITDA; long-term tenants" },
        { label: "Sale Structure", value: "Together or separately" },
      ],
      disclaimer: EXCLUSIVE_FOOTNOTE,
      pixelContentName: "central-bc-cafe-and-building",
      exclusive: true,
      badge: "Exclusive · Off-market",
    },
  },
};
