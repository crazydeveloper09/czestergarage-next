
import { getNavigation } from "@/lib/graphql/requests/navigation";
import NavigationDesktop from "./NavigationDesktop/NavigationDesktop";
import NavigationMobile from "./NavigationMobile/NavigationMobile";
import styles from "./Navigation.module.scss";

const Navigation: React.FC = async () => {
    const navigation = await getNavigation();

    if(!navigation) return null;

    return (
        <>
            <div className={styles.desktop}><NavigationDesktop navigation={navigation} /></div>
            <div className={styles.mobile}><NavigationMobile navigation={navigation} /></div>
        </>
    )
}

export default Navigation;
