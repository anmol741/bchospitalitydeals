import { notFound } from "next/navigation";
import ListingDetail from "@/components/ListingDetail";
import { isListingPublished, propertyOptions } from "@/lib/listings";
import { listingImage, listingMetadata } from "@/lib/listingPage";
import { NEW_LISTING_DETAILS } from "@/lib/newListingDetails";

export const dynamic = 'force-static';

const SLUG = "central-bc-cafe-and-building";

export const metadata = listingMetadata(SLUG, "/listings/");

export default function CentralBcCafeAndBuildingListingPage() {
  if (!isListingPublished(SLUG)) notFound();
  const { detail, maskedTerms } = NEW_LISTING_DETAILS[SLUG];
  return (
    <ListingDetail
      data={{ ...detail, image: listingImage(SLUG) }}
      propertyOptions={propertyOptions(maskedTerms)}
    />
  );
}
