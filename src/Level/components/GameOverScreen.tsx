import React, { useState } from "react";
import "../../style.css";
import ScoreProgress from "./Interface/components/ScoreProgress";
import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faCircleCheck,
  faRotate,
} from "@fortawesome/pro-solid-svg-icons";
import useGame from "../../stores/useGame";
import { motion, AnimatePresence } from "framer-motion"; // Import Framer Motion
import TvWrapper from "./TvWrapper";

export default function GameOverScreen() {
  const [page, setPage] = useState(0);
  const completeRestart = useGame((state) => state.completeRestart);
  const advanceToNextLevel = useGame((state) => state.advanceToNextLevel);
  const score = useGame((state) => state.score);
  const currentLevel = useGame((state) => state.currentLevel);
  const scoreToAdvance = currentLevel.scoreToAdvance;
  const restart = useGame((state) => state.restart);

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
  };

  const handleRepeatLevel = () => {
    restart();
  };

  return (
    <TvWrapper>
      <div
        className="game-over-content"
        style={{
          backgroundColor:
            progressPercentage >= 100
              ? "#9f85ff"
              : progressPercentage < 100 && page === 0
              ? "#ff588d"
              : "#9f85ff",
        }}
      >
        <img alt="bg" src="/images/bg.jpg" className="game-over-bg" />
        <AnimatePresence mode="wait">
          {page === 0 ? (
            <motion.div
              key="results-page"
              className="game-over-content-wrapper"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariants}
            >
              <div className="game-over-text-container">
                <p
                  className="game-over-header"
                  style={{
                    color: progressPercentage >= 100 ? "#677eff" : "#ff588d",
                  }}
                >{`${
                  progressPercentage >= 100
                    ? currentLevel.scoreScreen[0].title
                    : currentLevel.scoreScreen[1].title
                }`}</p>
                <p className="game-over-details">
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
              className="game-over-news-wrapper"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariants}
            >
              <p className="game-over-news-header">Nieuws van vandaag</p>
              <div className="game-over-news-content-wrapper">
                <img
                  src={currentLevel?.newsArticle?.imageUrl}
                  alt="news"
                  className="game-over-news-image"
                />
                <div className="game-over-news-text">
                  <div className="game-over-news-header-container">
                    <p className="game-over-news-title">
                      {currentLevel?.newsArticle?.title}
                    </p>
                    <p className="game-over-news-date">
                      {currentLevel?.newsArticle?.date}
                    </p>
                  </div>
                  <div className="game-over-news-description-container">
                    <p className="game-over-news-description">
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
                        <span className="news-button-text">Volledig</span>{" "}
                        artikel lezen
                      </span>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="game-over-button-container">
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
