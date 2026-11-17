"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import * as motion from "framer-motion/client";
import { reveal } from "@/components/entranceMotion";
import styles from "./ReviewsSection.module.scss";

type GoogleReview = {
  name?: string;
  rating: number;
  text?: string;
  originalText?: string;
  authorAttribution: { displayName: string; photoUri?: string };
};

type GooglePlace = {
  reviews?: GoogleReview[];
  googleMapsURI?: string;
  attributions?: { provider: string; providerURI?: string }[];
};


declare global {
  interface Window {
    google: { maps: { places: { Place: new (options: { id: string; requestedLanguage: string }) => GooglePlace & { fetchFields(options: { fields: string[] }): Promise<unknown> } } } };
  }
}

export default function ReviewsClient({ item, apiKey, placeId, fallbackUrl }: { item: { title: string }; apiKey: string; placeId: string; fallbackUrl?: string }) {
  const [place, setPlace] = useState<GooglePlace | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!ready || !placeId) return;
    let active = true;
    const googlePlace = new window.google.maps.places.Place({ id: placeId, requestedLanguage: "pl" });
    googlePlace.fetchFields({ fields: ["reviews", "googleMapsURI"] }).then(() => {
      if (!active) return;
      const reviews = googlePlace.reviews?.filter(({ rating }) => rating === 5) ?? [];
      for (let index = reviews.length - 1; index > 0; index--) {
        const randomIndex = Math.floor(Math.random() * (index + 1));
        [reviews[index], reviews[randomIndex]] = [reviews[randomIndex], reviews[index]];
      }
      setPlace({
        reviews: reviews.slice(0, 3),
        googleMapsURI: googlePlace.googleMapsURI,
        attributions: googlePlace.attributions,
      });
    }).catch((error: unknown) => console.error("Nie udało się pobrać opinii Google.", error));
    return () => { active = false; };
  }, [ready, placeId]);
  const reviews = place?.reviews ?? [];
  const mapsUrl = place?.googleMapsURI || fallbackUrl;


  return (
    <section className={styles.section} aria-labelledby="opinie">
      {apiKey && <Script id="google-places-reviews" src={`https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}&libraries=places&v=weekly&language=pl`} strategy="afterInteractive" onReady={() => setReady(true)} onError={() => console.error("Nie udało się załadować Google Maps JavaScript API.")} />}
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
            <motion.figure {...reveal((index % 5) * .14)} key={name || `${authorAttribution.displayName}-${index}`} className={styles.card}>
              <span key="rating" className={styles.stars} role="img" aria-label={`${rating} na 5 gwiazdek`}>
                {"★".repeat(rating)}{"☆".repeat(5 - rating)}
              </span>
              {(originalText || text) && (
                <blockquote key="review"><p>{originalText || text}</p></blockquote>
              )}
              <figcaption key="author">
                
                {authorAttribution.displayName}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      )}
      {reviews.length > 0 && (
        <div className={styles.source}>
          <span>Google Maps</span>
          {place?.attributions?.map(({ provider, providerURI }) => (
            providerURI ? <a key={provider} href={providerURI}>{provider}</a> : <span key={provider}>{provider}</span>
          ))}
        </div>
      )}
    </section>
  );
}
