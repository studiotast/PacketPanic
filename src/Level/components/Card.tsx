import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "../../style.css";
import { IconDefinition } from "@fortawesome/pro-solid-svg-icons";
import Button from "../../Button";
import useGame from "../../stores/useGame";

type CardProps = {
  title: string;
  icon?: IconDefinition;
  action?: string;
  isLevel?: boolean;
  levelId?: number;
};

export default function Card({
  title,
  icon,
  action,
  isLevel,
  levelId,
}: CardProps) {
  const startFromIntro = useGame((state) => state.startFromIntro);
  const levelPicker = useGame((state) => state.levelPicker);
  const levelSelect = useGame((state) => state.levelSelect);
  const aboutPage = useGame((state) => state.aboutPage);

  const handleCardClick = () => {
    if (action === "startFromIntro") {
      startFromIntro();
    } else if (action === "levelSelect") {
      if (typeof window.initiatePhaseTransition === "function") {
        window.initiatePhaseTransition("levelPicker");
        levelPicker();
      } else {
        levelPicker();
      }
    } else if (action === "about") {
      aboutPage();
    } else {
      // For level selection cards
      // Store the level ID in localStorage for reference after transition
      if (levelId) {
        localStorage.setItem("pendingLevelSelection", levelId.toString());
      }

      // Just initiate the transition, the level selection will happen in GarageTransition
      if (typeof window.initiatePhaseTransition === "function") {
        window.initiatePhaseTransition("explanation");
      } else {
        levelSelect(levelId);
      }
    }
  };

  return (
    <Button
      className="card"
      onClick={handleCardClick}
      shadowColor="#e5e7ea"
      isCard
    >
      {isLevel && <div className="card-level" />}
      {icon && (
        <div className="card-icon">
          <FontAwesomeIcon icon={icon} />
        </div>
      )}
      <div className="card-title">{title}</div>
    </Button>
  );
}
