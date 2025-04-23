import { faPause, faPlay } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import useGame from "./stores/useGame";
import Button from "./Button";

export default function PauseButton() {
  const togglePause = useGame((state) => state.togglePause);
  const isPaused = useGame((state) => state.isPaused);

  return (
    <div className="pause-button-wrapper">
      <Button
        className="pause-icon-button"
        onClick={togglePause}
        shadowColor="#e5e7ea"
      >
        <FontAwesomeIcon
          color={isPaused ? "#fff" : "#C6CAE2"}
          icon={!isPaused ? faPause : faPlay}
        />
      </Button>
    </div>
  );
}
