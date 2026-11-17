'use client';

import { IconFromHygraph } from "@/helpers/icon";
import { NavigationFieldsFragment } from "@/lib/graphql/sdk";
import styles from './NavigationDesktop.module.scss';
import { usePathname } from "next/navigation";

interface NavigationDesktopProps {
    navigation: NavigationFieldsFragment;
}

const NavigationDesktop: React.FC<NavigationDesktopProps> = ({ navigation }) => {
    const pathName = usePathname();

    return (
         <nav className={styles.wrapper}>
            <div className={styles.logo}>
                <img src={navigation.logo.url} alt="logo" />
            </div>
            <div className={styles.menu}>
                <ul>
                    {navigation.items.filter((link) => link.href.replace(/\/$/, "") !== "/gallery").map((link, index) => (
                        <li key={index}>
                            <a href={link.href} className={pathName === link.href ? styles.active : undefined}>
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
            <div className={styles.cta}>
                <IconFromHygraph icon={'phone'} class={styles.icon} />
                <a href={navigation.cta.href}>{navigation.cta.label}</a>
            </div>
        </nav>
    )
}

export default NavigationDesktop;
