import "./style.css";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Experience from "./Experience.js";
import { Leva } from "leva";
import useGame from "./stores/useGame.js";
import Explanation from "./components/Explanation/Explanation.tsx";
import GarageTransition from "./GarageTransition.tsx";
import { useEffect, useState } from "react";
import IntroScreen from "./components/IntroScreen/IntroScreen.tsx";
import EndScreen from "./components/EndScreen/EndScreen.tsx";
import PauseButton from "./components/PauseButton/PauseButton.tsx";
import MuteButton from "./components/MuteButton/MuteButton.tsx";
import ReadyScreen from "./components/ReadyScreen/ReadyScreen.tsx";
import GameOverScreen from "./components/GameOverScreen/GameOverScreen.tsx";
import TutorialScreen from "./components/TutorialScreen/TutorialScreen.tsx";
import LevelPicker from "./components/LevelPicker/LevelPicker.tsx";
import AboutPacketPanic from "./components/AboutPacketPanic/AboutPacketPanic.tsx";
import PauseScreen from "./components/PauseScreen/PauseScreen.tsx";
import Interface from "./components/Interface/Interface.tsx";

function GameApp() {
  const phase = useGame((state) => state.phase);
  const isPaused = useGame((state) => state.isPaused);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Monitor transition state
  useEffect(() => {
    const checkTransition = () => {
      setIsTransitioning(!!window.isTransitioning);
    };

    checkTransition();
    const interval = setInterval(checkTransition, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const preventGesture = (e) => e.preventDefault();

    document.addEventListener("gesturestart", preventGesture, {
      passive: false,
    });
    document.addEventListener("gesturechange", preventGesture, {
      passive: false,
    });
    document.addEventListener("gestureend", preventGesture, { passive: false });

    return () => {
      document.removeEventListener("gesturestart", preventGesture);
      document.removeEventListener("gesturechange", preventGesture);
      document.removeEventListener("gestureend", preventGesture);
    };
  }, []);

  return (
    <>
      <div
        className={`top-right-buttons ${
          isPaused || phase === "intro" || phase === "gameFinished"
            ? "inset"
            : ""
        }`}
      >
        {phase === "playing" && !isTransitioning && <PauseButton />}
        <MuteButton />
      </div>
      <Leva collapsed hidden />
      <GarageTransition />
      {phase === "intro" ? (
        <IntroScreen />
      ) : phase === "gameFinished" ? (
        <EndScreen />
      ) : (
        <>
          {phase === "ready" && <ReadyScreen />}
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

// Standalone EndScreen component for the route
function StandaloneEndScreen() {
  return <EndScreen />;
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Main game route */}
        <Route path="/" element={<GameApp />} />

        {/* Standalone endscreen route */}
        <Route path="/endscreen" element={<StandaloneEndScreen />} />

        {/* Redirect any unknown routes to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

const container = document.querySelector("#root");
if (!container) {
  throw new Error('Root container "#root" not found');
}
const root = ReactDOM.createRoot(container);
root.render(<App />);
