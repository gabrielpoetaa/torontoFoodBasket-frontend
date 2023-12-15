import styles from "./Predata.module.css";

export function Predata({ number, content }) {
  return (
    <div className={styles.predata}>
      <span>{number}</span>
      <p>{content}</p>
    </div>
  );
}
