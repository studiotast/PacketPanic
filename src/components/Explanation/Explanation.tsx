import React, { useEffect, useState } from "react";
import Button from "../Button/Button";
import useGame from "../../stores/useGame";
import { useModels } from "../../stores/useModels";
import SpeechBubble from "./components/SpeechBubble";
import styles from "./Explanation.module.scss";
import { useTranslation } from "react-i18next";
import { getTranslated } from "../../utils/getTranslated";

export default function Explanation(): React.ReactElement {
  const { t } = useTranslation();
  const playSound = useGame((state) => state.playSound);
  const stopSound = useGame((state) => state.stopSound);
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

  // Function to stop all robot sounds before playing a new one
  const playRandomRobotSound = () => {
    // Stop all robot talking sounds first
    stopSound("robotTalking1");
    stopSound("robotTalking2");
    stopSound("robotTalking3");

    // Generate a random integer between 1 and 3 (inclusive)
    const random = Math.floor(Math.random() * 3) + 1;
    if (random === 1) {
      playSound("robotTalking1");
    } else if (random === 2) {
      playSound("robotTalking2");
    } else {
      playSound("robotTalking3");
    }
  };

  useEffect(() => {
    if (loaded) {
      setTimeout(() => {
        playRandomRobotSound();
      }, 2000);
    }
  }, [loaded]);

  useEffect(() => {
    // Play robot sound on explanation index change
    if (explanationIndex > 0) {
      playRandomRobotSound();
    }
  }, [explanationIndex, playSound, stopSound]);

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
          text={getTranslated(currentLevel.storyLine[explanationIndex].text)}
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
            setExplanationIndex((prev) => prev + 1);
          }}
          color="yellow"
        >
          {getTranslated(currentLevel.storyLine[explanationIndex].button)}
        </Button>
      </div>
    </div>
  );
}
