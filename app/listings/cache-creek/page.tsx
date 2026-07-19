import ListingDetail, { ListingDetailData } from "@/components/ListingDetail";

export const dynamic = 'force-static';

const data: ListingDetailData = {
  location: "Cache Creek, BC",
  name: "Established Highway Restaurant — 987 Trans-Canada Hwy, Cache Creek",
  price: "$120,000",
  mls: "10391540",
  sizeLabel: "Patio Included",
  propertyName: "Cache Creek Restaurant ($120K)",
  highlights: [
    "Trans-Canada Highway Prime Location",
    "Turnkey Operation",
    "Rent ~$2,100/mo All-Inclusive",
    "High Visibility Tourist Corridor",
    "Outdoor Patio Included",
    "Attached to Hotel/Motel",
    "Built/Renovated 2025",
    "Owner Retirement — Motivated Seller",
  ],
  about:
    "Positioned directly on the Trans-Canada Highway in Cache Creek, this turnkey restaurant benefits from constant tourist and traveller visibility. The space was built/renovated in 2025 and includes an outdoor patio, with the restaurant attached to a hotel/motel operation for built-in guest traffic. The owner's retirement makes this a motivated sale, offering a well-priced entry point into a high-exposure highway corridor.",
  leaseDetails: [
    { label: "Monthly Rent", value: "~$2,100/mo (incl. utilities & strata)" },
    { label: "Landlord", value: "Hotel Operator" },
    { label: "Sale Type", value: "Business Only" },
  ],
  businessInfo: [
    { label: "Business Type", value: "Hospitality" },
    { label: "Built/Renovated", value: "2025" },
    { label: "Land", value: "Under 1 Acre" },
    { label: "Status", value: "New Listing" },
  ],
};

export default function CacheCreekListingPage() {
  return <ListingDetail data={data} />;
}
