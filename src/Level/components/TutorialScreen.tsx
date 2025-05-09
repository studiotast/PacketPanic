import React, { useEffect, useState } from "react";
import TvWrapper from "./TvWrapper";
import Button from "../../Button";
import useGame from "../../stores/useGame";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/pro-solid-svg-icons";
import { motion } from "framer-motion";

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

  // Framer Motion Variants voor animaties
  const textVariants = {
    hidden: { scale: 1.05 }, // Startpositie (onzichtbaar en kleiner)
    visible: {
      scale: 1, // Eindpositie (volledig zichtbaar en normale grootte)
    },
    exit: { scale: 0.8 }, // Exit-animatie
  };

  return (
    <TvWrapper>
      <div className="tutorial-content">
        {/* Background image */}
        <img
          alt="Tutorial background"
          src={`/assets/images/tutorial/${currentLevel.id}-${
            tutorialIndex + 1
          }.png`}
          className="tutorial-bg"
        />

        {/* Bottom container for positioning elements */}
        <div className="tutorial-bottom-container">
          {/* Text in bottom left */}
          <motion.div
            // style={{ transformOrigin: "left bottom" }} // Zet de origin linksonder
            variants={textVariants} // Gebruik de animatie-varianten
            initial="hidden" // Start met de "hidden"-variant
            animate="visible" // Animeer naar de "visible"-variant
            exit="exit" // Optionele exit-animatie
            className="tutorial-text"
            key={tutorialIndex}
          >
            <p>{currentLevel.tutorial[tutorialIndex].text}</p>
          </motion.div>

          {/* Button in bottom right */}
          <div className="tutorial-button-wrapper">
            <Button
              responsive
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
