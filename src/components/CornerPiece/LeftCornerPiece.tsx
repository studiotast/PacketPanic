import React from "react";
import { faArrowRight } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import styles from "./CornerPiece.module.scss";

export default function LeftCornerPiece() {
  return (
    <div className={styles.leftCornerPiece}>
      <div className={styles.cornerPieceInner}>
        <img
          src="/assets/images/left-corner-piece.svg"
          alt="Left corner piece"
        />
        <motion.div
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.05 }}
          className={styles.leftCornerPieceContent}
          onClick={() => window.open("https://hoehetnetwerkt.nl", "_blank")}
        >
          <p>Bekijk Hoe het Net Werkt</p>
          <FontAwesomeIcon fill="#000" icon={faArrowRight} />
        </motion.div>
      </div>
    </div>
  );
}
