import "./style.css";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience.jsx";
import Interface from "./Level/components/Interface/Interface.jsx";
import { Leva } from "leva";
import useGame from "./stores/useGame.js";
import IntroScreen from "./Level/components/IntroScreen/IntroScreen.jsx";
import ReadyScreen from "./Level/components/ReadyScreen.jsx";
import PauseScreen from "./Level/components/PauseScreen/PauseScreen.jsx";
import GameOverScreen from "./Level/components/GameOverScreen.tsx";
import LevelTransition from "./Level/components/LevelTransition.jsx"; // Import the level transition component
import Explanation from "./Level/components/Explanation/Explanation.tsx";
import MuteButton from "./MuteButton.tsx";

function App() {
  const phase = useGame((state) => state.phase);
  const isPaused = useGame((state) => state.isPaused);

  return (
    <>
      <MuteButton />
      <Leva />
      {phase === "intro" ? (
        <IntroScreen />
      ) : phase === "ready" ? (
        <>
          <ReadyScreen />
          <Canvas
            shadows
            camera={{
              fov: 45,
              near: 0.1,
              far: 200,
              position: [2.5, 4, 6],
            }}
          >
            <Experience />
          </Canvas>
        </>
      ) : phase === "levelComplete" ? ( // Add new level transition phase
        <>
          <LevelTransition /> {/* Display the level transition UI */}
          <Canvas
            shadows
            camera={{
              fov: 45,
              near: 0.1,
              far: 200,
              position: [2.5, 4, 6],
            }}
          >
            <Experience />
          </Canvas>
        </>
      ) : phase === "ended" ? (
        <>
          <GameOverScreen />

          <Canvas
            shadows
            camera={{
              fov: 45,
              near: 0.1,
              far: 200,
              position: [2.5, 4, 6],
            }}
          >
            <Experience />
          </Canvas>
        </>
      ) : phase === "explanation" ? (
        <>
          {isPaused && <PauseScreen />}
          {1 == 1 && <Explanation />}

          <Canvas
            shadows
            camera={{
              fov: 45,
              near: 0.1,
              far: 200,
              position: [2.5, 4, 6],
            }}
          >
            <Experience />
          </Canvas>
        </>
      ) : (
        <>
          {isPaused && <PauseScreen />}
          <Canvas
            shadows
            camera={{
              fov: 45,
              near: 0.1,
              far: 200,
              position: [2.5, 4, 6],
            }}
          >
            <Experience />
          </Canvas>
          {!isPaused && <Interface />}
        </>
      )}
    </>
  );
}

const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(<App />);
