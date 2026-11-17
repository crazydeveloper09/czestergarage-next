import * as motion from "framer-motion/client";
import { reveal } from "@/components/entranceMotion";
import { Fragment, type ReactNode } from "react";
import type { PageFieldsFragment } from "@/lib/graphql/sdk";
import { IconFromHygraph } from "@/helpers/icon";
import FaqAccordion from "@/components/FaqAccordion/FaqAccordion";
import styles from "./PageSections.module.scss";
import { WorkshopGallery } from "./PageContent";
import AboutSection from "./AboutSection/AboutSection";
import CtaSection from "./CTASection/CTASection";
import ContactInfo from "./ContactInfo/ContactInfo";
import HeroSection from "./HeroSection/HeroSection";
import ReviewsSection from "./ReviewsSection/ReviewsSection";
import ServicesSection from "./ServicesSection/ServicesSection";

export default function PageSections({ sections, catalog = false, compactHero = catalog, about = false, afterHero }: { sections: PageFieldsFragment["sections"]; catalog?: boolean; compactHero?: boolean; about?: boolean; afterHero?: ReactNode }) {
  const hero = sections.find((section) => section.__typename === "HeroSection");
  return (
    <main className={afterHero ? styles.contactPage : undefined}>
      {sections.map((section, index) => {
        switch (section.__typename) {
          case "HeroSection":
            return (
              <Fragment key={index}>
                <HeroSection item={about && !section.primaryButton ? { ...section, primaryButton: { label: "Skontaktuj się z nami", href: "/contact", openInNewTab: false } } : section} compact={compactHero} contact={Boolean(afterHero)} />
                {section === hero && afterHero}
              </Fragment>
            );
          case "ContactInfo":
            return about ? null : <ContactInfo key={index} section={section} />;
          case "ServicesSection":
            return (
              <div key={index}>
                <ServicesSection item={section} catalog={catalog} />
                {catalog && hero && hero.badges.length > 0 && (
                  <ul className={styles.benefits}>
                    {hero.badges.map((badge) => (
                      <li key={badge.text}>
                        <IconFromHygraph icon={badge.icon} />
                        {badge.text}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          case "AboutSection":
            return about ? (
              <Fragment key={index}>
                <AboutSection item={section} story />
                <motion.section {...reveal()} className={styles.values}>
                  <h2>Dlaczego warto nam zaufać?</h2>
                  <ul className={styles.benefits}>
                    <li><IconFromHygraph icon="tag" />Uczciwość i transparentność</li>
                    <li><IconFromHygraph icon="shield" />Rzetelność i jakość usług</li>
                    <li><IconFromHygraph icon="user" />Indywidualne podejście</li>
                    <li><IconFromHygraph icon="star" />Doświadczenie i pasja</li>
                  </ul>
                </motion.section>
                <WorkshopGallery />
                {section.stats.length > 0 && (
                  <dl className={styles.workshopStats}>
                    {section.stats.map(({ value, label, description }, statIndex) => (
                      <div key={statIndex}>
                        <dt>
                          <span aria-hidden="true">
                            <IconFromHygraph icon={["car", "wrench", "shield", "Clock"][statIndex]} />
                          </span>
                          <strong>{value}</strong>
                          {label}
                        </dt>
                        {description && <dd>{description}</dd>}
                      </div>
                    ))}
                  </dl>
                )}
              </Fragment>
            ) : <AboutSection key={index} item={section} />;
          case "CtaSection":
            return <CtaSection key={index} item={section} contactPage={about} />;
          case "ReviewsSection":
            return <ReviewsSection key={index} item={section} />;
          case "FaqSection":
            return (
              <motion.section {...reveal()} key={index} className={styles.faq}>
                <span>Najczęściej zadawane pytania</span>
                <h2>{section.title}</h2>
                <FaqAccordion items={section.items} />
              </motion.section>
            );
        }
      })}
    </main>
  );
}

