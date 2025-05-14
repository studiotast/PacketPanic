import { faVolume, faVolumeSlash } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import React from "react";
import useGame from "../../stores/useGame";

export default function MuteButton() {
  const toggleMute = useGame((state) => state.toggleMute);
  const isMuted = useGame((state) => state.isMuted);

  return (
    <motion.div
      className="mute-button"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleMute}
    >
      <div className="icon-wrapper">
        <FontAwesomeIcon
          className="mute-icon"
          color={"#fff"}
          icon={isMuted ? faVolumeSlash : faVolume}
        />
      </div>
    </motion.div>
  );
}
