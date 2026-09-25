import { notFound } from "next/navigation";
import ListingDetailWA from "@/components/whatsapp/ListingDetailWA";
import { isListingPublished } from "@/lib/listings";
import { listingImage, listingMetadata } from "@/lib/listingPage";
import { NEW_LISTING_DETAILS } from "@/lib/newListingDetails";

export const dynamic = 'force-static';

const SLUG = "vancouver-granville-restaurant";

export const metadata = listingMetadata(SLUG, "/whatsapp/listings/");

export default function VancouverGranvilleRestaurantListingWAPage() {
  if (!isListingPublished(SLUG)) notFound();
  const { title, detail } = NEW_LISTING_DETAILS[SLUG];
  return <ListingDetailWA data={{ ...detail, title, image: listingImage(SLUG) }} />;
}
