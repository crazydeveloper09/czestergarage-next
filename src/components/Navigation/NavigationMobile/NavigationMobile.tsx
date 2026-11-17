"use client";

import { usePathname } from "next/navigation";
import { IconFromHygraph } from "@/helpers/icon";
import type { NavigationFieldsFragment } from "@/lib/graphql/sdk";
import styles from "./NavigationMobile.module.scss";

export default function NavigationMobile({ navigation }: { navigation: NavigationFieldsFragment }) {
  const pathname = usePathname();

  return (
    <nav className={styles.wrapper} aria-label="Nawigacja główna">
      <img className={styles.logo} src={navigation.logo.url} alt="Czester Garage" />
      <details key={pathname} className={styles.menu} onKeyDown={(event) => {
        if (event.key === "Escape" && event.currentTarget.open) {
          event.currentTarget.open = false;
          event.currentTarget.querySelector("summary")?.focus();
        }
      }}>
        <summary className={styles.toggle} aria-label="Menu">
          <span aria-hidden="true" /><span aria-hidden="true" /><span aria-hidden="true" />
        </summary>
        <ul>
          {navigation.items.filter((link) => link.href.replace(/\/$/, "") !== "/gallery").map((link) => {
            const href = link.href.replace(/\/$/, "") || "/";
            const active = pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));
            return (
              <li key={link.href}>
                <a href={link.href} className={active ? styles.active : undefined} aria-current={pathname === href ? "page" : undefined}>{link.label}</a>
              </li>
            );
          })}
          <li>
            <a className={styles.cta} href={navigation.cta.href}>
              <IconFromHygraph icon="phone" />
              {navigation.cta.label}
            </a>
          </li>
        </ul>
      </details>
    </nav>
  );
}
