import ListingDetail, { ListingDetailData } from "@/components/ListingDetail";

export const dynamic = 'force-static';

const data: ListingDetailData = {
  location: "McBride, BC",
  name: "Highway Restaurant with Party Hall — McBride, Robson Valley",
  price: "$180,000",
  mls: "C8079536",
  sizeLabel: "2,800 Sq Ft",
  highlights: [
    "Highway Exposure — Tourist Corridor",
    "Turnkey — Assets Included",
    "Rent $4,800/mo All-Inclusive",
    "2,800 Sq Ft Freestanding Building",
    "Party Hall Event Facility",
    "Established Clientele Since 2014",
    "Robson Valley Growing Region",
  ],
  about:
    "Located along the highway tourist corridor through McBride in the Robson Valley, this 2,800 sq ft freestanding restaurant has built an established local clientele since 2014. A dedicated party hall adds a steady stream of event bookings alongside regular restaurant trade. All business assets are included in the sale, and the all-inclusive rent keeps overhead simple for a new owner-operator entering a growing region.",
  leaseDetails: [
    { label: "Monthly Rent", value: "$4,800/mo (incl. utilities, strata & tax)" },
    { label: "Lease Type", value: "Gross Lease" },
    { label: "Sale Type", value: "Asset Sale" },
  ],
  businessInfo: [
    { label: "Business Type", value: "Food & Beverage" },
    { label: "Sub-Type", value: "Beverage/Drinking Place" },
    { label: "Operating Since", value: "2014" },
    { label: "Zoning", value: "C2" },
  ],
};

export default function McBrideListingPage() {
  return <ListingDetail data={data} />;
}
