import { getNavigation } from "@/lib/graphql/requests/navigation";
import styles from "./Loading.module.scss";

export default async function Loading() {
  const navigation = await getNavigation().catch(() => null);

  return (
    <div className={styles.screen} role="status">
      <span className={styles.visuallyHidden}>Ładowanie strony Czester Garage…</span>
      <div className={styles.indicator} aria-hidden="true">
        {navigation?.logo?.url ? (
          <img className={styles.logo} src={navigation.logo.url} alt="" />
        ) : (
          <strong className={styles.logo}>Czester Garage</strong>
        )}
      </div>
    </div>
  );
}
