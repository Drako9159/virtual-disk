import styles from "../styles/Wrapper.module.css";

export default function Wrapper({ children }) {
  return <div className={styles.container}>{children}</div>;
}
