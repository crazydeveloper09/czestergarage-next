import * as motion from "framer-motion/client";
import { revealFade } from "@/components/entranceMotion";
import type { CSSProperties } from "react";
import type { CtaSectionFieldsFragment } from "@/lib/graphql/sdk";
import styles from "./CTASection.module.scss";

export default function CtaSection({ item, contactPage = false }: { item: CtaSectionFieldsFragment; contactPage?: boolean }) {
  return (
    <section

      id="kontakt"
      className={styles.banner}
      style={item.backgroundImage ? {
        "--cta-image": `url("${item.backgroundImage.url}")`,
      } as CSSProperties : undefined}
    >
      <motion.div {...revealFade}>
        <h2>{item.subtitle || item.title}</h2>

      </motion.div>
      {item.link?.href && (
        <motion.a {...revealFade} href={!contactPage && item.link.href === "/contact" ? "#dane-kontaktowe" : item.link.href} target={item.link.openInNewTab ? "_blank" : undefined} rel={item.link.openInNewTab ? "noopener noreferrer" : undefined}>
          {item.link.label} <span aria-hidden="true">→</span>
        </motion.a>
      )}
    </section>
  );
}



