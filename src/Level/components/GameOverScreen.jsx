import React from "react";
import useGame from "../../stores/useGame";
import "../../style.css";

export default function GameOverScreen() {
  const score = useGame((state) => state.score);
  const timer = useGame((state) => state.timer);
  const restart = useGame((state) => state.restart);
  const completeRestart = useGame((state) => state.completeRestart);

  // Format time function
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="game-over-screen">
      <div className="game-over-content">
        <h2>Game Over!</h2>
        <div className="game-stats">
          <p className="final-score">
            Final Score: <span>{score}</span>
          </p>
          <p className="final-time">
            Time: <span>{formatTime(timer)}</span>
          </p>
        </div>
        <div className="game-over-buttons">
          <button className="restart-button" onClick={restart}>
            Play Again
          </button>
          <button className="menu-button" onClick={completeRestart}>
            Main Menu
          </button>
        </div>
      </div>
    </div>
  );
}
