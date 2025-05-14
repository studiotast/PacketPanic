import useGame from "../../stores/useGame";
import { faBox } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./ScoreProgressBar.module.scss";

type ScoreProgressBarProps = {
  type?: "game" | "end";
};

export default function ScoreProgressBar({ type }: ScoreProgressBarProps) {
  const score = useGame((state) => state.score);
  const currentLevel = useGame((state) => state.currentLevel);
  const scoreToAdvance = currentLevel.scoreToAdvance;
  const phase = useGame((state) => state.phase);
  const progressPercentage = Math.round(
    Math.min((score / scoreToAdvance) * 100, 100)
  );

  return (
    <div className={`${styles.container} ${type === "game" ? "game" : "end"} `}>
      {type === "end" && (
        <div className={styles.infoContainer}>
          <div className={styles.label}>
            <div className={styles.iconContainer}>
              <div className={styles.icon}>
                {" "}
                <FontAwesomeIcon
                  icon={faBox}
                  color={progressPercentage >= 100 ? "#26ffba" : "#ffc83c"}
                  className="score-icon"
                />{" "}
              </div>
            </div>
            <span className={styles.text}>{score}</span>
          </div>
        </div>
      )}

      <div className={styles.progressBar}>
        <div
          className={styles.progressFill}
          style={{
            width: `${progressPercentage}%`,
            backgroundColor:
              progressPercentage >= 100
                ? "#26ffba"
                : progressPercentage < 100 && phase !== "playing"
                ? "#ffc83c"
                : "#26ffba",
          }}
        ></div>
        <div
          className={styles.targetIndicator}
          style={{ left: `${100}%` }}
        ></div>
      </div>
    </div>
  );
}
