import styles from "./Feedback.module.css";
import { useDirectoriesStore } from "../../store/storage";

export default function Feedback() {
  const feedback = useDirectoriesStore((state) => state.feedback);
  return (
    <div className={styles.toast}>
      <p>{feedback.info}</p>
    </div>
  );
}
