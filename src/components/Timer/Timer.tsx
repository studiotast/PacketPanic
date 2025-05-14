import useGame from "../../stores/useGame";
import styles from "./Timer.module.scss";

export default function Timer() {
  const timer = useGame((state) => state.timer);
  const currentLevel = useGame((state) => state.currentLevel);

  // Format time: convert seconds to MM:SS format
  const formatTime = (timeInSeconds: number): string => {
    const timeLeft = currentLevel.timeLimit - timeInSeconds;
    const minutes = Math.floor(timeLeft / 60);
    const seconds = Math.floor(timeLeft % 60);

    if (seconds < 0) {
      return "00:00";
    }

    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return <div className={styles.time}>{formatTime(timer)}</div>;
}
