import React, { useEffect } from "react";
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
  const phase = useGame((state) => state.phase);

  // Calculate the progress percentage (capped at 100%)
  const progressPercentage = Math.round(
    Math.min((score / scoreToAdvance) * 100, 100)
  );

  useEffect(() => {
    console.log(
      `Score: ${score}, Score to Advance: ${scoreToAdvance}, Progress Percentage: ${progressPercentage}`
    );
  }, [score, scoreToAdvance, progressPercentage]);

  return (
    <div
      className={`score-progress-container ${type === "game" ? "game" : "end"}`}
    >
      {type === "end" && (
        <div className="score-info-container">
          <div className="score-label">
            <div className="score-icon-container">
              <FontAwesomeIcon
                icon={faBox}
                color={progressPercentage >= 100 ? "#26ffba" : "#ffc83c"}
                className="score-icon"
              />{" "}
            </div>
            <p
              className="score-text"
              style={{
                color: progressPercentage >= 100 ? "#26ffba" : "#ffc83c",
              }}
            >{`${progressPercentage}%`}</p>
          </div>
        </div>
      )}

      <div className="score-progress-bar">
        <div
          className="score-progress-fill"
          style={{
            width: `${progressPercentage}%`,
            backgroundColor:
              progressPercentage >= 100
                ? "#26ffba"
                : progressPercentage < 100 && phase !== "playing"
                ? "#ffc83c"
                : "#26ffba",
          }}
        />
      </div>
    </div>
  );
}
