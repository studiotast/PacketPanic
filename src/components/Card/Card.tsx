import { IconDefinition } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useGame from "../../stores/useGame";
import ClickableCard from "../ClickableCard/ClickableCard";
import styles from "./Card.module.scss";

interface CardProps {
  title: string;
  icon?: IconDefinition;
  action?: string;
  cardLevelId?: number;
}

export default function Card({ title, icon, action, cardLevelId }: CardProps) {
  const startFromIntro = useGame((state) => state.startFromIntro);
  const levelPicker = useGame((state) => state.levelPicker);
  const levelSelect = useGame((state) => state.levelSelect);
  const aboutPage = useGame((state) => state.aboutPage);
  const levelId = useGame((state) => state.currentLevelId);

  const handleCardClick = () => {
    console.log("Card clicked:", title, action);
    if (action === "startFromIntro") {
      startFromIntro();
    } else if (action === "levelSelect") {
      console.log("levelSelect clicked");
      if (typeof window.initiatePhaseTransition === "function") {
        window.initiatePhaseTransition("levelPicker");
        levelPicker();
      } else {
        levelPicker();
      }
    } else if (action === "about") {
      console.log("about clicked");
      aboutPage();
    } else {
      console.log("levleId-above", cardLevelId);
      // For level selection cards
      // Store the level ID in localStorage for reference after transition
      if (cardLevelId) {
        localStorage.setItem("pendingLevelSelection", cardLevelId.toString());
      }

      // Just initiate the transition, the level selection will happen in GarageTransition
      if (typeof window.initiatePhaseTransition === "function") {
        window.initiatePhaseTransition("explanation");
      } else if (cardLevelId) {
        levelSelect(cardLevelId);
      }
    }
  };

  return (
    <ClickableCard onClick={handleCardClick}>
      <div className={styles.card}>
        {icon && (
          <div className={styles.cardIcon}>
            <FontAwesomeIcon icon={icon} />
          </div>
        )}
        <div>{title}</div>
      </div>
    </ClickableCard>
  );
}
