import ListingDetailWA, { ListingDetailWAData } from "@/components/whatsapp/ListingDetailWA";

export const dynamic = 'force-static';

const data: ListingDetailWAData = {
  location: "Prince George, BC",
  name: "Restaurant & Banquet Hall — Highway 16, Prince George",
  price: "$650,000",
  mls: "C8079611",
  sizeLabel: "~9,000 Sq Ft",
  title: "Restaurant & Banquet Hall",
  highlights: [
    "Highway 16 High Traffic Location",
    "Turnkey — Full Equipment Included",
    "Rent ~$10,800/mo All-Inclusive",
    "Banquet Hall + Full Restaurant",
    "Zoning C6 — High Commercial",
    "Operating Since 2018",
    "Strong Revenue History",
    "Freestanding Mixed-Use Building",
  ],
  about:
    "This ~9,000 sq ft freestanding mixed-use building on Highway 16 combines a full-service restaurant with a dedicated banquet hall, making it a rare turnkey opportunity in Prince George. All equipment is included, and the business has operated continuously since 2018 with a strong, verifiable revenue history. High commercial (C6) zoning and heavy highway traffic support both dine-in trade and event bookings, giving a new owner-operator multiple income streams under one roof.",
  leaseDetails: [
    { label: "Monthly Rent", value: "~$10,800/mo (incl. tax & strata)" },
    { label: "Lease Type", value: "Gross / Head Lease" },
    { label: "Sale Type", value: "Asset Sale" },
  ],
  businessInfo: [
    { label: "Business Type", value: "Food & Beverage" },
    { label: "Sub-Type", value: "Restaurant" },
    { label: "Operating Since", value: "2018" },
    { label: "Zoning", value: "C6 (High Commercial)" },
  ],
};

export default function PrinceGeorgeListingWAPage() {
  return <ListingDetailWA data={data} />;
}
