import React from "react";
import {
  faCircleInfo,
  faHome,
  faPlay,
  faRectangleList,
} from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import Button from "../Button/Button";
import Layout from "../../Layout";
import useGame from "../../stores/useGame";
import Card from "../Card/Card";
import styles from "./PauseScreen.module.scss";
import LeftCornerPiece from "../CornerPiece/LeftCornerPiece";
import RightCornerPiece from "../CornerPiece/RightCornerPiece";

const PauseScreen: React.FC = () => {
  const { t } = useTranslation();
  const togglePause = useGame((state) => state.togglePause);

  const pauseScreenData = [
    {
      title: t("pause-screen.about-packet-panic"),
      icon: faCircleInfo,
      action: "about",
    },
    {
      title: t("pause-screen.back-to-home"),
      icon: faHome,
      action: "startFromIntro",
    },
    {
      title: t("pause-screen.choose-level"),
      icon: faRectangleList,
      action: "levelSelect",
    },
  ];

  return (
    <Layout>
      <div className={styles.content}>
        <h2 className={styles.heading}>{t("pause-screen.paused")}</h2>
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
          {t("pause-screen.continue-playing")}
          <FontAwesomeIcon icon={faPlay} />
        </Button>
      </div>
      <LeftCornerPiece />
      <RightCornerPiece />
    </Layout>
  );
};

export default PauseScreen;
