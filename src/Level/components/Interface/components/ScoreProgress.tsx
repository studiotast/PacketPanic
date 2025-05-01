import React from "react";
import useGame from "../../../../stores/useGame";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBox } from "@fortawesome/pro-solid-svg-icons";

type ScoreProgressProps = {
  type: "game" | "end";
};

export default function ScoreProgress({ type }: ScoreProgressProps) {
  const score = useGame((state) => state.score);
  const currentLevel = useGame((state) => state.currentLevel);
  const scoreToAdvance = currentLevel.scoreToAdvance;
  const maxScore = currentLevel.maxScore;

  // Calculate the progress percentage (capped at 100%)
  const progressPercentage = Math.min((score / scoreToAdvance) * 100, 100);

  return (
    <div
      className={`score-progress-container ${type === "game" ? "game" : "end"}`}
    >
      {type === "end" && (
        <div className="score-info-container">
          <div className="score-label">
            <div className="score-icon-container">
              <FontAwesomeIcon icon={faBox} className="score-icon" />{" "}
            </div>
            <p className="score-text">
              {score}/{scoreToAdvance}
            </p>
          </div>
        </div>
      )}

      <div className="score-progress-bar">
        <div
          className="score-progress-fill"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  );
}
