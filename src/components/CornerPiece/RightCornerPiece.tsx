import React from "react";
import { motion } from "framer-motion";
import styles from "./CornerPiece.module.scss";

export default function RightCornerPiece() {
  return (
    <div className={styles.rightCornerPiece}>
      <div className={styles.cornerPieceInner}>
        <img
          src="/assets/images/right-corner-piece.svg"
          alt="Right corner piece"
        />
        <div className={styles.rightCornerPieceContent}>
          <motion.div
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
            className={styles.logo}
            onClick={() => window.open("https://www.tast.studio/", "_blank")}
          >
            <img src="/assets/images/studio-tast.svg" alt="Studio Tast" />
          </motion.div>

          <motion.div
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
            className={styles.logo}
            onClick={() => window.open("https://www.sidn.nl/", "_blank")}
          >
            <img src="/assets/images/sidn.svg" alt="SIDN" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
