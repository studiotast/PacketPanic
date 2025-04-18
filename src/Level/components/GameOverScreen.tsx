import React, { useState } from "react";
import "../../style.css";
import ScoreProgress from "./Interface/components/ScoreProgress";
import Button from "../../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/pro-solid-svg-icons";
import levelsData from "../../utils/levelsData";
import useGame from "../../stores/useGame";
import { motion, AnimatePresence } from "framer-motion"; // Import Framer Motion

export default function GameOverScreen() {
  const [page, setPage] = useState(0);
  const completeRestart = useGame((state) => state.completeRestart);
  const currentLevelId = useGame((state) => state.currentLevelId);

  const newsData = levelsData.find((level) => level.id === currentLevelId);

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
      completeRestart();
    }
  };

  return (
    <div className="game-over-screen">
      <div className="game-over-wrapper">
        <img src="/images/tv.png" alt="tv" className="game-over-tv" />
        <div className="game-over-content">
          <AnimatePresence mode="wait">
            {page === 0 ? (
              <motion.div
                key="news-page"
                className="game-over-news-wrapper"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
              >
                <p className="game-over-news-header">Nieuws van vangadaag</p>
                <div className="game-over-content-wrapper">
                  <img
                    src={newsData?.newsArticle?.imageUrl}
                    alt="news"
                    className="game-over-news-image"
                  />
                  <div className="game-over-news-text">
                    <p className="game-over-news-title">
                      {newsData?.newsArticle?.title}
                    </p>
                    <p className="game-over-news-description">
                      {newsData?.newsArticle?.content}
                    </p>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="results-page"
                className="game-over-content-wrapper"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
              >
                <p className="game-over-header">Resultaat van vandaag</p>
                <p className="game-over-details">
                  Lekker bezig je eerste dag heb je de doelen gehaald.
                </p>
                <ScoreProgress type="end" />
              </motion.div>
            )}
          </AnimatePresence>
          <div className="game-over-button-container">
            <Button
              className="game-over-button"
              onClick={handleClick}
              shadowColor="#dc9329"
            >
              Verder
              <FontAwesomeIcon icon={faCircleCheck} />
            </Button>
          </div>
        </div>
        <img alt="bg" src="/images/bg.jpg" className="game-over-bg" />
      </div>
    </div>
  );
}
