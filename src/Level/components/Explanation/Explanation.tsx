import React, { useEffect, useState } from "react";
import Button from "../../../Button";
import useGame from "../../../stores/useGame";

export default function Explanation() {
  const playSound = useGame((state) => state.playSound);
  const currentLevel = useGame((state) => state.currentLevel);

  const [explanationIndex, setExplanationIndex] = useState(
    currentLevel.storyLine.length - currentLevel.storyLine.length
  );

  const [readyToStart, setReadyToStart] = useState(false);

  useEffect(() => {
    if (explanationIndex === currentLevel.storyLine.length - 1) {
      setReadyToStart(true);
    } else {
      setReadyToStart(false);
    }
  }, [explanationIndex]);

  useEffect(() => {
    setTimeout(() => {
      playSound("robotTalking");
    }, 1000);
  }, []);

  return (
    <div className="explanation-overlay">
      <img className="robot-image" src="/assets/images/robot.png" />
      <div className="speech-bubble">
        <div className="speech-bubble-content">
          <p className="speech-bubble-text">
            {currentLevel.storyLine[explanationIndex].text}
          </p>
        </div>
      </div>
      <div className="explanation-button-wrapper">
        <Button
          className="explanation-button"
          onClick={() => {
            if (readyToStart) {
              useGame.setState({ phase: "ready" });
              return;
            }
            playSound("robotTalking");
            setExplanationIndex((prev) => prev + 1);
          }}
          shadowColor="#dc9329"
        >
          {currentLevel.storyLine[explanationIndex].button}
        </Button>
      </div>
    </div>
  );
}
