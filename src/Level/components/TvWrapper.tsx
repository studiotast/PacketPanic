import React from "react";
import "../../style.css";

type TvWrapperProps = {
  children?: React.ReactNode;
};

export default function TvWrapper({ children }: TvWrapperProps) {
  return (
    <div className="game-over-screen">
      <div className="game-over-wrapper">
        <img src="/images/tv.png" alt="tv" className="game-over-tv" />
        {children}
      </div>
    </div>
  );
}
