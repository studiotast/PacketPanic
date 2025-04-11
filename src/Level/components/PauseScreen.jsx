import React from "react";
import useGame from "../../stores/useGame";
import Layout from "../../Layout";
import Button from "../../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/pro-solid-svg-icons";

export default function PauseScreen() {
  const togglePause = useGame((state) => state.togglePause);

  return (
    <Layout>
      <div className="pause-content">
        <h2>Gepauzeerd</h2>
        <p>Press P to resume</p>
        <Button onClick={togglePause}>
          Verder spelen
          <FontAwesomeIcon icon={faPlay} style={{ marginLeft: "10px" }} />
        </Button>
      </div>
    </Layout>
  );
}
