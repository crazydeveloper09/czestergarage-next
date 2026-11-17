import * as motion from "framer-motion/client";
import { reveal } from "@/components/entranceMotion";
import styles from "./ReviewsSection.module.scss";

type GoogleReview = {
  name: string;
  rating: number;
  text?: { text: string };
  originalText?: { text: string };
  authorAttribution: { displayName: string; photoUri?: string };
};

type GooglePlace = {
  reviews?: GoogleReview[];
  googleMapsLinks?: { reviewsUri?: string };
  attributions?: { provider: string; providerUri?: string }[];
};

async function getGooglePlace(): Promise<GooglePlace | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACES_PLACE_ID;
  if (!apiKey || !placeId) return null;

  try {
    const response = await fetch(
      `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}?languageCode=pl`,
      {
        headers: {
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask": "reviews,googleMapsLinks.reviewsUri,attributions",
        },
        cache: "no-store",
        signal: AbortSignal.timeout(3500),
      },
    );
    if (!response.ok) {
      console.warn("Places API:", response.status);
      return null;
    }
    return await response.json();
  } catch {
    console.warn("Nie udało się pobrać opinii z Places API.");
    return null;
  }
}

export default async function ReviewsSection({ item }: { item: { title: string } }) {
  const place = await getGooglePlace();
  const reviews = place?.reviews?.filter(({ rating }) => rating === 5).slice(0, 3) ?? [];
  const mapsUrl = place?.googleMapsLinks?.reviewsUri || process.env.GOOGLE_MAPS_REVIEWS_URL;
  if (!reviews.length && !mapsUrl) return null;

  return (
    <section className={styles.section} aria-labelledby="opinie">
      <header className={styles.header}>
        <div>
          <span className={styles.label}>Opinie klientów</span>
          <h2 id="opinie">{item.title}</h2>
        </div>
        {mapsUrl && (
          <a className={styles.more} href={mapsUrl}>
            Zobacz więcej opinii <span aria-hidden="true">→</span>
          </a>
        )}
      </header>
      {reviews.length > 0 && (
        <div className={styles.grid}>
          {reviews.map(({ name, authorAttribution, rating, originalText, text }, index) => (
            <motion.figure {...reveal((index % 5) * .14)} key={name} className={styles.card}>
              <span key="rating" className={styles.stars} role="img" aria-label={`${rating} na 5 gwiazdek`}>
                {"★".repeat(rating)}{"☆".repeat(5 - rating)}
              </span>
              {(originalText?.text || text?.text) && (
                <blockquote key="review"><p>{originalText?.text || text?.text}</p></blockquote>
              )}
              <figcaption key="author">
                
                {authorAttribution.displayName}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      )}
      
    </section>
  );
}
