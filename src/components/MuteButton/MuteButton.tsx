import React from "react";
import { faVolume, faVolumeSlash } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import useGame from "../../stores/useGame";
import styles from "./MuteButton.module.scss";

export default function MuteButton() {
  const toggleMute = useGame((state) => state.toggleMute);
  const isMuted = useGame((state) => state.isMuted);

  return (
    <motion.div
      className={styles.muteButton}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleMute}
    >
      <div className={styles.iconWrapper}>
        <FontAwesomeIcon
          color={"#fff"}
          icon={isMuted ? faVolumeSlash : faVolume}
        />
      </div>
    </motion.div>
  );
}
