import React from "react";
import "../../style.css";
import useGame from "../../stores/useGame.js";

export default function IntroScreen() {
  const startFromIntro = useGame((state) => state.startFromIntro);

  return (
    <div className="intro-screen">
      <div className="intro-content">
        <h1>Packet Panic</h1>
        <p>
          Welcome to the Packet Panic, direct the balls to their destinations.
        </p>
        <div className="instructions">
          <h2>Controls:</h2>
          <ul>
            <li>Tap the arrows to change their directions</li>
            <li>Press P to pause</li>
          </ul>
        </div>
        <button className="start-button" onClick={startFromIntro}>
          Start Game
        </button>
      </div>
    </div>
  );
}
