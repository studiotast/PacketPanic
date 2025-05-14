import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/pro-solid-svg-icons";
import useGame from "../../stores/useGame";
import ClickableCard from "../ClickableCard/ClickableCard";
import styles from "./Card.module.scss";

interface CardProps {
  title: string;
  icon?: IconDefinition;
  action?: string;
  isLevel?: boolean;
}

const Card: React.FC<CardProps> = ({ title, icon, action, isLevel }) => {
  const startFromIntro = useGame((state) => state.startFromIntro);
  const levelPicker = useGame((state) => state.levelPicker);
  const levelSelect = useGame((state) => state.levelSelect);
  const aboutPage = useGame((state) => state.aboutPage);
  const levelId = useGame((state) => state.currentLevelId);

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
    <ClickableCard onClick={handleCardClick}>
      <div className={styles.card}>
        {isLevel && <div className="card-level" />}
        {icon && (
          <div className={styles.cardIcon}>
            <FontAwesomeIcon icon={icon} />
          </div>
        )}
        <div>{title}</div>
      </div>
    </ClickableCard>
  );
};

export default Card;
