// Detail-page content for listings rendered by both /listings/<slug> and
// /whatsapp/listings/<slug>, so the two routes can't drift apart.
import type { ListingDetailData } from "@/components/ListingDetail";

const CO_OP_BROKERAGE = "Century 21 Coastal Realty Ltd.";
const CO_OP_DISCLAIMER =
  "Listing information sourced from MLS®/REALTOR.ca and subject to change. Confidential listing. Illustrative image only — not actual property photo.";
const CO_OP_FORM_HEADING = "Request Details & Private Viewing";

export interface ListingPageContent {
  /** Short card title, also used in the WhatsApp message. */
  title: string;
  seoTitle: string;
  seoDescription: string;
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
};
