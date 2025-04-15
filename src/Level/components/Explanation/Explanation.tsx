import { faArrowRight, faPlay } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import Button from "../../../Button";
import useGame from "../../../stores/useGame";

export default function Explanation() {
  const [explanationIndex, setExplanationIndex] = React.useState(1);
  const numberOfImages = 2;
  const readyToStart = explanationIndex === numberOfImages;

  return (
    <div className="explanation-overlay">
      <img
        className="robot-image"
        src={`/assets/images/robot${explanationIndex}.png`}
      />
      <Button
        className="explanation-button"
        onClick={() => {
          if (readyToStart) {
            useGame.setState({ phase: "ready" });
            return;
          }
          setExplanationIndex((prev) => prev + 1);
        }}
      >
        {readyToStart ? "Starten" : "Volgende"}
        <FontAwesomeIcon icon={faArrowRight} />
      </Button>
    </div>
  );
}
