import * as motion from "framer-motion/client";
import { reveal } from "@/components/entranceMotion";
import { HeroSectionFieldsFragment } from "@/lib/graphql/sdk";
import styles from "./HeroSection.module.scss";
import HeroBadge from "./HeroBadge/HeroBadge";
import { IconFromHygraph } from "@/helpers/icon";

interface HeroSectionProps {
    item: HeroSectionFieldsFragment;
    compact?: boolean;
    contact?: boolean;
}

const HeroSection: React.FC<HeroSectionProps> = ({ item, compact = false, contact = false }) => {
    const className = [styles.container, compact && styles.compact, contact && styles.contact].filter(Boolean).join(" ");
    return (
        <section className={className} style={{ backgroundImage: `url(${item.image?.url})` }}>
            <div className={styles.content}>
                <motion.span {...reveal(0)} className={styles.label}>{item.label}</motion.span>
                <motion.h1 {...reveal(0.12)} className={styles.title}>{item.title}</motion.h1>
                <motion.p {...reveal(0.24)} className={styles.description}>{item.description}</motion.p>
                <motion.div {...reveal(0.36)} className={styles.buttons}>
                    {item.primaryButton?.href && (
                        <a href={item.primaryButton.href} className={styles.primaryButton}>
                            <span className={styles.buttonIcon}>
                                <IconFromHygraph icon={compact ? "calendar" : "phone"} />
                            </span>
                            {item.primaryButton.label}
                        </a>
                    )}
                    {item.secondaryButton?.href && (
                        <a href={item.secondaryButton.href} className={styles.secondaryButton}>
                            <span className={styles.buttonIcon}>
                                <IconFromHygraph icon={'calendar'} />
                            </span>
                            {item.secondaryButton.label}
                        </a>
                    )}
                </motion.div>
                {!compact && <motion.div {...reveal(0.48)} className={styles.badges}>
                    {item.badges?.map((badge, index) => (
                        <HeroBadge key={index} icon={badge.icon} text={badge.text} />
                    ))}
                </motion.div>}
            </div>
        </section>
    );
};

export default HeroSection;

