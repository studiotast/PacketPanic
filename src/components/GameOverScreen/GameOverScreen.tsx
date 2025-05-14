import {
  faArrowRight,
  faCircleCheck,
  faRotate,
} from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import useGame from "../../stores/useGame";
import levelsData from "../../utils/levelsData";
import Button from "../Button/Button";
import ScoreProgress from "../Interface/components/ScoreProgress";
import TvWrapper from "../TutorialScreen/components/TvWrapper";
import styles from "./GameOverScreen.module.scss";

export default function GameOverScreen() {
  const [page, setPage] = useState(0);
  const completeRestart = useGame((state) => state.completeRestart);
  const advanceToNextLevel = useGame((state) => state.advanceToNextLevel);
  const score = useGame((state) => state.score);
  const currentLevel = useGame((state) => state.currentLevel);
  const scoreToAdvance = currentLevel.scoreToAdvance;
  const restart = useGame((state) => state.restart);
  const lastLevelId = levelsData.length - 1;
  const currentLevelId = currentLevel.id;
  const isLastLevel = currentLevelId === lastLevelId;
  const end = useGame((state) => state.end);

  // Calculate the progress percentage (capped at 100%)
  const progressPercentage = Math.min((score / scoreToAdvance) * 100, 100);

  // Animation variants
  const pageVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1, transition: { duration: 0.5 } },
    exit: { scale: 0, opacity: 0, transition: { duration: 0.5 } },
  };

  const handleClick = () => {
    if (page === 0) {
      setPage(1);
    }
    if (page === 1) {
      if (isLastLevel) {
        if (typeof window.initiatePhaseTransition === "function") {
          window.initiatePhaseTransition("gameFinished");
          setTimeout(() => {
            end();
          }, 1000);
        } else {
          end();
        }
      } else {
        if (currentLevel.id === 2) {
          completeRestart();
          return;
        }
        if (typeof window.initiatePhaseTransition === "function") {
          window.initiatePhaseTransition("explanation");
          setTimeout(() => {
            advanceToNextLevel();
          }, 1000);
        } else {
          advanceToNextLevel();
        }
      }
    }
  };

  const handleRepeatLevel = () => {
    restart();
  };

  return (
    <TvWrapper>
      <div
        className={styles.gameOverContent}
        style={{
          backgroundColor:
            progressPercentage >= 100
              ? "#9f85ff"
              : progressPercentage < 100 && page === 0
              ? "#ff588d"
              : "#9f85ff",
        }}
      >
        <img alt="bg" src="/images/bg.jpg" className={styles.gameOverBg} />
        <AnimatePresence mode="wait">
          {page === 0 ? (
            <motion.div
              key="results-page"
              className={styles.gameOverContentWrapper}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariants}
            >
              <div className={styles.gameOverTextContainer}>
                <p
                  className={styles.gameOverHeader}
                  style={{
                    color: progressPercentage >= 100 ? "#677eff" : "#ff588d",
                  }}
                >{`${
                  progressPercentage >= 100
                    ? currentLevel.scoreScreen[0].title
                    : currentLevel.scoreScreen[1].title
                }`}</p>
                <p className={styles.gameOverDetails}>
                  {`${
                    progressPercentage >= 100
                      ? currentLevel.scoreScreen[0].description
                      : currentLevel.scoreScreen[1].description
                  }`}
                </p>
              </div>
              <ScoreProgress type="end" />
            </motion.div>
          ) : (
            <motion.div
              key="news-page"
              className={styles.gameOverNewsWrapper}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariants}
            >
              <p className={styles.gameOverNewsHeader}>Nieuws van vandaag</p>
              <div className={styles.gameOverNewsContentWrapper}>
                <img
                  src={currentLevel?.newsArticle?.imageUrl}
                  alt="news"
                  className={styles.gameOverNewsImage}
                />
                <div className={styles.gameOverNewsText}>
                  <div className={styles.gameOverNewsHeaderContainer}>
                    <p className={styles.gameOverNewsTitle}>
                      {currentLevel?.newsArticle?.title}
                    </p>
                    <p className={styles.gameOverNewsDate}>
                      {currentLevel?.newsArticle?.date}
                    </p>
                  </div>
                  <div className={styles.gameOverNewsDescriptionContainer}>
                    <p className={styles.gameOverNewsDescription}>
                      {currentLevel?.newsArticle?.content}
                    </p>
                    <Button
                      style={{ width: "fit-content" }}
                      onClick={() =>
                        window.open(
                          currentLevel?.newsArticle?.readMoreLink,
                          "_blank"
                        )
                      }
                      color="grey"
                      responsive
                    >
                      <span>
                        <span className={styles.newsButtonText}>Volledig</span>{" "}
                        artikel lezen
                      </span>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div className={styles.gameOverButtonContainer}>
          {page === 0 ? (
            <Button responsive onClick={handleClick}>
              Verder
              <FontAwesomeIcon icon={faCircleCheck} />
            </Button>
          ) : (
            <>
              <Button responsive color="blue" onClick={handleRepeatLevel}>
                {`Level ${currentLevel.id} `}
                <FontAwesomeIcon icon={faRotate} />
              </Button>
              <Button responsive onClick={handleClick}>
                {`Naar level ${currentLevel.id + 1} `}
                <FontAwesomeIcon icon={faArrowRight} />
              </Button>
            </>
          )}
        </div>
      </div>
    </TvWrapper>
  );
}
