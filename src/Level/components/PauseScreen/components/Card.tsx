import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "../../../../style.css";
import { IconDefinition } from "@fortawesome/pro-solid-svg-icons";
import Button from "../../../../Button";
import useGame from "../../../../stores/useGame";

type CardProps = {
  title: string;
  icon: IconDefinition;
  action: string;
};

export default function Card({ title, icon, action }: CardProps) {
  const startFromIntro = useGame((state) => state.startFromIntro);

  const handleCardClick = () => {
    if (action === "startFromIntro") {
      startFromIntro();
    }
  };

  return (
    <Button className="card" onClick={handleCardClick} shadowColor="#e5e7ea">
      <div className="card-icon">
        <FontAwesomeIcon icon={icon} />
      </div>
      <div className="card-title">{title}</div>
    </Button>
  );
}
