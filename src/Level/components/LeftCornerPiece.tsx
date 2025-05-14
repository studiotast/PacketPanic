import React from "react";
import { faArrowRight } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";

export default function LeftCornerPiece() {
  return (
    <div className="left-corner-piece">
      <div className="corner-piece-inner">
        <img src="/assets/images/left-corner-piece.svg" />
        <motion.div
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.05 }}
          className="left-corner-piece-content"
          onClick={() => window.open("https://www.sidn.nl/", "_blank")}
        >
          <p>Alle ervaringen bekijken</p>
          <FontAwesomeIcon fill="#000" icon={faArrowRight} />
        </motion.div>
      </div>
    </div>
  );
}
