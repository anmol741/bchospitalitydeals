import { notFound } from "next/navigation";
import ListingDetail from "@/components/ListingDetail";
import { isListingPublished } from "@/lib/listings";
import { listingImage, listingMetadata } from "@/lib/listingPage";
import { NEW_LISTING_DETAILS } from "@/lib/newListingDetails";

export const dynamic = 'force-static';

const SLUG = "vancouver-granville-restaurant";

export const metadata = listingMetadata(SLUG, "/listings/");

export default function VancouverGranvilleRestaurantListingPage() {
  if (!isListingPublished(SLUG)) notFound();
  const { detail } = NEW_LISTING_DETAILS[SLUG];
  return <ListingDetail data={{ ...detail, image: listingImage(SLUG) }} />;
}
