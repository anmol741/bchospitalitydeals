import ListingDetailWA, { ListingDetailWAData } from "@/components/whatsapp/ListingDetailWA";

export const dynamic = 'force-static';

const data: ListingDetailWAData = {
  location: "Merritt, BC",
  name: "14-Unit Motel with Owner Residence — Merritt",
  price: "$1,800,000",
  mls: "10396244",
  sizeLabel: "6,600 Sq Ft",
  title: "14-Unit Motel with Owner Residence",
  highlights: [
    "14-Unit Motel + 3-Bedroom Owner/Manager Residence",
    "Turnkey Operation — Proven Income",
    "Easy Highway Access & Excellent Visibility",
    "Mix of Monthly & Daily Rentals",
    "0.25 Acre Freehold Land",
    "Built in 1994",
    "Municipal Water & Sewer",
  ],
  about:
    "A rare opportunity to own a well-established 14-unit motel in the heart of Merritt, complete with a 3-bedroom owner/manager residence. Ideally located with easy highway access and excellent visibility, this turnkey property offers a proven mix of monthly and daily rentals, making it an ideal investment for owner-operators.",
  leaseDetails: [
    { label: "Title", value: "Freehold" },
    { label: "Annual Property Taxes", value: "$6,000" },
    { label: "Sale Type", value: "Asset Sale (business + real estate)" },
  ],
  businessInfo: [
    { label: "Business Type", value: "Hospitality" },
    { label: "Sub-Type", value: "Motel / Lodging" },
    { label: "Built", value: "1994" },
    { label: "Zoning", value: "Commercial" },
  ],
};

export default function MerrittMotelListingWAPage() {
  return <ListingDetailWA data={data} />;
}
