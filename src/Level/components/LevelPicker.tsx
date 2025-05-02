import { faArrowLeft } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Button from "../../Button";
import Layout from "../../Layout";
import useGame from "../../stores/useGame";
import "../../style.css";
import levelsData from "../../utils/levelsData";
import Card from "./Card";

export default function LevelPicker() {
  return (
    <Layout>
      <div className="pause-content">
        <h2>Level kiezen</h2>
        <div className="card-wrapper">
          {levelsData.map((item, index) => (
            <Card key={index} title={`Level ${item.id}`} levelId={item.id} />
          ))}
        </div>
        <Button
          className="pause-button"
          onClick={() => {
            useGame.setState({ phase: "pause" });
          }}
          shadowColor="#dc9329"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          Terug
        </Button>
      </div>
    </Layout>
  );
}
