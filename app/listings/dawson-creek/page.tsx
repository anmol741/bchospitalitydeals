import ListingDetail, { ListingDetailData } from "@/components/ListingDetail";

export const dynamic = 'force-static';

const data: ListingDetailData = {
  location: "Dawson Creek, BC",
  name: "Athens Bar & Grill — 800 120 Avenue, Dawson Creek",
  price: "$140,000",
  mls: "10392063",
  sizeLabel: "2,000 Sq Ft",
  propertyName: "Dawson Creek Restaurant ($140K)",
  highlights: [
    "Turnkey — Full Equipment Included",
    "Rent $4,000/mo Gross Lease",
    "Loyal Customer Base",
    "Popular Restaurant & Licensed Bar",
    "Walk-In Cooler & Freezer",
    "Long Lease Until Dec 2028 + Renewal",
    "Owner Relocating — Clean Transition",
    "Training Available",
  ],
  about:
    "Athens Bar & Grill is a well-known 2,000 sq ft restaurant and licensed bar in Dawson Creek with a loyal, long-standing customer base. The turnkey sale includes full kitchen equipment plus a walk-in cooler and freezer, and the lease runs until December 2028 with a renewal option, giving a new owner long-term security. The current owner is relocating and has offered training to ensure a clean transition.",
  leaseDetails: [
    { label: "Monthly Rent", value: "$4,000/mo Gross" },
    { label: "Annual Rent", value: "$48,000" },
    { label: "Lease Expiry", value: "December 31, 2028" },
    { label: "Renewal Option", value: "Yes" },
  ],
  businessInfo: [
    { label: "Business Name", value: "Athens Bar & Grill" },
    { label: "Type", value: "Restaurant + Licensed Bar" },
    { label: "Corporation", value: "1451467 B.C. Ltd." },
    { label: "Zoning", value: "Commercial" },
  ],
};

export default function DawsonCreekListingPage() {
  return <ListingDetail data={data} />;
}
