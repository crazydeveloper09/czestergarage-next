"use client";

import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { useId, useRef, useState } from "react";
import { IconFromHygraph } from "@/helpers/icon";
import type { NavigationFieldsFragment } from "@/lib/graphql/sdk";
import styles from "./NavigationMobile.module.scss";

export default function NavigationMobile({ navigation }: { navigation: NavigationFieldsFragment }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const reducedMotion = useReducedMotion();
  const menuId = useId();
  const toggle = useRef<HTMLButtonElement>(null);
  const itemVariants = {
    closed: { opacity: 0, y: -12 },
    open: { opacity: 1, y: 0 },
  };

  return (
    <nav className={styles.wrapper} aria-label="Nawigacja g&#322;&#243;wna">
      <img className={styles.logo} src={navigation.logo.url} alt="Czester Garage" />
      <div key={pathname} className={styles.menu} data-open={open} onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          event.preventDefault();
          setOpen(false);
          toggle.current?.focus();
        }
      }}>
        <button ref={toggle} className={styles.toggle} type="button"
          aria-label={open ? "Zamknij menu" : "Otw?rz menu"} aria-expanded={open} aria-controls={menuId}
          onClick={() => setOpen(value => !value)}>
          <span aria-hidden="true" /><span aria-hidden="true" /><span aria-hidden="true" />
        </button>
        <motion.div id={menuId} className={styles.content} inert={!open}
          initial={false} animate={{ height: open ? "auto" : 0 }}
          transition={{ duration: reducedMotion ? 0 : open ? .65 : .45, ease: [.4, 0, .2, 1] }}>
        <motion.ul initial="closed" animate={open ? "open" : "closed"}
          variants={{ closed: {}, open: { transition: { delayChildren: reducedMotion ? 0 : .12, staggerChildren: reducedMotion ? 0 : .09 } } }}>
          {navigation.items.filter((link) => link.href.replace(/\/$/, "") !== "/gallery").map((link) => {
            const href = link.href.replace(/\/$/, "") || "/";
            const active = pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));
            return (
              <motion.li key={link.href} variants={itemVariants} transition={{ duration: reducedMotion ? 0 : .4 }}>
                <a href={link.href} className={active ? styles.active : undefined} aria-current={pathname === href ? "page" : undefined}>{link.label}</a>
              </motion.li>
            );
          })}
          <motion.li variants={itemVariants} transition={{ duration: reducedMotion ? 0 : .4 }}>
            <a className={styles.cta} href={navigation.cta.href}>
              <IconFromHygraph icon="phone" />
              {navigation.cta.label}
            </a>
          </motion.li>
        </motion.ul>
        </motion.div>
      </div>
    </nav>
  );
}
