import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/pro-solid-svg-icons";
import { motion } from "framer-motion";
import useGame from "../../stores/useGame";
import Button from "../Button/Button";
import TvWrapper from "./components/TvWrapper";
import styles from "./TutorialScreen.module.scss";
import { useTranslation } from "react-i18next";
import { getTranslated } from "../../utils/getTranslated";

export default function TutorialScreen() {
  const { t } = useTranslation();
  const currentLevel = useGame((state) => state.currentLevel);

  const [readyToStart, setReadyToStart] = useState(false);
  const [tutorialIndex, setTutorialIndex] = useState(0);

  useEffect(() => {
    if (tutorialIndex === currentLevel.tutorial.length - 1) {
      setReadyToStart(true);
    } else {
      setReadyToStart(false);
    }
  }, [tutorialIndex, currentLevel.tutorial.length]);

  // Framer Motion Variants for animations
  const textVariants = {
    hidden: { scale: 1.05 }, // Starting position (smaller)
    visible: {
      scale: 1, // End position (normal size)
    },
    exit: { scale: 0.8 }, // Exit animation
  };

  return (
    <TvWrapper>
      <div className={styles.tutorialContent}>
        {/* Background image */}
        <img
          alt="Tutorial background"
          src={`/assets/images/tutorial/${currentLevel.id}-${
            tutorialIndex + 1
          }.png`}
          className={styles.tutorialBg}
        />

        {/* Bottom container for positioning elements */}
        <div className={styles.tutorialBottomContainer}>
          {/* Text in bottom left */}
          <motion.div
            variants={textVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={styles.tutorialText}
            key={tutorialIndex}
          >
            <p>{getTranslated(currentLevel.tutorial[tutorialIndex].text)}</p>
          </motion.div>

          {/* Button in bottom right */}
          <div className={styles.tutorialButtonWrapper}>
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
              {t("global.continue")}
              <FontAwesomeIcon icon={faCircleCheck} />
            </Button>
          </div>
        </div>
      </div>
    </TvWrapper>
  );
}
