import React, { useEffect, useState } from "react";
import TvWrapper from "./TvWrapper";
import Button from "../../Button";
import useGame from "../../stores/useGame";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/pro-solid-svg-icons";

export default function TutorialScreen() {
  const playSound = useGame((state) => state.playSound);
  const isMuted = useGame((state) => state.isMuted);
  const currentLevel = useGame((state) => state.currentLevel);

  const [readyToStart, setReadyToStart] = useState(false);

  const [tutorialIndex, setTutorialIndex] = useState(0);

  useEffect(() => {
    if (tutorialIndex === currentLevel.tutorial.length - 1) {
      setReadyToStart(true);
    } else {
      setReadyToStart(false);
    }
  }, [tutorialIndex]);

  return (
    <TvWrapper>
      <div className="tutorial-content">
        {/* Background image */}
        <img
          alt="Tutorial background"
          src="/assets/images/tutorial.png"
          className="tutorial-bg"
        />

        {/* Bottom container for positioning elements */}
        <div className="tutorial-bottom-container">
          {/* Text in bottom left */}
          <div className="tutorial-text">
            <p>{currentLevel.tutorial[tutorialIndex].text}</p>
          </div>

          {/* Button in bottom right */}
          <div className="tutorial-button-wrapper">
            <Button
              className="tutorial-button"
              onClick={() => {
                if (readyToStart) {
                  if (typeof window.initiatePhaseTransition === "function") {
                    window.initiatePhaseTransition("ready");
                    return;
                  } else {
                    useGame.setState({ phase: "ready" });
                    return;
                  }
                }
                setTutorialIndex((prev) => prev + 1);
              }}
              shadowColor="#dc9329"
            >
              Verder
              <FontAwesomeIcon icon={faCircleCheck} />
            </Button>
          </div>
        </div>
      </div>
    </TvWrapper>
  );
}
