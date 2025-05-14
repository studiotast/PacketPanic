import useGame from "@/stores/useGame";
import styles from "./Score.module.scss";

export default function Score() {
  const score = useGame((state) => state.score);
  return <div className={styles.score}>{score}</div>;
}
