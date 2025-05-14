import styles from "./Interface.module.scss";
import ScoreProgressBar from "../ScoreProgressBar/ScoreProgressBar";
import useGame from "../../stores/useGame";
import Timer from "../Timer/Timer";

export default function Interface() {
  const phase = useGame((state) => state.phase);

  return (
    <div className={styles.interface}>
      <Timer />
      {phase === "playing" && (
        <div className={styles.scoreWrapper}>
          <ScoreProgressBar type="game" />
        </div>
      )}
    </div>
  );
}
