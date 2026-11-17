import * as motion from "framer-motion/client";
import { reveal } from "@/components/entranceMotion";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { IconFromHygraph } from "@/helpers/icon";
import FaqAccordion from "@/components/FaqAccordion/FaqAccordion";
import { getServiceBySlug } from "@/lib/graphql/requests/services";
import styles from "./ServicePage.module.scss";

type ServicePageProps = { params: Promise<{ slug: string }> };

const priceFormatter = new Intl.NumberFormat("pl-PL", {
  style: "currency",
  currency: "PLN",
  maximumFractionDigits: 0,
});

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) notFound();

  return {
    title: service.seo?.title || service.title,
    description: service.seo?.description || service.shortDescription,
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) notFound();

  const { title, description, shortDescription, icon, heroImage, gallery, duration, prizeFrom, benefits, subservices, faq } = service;
  const cover = heroImage ?? gallery[0];

  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        {cover && <img className={styles.cover} src={cover.url} alt="" />}
        <div className={styles.intro}>
          <Link className={styles.back} href="/services"><span aria-hidden="true">←</span> Wszystkie usługi</Link>
          {icon && <motion.span {...reveal(0)} className={styles.serviceIcon} aria-hidden="true"><IconFromHygraph icon={icon} /></motion.span>}
          <motion.h1 {...reveal(0.12)}>{title}</motion.h1>
          <motion.p {...reveal(0.24)}>{shortDescription}</motion.p>
        </div>
      </header>

      <div className={styles.layout}>
        <div className={styles.content}>
          {description.trim() && (
            <motion.section {...reveal()}>
              <h2>O usłudze</h2>
              {description.trim().split(/\r?\n\s*\r?\n/).map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </motion.section>
          )}
          {benefits.length > 0 && (
            <motion.section {...reveal()}>
              <h2>Zalety skorzystania z usługi</h2>
              <ul className={styles.benefits}>
                {benefits.map((benefit, index) => (
                  <li key={index}>
                    <span aria-hidden="true"><IconFromHygraph icon={benefit.icon ?? "shield"} /></span>
                    {benefit.text}
                  </li>
                ))}
              </ul>
            </motion.section>
          )}
          {subservices.length > 0 && (
            <motion.section {...reveal()}>
              <h2>Cennik</h2>
              <dl className={styles.prices}>
                {subservices.map(({ name, price }, index) => (
                  <div key={index}><dt>{name}</dt><dd>{price}</dd></div>
                ))}
              </dl>
            </motion.section>
          )}
          {faq.length > 0 && (
            <motion.section {...reveal()}>
              <h2>Najczęściej zadawane pytania</h2>
              <FaqAccordion items={faq} />
            </motion.section>
          )}
          {gallery.length > 0 && (
            <motion.section {...reveal()}>
              <h2>Galeria</h2>
              <ul className={styles.gallery}>
                {gallery.map(({ url }, index) => (
                  <li key={url}>
                    <a href={url} aria-label={`Otwórz zdjęcie ${index + 1}`}>
                      <img src={url} alt="" loading="lazy" />
                    </a>
                  </li>
                ))}
              </ul>
            </motion.section>
          )}
        </div>

        <motion.aside {...reveal()} className={styles.booking}>
          <h2>Umów wizytę</h2>
          {(duration.trim() || prizeFrom != null) && (
            <dl>
              {prizeFrom != null && (
                <div>
                  <dt>Cena</dt>
                  <dd>od {priceFormatter.format(prizeFrom)}</dd>
                </div>
              )}
              {duration.trim() && (
                <div><dt>Czas realizacji</dt><dd>{duration}</dd></div>
              )}
            </dl>
          )}
          <Link href="/contact" className={styles.action}>Skontaktuj się <span aria-hidden="true">→</span></Link>
        </motion.aside>
      </div>
    </main>
  );
}
