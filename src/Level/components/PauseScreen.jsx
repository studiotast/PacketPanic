import {
  faCircleInfo,
  faHome,
  faPlay,
  faRectangleList,
} from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../Button";
import Layout from "../../Layout";
import useGame from "../../stores/useGame";
import "../../style.css";
import Card from "./Card";

export default function PauseScreen() {
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
        <Button
          className="pause-button"
          onClick={togglePause}
          shadowColor="#dc9329"
        >
          Verder spelen
          <FontAwesomeIcon icon={faPlay} />
        </Button>
      </div>
    </Layout>
  );
}
