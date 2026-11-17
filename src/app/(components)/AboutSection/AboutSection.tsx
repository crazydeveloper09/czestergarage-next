import * as motion from "framer-motion/client";
import { reveal } from "@/components/entranceMotion";
import type { AboutSectionFieldsFragment } from "@/lib/graphql/sdk";
import styles from "./AboutSection.module.scss";

export default function AboutSection({ item, story = false }: { item: AboutSectionFieldsFragment; story?: boolean }) {
  const paragraphs = item.content.split(/\r?\n\s*\r?\n/);

  return (
    <section id="o-nas" className={story ? `${styles.container} ${styles.story}` : styles.container}>
      <div className={styles.image}>
        {item.image && <img src={item.image.url} alt="Warsztat Czester Garage" />}
        {!story && item.stats.length > 0 && (
          <dl className={styles.stats}>
            {item.stats.map((stat, index) => (
              <div key={index}>
                <dt><strong>{stat.value}</strong>{stat.label}</dt>
                {stat.description && <dd>{stat.description}</dd>}
              </div>
            ))}
          </dl>
        )}
      </div>
      <motion.div {...reveal()} className={styles.content}>
        <span>{story ? "Nasza historia" : "O nas"}</span>
        <h2>{item.title}</h2>
        {paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </motion.div>
    </section>
  );
}


