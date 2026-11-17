import { IconFromHygraph } from "@/helpers/icon";
import { ContactInfoFieldsFragment } from "@/lib/graphql/sdk";
import styles from './ContactInfo.module.scss';

interface ContactInfoProps {
    section: ContactInfoFieldsFragment;
}

const ContactInfo: React.FC<ContactInfoProps> = ({ section }) => {
    return (
        <div id="dane-kontaktowe" className={styles.wrapper}>
            {section.items.map((item, index) => (
                <div key={index} className={styles.item}>
                    <div className={styles.icon}>
                        <IconFromHygraph icon={item.icon} />
                    </div>
                    <div className={styles.content}>
                        <h4>{item.title}</h4>
                        <p>{item.description}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ContactInfo;
