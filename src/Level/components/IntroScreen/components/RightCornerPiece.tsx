import React from "react";
import { motion, transform } from "framer-motion";

export default function RightCornerPiece() {
  return (
    <div className="right-corner-piece">
      <div className="corner-piece-inner">
        <img src="/assets/images/right-corner-piece.svg" />
        <div className="right-corner-piece-content">
          <motion.div
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
            className="logo"
            onClick={() => window.open("https://www.tast.studio/", "_blank")}
          >
            <img src="/assets/images/studio-tast.svg" />
          </motion.div>

          <motion.div
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
            className="logo"
            onClick={() => window.open("https://www.sidn.nl/", "_blank")}
          >
            <img src="/assets/images/sidn.svg" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
