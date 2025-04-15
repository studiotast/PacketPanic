import { faVolume, faVolumeSlash } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import useGame from "./stores/useGame";

export default function MuteButton() {
  const toggleMute = useGame((state) => state.toggleMute);
  const isMuted = useGame((state) => state.isMuted);
  return (
    <div className="mute-icon" onClick={toggleMute}>
      <FontAwesomeIcon icon={!isMuted ? faVolumeSlash : faVolume} />
    </div>
  );
}
