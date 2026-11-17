import * as motion from "framer-motion/client";
import { reveal } from "@/components/entranceMotion";
import { IconFromHygraph } from "@/helpers/icon";
import ContactForm from "./ContactForm";
import { getPageBySlug } from "@/lib/graphql/requests/pages";
import { getFooter } from "@/lib/graphql/requests/footer";
import { client } from "@/lib/graphql/client";
import { getSdk } from "@/lib/graphql/sdk";
import styles from "./PageContent.module.scss";

const sdk = getSdk(client);

export async function WorkshopGallery() {
  const { gallerySections } = await sdk.WorkshopGallery();
  const gallery = gallerySections[0];
  if (!gallery?.images.length) return null;

  return (
    <section id="galeria" className={styles.workshop}>
      <div>
        <span className={styles.eyebrow}>{gallery.title}</span>
        <h2>Zobacz, jak pracujemy</h2>
        <p>Zdjęcia warsztatu Czester Garage w Jerzmanowej.</p>
      </div>
      <motion.ul {...reveal()} className={styles.gallery}>
        {gallery.images.map(({ url }, index) => (
          <li key={url}>
            <a href={url} aria-label={`Otwórz zdjęcie warsztatu ${index + 1}`}>
              <img src={url} alt={`Warsztat Czester Garage, zdjęcie ${index + 1}`} loading="lazy" />
            </a>
          </li>
        ))}
      </motion.ul>
    </section>
  );
}

export async function WorkshopContact() {
  const [footer, about] = await Promise.all([getFooter(), getPageBySlug("about")]);
  const photo = about?.sections.find((section) => section.__typename === "AboutSection")?.image;
  if (!footer) return null;

  const { phone, email, address, openingHours } = footer;
  const days = openingHours?.day?.split(/\r?\n/) ?? [];
  const hours = openingHours?.hours.split(/\r?\n/) ?? [];
  const schedule = Array.from({ length: Math.max(days.length, hours.length) }, (_, index) =>
    [days[index], hours[index]].filter(Boolean).join(" · ")
  ).join("\n");
  const dialNumber = phone.replace(/[^+\d]/g, "");
  const phoneHref = `tel:${dialNumber.length === 9 ? "+48" : ""}${dialNumber}`;
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
  const contact = [
    { label: "Telefon", icon: "phone", value: phone, href: phoneHref },
    { label: "E-mail", icon: "envelope", value: email, href: `mailto:${email}` },
    { label: "Adres warsztatu", icon: "map", value: address, href: directions },
    { label: "Godziny otwarcia", icon: "Clock", value: schedule },
  ].filter(({ value }) => value);

  return (
    <section id="kontakt-warsztat" aria-label="Dane kontaktowe" className={styles.contactSection}>
      <dl className={styles.contact}>
        {contact.map(({ label, icon, href, value }) => (
          <div className={styles.card} key={label}>
            <IconFromHygraph icon={icon} />
            <dt>{label}</dt>
            <dd>{href ? <a href={href}>{value}</a> : value}</dd>
          </div>
        ))}
      </dl>
      <motion.div {...reveal()} className={styles.contactPanels}>
        {email && <ContactForm />}
        <div className={styles.location}>
          {photo && <img src={photo.url} alt="Budynek warsztatu Czester Garage" />}
          <div className={styles.locationBody}>
            <h2><span aria-hidden="true"><IconFromHygraph icon="map" /></span>Znajdź nas na mapie</h2>
            {address && <p>{address}</p>}
            {address && <a href={directions} className={styles.directions}>Otwórz w Google Maps <span aria-hidden="true">→</span></a>}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

