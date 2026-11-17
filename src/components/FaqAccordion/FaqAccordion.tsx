import styles from "./FaqAccordion.module.scss";

export default function FaqAccordion({ items }: {
  items: readonly { question: string; answer: string }[];
}) {
  return (
    <div className={styles.accordion}>
      {items.map(({ question, answer }, index) => (
        <details key={index}>
          <summary>{question}<span aria-hidden="true" /></summary>
          <p>{answer}</p>
        </details>
      ))}
    </div>
  );
}
