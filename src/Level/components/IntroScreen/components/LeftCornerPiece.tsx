import React from "react";
import { faArrowRight } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function LeftCornerPiece() {
  return (
    <div className="left-corner-piece">
      <div className="corner-piece-inner">
        <img src="/assets/images/left-corner-piece.svg" />
        <div className="left-corner-piece-content">
          <p>Alle ervaringen bekijken</p>
          <FontAwesomeIcon fill="#000" icon={faArrowRight} />
        </div>
      </div>
    </div>
  );
}
