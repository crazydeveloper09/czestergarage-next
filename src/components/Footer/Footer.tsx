import React from 'react';
import Image from 'next/image';
import { getFooter } from '@/lib/graphql/requests/footer';
import Link from 'next/link';
import styles from './Footer.module.scss';

import { IconFromHygraph } from '@/helpers/icon';

const Footer: React.FC = async () => {
  const footer = await getFooter();

  if (!footer) return null;


  return (
    <footer className={styles.wrapper}>
      <div className={styles.menuContainer}>
        <div className={styles.menuContainerItem}>
            <img className={styles.logo} src={footer.logo.url} alt={"logo"} />
            <p>{footer.description}</p>
        </div>
        {footer.columns.map((column, index) => (
          <div key={index} className={styles.menuContainerItem}>
            <h4>{column.title}</h4>
            <ul>
              {column.links.map((link, linkIndex) => (
                <li key={linkIndex}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className={styles.menuContainerItem}>
            <h4>Kontakt</h4>
            <div className={styles.contactContainer}>
                <div className={styles.contactItem}>
                    <IconFromHygraph icon={'phone'} class={styles.icon} />
                    <a href={`tel:${footer.phone}`}>{footer.phone}</a>
                </div>
                <div className={styles.contactItem}>
                    <IconFromHygraph icon={'envelope'} class={styles.icon} />
                    <a href={`mailto:${footer.email}`}>{footer.email}</a>
                </div>
                <div className={styles.contactItem}>
                    <IconFromHygraph icon={'map'} class={styles.icon} />
                    <p>{footer.address}</p>
                </div>
            </div>
            
        
        </div>
      </div>
      <div className={styles.copyrightContainer as string}>
        <p>{footer.copyright}</p>
       <p>Realizacja:  <a href={footer.realization.href} target="_blank" rel="noopener noreferrer">
          {footer.realization.label}
        </a></p>
      </div>
    </footer>
  );
}

export default Footer;
