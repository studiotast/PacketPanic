import React from "react";
import { faPause, faPlay } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import useGame from "../../stores/useGame";
import styles from "./PauseButton.module.scss";

export default function PauseButton() {
  const togglePause = useGame((state) => state.togglePause);
  const isPaused = useGame((state) => state.isPaused);

  return (
    <motion.div
      className={styles.pauseIcon}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={togglePause}
    >
      <div className={styles.iconWrapper}>
        <FontAwesomeIcon color={"#fff"} icon={!isPaused ? faPause : faPlay} />
      </div>
    </motion.div>
  );
}
