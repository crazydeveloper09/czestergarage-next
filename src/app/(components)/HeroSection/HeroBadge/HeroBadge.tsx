import { IconFromHygraph } from "@/helpers/icon";
import styles from "./HeroBadge.module.scss";

interface HeroBadgeProps {
    icon: string;
    text: string;
}

const HeroBadge: React.FC<HeroBadgeProps> = ({ icon, text }) => {
    return (
        <div className={styles.container}>
            <IconFromHygraph icon={icon} class={styles.icon} />
            <p className={styles.description}>{text}</p>
        </div>
    );
};

export default HeroBadge;
