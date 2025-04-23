import React from "react";

export default function RightCornerPiece() {
  return (
    <div className="right-corner-piece">
      <div className="corner-piece-inner">
        <img src="/assets/images/right-corner-piece.svg" />
        <div className="right-corner-piece-content">
          <div className="logo">
            <img src="/assets/images/studio-tast.svg" />
          </div>
          <div className="logo">
            <img src="/assets/images/sidn.svg" />
          </div>
        </div>
      </div>
    </div>
  );
}
