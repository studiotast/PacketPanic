import React from "react";
import useGame from "../../../../stores/useGame";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBox } from "@fortawesome/pro-solid-svg-icons";

const ScoreProgress = () => {
  const score = useGame((state) => state.score);
  const currentLevel = useGame((state) => state.currentLevel);
  const scoreToAdvance = currentLevel.scoreToAdvance;
  const maxScore = currentLevel.maxScore;

  // Calculate the progress percentage (capped at 100%)
  const progressPercentage = Math.min((score / maxScore) * 100, 100);

  // Calculate the position of the target indicator (200 point mark)
  const targetPosition = (scoreToAdvance / maxScore) * 100; // 83.33%

  return (
    <div className="score-progress-container">
      <div className="score-info-container">
        <div className="score-label">
          <div className="score-icon-container">
            <FontAwesomeIcon icon={faBox} className="score-icon" />{" "}
          </div>
          <p className="score-text">
            {score}/{maxScore}
          </p>
        </div>
        <p
          className="score-advance"
          style={{
            left: `${targetPosition}%`,
            transform: "translateX(-50%)",
          }}
        >
          {scoreToAdvance}
        </p>
      </div>

      <div
        className="score-progress-bar"
        style={{ width: `${maxScore * 1.65}px` }}
      >
        <div
          className="score-progress-fill"
          style={{ width: `${progressPercentage}%` }}
        />
        {/* Target indicator line */}
        <div
          className="score-target-indicator"
          style={{
            left: `${targetPosition}%`,
            right: "auto",
          }}
        />
      </div>
    </div>
  );
};

export default ScoreProgress;
