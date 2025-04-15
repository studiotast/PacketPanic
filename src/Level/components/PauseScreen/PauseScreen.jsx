import {
  faCircleInfo,
  faHome,
  faPlay,
  faRectangleList,
} from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Button from "../../../Button";
import Layout from "../../../Layout";
import useGame from "../../../stores/useGame";
import Card from "./components/Card";

export default function PauseScreen() {
  const togglePause = useGame((state) => state.togglePause);
  const startFromIntro = useGame((state) => state.startFromIntro);

  const pauseScreenData = [
    {
      title: "Over PacketPanic",
      icon: faCircleInfo,
      action: "/info",
    },
    {
      title: "Terug naar home",
      icon: faHome,
      action: startFromIntro,
    },
    {
      title: "Level kiezen",
      icon: faRectangleList,
      action: "/level-select",
    },
  ];

  return (
    <Layout>
      <div className="pause-content">
        <h2>Gepauzeerd</h2>
        <div className="card-wrapper">
          {pauseScreenData.map((item, index) => (
            <Card
              key={index}
              title={item.title}
              icon={item.icon}
              action={item.action}
            />
          ))}
        </div>
        <Button className="pause-button" onClick={togglePause}>
          Verder spelen
          <FontAwesomeIcon icon={faPlay} />
        </Button>
      </div>
    </Layout>
  );
}
