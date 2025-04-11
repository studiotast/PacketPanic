import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import useGame from "./stores/useGame";
import { faVolume, faVolumeSlash } from "@fortawesome/pro-solid-svg-icons";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const toggleMute = useGame((state) => state.toggleMute);
  const isMuted = useGame((state) => state.isMuted);
  return (
    <div className="layout-container">
      <div className="mute-icon" onClick={toggleMute}>
        <FontAwesomeIcon icon={!isMuted ? faVolumeSlash : faVolume} />
      </div>
      <div className="layout-inner">
        {children}
        <img alt="bg" src="/images/bg.jpg" className="layout-bg" />
      </div>
    </div>
  );
}
