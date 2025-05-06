import "./style.css";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience.jsx";
import Interface from "./Level/components/Interface/Interface.tsx";
import { Leva } from "leva";
import useGame from "./stores/useGame.js";
import IntroScreen from "./Level/components/IntroScreen/IntroScreen.jsx";
import ReadyScreen from "./Level/components/ReadyScreen.jsx";
import PauseScreen from "./Level/components/PauseScreen.jsx";
import GameOverScreen from "./Level/components/GameOverScreen.tsx";
import LevelTransition from "./Level/components/LevelTransition.jsx"; // Import the level transition component
import Explanation from "./Level/components/Explanation/Explanation.tsx";
import MuteButton from "./MuteButton.tsx";
import GarageTransition from "./GarageTransition.tsx";
import { useEffect, useState } from "react";
import PauseButton from "./PauseButton.tsx";
import { useModels } from "./stores/useModels.ts";
import TutorialScreen from "./Level/components/TutorialScreen.tsx";
import LevelPicker from "./Level/components/LevelPicker.tsx";
import AboutPacketPanic from "./Level/components/AboutPacketPanic.tsx";

function App() {
  const phase = useGame((state) => state.phase);
  const isPaused = useGame((state) => state.isPaused);
  // begin alvast met het laden van de modellen

  const [isTransitioning, setIsTransitioning] = useState(false);

  // Monitor transition state
  useEffect(() => {
    const checkTransition = () => {
      setIsTransitioning(!!window.isTransitioning);
    };

    // Check initially and set up interval
    checkTransition();
    const interval = setInterval(checkTransition, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className={`top-right-buttons ${phase === "intro" ? "intro" : ""}`}>
        {phase === "playing" && !isTransitioning && <PauseButton />}
        <MuteButton />
      </div>
      <Leva collapsed hidden />
      <GarageTransition />
      {phase === "intro" ? (
        <IntroScreen />
      ) : (
        <>
          {phase === "ready" && <ReadyScreen />}
          {phase === "levelComplete" && <LevelTransition />}
          {phase === "ended" && <GameOverScreen />}
          {phase === "explanation" && <Explanation />}
          {phase === "tutorial" && <TutorialScreen />}
          {phase === "levelPicker" && <LevelPicker />}
          {phase === "about" && <AboutPacketPanic />}
          {isPaused && <PauseScreen />}
          <Canvas
            shadows
            camera={{
              fov: 45,
              near: 0.1,
              far: 200,
              position: [15, 40, 10],
            }}
          >
            <Experience />
          </Canvas>
          {!isPaused && (
            <>
              <Interface />
            </>
          )}
        </>
      )}
    </>
  );
}

const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(<App />);
