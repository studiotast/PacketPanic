import React, { useEffect } from "react";
import useGame from "../../stores/useGame";
import levelsData from "../../utils/levelsData";
import "../../style.css";

export default function LevelTransition() {
  const { phase, currentLevelId, score, advanceToNextLevel } = useGame(
    (state) => ({
      phase: state.phase,
      currentLevelId: state.currentLevelId,
      score: state.score,
      advanceToNextLevel: state.advanceToNextLevel,
    })
  );

  const nextLevel = levelsData.find((level) => level.id === currentLevelId + 1);

  //   // Auto-advance after a delay
  //   useEffect(() => {
  //     if (phase === "levelComplete") {
  //       const timer = setTimeout(() => {
  //         advanceToNextLevel();
  //       }, 5000); // 5 second delay

  //       return () => clearTimeout(timer);
  //     }
  //   }, [phase, advanceToNextLevel]);

  if (phase !== "levelComplete") return null;

  return (
    <div className="level-transition">
      <h2>Level {currentLevelId} Complete!</h2>
      <p>Current Score: {score}</p>

      {nextLevel ? (
        <>
          <h3>Next: {nextLevel.name}</h3>
          <p>{nextLevel.description}</p>
          <button onClick={advanceToNextLevel}>Continue Now</button>
        </>
      ) : (
        <h3>Congratulations! You've completed all levels!</h3>
      )}
    </div>
  );
}
