import { faPause, faPlay } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import useGame from "./stores/useGame";
import Button from "./Button";

export default function PauseButton() {
  const togglePause = useGame((state) => state.togglePause);
  const isPaused = useGame((state) => state.isPaused);

  return (
    <Button
      className="pause-icon"
      onClick={togglePause}
      shadowColor="transparent"
    >
      <div className="icon-wrapper">
        <FontAwesomeIcon color={"#fff"} icon={!isPaused ? faPause : faPlay} />
      </div>
    </Button>
  );
}
