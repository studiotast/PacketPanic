import React, { useEffect, useState } from "react";
import Button from "../Button/Button";
import useGame from "../../stores/useGame";
import { useModels } from "../../stores/useModels";
import SpeechBubble from "./components/SpeechBubble";
import styles from "./Explanation.module.scss";

export default function Explanation(): React.ReactElement {
  const playSound = useGame((state) => state.playSound);
  const currentLevel = useGame((state) => state.currentLevel);
  const startTutorial = useGame((state) => state.startTutorial);

  const loaded = useModels((state) => state.loaded);

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
    if (loaded) {
      setTimeout(() => {
        // Generate a random integer between 1 and 3 (inclusive)
        const random = Math.floor(Math.random() * 3) + 1;
        if (random === 1) {
          playSound("robotTalking1");
        } else if (random === 2) {
          playSound("robotTalking2");
        } else {
          playSound("robotTalking3");
        }
      }, 2000);
    }
  }, [explanationIndex, loaded, playSound]);

  return (
    <div className={styles.overlay}>
      <div className={styles.robotWrapper}>
        <img
          className={styles.robotImage}
          src="/assets/images/robot.png"
          alt="Robot"
        />
        <SpeechBubble
          key={explanationIndex}
          text={currentLevel.storyLine[explanationIndex].text}
        />
      </div>
      <div className={styles.buttonWrapper}>
        <Button
          onClick={() => {
            if (readyToStart) {
              if (typeof window.initiatePhaseTransition === "function") {
                window.initiatePhaseTransition("tutorial");
                return;
              } else {
                startTutorial();
                return;
              }
            }
            playSound("robotTalking1");
            setExplanationIndex((prev) => prev + 1);
          }}
          color="yellow"
        >
          {currentLevel.storyLine[explanationIndex].button}
        </Button>
      </div>
    </div>
  );
}
