import { faVolume, faVolumeSlash } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import useGame from "./stores/useGame";
import Button from "./Button";

export default function MuteButton() {
  const toggleMute = useGame((state) => state.toggleMute);
  const isMuted = useGame((state) => state.isMuted);

  return (
    <div className="mute-button-wrapper">
      <Button
        className="mute-button"
        onClick={toggleMute}
        shadowColor="#e5e7ea"
      >
        <FontAwesomeIcon
          color={isMuted ? "#677eff" : "#C6CAE2"}
          icon={!isMuted ? faVolumeSlash : faVolume}
        />
      </Button>
    </div>
  );
}
