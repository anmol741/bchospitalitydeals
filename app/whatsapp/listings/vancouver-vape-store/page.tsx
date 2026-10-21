import ListingDetailWA, { ListingDetailWAData } from "@/components/whatsapp/ListingDetailWA";

export const dynamic = 'force-static';

const data: ListingDetailWAData = {
  location: "Vancouver, BC",
  name: "Vape Stores and Convenience Store for Sale",
  price: "$80,000 – $200,000",
  sizeLabel: "1,500 Sq Ft",
  statusLabel: "Off-Market Listing",
  title: "Vape Stores and Convenience Store for Sale",
  highlights: [
    "Turnkey, Established Retail Business",
    "Low Rent Relative to Traffic Footprint",
    "Massive Storefront Windows — Ground-Floor Visibility",
    "Confidential Listing — NDA Required",
  ],
  about:
    "Rare high-exposure retail opportunity — a thriving, turnkey business on one of Vancouver's most iconic and busiest commercial stretches. Prime ground-floor unit with unbeatable street exposure and heavy foot traffic in a vibrant, high-density neighborhood. Low rent relative to the traffic footprint, massive storefront windows, and ground-floor visibility. Ideal for an owner-operator looking to capitalize on a low-overhead, recession-resistant retail model in a legendary location.",
  leaseDetails: [],
  businessInfo: [
    { label: "Business Type", value: "Retail and Wholesale (General Retail)" },
  ],
};

export default function VancouverVapeStoreListingWAPage() {
  return <ListingDetailWA data={data} />;
}
