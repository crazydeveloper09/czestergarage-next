import ReviewsClient from "./ReviewsClient";

export default function ReviewsSection({ item }: { item: { title: string } }) {
  return (
    <ReviewsClient
      item={item}
      apiKey={process.env.GOOGLE_MAPS_BROWSER_API_KEY || process.env.GOOGLE_PLACES_API_KEY || ""}
      placeId={process.env.GOOGLE_PLACES_PLACE_ID || ""}
      fallbackUrl={process.env.GOOGLE_MAPS_REVIEWS_URL}
    />
  );
}
