import * as motion from "framer-motion/client";
import { reveal } from "@/components/entranceMotion";
import { IconFromHygraph } from "@/helpers/icon";
import Link from "next/link";
import type { ServicesSectionFieldsFragment } from "@/lib/graphql/sdk";
import styles from "./ServicesSection.module.scss";

const servicePhotos: Record<string, string> = {
  "wulkanizacja": "v1643379277/tams5k7nntwrgcpw78kz.jpg",
  "naprawy-mechaniczne": "v1643814758/w7znu3012prideychhe5.jpg",
  "diagnostyka-komputerowa": "v1643747933/xr5spvh0yzfyjd6ndzcz.jpg",
  "naprawa-zawieszen": "v1643814851/rooetbzucgk0fmaeagt2.jpg",
  "sprzedaz-czesci-i-opon": "v1643815597/oncwemlufvfodeabktuy.jpg",
  "klimatyzacja": "v1643377067/tjc0upoc5pf68z2ljcsk.jpg",
  "wymiana-rozrzadu": "v1643376893/lxirxhrtwxnwvpnirjvb.jpg",
  "akumulatory": "v1643379536/hlogu1usqpicfnmvxyc8.jpg",
  "wymiana-oleju-i-filtrow": "v1643378646/fofjil38hyua09iouuau.jpg",
  "montaz-hakow": "v1643816972/q29a4n4qkjsvxoueeayh.jpg",
};

export default function ServicesSection({ item, catalog = false }: {
  item: ServicesSectionFieldsFragment;
  catalog?: boolean;
}) {
  return (
    <section id="uslugi" className={catalog ? `${styles.section} ${styles.catalog}` : styles.section}>
      <span className={styles.label}>{item.subtitle ? item.title : "Zakres usług"}</span>
      <h2>{item.subtitle || item.title}</h2>

      <div className={styles.grid}>
        {item.services.map((service, index) => {
          const photo = service.slug ? servicePhotos[service.slug] : undefined;
          const image = service.heroImage?.url ?? service.gallery[0]?.url ??
            (photo ? `https://res.cloudinary.com/syberiancats/image/upload/w_480,f_auto,q_auto/${photo}` : undefined);
          return (
            <motion.article {...reveal((index % 5) * .14)} key={service.id} className={styles.card}>
              {catalog && (
                <div key="photo" className={styles.photo} aria-hidden="true">
                  {image && <img src={image} alt="" loading="lazy" />}
                </div>
              )}
              <div key="body" className={catalog ? styles.body : undefined}>
                <span className={catalog ? styles.icon : undefined}>
                  <IconFromHygraph icon={service.icon ?? undefined} />
                </span>
                <h3>{service.title}</h3>
                <p>{service.shortDescription}</p>
                {service.slug && (
                  <Link
                    className={styles.detailsLink}
                    href={`/services/${encodeURIComponent(service.slug)}`}
                    aria-label={`Dowiedz się więcej: ${service.title}`}
                  >
                    Dowiedz się więcej <span aria-hidden="true">→</span>
                  </Link>
                )}
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}

