import React from "react";
import {
  faCircleInfo,
  faHome,
  faPlay,
  faRectangleList,
} from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../Button/Button";
import Layout from "../../Layout";
import useGame from "../../stores/useGame";
import Card from "../Card/Card";
import styles from "./PauseScreen.module.scss";
import LeftCornerPiece from "../CornerPiece/LeftCornerPiece";
import RightCornerPiece from "../CornerPiece/RightCornerPiece";

const PauseScreen: React.FC = () => {
  const togglePause = useGame((state) => state.togglePause);

  const pauseScreenData = [
    {
      title: "Over PacketPanic",
      icon: faCircleInfo,
      action: "about",
    },
    {
      title: "Terug naar home",
      icon: faHome,
      action: "startFromIntro",
    },
    {
      title: "Level kiezen",
      icon: faRectangleList,
      action: "levelSelect",
    },
  ];

  return (
    <Layout>
      <div className={styles.content}>
        <h2 className={styles.heading}>Gepauzeerd</h2>
        <div className={styles.cardWrapper}>
          {pauseScreenData.map((item, index) => (
            <Card
              key={index}
              title={item.title}
              icon={item.icon}
              action={item.action}
            />
          ))}
        </div>
        <Button onClick={togglePause}>
          Verder spelen
          <FontAwesomeIcon icon={faPlay} />
        </Button>
      </div>
      <div className={styles.cornerPieces}>
        <LeftCornerPiece />
        <RightCornerPiece />
      </div>
    </Layout>
  );
};

export default PauseScreen;
