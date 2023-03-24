import styles from "../styles/ChargeAnimation.module.css";

export default function ChargeAnimation() {
  return (
    <div className={styles.container}>
      <span className={`${styles.loader} ${styles.loaderNight}`}></span>
    </div>
  );
}
