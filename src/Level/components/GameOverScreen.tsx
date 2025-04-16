import React, { useState } from "react";
import "../../style.css";
import ScoreProgress from "./Interface/components/ScoreProgress";
import Button from "../../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/pro-solid-svg-icons";
import levelsData from "../../utils/levelsData";
import useGame from "../../stores/useGame";

export default function GameOverScreen() {
  const [page, setPage] = useState(0);
  const startFromIntro = useGame((state) => state.startFromIntro);
  const currentLevelId = useGame((state) => state.currentLevelId);

  const newsData = levelsData.find((level) => level.id === currentLevelId);

  return (
    <div className="game-over-screen">
      <div className="game-over-content">
        {page === 0 ? (
          <div className="game-over-news-wrapper">
            <p className="game-over-news-header">Nieuws van vangadaag</p>
            <div className="game-over-content-wrapper">
              <img
                src={newsData?.newsArticle?.imageUrl}
                alt="news"
                className="game-over-news-image"
              />
              <p className="game-over-news-title">
                {newsData?.newsArticle?.title}
              </p>
              <p className="game-over-news-description">
                {newsData?.newsArticle?.content}
              </p>
            </div>
          </div>
        ) : (
          <div className="game-over-content-wrapper">
            <p className="game-over-header">Resultaat van vandaag</p>
            <p className="game-over-details">
              Lekker bezig je eerste dag heb je de doelen gehaald.
            </p>
            <ScoreProgress type="end" />
          </div>
        )}
        <Button
          className="game-over-button"
          onClick={page === 0 ? () => setPage(1) : startFromIntro}
        >
          Verder
          <FontAwesomeIcon icon={faCircleCheck} />
        </Button>
        <img alt="bg" src="/images/bg.jpg" className="game-over-bg" />
      </div>
    </div>
  );
}
