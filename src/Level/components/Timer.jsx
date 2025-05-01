import useGame from "../../stores/useGame.js";
import "../../style.css";

export default function Timer() {
  const timer = useGame((state) => state.timer);
  const phase = useGame((state) => state.phase);
  const currentLevel = useGame((state) => state.currentLevel);

  // Format time: convert seconds to MM:SS format
  const formatTime = (timeInSeconds) => {
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

  return <div className="time">{formatTime(timer)}</div>;
}
