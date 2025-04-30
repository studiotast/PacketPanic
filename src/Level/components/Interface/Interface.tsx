import React from "react";
import useGame from "../../../stores/useGame";
import Timer from "../Timer";
import ScoreProgress from "./components/ScoreProgress";

export default function Interface() {
  const restart = useGame((state) => state.restart);
  const phase = useGame((state) => state.phase);

  const currentLevelId = useGame((state) => state.currentLevelId);
  const currentLevel = useGame((state) => state.currentLevel);

  return (
    <div className="interface">
      {/* Timer component */}
      <Timer />

      {/* Level Info */}
      <div className="level-info">
        <h3>
          Level {currentLevelId}: {currentLevel.name}
        </h3>
        <p>Goal: {currentLevel.scoreToAdvance} points</p>
      </div>

      {/* Score */}
      {phase === "playing" && (
        <div className="score-wrapper">
          <ScoreProgress type="game" />
        </div>
      )}

      {/* Restart button - only shown when game is ended */}
      {phase === "ended" && (
        <div className="restart" onClick={restart}>
          Restart
        </div>
      )}
    </div>
  );
}
