import React from "react";
import "../../style.css";
import ScoreProgress from "./Interface/components/ScoreProgress";
import Button from "../../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/pro-solid-svg-icons";

export default function GameOverScreen() {
  return (
    <div className="game-over-screen">
      <div className="game-over-content">
        <div className="game-over-content-wrapper">
          <p className="game-over-header">Resultaat van vandaag</p>
          <p className="game-over-details">
            Lekker bezig je eerste dag heb je de doelen gehaald.
          </p>
          <ScoreProgress />
        </div>
        <Button
          className="game-over-button"
          onClick={() => {
            window.location.reload();
          }}
        >
          Verder
          <FontAwesomeIcon icon={faCircleCheck} />
        </Button>

        <img alt="bg" src="/images/bg.jpg" className="game-over-bg" />
      </div>
    </div>
  );
}
