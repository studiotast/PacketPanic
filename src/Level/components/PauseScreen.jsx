import React from "react";
import useGame from "../../stores/useGame";

export default function PauseScreen() {
  const togglePause = useGame((state) => state.togglePause);

  return (
    <div className="pause-screen">
      <div className="pause-content">
        <h2>Game Paused</h2>
        <p>Press P to resume</p>
        <button className="resume-button" onClick={togglePause}>
          Resume Game
        </button>
      </div>
    </div>
  );
}
