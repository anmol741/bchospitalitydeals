import ListingDetail, { ListingDetailData } from "@/components/ListingDetail";

export const dynamic = 'force-static';

const data: ListingDetailData = {
  location: "Commercial Drive, Vancouver, BC",
  name: "Turnkey Vape Store for Sale",
  price: "$150,000",
  mls: "C8078570",
  sizeLabel: "1,500 Sq Ft",
  propertyName: "Vape Store - Commercial Drive ($150K)",
  highlights: [
    "Prime Location on \"The Drive\" — Iconic & Busy Corridor",
    "Turnkey, Established Retail Business",
    "Courier Pickup Location On-Site",
    "Mobile Accessory Store Inside",
    "Low Rent Relative to Traffic Footprint",
    "Massive Storefront Windows — Ground-Floor Visibility",
    "Confidential Listing — NDA Required",
  ],
  about:
    "Rare high-exposure retail opportunity on \"The Drive\" — a thriving, turnkey business on one of Vancouver's most iconic and busiest commercial stretches. Prime ground-floor unit with unbeatable street exposure and heavy foot traffic in a vibrant, high-density neighborhood. Low rent relative to the traffic footprint, massive storefront windows, and ground-floor visibility. Ideal for an owner-operator looking to capitalize on a low-overhead, recession-resistant retail model in a legendary location.",
  leaseDetails: [
    { label: "Monthly Rent", value: "$5,500/month" },
  ],
  businessInfo: [
    { label: "Business Type", value: "Retail and Wholesale (General Retail)" },
    { label: "On-Site Services", value: "Courier Pickup Location; Mobile Accessory Store" },
  ],
};

export default function CommercialDriveVapeStoreListingPage() {
  return <ListingDetail data={data} />;
}
