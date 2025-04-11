import useGame from "../../stores/useGame.js";
import "../../style.css";

export default function Timer() {
  const timer = useGame((state) => state.timer);
  const phase = useGame((state) => state.phase);

  // Format time: convert seconds to MM:SS format
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return <div className="time">{formatTime(timer)} / 00:60</div>;
}
